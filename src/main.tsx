import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { HashRouter } from "react-router-dom";
import { SitesProvider } from "./SiteContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <HashRouter>
      <SitesProvider>
        <App />
      </SitesProvider>
    </HashRouter>
);
