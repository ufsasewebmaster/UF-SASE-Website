import { createFileRoute } from "@tanstack/react-router";
import Slideshow from "../components/ui/slideshow";

export const Route = createFileRoute("/events")({
  component: () => {
    return (
      <>
        <div>
          <h1>Events</h1>
        </div>
        <div>Events</div>
        <Slideshow />
      </>
    );
  },
});
