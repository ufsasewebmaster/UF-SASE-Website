// shared/schemas/blogTagSchema.ts
import { z } from "zod";

export const blogTagSchema = z.object({
  id: z.string().min(1, "Tag ID is required."),
  name: z.string().min(1, "Tag name is required."),
});
export const blogTagsSchema = z.array(blogTagSchema);

export type BlogTag = z.infer<typeof blogTagSchema>;
export type BlogTags = z.infer<typeof blogTagSchema>;
