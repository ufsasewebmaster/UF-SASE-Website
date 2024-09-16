import { createApp } from "vinxi";
import viteReact from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default createApp({
  routers: [
    {
      name: "public",
      type: "static",
      base: "/public",
      dir: "./public",
    },
    {
      name: "client",
      type: "spa",
      handler: "./index.html",
      target: "browser",
      plugins: () => [
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
      base: "/server",
      handler: "./server/index.ts",
    },
  ],
});
