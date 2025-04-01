import type { Blog, CreateBlog, UpdateBlog } from "@shared/schema/blogSchema";
import type { BlogTag } from "@shared/schema/blogTagSchema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createBlog, fetchAllTags, fetchBlogById, fetchBlogs, fetchBlogsByTag, searchBlogsByTitle, updateBlog } from "../api/blogs";

export const useBlogs = () => {
  const queryClient = useQueryClient();

  // cache invalidation function for mutations
  const invalidateCache = () => {
    queryClient.invalidateQueries({ queryKey: ["blogs"] });
    queryClient.invalidateQueries({ queryKey: ["blogTags"] });
  };

  // Fetch all blogs
  const blogsQuery = useQuery<Array<Blog>, Error>({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });

  // Fetch all tags
  const tagsQuery = useQuery<Array<BlogTag>, Error>({
    queryKey: ["blogTags"],
    queryFn: fetchAllTags,
  });

  // Create a new blog
  const createBlogMutation = useMutation<Blog, Error, CreateBlog>({
    mutationFn: createBlog,
    onSuccess: invalidateCache,
  });

  // Update an existing blog
  const updateBlogMutation = useMutation<Blog, Error, UpdateBlog>({
    mutationFn: updateBlog,
    onSuccess: invalidateCache,
  });

  // Fetch a blog by ID
  // queryKey - includes ID for specific blog cache entry
  // enabled: !!blogId - means only runs when blogId is available
  const fetchBlogByIdQuery = (blogId: string) =>
    useQuery<Blog, Error>({
      queryKey: ["blogs", blogId],
      queryFn: () => fetchBlogById(blogId),
      enabled: !!blogId,
    });

  // Search blogs by title
  // queryKey - identifies search results by title
  // enabled: !!title - only runs when title is non-empty
  const searchBlogsQuery = (title: string) =>
    useQuery<Array<Blog>, Error>({
      queryKey: ["blogs", "search", title],
      queryFn: () => searchBlogsByTitle(title),
      enabled: !!title,
    });

  // Fetch blogs by tag
  // queryKey - identifies blogs filtered by tag
  // enabled: !!tagName - only runs when tagName is provided
  const fetchBlogsByTagQuery = (tagName: string) =>
    useQuery<Array<Blog>, Error>({
      queryKey: ["blogs", "tag", tagName],
      queryFn: () => fetchBlogsByTag(tagName),
      enabled: !!tagName,
    });

  return {
    blogs: blogsQuery,
    tags: tagsQuery,
    createBlog: createBlogMutation,
    updateBlog: updateBlogMutation,
    fetchBlogById: fetchBlogByIdQuery,
    fetchBlogsByTag: fetchBlogsByTagQuery,
    searchBlogs: searchBlogsQuery,
  };
};