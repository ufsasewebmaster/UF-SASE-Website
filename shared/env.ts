import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const SERVER_ENV = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    DATABASE_AUTH_TOKEN: z.string().optional(),
  },
  runtimeEnv: process.env,
});

export const CLIENT_ENV = createEnv({
  clientPrefix: "VITE_",
  client: {},
  runtimeEnv: process.env,
});
