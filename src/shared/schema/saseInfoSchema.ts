// shared/schemas/saseInfoSchema.ts
import { z } from "zod";

export const saseInfoSchema = z.object({
  userId: z.string().min(1, "User ID is required."),
  eventsAttended: z.string().optional(),
  mentors: z.string().optional(),
  mentees: z.string().optional(),
  groups: z.string().optional(),
});

export type SaseInfo = z.infer<typeof saseInfoSchema>;
