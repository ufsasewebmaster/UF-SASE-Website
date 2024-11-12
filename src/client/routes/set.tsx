import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/set")({
  component: () => {
    return (
      <>
        <div>This is where the content actually starts</div>
      </>
    );
  },
});
