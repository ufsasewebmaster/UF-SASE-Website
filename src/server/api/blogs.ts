import { db } from "@/server/db/db";
import * as Schema from "@db/tables";
import { createErrorResponse, createSuccessResponse } from "@shared/utils";
import { eq, like } from "drizzle-orm";
import { Hono } from "hono";

const blogRoutes = new Hono();

// Fetch all blogs
blogRoutes.get("/blogs/all", async (c) => {
  try {
    const result = await db.select().from(Schema.blogs);
    return createSuccessResponse(c, result, "Blogs retrieved successfully");
  } catch (error) {
    console.log(error);
    return createErrorResponse(c, "MISSING_BLOG", "Cannot fetch blogs", 400);
  }
});

// Fetch blog by ID
blogRoutes.get("/blogs/:blogID", async (c) => {
  try {
    const blog_id = c.req.param("blogID");
    if (!blog_id) {
      return createErrorResponse(c, "MISSING_BLOG_ID", "Blog Id required", 400);
    }
    const result = await db.select().from(Schema.blogs).where(eq(Schema.blogs.id, blog_id)).limit(1);
    if (result.length === 0) {
      return createErrorResponse(c, "BLOG_NOT_FOUND", "No Blogs Found", 404);
    }
    return createSuccessResponse(c, result[0], "Blog retrieved successfully");
  } catch (error) {
    console.log(error);
    return createErrorResponse(c, "FETCH_BLOG_ERROR", "Failed to fetch blog", 500);
  }
});

// Fetch blogs by title
blogRoutes.get("/blogs/search/:title", async (c) => {
  try {
    const search_title = c.req.param("title");
    console.log(search_title);
    const result = await db
      .select({ res_blog_ids: Schema.blogs.id })
      .from(Schema.blogs)
      .where(like(Schema.blogs.title, `%${search_title}%`)); // Approximate search
    const blog_ids = result.map((row) => row.res_blog_ids);
    return createSuccessResponse(c, blog_ids, "Blog IDs retrieved successfully");
  } catch (error) {
    console.log(error);
    return createErrorResponse(c, "SEARCH_BLOGS_ERROR", "Failed to search blogs", 500);
  }
});

// Add blog
blogRoutes.post("/blogs/add", async (c) => {
  try {
    const body = await c.req.json();
    const newBlogArray = await db
      .insert(Schema.blogs)
      .values({ ...body })
      .returning();
    const newBlog = newBlogArray[0];
    return createSuccessResponse(c, newBlog, "Blog added successfully");
  } catch (error) {
    console.log(error);
    return createErrorResponse(c, "ADD_BLOG_ERROR", "Failed to add blog", 500);
  }
});

// Update blog
blogRoutes.post("/blogs/update", async (c) => {
  try {
    const body = await c.req.json();
    const { id, ...update } = body;
    if (!id) {
      return createErrorResponse(c, "MISSING_BLOG_ID", "Blog ID required", 400);
    }
    const updatedBlog = await db
      .update(Schema.blogs)
      .set({ ...update, time_updated: new Date() })
      .where(eq(Schema.blogs.id, id))
      .returning();
    return createSuccessResponse(c, `Updated blog with ID: ${updatedBlog[0].id}`, "Blog updated successfully");
  } catch (error) {
    console.log(error);
    return createErrorResponse(c, "UPDATE_BLOG_ERROR", "Failed to update blog", 500);
  }
});

export default blogRoutes;
