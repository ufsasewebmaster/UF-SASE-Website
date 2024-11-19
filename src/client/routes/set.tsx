import IG from "@assets/logoSaseWhite.png";
import IS from "@assets/programs/star.png";
import saseLogo from "@assets/SASELogo.png";
import FAQ from "@components/programs/FAQCard";
import GoalCard from "@components/programs/GoalCard";
import InfoCard from "@components/programs/InfoCard";
import TestimonialCard from "@components/programs/TestimonialCard";
import { createFileRoute } from "@tanstack/react-router";
import { faqData } from "../components/programs/faqInterns";
import { seo } from "../utils/seo";

export const Route = createFileRoute("/set")({
  meta: () => [
    ...seo({
      title: "SET | UF SASE",
      description: "UF Society of Asian Scientists & Engineers",
      image: saseLogo,
    }),
  ],
  component: () => {
    return (
      <div className="mt-12 flex min-h-screen flex-col items-center bg-white font-[Poppins]">
        <div className="flex w-full max-w-7xl items-start px-4 py-8">
          <header className="mr-8 mt-10 flex items-center px-5">
            {/* Green Line and Text in Row */}
            <div className="mr-5 h-40 w-1.5 bg-saseGreen"></div>
            <h2 className="text-7xl font-semibold leading-tight text-gray-800">
              SASE
              <br />
              ENGINEERING
              <br />
              TEAM
            </h2>
          </header>
          <InfoCard
            text={
              <>
                <strong>SASE Engineering Team (SET)</strong> collaborates with
                other members to execute projects for the SASE community, honing
                your technical, communication, and leadership skills. Throughout
                the process, members will gain{" "}
                <strong>experience to add to your resume</strong> and talk about
                during job interviews. SET members will also obtain{" "}
                <strong>behind-the-scenes insights</strong> through project
                development and teamwork—valuable for future leadership roles in
                and out of SASE.
              </>
            }
          />
        </div>
        {/* Image Section */}
        <div className="w-full max-w-7xl px-4 py-8">
          <div className="mx-auto mb-24 w-full max-w-7xl px-4">
            <img
              src={IG}
              alt="SET Image"
              className="w-full rounded-3xl border-4 border-saseGreen"
              style={{ height: "600px", objectFit: "cover" }}
            />
          </div>
          <header className="mb-6 flex max-w-7xl items-center px-5">
            <div className="mr-3 h-11 w-1.5 bg-saseGreen"></div>
            <h2 className="text-4xl text-gray-800">Past Projects</h2>
          </header>
          <TestimonialCard
            image={IS}
            text="Last year, SET successfully developed a campus cleaner robot designed to autonomously identify and pick up trash 🤖. This innovative project not only helped keep our campus clean but also provided valuable experience in robotics, programming, and teamwork."
            name="SET Member"
            title="2024 Project"
          />
          <header className="mb-12 flex max-w-7xl items-center px-5">
            <div className="mr-3 h-11 w-1.5 bg-saseGreen"></div>
            <h2 className="text-4xl text-gray-800">Goals & Outcomes</h2>
          </header>
          <div className="mb-24 flex flex-nowrap justify-center gap-36">
            <GoalCard
              text="Get more involved in SASE, especially for first and second years."
              color="blue"
            />
            <GoalCard
              text="Develop essential technical skills and experiences to add to your resume."
              color="green"
            />
            <GoalCard
              text="Connect with other SASErs and develop leadership skills through hands-on projects."
              color="blue"
            />
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
