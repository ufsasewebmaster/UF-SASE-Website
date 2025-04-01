import { cn } from "@/shared/utils";
import { Button } from "@components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import BlogCard from "../components/blogs/BlogCard";
import BlogContainer from "../components/blogs/BlogContainer";
import BlogExpanded from "../components/blogs/BlogExpanded";
import BlogForm from "../components/blogs/BlogForm";
import BlogHeader from "../components/blogs/BlogHeader";
import BlogTags from "../components/blogs/BlogTags";
import { useBlogFunctions } from "../hooks/useBlogsFunctions";

export const Route = createFileRoute("/blogs")({
  component: () => {
    const {
      blogs,
      error,
      handleCreateBlog,
      handleUpdateBlog,
      isAuthenticated,
      isCreating,
      newBlogContent,
      newBlogTags,
      newBlogTitle,
      resetForm,
      setIsCreating,
      setNewBlogContent,
      setNewBlogTags,
      setNewBlogTitle,
    } = useBlogFunctions();

    const [expandedBlogId, setExpandedBlogId] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    if (blogs.isLoading) return <div className="font-redhat">Loading blogs...</div>;
    if (blogs.isError) return <div className="font-redhat">Error loading blogs: {blogs.error.message}</div>;

    const blogDisplayData = (blogs.data || []).map((blog) => ({
      ...blog,
      images: blog.images || [],
      author: blog.author_id || "",
      displayEditButton: isAuthenticated,
      editView: false,
    }));

    const sortedBlogs = [...blogDisplayData].sort((a, b) => new Date(b.published_date).getTime() - new Date(a.published_date).getTime());
    const recentBlogs = sortedBlogs.slice(0, 2);
    const otherBlogs = sortedBlogs.slice(2);
    const expandedBlog = expandedBlogId ? sortedBlogs.find((blog) => blog.id === expandedBlogId) : null;

    const handleCloseExpandedBlog = () => {
      setExpandedBlogId(null);
      document.body.style.overflow = "auto";
    };

    return (
      <div className="container mx-auto p-3">
        {!expandedBlogId && <BlogHeader blogs={recentBlogs} expandedBlogId={expandedBlogId} setExpandedBlogId={setExpandedBlogId} />}
        {/* expanded blog view */}
        {expandedBlog && expandedBlogId && (
          <BlogExpanded
            blog={expandedBlog}
            onClose={handleCloseExpandedBlog}
            showBackButton={true}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            editView={isEditing}
          />
        )}

        {!expandedBlogId && (
          <>
            {isAuthenticated && !isCreating && !isEditing && (
              <Button onClick={() => setIsCreating(true)} className={cn("mb-3", "font-redhat")}>
                Create New Blog Post
              </Button>
            )}

            {(isCreating || isEditing) && (
              <BlogForm
                isCreating={isCreating}
                isEditing={isEditing}
                newBlogTitle={newBlogTitle}
                newBlogContent={newBlogContent}
                newBlogTags={newBlogTags}
                error={error}
                onTitleChange={setNewBlogTitle}
                onContentChange={setNewBlogContent}
                onTagsChange={setNewBlogTags}
                onSubmit={isCreating ? handleCreateBlog : handleUpdateBlog}
                onCancel={() => {
                  setIsCreating(false);
                  setIsEditing(false);
                  resetForm();
                }}
              />
            )}

            {/* tags */}
            <BlogTags tags={["Winter Banquet", "Collaborations", "GBMs"]} />

            {/* all posts header */}
            <div className="mx-auto mb-5 mt-10 max-w-6xl px-4 sm:px-6 md:px-8 lg:px-10">
              <h2
                className={cn(
                  "text-2xl sm:text-2xl md:text-3xl lg:text-4xl",
                  "bg-gradient-to-r from-saseTeal to-saseBlue bg-clip-text text-transparent",
                  "font-pixelify font-semibold tracking-wider",
                )}
              >
                ALL POSTS
              </h2>
            </div>

            {/* all blogs grid */}
            <BlogContainer>
              <div className="mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-2">
                {otherBlogs.length > 0 && isAuthenticated ? (
                  otherBlogs.map((blog) => (
                    <BlogCard
                      key={blog.id}
                      blog={blog}
                      expandedBlogId={expandedBlogId}
                      setExpandedBlogId={setExpandedBlogId}
                      setIsEditing={setIsEditing}
                    />
                  ))
                ) : (
                  <p className="font-redhat">No blogs found.</p>
                )}
              </div>
            </BlogContainer>
          </>
        )}
      </div>
    );
  },
});
