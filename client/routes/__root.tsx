import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import React, { Suspense } from "react";
import Navbar from "../components/ui/navbar"; // Import the new Navbar component

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null
    : React.lazy(() =>
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
        }))
      );

export const Route = createRootRoute({
  component: () => (
    <>
      {/* Navigation Bar */}
      <Navbar /> {/* Use the Navbar component here */}
      <hr />

      {/* Content Rendering */}
      <Outlet />

      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </>
  ),
});