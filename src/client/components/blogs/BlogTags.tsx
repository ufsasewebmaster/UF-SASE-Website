import type { BlogTagsProps } from "@/shared/types/blogTypes";
import { cn } from "@/shared/utils";
import React, { useState } from "react";

const BlogTags: React.FC<BlogTagsProps> = ({ activeTag, onSearch, onTagClick, tags }) => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const TAGS_PER_PAGE = 3;
  const tagArray = Array.isArray(tags) ? tags : [];
  const totalPages = Math.ceil(tagArray.length / TAGS_PER_PAGE);
  const hasMultiplePages = tagArray.length > TAGS_PER_PAGE;
  const visibleTags = tagArray.slice(currentPage * TAGS_PER_PAGE, currentPage * TAGS_PER_PAGE + TAGS_PER_PAGE);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchText);
  };

  const navButtonClasses = cn(
    "flex items-center px-3 py-2 text-base",
    "font-serif",
    "-mb-px transition-colors hover:border-b-2 hover:border-black",
    "text-gray-800",
  );

  const tagButtonClasses = (isActive: boolean) =>
    cn(
      "flex items-center px-5 py-2 text-base italic",
      "font-serif",
      "-mb-px transition-colors hover:border-b-2 hover:border-black",
      "text-gray-800",
      isActive && "border-b-2 border-black font-bold",
    );

  return (
    <div className="mx-auto my-6 flex max-w-6xl flex-col items-center justify-between px-8 sm:flex-row sm:px-12">
      <div className="flex h-12 w-full flex-shrink-0 items-stretch overflow-x-auto pr-4 sm:w-auto sm:pr-8">
        <div className={cn("flex items-center bg-black px-5 py-2 text-white", "font-oswald text-3xl uppercase")}>TAGS</div>
        <div className="relative flex border-b border-gray-300">
          {visibleTags.length > 0 ? (
            <>
              {hasMultiplePages && currentPage > 0 && (
                <>
                  <button className={navButtonClasses} onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}>
                    {"<<"}
                  </button>
                  <div className="h-full w-0.5 bg-gray-300"></div>
                </>
              )}

              {visibleTags.map((tag, index) => (
                <React.Fragment key={index}>
                  <button className={tagButtonClasses(activeTag === tag)} onClick={() => onTagClick?.(tag)}>
                    {tag}
                  </button>
                  {index < visibleTags.length - 1 && <div className="h-full w-0.5 bg-gray-300"></div>}
                </React.Fragment>
              ))}

              {hasMultiplePages && currentPage < totalPages - 1 && (
                <>
                  <div className="h-full w-0.5 bg-gray-300"></div>
                  <button className={navButtonClasses} onClick={() => setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))}>
                    {">>"}
                  </button>
                </>
              )}
            </>
          ) : (
            <div className="px-5 py-2 text-base text-gray-500">No tags available</div>
          )}

          {activeTag && (
            <>
              <div className="h-full w-0.5 bg-gray-300"></div>
              <button
                className={cn(
                  "flex items-center px-5 py-2 text-base",
                  "font-redhat",
                  "-mb-px transition-colors hover:border-b-2 hover:border-black",
                  "text-red-600",
                )}
                onClick={() => onTagClick?.("")}
              >
                Back
              </button>
            </>
          )}
        </div>
      </div>

      <div className="ml-0 mt-4 flex w-full flex-shrink-0 items-center pl-4 sm:mt-0 sm:w-auto sm:pl-8">
        <form onSubmit={handleSearch} className="relative w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full rounded-full bg-gray-200 py-3 pl-6 pr-12 text-base sm:w-64"
          />
          <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 transform cursor-pointer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogTags;
