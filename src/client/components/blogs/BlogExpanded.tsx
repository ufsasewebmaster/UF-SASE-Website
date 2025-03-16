import { cn } from "@/shared/utils";
import React, { useEffect } from "react";
import { Logo } from "../navigation/Logo";
import { Button } from "../ui/button";
import BlogCarousel from "./BlogCarousel";

interface Blog {
  id: string;
  title: string;
  content: string;
  images: Array<string>;
  published_date: string;
  time_updated: string;
  author: string;
}

interface BlogExpandedProps {
  blog: Blog;
  onClose: () => void;
  showBackButton?: boolean;
}

const BlogExpanded: React.FC<BlogExpandedProps> = ({ blog, onClose, showBackButton = true }) => {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  const handleClose = () => {
    console.log("Close button clicked");
    if (onClose) {
      onClose();
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
          <div className="absolute left-5 top-5 z-0 h-full w-full rounded-[50px] bg-gradient-to-b from-saseGreen to-saseBlue"></div>

          {/* main card */}
          <div className={cn("relative z-10 flex flex-col rounded-[50px] border-2 border-border bg-white p-8", "w-full shadow-lg transition")}>
            {/* header */}
            <div className="px-4 py-2 text-center">
              <h1 className={cn("text-4xl font-bold", "font-oswald")}>{blog.title}</h1>
              <div className={cn("mt-2 flex items-center justify-center text-sm text-gray-600", "font-redhat")}>
                <span className="mr-2">{blog.time_updated || "15 min read"}</span>
                <span className="mx-2">by {blog.author}</span>
                <span className="ml-2">
                  {new Date(blog.published_date).toLocaleDateString("en-US", {
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

            {/* nav buttons */}
            <div className="mb-2 mt-auto flex items-center justify-between px-4">
              <Button className={cn("rounded-full bg-saseBlue px-6 py-2 text-white", "transition hover:bg-saseBlue/80", "font-redhat font-medium")}>
                &lt; Read last post
              </Button>

              <div className="absolute bottom-0 right-10 -mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-saseBlue p-3 text-white">
                  <Logo />
                </div>
              </div>

              <Button className={cn("rounded-full bg-saseBlue px-6 py-2 text-white", "transition hover:bg-saseBlue/80", "font-redhat font-medium")}>
                Read next post &gt;
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogExpanded;
