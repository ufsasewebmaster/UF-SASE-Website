// shared/schemas/personalInfoSchema.ts
import { z } from "zod";

export const personalInfoSchema = z.object({
  user_id: z.string().min(1, "User ID is required."),
  first_name: z.string().min(1, "First name is required."),
  last_name: z.string().min(1, "Last name is required."),
  email: z.string().email("Invalid email address."),
  phone: z.string().optional(), // Assuming phone is stored as a string
  area_code: z.number().int().min(0).optional(),
});

export type PersonalInfo = z.infer<typeof personalInfoSchema>;
