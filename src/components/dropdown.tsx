import React, { SyntheticEvent } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Currency } from "./currency-converter";

interface Props {
  selectedCurrency: Currency | undefined;
  currencies: Currency[];
  setCurrency: React.Dispatch<React.SetStateAction<Currency | undefined>>;
}

export const CountrySelect: React.FC<Props> = ({
  selectedCurrency,
  currencies,
  setCurrency,
}) => {
  const handleCountrySelect = (
    event: SyntheticEvent<Element | Event>,
    value: Currency | null
  ) => {
    if (value) {
      setCurrency(value);
    }
  };

  return (
    <Autocomplete
      id="size-small-standard"
      sx={{ width: "100%", margin: "auto", paddingTop: 3 }}
      options={currencies}
      autoHighlight
      value={
        selectedCurrency
          ? { label: selectedCurrency?.label, code: selectedCurrency?.code }
          : null
      }
      getOptionLabel={(option) => `${option.label} (${option.code})`}
      onChange={(event, value) => handleCountrySelect(event, value)}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          <img
            loading="lazy"
            width="20"
            src={`https://flagcdn.com/w20/${option.code
              .toLowerCase()
              .slice(0, -1)}.png`}
            srcSet={`https://flagcdn.com/w40/${option.code
              .toLowerCase()
              .slice(0, -1)}.png 2x`}
            alt=""
          />
          {option.label} ({option.code})
        </Box>
      )}
      renderInput={(params) => (
        <div>
          <TextField
            {...params}
            variant="standard"
            label="Choose a currency"
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password", // disable autocomplete and autofill
            }}
          />
        </div>
      )}
    />
  );
};
