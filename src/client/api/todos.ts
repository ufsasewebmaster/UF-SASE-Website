import {
  todoSchema,
  type InsertTodo,
  type UpdateTodo,
} from "@/shared/todoSchema";

export const fetchTodos = async () => {
  const response = await fetch("/api/todos");
  const todo = todoSchema.parse(await response.json());
  return todo;
};

export const createTodo = async (todo: InsertTodo) => {
  const response = await fetch("/api/todos", {
    method: "POST",
    body: JSON.stringify(todo),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

export const updateTodo = async (todo: UpdateTodo) => {
  const response = await fetch(`/api/todos/${todo.id}`, {
    method: "PATCH",
    body: JSON.stringify(todo),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

export const deleteTodo = async (id: number) => {
  const response = await fetch(`/api/todos/${id}`, {
    method: "DELETE",
  });
  return response.json();
};
