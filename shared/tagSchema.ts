import { z } from "zod";

export const tagSearchSchema = z.object({
  tags: z.array(z.string()),
});

export type searchBlogTags = z.infer<typeof tagSearchSchema>;
