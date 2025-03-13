import { cn } from "@/shared/utils";
import AboutCard from "@about/AboutCard";
import ContactForm from "@about/ContactForm";
import HeaderSection from "@about/HeaderSection";
import HistorySection from "@about/HistorySection";
import MissionSection from "@about/MissionSection";
import Timeline from "@about/Timeline";
import YoutubeSection from "@about/YoutubeSection";
import { imageUrls } from "@assets/imageUrls";
import { createFileRoute, Link } from "@tanstack/react-router";
import { seo } from "../utils/seo";

export const Route = createFileRoute("/about")({
  meta: () => [
    ...seo({
      title: "About | UF SASE",
      description: "UF Society of Asian Scientists & Engineers",
      image: imageUrls["SASELogo.png"],
    }),
  ],
  component: () => {
    return (
      <div className="mt-5 flex min-h-screen flex-col items-center justify-center overflow-x-hidden bg-background font-redhat">
        <div className="w-full max-w-7xl px-4 py-8">
          <HeaderSection />

          <div className="mb-14 flex justify-center">
            <AboutCard />
          </div>

          <div className="mt-[-10px] flex w-full max-w-7xl justify-center sm:mt-2">
            <div className="flex space-x-4 sm:space-x-6">
              <Link
                to="/board"
                className="border-text flex h-9 w-28 items-center justify-center whitespace-nowrap rounded-full border bg-saseBlue px-6 py-2 text-xs italic tracking-wide text-white transition duration-300 hover:scale-105 sm:h-10 sm:w-32 sm:px-7 sm:text-sm"
              >
                Meet Our Board!
              </Link>
              <Link
                to="/sponsors"
                className="border-text flex h-9 w-28 items-center justify-center whitespace-nowrap rounded-full border bg-saseBlue px-6 py-2 text-[11px] italic tracking-wide text-white transition duration-300 hover:scale-105 sm:h-10 sm:w-32 sm:px-7 sm:text-[13px]"
              >
                View Our Sponsors
              </Link>
            </div>
          </div>

          <section className={cn("mb-12 mt-20 flex justify-center")}>
            <YoutubeSection />
          </section>
          <MissionSection />
          <div className={cn("mb-10 flex items-center")}>
            <div className={cn("mr-3 h-12 w-1.5 rounded-sm bg-saseGreen")}></div>
            <h2 className={cn("font-oswald text-3xl font-semibold text-muted-foreground")}>History</h2>
          </div>
          <section className={cn("mb-6 flex justify-center")}>
            <div className={cn("w-full max-w-5xl")}>
              <HistorySection />
            </div>
          </section>

          <section className={cn("mb-20")}>
            <div className={cn("mb-8 flex items-center")}>
              <div className={cn("mr-3 h-12 w-1.5 rounded-sm bg-saseGreen")}></div>{" "}
              <h2 className={cn("font-oswald text-3xl font-semibold text-muted-foreground")}>Timeline of Achievements</h2>
            </div>
            <Timeline />
          </section>
          <section id="contact" className={cn("mb-12")}>
            <div className={cn("mb-4 flex items-center")}>
              <div className={cn("mr-3 h-12 w-1.5 rounded-sm bg-saseGreen")}></div>{" "}
              <h2 className={cn("font-oswald text-3xl font-semibold text-muted-foreground")}>Contact Us</h2>
            </div>
            <ContactForm />
          </section>
        </div>
      </div>
    );
  },
});
