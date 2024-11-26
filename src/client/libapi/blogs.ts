// libapi/blogs.ts
import type { Blog, BlogSearchResponse, CreateBlog, UpdateBlog } from "@shared/schema/blogSchema";
import { blogsApiResponseSchema, singleBlogApiResponseSchema, blogSearchResponseSchema, blogTitleSchema } from "@shared/schema/blogSchema";
import { apiFetch } from "@shared/utils";

// Fetch ALL Blogs
export const fetchBlogs = async (): Promise<Array<Blog>> => {
  return apiFetch<Array<Blog>>("/api/blogs/all", { method: "GET" }, blogsApiResponseSchema);
};

// Fetch Blog by ID
export const fetchBlogById = async (blogId: string): Promise<Blog> => {
  if (!blogId) {
    throw new Error("Blog ID is required");
  }
  return apiFetch<Blog>(`/api/blogs/${blogId}`, { method: "GET" }, singleBlogApiResponseSchema);
};

// Search Blogs by Title
export const searchBlogsByTitle = async (title: string): Promise<BlogSearchResponse> => {
  if (!title) {
    throw new Error("Title is required");
  }
  blogTitleSchema.parse({ title });
  return apiFetch<BlogSearchResponse>("/api/blogs/search", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  }, blogSearchResponseSchema);
};

export const createBlog = async (
  newBlog: CreateBlog
): Promise<Blog> => {
  return apiFetch<Blog>("/api/blogs/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newBlog),
  }, singleBlogApiResponseSchema);
}

export const updateBlog = async (
  blog: UpdateBlog
): Promise<Blog> => {
  return apiFetch<Blog>("/api/blogs/update", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(blog),
  }, singleBlogApiResponseSchema);
}