import { defineConfig } from "drizzle-kit";
import { SERVER_ENV } from "./shared/env";

export default defineConfig({
  schema: "./server/db/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: SERVER_ENV.DATABASE_URL,
    authToken: SERVER_ENV.DATABASE_AUTH_TOKEN,
  },
  verbose: true,
  strict: true,
});
