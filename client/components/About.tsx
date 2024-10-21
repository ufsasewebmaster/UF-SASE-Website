import AboutTextSection from "./about/AboutTextSection";
import HeaderSection from "./about/HeaderSection";
import HistorySection from "./about/HistorySection";
import MissionSection from "./about/MissionSection";
import Timeline from "./about/Timeline";
import YoutubeSection from "./about/YoutubeSection";

const About = () => {
  return (
    <div className="mt-5 flex min-h-screen flex-col items-center justify-center bg-white font-[Poppins]">
      <div className="w-full max-w-7xl px-4 py-8">
        <HeaderSection />

        {/* General About Section */}
        <section className="mb-8 flex flex-col items-center gap-12 md:flex-row md:items-start">
          <YoutubeSection />
          <AboutTextSection />
        </section>

        <MissionSection />
        <HistorySection />

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-black">
            Timeline of Achievements
          </h2>
          <Timeline />
        </section>
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-black">Board</h2>
        </section>
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-black">Contact Us</h2>
        </section>
      </div>
    </div>
  );
};

export default About;
