import { createEnv } from "@t3-oss/env-core";
import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();
console.log("DATABASE_URL:", process.env.DATABASE_URL);
console.log("RESEND_API_KEY:", process.env.RESEND_API_KEY);

// This parses the enviorment variables according to a zod schema and provides them to the server
export const SERVER_ENV = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    DATABASE_AUTH_TOKEN: z.string().optional(),
    RESEND_API_KEY: z.string(),
  },
  runtimeEnv: process.env,
});
