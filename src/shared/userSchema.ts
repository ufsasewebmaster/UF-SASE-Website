// import { pgTable, serial, text } from "drizzle-orm/pg-core";
// import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// TODO: Need to expand schema and provide different types for different # fields required
const baseUserSchema = z.object({
  username: z.string().min(1),
  password_hash: z.string().min(1),
  points: z.number().int().optional(),
  roles: z.string().optional(),
});

// Can define schema from table to validate requests
export const insertUserSchema = baseUserSchema;
export const selectUserSchema = baseUserSchema.extend({
  id: z.string().uuid(),
  time_added: z.number().int(),
  time_updated: z.number().int(),
});
export const updateUserSchema = selectUserSchema.partial(); // Allow for partial updates

// These different types are used to, ideally, pass ONLY the required fields needed for specific operations.
export type InsertUser = z.infer<typeof insertUserSchema>;
export type SelectUser = z.infer<typeof selectUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
