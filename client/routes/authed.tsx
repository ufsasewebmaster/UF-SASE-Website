import { createFileRoute } from '@tanstack/react-router'
import { useAuth } from '@client/AuthContext'

export const Route = createFileRoute('/authed')({
  component: AuthedComponent,
})

function AuthedComponent() {
  const { isAuthenticated } = useAuth()
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
// import { createFileRoute } from '@tanstack/react-router'
// import { createServerFn, json } from '@tanstack/start'
// import { Auth } from '../components/Auth'
// import { hashPassword, prismaClient } from '~/utils/prisma'
// import { Login } from '~/components/Login'
// import { useAppSession } from '~/utils/session'

// export const loginFn = createServerFn(
//   'POST',
//   async (
//     payload: {
//       email: string
//       password: string
//     },
//     { request },
//   ) => {
//     // Find the user
//     const user = await prismaClient.user.findUnique({
//       where: {
//         email: payload.email,
//       },
//     })

//     // Check if the user exists
//     if (!user) {
//       return {
//         error: true,
//         userNotFound: true,
//         message: 'User not found',
//       }
//     }

//     // Check if the password is correct
//     const hashedPassword = await hashPassword(payload.password)

//     if (user.password !== hashedPassword) {
//       return {
//         error: true,
//         message: 'Incorrect password',
//       }
//     }

//     // Create a session
//     const session = await useAppSession()

//     // Store the user's email in the session
//     await session.update({
//       userEmail: user.email,
//     })
//   },
// )

// export const Route = createFileRoute('/authed')({
//   beforeLoad: ({ context }) => {
//     if (!context.user) {
//       throw new Error('Not authenticated')
//     }
//   },
//   errorComponent: ({ error }) => {
//     if (error.message === 'Not authenticated') {
//       return <Login />
//     }

//     throw error
//   },
// })
