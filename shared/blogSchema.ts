import { z } from "zod";

export const tagSearchSchema = z.array(z.string().min(1));

export type searchBlogTags = z.infer<typeof tagSearchSchema>;

export const titleSearchSchema = z.string().min(1);

export type searchBlogTitle = z.infer<typeof titleSearchSchema>;

export const blogAllSchema = z.object({
  blogs: z.array(
    z.object({
      blogId: z.string(),
      title: z.string(),
      content: z.string(),
      authorId: z.string().nullable(),
      publishedDate: z.date(),
      timeUpdated: z.date(),
      lastUpdateDate: z.string().nullable(),
    }),
  ),
});
