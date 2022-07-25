import React, { useEffect } from "react";
import useCountdown from "./useCountdown";

interface Props {
  handleReset: () => void;
}

export const CountDown: React.FC<Props> = ({ handleReset }): JSX.Element => {
  const endTime = new Date().getTime() + 300000 * 2;
  const [timeLeft, setEndTime] = useCountdown(endTime);

  const minutes = Math.floor(+timeLeft! / 60000) % 60;
  const seconds = Math.floor(+timeLeft! / 1000) % 60;

  useEffect(() => {
    setEndTime(endTime);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) handleReset();
  }, [timeLeft]);

  return (
    <p>
      {minutes}' {seconds}''
    </p>
  );
};
