import { db } from "@/server/db";
import { blogs } from "@/server/db/tables";
import { eq } from "drizzle-orm";
import type { Blog } from "./types";

export async function getAllBlogs(): Promise<Array<Blog>> {
  try {
    const result = await db.select().from(blogs);
    return result.map((blog) => ({
      ...blog,
      author_id: blog.author_id ?? undefined,
      last_update_date: blog.last_update_date ?? undefined,
      tags: blog.tags ?? undefined,
    }));
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw new Error("Failed to fetch blogs");
  }
}

export async function createBlog(blog: Omit<Blog, "id" | "published_date" | "time_updated" | "author_id">): Promise<Blog> {
  try {
    const [newBlog] = await db
      .insert(blogs)
      .values({
        ...blog,
        published_date: new Date(),
        time_updated: new Date(),
        author_id: null, // or provide a default value if needed
      })
      .returning();
    return {
      ...newBlog,
      author_id: newBlog.author_id ?? undefined,
      last_update_date: newBlog.last_update_date ?? undefined,
      tags: newBlog.tags ?? undefined,
    };
  } catch (error) {
    console.error("Error creating blog:", error);
    throw new Error("Failed to create blog");
  }
}

export async function updateBlog(blog: Partial<Blog> & { id: string }): Promise<Blog> {
  try {
    const [updatedBlog] = await db
      .update(blogs)
      .set({
        ...blog,
        time_updated: new Date(),
        last_update_date: new Date().toISOString(),
      })
      .where(eq(blogs.id, blog.id))
      .returning();
    return {
      ...updatedBlog,
      author_id: updatedBlog.author_id ?? undefined,
      last_update_date: updatedBlog.last_update_date ?? undefined,
      tags: updatedBlog.tags ?? undefined,
    };
  } catch (error) {
    console.error("Error updating blog:", error);
    throw new Error("Failed to update blog");
  }
}
