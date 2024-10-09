import { createFileRoute } from "@tanstack/react-router";

export const Route  = createFileRoute('/')({
  component: () => {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Home</h1>
      </div>
    )
  },
})