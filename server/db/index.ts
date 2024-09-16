import { SERVER_ENV } from "@/shared/env";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

const client = createClient({
  url: SERVER_ENV.DATABASE_URL,
  authToken: SERVER_ENV.DATABASE_AUTH_TOKEN,
});

export const db = drizzle(client);
