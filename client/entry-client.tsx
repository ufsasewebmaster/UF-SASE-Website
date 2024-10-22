/// <reference types="vinxi/types/client" />
import { StartClient } from "@tanstack/start";
import ReactDOM from "react-dom/client";
import { createRouter } from "./router";
import "./index.css";

const router = createRouter();

ReactDOM.hydrateRoot(
  document.getElementById("root")!,
  // todo: why does this error?
  <StartClient router={router as any} />,
);

export default new Proxy(
  {},
  {
    get(target, property, receiver) {
      console.log(
        `Getting property "${property}" with value: ${target[property]}`,
      );
    },

    // Trap for setting property values
    set(target, property, value, receiver) {
      console.log(`Setting property "${property}" to value: ${value}`);
    },

    // Trap for checking if a property exists
    has(target, property) {
      console.log(`Checking if property "${property}" exists`);
    },

    // Trap for deleting properties
    deleteProperty(target, property) {
      console.log(`Deleting property "${property}"`);
    },
  },
);
