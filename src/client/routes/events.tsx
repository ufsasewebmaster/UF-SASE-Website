import { imageUrls } from "@assets/imageUrls";
import EventsCalendar from "@components/EventsCalendar";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import EventsSlides from "../components/events/EventsSlidesDisplay";
import { applyOmbreDivider } from "../utils/ombre-divider";
import { seo } from "../utils/seo";

export const Route = createFileRoute("/events")({
  meta: () => [
    ...seo({
      title: "Events | UF SASE",
      description: "UF Society of Asian Scientists & Engineers",
      image: imageUrls["SASELogo.png"],
    }),
  ],
  component: () => {
    useEffect(() => {
      applyOmbreDivider();
    }, []);
    return (
      <div>
        <div className="py-5"></div>
        <div className="flex justify-center">
          <div className="flex-5 pb-5 text-center font-oswald text-7xl">EVENTS & SLIDES</div>
        </div>
        <div className="flex w-full justify-center">
          <hr className="h-5 w-10/12 border-t-4 border-saseBlue" />
        </div>
        <div className="flex-center">
          <EventsCalendar />
        </div>
        <div className="flex-center">
          <EventsSlides />
        </div>
      </div>
    );
  },
});
