import { SERVER_ENV } from "@/server/env";
import type { Client} from "@libsql/client";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

// Here we create our database client

let client;
try {
  client = createClient({
    url: SERVER_ENV.DATABASE_URL,
    authToken: SERVER_ENV.DATABASE_AUTH_TOKEN,
  });
  console.log('Client initialized successfully:', client);
} catch (error) {
  console.error('Error initializing client:', error);
  throw new Error('Failed to initialize client');
}

export const db = drizzle(client as Client);