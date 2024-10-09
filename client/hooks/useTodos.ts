import type { InsertTodo, UpdateTodo } from "@/shared/todoSchema"; // Importing types
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTodo, deleteTodo, fetchTodos, updateTodo } from "../api/todos";

export const useTodos = () => {
  const queryClient = useQueryClient();

  // Fetch todos query
  const todosQuery = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  // Mutation for creating a new todo
  const createTodoMutation = useMutation({
    mutationFn: (newTodo: InsertTodo) => {
      return createTodo(newTodo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  // Mutation for updating an existing todo
  const updateTodoMutation = useMutation({
    mutationFn: (updatedTodo: UpdateTodo) => {
      return updateTodo(updatedTodo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  // Mutation for deleting a todo
  const deleteTodoMutation = useMutation({
    mutationFn: (id: number) => deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return {
    todos: todosQuery,
    createTodo: createTodoMutation,
    updateTodo: updateTodoMutation,
    deleteTodo: deleteTodoMutation,
  };
};
