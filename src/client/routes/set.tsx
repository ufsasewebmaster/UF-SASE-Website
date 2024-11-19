<<<<<<< HEAD
import IG from "@assets/programs/set/SETGroup.png";
import IS from "@assets/programs/set/SETRobot.png";
import Star from "@assets/programs/star.png";
import FAQ from "@components/programs/FAQCard";
import { faqData } from "@components/programs/faqSet";
import GoalCard from "@components/programs/GoalCard";
import InfoCard from "@components/programs/InfoCard";
import PastProjectsSection from "@components/programs/PastProjectsSection";
import TitleUnderline from "@components/programs/TitleUnderline";
=======
import saseLogo from "@/client/assets/SASELogo.png";
>>>>>>> 0788abd3fe8969bb68d9eb88460f6aa133a1126d
import { createFileRoute } from "@tanstack/react-router";
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
        {/* Header Section */}
        <div className="flex w-full max-w-7xl items-start px-4 py-8">
          <header className="mr-8 mt-10 flex items-center px-5">
            {/* Green Line and Text in Row */}
            <div className="mr-5 h-40 w-1.5 bg-saseGreen"></div>
            <h2 className="font-oswald text-7xl font-semibold leading-tight text-gray-800">
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
        <div className="relative mb-8 w-full max-w-7xl px-4 py-8">
          {/* Top Green Line */}
          <TitleUnderline position="top" offset="-1.5rem" thickness="0.5rem" />

          {/* Image with Star */}
          <div className="relative">
            <img
              src={IG}
              alt="SET Image"
              className="w-full rounded-lg object-cover"
              style={{ height: "600px" }}
            />
            {/* Star at the bottom left */}
            <img
              src={Star}
              alt="Star"
              className="absolute -bottom-6 -left-9 h-24 w-24"
            />
          </div>

          {/* Bottom Green Line */}
          <TitleUnderline
            position="bottom"
            offset="-0.5rem"
            thickness="0.5rem"
          />
        </div>

        {/* Past Projects Section */}
        <div className="w-full max-w-7xl px-4">
          <header className="mb-12 flex items-center">
            <div className="mr-3 h-11 w-1.5 bg-saseGreen"></div>
            <h2 className="text-4xl text-gray-800">Past Projects</h2>
          </header>
          <PastProjectsSection
            image={IS}
            description="Last year, SET successfully developed a campus cleaner robot designed to autonomously identify and pick up trash 🤖. This innovative project not only helped keep our campus clean but also provided valuable experience in robotics, programming, and teamwork."
          />
        </div>

        {/* Goals & Outcomes Section */}
        <div className="w-full max-w-7xl px-4">
          <header className="mb-12 flex items-center">
            <div className="mr-3 h-11 w-1.5 bg-saseGreen"></div>
            <h2 className="text-4xl text-gray-800">Goals & Outcomes</h2>
          </header>
          <div className="mb-24 flex flex-wrap justify-center gap-8">
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
        </div>

        {/* FAQs Section */}
        <div className="w-full max-w-7xl px-4">
          <header className="mb-12 flex items-center">
            <div className="mr-3 h-11 w-1.5 bg-saseGreen"></div>
            <h2 className="text-4xl text-gray-800">FAQs</h2>
          </header>
          <FAQ faqData={faqData} />
        </div>
      </div>
    );
  },
});
