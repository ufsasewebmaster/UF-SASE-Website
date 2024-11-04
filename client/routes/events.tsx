import { createFileRoute } from "@tanstack/react-router";
import EventsCalendar from "@client/components/EventsCalendar";

export const Route = createFileRoute("/events")({
  component: () => {
    return (
      <>
        <div>You shouldn't see this</div>
        <EventsCalendar />
      </>
    );
  },
});
