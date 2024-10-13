/// <reference types="vinxi/types/client" />
import { StartClient } from "@tanstack/start";
import ReactDOM from "react-dom/client";
import { createRouter } from "./router";
import "./index.css";

const router = createRouter();

ReactDOM.hydrateRoot(
  document.getElementById("root")!,
  <StartClient router={router} />,
);
