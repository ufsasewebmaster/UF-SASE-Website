import type { MiddlewareHandler } from "hono";
import { Hono } from "hono";
import { eventHandler, toWebRequest } from "vinxi/http";
<<<<<<< HEAD
import tagRoutes from "./routes/tags";
=======
import saseRoutes from "./routes/saseInfo";
>>>>>>> 7457b074514a1c7f8b878770f02ac97bb8f51928
// import * as Schema from "./db/schema";
// import { todoInsertSchema, updateTodoSchema } from "@/shared/schema";
// import { eq } from "drizzle-orm";
import todoRoutes from "./routes/todos";
import userRoutes from "./routes/user"; // How is @shared used?
import infoRoutes from "./routes/userInfo";
import titleRoutes from "./routes/blogTitle";

const logger: MiddlewareHandler = async (c, next) => {
  console.log(`${c.req.method} ${c.req.url}`);
  await next();
};

// This is the (actual) entry point, which we just redirect to the Hono server (https://h3.unjs.io/guide/event-handler)
export default eventHandler(async (event) => {
  return app.fetch(toWebRequest(event));
});

// Hono! https://hono.dev/
// This is the entry point for our server which lives on the /api path
const app = new Hono();
app.use("*", logger);
app
  .get("/", (c) => c.text("TEST"))
  .route("/api", todoRoutes)
  .route("/api", userRoutes)
  .route("/api", infoRoutes)
<<<<<<< HEAD
  .route("/api", tagRoutes)
  .route("/api", titleRoutes);
=======
  .route("/api", saseRoutes);
>>>>>>> 7457b074514a1c7f8b878770f02ac97bb8f51928
