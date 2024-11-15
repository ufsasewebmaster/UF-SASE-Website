import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/interns")({
  component: () => {
    return (
      <>
        <div>This is where the content actually starts</div>
        <div className="icon-[mdi--instagram] h-40 w-40" />
      </>
    );
  },
});
