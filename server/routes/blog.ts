import { tagSearchSchema, titleSearchSchema } from "@/shared/blogSchema";
import { eq, inArray, like } from "drizzle-orm";
import { Hono } from "hono";
import { db } from "../db";
import * as Schema from "../db/schema";
import { blogs } from "../db/schema";

const blogRouter = new Hono();

//Searching by title
blogRouter.get("/blog/title/search", async (c) => {
  const search_title = titleSearchSchema.parse(c.req.query("title"));

  const result = await db
    .select({ res_blog_ids: Schema.blogs.id })
    .from(Schema.blogs)
    .where(like(Schema.blogs.title, `%${search_title}%`));

  const blog_ids = result.map((row) => row.res_blog_ids);
  return c.json({ blog_ids });
});

// Searching by tags
blogRouter.get("/blog/tags/search", async (c) => {
  const search_tags = tagSearchSchema.parse(c.req.queries("tags"));

  const result = await db
    .select({ res_blog_ids: Schema.blogTagRelationship.blog_id })
    .from(Schema.blogTagRelationship)
    .innerJoin(
      Schema.blogTags,
      eq(Schema.blogTags.id, Schema.blogTagRelationship.tag_id),
    )
    .where(inArray(Schema.blogTags.name, search_tags));
  const blog_ids = Array.from(new Set(result.map((row) => row.res_blog_ids)));
  return c.json({ blog_ids });
});

blogRouter.get("/blog/all", async (c) => {
  // todo: add tags
  const result = await db
    .select({
      blogId: blogs.id,
      title: blogs.title,
      content: blogs.content,
      authorId: blogs.author_id,
      publishedDate: blogs.published_date,
      timeUpdated: blogs.time_updated,
      lastUpdateDate: blogs.last_update_date,
    })
    .from(blogs);

  console.log(result);

  return c.json({ blogs: result });
});

export default blogRouter;
