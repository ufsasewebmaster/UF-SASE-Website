import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/webdev")({
  component: () => {
    return (
      <>
        <div>This is where the content actually starts</div>
      </>
    );
  },
});