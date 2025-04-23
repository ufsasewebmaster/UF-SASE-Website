import { imageUrls } from "@/client/assets/imageUrls";
import type { BlogExpandedProps } from "@/shared/types/blogTypes";
import { cn } from "@/shared/utils";
import React, { useEffect } from "react";
import { useBlogFunctions } from "../../hooks/useBlogsFunctions";
import { Button } from "../ui/button";
import BlogCarousel from "./BlogCarousel";

const BlogExpanded: React.FC<BlogExpandedProps> = ({
  blog,
  isEditing,
  onClose,
  onNavigateNext,
  onNavigatePrev,
  setIsEditing,
  showBackButton = true,
}) => {
  const { startEditingBlog } = useBlogFunctions();
  console.log(blog);
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  const handleClose = () => {
    if (setIsEditing) setIsEditing(false);
    if (onClose) onClose();
  };

  const handleEditButtonClicked = () => {
    if (setIsEditing) {
      setIsEditing(!isEditing);
      // If switching to edit mode, set the current blog
      if (!isEditing) {
        startEditingBlog(blog);
      }
    }
  };

  const renderContent = () => {
    if (!blog.content.includes("##")) {
      return <p className={cn("mb-6 text-gray-800", "font-redhat")}>{blog.content}</p>;
    }

    const sections = blog.content.split(/##\s*([^\n]+)/);

    return sections.map((section, index) => {
      if (index === 0) {
        return section ? (
          <p key={`content-intro`} className={cn("mb-6 text-gray-800", "font-redhat")}>
            {section}
          </p>
        ) : null;
      }
      if (index % 2 === 1) {
        return (
          <h2 key={`heading-${index}`} className={cn("mb-2 text-xl font-semibold", "font-redhat font-bold")}>
            {section}
          </h2>
        );
      } else {
        return (
          <p key={`content-${index}`} className={cn("mb-6 text-gray-800", "font-redhat")}>
            {section}
          </p>
        );
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* back button */}
        {showBackButton && (
          <button
            className={cn("mb-6 flex cursor-pointer items-center font-pixelify font-semibold tracking-wider", "text-3xl")}
            onClick={handleClose}
            aria-label="Back to all posts"
          >
            <span className="mr-3 bg-gradient-to-r from-saseGreen to-saseBlue bg-clip-text text-transparent">≪</span>
            <span className="bg-gradient-to-r from-saseGreen to-saseBlue bg-clip-text text-transparent">BACK TO ALL POSTS</span>
          </button>
        )}

        <div className="relative">
          {/* shadow card */}
          <div className="relative rounded-[50px] border-2 border-border bg-white p-8 shadow-lg transition">
            <div className="pointer-events-none absolute left-5 top-5 -z-10 h-full w-full rounded-[50px] bg-gradient-to-b from-saseGreen to-saseBlue" />
            {/* header */}
            <div className="px-4 py-2 text-center">
              {/*Row with title and edit button*/}
              <div className="relative flex items-center justify-center">
                <h1 className={cn("text-4xl font-bold", "font-oswald")}>{blog.title}</h1>
                {blog.displayEditButton && (
                  <Button className={cn("absolute right-0")} onClick={handleEditButtonClicked}>
                    {!isEditing ? "Edit" : "Close Editor"}
                  </Button>
                )}
              </div>
              <div className={cn("mt-2 flex items-center justify-center text-sm text-gray-600", "font-redhat")}>
                <span className="mr-2">{blog.timeUpdated || "15 min read"}</span>
                <span className="mx-2">by {blog.author}</span>
                <span className="ml-2">
                  {new Date(blog.publishedDate).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
            {/* carousel */}
            <div className="mb-6 mt-4">
              {blog.images.length > 0 ? (
                <BlogCarousel images={blog.images} />
              ) : (
                <div className="flex h-64 w-full items-center justify-center rounded-lg bg-gray-200 text-gray-500">No images available</div>
              )}
              <div className={cn("mt-2 text-center text-sm text-gray-500", "font-redhat")}>
                {blog.images.length > 0 ? "caption lorem ipsum yuh lots of words to say about this photo" : ""}
              </div>
            </div>
            {/* content */}
            <div
              className={cn(
                "mx-4 mb-8 max-h-full overflow-y-auto rounded-2xl border-4 border-dashed px-8 py-6",
                "border-saseGreen/40 border-r-saseBlue/60",
              )}
            >
              {renderContent()}
            </div>

            <img src={imageUrls["SASELogoStar.png"]} alt="Logo" className="absolute -bottom-12 -right-12 h-[130px] w-[130px] object-contain" />
          </div>
        </div>
        {/* nav buttons */}
        <div className="mt-10 flex w-full justify-center gap-10">
          {onNavigatePrev && (
            <div className="relative">
              <div className="absolute -inset-0.5 rounded-full bg-white shadow-md" />
              <Button
                onClick={onNavigatePrev}
                className={cn(
                  "relative rounded-full bg-saseBlue font-serif text-lg italic",
                  "text-white shadow-[2px_4px_12px_rgba(0,0,0,0.2)]",
                  "underline decoration-1 underline-offset-4",
                  "z-10 px-6 py-2",
                )}
              >
                &lt; Read last post
              </Button>
            </div>
          )}
          {onNavigateNext && (
            <div className="relative">
              <div className="absolute -inset-0.5 rounded-full bg-white shadow-md" />
              <Button
                onClick={onNavigateNext}
                className={cn(
                  "relative rounded-full bg-saseBlue font-serif text-lg italic",
                  "text-white shadow-[2px_4px_12px_rgba(0,0,0,0.2)]",
                  "underline decoration-1 underline-offset-4",
                  "z-10 px-6 py-2",
                )}
              >
                Read next post &gt;
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogExpanded;
