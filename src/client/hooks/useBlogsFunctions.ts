import { useAuth } from "@/client/hooks/AuthContext";
import { useBlogs } from "@hooks/useBlogs";
import type { BlogBase } from "@shared/types/blogTypes";
import { useState } from "react";

export const useBlogFunctions = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<BlogBase | null>(null);
  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogContent, setNewBlogContent] = useState("");
  const [newBlogTags, setNewBlogTags] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { id, isAuthenticated } = useAuth();
  const { blogs, createBlog, updateBlog } = useBlogs();

  const handleCreateBlog = () => {
    createBlog.mutate(
      {
        title: newBlogTitle,
        content: newBlogContent,
        tags: newBlogTags.split(",").map((tag) => tag.trim()),
        author_id: id,
      },
      {
        onError: (error: Error) => setError(error.message),
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
        },
        {
          onError: (error: Error) => setError(error.message),
          onSuccess: () => {
            setCurrentBlog(null);
            resetForm();
          },
        },
      );
    }
  };

  const handleEditBlog = (blog: BlogBase) => {
    setCurrentBlog(blog);
    setNewBlogTitle(blog.title);
    setNewBlogContent(blog.content);
    setError(null);
  };

  const resetForm = () => {
    setNewBlogTitle("");
    setNewBlogContent("");
    setNewBlogTags("");
    setError(null);
  };

  return {
    blogs,
    isAuthenticated,
    isCreating,
    setIsCreating,
    currentBlog,
    handleCreateBlog,
    handleUpdateBlog,
    handleEditBlog,
    resetForm,
    newBlogTitle,
    setNewBlogTitle,
    newBlogContent,
    setNewBlogContent,
    newBlogTags,
    setNewBlogTags,
    error,
  };
};
