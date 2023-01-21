import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Provider as MenuContext } from "./context/menuContext";
import { Provider as CartContext } from "./context/cartContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartContext>
      <MenuContext>
        <App />
      </MenuContext>
    </CartContext>
    <ToastContainer />
  </React.StrictMode>
);
