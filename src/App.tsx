import React from "react";
import "./App.css";
import { CurrencyConverter } from "./components/currency-converter";

const App: React.FC = (): JSX.Element => {
  return (
    <div className="App">
      <div className="Converter">
        <CurrencyConverter />
      </div>
    </div>
  );
};

export default App;
