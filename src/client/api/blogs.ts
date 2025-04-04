// libapi/blogs.ts
import type { Blog, CreateBlog, UpdateBlog } from "@shared/schema/blogSchema";
import { blogSchema, updateBlogSchema } from "@shared/schema/blogSchema";
import type { BlogTag } from "@shared/schema/blogTagSchema";
import { blogTagsSchema } from "@shared/schema/blogTagSchema";
import { apiFetch } from "@shared/utils";
import { z } from "zod";

// Fetch ALL Blogs
export const fetchBlogs = async (): Promise<Array<Blog>> => {
  const response = await apiFetch("/api/blogs/all", { method: "GET" }, z.array(blogSchema));
  return response.data;
};

// Fetch Blog by ID
export const fetchBlogById = async (blogId: string): Promise<Blog> => {
  if (!blogId) throw new Error("Blog ID is required");
  const response = await apiFetch(`/api/blogs/${blogId}`, { method: "GET" }, blogSchema);
  return response.data;
};

// Search Blogs by Title
export const searchBlogsByTitle = async (title: string): Promise<Array<Blog>> => {
  if (!title) throw new Error("Title is required");
  const response = await apiFetch(`/api/blogs/search/${encodeURIComponent(title)}`, { method: "GET" }, z.array(blogSchema));
  return response.data;
};

// Fetch ALL tags
export const fetchAllTags = async (): Promise<Array<BlogTag>> => {
  const response = await apiFetch("/api/tags/all", { method: "GET" }, blogTagsSchema);
  return response.data;
};

// Fetch Blogs by Tag
export const fetchBlogsByTag = async (tagName: string): Promise<Array<Blog>> => {
  if (!tagName) throw new Error("Tag name is required");
  const response = await apiFetch(`/api/tags/${encodeURIComponent(tagName)}/blogs`, { method: "GET" }, z.array(blogSchema));
  return response.data;
};

// Create a new Blog
export const createBlog = async (newBlog: CreateBlog): Promise<Blog> => {
  const response = await apiFetch(
    "/api/blogs/add",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBlog),
    },
    blogSchema,
  );
  return response.data;
};

// Update Blog
export const updateBlog = async (blog: UpdateBlog): Promise<Blog> => {
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    time_updated,
    ...cleanBlog
  }: Partial<
    UpdateBlog & {
      time_updated?: unknown;
    }
  > = blog;

  const response = await apiFetch(
    "/api/blogs/update",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cleanBlog),
    },
    updateBlogSchema,
  );
  return response.data;
};
