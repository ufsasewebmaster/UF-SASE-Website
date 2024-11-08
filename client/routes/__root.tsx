import Footer from "@navigation/Footer";
import Header from "@navigation/Header";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  createRootRoute,
  Outlet,
  ScrollRestoration,
} from "@tanstack/react-router";
import { Body, Head, Html, Meta, Scripts } from "@tanstack/start";
import { createAssets } from "@vinxi/react";
import React, { Suspense } from "react";
import { getManifest } from "vinxi/manifest";

const Assets = createAssets(
  getManifest("client").handler,
  getManifest("client"),
);

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null
    : React.lazy(() =>
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
        })),
      );

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
      <div className="flex min-h-screen flex-col">
        <Header />
        {/* Main Content Area */}
        <main className="flex-grow p-4">
          {/* Suspense wrapper with fallback for async components */}
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </main>

        <Footer />
      </div>
      {/* TanStackRouterDevtools can stay here */}
      <TanStackRouterDevtools />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&family=Red+Hat+Text:wght@400;700&display=swap"
          rel="stylesheet"
        />
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
