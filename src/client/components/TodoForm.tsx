import { useState } from "react";
import { useTodos } from "../hooks/useTodos";

export const TodoForm = () => {
  const [newTodo, setNewTodo] = useState("");
  const { createTodo } = useTodos();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTodo) return;
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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new todo"
      />
      <button type="submit">Add Todo</button>
    </form>
  );
};
