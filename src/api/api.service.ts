import axios from "axios";

export const getCurrencies = async () => {
  const result = await axios.get(
    "https://openexchangerates.org/api/currencies.json"
  );
  return result.data;
};

export const getConversions = async (currencyCode: string) => {
  return await axios.get(
    `https://api.exchangerate-api.com/v4/latest/${currencyCode}`
  );
};
