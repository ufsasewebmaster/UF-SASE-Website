import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from '../api/todos';
import type { InsertTodo, UpdateTodo } from '@/shared/todoSchema'; // Importing types
import { todoInsertSchema, updateTodoSchema } from '@/shared/todoSchema'; // Importing Zod schemas for validation

export const useTodos = () => {
  const queryClient = useQueryClient();

  // Fetch todos query
  const todosQuery = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });

  // Mutation for creating a new todo
  const createTodoMutation = useMutation({
    mutationFn: async (newTodo: InsertTodo) => {
      // Validate using Zod schema
      todoInsertSchema.parse(newTodo);
      return createTodo(newTodo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  // Mutation for updating an existing todo
  const updateTodoMutation = useMutation({
    mutationFn: async (updatedTodo: UpdateTodo) => {
      // Validate using Zod schema
      updateTodoSchema.parse(updatedTodo);
      return updateTodo(updatedTodo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  // Mutation for deleting a todo
  const deleteTodoMutation = useMutation({
    mutationFn: (id: number) => deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  return {
    todos: todosQuery,
    createTodo: createTodoMutation,
    updateTodo: updateTodoMutation,
    deleteTodo: deleteTodoMutation,
  };
};
