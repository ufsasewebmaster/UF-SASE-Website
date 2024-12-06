import { db } from "@db/index";
import * as Schema from "@db/tables";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { generateIdFromEntropySize } from "lucia";

const profileRoutes = new Hono();

profileRoutes.get("/profile/", async (c) => {
  const body = await c.req.header("Cookie");
  console.log(body);
  return new Response("Success");
});

export default profileRoutes;
