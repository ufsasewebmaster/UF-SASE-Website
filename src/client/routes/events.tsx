import EventsCalendar from "@components/EventsCalendar";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/events")({
  component: () => {
    return (
      <div>
        <div className="py-5"></div> {/* spacer element */}
        <div className="flex justify-center">
          <div className="flex-5 pb-5 text-center font-mono text-7xl">
            EVENTS & SLIDES
          </div>
        </div>
        <div className="flex w-full justify-center">
          <hr className="h-5 w-10/12 border-t-4 border-saseBlue" />
        </div>
        <div className="flex w-full justify-center">
          <EventsCalendar />
        </div>
      </div>
    );
  },
});
