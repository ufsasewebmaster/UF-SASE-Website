import { z } from "zod";

// Base schema: everything is required
export const personalInfoSchema = z.object({
  user_id: z.string().min(1, "User ID is required."),
  first_name: z.string().min(1, "First name is required."),
  last_name: z.string().min(1, "Last name is required."),
  phone: z.string().optional(),
  area_code: z.string().optional(),
  discord: z.string().optional(),
  bio: z.string().optional(),
});

export const personalInfoInsertSchema = personalInfoSchema.partial({
  phone: true,
  area_code: true,
});

export const personalInfoUpdateSchema = personalInfoSchema.partial();

export type PersonalInfo = z.infer<typeof personalInfoSchema>;
export type PersonalInfoInsert = z.infer<typeof personalInfoInsertSchema>;
export type PersonalInfoUpdate = z.infer<typeof personalInfoUpdateSchema>;
