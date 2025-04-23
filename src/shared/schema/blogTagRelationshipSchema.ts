// shared/schemas/blogTagRelationshipSchema.ts
import { z } from "zod";

export const blogTagRelationshipSchema = z.object({
  id: z.string().min(1, "Relationship ID is required."),
  blogId: z.string().min(1, "Blog ID is required."),
  tagId: z.string().min(1, "Tag ID is required."),
});

export type BlogTagRelationship = z.infer<typeof blogTagRelationshipSchema>;
