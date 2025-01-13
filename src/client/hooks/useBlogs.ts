import type { Blog, BlogSearchResponse, CreateBlog, UpdateBlog } from "@shared/schema/blogSchema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createBlog, fetchBlogById, fetchBlogs, searchBlogsByTitle, updateBlog } from "../api/blogs";

export const useBlogs = () => {
  const queryClient = useQueryClient();

  // Fetch all blogs
  const blogsQuery = useQuery<Array<Blog>, Error>({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });

  // Create a new blog
  const createBlogMutation = useMutation<Blog, Error, CreateBlog>({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  // Update an existing blog
  const updateBlogMutation = useMutation<Blog, Error, UpdateBlog>({
    mutationFn: updateBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  // Fetch a blog by ID
  const fetchBlogByIdQuery = (blogId: string) =>
    useQuery<Blog, Error>({
      queryKey: ["blogs", blogId],
      queryFn: () => fetchBlogById(blogId),
      enabled: !!blogId,
    });

  // Search blogs by title
  const searchBlogsQuery = (title: string) =>
    useQuery<BlogSearchResponse, Error>({
      queryKey: ["blogs", "search", title],
      queryFn: () => searchBlogsByTitle(title),
      enabled: !!title,
    });

  return {
    blogs: blogsQuery,
    createBlog: {
      mutate: createBlogMutation.mutate,
      isError: createBlogMutation.isError,
      error: createBlogMutation.error,
    },
    updateBlog: {
      mutate: updateBlogMutation.mutate,
      isError: updateBlogMutation.isError,
      error: updateBlogMutation.error,
    },
    fetchBlogById: fetchBlogByIdQuery,
    searchBlogs: searchBlogsQuery,
  };
};
