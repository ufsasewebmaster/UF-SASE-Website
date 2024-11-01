import {
  dehydrate,
  hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import React from "react";
import { SuperJSON } from "superjson";
import { AuthProvider } from "./AuthContext";
import { routeTree } from "./routeTree.gen";

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}

export function createRouter() {
  // Make sure you create your loader client or similar data
  // stores inside of your `createRouter` function. This ensures
  // that your data stores are unique to each request and
  // always present on both server and client.
  const queryClient = new QueryClient();

  return createTanStackRouter({
    routeTree,
    // defaultPreload: "intent",
    transformer: SuperJSON,

    // Optionally provide your loaderClient to the router context for
    // convenience (you can provide anything you want to the router
    // context!)
    context: {
      queryClient,
      // auth: undefined,
    },
    // On the server, dehydrate the loader client so the router
    // can serialize it and send it to the client for us
    dehydrate: () => {
      return {
        queryClientState: dehydrate(queryClient),
      };
    },
    // On the client, hydrate the loader client with the data
    // we dehydrated on the server
    hydrate: (dehydrated) => {
      hydrate(queryClient, dehydrated.queryClientState);
    },

    // Wrap with AUTH here!
    // Optionally, we can use `Wrap` to wrap our router in the loader client provider
    Wrap: ({ children }) => {
      return (
        <QueryClientProvider client={queryClient}>
          <AuthProvider>{children}</AuthProvider>
        </QueryClientProvider>
      );
    },
    defaultNotFoundComponent: () => <div>404</div>, // TODO: Make an actual 404 page
  });
}
