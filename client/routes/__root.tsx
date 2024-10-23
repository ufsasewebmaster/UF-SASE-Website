// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  createRootRoute,
  Link,
  Outlet,
  ScrollRestoration,
} from "@tanstack/react-router";
import { Body, Head, Html, Meta, Scripts } from "@tanstack/start";
import { createAssets } from "@vinxi/react";
import React, { Suspense } from "react";
import { getManifest } from "vinxi/manifest";
import Navbar from "../components/Navbar";

const Assets = createAssets(
  getManifest("client").handler,
  getManifest("client"),
);

// const TanStackRouterDevtools =
//   process.env.NODE_ENV === "production"
//     ? () => null
//     : React.lazy(() =>
//         import("@tanstack/router-devtools").then((res) => ({
//           default: res.TanStackRouterDevtools,
//         })),
//       );

export const Route = createRootRoute({
  meta: () => [
    {
      charSet: "utf-8",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
    {
      title: "TanStack Start Starter",
    },
    {
      rel: "icon",
      href: "/favicon.ico",
    },
  ],
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <div className="flex gap-2 p-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
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
      
      {/* Navigation Bar */}
      <Navbar />
      <hr className="p-2" />
      <div className="h-12" /> {/* Spacer for navbar */}

      {/* Additional DevTools */}
      <Suspense>
        {/* <ReactQueryDevtools /> */}
      </Suspense>
      {/* <TanStackRouterDevtools /> */}
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <Html>
      <Head>
        <Meta />
        <Suspense>
          <Assets />
        </Suspense>
      </Head>
      <Body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </Body>
    </Html>
  );
}
