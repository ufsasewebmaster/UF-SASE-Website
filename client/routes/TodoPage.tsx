// src/routes/TodosPage.tsx
import { TodoList } from "@client/components/TodoList";
import { TodoForm } from "@client/components/TodoForm";

const TodosPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <TodoForm />
      <TodoList />
    </div>
  );
};

export default TodosPage;
