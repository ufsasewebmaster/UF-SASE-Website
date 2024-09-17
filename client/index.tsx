import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import "./index.css";

const queryClient = new QueryClient();

// Create a new router instance
const router = createRouter({
  routeTree,
  context: { queryClient },
  Wrap: ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  ),
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app

// This is the entry point for the client
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
}
