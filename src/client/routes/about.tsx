import AboutCard from "@about/AboutCard";
import ContactForm from "@about/ContactForm";
import HeaderSection from "@about/HeaderSection";
import HistorySection from "@about/HistorySection";
import MissionSection from "@about/MissionSection";
import Timeline from "@about/Timeline2";
import YoutubeSection from "@about/YoutubeSection";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: () => {
    return (
      <div className="mt-5 flex min-h-screen flex-col items-center justify-center bg-white font-[Poppins]">
        <div className="w-full max-w-7xl px-4 py-8">
          <HeaderSection />
          <div className="mb-20 flex justify-center">
            <AboutCard />
          </div>
          <section className="mb-12 flex justify-center">
            <YoutubeSection />
          </section>
          <MissionSection />
          <div className="mb-10 flex items-center">
            <div className="mr-3 h-12 w-1.5 rounded-sm bg-saseGreen"></div>
            <h2 className="text-3xl font-semibold text-gray-800">History</h2>
          </div>
          <section className="mb-6 flex justify-center">
            <div className="w-full max-w-5xl">
              <HistorySection />
            </div>
          </section>

          <section className="mb-24">
            <div className="mb-20 flex items-center">
              <div className="mr-3 h-12 w-1.5 rounded-sm bg-saseGreen"></div>{" "}
              <h2 className="text-3xl font-semibold text-gray-800">
                Timeline of Achievements
              </h2>
            </div>
            <Timeline />
          </section>
          <section className="mb-12">
            <div className="mb-4 flex items-center">
              <div className="mr-3 h-12 w-1.5 rounded-sm bg-saseGreen"></div>{" "}
              <h2 className="text-3xl font-semibold text-gray-800">
                Contact Us
              </h2>
            </div>
            <ContactForm />
          </section>
        </div>
      </div>
    );
  },
});
