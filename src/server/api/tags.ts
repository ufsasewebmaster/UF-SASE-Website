import { db } from "@/server/db/db";
import { createErrorResponse, createSuccessResponse } from "@/shared/utils";
import * as Schema from "@db/tables";
import { eq, inArray, like } from "drizzle-orm";
import { Hono } from "hono";

const tagRoutes = new Hono();

// Fetch all tags
tagRoutes.get("/tags/all", async (c) => {
  try {
    const result = await db.select().from(Schema.blogTags);
    return createSuccessResponse(c, result, "Tags retrieved successfully");
  } catch (error) {
    console.error("Error fetching tags:", error);
    return createErrorResponse(c, "FETCH_TAGS_ERROR", "Failed to fetch tags", 500);
  }
});

// Fetch blogs by tag name 
tagRoutes.get("/tags/:tagName/blogs", async (c) => {
  try {
    const tagName = c.req.param("tagName");

    // Find the tag by name
    const tagResults = await db.select().from(Schema.blogTags).where(like(Schema.blogTags.name, tagName));

    if (tagResults.length === 0) {
      return createSuccessResponse(c, [], "No tags found with this name");
    }

    const tagId = tagResults[0].id;

    // Get all blog IDs related to this tag
    const blogRelationships = await db
      .select({ blog_id: Schema.blogTagRelationship.blog_id })
      .from(Schema.blogTagRelationship)
      .where(eq(Schema.blogTagRelationship.tag_id, tagId));

    if (blogRelationships.length === 0) {
      return createSuccessResponse(c, [], "No blogs found with this tag");
    }

    const blogIds = blogRelationships.map((rel) => rel.blog_id);

    // Get all blogs with these IDs
    const blogs = await db
      .select()
      .from(Schema.blogs)
      .where(
        inArray(
          Schema.blogs.id,
          blogIds.filter((id) => id !== null),
        ),
      );

    // Get tags for each blog to include them in the response
    const blogsWithTags = await Promise.all(
      blogs.map(async (blog) => {
        const tags = await db
          .select({ name: Schema.blogTags.name })
          .from(Schema.blogTagRelationship)
          .innerJoin(Schema.blogTags, eq(Schema.blogTags.id, Schema.blogTagRelationship.tag_id))
          .where(eq(Schema.blogTagRelationship.blog_id, blog.id));

        return {
          ...blog,
          tags: tags.map((t) => t.name),
        };
      }),
    );

    return createSuccessResponse(c, blogsWithTags, "Blogs retrieved successfully");
  } catch (error) {
    console.error("Error fetching blogs by tag:", error);
    return createErrorResponse(c, "FETCH_BLOGS_BY_TAG_ERROR", "Failed to fetch blogs by tag", 500);
  }
});

export default tagRoutes;
