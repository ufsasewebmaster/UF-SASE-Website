import { FOO } from "@/shared";
import { AutoRouter } from "itty-router";
import { eventHandler, toWebRequest } from "vinxi/http";

// https://h3.unjs.io/guide/event-handler
export default eventHandler(async (event) => {
  return router.fetch(toWebRequest(event));
});

// https://itty.dev/itty-router/
const router = AutoRouter().get("/", () => new Response("Hello World!" + FOO));
