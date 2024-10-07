import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
import "dotenv/config";

// This parses the enviorment variables according to a zod schema and provides them to the server
export const SERVER_ENV = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    DATABASE_AUTH_TOKEN: z.string().optional(),
  },
  runtimeEnv: process.env,
});
