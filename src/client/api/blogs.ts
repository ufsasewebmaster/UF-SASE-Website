// libapi/blogs.ts
import type { Blog, CreateBlog, UpdateBlog } from "@shared/schema/blogSchema";
import { blogSchema, createBlogSchema, updateBlogSchema, blogSearchResponseSchema, blogTitleSchema } from "@shared/schema/blogSchema";
import { apiFetch } from "@shared/utils";
import { z } from "zod";

// Fetch ALL Blogs
export const fetchBlogs = async (): Promise<Array<Blog>> => {
  const response = await apiFetch("/api/blogs/all", { method: "GET" }, z.array(blogSchema));
  return response.data;
};

// Fetch Blog by ID
export const fetchBlogById = async (blogId: string): Promise<Blog> => {
  if (!blogId) {
    throw new Error("Blog ID is required");
  }
  const response = await apiFetch(`/api/blogs/${blogId}`, { method: "GET" }, blogSchema);
  return response.data;
};

// Search Blogs by Title
export const searchBlogsByTitle = async (title: string): Promise<Blog> => {
  if (!title) {
    throw new Error("Title is required");
  }
  blogTitleSchema.parse({ title });
  const response = await apiFetch(
    "/api/blogs/search",
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    },
    blogSearchResponseSchema,
  );
  return response.data;
};

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

export const updateBlog = async (blog: UpdateBlog): Promise<Blog> => {
  const response = await apiFetch(
    "/api/blogs/update",
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    },
    updateBlogSchema,
  );
  return response.data;
};
