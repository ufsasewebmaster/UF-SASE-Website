import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { createFileRoute } from "@tanstack/react-router";
import DOMPurify from "dompurify";
import { Button } from "../components/ui/button";
import "../blog.css";

export const Route = createFileRoute("/blog")({
  component: () => {
    const [editorContent, setEditorContent] = useState<string>(
      "This is the initial blog content. Click edit to change the text.",
    );
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => {
      setIsEditing(true);
    };

    const handleSave = () => {
      const cleanContent = DOMPurify.sanitize(editorContent);
      setEditorContent(cleanContent);
      setIsEditing(false);
    };

    const handleChange = (content: string) => {
      setEditorContent(content);
    };

    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-lg bg-white shadow-lg">
          <div className="p-8">
            <h1 className="mb-4 text-center text-4xl font-bold">
              September 2023 Recap
            </h1>
            <div className="mb-4 flex items-center justify-center text-gray-600">
              <div>
                <p className="font-semibold">Gurleen Dhillon</p>
                <p className="text-sm">15 min read • Oct 5, 2023</p>
              </div>
            </div>
            <hr className="my-4" />

            <div className="prose lg:prose-xl mb-8">
              {!isEditing ? (
                <div dangerouslySetInnerHTML={{ __html: editorContent }} />
              ) : (
                <ReactQuill value={editorContent} onChange={handleChange} />
              )}
            </div>

            {!isEditing ? (
              <Button variant="default" onClick={handleEdit}>
                Edit
              </Button>
            ) : (
              <Button variant="default" onClick={handleSave} className="mt-4">
                Save
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  },
});
