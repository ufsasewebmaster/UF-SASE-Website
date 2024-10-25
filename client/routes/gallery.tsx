import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/gallery')({
  component: () => (
    <div>
      <div>
        <div>Ignore</div>
      </div>
      <div>
        <div>Hello Gallery</div>
      </div>
    </div>
  ),
})
