import { personalInfoInsertSchema, personalInfoUpdateSchema } from "@schema/personalInfoSchema";
import { professionalInfoInsertSchema, professionalInfoUpdateSchema } from "@schema/professionalInfoSchema";
import { createSuccessResponse, createErrorResponse } from "@/shared/utils";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { db } from "../db/db";
import * as Schema from "../db/tables";

const infoRoutes = new Hono();

infoRoutes.post("/users/personal", async (c) => {
  try {
    const payload = await c.req.json();
    const personalInfoInsertion = personalInfoInsertSchema.parse(payload);
    const personal_info = await db.insert(Schema.personalInfo).values(personalInfoInsertion);
    return createSuccessResponse(c, personal_info, "Personal info added successfully");
  } catch (error) {
    console.log(error);
    return createErrorResponse(c, "INSERT_PERSONAL_ERROR", "Failed to add personal info", 500);
  }
});

infoRoutes.get("/users/personal/:id", async (c) => {
  try {
    const user_id = c.req.param("id");
    const personal_info = await db
      .select()
      .from(Schema.personalInfo)
      .where(eq(Schema.personalInfo.user_id, user_id));
    return createSuccessResponse(c, personal_info, "Personal info retrieved successfully");
  } catch (error) {
    console.log(error);
    return createErrorResponse(c, "FETCH_PERSONAL_ERROR", "Failed to retrieve personal info", 500);
  }
});

infoRoutes.patch("/users/personal/:id", async (c) => {
  try {
    const user_id = c.req.param("id");
    const payload = await c.req.json();
    const updateInfo = personalInfoUpdateSchema.parse(payload);
    const personal_info = await db
      .update(Schema.personalInfo)
      .set(updateInfo)
      .where(eq(Schema.personalInfo.user_id, user_id));
    return createSuccessResponse(c, personal_info, "Personal info updated successfully");
  } catch (error) {
    console.log(error);
    return createErrorResponse(c, "UPDATE_PERSONAL_ERROR", "Failed to update personal info", 500);
  }
});

infoRoutes.post("/users/professional", async (c) => {
  try {
    const payload = await c.req.json();
    const professionalInfoInsertion = professionalInfoInsertSchema.parse(payload);
    const professional_info = await db.insert(Schema.professionalInfo).values(professionalInfoInsertion);
    return createSuccessResponse(c, professional_info, "Professional info created successfully");
  } catch (error) {
    console.log(error);
    return createErrorResponse(c, "INSERT_PROFESSIONAL_ERROR", "Failed to create professional info", 500);
  }
});

infoRoutes.get("/users/professional/:id", async (c) => {
  try {
    const user_id = c.req.param("id");
    const professional_info = await db
      .select()
      .from(Schema.professionalInfo)
      .where(eq(Schema.professionalInfo.user_id, user_id));
    return createSuccessResponse(c, professional_info, "Professional info retrieved successfully");
  } catch (error) {
    console.log(error);
    return createErrorResponse(c, "FETCH_PROFESSIONAL_ERROR", "Failed to retrieve professional info", 500);
  }
});

infoRoutes.patch("/users/professional/:id", async (c) => {
  try {
    const user_id = c.req.param("id");
    const payload = await c.req.json();
    const updateInfo = professionalInfoUpdateSchema.parse(payload);
    const professional_info = await db
      .update(Schema.professionalInfo)
      .set(updateInfo)
      .where(eq(Schema.professionalInfo.user_id, user_id));
    return createSuccessResponse(c, professional_info, "Professional info updated successfully");
  } catch (error) {
    console.log(error);
    return createErrorResponse(c, "UPDATE_PROFESSIONAL_ERROR", "Failed to update professional info", 500);
  }
});

export default infoRoutes;
