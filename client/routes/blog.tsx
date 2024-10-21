import React, { useReducer, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { createFileRoute } from "@tanstack/react-router";
import DOMPurify from "dompurify";
import { Button } from "../components/ui/button";
import "../blog.css";

interface LastestPostProps {
  title: string;
  author: string;
  date: string;
  readTime: string;
  content: string;
}

export const Route = createFileRoute("/blog")({
  component: () => {
    return (
      <div className="flex min-h-screen justify-center bg-gray-100 py-8">
        <div className="flex w-[50vw] flex-col gap-6">
          <h1 className="text-4xl font-bold">BLOGS</h1>
          <h2 className="border-l-[6px] border-[#7dc242] pl-4 text-3xl font-semibold text-gray-700">
            The Latest
          </h2>
          <Latest />
          <h2 className="border-l-[6px] border-[#7dc242] pl-4 text-3xl font-semibold text-gray-700">
            Our Posts
          </h2>
        </div>
      </div>
    );
  },
});

const Latest = () => {
  // Use api call to set inital values in the future
  const latestInfo: LastestPostProps = {
    title: "November/December Recap",
    author: "Gurleen Dhillon",
    date: "Oct 5, 2023",
    readTime: "15 min",
    content:
      "Greetings, everyone! This is the initial blog content. Click edit to modify.",
  };

  type ACTIONS =
    | { type: "SET_TITLE"; payload: string }
    | { type: "SET_AUTHOR"; payload: string }
    | { type: "SET_DATE"; payload: string }
    | { type: "SET_READTIME"; payload: string }
    | { type: "SET_CONTENT"; payload: string }
    | { type: "RESET" };

  const Reducer = (state: LastestPostProps, action: ACTIONS) => {
    switch (action.type) {
      case "SET_TITLE":
        return { ...state, title: action.payload };
      case "SET_AUTHOR":
        return { ...state, author: action.payload };
      case "SET_DATE":
        return { ...state, date: action.payload };
      case "SET_READTIME":
        return { ...state, readTime: action.payload };
      case "SET_CONTENT":
        return { ...state, content: action.payload };
      case "RESET":
        return latestInfo;
    }
  };

  const [latestPost, dispatch] = useReducer(Reducer, latestInfo);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const cleanContent = DOMPurify.sanitize(latestPost.content);
    dispatch({type: 'SET_CONTENT', payload: cleanContent});
    setIsEditing(false);
  };

  const handleChange = (content: string) => {
    dispatch({type: 'SET_CONTENT', payload: content});
  };

  return (
    <div className="min-w-[750px] flex aspect-[7/3] max-w-5xl flex-row content-between gap-4 overflow-hidden rounded-3xl bg-white p-8 shadow-md">
      <div className="flex flex-1 items-center px-4">
        <div className="flex h-[80%] w-[90%] flex-col">
          <h1 className="mb-4 text-2xl text-blue-600">
            {latestPost.title}
          </h1>
          <hr className="border-gray-400" />
          <div className="mb-4 flex gap-2">
            <p className="font-medium">Gurleen Dhillon</p>
            <p className="ml-auto text-base font-normal">
              {latestPost.readTime} read • {latestPost.date}
            </p>
          </div>
          <div className="prose lg:prose-xl">
            {!isEditing ? (
              <div dangerouslySetInnerHTML={{ __html: latestPost.content }} />
            ) : (
              <ReactQuill value={latestPost.content} onChange={handleChange} />
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
  );
};
