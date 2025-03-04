import { db } from "@/server/db/db";
import * as Schema from "@db/tables";
import { getTableColumns, eq } from "drizzle-orm";
import { Hono } from "hono";
import { createSuccessResponse, createErrorResponse } from "@/shared/utils";

const profileRoutes = new Hono();

const profileSelection = {
  id: Schema.users.id,
  username: Schema.users.username,
  email: Schema.users.email,
  time_added: Schema.users.time_added,
  time_updated: Schema.users.time_updated,
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

profileRoutes.get("/profile", async (c) => {
  try {
    const cookie = c.req.header("Cookie") || "";
    const sessionIDMatch = cookie.match(/sessionId=([^;]*)/);
    if (!sessionIDMatch) {
      return createErrorResponse(c, "INVALID_SESSION", "Missing or invalid session ID", 400);
    }
    const sessionID = sessionIDMatch[1];

    const result = await db
      .select(profileSelection)
      .from(Schema.users)
      .innerJoin(Schema.sessions, eq(Schema.users.id, Schema.sessions.user_id))
      .innerJoin(Schema.personalInfo, eq(Schema.users.id, Schema.personalInfo.user_id))
      .innerJoin(Schema.professionalInfo, eq(Schema.users.id, Schema.professionalInfo.user_id))
      .where(eq(Schema.sessions.id, sessionID));

    if (result.length === 1) {
      return createSuccessResponse(c, result[0], "Profile retrieved successfully");
    } else if (result.length === 0) {
      console.log(sessionID);
      return createErrorResponse(c, "NO_USER_FOUND", "No user found", 404);
    } else {
      return createErrorResponse(c, "MULTIPLE_USERS", "Multiple users", 500);
    }
  } catch (err) {
    console.error("Error:", err);
    return createErrorResponse(c, "FETCH_PROFILE_ERROR", "Internal server error", 500);
  }
});


// Fetch profile, return JSON object of {data: <profileSchema>, message: <string>}
// This route expects a session ID in the cookie, make sure a user is signed in when calling this endpoint
profileRoutes.get("/profile", async (c) => {
  try {
    const cookie = c.req.header("Cookie") || "";
    const sessionIDMatch = cookie.match(/sessionId=([^;]*)/);
    if (!sessionIDMatch) {
      return createErrorResponse(c, "INVALID_SESSION", "Missing or invalid session ID", 400);
    }
    const sessionID = sessionIDMatch[1];

    const result = await db
      .select(profileSelection)
      .from(Schema.users)
      .innerJoin(Schema.sessions, eq(Schema.users.id, Schema.sessions.user_id))
      .innerJoin(Schema.personalInfo, eq(Schema.users.id, Schema.personalInfo.user_id))
      .innerJoin(Schema.professionalInfo, eq(Schema.users.id, Schema.professionalInfo.user_id))
      .where(eq(Schema.sessions.id, sessionID));

    if (result.length === 1) {
      return createSuccessResponse(c, result[0], "Profile retrieved successfully");
    } else {
      if (result.length === 0) {
        console.log(sessionID);
        return createErrorResponse(c, "NO_USER_FOUND", "No user found", 404);
      } else {
        return createErrorResponse(c, "MULTIPLE_USERS", "Multiple users", 500);
      }
    }
  } catch (err) {
    console.error("Error:", err);
    return createErrorResponse(c, "FETCH_PROFILE_ERROR", "Internal server error", 500);
  }
});

profileRoutes.patch("/profile", async (c) => {
  try {
    const cookie = c.req.header("Cookie") || "";
    const sessionIDMatch = cookie.match(/sessionId=([^;]*)/);
    if (!sessionIDMatch) {
      return createErrorResponse(c, "INVALID_SESSION", "Missing or invalid session ID", 400);
    }
    const sessionID = sessionIDMatch[1];

    const result = await db.select().from(Schema.sessions).where(eq(Schema.sessions.id, sessionID));
    if (result.length > 0) {
      // Creates a set of column names for personal and professional info respectively
      const columnNames = generateColumns();
      const personalColumns = columnNames[0];
      const professionalColumns = columnNames[1];
      const userID = result[0].user_id;

      const body = await c.req.json();

      const updatePromises = Object.keys(body).map(async (key) => {
        if (key in profileSelection) {
          const value = body[key];

          // Update based on the column name and its respective table
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

      await Promise.all(updatePromises);
      return createSuccessResponse(c, {}, "Profile updated successfully");
    } else {
      return createErrorResponse(c, "INVALID_SESSION", "Invalid session", 400);
    }
  } catch (err) {
    console.error("Error updating profile:", err);
    return createErrorResponse(c, "UPDATE_PROFILE_ERROR", "Failed to update info", 500);
  }
});

export default profileRoutes;

function generateColumns() {
  const personalInfoColumns = new Set(
    Object.values(getTableColumns(Schema.personalInfo)).map((col) => col.name)
  );
  const professionalInfoColumns = new Set(
    Object.values(getTableColumns(Schema.professionalInfo)).map((col) => col.name)
  );
  return [personalInfoColumns, professionalInfoColumns];
}
