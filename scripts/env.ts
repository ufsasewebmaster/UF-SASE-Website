import { createEnv } from "@t3-oss/env-core";
import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();
export const SEED_ENV = createEnv({
  server: {
    ADMIN_USERNAME: z.string(),
    ADMIN_PASSWORD: z.string(),
    ADMIN_EMAIL: z.string(),
    TEST_USERNAME: z.string(),
    TEST_PASSWORD: z.string(),
    TEST_EMAIL: z.string().email(),
  },
  runtimeEnv: process.env,
});
