import {
  insertPersonalSchema,
  insertProfessionalSchema,
} from "@/shared/infoSchema";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { db } from "../db";
import * as Schema from "../db/schema";

const infoRoutes = new Hono();

//Insert personal info
infoRoutes.post("/users/personal", async (c) => {
  const personalInfoInsertion = insertPersonalSchema.parse(await c.req.json());
  const personal_info = await db
    .insert(Schema.personalInfo)
    .values(personalInfoInsertion);
  return c.json({ personal_info });
});

//Query personal info by user_id
infoRoutes.get("/users/personal/:id", async (c) => {
  const user_id = c.req.param("id");
  const personal_info = await db
    .select()
    .from(Schema.personalInfo)
    .where(eq(Schema.personalInfo.user_id, user_id));
  return c.json({ personal_info });
});

//Insert professional info
infoRoutes.post("/users/professional", async (c) => {
  const professionalInfoInsertion = insertProfessionalSchema.parse(
    await c.req.json(),
  );
  const professional_info = await db
    .insert(Schema.professionalInfo)
    .values(professionalInfoInsertion);
  return c.json({ professional_info });
});

//Query professional info by user_id
infoRoutes.get("/users/professional/:id", async (c) => {
  const user_id = c.req.param("id");
  const professional_info = await db
    .select()
    .from(Schema.professionalInfo)
    .where(eq(Schema.professionalInfo.user_id, user_id));
  return c.json({ professional_info });
});

export default infoRoutes;
