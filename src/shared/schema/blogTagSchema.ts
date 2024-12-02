// shared/schemas/blogTagSchema.ts
import { z } from "zod";

export const blogTagSchema = z.object({
  id: z.string().min(1, "Tag ID is required."),
  name: z.string().min(1, "Tag name is required."),
});

export type BlogTag = z.infer<typeof blogTagSchema>;
