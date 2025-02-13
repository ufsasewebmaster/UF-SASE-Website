// import * as Schema from "./db/schema";
// import { eq } from "drizzle-orm";
import authRoutes from "@api/auth";
import blogRoutes from "@api/blogs";
import contactRoutes from "@api/contact";
import emailRoutes from "@api/email";
import profileRoutes from "@api/profile";
import saseRoutes from "@api/saseInfo";
import tagRoutes from "@api/tags";
import userRoutes from "@api/user";
import infoRoutes from "@api/userInfo";
import type { MiddlewareHandler } from "hono";
import { Hono } from "hono";
import { eventHandler, toWebRequest } from "vinxi/http";

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
app.routes.forEach((route) => {
  console.log(`Method: ${route.method}, Path: ${route.path}`);
});

app.use("*", logger);
app
  .get("/", (c) => c.text("TEST"))
  .route("/api", userRoutes)
  .route("/api", blogRoutes)
  .route("/api", infoRoutes)
  .route("/api", tagRoutes)
  .route("/api", saseRoutes)
  .route("/api", authRoutes)
  .route("/api", emailRoutes)
  .route("/api", profileRoutes)
  .route("/api", contactRoutes);