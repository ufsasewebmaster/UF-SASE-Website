import { Link } from "@tanstack/react-router";
import DOMPurify from "dompurify";
import React, { useReducer, useState } from "react";
import ReactQuill from "react-quill";
import { Button } from "../components/ui/button";

export interface BlogProps {
  id: number;
  title: string;
  author: string;
  date: string;
  readTime: string;
  content: string;
}

export const BlogCard = ({ src }: { src: BlogProps }) => {
  return (
    <Link
      to={`/blog/${src.id}`}
      className="aspect-[3] min-w-[500px] max-w-lg overflow-visible rounded-3xl bg-[#7dc242]"
    >
      <div className="flex h-full w-full transform gap-0.5 rounded-3xl border border-black bg-white transition-transform hover:-translate-x-3 hover:-translate-y-3 hover:shadow-xl">
        <div className="m-4 flex aspect-square items-center justify-center rounded-3xl bg-gray-200">
          <p className="text-wrap text-center font-bold text-gray-500">
            PLACEHOLDER IMG
          </p>
        </div>
        <div className="mt-6 flex flex-1 flex-col">
          <h1 className="text-xl font-bold">{src.title}</h1>
          <p className="italic">
            {src.author} - {src.readTime} - {src.date}
          </p>
          <p className="mb-6 mt-auto">{src.content}</p>
        </div>
      </div>
    </Link>
  );
};

export const LatestCard = ({ src }: { src: BlogProps }) => {
  // Use api call to set inital values in the future

  type ACTIONS =
    | { type: "SET_TITLE"; payload: string }
    | { type: "SET_AUTHOR"; payload: string }
    | { type: "SET_DATE"; payload: string }
    | { type: "SET_READTIME"; payload: string }
    | { type: "SET_CONTENT"; payload: string }
    | { type: "RESET" };

  const Reducer = (state: BlogProps, action: ACTIONS) => {
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
        return src;
    }
  };

  const [latestPost, dispatch] = useReducer(Reducer, src);

  // May remove or revise functionality edit button if not needed
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const cleanContent = DOMPurify.sanitize(latestPost.content);
    dispatch({ type: "SET_CONTENT", payload: cleanContent });
    setIsEditing(false);
  };

  const handleChange = (content: string) => {
    dispatch({ type: "SET_CONTENT", payload: content });
  };

  return (
    <div className="flex aspect-[7/3] min-w-[750px] max-w-5xl flex-row content-between gap-4 overflow-hidden rounded-3xl bg-white p-8 shadow-md">
      <div className="flex flex-1 items-center px-4">
        <div className="flex h-[80%] w-[90%] flex-col">
          <h1 className="mb-4 text-2xl text-blue-600">{latestPost.title}</h1>
          <hr className="border-gray-400" />
          <div className="mb-4 flex gap-2">
            <p className="font-medium">{latestPost.author}</p>
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
