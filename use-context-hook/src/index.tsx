import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { StoreProvider } from "./components";
import reportWebVitals from "./reportWebVitals";
import "./styles/index.css";

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
