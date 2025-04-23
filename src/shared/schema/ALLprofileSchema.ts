import { z } from "zod";

export const ALLprofileSchema = z.object({
  id: z.string().min(1, "User ID is required."),
  username: z.string().min(1, "Username is required."),
  email: z.string().email("Invalid email address."),
  timeAdded: z.preprocess(
    (val) => (typeof val === "string" ? Date.parse(val) : val),
    z.number().int().min(0, "Time added must be a valid timestamp."),
  ),
  timeUpdated: z.preprocess(
    (val) => (typeof val === "string" ? Date.parse(val) : val),
    z.number().int().min(0, "Time updated must be a valid timestamp."),
  ),

  firstName: z.string(), // allow empty string if needed
  lastName: z.string(), // allow empty string if needed
  bio: z.string(),
  phone: z.string().optional(),
  discord: z.string().optional(),
  roles: z.string().optional(),
  resume: z.string().optional(),
  linkedin: z.string().optional(),
  portfolio: z.string().optional(),
  majors: z.string().optional(),
  minors: z.string().optional(),
  graduationSemester: z.string().optional(),
});

export type ALLProfile = z.infer<typeof ALLprofileSchema>;
