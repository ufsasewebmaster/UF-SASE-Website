import type { BlogCardProps } from "@/shared/types/blogTypes";
import { cn } from "@/shared/utils";
import React from "react";
import { Button } from "../ui/button";

const BlogCard: React.FC<BlogCardProps> = ({ blog, expandedBlogId, setExpandedBlogId }) => {
  if (expandedBlogId === blog.id) {
    return null;
  }
  const formattedDate = blog.published_date
    ? new Date(blog.published_date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";
  return (
    <article className="relative w-full max-w-6xl p-6">
      <div className="group relative">
        {/* shadow card */}
        <div className="absolute left-5 top-5 z-0 h-full w-full rounded-[50px] bg-gradient-to-b from-saseGreen to-saseBlue"></div>
        <div
          className={cn(
            "absolute left-5 top-5 z-0 h-full w-full rounded-[50px]",
            "bg-gradient-to-b from-saseBlue to-saseGreen opacity-0 transition-opacity duration-700 ease-in-out",
            "group-hover:opacity-100",
          )}
        ></div>

        {/* main card */}
        <section
          className={cn(
            "relative z-10 flex flex-col items-start rounded-[50px] border-2 border-border bg-white p-12",
            "w-full shadow-lg transition sm:flex-col",
          )}
        >
          {/* image */}
          <figure className="mb-6 aspect-video w-full overflow-hidden rounded-[35px]">
            {blog.images && blog.images.length > 0 ? (
              <img src={blog.images[0]} alt={blog.title} className="h-full w-full rounded-[35px] object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-[35px] bg-gray-300 text-gray-500">No Image</div>
            )}
          </figure>
          {/*Edit button*/}
          <div>{blog.displayEditButton && <Button>Edit</Button>}</div>
          {/* content */}
          <div className="flex w-full flex-col items-start">
            {/* title */}
            <h2 className={cn("text-4xl font-bold text-gray-800", "font-oswald")}>{blog.title}</h2>

            {/* author, date */}
            <p className="mt-2 font-serif text-lg italic text-gray-600">
              {blog.author}, {formattedDate}
            </p>

            {/* read time ? need to do logic for this */}
            {blog.read_time && <span className="mt-2 rounded-full bg-gray-100 px-4 py-1 text-sm text-gray-600">{blog.read_time} read</span>}

            {/* content */}
            <p className={cn("mt-4 text-lg text-gray-700", "font-redhat")}>
              {blog.content ? blog.content.substring(0, 120) + "..." : "No content available"}
            </p>

            {/* read more button*/}
            <div className="mt-6 flex w-full justify-center">
              <div className="relative">
                <div className="absolute -inset-0.5 rounded-full bg-white shadow-md"></div>
                <Button
                  className={cn(
                    "relative rounded-full bg-saseBlue font-serif text-xl italic",
                    "text-white shadow-[2px_4px_12px_rgba(0,0,0,0.2)]",
                    "underline decoration-1 underline-offset-4",
                    "z-10 px-8 py-3",
                  )}
                  onClick={() => {
                    console.log("Expanding blog:", blog.id);
                    setExpandedBlogId(blog.id);
                  }}
                >
                  Read more...
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
};

export default BlogCard;
