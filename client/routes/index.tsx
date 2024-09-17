import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { zodFetch } from "@/shared";
import { todoSchema } from "@/shared/schema";
import type { InsertTodo, UpdateTodo } from "@/shared/schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";

export const Route = createFileRoute("/")({
  component: () => {
    const [newTodo, setNewTodo] = useState("");

    const queryClient = useQueryClient();

    const todos = useQuery({
      queryKey: ["todos"],
      queryFn: async () =>
        zodFetch(z.object({ todos: z.array(todoSchema) }), "/api/todos"),
    });

    const createTodo = useMutation({
      mutationKey: ["createTodo"],
      mutationFn: async (todo: InsertTodo) =>
        fetch("/api/todos", {
          method: "POST",
          body: JSON.stringify(todo),
        }),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["todos"],
        });
      },
    });

    const updateTodo = useMutation({
      mutationKey: ["updateTodo"],
      mutationFn: async (todo: UpdateTodo) =>
        fetch(`/api/todos/${todo.id}`, {
          method: "PATCH",
          body: JSON.stringify(todo),
        }),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["todos"],
        });
      },
    });

    const deleteTodo = useMutation({
      mutationKey: ["deleteTodo"],
      mutationFn: async (id: number) =>
        fetch(`/api/todos/${id}`, {
          method: "DELETE",
        }),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["todos"],
        });
      },
    });

    const handleComplete = (data: UpdateTodo) => {
      updateTodo.mutate(data);
    };

    const handleDelete = (id: number) => {
      deleteTodo.mutate(id);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      createTodo.mutate(
        { title: newTodo, completed: false },
        {
          onSuccess: () => {
            setNewTodo("");
          },
        },
      );
    };

    return (
      <div className="bg-background mx-auto max-w-md rounded-lg p-4 shadow-md">
        <h1 className="mb-4 text-2xl font-bold">Todo List</h1>
        <form onSubmit={handleSubmit} className="mb-4 flex items-center">
          <Input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo"
            className="border-muted focus:ring-primary mr-2 flex-1 rounded-md border p-2 focus:outline-none focus:ring-2"
          />
          <Button
            type="submit"
            className="bg-primary text-primary-foreground rounded-md px-4 py-2"
          >
            Add
          </Button>
        </form>
        {todos.isLoading ? (
          <div className="flex h-32 items-center justify-center">
            <div />
          </div>
        ) : todos.isError ? (
          <div className="text-center text-red-500">Error fetching todos</div>
        ) : (
          <div className="space-y-2">
            {todos.data?.todos?.map((todo) => (
              <div
                key={todo.id}
                className="bg-card flex items-center justify-between rounded-md p-2"
              >
                <div className="flex items-center">
                  <Checkbox
                    checked={todo.completed}
                    className="mr-2"
                    onCheckedChange={() =>
                      handleComplete({
                        id: todo.id,
                        completed: !todo.completed,
                      })
                    }
                  />
                  <span
                    className={`text-card-foreground ${todo.completed ? "text-muted-foreground line-through" : ""}`}
                  >
                    {todo.title}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(todo.id)}
                  className="text-muted-foreground hover:bg-muted/50"
                >
                  <Trash2Icon className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  },
});

function Trash2Icon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" x2="10" y1="11" y2="17" />
      <line x1="14" x2="14" y1="11" y2="17" />
    </svg>
  );
}
