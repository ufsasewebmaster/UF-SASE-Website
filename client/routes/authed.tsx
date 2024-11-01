import { createFileRoute } from '@tanstack/react-router'
import { useAuth } from '@client/AuthContext'

const { isAuthenticated } = useAuth()

export const Route = createFileRoute('/authed')({
  // Ethan plz look: How would this context work? Is it needed?
  // beforeLoad: async ({ context }) => {
  //   if (!context.auth) {
  //     throw new Error('Not authenticated')
  //   }
  // },
  beforeLoad: () => {
    if (!isAuthenticated) {
      throw new Error('Not authenticated')
    }
  },
  component: AuthedComponent,
})

function AuthedComponent() {
  // const { isAuthenticated } = useAuth()
  console.log(isAuthenticated);
  return (
    <div>
      <div>Helllllllo</div>
      {isAuthenticated ? (
        <div>Hellllllllo, you are indeed authenticated</div>
      ) : (
        <div>Sorry, you are not authenticated</div>
      )}
    </div>
  )
}
