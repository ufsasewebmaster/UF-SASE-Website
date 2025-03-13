import { db } from "@/server/db/db";
import { createErrorResponse, createSuccessResponse } from "@/shared/utils";
import * as Schema from "@db/tables";
import { saseInfoSchema } from "@schema/saseInfoSchema";
import { eq } from "drizzle-orm";
import { Hono } from "hono";

const saseRoutes = new Hono();

saseRoutes.post("/users/sase", async (c) => {
  try {
    const saseInfoInsertion = saseInfoSchema.parse(await c.req.json());
    const sase_info = await db.insert(Schema.saseInfo).values(saseInfoInsertion);
    return createSuccessResponse(c, sase_info, "SASE info created successfully");
  } catch (error) {
    console.error("Error creating SASE info:", error);
    return createErrorResponse(c, "INSERT_SASE_ERROR", "Failed to create SASE info", 500);
  }
});

saseRoutes.get("/users/sase/:id", async (c) => {
  try {
    const user_id = c.req.param("id");
    const sase_info = await db.select().from(Schema.saseInfo).where(eq(Schema.saseInfo.user_id, user_id));
    return createSuccessResponse(c, sase_info, "SASE info retrieved successfully");
  } catch (error) {
    console.error("Error retrieving SASE info:", error);
    return createErrorResponse(c, "FETCH_SASE_ERROR", "Failed to retrieve SASE info", 500);
  }
});

export default saseRoutes;
