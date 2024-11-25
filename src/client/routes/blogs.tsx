import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "../AuthContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { createBlog, getAllBlogs, updateBlog } from "../lib/api";
import type { Blog } from "../lib/types";

export const Route = createFileRoute("/blogs")({
  component: BlogsPage,
});

function BlogsPage() {
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<Blog | null>(null);
  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogContent, setNewBlogContent] = useState("");
  const [newBlogTags, setNewBlogTags] = useState("");
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  const {
    data: blogs,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: getAllBlogs,
  });

  const createBlogMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      setIsCreating(false);
      resetForm();
    },
  });

  const updateBlogMutation = useMutation({
    mutationFn: updateBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      setIsEditing(false);
      setCurrentBlog(null);
    },
  });

  const handleCreateBlog = () => {
    createBlogMutation.mutate({
      title: newBlogTitle,
      content: newBlogContent,
      tags: newBlogTags,
    });
  };

  const handleUpdateBlog = () => {
    if (currentBlog) {
      updateBlogMutation.mutate({
        id: currentBlog.id,
        title: newBlogTitle,
        content: newBlogContent,
        tags: newBlogTags,
      });
    }
  };

  const handleEditBlog = (blog: Blog) => {
    setCurrentBlog(blog);
    setNewBlogTitle(blog.title);
    setNewBlogContent(blog.content);
    setNewBlogTags(blog.tags || "");
    setIsEditing(true);
  };

  const resetForm = () => {
    setNewBlogTitle("");
    setNewBlogContent("");
    setNewBlogTags("");
  };

  if (isLoading) return <div>Loading blogs...</div>;
  if (error)
    return (
      <div>
        Error loading blogs:{" "}
        {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );

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
          <h2 className="mb-4 text-2xl font-bold">
            {isCreating ? "Create New Blog Post" : "Edit Blog Post"}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Title
              </label>
              <Input
                value={newBlogTitle}
                onChange={(e) => setNewBlogTitle(e.target.value)}
                placeholder="Enter blog title"
                className="w-full"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Content
              </label>
              <Textarea
                value={newBlogContent}
                onChange={(e) => setNewBlogContent(e.target.value)}
                placeholder="Enter blog content"
                className="min-h-[200px] w-full"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Tags
              </label>
              <Input
                value={newBlogTags}
                onChange={(e) => setNewBlogTags(e.target.value)}
                placeholder="Enter tags (comma-separated)"
                className="w-full"
              />
            </div>
          </div>
          <div className="mt-4 space-x-2">
            <Button
              onClick={isCreating ? handleCreateBlog : handleUpdateBlog}
              disabled={
                createBlogMutation.isPending || updateBlogMutation.isPending
              }
            >
              {isCreating ? "Create Post" : "Update Post"}
            </Button>
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
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogs && blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog.id} className="rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-2 text-xl font-bold">{blog.title}</h2>
              <p className="mb-4 text-gray-600">
                {blog.content.substring(0, 100)}...
              </p>
              {blog.tags && (
                <p className="mb-2 text-sm text-gray-500">Tags: {blog.tags}</p>
              )}
              {isAuthenticated && (
                <Button onClick={() => handleEditBlog(blog)}>Edit</Button>
              )}
            </div>
          ))
        ) : (
          <p>No blogs found.</p>
        )}
      </div>
    </div>
  );
}
