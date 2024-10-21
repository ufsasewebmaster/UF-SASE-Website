import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/About')({
  component: () => <div>Hello /About!</div>,
})
