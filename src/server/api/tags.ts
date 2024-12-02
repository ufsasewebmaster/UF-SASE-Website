import { tagSearchSchema } from "@/shared/tagSchema";
import { eq, inArray } from "drizzle-orm";
import { Hono } from "hono";
import { db } from "../db";
import * as Schema from "../db/tables";

const tagRoutes = new Hono();

tagRoutes.post("/search/blogs/tags", async (c) => {
  const search_tags = tagSearchSchema.parse(await c.req.json()).tags;

  const result = await db
    .select({ res_blog_ids: Schema.blogTagRelationship.blog_id })
    .from(Schema.blogTagRelationship)
    .innerJoin(
      Schema.blogTags,
      eq(Schema.blogTags.id, Schema.blogTagRelationship.tag_id),
    )
    .where(inArray(Schema.blogTags.name, search_tags));
  let blog_ids = result.map((row) => row.res_blog_ids);
  blog_ids = Array.from(new Set(blog_ids));
  return c.json({ blog_ids });
});

export default tagRoutes;
