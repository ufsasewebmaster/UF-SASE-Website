import { titleSearchSchema } from "@/shared/blogTitleSchema";
import { like } from "drizzle-orm";
import { Hono } from "hono";
import { db } from "../db";
import * as Schema from "../db/schema";

const titleRoutes = new Hono();

//Searching by title
titleRoutes.post("/search/blogs/title", async (c) => {
  const search_title = titleSearchSchema.parse(await c.req.json()).title;

  const result = await db
    .select({ res_blog_ids: Schema.blogs.id })
    .from(Schema.blogs)
    .where(like(Schema.blogs.title, `%${search_title}%`));

  const blog_ids = result.map((row) => row.res_blog_ids);
  return c.json({ blog_ids });
});

export default titleRoutes;
