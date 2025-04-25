import { db } from "@/server/db/db";
import { createErrorResponse, createSuccessResponse } from "@/shared/utils";
import * as Schema from "@db/tables";
import { eq, getTableColumns } from "drizzle-orm";
import { Hono } from "hono";

const profileRoutes = new Hono();

// TODO: HIGHLY consider separating this into the user vs professionalInfo components.
const profileSelection = {
  id: Schema.users.id,
  username: Schema.users.username,
  email: Schema.users.email,
  timeAdded: Schema.users.timeAdded,
  timeUpdated: Schema.users.timeUpdated,

  firstName: Schema.users.firstName,
  lastName: Schema.users.lastName,

  bio: Schema.professionalInfo.bio,
  phone: Schema.professionalInfo.phone,
  discord: Schema.professionalInfo.discord,

  resumePath: Schema.professionalInfo.resumePath,
  linkedin: Schema.professionalInfo.linkedin,
  portfolio: Schema.professionalInfo.portfolio,
  majors: Schema.professionalInfo.majors,
  minors: Schema.professionalInfo.minors,
  graduationSemester: Schema.professionalInfo.graduationSemester,
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
      .innerJoin(Schema.sessions, eq(Schema.users.id, Schema.sessions.userId))
      .innerJoin(Schema.professionalInfo, eq(Schema.users.id, Schema.professionalInfo.userId))
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
      .innerJoin(Schema.sessions, eq(Schema.users.id, Schema.sessions.userId))
      .innerJoin(Schema.professionalInfo, eq(Schema.users.id, Schema.professionalInfo.userId))
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
      const professionalColumns = columnNames[0];
      const userInfoColumns = columnNames[1];
      const specialColumns = columnNames[2];

      const userID = result[0].userId;

      const body = await c.req.json();

      const updatePromises = Object.keys(body).map(async (key) => {
        if (key in profileSelection) {
          const value = body[key];
          // Update based on the column name and its respective table
          if (professionalColumns.has(key)) {
            await db
              .update(Schema.professionalInfo)
              .set({ [key]: value })
              .where(eq(Schema.professionalInfo.userId, userID));
          } else if (userInfoColumns.has(key)) {
            await db
              .update(Schema.users)
              .set({ [key]: value })
              .where(eq(Schema.users.id, userID));
          }
        }
        if (specialColumns.has(key)) {
          const newRoleArray: Array<string> = body.roles.split(",");
          //delete user's existing roles
          await db.delete(Schema.userRoleRelationship).where(eq(Schema.userRoleRelationship.userId, userID));
          await insertRoles(newRoleArray, userID);
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

const insertRoles = (roleArray: Array<string>, userID: string) => {
  return Promise.all(
    roleArray.map(async (raw) => {
      const role = raw.trim();
      try {
        await db.insert(Schema.roles).values({ name: role }).onConflictDoNothing();
        await db.insert(Schema.userRoleRelationship).values({ userId: userID, role }).onConflictDoNothing();
      } catch (err) {
        console.error(`Error inserting role “${role}”:`, err);
      }
    }),
  );
};

export default profileRoutes;

function generateColumns() {
  const professionalInfoColumns = new Set(Object.values(getTableColumns(Schema.professionalInfo)).map((col) => col.name));
  const userInfoColumns = new Set(["username", "email", "time_updated"]);
  //For columns that require special processing or database touching things that are not really columns- just roles for now
  const specialColumns = new Set(["roles"]);
  return [professionalInfoColumns, userInfoColumns, specialColumns];
}
