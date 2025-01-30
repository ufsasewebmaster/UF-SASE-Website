import { SERVER_ENV } from "@server/env";
import { defineConfig } from "drizzle-kit";

// Log the database credentials
console.log("DATABASE_URL:", SERVER_ENV.DATABASE_URL);
console.log("DATABASE_AUTH_TOKEN:", SERVER_ENV.DATABASE_AUTH_TOKEN);

export default defineConfig({
  schema: "./src/server/db/tables.ts",
  dialect: "turso",
  out: "./drizzle",
  dbCredentials: {
    url: SERVER_ENV.DATABASE_URL,
    authToken: SERVER_ENV.DATABASE_AUTH_TOKEN,
  },
  verbose: true,
  strict: true,
});
