import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ClefringApp } from "@/components/ClefringApp";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClefringApp />
  </StrictMode>,
);
