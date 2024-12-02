// shared/schemas/professionalInfoSchema.ts
import { z } from "zod";

export const professionalInfoSchema = z.object({
  user_id: z.string().min(1, "User ID is required."),
  resume_path: z.string().url("Resume path must be a valid URL.").optional(),
  linkedin: z.string().url("LinkedIn must be a valid URL.").optional(),
  portfolio: z.string().url("Portfolio must be a valid URL.").optional(),
  majors: z.string().optional(),
  minors: z.string().optional(),
  graduation_semester: z.string().optional(),
});

export type ProfessionalInfo = z.infer<typeof professionalInfoSchema>;
