/// <reference types="vinxi/types/client" />
import { StartClient } from "@tanstack/start";
import ReactDOM from "react-dom/client";
import { createRouter } from "./router";
import "./index.css";

const router = createRouter();
const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.hydrateRoot(rootElement, <StartClient router={router} />);
} else {
  console.error("Root element not found");
}
