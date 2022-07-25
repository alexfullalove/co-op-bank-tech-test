import React, { useEffect, useState } from "react";

const calculateTimeLeft = (time: number) => {
  if (!time) return 0;

  const remainingTime = time - new Date().getTime();

  if (remainingTime < 0) return 0;

  return remainingTime;
};

export default function useCountdown(endTime: number) {
  const [end, setEndTime] = useState(endTime);
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(endTime));

  useEffect(() => {
    setTimeLeft(calculateTimeLeft(end));
    const timer = setInterval(() => {
      const targetTime = calculateTimeLeft(end);
      setTimeLeft(targetTime);
      if (targetTime === 0) {
        clearInterval(timer);
      }
    });

    return () => clearInterval(timer);
  }, [end]);

  return [timeLeft, setEndTime] as const;
}
