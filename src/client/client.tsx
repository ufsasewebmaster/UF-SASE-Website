/// <reference types="vinxi/types/client" />
import { StartClient } from "@tanstack/start";
import React from "react";
import { createRoot } from "react-dom/client";
import { createRouter } from "./router";
import "./index.css";

const router = createRouter();

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <StartClient router={router} />
    </React.StrictMode>,
  );
} else {
  console.error("Root element not found");
}
