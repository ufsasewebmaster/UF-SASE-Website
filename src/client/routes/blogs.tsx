import { useAuth } from "@client/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import parse from "html-react-parser";
import React, { useMemo, useState } from "react";
import { FiSave, FiUpload, FiX } from "react-icons/fi";
import type { Descendant } from "slate";
import { createEditor } from "slate";
import { Editable, Slate, withReact } from "slate-react";
import { Button } from "../components/ui/button";

export const Route = createFileRoute("/blogs")({
  component: BlogEditor,
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

function BlogEditor() {
  const [editorContent, setEditorContent] =
    useState<Array<Descendant>>(initialValue);
  const [isEditing, setIsEditing] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageUploaded, setImageUploaded] = useState(false);
  const { isAuthenticated } = useAuth();

  const editor = useMemo(() => withReact(createEditor()), []);

  const {
    data: blogs,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      // TODO: Make sure this actually works!
      const res = await fetch("/api/blog/all");
      if (!res.ok) {
        throw new Error("Failed to fetch blogs");
      }
      return res.json();
    },
  });

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => {
    setIsEditing(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImageUrl(imageURL);
      setImageUploaded(true);
    }
  };

  const handleImageRemove = () => {
    setImageUrl(null);
    setImageUploaded(false);
  };

  const handleImageSave = () => {
    setImageUploaded(false);
  };

  const handleChange = (value: Array<Descendant>) => setEditorContent(value);

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
            <FiX />
          </button>
        )}

        {!imageUploaded ? (
          <label
            htmlFor="upload-banner"
            className="absolute right-4 top-4 cursor-pointer rounded border border-black bg-white px-2 py-1 text-black"
            aria-label="Upload Image"
          >
            <FiUpload />
          </label>
        ) : (
          <button
            className="absolute right-4 top-4 rounded border border-black bg-white px-2 py-1 text-black"
            onClick={handleImageSave}
            aria-label="Save Image"
          >
            <FiSave />
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
