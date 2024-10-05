import UsersPage from '@client/routes/UsersPage' // Adjust the path if necessary
import { createFileRoute } from '@tanstack/react-router'

// TODO: Having two index.tsx files is confusing
export const Route = createFileRoute('/')({
  component: () => {
    return (
      <div>
        {/* Other components or routes can be placed here */}
        <h1>Welcome to the App</h1>
      </div>
    )
  },
})

export const UsersRoute = createFileRoute('/')({
  component: () => {
    return <UsersPage />
  },
})
