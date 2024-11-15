import saseLogo from "@/client/assets/SASELogo.png";
import FeaturedEvent from "@/client/components/FeaturedEvent";
import EventsCalendar from "@components/EventsCalendar";
import { createFileRoute } from "@tanstack/react-router";
import { seo } from "../utils/seo";

export const Route = createFileRoute("/events")({
  meta: () => [
    ...seo({
      title: "Events | UF SASE",
      description: "UF Society of Asian Scientists & Engineers",
      image: saseLogo,
    }),
  ],
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
          <FeaturedEvent />
        </div>
      </div>
    );
  },
});
