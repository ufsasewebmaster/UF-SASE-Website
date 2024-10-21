import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/Profile')({
  component: () => <div>Hello /Profile!</div>,
})
