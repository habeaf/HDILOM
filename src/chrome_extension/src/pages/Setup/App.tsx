import React from "react";
import ReactDOM from "react-dom/client";
import { SetupPageProvider } from "./contexts/setupPage";
import { SetupPage } from "./SetupPage";
import "./SetupPage.scss";
import "../../index.css";
import "../../App.css";

ReactDOM.createRoot(document.getElementById("setup-page") as HTMLElement).render(
  <React.StrictMode>
    <div className="app">
      <SetupPageProvider>
        <SetupPage />
      </SetupPageProvider>
    </div>
  </React.StrictMode>
);
