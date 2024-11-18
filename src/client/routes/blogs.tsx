import saseLogo from "@/client/assets/SASELogo.png";
import { useAuth } from "@client/AuthContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import parse from "html-react-parser";
import { UploadCloud, X } from "lucide-react";
import React, { useMemo, useState } from "react";
import type { Descendant } from "slate";
import { createEditor } from "slate";
import { Editable, Slate, withReact } from "slate-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { seo } from "../utils/seo";

export const Route = createFileRoute("/blogs")({
  meta: () => [
    ...seo({
      title: "Blogs | UF SASE",
      description: "UF Society of Asian Scientists & Engineers",
      image: saseLogo,
    }),
  ],
  component: BlogsPage,
});

const initialValue: Array<Descendant> = [
  {
    children: [
      {
        text: "This is the initial blog content. Click edit to change the text.",
      },
    ],
  },
];

function BlogsPage() {
  const [editorContent, setEditorContent] =
    useState<Array<Descendant>>(initialValue);
  const [isEditing, setIsEditing] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageUploaded, setImageUploaded] = useState(false);
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  // New state for creating a blog post
  const [isCreating, setIsCreating] = useState(false);
  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogContent, setNewBlogContent] = useState("");
  const [newBlogImage, setNewBlogImage] = useState<string | null>(null);

  const editor = useMemo(() => withReact(createEditor()), []);

  const {
    data: blogs,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await fetch("/api/blog/all");
      if (!res.ok) {
        throw new Error("Failed to fetch blogs");
      }
      return res.json();
    },
  });

  const createBlogMutation = useMutation({
    mutationFn: async (newBlog: {
      title: string;
      content: string;
      imageUrl: string | null;
    }) => {
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBlog),
      });
      if (!res.ok) {
        throw new Error("Failed to create blog post");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      setIsCreating(false);
      setNewBlogTitle("");
      setNewBlogContent("");
      setNewBlogImage(null);
    },
  });

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => {
    setIsEditing(false);
    // TODO: Implement save functionality
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImageUrl(imageURL);
      setImageUploaded(true);
    }
  };

  const handleNewBlogImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setNewBlogImage(imageURL);
    }
  };

  const handleImageRemove = () => {
    setImageUrl(null);
    setImageUploaded(false);
  };

  const handleNewBlogImageRemove = () => {
    setNewBlogImage(null);
  };

  const handleImageSave = () => {
    setImageUploaded(false);
  };

  const handleChange = (value: Array<Descendant>) => setEditorContent(value);

  const handleCreateBlog = () => {
    createBlogMutation.mutate({
      title: newBlogTitle,
      content: newBlogContent,
      imageUrl: newBlogImage,
    });
  };

  if (isLoading) {
    return <div>Loading blogs...</div>;
  }
  if (error) {
    return <div>Error loading blogs.</div>;
  }

  return (
    <div className="blog-container">
      {/* Display fetched blogs */}
      <pre>{JSON.stringify(blogs, null, 2)}</pre>

      {isAuthenticated && !isCreating && (
        <Button onClick={() => setIsCreating(true)} className="mb-4">
          Create New Blog Post
        </Button>
      )}

      {isCreating && (
        <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-2xl font-bold">Create New Blog Post</h2>
          <div className="space-y-4">
            <div>
              <span className="mb-1 block text-sm font-medium text-gray-700">
                Title
              </span>
              <Input
                value={newBlogTitle}
                onChange={(e) => setNewBlogTitle(e.target.value)}
                placeholder="Enter blog title"
                className="w-full"
              />
            </div>
            <div>
              <span className="mb-1 block text-sm font-medium text-gray-700">
                Content
              </span>
              <textarea
                value={newBlogContent}
                onChange={(e) => setNewBlogContent(e.target.value)}
                placeholder="Enter blog content"
                className="min-h-[200px] w-full rounded-md border p-2"
              />
            </div>
            <div>
              <span className="mb-1 block text-sm font-medium text-gray-700">
                Banner Image
              </span>
              <div className="mt-2">
                {newBlogImage ? (
                  <div className="relative">
                    <img
                      src={newBlogImage}
                      alt="New blog banner"
                      className="h-auto w-full rounded-lg object-cover"
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      size="icon"
                      className="absolute right-2 top-2"
                      onClick={handleNewBlogImageRemove}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                      <UploadCloud className="mb-4 h-8 w-8 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                    <Input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleNewBlogImageUpload}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="mt-4 space-x-2">
            <Button
              onClick={handleCreateBlog}
              disabled={createBlogMutation.isPending}
            >
              {createBlogMutation.isPending ? "Creating..." : "Create Post"}
            </Button>
            <Button variant="secondary" onClick={() => setIsCreating(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Image Banner Section */}
      <div
        className="relative flex h-80 w-full items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: imageUrl
            ? `url(${imageUrl})`
            : "url('https://via.placeholder.com/800x200')",
        }}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          id="upload-banner"
        />

        {imageUrl && (
          <button
            className="absolute left-4 top-4 rounded border border-black bg-white px-2 py-1 text-black"
            onClick={handleImageRemove}
            aria-label="Remove Image"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        {!imageUploaded ? (
          <label
            htmlFor="upload-banner"
            className="absolute right-4 top-4 cursor-pointer rounded border border-black bg-white px-2 py-1 text-black"
            aria-label="Upload Image"
          >
            <UploadCloud className="h-4 w-4" />
          </label>
        ) : (
          <button
            className="absolute right-4 top-4 rounded border border-black bg-white px-2 py-1 text-black"
            onClick={handleImageSave}
            aria-label="Save Image"
          >
            <span>todo save icon</span>
          </button>
        )}

        <h1
          className="absolute text-5xl font-bold text-white"
          style={{ textShadow: "0px 0px 4px rgba(0, 0, 0, 0.8)" }}
        >
          September 2023 Recap
        </h1>
      </div>

      <div className="blog-content-container mx-auto max-w-5xl bg-white p-8">
        <div className="author-info mb-4 text-center text-gray-600">
          <p className="font-semibold">Gurleen Dhillon</p>
          <p className="text-sm">15 min read • Oct 5, 2023</p>
        </div>
        <hr className="my-4" />

        <div className="prose lg:prose-xl mb-8">
          {!isEditing ? (
            <div>
              {parse(
                editorContent
                  .map((n) =>
                    "children" in n
                      ? n.children
                          .map((c) => ("text" in c ? c.text : ""))
                          .join("")
                      : "",
                  )
                  .join("\n"),
              )}
            </div>
          ) : (
            <Slate
              editor={editor}
              initialValue={editorContent}
              onChange={handleChange}
            >
              <Editable
                className="font-sans"
                renderElement={({ attributes, children }) => (
                  <p {...attributes}>{children}</p>
                )}
                renderLeaf={({ attributes, children }) => (
                  <span {...attributes}>{children}</span>
                )}
              />
            </Slate>
          )}
        </div>

        {isAuthenticated &&
          (!isEditing ? (
            <Button variant="default" onClick={handleEdit}>
              Edit
            </Button>
          ) : (
            <Button variant="default" onClick={handleSave} className="mt-4">
              Save
            </Button>
          ))}
      </div>
    </div>
  );
}
