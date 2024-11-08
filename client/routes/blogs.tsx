import { zodFetch } from "@/shared";
import { blogAllSchema } from "@/shared/blogSchema";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/blogs")({
  component: () => {
    const blogs = useQuery({
      queryKey: ["blogs"],
      queryFn: () => zodFetch(blogAllSchema, "/api/blog/all"),
    });

    console.log(blogs.data);
    return <div>{JSON.stringify(blogs.data, null, 2)}</div>;
  },
});
