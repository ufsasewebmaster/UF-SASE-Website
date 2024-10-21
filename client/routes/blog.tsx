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
      "Greetings, everyone! This is the initial blog content. Click edit to modify.",
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
      <div className="flex min-h-screen justify-center bg-gray-100 py-8">
        <div className="flex w-[50vw] flex-col gap-6">
          <h1 className="text-4xl font-bold">BLOGS</h1>
          <h2 className="border-l-[6px] border-[#7dc242] pl-4 text-3xl font-semibold text-gray-700">
            The Latest
          </h2>
          <div className="flex aspect-[7/3] max-w-5xl flex-row gap-4 content-between overflow-hidden rounded-3xl bg-white p-8 shadow-md">
            <div className="flex flex-1 items-center px-4">
              <div className="flex h-[80%] w-[90%] flex-col ">
                <h1 className="mb-4 text-2xl text-blue-600">
                  November/December Recap
                </h1>
                <hr className="border-gray-400" />
                <div className="mb-4 flex gap-2">
                  <p className="font-medium">Gurleen Dhillon</p>
                  <p className="ml-auto text-base font-normal">
                    15 min read • Oct 5, 2023
                  </p>
                </div>
                <div className="prose lg:prose-xl">
                  {!isEditing ? (
                    <div dangerouslySetInnerHTML={{ __html: editorContent }} />
                  ) : (
                    <ReactQuill value={editorContent} onChange={handleChange} />
                  )}
                </div>

                {!isEditing ? (
                  <Button
                    variant="outline"
                    onClick={handleEdit}
                    className="mt-auto w-16 shadow-sm"
                  >
                    Edit
                  </Button>
                ) : (
                  <Button
                    variant="default"
                    onClick={handleSave}
                    className="mt-auto w-16 shadow-sm"
                  >
                    Save
                  </Button>
                )}
              </div>
            </div>
            <div className="flex flex-1 items-center justify-center rounded-3xl bg-gray-200">
              <p className="font-bold text-gray-500">PLACEHOLDER IMG</p>
            </div>
          </div>
          <h2 className="border-l-[6px] border-[#7dc242] pl-4 text-3xl font-semibold text-gray-700">
            Our Posts
          </h2>
        </div>
      </div>
    );
  },
});
