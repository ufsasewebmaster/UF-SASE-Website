import { z } from "zod";

const infoSchema = z.object({
  user_id: z.string().min(1),
});

export const insertPersonalSchema = infoSchema.extend({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  email: z.string().min(1),
  phone: z.bigint().optional(),
  area_code: z.number().int().optional(),
});

export const insertProfessionalSchema = infoSchema.extend({
  resume_path: z.string().optional(),
  linkedin: z.string().optional(),
  portfolio: z.string().optional(),
  majors: z.string().optional(),
  minors: z.string().optional(),
  graduation_semester: z.string().optional(),
});

export const updatePersonalInfoSchema = insertPersonalSchema.partial();
export const updateProfessionalInfoSchema = insertProfessionalSchema.partial();

export type insertPersonalInfo = z.infer<typeof insertPersonalSchema>;
export type insertProfessionalInfo = z.infer<typeof insertProfessionalSchema>;
export type updatePersonalInfo = z.infer<typeof updatePersonalInfoSchema>;
export type updateProfessionalInfo = z.infer<
  typeof updateProfessionalInfoSchema
>;
