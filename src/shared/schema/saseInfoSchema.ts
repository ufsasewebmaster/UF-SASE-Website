// shared/schemas/saseInfoSchema.ts
import { z } from "zod";

export const saseInfoSchema = z.object({
  user_id: z.string().min(1, "User ID is required."),
  events_attended: z.string().optional(),
  mentors: z.string().optional(),
  mentees: z.string().optional(),
  groups: z.string().optional(),
});

export type SaseInfo = z.infer<typeof saseInfoSchema>;
