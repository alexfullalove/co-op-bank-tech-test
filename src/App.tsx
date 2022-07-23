import React from "react";
import "./App.css";
import { CurrencyConverter } from "./components/currency-converter";

const App: React.FC = (): JSX.Element => {
  return (
    <div>
      <div className="max-w-4xl m-auto pb-6 pt-14">
        <CurrencyConverter />
      </div>
    </div>
  );
};

export default App;
