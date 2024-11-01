import { createFileRoute } from "@tanstack/react-router";
import EventsCalendar from "../components/events/EventsCalendar";

export const Route = createFileRoute("/events")({
  component: () => {
    return (
      <>
        <div>
          <h1>Events</h1>
        </div>
        <div>Events</div>
        <EventsCalendar />
      </>
    );
  },
});
