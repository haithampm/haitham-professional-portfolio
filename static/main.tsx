import "./flag";
import "../app/globals.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import PortfolioSite from "../app/PortfolioSite";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PortfolioSite />
  </StrictMode>
);
