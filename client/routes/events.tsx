import { createFileRoute } from "@tanstack/react-router";
import EventsCalendar from "@components/EventsCalendar";

export const Route = createFileRoute("/events")({
  component: () => {
    return (
      <>
        <EventsCalendar />
      </>
    );
  },
});
