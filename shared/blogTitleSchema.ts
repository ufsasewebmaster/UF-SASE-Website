import { z } from "zod";

export const titleSearchSchema = z.object({
    title: z.string().min(1),
});

export type searchBlogTitle = z.infer<typeof titleSearchSchema>;
