import { imageUrls } from "@assets/imageUrls";
import Carousel from "@components/carousel/Carousel";
import FAQ from "@components/programs/FAQCard";
import { faqData as mentorFaqData } from "@components/programs/faqMentorMentee"; // assumed analogous to faqInterns
import GoalCard from "@components/programs/GoalCard";
import InfoCard from "@components/programs/InfoCard";
import MentorMenteeGraph from "@components/programs/MentorMenteeGraph";
import { createFileRoute } from "@tanstack/react-router";
import { seo } from "../utils/seo";

export const Route = createFileRoute("/mentor-mentee")({
  meta: () => [
    ...seo({
      title: "Mentor-Mentee | UF SASE",
      description:
        "UF Society of Asian Scientists & Engineers Mentor-Mentee Program pairs experienced members with eager mentees for professional and personal growth.",
      image: imageUrls["SASELogo.png"],
    }),
  ],

  component: () => {
    return (
      <div className="mt-12 flex min-h-screen flex-col items-center bg-background">
        <MentorMenteeGraph />
        Header Section
        <div className="flex w-full max-w-7xl flex-col items-start px-4 py-8 sm:flex-row">
          <header className="mr-8 mt-10 flex items-center px-5">
            <div className="mr-5 h-40 w-1.5 bg-saseGreen"></div>
            <h2 className="font-oswald text-7xl font-semibold leading-tight text-foreground">
              Mentor
              <br />& Mentee
            </h2>
          </header>
          <InfoCard
            text={
              <>
                <strong>UF SASE Mentor–Mentee</strong> connects experienced SASE members with mentees looking to gain guidance, career insights, and
                personal growth. Develop key leadership and networking skills through one-on-one mentoring relationships.
              </>
            }
          />
        </div>
        <div className="w-full max-w-7xl px-4 py-8">
          <Carousel purpose="Images" prog="MentorMentee" />

          <header className="mb-6 flex max-w-7xl items-center px-5 font-oswald">
            <div className="mr-3 h-11 w-1.5 bg-saseGreen"></div>
            <h2 className="text-4xl text-foreground">Program Goals & Outcomes</h2>
          </header>
          <div className="mb-24 flex flex-col flex-nowrap items-center justify-center gap-10 md:flex-row lg:gap-36">
            <GoalCard text="Foster one-on-one mentoring relationships for career and personal growth." color="blue" />
            <GoalCard text="Enhance communication and leadership skills through regular mentoring sessions." color="green" />
            <GoalCard text="Expand your professional network and gain industry insights." color="blue" />
          </div>

          <header className="mb-6 flex max-w-7xl items-center px-5 font-oswald">
            <div className="mr-3 h-11 w-1.5 bg-saseGreen"></div>
            <h2 className="text-4xl text-foreground">Testimonials</h2>
          </header>
          <Carousel purpose="Testimonials" prog="MentorMentee" />

          <header className="flex max-w-7xl items-center px-5 font-oswald">
            <div className="mr-3 h-11 w-1.5 bg-saseGreen"></div>
            <h2 className="text-4xl text-foreground">FAQs</h2>
          </header>
          <FAQ faqData={mentorFaqData} />
        </div>
      </div>
    );
  },
});
