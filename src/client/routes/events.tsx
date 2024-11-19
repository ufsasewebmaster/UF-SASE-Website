import ExampleSlideShow from "@assets/events/ExampleSlideShow.png";
import saseLogo from "@assets/SASELogo.png";
import EventsCalendar from "@components/EventsCalendar";
import { createFileRoute } from "@tanstack/react-router";
import ImageButton from "../components/events/ImageButton";
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
        <div className="flex items-center justify-center">
          <EventsCalendar />
        </div>
        <div className="grid grid-cols-3 justify-center gap-4">
          <ImageButton
            slideUrl="https://docs.google.com/presentation/d/e/2PACX-1vRZwx9OSENEgIJfkpJ4M_1ttXGPrBcP6UTxpgGGGi7J4CYEGaDZY2kKaUdJLRhwq7o9hSHf9vU9LX5s/embed?start=false&loop=false&delayms=3000"
            imageUrl={ExampleSlideShow}
          />
          <ImageButton
            slideUrl="https://docs.google.com/presentation/d/e/2PACX-1vRZwx9OSENEgIJfkpJ4M_1ttXGPrBcP6UTxpgGGGi7J4CYEGaDZY2kKaUdJLRhwq7o9hSHf9vU9LX5s/embed?start=false&loop=false&delayms=3000"
            imageUrl={ExampleSlideShow}
          />
          <ImageButton
            slideUrl="https://docs.google.com/presentation/d/e/2PACX-1vRZwx9OSENEgIJfkpJ4M_1ttXGPrBcP6UTxpgGGGi7J4CYEGaDZY2kKaUdJLRhwq7o9hSHf9vU9LX5s/embed?start=false&loop=false&delayms=3000"
            imageUrl={ExampleSlideShow}
          />
          <ImageButton
            slideUrl="https://docs.google.com/presentation/d/e/2PACX-1vRZwx9OSENEgIJfkpJ4M_1ttXGPrBcP6UTxpgGGGi7J4CYEGaDZY2kKaUdJLRhwq7o9hSHf9vU9LX5s/embed?start=false&loop=false&delayms=3000"
            imageUrl={ExampleSlideShow}
          />
          <ImageButton
            slideUrl="https://docs.google.com/presentation/d/e/2PACX-1vRZwx9OSENEgIJfkpJ4M_1ttXGPrBcP6UTxpgGGGi7J4CYEGaDZY2kKaUdJLRhwq7o9hSHf9vU9LX5s/embed?start=false&loop=false&delayms=3000"
            imageUrl={ExampleSlideShow}
          />
          <ImageButton
            slideUrl="https://docs.google.com/presentation/d/e/2PACX-1vRZwx9OSENEgIJfkpJ4M_1ttXGPrBcP6UTxpgGGGi7J4CYEGaDZY2kKaUdJLRhwq7o9hSHf9vU9LX5s/embed?start=false&loop=false&delayms=3000"
            imageUrl={ExampleSlideShow}
          />
        </div>
      </div>
    );
  },
});
