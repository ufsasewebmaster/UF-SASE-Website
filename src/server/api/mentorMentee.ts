import { db } from "@/server/db/db";
// import { MMRelationshipSchema } from "@/shared/schema";
import { createErrorResponse, createSuccessResponse } from "@/shared/utils";
import { mentorMenteeInvites, mentorMenteeRelationship, users } from "@db/tables";
import { eq } from "drizzle-orm";
import { Hono } from "hono";

const mentorMenteeRoutes = new Hono();

mentorMenteeRoutes.get("/mentorMentee/all", async (c) => {
  try {
    const result = await db.select().from(mentorMenteeRelationship);
    return createSuccessResponse(c, result, "MMRelationship retrieved successfully");
  } catch (error) {
    console.log(error);
    return createErrorResponse(c, "UNKNOWN_ERROR", "Failed to fetch mm routes" + error, 500);
  }
});

// TODO: admin verification?
mentorMenteeRoutes.post("mentorMentee/single", async (c) => {
  try {
    const { menteeId, mentorId } = await c.req.json();
    if (!mentorId || !menteeId) {
      return createErrorResponse(c, "MISSING_PARAMETERS", "missing parameters", 422);
    }
    await db.insert(mentorMenteeRelationship).values({
      mentorId,
      menteeId,
    });
    return createSuccessResponse(c, null, "Mentor/Mentee pair inserted successfully");
  } catch (error) {
    return createErrorResponse(c, "UNKNOWN ERROR", "Failed to fetch mentor mentee routes " + error, 500);
  }
});

mentorMenteeRoutes.post("mentorMentee/invite", async (c) => {
  try {
    const { menteeId, mentorId } = await c.req.json();
    if (!mentorId || !menteeId) {
      return createErrorResponse(c, "MISSING_PARAMETERS", "missing parameters", 422);
    }
    await db.insert(mentorMenteeInvites).values({ mentorId, menteeId });
    return createSuccessResponse(c, null, "Mentor/Mentee pair inserted successfully");
  } catch (error) {
    return createErrorResponse(c, "UNKNOWN_ERROR", "Failed to invite: " + error, 500);
  }
});

mentorMenteeRoutes.post("mentorMentee/accept-invite", async (c) => {
  const { id } = await c.req.json();
  const invite = await db.select().from(mentorMenteeInvites).where(eq(mentorMenteeInvites.id, id)).get();
  if (!invite) {
    return createErrorResponse(c, "NOT_FOUND", "Invite not found", 404);
  }
  await db.insert(mentorMenteeRelationship).values({
    mentorId: invite.mentorId,
    menteeId: invite.menteeId,
  });
  await db.delete(mentorMenteeInvites).where(eq(mentorMenteeInvites.id, id));
  return createSuccessResponse(c, null, "Invite accepted");
});

mentorMenteeRoutes.delete("mentorMentee/invite", async (c) => {
  try {
    const id = c.req.query("id");
    if (!id) {
      return createErrorResponse(c, "MISSING_PARAMETERS", "Invite `id` is required", 422);
    }
    await db.delete(mentorMenteeInvites).where(eq(mentorMenteeInvites.id, id));
    return createSuccessResponse(c, null, "Invite deleted successfully");
  } catch (error) {
    return createErrorResponse(c, "UNKNOWN_ERROR", "Failed to delete invite: " + error, 500);
  }
});

mentorMenteeRoutes.get("mentorMentee/mentors", async (c) => {
  try {
    const res = await db
      .selectDistinct({
        mentorId: mentorMenteeRelationship.mentorId,
        firstName: users.firstName,
        lastName: users.lastName,
      })
      .from(mentorMenteeRelationship)
      .innerJoin(users, eq(users.id, mentorMenteeRelationship.mentorId));
    return createSuccessResponse(c, res, "Mentors retrieved successfully");
  } catch (error) {
    return createErrorResponse(c, "UNKNOWN_ERROR", "Failed to fetch mentors: " + error, 500);
  }
});

mentorMenteeRoutes.get("mentorMentee/mentees", async (c) => {
  try {
    const res = await db
      .selectDistinct({
        menteeId: mentorMenteeRelationship.menteeId,
        firstName: users.firstName,
        lastName: users.lastName,
      })
      .from(mentorMenteeRelationship)
      .innerJoin(users, eq(users.id, mentorMenteeRelationship.menteeId));
    return createSuccessResponse(c, res, "Mentees retrieved successfully");
  } catch (error) {
    return createErrorResponse(c, "UNKNOWN_ERROR", "Failed to fetch mentees: " + error, 500);
  }
});

export default mentorMenteeRoutes;
