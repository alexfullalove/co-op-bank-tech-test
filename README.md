# Co-op Bank Tech Test

## Introduction

Here is my solition to Co-op bank front end tech test.

In the test I was tasked with building a currency converter to gather a list of countries from the below API:

- `https://openexchangerates.org/api/currencies.json`

And return a given echange rate based on user input from the following API:

- `https://api.exchangerate-api.com/v4/latest/GBP`

A bonus task was to use flag images from the following:

- https:/flagpedia.net/download/api

I have used a combination of React, Typescript and Material UI in order to build my version of the currency converter. I have included an input field with validation for the user to enter the amount to convert. There is two dropdowns with flag icons which are searchable for the the user to select a currency. There is a switch button to change them over and there is a convert button which will displayer conversion for a given currency and a timer which will reset after 10 minutes and clear the conversion.

### `How to use`

- Once you have forked and cloned the repo run the following:

```bash
npm install
```

- In order to start the projet run the following command, and navigate to localhost:3000 in your chosen browser if not done automatically:

```bash
npm start
```

- To run the tests run the following:

```bash
npm test
```
