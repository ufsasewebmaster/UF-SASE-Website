import { db } from "@/server/db/db";
// import { MMRelationshipSchema } from "@/shared/schema";
import { createErrorResponse, createSuccessResponse } from "@/shared/utils";
import { mentorMenteeInvites, mentorMenteeRelationship, users } from "@db/tables";
import { and, eq, or } from "drizzle-orm";
import { Hono } from "hono";

const mentorMenteeRoutes = new Hono();

// MM Relations
mentorMenteeRoutes.get("/mentorMentee/all", async (c) => {
  try {
    const result = await db.select().from(mentorMenteeRelationship);
    return createSuccessResponse(c, result, "MMRelationship retrieved successfully");
  } catch (error) {
    console.log(error);
    return createErrorResponse(c, "UNKNOWN_ERROR", "Failed to fetch mm routes" + error, 500);
  }
});

// TODO: admin verification within route?
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

// Get users listed in MM relations
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

/*
 * Handling MM invites
 */

mentorMenteeRoutes.get("mentorMentee/invite/:id", async (c) => {
  try {
    const id = c.req.param("id");
    if (!id) return createErrorResponse(c, "MISSING_PARAMETERS", "missing params", 422);
    const res = await db
      .select()
      .from(mentorMenteeInvites)
      .where(or(eq(mentorMenteeInvites.mentorId, id), eq(mentorMenteeInvites.menteeId, id)));
    return createSuccessResponse(c, res, "invites retrieved successfully");
  } catch (error) {
    return createErrorResponse(c, "UNKNOWN_ERROR", "Failed to get invites: " + error, 500);
  }
});

mentorMenteeRoutes.post("mentorMentee/invite", async (c) => {
  try {
    const { menteeId, mentorId } = await c.req.json();
    if (!mentorId || !menteeId) {
      return createErrorResponse(c, "MISSING_PARAMETERS", "missing parameters", 422);
    }

    // 1) Prevent duplicate invites for the same pair
    const already = await db
      .select()
      .from(mentorMenteeInvites)
      .where(and(eq(mentorMenteeInvites.mentorId, mentorId), eq(mentorMenteeInvites.menteeId, menteeId)))
      .get();
    if (already) {
      return createErrorResponse(c, "ALREADY_INVITED", "You have already sent an invite to this user", 400);
    }

    const outgoing = await db.select().from(mentorMenteeInvites).where(eq(mentorMenteeInvites.menteeId, menteeId)).all();
    if (outgoing.length >= 10) {
      return createErrorResponse(c, "TOO_MANY_INVITES", "You may only have up to 10 pending invites at once", 400);
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

export default mentorMenteeRoutes;
