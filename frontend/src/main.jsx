import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { CustomerProvider } from "./context/CustomerContext.jsx";
import { RestaurantProvider } from "./context/RestaurantContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <CustomerProvider>
      <RestaurantProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </RestaurantProvider>
    </CustomerProvider>
  </BrowserRouter>
);
