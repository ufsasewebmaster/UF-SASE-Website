// app.config.ts
import { defineConfig } from "@tanstack/start/config";
import tsconfigPaths from "vite-tsconfig-paths";
var app_config_default = defineConfig({
  server: {
    preset: "vercel-edge"
    // prerender: {
    // crawlLinks: true,
    // routes: ["/"],
    // },
  },
  routers: {
    client: {
      entry: "./client/entry-client.tsx"
    },
    ssr: {
      entry: "./server/ssr.tsx"
    },
    api: {
      entry: "./server/entry-server.ts"
    }
  },
  tsr: {
    routesDirectory: "./client/routes",
    generatedRouteTree: "./client/routeTree.gen.ts",
    appDirectory: "."
  },
  vite: {
    plugins: () => [tsconfigPaths()]
  }
});
export {
  app_config_default as default
};
