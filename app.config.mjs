import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { createApp } from "vinxi";
import { config } from "vinxi/plugins/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default createApp({
  server: {
    preset: "vercel-edge",
    // prerender: {
    //   crawlLinks: true,
    //   routes: ["/"],
    // },
  },
  routers: [
    {
      name: "public",
      type: "static",
      base: "/",
      dir: "./public",
    },
    {
      name: "client",
      type: "client",
      handler: "./client/entry-client.tsx",
      base: "/_build",
      target: "browser",
      plugins: () => [
        tsconfigPaths(),
        TanStackRouterVite({
          routesDirectory: "./client/routes",
          generatedRouteTree: "./client/routeTree.gen.ts",
        }),
        viteReact(),
        config("client", {}),
      ],
    },
    {
      name: "server",
      type: "http",
      base: "/api",
      handler: "./server/entry-server.ts",
      plugins: () => [tsconfigPaths(), config("server", {})],
    },
    {
      name: "ssr",
      type: "http",
      base: "/",
      handler: "./server/ssr.tsx",
      plugins: () => [tsconfigPaths(), config("ssr", {})],
    },
  ],
});
