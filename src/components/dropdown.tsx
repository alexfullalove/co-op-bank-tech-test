import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Currency } from "./currency-converter";

interface Props {
  currencies: Currency[];
  setCurrency: React.Dispatch<React.SetStateAction<Currency | undefined>>;
}

export const CountrySelect: React.FC<Props> = ({ currencies, setCurrency }) => {
  const handleCountrySelect = (event: any, value: any) => {
    setCurrency(value);
  };

  return (
    <Autocomplete
      id="country-select-demo"
      sx={{ width: "100%", margin: "auto", paddingTop: 3 }}
      options={currencies}
      autoHighlight
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
            label="Choose a country"
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
