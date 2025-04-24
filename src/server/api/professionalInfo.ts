import { createErrorResponse, createSuccessResponse } from "@/shared/utils";
import { professionalInfoInsertSchema, professionalInfoUpdateSchema } from "@schema/professionalInfoSchema";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { db } from "../db/db";
import * as Schema from "../db/tables";

const infoRoutes = new Hono();

infoRoutes.post("/users/professional", async (c) => {
  try {
    const payload = await c.req.json();
    const professionalInfoInsertion = professionalInfoInsertSchema.parse(payload);
    await db.insert(Schema.professionalInfo).values(professionalInfoInsertion);
    return createSuccessResponse(c, null, "Professional info created successfully");
  } catch (error) {
    console.log(error);
    return createErrorResponse(c, "INSERT_PROFESSIONAL_ERROR", "Failed to create professional info", 500);
  }
});

infoRoutes.get("/users/professional/:id", async (c) => {
  try {
    const user_id = c.req.param("id");
    const professional_info = await db.select().from(Schema.professionalInfo).where(eq(Schema.professionalInfo.userId, user_id)).get();
    if (!professional_info) return createErrorResponse(c, "MISSING_PROFESSIONAL_INFO", "No professional info found", 404);
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
    const professional_info = await db.update(Schema.professionalInfo).set(updateInfo).where(eq(Schema.professionalInfo.userId, user_id));
    return createSuccessResponse(c, professional_info, "Professional info updated successfully");
  } catch (error) {
    console.log(error);
    return createErrorResponse(c, "UPDATE_PROFESSIONAL_ERROR", "Failed to update professional info", 500);
  }
});

export default infoRoutes;
