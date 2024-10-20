import { z } from "zod"

const saseInfoSchema = z.object({
    user_id: z.string().min(1),
});

//Schema for inserting SASE Info
export const insertSaseInfoSchema = saseInfoSchema.extend({
    events_attended: z.string().optional(),
    mentors: z.string().optional(),
    mentees: z.string().optional(),
    groups: z.string().optional(),
});

export const updateSaseInfoSchema = insertSaseInfoSchema.partial();

export type InsertSaseInfo = z.infer<typeof insertSaseInfoSchema>;
export type UpdateSaseInfo = z.infer<typeof updateSaseInfoSchema>;