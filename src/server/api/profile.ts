import { db } from "@db/index";
import * as Schema from "@db/tables";
import { eq } from "drizzle-orm";
import { Hono } from "hono";

const profileRoutes = new Hono();

profileRoutes.get("/profile", async (c) => {
  const cookie = c.req.header("Cookie");
  console.log(cookie);
  let sessionID = "";
  if (cookie && cookie.startsWith("sessionId=")) {
    sessionID = cookie.substring("sessionId=".length); // Extract the value after "sessionId="
  }
  const result = await db
    .select({ username: Schema.users.username })
    .from(Schema.users)
    .innerJoin(Schema.sessions, eq(Schema.users.id, Schema.sessions.user_id))
    .where(eq(Schema.sessions.id, sessionID));
  console.log(result);
  if (result.length == 1) {
    return c.json(result[0]);
  } else {
    console.error("More than one user for a session");
    return c.error;
  }
});

export default profileRoutes;
