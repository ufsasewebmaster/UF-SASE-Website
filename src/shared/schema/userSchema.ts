import { z } from "zod";

export const userSchema = z.object({
  id: z.string().min(1, "User ID is required."),
  username: z.string().min(1, "Username is required."),
  password_hash: z.string().min(1, "Password hash is required."),
  time_added: z.number().int().min(0, "Time added must be a valid timestamp."),
  time_updated: z
    .number()
    .int()
    .min(0, "Time updated must be a valid timestamp."),
  points: z.number().int().min(0).optional(),
  roles: z.string().optional(),
});
export type User = z.infer<typeof userSchema>;

// Omits fields that are auto-generated or not required during user creation
export const insertUserSchema = userSchema
  .omit({
    id: true,
    time_added: true,
    time_updated: true,
    password_hash: true, // Exclude passwrod_hash; we'll provide password instead
  })
  .extend({
    password: z.string().min(6, "Password must be at least 6 characters long."), // Accept plain password
  });
export type InsertUser = z.infer<typeof insertUserSchema>;

export const selectUserSchema = userSchema.omit({
  password_hash: true, // Don't expose password hashes
});
export type SelectUser = z.infer<typeof selectUserSchema>;

export const updateUserSchema = userSchema
  .pick({
    username: true,
    points: true,
    roles: true,
  })
  .partial(); // Make all fields optional
export type UpdateUser = z.infer<typeof updateUserSchema>;
