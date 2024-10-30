import {
  createRootRoute,
  Link,
  Outlet,
  useRouteContext,
} from "@tanstack/react-router";
import type { RouteContext } from "@tanstack/react-router";
import React, { Suspense, useState } from "react";
import Navbar from "../components/ui/navbar";

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null
    : React.lazy(() =>
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
        })),
      );

// Define the shape of our context
export interface AppRouteContext extends RouteContext {
  isAuthenticated: boolean;
}

export const Route = createRootRoute({
  component: RootComponent,
  // Provide a context function that returns AppRouteContext
  context: (): AppRouteContext => ({
    isAuthenticated: false,
  }),
});

function RootComponent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const context = useRouteContext() as AppRouteContext;

  return (
    <>
      <Navbar />
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
        <Link to="/authed" className="[&.active]:font-bold">
          Authed Page
        </Link>
      </div>
      <hr />

      <button
        onClick={() => setIsAuthenticated(!isAuthenticated)}
        className="m-2 rounded bg-blue-500 px-4 py-2 text-white"
      >
        {isAuthenticated ? "Log Out" : "Log In"}
      </button>

      {/* Content Rendering */}
      <Outlet
        context={{
          ...context,
          isAuthenticated,
        }}
      />

      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </>
  );
}
