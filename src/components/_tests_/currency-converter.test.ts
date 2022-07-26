import {
  Currencies,
  mapCurrencyData,
  getCurrencyConversion,
  Rates,
} from "../currency-converter";

const mockCurrencyData: Currencies = {
  mock1: "Mock-Currency",
  mock2: "Mock-Currency",
};

const mockRates: Rates = {
  mock1: 2,
};

describe("mapCurrencyData", () => {
  test("it should return an empty array if passed an empty object", () => {
    const result = mapCurrencyData({});
    expect(result).toEqual([]);
  });

  test("for a given input it should return an array of equal length with new formatting", () => {
    const result = mapCurrencyData(mockCurrencyData);
    expect(result).toEqual([
      { code: "mock1", label: "Mock-Currency" },
      { code: "mock2", label: "Mock-Currency" },
    ]);
  });
});

describe("getCurrencyConversion", () => {
  test("should return empty string when passed an empty rates object", () => {
    const result = getCurrencyConversion({}, "mock1", "1");
    expect(result).toEqual("");
  });
  test("should return empty string when passed a non present code", () => {
    const result = getCurrencyConversion(mockRates, "mock2", "1");
    expect(result).toEqual("");
  });
  test("should return the currency conversion for a given currency currency code and conversion amount", () => {
    const result = getCurrencyConversion(mockRates, "mock1", "1");
    expect(result).toEqual("2.00");
  });
});
