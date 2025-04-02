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
  const [isEditing, setIsEditing] = useState<boolean>(false);

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
    console.log("got here");
    console.log(currentBlog);
    if (currentBlog) {
      console.log("got here");
      updateBlog.mutate(
        {
          title: newBlogTitle,
          content: newBlogContent,
        },
        {
          onError: (error: Error) => setError(error.message),
          onSuccess: () => {
            setIsEditing(false);
            resetForm();
          },
        },
      );
      console.log("got here");
    }
  };

  const handleEditBlog = (blog: BlogBase) => {
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
    setCurrentBlog,
    handleCreateBlog,
    handleUpdateBlog,
    isEditing,
    setIsEditing,
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
