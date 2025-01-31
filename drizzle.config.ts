import { defineConfig } from "drizzle-kit";
import { env } from "src/env";

export default defineConfig({
  schema: "./src/server/db/tables.ts",
  dialect: "sqlite",
  driver: "turso",
  out: "./drizzle",
  dbCredentials: {
    url: env.DATABASE_URL,
    authToken: env.DATABASE_AUTH_TOKEN,
  },
  verbose: true,
  strict: true,
});
