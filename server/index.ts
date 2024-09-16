// import { FOO } from "@/shared";
import { AutoRouter } from "itty-router";
import { eventHandler, toWebRequest } from "vinxi/http";
import { db } from "./db";
import * as Schema from "./db/schema";

// https://h3.unjs.io/guide/event-handler
export default eventHandler(async (event) => {
  return router.fetch(toWebRequest(event));
});

// https://itty.dev/itty-router/
const router = AutoRouter().get("/todos", async () => {
  const todos = await db.select().from(Schema.todos);
  return {
    todos,
  };
});
