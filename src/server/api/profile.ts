import { db } from "@/server/db/db";
import * as Schema from "@db/tables";
import { eq } from "drizzle-orm";
import { Hono } from "hono";

const profileRoutes = new Hono();

profileRoutes.get("/profile", async (c) => {
  try {
    const cookie = c.req.header("Cookie") || "";
    console.log(cookie);
    const sessionIDMatch = cookie.match(/sessionId=([^;]*)/);
    if (!sessionIDMatch) {
      return c.json({ error: { code: 400, message: "Missing or invalid session ID" } }, 400);
    }
    const sessionID = sessionIDMatch[1];
    console.log(cookie, sessionID);

    const result = await db
      .select({ username: Schema.users.username })
      .from(Schema.users)
      .innerJoin(Schema.sessions, eq(Schema.users.id, Schema.sessions.user_id))
      .where(eq(Schema.sessions.id, sessionID));

    return result.length === 1
      ? c.json({ data: result[0], message: "Profile retrieved successfully" }, 200)
      : c.json(
          { error: { code: result.length === 0 ? 404 : 500, message: result.length === 0 ? "No user found" : "Multiple users found" } },
          result.length === 0 ? 404 : 500,
        );
  } catch (err) {
    console.error("Error:", err);
    return c.json({ error: { code: 500, message: "Internal server error" } }, 500);
  }
});

export default profileRoutes;
