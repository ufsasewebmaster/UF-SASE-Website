// src/routes/UsersPage.tsx
import { UserForm } from '@client/components/UserForm'
import { UserList } from '@client/components/UserList'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/UserPage')({
  component: () => {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">User Management</h1>
        <UserForm />
        <UserList />
      </div>
    )
  },
})
