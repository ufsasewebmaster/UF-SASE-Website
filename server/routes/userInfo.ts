import {
  insertPersonalSchema,
  insertProfessionalSchema,
} from "@/shared/infoSchema";
import { Hono } from "hono";
// import { eq } from "drizzle-orm";
import { db } from "../db";
import * as Schema from "../db/schema";

const infoRoutes = new Hono();

infoRoutes.post("/users/personal", async (c) => {
  const personalInfoInsertion = insertPersonalSchema.parse(await c.req.json());
  const personal_info = await db
    .insert(Schema.personalInfo)
    .values(personalInfoInsertion);
  return c.json({ personal_info });
});

infoRoutes.post("/users/professional", async (c) => {
  const professionalInfoInsertion = insertProfessionalSchema.parse(
    await c.req.json(),
  );
  const professional_info = await db
    .insert(Schema.professionalInfo)
    .values(professionalInfoInsertion);
  return c.json({ professional_info });
});

export default infoRoutes;
