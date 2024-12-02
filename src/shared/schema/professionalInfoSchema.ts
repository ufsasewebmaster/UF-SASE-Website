import { z } from "zod";

export const professionalInfoSchema = z.object({
  user_id: z.string().min(1, "User ID is required."),
  resume_path: z.string().url("Resume path must be a valid URL."),
  linkedin: z.string().url("LinkedIn must be a valid URL."),
  portfolio: z.string().url("Portfolio must be a valid URL."),
  majors: z.string(),
  minors: z.string(),
  graduation_semester: z.string(),
});

// All optional except id
export const professionalInfoInsertSchema = professionalInfoSchema.partial({
  resume_path: true,
  linkedin: true,
  portfolio: true,
  majors: true,
  minors: true,
  graduation_semester: true,
});

// All optional
export const professionalInfoUpdateSchema = professionalInfoSchema.partial();

export type ProfessionalInfo = z.infer<typeof professionalInfoSchema>;
export type ProfessionalInfoInsert = z.infer<typeof professionalInfoInsertSchema>;
export type ProfessionalInfoUpdate = z.infer<typeof professionalInfoUpdateSchema>;
