import "react-quill/dist/quill.snow.css";
import { createFileRoute } from "@tanstack/react-router";
import "../blog.css";
import type { BlogCardProps} from "../components/BlogCard";
import { BlogCard, LatestCard } from "../components/BlogCard";
import { SearchBar } from "../components/navigation/SearchBar";

// Use api call to set initial values in the future
const sampleBlog: BlogCardProps = {
  id: 1,
  title: "October 2023 Recap",
  author: "Gurleen Dhillon",
  date: "Nov. 13, 2023",
  readTime: "15 min",
  content: "Learn about blah blah etc.",
};

const latestInfo: BlogCardProps = {
  id: 2,
  title: "November/December Recap",
  author: "Gurleen Dhillon",
  date: "Oct 5, 2023",
  readTime: "15 min",
  content:
    "Greetings, everyone! This is the initial blog content. Click edit to modify.",
};

export const Route = createFileRoute("/blog")({
  component: () => {
    // API call for all blogs here

    return (
      <>
        <div className="flex min-h-screen justify-center bg-gray-100 py-8">
          <div className="flex w-[50vw] flex-col gap-6">
            <h1 className="ml-4 text-4xl font-bold">BLOGS</h1>
            <h2 className="ml-4 border-l-[6px] border-[#7dc242] pl-4 text-3xl font-semibold text-gray-700">
              The Latest
            </h2>
            <LatestCard src={latestInfo} />
            <div className="mt-6 flex">
              <div className="flex flex-col gap-8">
                <h2 className="ml-4 border-l-[6px] border-[#7dc242] pl-4 text-3xl font-semibold text-gray-700">
                  Our Posts
                </h2>

                {/* Implement useInfiniteQuery after connecting with db */}
                <BlogCard src={sampleBlog} />
                <BlogCard src={sampleBlog} />
                <BlogCard src={sampleBlog} />
                <BlogCard src={sampleBlog} />
                <BlogCard src={sampleBlog} />
              </div>
              <SearchBar className="ml-auto" />
            </div>
          </div>
        </div>
      </>
    );
  },
});

// // TODO: Add route by id
// export const BlogPostRoute = createFileRoute("/blog")({
//   component: () => {
//     return <h1 className="mb-4 text-2xl font-bold">Blog Post</h1>;
//   },
// });
