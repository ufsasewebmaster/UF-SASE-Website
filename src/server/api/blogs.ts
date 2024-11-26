import * as Schema from "@/server/db/tables";
import { db } from "@db/index";
import { blogsApiResponseSchema, blogTitleSchema, singleBlogApiResponseSchema } from "@shared/schema/blogSchema";
import { createErrorResponse, formatAndValidateResponse } from "@shared/utils";
import { eq, like } from "drizzle-orm";
import { Hono } from "hono";

const blogRoutes = new Hono();

// Fetch all blogs
blogRoutes.get("/blogs/all", async (c) => {
  try {
    const result = await db.select().from(Schema.blogs);
    const validatedResponse = formatAndValidateResponse(result, "Fetched all blogs", blogsApiResponseSchema);
    return c.json(validatedResponse);
  } catch {
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
    const validatedResponse = formatAndValidateResponse(result[0], "Fetched blog successfully", singleBlogApiResponseSchema);
    return c.json(validatedResponse);
  } catch {
    return createErrorResponse(c, "FETCH_BLOG_ERROR", "Failed to fetch blog", 500);
  }
});

// Fetch blogs by title
blogRoutes.get("/blogs/search", async (c) => {
  try {
    const body = await c.req.json();
    const { title: search_title } = blogTitleSchema.parse(body);
    const result = await db
      .select({ res_blog_ids: Schema.blogs.id })
      .from(Schema.blogs)
      .where(like(Schema.blogs.title, `%${search_title}%`)); // Approximate search
    const blog_ids = result.map((row) => row.res_blog_ids);
    const validatedResponse = formatAndValidateResponse({ blog_ids }, "Blogs search completed", singleBlogApiResponseSchema);
    return c.json(validatedResponse);
  } catch {
    return createErrorResponse(c, "SEARCH_BLOGS_ERROR", "Failed to search blogs", 500);
  }
});

// TODO: Routes can be distinguished by their HTTP method, no need for /add or /update
blogRoutes.post("/blogs/add", async (c) => {
  try {
    const body = await c.req.json();
    const newBlog = await db
      .insert(Schema.blogs)
      .values({
        ...body,
        published_date: new Date(),
        time_updated: new Date(),
        author_id: null, // TODO: Fetch current user ID
      })
      .returning();
    const validatedResponse = formatAndValidateResponse(newBlog, "Blog added successfully", singleBlogApiResponseSchema);
    return c.json(validatedResponse);
  } catch {
    return createErrorResponse(c, "ADD_BLOG_ERROR", "Failed to add blog", 500);
  }
});

// TODO: Add some sort of auth middleware
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
        last_update_date: new Date().toISOString(),
      })
      .where(eq(Schema.blogs.id, id))
      .returning();
    const validatedResponse = formatAndValidateResponse(updatedBlog, "Blog updated successfully", singleBlogApiResponseSchema);
    return c.json(validatedResponse);
  } catch {
    return createErrorResponse(c, "UPDATE_BLOG_ERROR", "Failed to update blog", 500);
  }
});

export default blogRoutes;
