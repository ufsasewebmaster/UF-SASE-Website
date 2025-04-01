import type { Blog as SchemaBaseBlog, CreateBlog as SchemaCreateBlog, UpdateBlog as SchemaUpdateBlog } from "@shared/schema/blogSchema";
import type { BlogTag as SchemaTag } from "@shared/schema/blogTagSchema";

export type BlogBase = SchemaBaseBlog;
export type CreateBlogInput = SchemaCreateBlog;
export type UpdateBlogInput = SchemaUpdateBlog;
export type BlogTag = SchemaTag;

// Enhanced display type that components use
export interface BlogDisplay extends Omit<BlogBase, "images" | "tags"> {
  images: Array<string>;
  author: string;
  read_time?: string;
  tags: Array<string>;
}

// Props for blog components
export interface BlogCardProps {
  blog: BlogDisplay;
  expandedBlogId: string | null;
  setExpandedBlogId: (id: string | null) => void;
}

export interface BlogExpandedProps {
  blog: BlogDisplay;
  onClose: () => void;
  showBackButton?: boolean;
}

export interface BlogHeaderProps {
  blogs: Array<BlogDisplay>;
  expandedBlogId: string | null;
  setExpandedBlogId: (id: string | null) => void;
}

export interface BlogFormProps {
  isCreating: boolean;
  isEditing: boolean;
  newBlogTitle: string;
  newBlogContent: string;
  newBlogTags: string;
  error: string | null;
  onTitleChange: (title: string) => void;
  onContentChange: (content: string) => void;
  onTagsChange: (tags: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export interface BlogTagsProps {
  tags: Array<string>;
  activeTag: string | null;
  onTagClick?: (tag: string) => void;
  onSearch?: (query: string) => void;
}

export interface BlogCarouselProps {
  images: Array<string>;
}
