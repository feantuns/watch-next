import React from "react";
import ReactDOM from "react-dom/client";
import ReactGA from "react-ga4";
import App from "./App";
import "./index.css";

ReactGA.initialize("G-XX16PD679M");

const rootEl = document.getElementById("root");
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(<App />);
} else {
  throw "Root element not found. Unable to render the App.";
}
