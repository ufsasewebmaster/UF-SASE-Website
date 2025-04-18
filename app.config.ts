import { defineConfig, type TanStackStartOutputConfig } from "@tanstack/start/config";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import tsConfigPaths from "vite-tsconfig-paths";

const config = {
  server: {
    preset: "vercel",
    prerender: {
      routes: ["/"],
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
      entry: "./src/server/index.ts",
    },
  },
  vite: {
    ssr: {
      noExternal: ["react-force-graph-2d", "force-graph"],
    },
    plugins: [tsConfigPaths({ projects: ["./tsconfig.json"] }), ViteImageOptimizer()],
  },
};

// Cast the final output to a portable type. WTF???? Such weird workaround
const finalConfig = defineConfig(config) as TanStackStartOutputConfig;

export default finalConfig;
