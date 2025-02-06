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
      <div className="mt-5 flex min-h-screen flex-col items-center justify-center bg-white font-redhat">
        <div className="w-full max-w-7xl px-4 py-8">
          <HeaderSection />
          <div className="mb-14 flex justify-center">
            <AboutCard />
          </div>
          <div className="relative flex w-full max-w-7xl justify-center">
            <div className="absolute left-[50%] flex space-x-6">
              <Link
                to="/board"
                className="rounded-full border border-black bg-saseBlue px-8 py-1 text-center text-sm italic text-white transition duration-300 hover:scale-105"
              >
                Meet Our Board!
              </Link>
              <Link
                to="/sponsors"
                className="rounded-full border border-black bg-saseBlue px-8 py-1 text-center text-sm italic text-white transition duration-300 hover:scale-105"
              >
                View Our Sponsors
              </Link>
            </div>
          </div>
          <section className="mb-12 mt-20 flex justify-center">
            <YoutubeSection />
          </section>
          <MissionSection />
          <div className="mb-10 flex items-center">
            <div className="mr-3 h-12 w-1.5 rounded-sm bg-saseGreen"></div>
            <h2 className="font-oswald text-3xl font-semibold text-gray-800">History</h2>
          </div>
          <section className="mb-6 flex justify-center">
            <div className="w-full max-w-5xl">
              <HistorySection />
            </div>
          </section>

          <section className="mb-20">
            <div className="mb-8 flex items-center">
              <div className="mr-3 h-12 w-1.5 rounded-sm bg-saseGreen"></div>{" "}
              <h2 className="font-oswald text-3xl font-semibold text-gray-800">Timeline of Achievements</h2>
            </div>
            <Timeline />
          </section>
          <section id="contact" className="mb-12">
            <div className="mb-4 flex items-center">
              <div className="mr-3 h-12 w-1.5 rounded-sm bg-saseGreen"></div>{" "}
              <h2 className="font-oswald text-3xl font-semibold text-gray-800">Contact Us</h2>
            </div>
            <ContactForm />
          </section>
        </div>
      </div>
    );
  },
});
