import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { CustomerProvider } from "./context/CustomerContext.jsx";
import { RestaurantProvider } from "./context/RestaurantContext.jsx";
import { LocationProvider } from "./context/LocationContext.jsx";
import { SocketProvider } from "./context/SocketContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <SocketProvider>
        <LocationProvider>
          <CustomerProvider>
            <RestaurantProvider>
              <App />
            </RestaurantProvider>
          </CustomerProvider>
        </LocationProvider>
      </SocketProvider>
    </BrowserRouter>
  </React.StrictMode>
);
