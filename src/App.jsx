
import {StrictMode} from "react";
import React from "react";
import { createRoot } from "react-dom/client";
import Pizza from './Pizza';
import Order from "./Order";
import PizzaOfTheDay from "./PizzaOfTheDay";

const App = () => {
  return (
    <StrictMode>
    <div>
      <h1 className="logo">Padre Gino's - order now</h1>
  
      <Order />
      <PizzaOfTheDay />
    </div>
          </StrictMode>

  );
};
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
