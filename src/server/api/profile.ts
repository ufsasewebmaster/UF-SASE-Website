import { db } from "@/server/db/db";
import * as Schema from "@db/tables";
import { eq, getTableColumns } from "drizzle-orm";
import { Hono } from "hono";

const profileRoutes = new Hono();

const profileSchema = {
  username: Schema.users.username,
  first_name: Schema.personalInfo.first_name,
  last_name: Schema.personalInfo.last_name,
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
    console.log(cookie);
    const sessionIDMatch = cookie.match(/sessionId=([^;]*)/);
    if (!sessionIDMatch) {
      return c.json({ error: { code: 400, message: "Missing or invalid session ID" } }, 400);
    }
    const sessionID = sessionIDMatch[1];
    console.log(cookie, sessionID);

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

profileRoutes.patch("/profile", async (c) => {
  const cookie = c.req.header("Cookie") || "";
  const sessionIDMatch = cookie.match(/sessionId=([^;]*)/);
  if (!sessionIDMatch) {
    return c.json({ error: { code: 400, message: "Missing or invalid session ID" } }, 400);
  }
  const sessionID = sessionIDMatch[1];

  const result = await db.select().from(Schema.sessions).where(eq(Schema.sessions.id, sessionID));
  if (result.length > 0) {
    //Creates a set of column names for personal and professional info respectively
    const columnNames = generateColumns();
    const personalColumns = columnNames[0];
    const professionalColumns = columnNames[1];
    const userID = result[0].user_id;

    const body = await c.req.json();

    const updatePromises = Object.keys(body).map(async (key) => {
      if (key in profileSchema) {
        const value = body[key];

        //Update based on the column name and its respective table
        if (personalColumns.has(key)) {
          await db
            .update(Schema.personalInfo)
            .set({ [key]: value })
            .where(eq(Schema.personalInfo.user_id, userID));
        } else if (professionalColumns.has(key)) {
          await db
            .update(Schema.professionalInfo)
            .set({ [key]: value })
            .where(eq(Schema.professionalInfo.user_id, userID));
        }
      }
    });

    try {
      await Promise.all(updatePromises);
    } catch (err) {
      console.error("Error:", err);
      return c.json({ error: { code: 500, message: "Failed to update info" } }, 500);
    }
  } else {
    return c.json({ error: { code: 400, message: "Invalid session" } }, 400);
  }
  return c.json({ message: "Profile updated successfully" }, 200);
});
export default profileRoutes;

function generateColumns() {
  const personalInfoColumns = new Set(Object.values(getTableColumns(Schema.personalInfo)).map((col) => col.name));
  const professionalInfoColumns = new Set(Object.values(getTableColumns(Schema.professionalInfo)).map((col) => col.name));
  return [personalInfoColumns, professionalInfoColumns];
}
