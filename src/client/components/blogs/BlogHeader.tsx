import React from "react";
import BlogCard from "./BlogCard";
import BlogContainer from "./BlogContainer";

interface Blog {
  id: string;
  title: string;
  content: string;
  images: Array<string>;
  published_date: string;
  time_updated: string;
  author: string;
}

interface BlogHeaderProps {
  blogs: Array<Blog>;
  expandedBlogId: string | null;
  setExpandedBlogId: (id: string | null) => void;
}

const BlogHeader: React.FC<BlogHeaderProps> = ({ blogs, expandedBlogId, setExpandedBlogId }) => {
  if (expandedBlogId) {
    return null;
  }

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
            <BlogCard key={blog.id} blog={blog} expandedBlogId={expandedBlogId} setExpandedBlogId={setExpandedBlogId} />
          ))}
        </div>
      </BlogContainer>
    </div>
  );
};

export default BlogHeader;
