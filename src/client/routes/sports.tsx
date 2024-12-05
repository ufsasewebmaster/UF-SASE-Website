import FAQ from "@components/programs/FAQCard";
import GoalCard from "@components/programs/GoalCard";
import InfoCard from "@components/programs/InfoCard";
import TestimonialCard from "@components/programs/TestimonialCard";
import { createFileRoute } from "@tanstack/react-router";
import { imageUrls } from "../assets/imageUrls";
import { faqData } from "../components/programs/faqSports";
import { seo } from "../utils/seo";

export const Route = createFileRoute("/sports")({
  meta: () => [
    ...seo({
      title: "Sports | UF SASE",
      description: "UF Society of Asian Scientists & Engineers",
      image: imageUrls["SASELogo.png"],
    }),
  ],

  component: () => {
    return (
      <div className="mt-12 flex min-h-screen flex-col items-center bg-white font-[Poppins]">
        <div className="flex w-full max-w-7xl flex-col items-start px-4 py-8 sm:flex-row">
          <header className="mr-8 mt-10 flex items-center px-5">
            {/* Green Line and Text in Row */}
            <div className="mr-5 h-40 w-1.5 bg-saseGreen"></div>
            <h2 className="text-7xl font-semibold leading-tight text-gray-800">
              SASE
              <br />
              SPORTS
            </h2>
          </header>
          <InfoCard
            text={
              <>
                <strong>SASE Intramurals</strong> include <strong>6v6 Indoor Volleyball, Indoor Soccer, Ultimate Frisbee, Doubles Pickleball </strong>{" "}
                and more, available in Fall, Spring, and Summer semesters! SASE Sports provides a fantastic opportunity to meet new people, and the
                best part is, no prior experience is required to play. Make sure to sign up for an amazing experience!
              </>
            }
          />
        </div>
        {/* Placeholder Image */}
        <div className="w-full max-w-7xl px-4 py-8">
          <div className="mx-auto mb-24 w-full max-w-7xl px-4">
            <img
              src={imageUrls["SaseSports.png"]}
              alt="SaseSports"
              className="w-full rounded-3xl border-4 border-saseGreen"
              style={{ height: "600px", objectFit: "cover" }}
            />
          </div>
          <header className="mb-6 flex max-w-7xl items-center px-5">
            <div className="mr-3 h-11 w-1.5 bg-saseGreen"></div>
            <h2 className="text-4xl text-gray-800">Testimonials</h2>
          </header>
          <TestimonialCard
            image={imageUrls["Board.png"]}
            text="SASE Sports was an incredible experience. I learned a lot about organizational, leadership, and planning skills and gained a lot of insight from SASE Board members. This program has greatly helped my professional development."
            name="First Last"
            title="2024 SASE Sports Member"
          />
          <header className="mb-12 flex max-w-7xl items-center px-5">
            <div className="mr-3 h-11 w-1.5 bg-saseGreen"></div>
            <h2 className="text-4xl text-gray-800">Goals & Outcomes</h2>
          </header>
          <div className="mb-24 flex flex-col flex-nowrap items-center justify-center gap-10 md:flex-row lg:gap-36">
            <GoalCard text="Meet new people with common interests." color="blue" />
            <GoalCard text="Have fun and compete in a friendly yet competitive environment." color="green" />
            <GoalCard text="Develop your athletic ability in a variety of disciplines." color="blue" />
          </div>
          <header className="flex max-w-7xl items-center px-5">
            <div className="mr-3 h-11 w-1.5 bg-saseGreen"></div>
            <h2 className="text-4xl text-gray-800">FAQs</h2>
          </header>
          <FAQ faqData={faqData} />
        </div>
      </div>
    );
  },
});
