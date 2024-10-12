import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import React, { Suspense } from "react";
import Navbar from "@client/components/Navbar";

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
      <Navbar />
      <hr className="p-2"/>
      <div className="h-12"/> {/* spacer for navbar*/}

      {/* Content Rendering */}
      <Outlet />

      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </>
  ),
});