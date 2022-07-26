import React, { useState, useEffect } from "react";
import { CountrySelect } from "./dropdown";
import { getCurrencies, getConversions } from "../api/api.service";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { CountDown } from "./countdown-timer";
import "./styles/currency-converter.css";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";

export interface Currency {
  code: string;
  label: string;
}

export const CurrencyConverter: React.FC = (): JSX.Element => {
  const [converting, setConverting] = useState<boolean>(false);
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [amount, setAmount] = useState<string>("");
  const [firstSelectedCurrency, setFirstSelectedCurrency] = useState<
    Currency | undefined
  >();
  const [secondSelectedCurrency, setSecondSelectedCurrency] = useState<
    Currency | undefined
  >();
  const [conversion, setConversion] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const mapCurrencyData = (currencyData: Currency[]) => {
    const currencyArr = [];
    for (const currency in currencyData) {
      currencyArr.push({
        code: currency,
        label: String(currencyData[currency]),
      });
    }
    return currencyArr;
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCurrencies();
      setCurrencies(mapCurrencyData(data));
    };
    fetchData().catch(console.error);
  }, []);

  const fetchCurrencyConversion = async (): Promise<void> => {
    setConverting(true);
    if (firstSelectedCurrency && secondSelectedCurrency) {
      const response = await getConversions(firstSelectedCurrency.code);
      const rate = response.data.rates[secondSelectedCurrency.code];
      const exchangeRate = (rate * +amount).toFixed(2);
      setConversion(exchangeRate);
    }
    setConverting(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    fetchCurrencyConversion();
  };

  const handleInput = (value: string): void => {
    setAmount(value);
    const numberValidation = new RegExp(/^(-?\d+\.\d+)$|^(-?\d+)$/gm);
    numberValidation.test(value) ? setError(false) : setError(true);
  };

  const handleReset = (): void => {
    setConversion("");
  };

  const swapCurrencies = (): void => {
    setFirstSelectedCurrency(secondSelectedCurrency);
    setSecondSelectedCurrency(firstSelectedCurrency);
    setConversion("");
  };

  return (
    <section className="section">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="input-container">
          <div className="text-input">
            <TextField
              error={error}
              value={amount}
              helperText={error ? "Please enter a valid number" : ""}
              onChange={(e) => handleInput(e.target.value)}
              id="standard-basic"
              label="Enter Amount"
              variant="standard"
              sx={{ width: "100%" }}
            />
          </div>
          <div className="switch-button">
            <Button
              sx={{
                width: "80%",
                height: 50,
                marginTop: 0.5,
              }}
              onClick={swapCurrencies}
            >
              <SwapHorizIcon />
            </Button>
          </div>
        </div>
        <div>
          <CountrySelect
            selectedCurrency={firstSelectedCurrency}
            currencies={currencies}
            setCurrency={setFirstSelectedCurrency}
          />
        </div>
        <div>
          <CountrySelect
            selectedCurrency={secondSelectedCurrency}
            currencies={currencies}
            setCurrency={setSecondSelectedCurrency}
          />
        </div>
        <div className="conversion-container">
          {!converting ? (
            <div className="conversion">
              {conversion && (
                <p>
                  <span className="bold-text">
                    {amount} {firstSelectedCurrency?.code}
                  </span>{" "}
                  is equivalent to{" "}
                  <span className="bold-text">
                    {conversion} {secondSelectedCurrency?.code}
                  </span>
                  <CountDown handleReset={handleReset} />
                </p>
              )}
            </div>
          ) : (
            <div className="conversion">
              <CircularProgress />
            </div>
          )}
        </div>
        <div>
          <Button
            sx={{ width: "100%", height: 50, marginTop: 3, borderRadius: 8 }}
            type="submit"
            disabled={
              !amount || !firstSelectedCurrency || !secondSelectedCurrency
            }
            variant="contained"
          >
            Convert
          </Button>
        </div>
      </form>
    </section>
  );
};
