import { db } from "@/server/db/db";
import { createErrorResponse, createSuccessResponse } from "@/shared/utils";
import * as Schema from "@db/tables";
import { blogTagsSchema } from "@schema/blogTagSchema";
import { eq, inArray } from "drizzle-orm";
import { Hono } from "hono";

const tagRoutes = new Hono();

tagRoutes.post("/search/blogs/tags", async (c) => {
  try {
    const search_tags = blogTagsSchema.parse(await c.req.json());
    const tagNames = search_tags.map((tag) => tag.name);

    const result = await db
      .select({ res_blog_ids: Schema.blogTagRelationship.blog_id })
      .from(Schema.blogTagRelationship)
      .innerJoin(Schema.blogTags, eq(Schema.blogTags.id, Schema.blogTagRelationship.tag_id))
      .where(inArray(Schema.blogTags.name, tagNames));

    // Remove duplicates from the resulting blog IDs
    let blog_ids = result.map((row) => row.res_blog_ids);
    blog_ids = Array.from(new Set(blog_ids));
    return createSuccessResponse(c, blog_ids, "Blog tags search successful");
  } catch (error) {
    console.error("Error searching blog tags:", error);
    return createErrorResponse(c, "SEARCH_BLOG_TAGS_ERROR", "Failed to search blog tags", 500);
  }
});

export default tagRoutes;
