import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import "./styles/fontawesome-free-6.5.2-web/css/solid.css";
import "./styles/fontawesome-free-6.5.2-web/css/fontawesome.css";
import "./i18n";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
