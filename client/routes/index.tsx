import { queryOptions, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

const getTodosQuery = queryOptions({
  queryKey: ["todos"],
  queryFn: async () => {
    const response = await fetch("/api/todos");
    return response.json() as { todos: Array<{ id: string; title: string }> };
  },
});

export const Route = createFileRoute("/")({
  component: () => {
    const { data, isLoading } = useQuery(getTodosQuery);
    return (
      <div>
        <h1>Todos</h1>
        {isLoading && <div>Loading...</div>}
        {data?.todos.map((todo) => <div key={todo.id}>{todo.title}</div>)}
        {data?.todos.length === 0 && <div>No todos</div>}
      </div>
    );
  },
});
