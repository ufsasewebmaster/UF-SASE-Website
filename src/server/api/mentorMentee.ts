import { db } from "@/server/db/db";
// import { MMRelationshipSchema } from "@/shared/schema";
import { createErrorResponse, createSuccessResponse } from "@/shared/utils";
import * as Schema from "@db/tables";
import { mentorMenteeRelationship, personalInfo } from "@db/tables";
import { eq } from "drizzle-orm";
import { Hono } from "hono";

const mentorMenteeRoutes = new Hono();

mentorMenteeRoutes.get("/mentorMentee/all", async (c) => {
  try {
    const result = await db.select().from(Schema.mentorMenteeRelationship);
    return createSuccessResponse(c, result, "MMRelationship retrieved successfully");
  } catch (error) {
    console.log(error);
    return createErrorResponse(c, "UNKNOWN_ERROR", "Failed to fetch mm routes" + error, 500);
  }
});

// TODO: admin verification?
mentorMenteeRoutes.post("mentorMentee/single", async (c) => {
  try {
    const mentorId = c.req.query("mentorId");
    const menteeId = c.req.query("menteeId");
    if (!mentorId || !menteeId) {
      return createErrorResponse(c, "MISSING_PARAMETERS", "missing parameters", 422);
    }
    await db.insert(Schema.mentorMenteeRelationship).values({
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
    const mentorId = c.req.query("mentorId");
    const menteeId = c.req.query("menteeId");
    if (!mentorId || !menteeId) {
      return createErrorResponse(c, "MISSING_PARAMETERS", "missing parameters", 422);
    }
    await db.insert(Schema.mentorMenteeInvites).values({
      mentorId,
      menteeId,
    });
    return createSuccessResponse(c, null, "Mentor/Mentee pair inserted successfully");
  } catch (error) {
    return createErrorResponse(c, "UNKNOWN ERROR", "Failed to fetch mentor mentee routes " + error, 500);
  }
});

mentorMenteeRoutes.post("mentorMentee/accept-invite", async (c) => {
  const { id } = await c.req.json();
  const invite = await db.select().from(Schema.mentorMenteeInvites).where(eq(Schema.mentorMenteeInvites.id, id)).get();

  if (!invite) {
    return createErrorResponse(c, "NOT_FOUND", "Invite not found", 404);
  }
  await db.insert(Schema.mentorMenteeRelationship).values({
    mentorId: invite.mentorId,
    menteeId: invite.menteeId,
  });
  await db.delete(Schema.mentorMenteeInvites).where(eq(Schema.mentorMenteeInvites.id, id));
  return createSuccessResponse(c, null, "Invite accepted");
});

mentorMenteeRoutes.delete("mentorMentee/invite", async (c) => {
  try {
    const id = c.req.query("id");
    if (!id) {
      return createErrorResponse(c, "MISSING_PARAMETERS", "Invite `id` is required", 422);
    }
    await db.delete(Schema.mentorMenteeInvites).where(eq(Schema.mentorMenteeInvites.id, id));

    return createSuccessResponse(c, null, "Invite deleted successfully");
  } catch (error) {
    return createErrorResponse(c, "UNKNOWN_ERROR", "Failed to delete invite: " + error, 500);
  }
});

// TODO: Add join helpers / views to simplify process of getting names
mentorMenteeRoutes.get("mentorMentee/mentors", async (c) => {
  try {
    const res = await db
      .selectDistinct({
        mentorId: mentorMenteeRelationship.mentorId,
        firstName: personalInfo.firstName,
        lastName: personalInfo.lastName,
      })
      .from(Schema.mentorMenteeRelationship)
      .innerJoin(Schema.personalInfo, eq(personalInfo.userId, mentorMenteeRelationship.mentorId));
    return createSuccessResponse(c, res, "Mentors retrieved successfully");
  } catch (error) {
    return createErrorResponse(c, "UNKNOWN ERROR", "Failed to fetch mentors " + error, 500);
  }
});
mentorMenteeRoutes.get("mentorMentee/mentees", async (c) => {
  try {
    const res = await db
      .selectDistinct({
        menteeId: mentorMenteeRelationship.menteeId,
        firstName: personalInfo.firstName,
        lastName: personalInfo.lastName,
      })
      .from(mentorMenteeRelationship)
      .innerJoin(personalInfo, eq(personalInfo.userId, mentorMenteeRelationship.menteeId));

    return createSuccessResponse(c, res, "Mentees retrieved successfully");
  } catch (error) {
    return createErrorResponse(c, "UNKNOWN_ERROR", "Failed to fetch mentees: " + error, 500);
  }
});
export default mentorMenteeRoutes;
