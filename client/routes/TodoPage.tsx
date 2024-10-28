// src/routes/TodosPage.tsx
import { TodoForm } from "@client/components/TodoForm";
import { TodoList } from "@client/components/TodoList";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/todopage")({
  component: () => {
    return (
      <div>
        <h1 className="mb-4 text-2xl font-bold">Todo List</h1>
        <TodoForm />
        <TodoList />
      </div>
    );
  },
});
