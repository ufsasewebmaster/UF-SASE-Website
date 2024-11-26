import * as Schema from "@/server/db/tables";
import { db } from "@db/index";
import { eq, like } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";

// Validation schema for search title
const titleSearchSchema = z.object({
  title: z.string().min(1, "Search title is required."),
});

const blogRoutes = new Hono();

// Fetch all blogs
blogRoutes.get("/blogs/all", async (c) => {
  try {
    const result = await db.select().from(Schema.blogs);
    return c.json({ result });
  } catch (error) {
    console.error("Error fetching all blogs:", error);
    return c.json({ error: "Failed to fetch blogs" }, 500);
  }
});

// Fetch blog by ID
blogRoutes.post("/blogs/:blogID", async (c) => {
  try {
    const blog_id = c.req.param("blogID");
    if (!blog_id) {
      return c.json({ error: "Blog ID is required" }, 400);
    }

    const result = await db
      .select()
      .from(Schema.blogs)
      .where(eq(Schema.blogs.id, blog_id))
      .limit(1);

    if (result.length === 0) {
      return c.json({ error: "Blog not found" }, 404);
    }

    return c.json({ result: result[0] });
  } catch (error) {
    console.error("Error fetching blog by ID:", error);
    return c.json({ error: "Failed to fetch blog" }, 500);
  }
});

// Search blogs by title
blogRoutes.post("/blogs/search", async (c) => {
  try {
    const body = await c.req.json();
    const { title: search_title } = titleSearchSchema.parse(body);

    const result = await db
      .select({ res_blog_ids: Schema.blogs.id })
      .from(Schema.blogs)
      .where(like(Schema.blogs.title, `%${search_title}%`));

    const blog_ids = result.map((row) => row.res_blog_ids);

    return c.json({ blog_ids });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ errors: error.errors }, 400);
    }
    console.error("Error searching blogs by title:", error);
    return c.json({ error: "Failed to search blogs" }, 500);
  }
});

export default blogRoutes;
