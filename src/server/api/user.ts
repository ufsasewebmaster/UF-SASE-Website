import { db } from "@/server/db/db";
import * as Schema from "@db/tables";
import { updateUserSchema } from "@shared/schema/userSchema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { Hono } from "hono";

const userRoutes = new Hono();

// Fetch all users
userRoutes.get("/users", async (c) => {
  try {
    const users = await db.select().from(Schema.users);
    return c.json({ data: users, message: "Users retrieved successfully" });
  } catch (error) {
    console.error("Error fetching users:", error);
    return c.json({ error: { code: 500, message: "An error occurred while fetching users" } }, 500);
  }
});

// Fetch a single user by ID
userRoutes.get("/users/:id", async (c) => {
  try {
    const userId = c.req.param("id");
    const user = await db.select().from(Schema.users).where(eq(Schema.users.id, userId));

    if (!user) {
      return c.json({ error: { code: 404, message: "User not found" } }, 404);
    }

    return c.json({ data: user, message: "User retrieved successfully" });
  } catch (error) {
    console.error("Error fetching user:", error);
    return c.json({ error: { code: 500, message: "An error occurred while fetching the user" } }, 500);
  }
});

// Update an existing user
userRoutes.patch("/users/:id", async (c) => {
  try {
    const userId = c.req.param("id");
    const userToUpdate = updateUserSchema.parse(await c.req.json());

    // Fetch existing user from the database
    const existingUser = await db.select().from(Schema.users).where(eq(Schema.users.id, userId));
    if (!existingUser) {
      return c.json({ error: { code: 404, message: "User not found" } }, 404);
    }

    // Merge updated fields with the existing user data (Important to do this first so types match!)
    const mergedUser = { ...existingUser, ...userToUpdate };

    const updatedUser = await db.update(Schema.users).set(mergedUser).where(eq(Schema.users.id, userId)).returning();

    return c.json({ data: updatedUser, message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    return c.json({ error: { code: 400, message: "Failed to update user" } }, 400);
  }
});

// Delete a user
userRoutes.delete("/users/:id", async (c) => {
  try {
    const userId = c.req.param("id");
    await db.delete(Schema.users).where(eq(Schema.users.id, userId));
    return c.json({ data: { success: true }, message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return c.json({ error: { code: 400, message: "Failed to delete user" } }, 400);
  }
});

// User password update
userRoutes.patch("/users/:id/password", async (c) => {
  const userId = c.req.param("id");
  const { password: newPassword } = await c.req.json();

  // Find user
  const user = await db.select().from(Schema.users).where(eq(Schema.users.id, userId));
  if (!user) return new Response("User not found", { status: 404 });

  // Hash the new password
  const passSalt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(newPassword, passSalt);

  await db.update(Schema.users).set({ password: passwordHash }).where(eq(Schema.users.id, userId));
  return new Response("Password updated successfully", { status: 200 });
});

export default userRoutes;
