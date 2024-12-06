import { db } from "@db/index";
import * as Schema from "@db/tables";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { generateIdFromEntropySize } from "lucia";

const profileRoutes = new Hono();

profileRoutes.get("/profile/", async (c) => {
  const cookie = await c.req.header("Cookie");
  let sessionID = "";
  if (cookie && cookie.startsWith("sessionId=")) {
    sessionID = cookie.substring("sessionId=".length); // Extract the value after "sessionID="
  }
  const result = await db
    .select({ username: Schema.users.username })
    .from(Schema.users)
    .innerJoin(Schema.sessions, eq(Schema.users.id, Schema.sessions.user_id))
    .where(eq(Schema.sessions.id, sessionID));

  if (result.length == 1) {
    return c.json(result[0]);
  } else {
    console.error("More than one user for a session");
  }
});

export default profileRoutes;
