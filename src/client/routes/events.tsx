// client/routes/events.tsx
import EventsCalendar from "@components/EventsCalendar";
import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import exampleSlide from "src/client/assets/events/ExampleSlideShow.png"; // Adjust the path as needed
import ImageButton from "../components/events/ImageButton";

export const Route = createFileRoute("/events")({
  component: () => {
    return (
      <div>
        <div className="py-5"></div> {/* spacer element */}
        <div className="flex-5 justify-center pb-5 text-center font-mono text-7xl">
          EVENTS & SLIDES
        </div>
        <div className="flex w-full justify-center">
          <hr className="h-5 w-10/12 border-t-4 border-saseBlue" />
        </div>
        <div className="flex items-center justify-center">
          <EventsCalendar />
        </div>
        <div className="grid grid-cols-3 justify-center gap-4">
          <ImageButton
            slideUrl="https://docs.google.com/presentation/d/e/2PACX-1vRZwx9OSENEgIJfkpJ4M_1ttXGPrBcP6UTxpgGGGi7J4CYEGaDZY2kKaUdJLRhwq7o9hSHf9vU9LX5s/embed?start=false&loop=false&delayms=3000"
            imageUrl={exampleSlide}
            description="Alumni Event: Navigating the Workplace as a Young Asian American Professional"
          />
          <ImageButton
            slideUrl="https://docs.google.com/presentation/d/e/2PACX-1vRZwx9OSENEgIJfkpJ4M_1ttXGPrBcP6UTxpgGGGi7J4CYEGaDZY2kKaUdJLRhwq7o9hSHf9vU9LX5s/embed?start=false&loop=false&delayms=3000"
            imageUrl={exampleSlide}
            description="Alumni Event: Navigating the Workplace as a Young Asian American Professional"
          />
          <ImageButton
            slideUrl="https://docs.google.com/presentation/d/e/2PACX-1vRZwx9OSENEgIJfkpJ4M_1ttXGPrBcP6UTxpgGGGi7J4CYEGaDZY2kKaUdJLRhwq7o9hSHf9vU9LX5s/embed?start=false&loop=false&delayms=3000"
            imageUrl={exampleSlide}
            description="Alumni Event: Navigating the Workplace as a Young Asian American Professional"
          />
          <ImageButton
            slideUrl="https://docs.google.com/presentation/d/e/2PACX-1vRZwx9OSENEgIJfkpJ4M_1ttXGPrBcP6UTxpgGGGi7J4CYEGaDZY2kKaUdJLRhwq7o9hSHf9vU9LX5s/embed?start=false&loop=false&delayms=3000"
            imageUrl={exampleSlide}
            description="Alumni Event: Navigating the Workplace as a Young Asian American Professional"
          />
          <ImageButton
            slideUrl="https://docs.google.com/presentation/d/e/2PACX-1vRZwx9OSENEgIJfkpJ4M_1ttXGPrBcP6UTxpgGGGi7J4CYEGaDZY2kKaUdJLRhwq7o9hSHf9vU9LX5s/embed?start=false&loop=false&delayms=3000"
            imageUrl={exampleSlide}
            description="Alumni Event: Navigating the Workplace as a Young Asian American Professional"
          />
          <ImageButton
            slideUrl="https://docs.google.com/presentation/d/e/2PACX-1vRZwx9OSENEgIJfkpJ4M_1ttXGPrBcP6UTxpgGGGi7J4CYEGaDZY2kKaUdJLRhwq7o9hSHf9vU9LX5s/embed?start=false&loop=false&delayms=3000"
            imageUrl={exampleSlide}
            description="Alumni Event: Navigating the Workplace as a Young Asian American Professional"
          />
        </div>
      </div>
    );
  },
});
