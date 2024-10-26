import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/interns")({
  component: () => {
    return (
      <>
        <div>Ignore</div>
        <div>This is where the content actually starts</div>
      </>
    );
  },
});
