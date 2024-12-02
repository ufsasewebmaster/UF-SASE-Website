import { z } from "zod";

export const MMRelationshipSchema = z.object({
  id: z.string().min(1, "Relationship ID is required."),
  mentor_id: z.string().min(1, "Mentor ID is required."),
  mentee_id: z.string().min(1, "Mentee ID is required."),
});

export type MMRelationship = z.infer<typeof MMRelationshipSchema>;
