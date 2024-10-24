import { createFileRoute } from '@tanstack/react-router'
import About from '../components/About'

export const Route = createFileRoute('/About')({
  component: () => <div>Hello /About!</div>,
})
