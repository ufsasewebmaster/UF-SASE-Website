import { z } from "zod";

// Base schema: everything is required
export const personalInfoSchema = z.object({
  userId: z.string().min(1, "User ID is required."),
  firstName: z.string().min(1, "First name is required."),
  lastName: z.string().min(1, "Last name is required."),
  phone: z.string().optional(),
  areaCode: z.string().optional(),
  discord: z.string().optional(),
  bio: z.string().optional(),
});

export const personalInfoInsertSchema = personalInfoSchema.partial({
  phone: true,
  areaCode: true,
});

export const personalInfoUpdateSchema = personalInfoSchema.partial();

export type PersonalInfo = z.infer<typeof personalInfoSchema>;
export type PersonalInfoInsert = z.infer<typeof personalInfoInsertSchema>;
export type PersonalInfoUpdate = z.infer<typeof personalInfoUpdateSchema>;
