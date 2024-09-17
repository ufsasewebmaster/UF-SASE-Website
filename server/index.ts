import { todoInsertSchema, updateTodoSchema } from "@/shared/schema";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { eventHandler, toWebRequest } from "vinxi/http";
import { db } from "./db";
import * as Schema from "./db/schema";

// https://h3.unjs.io/guide/event-handler
export default eventHandler(async (event) => {
  return app.fetch(toWebRequest(event));
});

// https://hono.dev/
const app = new Hono()
  .use(logger())
  .get("/api/todos", async (c) => {
    const todos = await db.select().from(Schema.todos);
    return c.json({ todos });
  })
  .post("/api/todos", async (c) => {
    const toInsert = todoInsertSchema.parse(await c.req.json());
    const todo = await db.insert(Schema.todos).values(toInsert);
    return c.json({ todo });
  })
  .get("/api/todos/:id", async (c) => {
    const id = Number(c.req.param("id"));
    const todos = await db
      .select()
      .from(Schema.todos)
      .where(eq(Schema.todos.id, id));
    return c.json({ todos });
  })
  .delete("/api/todos/:id", async (c) => {
    const id = Number(c.req.param("id"));
    await db.delete(Schema.todos).where(eq(Schema.todos.id, id));
    return c.json({ message: "Deleted todo" });
  })
  .patch("/api/todos/:id", async (c) => {
    const id = Number(c.req.param("id"));
    const toUpdate = updateTodoSchema.parse(await c.req.json());
    await db.update(Schema.todos).set(toUpdate).where(eq(Schema.todos.id, id));
    return c.json({ message: "Updated todo" });
  });
