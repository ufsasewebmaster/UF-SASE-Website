import { relative } from "path";
import EventsCalendar from "@components/EventsCalendar";
import ImageButton from "@components/ImageButton";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/events")({
  component: () => {
    return (
      <>
        <div>
          <ImageButton />
        </div>
        <div>
          <EventsCalendar />
        </div>
      </>
    );
  },
});
