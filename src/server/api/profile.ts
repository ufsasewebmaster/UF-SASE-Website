import { db } from "@/server/db/db";
import * as Schema from "@db/tables";
import { eq } from "drizzle-orm";
import { Hono } from "hono";

const profileRoutes = new Hono();

const profileSchema = {
  username: Schema.users.username,
  first_name: Schema.personalInfo.first_name,
  last_name: Schema.personalInfo.last_name,
  email: Schema.personalInfo.email,
  phone: Schema.personalInfo.phone,
  resume: Schema.professionalInfo.resume_path,
  linkedin: Schema.professionalInfo.linkedin,
  portfolio: Schema.professionalInfo.portfolio,
  majors: Schema.professionalInfo.majors,
  minors: Schema.professionalInfo.minors,
  graduation_semester: Schema.professionalInfo.graduation_semester,
};

// Fetch profile, return JSON object of {data: <profileSchema>, message: <string>}
//This route expects a session ID in the cookie, make sure a user is signed in when calling this endpoint
profileRoutes.get("/profile", async (c) => {
  try {
    const cookie = c.req.header("Cookie") || "";
    const sessionID = cookie.startsWith("sessionId=") ? cookie.slice("sessionId=".length) : null;

    if (!sessionID) return c.json({ error: { code: 400, message: "Missing or invalid session ID" } }, 400);

    const result = await db
      .select(profileSchema)
      .from(Schema.users)
      .innerJoin(Schema.sessions, eq(Schema.users.id, Schema.sessions.user_id))
      .innerJoin(Schema.personalInfo, eq(Schema.users.id, Schema.personalInfo.user_id))
      .innerJoin(Schema.professionalInfo, eq(Schema.users.id, Schema.professionalInfo.user_id))
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
