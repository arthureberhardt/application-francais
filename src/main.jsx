import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Secours from "./Secours.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Secours>
      <App />
    </Secours>
  </React.StrictMode>
);
