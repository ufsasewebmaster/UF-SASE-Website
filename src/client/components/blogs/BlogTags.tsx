import type { BlogTagsProps } from "@/shared/types/blogTypes";
import { cn } from "@/shared/utils";
import React from "react";

const BlogTags: React.FC<BlogTagsProps> = ({ onTagClick, tags }) => {
  return (
    <div className="mx-auto my-6 flex max-w-6xl items-center justify-between px-8 sm:px-12">
      <div className="flex h-12 flex-shrink-0 items-stretch overflow-x-auto pr-4 sm:pr-8">
        <div className={cn("flex items-center bg-black px-5 py-2 text-white", "font-oswald text-3xl uppercase")}>TAGS</div>
        <div className="relative flex border-b border-gray-300">
          {tags.map((tag, index) => (
            <React.Fragment key={index}>
              <button
                className={cn(
                  "flex items-center px-5 py-2 text-base italic",
                  "font-serif",
                  "-mb-px transition-colors hover:border-b-2 hover:border-black",
                  "text-gray-800",
                )}
                onClick={() => onTagClick && onTagClick(tag)}
              >
                {tag}
              </button>
              {index < tags.length - 1 && <div className="h-full w-0.5 bg-gray-300"></div>}
            </React.Fragment>
          ))}
          <button
            className={cn(
              "flex items-center px-5 py-2 text-base",
              "font-redhat",
              "-mb-px transition-colors hover:border-b-2 hover:border-black",
              "text-gray-800",
            )}
          >
            &gt;&gt;
          </button>
        </div>
      </div>

      {/* search bar */}
      <div className="ml-0 flex flex-shrink-0 items-center pl-4 sm:pl-8">
        <div className="relative">
          <input type="text" placeholder="Search..." className="w-52 rounded-full bg-gray-200 py-3 pl-6 pr-12 text-base sm:w-64" />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 transform">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogTags;
