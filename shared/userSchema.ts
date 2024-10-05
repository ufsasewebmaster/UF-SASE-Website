import { generateIdFromEntropySize } from 'lucia';
import { z } from 'zod';

export const userInsertSchema = z.object({
  username: z.string().min(1),
  password_hash: z.string().min(1),
  points: z.optional(z.number().int()),
  roles: z.optional(z.string()),
});

export type InsertUser = z.infer<typeof userInsertSchema>;

export const updateUserSchema = z.object({
  id: z.string(),
  username: z.string().optional(),
  points: z.optional(z.number().int()),
  roles: z.optional(z.string()),
});

export type UpdateUser = z.infer<typeof updateUserSchema>;

// Delete user schema
export const deleteUserSchema = z.object({
  id: z.string().min(1), // Ensures that 'id' is a non-empty string
});

export type DeleteUser = z.infer<typeof deleteUserSchema>;

export const userSchema = z.object({
    id: z.string().default(() => generateIdFromEntropySize(10)), // Required by lucia
    username: z.string().min(1), // Required by lucia, ensure uniqueness in application logic or database
    password_hash: z.string().min(1), // Required by lucia
    time_added: z
      .number()
      .int()
      .refine((val) => !isNaN(val), { message: "Invalid timestamp" })
      .default(() => Date.now()),
    time_updated: z
      .number()
      .int()
      .refine((val) => !isNaN(val), { message: "Invalid timestamp" })
      .default(() => Date.now()),
    points: z.number().int().optional(),
    roles: z.string().optional(),
  });
  
  export type User = z.infer<typeof userSchema>;