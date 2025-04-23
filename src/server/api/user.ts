import { db } from "@/server/db/db";
import { createErrorResponse, createSuccessResponse } from "@/shared/utils";
import { users } from "@db/tables";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { Hono } from "hono";

const userRoutes = new Hono();

// Fetch a single user by ID
userRoutes.get("/users/:id", async (c) => {
  try {
    const userId = c.req.param("id");
    const user = await db.select().from(users).where(eq(users.id, userId));
    if (!user || user.length === 0) {
      return createErrorResponse(c, "USER_NOT_FOUND", "User not found", 404);
    }
    return createSuccessResponse(c, user, "User retrieved successfully");
  } catch (error) {
    console.error("Error fetching user:", error);
    return createErrorResponse(c, "FETCH_USER_ERROR", "An error occurred while fetching the user", 500);
  }
});

userRoutes.get("/users", async (c) => {
  try {
    const rows = await db.select({ id: users.id, username: users.username }).from(users);
    return createSuccessResponse(c, rows, "Fetched all users");
  } catch (err) {
    console.error(err);
    return createErrorResponse(c, "FETCH_USERS_ERROR", "Failed to fetch users", 500);
  }
});

// Update an existing user
// userRoutes.patch("/users/:id", async (c) => {
//   try {
//     const userId = c.req.param("id");
//     const userToUpdate = updateUser.parse(await c.req.json());
//     // Fetch existing user from the database
//     const existingUser = await db.select().from(users).where(eq(users.id, userId));
//     if (!existingUser || existingUser.length === 0) {
//       return createErrorResponse(c, "USER_NOT_FOUND", "User not found", 404);
//     }
//     // Merge updated fields with the existing user data (Important to do this first so types match!)
//     const mergedUser = { ...existingUser[0], ...userToUpdate };
//     const updatedUser = await db.update(users).set(mergedUser).where(eq(users.id, userId)).returning();
//     return createSuccessResponse(c, updatedUser, "User updated successfully");
//   } catch (error) {
//     console.error("Error updating user:", error);
//     return createErrorResponse(c, "UPDATE_USER_ERROR", "Failed to update user", 400);
//   }
// });

// Delete a user
userRoutes.delete("/users/:id", async (c) => {
  try {
    const userId = c.req.param("id");
    await db.delete(users).where(eq(users.id, userId));
    return createSuccessResponse(c, { success: true }, "User deleted successfully");
  } catch (error) {
    console.error("Error deleting user:", error);
    return createErrorResponse(c, "DELETE_USER_ERROR", "Failed to delete user", 400);
  }
});

// User password update
userRoutes.patch("/users/password", async (c) => {
  try {
    const { id: userID, newPassword: newPassword } = await c.req.json();
    // Find user
    const user = await db.select().from(users).where(eq(users.id, userID));
    if (!user || user.length === 0) {
      return createErrorResponse(c, "USER_NOT_FOUND", "User not found", 404);
    }
    // Hash the new password
    const passSalt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newPassword, passSalt);
    await db.update(users).set({ password: passwordHash }).where(eq(users.id, userID));
    return createSuccessResponse(c, { success: true }, "Password updated successfully");
  } catch (error) {
    console.error("Error updating password:", (error as Error).message || error);
    return createErrorResponse(c, "UPDATE_PASSWORD_ERROR", "Failed to update password", 500);
  }
});

export default userRoutes;
