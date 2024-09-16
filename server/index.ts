import { FOO } from "@shared/index";
import { eventHandler, toWebRequest } from "vinxi/http";

// https://h3.unjs.io/guide/event-handler
export default eventHandler(async (event) => {
  const _req = toWebRequest(event);
  return new Response("Hello World!" + FOO);
});
