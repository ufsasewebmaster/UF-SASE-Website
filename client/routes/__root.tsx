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
      <Navbar />
      {/* TODO: Use the navbar for this navigation instead. */}
      <div className="flex gap-2 p-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{" "}
        <Link to="/UserPage" className="[&.active]:font-bold">
          User Page
        </Link>
        <Link to="/TodoPage" className="[&.active]:font-bold">
          Todo Page
        </Link>
        <Link to="/blog" className="[&.active]:font-bold">
          Blog
        </Link>
      </div>
      <hr />

      {/* Content Rendering */}
      <Outlet />

      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </>
  ),
});