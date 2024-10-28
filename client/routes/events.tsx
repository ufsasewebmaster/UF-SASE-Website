import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/events")({
  component: () => {
    return (
      <>
        <div>
          <h1>Events</h1>
        </div>
        <div>Events</div>
      </>
    );
  },
});
