import { contentSearchSchema } from "@/shared/blogContentSchema";
import { like } from "drizzle-orm";
import { Hono } from "hono";
import { db } from "../db";
import * as Schema from "../db/schema";

const contentRoutes = new Hono();

// Searching by blog content
contentRoutes.post("/search/blogs/content", async (c) => {
  const search_content = contentSearchSchema.parse(await c.req.json()).content;
  const result = await db
    .select({ res_blogs_id: Schema.blogs.id })
    .from(Schema.blogs)
    .where(like(Schema.blogs.content, `%${search_content}%`));
  const blog_ids = result.map((row) => row.res_blogs_id);
  return c.json({ blog_ids });
});

export default contentRoutes;