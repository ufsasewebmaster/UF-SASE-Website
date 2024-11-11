import { zodFetch } from "@/shared";
import { blogAllSchema } from "@/shared/blogSchema";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/blogs")({
  component: () => {
    const blogs = useQuery({
      queryKey: ["blogs"],
      // queryFn: () =>
      // zodFetch(blogAllSchema, "https://localhost:3000/api/blog/all"),
      queryFn: async () => {
        console.log("SANITY");
        const res = await fetch("/api/blog/all");
        const json = await res.json();
        return json;
      },
    });

    return (
      <div>
        <p>hi</p>
        {JSON.stringify(blogs, null, 2)}
      </div>
    );
  },
});
