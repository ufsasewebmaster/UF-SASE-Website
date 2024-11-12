import { defineConfig } from "@tanstack/start/config";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    preset: "vercel-edge",
    prerender: {
      routes: ["/"],
      // crawlLinks: true,
    },
  },
  tsr: {
    appDirectory: "src/client",
    routesDirectory: "src/client/routes",
  },
  routers: {
    client: {
      entry: "./src/client/client.tsx",
    },
    ssr: {
      entry: "./src/server/ssr.tsx",
    },
    api: {
      entry: "./src/server/api.ts",
    },
  },
  vite: {
    plugins: [
      tsConfigPaths({
        projects: ["./tsconfig.json"],
      }),
    ],
  },
});
