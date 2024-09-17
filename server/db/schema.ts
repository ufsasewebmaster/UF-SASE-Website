import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// Here we define our database schema as code

export const todos = sqliteTable("todo", {
  id: integer("id").notNull().primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  completed: integer("completed", { mode: "boolean" }).notNull(),
});
