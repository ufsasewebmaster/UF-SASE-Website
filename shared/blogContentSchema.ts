import { z } from "zod";

export const contentSearchSchema = z.object({
  content: z.string().min(1),
});

export type searchBlogContent = z.infer<typeof contentSearchSchema>;
