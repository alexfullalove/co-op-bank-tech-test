import React from "react";
import "./App.css";
import { CurrencyConverter } from "./components/currency-converter";

const App: React.FC = (): JSX.Element => {
  return (
    <div>
      <div className="converter-container">
        <CurrencyConverter />
      </div>
    </div>
  );
};

export default App;
