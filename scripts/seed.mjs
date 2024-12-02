import { createClient } from "@libsql/client";
import "dotenv/config";

const client = createClient({
  url: "file:local.db",
});

client.query(
  "INSERT INTO users (username, points, roles) VALUES ('test', 0, 'admin')",
); // should populate users

// Suggested to use this different way of inserting data, but idk how it works.

// import { drizzle } from "drizzle-orm/sqlite";
// import { open } from "sqlite";
// import sqlite3 from "sqlite3";
// import * as Schema from "./db/schema";
// import console from "console";

// // Use a file-based SQLite DB to persist data
// const db = drizzle(
//   await open({
//     filename: "local.db",
//     driver: sqlite3.Database,
//   })
// );

// await db.insert(Schema.users).values({
//   id: "1",
//   username: "testuser",
//   ...
// });

// // Verify that the user was inserted
// const result = await db.select().from(Schema.users);
// console.log(result);
