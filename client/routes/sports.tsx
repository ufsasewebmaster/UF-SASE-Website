import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sports")({
  component: () => {
    return (
      <>
        <div>Ignore</div>
        <div>This is where the content actually starts</div>
      </>
    );
  },
});
