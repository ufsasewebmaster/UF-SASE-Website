import { z } from "zod";

export const profileSchema = z.object({
  id: z.string().min(1, "User ID is required."),
  username: z.string().min(1, "Username is required."),
  email: z.string().email("Invalid email address."),
  time_added: z.preprocess(
    (val) => (typeof val === "string" ? Date.parse(val) : val),
    z.number().int().min(0, "Time added must be a valid timestamp."),
  ),
  time_updated: z.preprocess(
    (val) => (typeof val === "string" ? Date.parse(val) : val),
    z.number().int().min(0, "Time updated must be a valid timestamp."),
  ),

  first_name: z.string(), // allow empty string if needed
  last_name: z.string(), // allow empty string if needed
  phone: z.string().optional(),

  resume: z.string().optional(),
  linkedin: z.string().optional(),
  portfolio: z.string().optional(),
  majors: z.string().optional(),
  minors: z.string().optional(),
  graduation_semester: z.string().optional(),
});

export type Profile = z.infer<typeof profileSchema>;
