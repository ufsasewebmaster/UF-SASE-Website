import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { createApp } from "vinxi";
import tsconfigPaths from "vite-tsconfig-paths";

export default createApp({
  routers: [
    {
      name: "public",
      type: "static",
      base: "/",
      dir: "./public",
    },
    {
      name: "client",
      type: "spa",
      handler: "./index.html",
      base: "/",
      target: "browser",
      plugins: () => [
        tsconfigPaths(),
        TanStackRouterVite({
          routesDirectory: "./client/routes",
          generatedRouteTree: "./client/routeTree.gen.ts",
        }),
        viteReact(),
      ],
    },
    {
      name: "server",
      type: "http",
      base: "/api",
      handler: "./server/index.ts",
      plugins: () => [tsconfigPaths()],
    },
  ],
});
