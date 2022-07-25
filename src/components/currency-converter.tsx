import React, { useState, useEffect } from "react";
import { CountrySelect } from "./dropdown";
import { getCurrencies, getConversions } from "../api/api.service";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export interface Currency {
  code: string;
  label: string;
}

export const CurrencyConverter: React.FC = (): JSX.Element => {
  const [currencies, setCurrencies] = useState<any>();
  const [amount, setAmount] = useState<number>(0);
  const [firstSelectedCurrency, setFirstSelectedCurrency] = useState<
    Currency | undefined
  >();
  const [secondSelectedCurrency, setSecondSelectedCurrency] = useState<
    Currency | undefined
  >();
  const [conversion, setConversion] = useState<any>();

  const mapCurrencyData = (currencyData: any) => {
    const currencyArr = [];
    for (const currency in currencyData) {
      currencyArr.push({ code: currency, label: currencyData[currency] });
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

  const fetchCurrencyConversion = async (e: any) => {
    e.preventDefault();
    if (firstSelectedCurrency && secondSelectedCurrency) {
      const response = await getConversions(firstSelectedCurrency.code);
      const rate = response.data.rates[secondSelectedCurrency.code];
      const exchangeRate = (rate * amount).toFixed(3);
      setConversion(exchangeRate);
    }
  };

  return (
    <section className="pt-14 bg-white pb-14 px-6 shadow">
      <h1 className="text-black text-2xl mb-10 font-semibold">
        Currency Converter
      </h1>
      <form onSubmit={(e) => fetchCurrencyConversion(e)}>
        <div>
          <TextField
            onChange={(e) => setAmount(+e.target.value)}
            id="outlined-basic"
            label="Enter Amount"
            variant="outlined"
            sx={{ width: "100%" }}
          />
        </div>
        <div>
          <CountrySelect
            currencies={currencies}
            setCurrency={setFirstSelectedCurrency}
          />
        </div>
        <div>
          <CountrySelect
            currencies={currencies}
            setCurrency={setSecondSelectedCurrency}
          />
        </div>
        <div>
          <Button
            sx={{ width: "100%", height: 50, marginTop: 3 }}
            type="submit"
            disabled={
              !amount || !firstSelectedCurrency || !secondSelectedCurrency
            }
            variant="contained"
          >
            Convert
          </Button>
          <p>{conversion}</p>
        </div>
      </form>
    </section>
  );
};
