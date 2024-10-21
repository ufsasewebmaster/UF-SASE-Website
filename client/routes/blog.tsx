import React, { useReducer, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { createFileRoute, Link } from "@tanstack/react-router";
import DOMPurify from "dompurify";
import { Button } from "../components/ui/button";
import "../blog.css";
import { SearchBar } from "../components/navigation/SearchBar";

interface BlogProps {
  id: number;
  title: string;
  author: string;
  date: string;
  readTime: string;
  content: string;
}

const sampleBlog: BlogProps = {
  id: 1,
  title: "October 2023 Recap",
  author: "Gurleen Dhillon",
  date: "Nov. 13, 2023",
  readTime: "15 min",
  content: "Learn about blah blah etc.",
}

export const Route = createFileRoute("/blog")({
  component: () => {
    return (
      <>
        <div className="flex min-h-screen justify-center bg-gray-100 py-8">
          <div className="flex w-[50vw] flex-col gap-6">
            <h1 className="ml-4 text-4xl font-bold">BLOGS</h1>
            <h2 className="ml-4 border-l-[6px] border-[#7dc242] pl-4 text-3xl font-semibold text-gray-700">
              The Latest
            </h2>
            <Latest />
            <div className="mt-6 flex">
              <div className="flex flex-col gap-8">
                <h2 className="ml-4 border-l-[6px] border-[#7dc242] pl-4 text-3xl font-semibold text-gray-700">
                  Our Posts
                </h2>
                <BlogCard src={sampleBlog}/>
                <BlogCard src={sampleBlog}/>
                <BlogCard src={sampleBlog}/>
                <BlogCard src={sampleBlog}/>
              </div>
              <SearchBar className="ml-auto" />
            </div>
          </div>
        </div>
      </>
    );
  },
});

// Individual blog posts page 
export const RoutePosts = createFileRoute("/blog/:id")({
  component: () => {
    return (
      <h1 className="text-2xl font-bold mb-4">Home</h1>
    );
  },
});    

const BlogCard = ({ src }: { src: BlogProps }) => {
  return (
    <Link
      to="/blog"
      className="aspect-[3] min-w-[500px] max-w-lg overflow-visible rounded-3xl bg-[#7dc242]"
    >
      <div className="h-full w-full flex gap-0.5 transform rounded-3xl border border-black bg-white transition-transform hover:-translate-x-3 hover:-translate-y-3 hover:shadow-xl">
        <div className="aspect-square flex m-4 items-center justify-center rounded-3xl bg-gray-200">
          <p className="font-bold text-gray-500 text-wrap text-center">PLACEHOLDER IMG</p>
        </div>
        <div className="flex flex-1 flex-col mt-6">
          <h1 className="font-bold text-xl">{src.title}</h1>
          <p className="italic">{src.author} - {src.readTime} - {src.date}</p>
          <p className="mt-auto mb-6">{src.content}</p>
        </div>
      </div>
    </Link>
  );
};

const Latest = () => {
  // Use api call to set inital values in the future
  const latestInfo: BlogProps = {
    id: 2,
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
        return latestInfo;
    }
  };

  const [latestPost, dispatch] = useReducer(Reducer, latestInfo);

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
<div className="flex flex-1 items-center justify-center rounded-3xl bg-gray-200">
        <p className="font-bold text-gray-500">PLACEHOLDER IMG</p>
      </div>
    </div>
  );
};
<div className="flex flex-1 items-center justify-center rounded-3xl bg-gray-200">
        <p className="font-bold text-gray-500">PLACEHOLDER IMG</p>
      </div>
    </div>
  );
};
<div className="flex flex-1 items-center justify-center rounded-3xl bg-gray-200">
        <p className="font-bold text-gray-500">PLACEHOLDER IMG</p>
      </div>
    </div>
  );
};
<div className="flex flex-1 items-center justify-center rounded-3xl bg-gray-200">
        <p className="font-bold text-gray-500">PLACEHOLDER IMG</p>
      </div>
    </div>
  );
};
<div className="flex flex-1 items-center justify-center rounded-3xl bg-gray-200">
        <p className="font-bold text-gray-500">PLACEHOLDER IMG</p>
      </div>
    </div>
  );
};
<div className="flex flex-1 items-center justify-center rounded-3xl bg-gray-200">
        <p className="font-bold text-gray-500">PLACEHOLDER IMG</p>
      </div>
    </div>
  );
};
<div className="flex flex-1 items-center justify-center rounded-3xl bg-gray-200">
        <p className="font-bold text-gray-500">PLACEHOLDER IMG</p>
      </div>
    </div>
  );
};
<div className="flex flex-1 items-center justify-center rounded-3xl bg-gray-200">
        <p className="font-bold text-gray-500">PLACEHOLDER IMG</p>
      </div>
    </div>
  );
};
