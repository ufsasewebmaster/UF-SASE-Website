import EventsCalendar from "@components/EventsCalendar";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/events")({
  component: () => {
    return (
      <>
        <EventsCalendar />
      </>
    );
  },
});
