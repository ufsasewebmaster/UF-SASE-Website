import { useTodos } from "../hooks/useTodos";

export const TodoList = () => {
  const { deleteTodo, todos, updateTodo } = useTodos();

  if (todos.isLoading) return <div>Loading...</div>;
  if (todos.error) return <div>Error loading todos</div>;

  return (
    <ul>
      {(
        todos.data as unknown as Array<{
          id: number;
          title?: string | undefined;
          completed?: boolean | undefined;
        }>
      ).map((todo) => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() =>
              updateTodo.mutate({ ...todo, completed: !todo.completed })
            }
          />
          {todo.title}
          <button onClick={() => deleteTodo.mutate(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};
