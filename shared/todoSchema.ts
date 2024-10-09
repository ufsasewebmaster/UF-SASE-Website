// src/schema/todoSchema.ts
import { z } from 'zod';

export const todoSchema = z.object({
  id: z.number(),
  title: z.string(),
  completed: z.boolean(),
});

export type Todo = z.infer<typeof todoSchema>;

export const todoInsertSchema = z.object({
  title: z.string(),
  completed: z.boolean(),
});

export type InsertTodo = z.infer<typeof todoInsertSchema>;

export const updateTodoSchema = z.object({
  id: z.number(),
  title: z.string().optional(),
  completed: z.boolean().optional(),
});

export type UpdateTodo = z.infer<typeof updateTodoSchema>;

// Adding deleteUserSchema
export const deleteUserSchema = z.object({
  id: z.string().min(1), // Ensures 'id' is a valid non-empty string
});

export type DeleteUser = z.infer<typeof deleteUserSchema>;  