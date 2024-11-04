/// <reference types="vinxi/types/client" />
import React from "react";
import ReactDOM from "react-dom/client";
import { createRouter } from "./router";
import "./index.css";
import { RouterProvider } from "@tanstack/react-router";
import { AuthProvider, useAuth } from "./AuthContext";

const router: ReturnType<typeof createRouter> = createRouter();

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function InnerApp() {
  const auth = useAuth();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <RouterProvider router={router as any} context={{ auth }} />;
}

function App() {
  return (
    <AuthProvider>
      <InnerApp />
    </AuthProvider>
  );
}

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.hydrateRoot(
    rootElement,
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
} else {
  console.error("Root element not found");
}
