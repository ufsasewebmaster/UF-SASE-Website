import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/authed')({
  component: () => <div>Hello /_authed/authed!</div>,
})
