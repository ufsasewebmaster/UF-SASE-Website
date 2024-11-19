import "@/shared/saseSchema";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { db } from "../db";
import * as Schema from "../db/schema";

const blogRoutes = new Hono();

blogRoutes.get("/blogs/all", async (c) => {
  const result = await db.select().from(Schema.blogs);
  return c.json({ result });
});

blogRoutes.post("/blogs/:blogID", async (c) => {
  const blog_id = c.req.param("blogID");
  const result = await db
    .select()
    .from(Schema.blogs)
    .where(eq(Schema.blogs.id, blog_id));

  return c.json({ result });
});
export default blogRoutes;
