import { z } from "zod";

export const MMRelationshipSchema = z.object({
  id: z.string().min(1, "Relationship ID is required."),
  mentorId: z.string().min(1, "Mentor ID is required."),
  menteeId: z.string().min(1, "Mentee ID is required."),
});

export const MentorSchema = z.object({
  mentorId: z.string().min(1, "Mentor ID is required."),
  firstName: z.string().min(1, "Name is required."),
  lastName: z.string().min(1, "Name is required."),
});

export const MenteeSchema = z.object({
  menteeId: z.string().min(1, "Mentee ID is required."),
  firstName: z.string().min(1, "Name is required."),
  lastName: z.string().min(1, "Name is required."),
});

export type MMRelationship = z.infer<typeof MMRelationshipSchema>;
export type Mentor = z.infer<typeof MentorSchema>;
export type Mentee = z.infer<typeof MenteeSchema>;

