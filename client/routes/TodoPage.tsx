// src/routes/TodosPage.tsx
import { TodoList } from '@client/components/TodoList'
import { TodoForm } from '@client/components/TodoForm'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/TodoPage')({
  component: () => {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Todo List</h1>
        <TodoForm />
        <TodoList />
      </div>
    )
  },
})
