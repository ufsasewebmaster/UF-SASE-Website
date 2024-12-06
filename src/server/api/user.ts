// import { eq } from "drizzle-orm";
import { db } from "@db/index";
import * as Schema from "@db/tables";
import { insertUserSchema } from "@shared/schema/userSchema";
import { Hono } from "hono";

const userRoutes = new Hono();

userRoutes.get("/users", async (c) => {
  const users = await db.select().from(Schema.users);
  return c.json({ users });
});

// Need to await and validate (wow that rhymes) the user
userRoutes.post("/users", async (c) => {
  const userToInsert = insertUserSchema.parse(await c.req.json());
  const user = await db.insert(Schema.users).values(userToInsert);
  return c.json({ user });
});

export default userRoutes;
