import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

// When served from a CDN path (e.g. raw.githack.com/.../live/), the BASE_URL
// resolves to "./" which isn't a valid router basename — fall back to "/" so
// the router operates correctly regardless of host.
const baseUrl = import.meta.env.BASE_URL;
const basename = baseUrl.startsWith("/") ? baseUrl.replace(/\/$/, "") || "/" : "/";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
