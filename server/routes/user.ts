import { userInsertSchema } from "@/shared/userSchema";
import { Hono } from "hono";
// import { eq } from "drizzle-orm";
import { db } from "../db";
import * as Schema from "../db/schema";

const userRoutes = new Hono();

userRoutes.get("/users", async (c) => {
  const users = await db.select().from(Schema.users);
  return c.json({ users });
});

// Need to await and validate (wow that rhymes) the user
userRoutes.post("/users", async (c) => {
  const userToInsert = userInsertSchema.parse(await c.req.json());
  const user = await db.insert(Schema.users).values(userToInsert);
  return c.json({ user });
});

export default userRoutes;
