import { db } from "@/server/db/db";
import * as Schema from "@/server/db/tables";
import { createErrorResponse } from "@shared/utils";
import { eq, like } from "drizzle-orm";
import { Hono } from "hono";

const blogRoutes = new Hono();

// Fetch all blogs
blogRoutes.get("/blogs/all", async (c) => {
  try {
    const result = await db.select().from(Schema.blogs);
    return c.json(result);
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
    return c.json(result[0]);
  } catch {
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
    return c.json(blog_ids);
  } catch {
    return createErrorResponse(c, "SEARCH_BLOGS_ERROR", "Failed to search blogs", 500);
  }
});

blogRoutes.post("/blogs/add", async (c) => {
  try {
    const body = await c.req.json();
    const newBlog = await db
      .insert(Schema.blogs)
      .values({
        ...body,
      })
      .returning();
    return c.json(`Inserted blog with ID: ${newBlog[0].id}`);
  } catch (error) {
    if (error) return createErrorResponse(c, "ADD_BLOG_ERROR", error.toString(), 500);
  }
});

blogRoutes.post("/blogs/update", async (c) => {
  try {
    const body = await c.req.json();
    const { id, ...update } = body;
    if (!id) {
      return createErrorResponse(c, "MISSING_BLOG_ID", "Blog ID required", 400);
    }
    const updatedBlog = await db
      .update(Schema.blogs)
      .set({
        ...update,
        time_updated: new Date(),
        last_update_date: new Date(),
      })
      .where(eq(Schema.blogs.id, id))
      .returning();
    return c.json(`Updated blog with ID: ${updatedBlog[0].id}`);
  } catch (error) {
    if (error) return createErrorResponse(c, "UPDATE_BLOG_ERROR", error.toString(), 500);
  }
});

export default blogRoutes;
