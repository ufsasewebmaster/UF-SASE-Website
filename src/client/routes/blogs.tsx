import { useAuth } from "@client/AuthContext";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Textarea } from "@components/ui/textarea";
import { useBlogs } from "@hooks/useBlogs";
import type { Blog } from "@shared/schema/blogSchema";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/blogs")({
  component: () => {
    const [isCreating, setIsCreating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentBlog, setCurrentBlog] = useState<Blog | null>(null);
    const [newBlogTitle, setNewBlogTitle] = useState("");
    const [newBlogContent, setNewBlogContent] = useState("");
    const [newBlogTags, setNewBlogTags] = useState("");
    const { isAuthenticated } = useAuth();
    const [error, setError] = useState<string | null>(null);

    const { blogs, createBlog, updateBlog } = useBlogs();

    const handleCreateBlog = () => {
      createBlog.mutate(
        {
          title: newBlogTitle,
          content: newBlogContent,
          tags: newBlogTags.split(",").map((tag) => tag.trim()),
          author_id: "SASE Historian", // TODO: This should be optional
        },
        {
          onError: (error: Error) => {
            setError(error.message);
          },
          onSuccess: () => {
            setIsCreating(false);
            resetForm();
          },
        },
      );
    };

    const handleUpdateBlog = () => {
      if (currentBlog) {
        updateBlog.mutate(
          {
            title: newBlogTitle,
            content: newBlogContent,
            // tags: newBlogTags.split(",").map((tag) => tag.trim()),
          },
          {
            onError: (error: Error) => {
              setError(error.message);
            },
            onSuccess: () => {
              setIsEditing(false);
              setCurrentBlog(null);
              resetForm();
            },
          },
        );
      }
    };

    const handleEditBlog = (blog: Blog) => {
      setCurrentBlog(blog);
      setNewBlogTitle(blog.title);
      setNewBlogContent(blog.content);
      // setNewBlogTags(blog.tags?.join(", ") || "");
      setIsEditing(true);
      setError(null);
    };

    const resetForm = () => {
      setNewBlogTitle("");
      setNewBlogContent("");
      setNewBlogTags("");
      setError(null);
    };

    if (blogs.isLoading) return <div>Loading blogs...</div>;
    if (blogs.isError) return <div>Error loading blogs: {blogs.error.message}</div>;

    return (
      <div className="container mx-auto p-4">
        <h1 className="mb-6 text-3xl font-bold">Blogs</h1>

        {isAuthenticated && !isCreating && !isEditing && (
          <Button onClick={() => setIsCreating(true)} className="mb-4">
            Create New Blog Post
          </Button>
        )}

        {(isCreating || isEditing) && (
          <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-2xl font-bold">{isCreating ? "Create New Blog Post" : "Edit Blog Post"}</h2>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Title</label>
                <Input value={newBlogTitle} onChange={(e) => setNewBlogTitle(e.target.value)} placeholder="Enter blog title" className="w-full" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Content</label>
                <Textarea
                  value={newBlogContent}
                  onChange={(e) => setNewBlogContent(e.target.value)}
                  placeholder="Enter blog content"
                  className="min-h-[200px] w-full"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Tags</label>
                <Input
                  value={newBlogTags}
                  onChange={(e) => setNewBlogTags(e.target.value)}
                  placeholder="Enter tags (comma-separated)"
                  className="w-full"
                />
              </div>
            </div>
            <div className="mt-4 space-x-2">
              <Button onClick={isCreating ? handleCreateBlog : handleUpdateBlog}>{isCreating ? "Create Post" : "Update Post"}</Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setIsCreating(false);
                  setIsEditing(false);
                  setCurrentBlog(null);
                  resetForm();
                }}
              >
                Cancel
              </Button>
            </div>
            {error && <div className="mt-2 text-red-500">{error}</div>}
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs.data && blogs.data.length > 0 ? (
            blogs.data.map((blog: Blog) => (
              <div key={blog.id} className="rounded-lg bg-white p-6 shadow-md">
                <h2 className="mb-2 text-xl font-bold">{blog.title}</h2>
                <p className="mb-4 text-gray-600">{blog.content.substring(0, 100)}...</p>
                {/* {blog.tags && <p className="mb-2 text-sm text-gray-500">Tags: {blog.tags.join(", ")}</p>} */}
                {isAuthenticated && <Button onClick={() => handleEditBlog(blog)}>Edit</Button>}
              </div>
            ))
          ) : (
            <p>No blogs found.</p>
          )}
        </div>
      </div>
    );
  },
});
