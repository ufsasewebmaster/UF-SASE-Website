import { z } from "zod";

// Blog schema for full blog details
export const blogSchema = z.object({
  id: z.string().min(1, "Blog ID is required."),
  title: z.string().min(1, "Title is required."),
  content: z.string().min(1, "Content cannot be empty."),
  authorId: z.string().min(1, "Author ID is required."),
  publishedDate: z.number().int().min(0, "Published date must be a valid timestamp."),
  timeUpdated: z.number().int().min(0, "Update time must be a valid timestamp."),
  lastUpdateDate: z.string().optional(),
  tags: z.array(z.string()).default([]),
});

export const blogTitleSchema = z.object({
  title: z.string().min(1, "Search title cannot be empty."),
});

// Auto-handled by the backend
export const createBlogSchema = blogSchema.omit({
  id: true,
  timeUpdated: true,
  publishedDate: true,
  lastUpdateDate: true,
}).extend({
  tags: z.array(z.string()).optional(),
});

export const updateBlogSchema = blogSchema
  .partial()
  .omit({
    id: true,  // Immutable fields
    authorId: true,
    publishedDate: true,
  });

export const blogSearchResponseSchema = z.object({
  blogIds: z.array(z.string().min(1, "Blog ID must be valid.")),
});

// Export TypeScript types
export type Blog = z.infer<typeof blogSchema>;
export type BlogTitle = z.infer<typeof blogTitleSchema>;
export type CreateBlog = z.infer<typeof createBlogSchema>;
export type UpdateBlog = z.infer<typeof updateBlogSchema>;
export type BlogSearchResponse = z.infer<typeof blogSearchResponseSchema>;
