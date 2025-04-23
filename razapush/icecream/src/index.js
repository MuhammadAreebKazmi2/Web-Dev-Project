import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Import App.jsx
import { BrowserRouter } from "react-router-dom";
//import "./menustyle.css"; // Ensure this file exists for global styles

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
