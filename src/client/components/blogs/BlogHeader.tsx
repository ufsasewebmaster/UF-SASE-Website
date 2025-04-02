import type { BlogHeaderProps } from "@/shared/types/blogTypes";
import React from "react";
import BlogCard from "./BlogCard";
import BlogContainer from "./BlogContainer";

const BlogHeader: React.FC<BlogHeaderProps> = ({ blogs, expandedBlogId, setExpandedBlogId, setIsEditing }) => {
  if (expandedBlogId) {
    return null;
  }

  //blog header is for the title and the recent posts (separate from all blogs)
  return (
    <div className="relative mb-10 mt-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="relative mb-5 flex flex-col items-start justify-between sm:flex-row sm:items-end">
          <h1 className="bg-gradient-to-r from-saseTeal to-saseBlue bg-clip-text font-oswald text-4xl font-semibold text-transparent sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
            BLOGS
          </h1>
          <h2 className="absolute right-0 top-0 mt-2 bg-gradient-to-r from-saseTeal to-saseBlue bg-clip-text font-pixelify text-2xl font-semibold tracking-wider text-transparent sm:relative sm:right-auto sm:top-auto sm:mt-0 sm:transform-none sm:text-3xl md:text-3xl lg:text-4xl">
            RECENT POSTS
          </h2>
        </div>
      </div>

      <BlogContainer>
        <div className="grid grid-cols-1 place-items-center gap-4 md:grid-cols-2">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} expandedBlogId={expandedBlogId} setExpandedBlogId={setExpandedBlogId} setIsEditing={setIsEditing} />
          ))}
        </div>
      </BlogContainer>
    </div>
  );
};

export default BlogHeader;
