import type { Blog, BlogSearchResponse } from "@shared/schema/blogSchema";
import { blogTitleSchema } from "@shared/schema/blogSchema";
import { z } from "zod";

// Fetch ALL Blogs
export const fetchBlogs = async (): Promise<Array<Blog>> => {
  const response = await fetch("/api/blogs/all");

  if (!response.ok) {
    throw new Error("Failed to fetch blogs");
  }

  const blogs = await response.json();
  return z.array(blogTitleSchema).parse(blogs.result); // Validate response as an array of blogs
};

// Fetch Blog by ID
export const fetchBlogById = async (blogId: string): Promise<Blog> => {
  if (!blogId) {
    throw new Error("Blog ID is required");
  }

  const response = await fetch(`/api/blogs/${blogId}`, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch blog");
  }

  const blog = await response.json();
  return blogTitleSchema.parse(blog.result); // Validate response as a blog
};

// Search Blogs by Title
export const searchBlogsByTitle = async (
  title: string,
): Promise<BlogSearchResponse> => {
  if (!title) {
    throw new Error("Title is required");
  }

  // Validate title using schema before making the request
  blogTitleSchema.parse({ title });

  const response = await fetch("/api/blogs/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });

  if (!response.ok) {
    throw new Error("Failed to search blogs by title");
  }

  const result = await response.json();
  return z.object({ blog_ids: z.array(z.string()) }).parse(result); // Validate response as an array of blog IDs
};
