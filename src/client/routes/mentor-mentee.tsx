import { imageUrls } from "@assets/imageUrls";
import FAQ from "@components/programs/FAQCard";
import { faqData as mentorFaqData } from "@components/programs/faqMentorMentee"; // assumed analogous to faqInterns
import InfoCard from "@components/programs/InfoCard";
import MentorMenteeGraph from "@components/programs/MentorMenteeGraph";
import { ClientOnly } from "@shared/utils";
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
        <ClientOnly>
          <MentorMenteeGraph />
        </ClientOnly>
        {/* Header Section */}
        <div className="flex w-full max-w-7xl flex-col items-start px-4 py-8 sm:flex-row">
          <header className="mr-8 mt-10 flex items-center px-5">
            <div className="mr-5 h-40 w-1.5 bg-saseGreen"></div>
            <h2 className="font-oswald text-7xl font-semibold leading-tight text-foreground">
              SASE
              <br />
              MENTOR MENTEE
            </h2>
          </header>
          <div className="w-1/2">
            <InfoCard
              text={
                <>
                  The SASE Mentor Mentee program aims to <strong>pair mentees with mentors </strong> who can help <strong>guide them</strong> through
                  life:
                  <strong> professionally, academically, and personally</strong>. This is a great way to get involved with SASE, or open up doors to
                  new opportunities and connections!
                </>
              }
            />
          </div>
        </div>

        <div className="w-relative mt-6 max-w-7xl px-4">
          <div className="w-relative h-relative flex flex-col items-center justify-center rounded-3xl bg-gradient-to-r from-blue-500 to-green-500 p-6 text-white sm:flex-row">
            {/* Left Section: Bullet List */}
            <div className="flex h-full flex-1 items-center justify-center">
              <ul className="space-y-8">
                {[
                  "Available both Fall and Spring Semesters",
                  "Anyone can apply to be a mentee regardless of grade or major!",
                  "Apply as soon as possible to ensure you are assigned a mentor!",
                ].map((text, index) => (
                  <li key={index} className="flex items-center">
                    <img src="src/client/assets/programs/StarBulletPoint.png" alt="bullet" className="mr-4 h-12 w-12" />
                    <span className="font-redhat text-[32px] font-bold leading-[35px] text-[#F5F5F5]">{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Section: MM Graphic */}
            <div className="flex flex-col items-center justify-center sm:mt-0">
              <img src="src/client/assets/programs/MMgraphic.png" alt="Mentor-Mentee Graphic" className="h-[553px] w-[557.6px] object-contain" />
            </div>
          </div>
        </div>

        <div className="w-full max-w-7xl px-4 py-8">
          <div className="flex flex-col-reverse gap-10 lg:flex-row">
            {/* LEFT: All the text content */}
            <div className="flex flex-1 flex-col">
              {/* Mentor Mentee Events Section */}
              <div className="pl-5">
                <header className="mb-6 flex items-center px-5 font-oswald">
                  <div className="mr-3 h-11 w-1.5 bg-saseGreen"></div>
                  <h2 className="text-4xl text-foreground">Mentor Mentee Events</h2>
                </header>
                <div className="mb-24">
                  <p className="w-[380px] text-left font-redhat text-[28px] leading-[40px]">
                    Join us for some fun and lighthearted events designed to{" "}
                    <strong>spark meaningful interactions between mentors and mentees!</strong> Participate in a variety of silly and competitive
                    challenges that encourage teamwork, laughter, and connection.
                  </p>
                </div>
              </div>

              {/* Featured Events Section */}
              {/* Featured Events Section */}
              <div>
                <header className="mb-6 flex items-center px-5 font-oswald">
                  <div className="mr-3 h-11 w-1.5 bg-saseGreen"></div>
                  <h2 className="text-4xl text-foreground">Featured Events</h2>
                </header>

                {/* Mentor & Mentee Cup Subheading */}
                <h3 className="mb-4 px-5 font-redhat text-[45px] font-semibold leading-[60px]">
                  <span className="text-[#0668B3]">Mentor</span> & <span className="text-[#7DC242]">Mentee</span> Cup
                </h3>
                <div className="mb-24">
                  <p className="w-[380px] px-5 text-left font-redhat text-[28px] leading-[40px]">
                    Earn points by completing activities together, and see how many challenges you can conquer with your mentor or mentee. It's all
                    about bonding, having fun, and maybe even winning some bragging rights!
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT: One tall vertical gradient box */}
            <div className="h-[1000px] w-[652px] rounded-3xl bg-gradient-to-r from-blue-500 to-green-500 shadow-lg lg:block" />
          </div>

          <header className="mb-6 flex max-w-7xl items-center px-5 font-oswald">
            <div className="mr-3 h-11 w-1.5 bg-saseGreen"></div>
            <h2 className="text-4xl text-foreground">Goals & Outcomes</h2>
          </header>
          <div className="relative mx-auto mb-24 flex max-w-7xl flex-wrap items-center justify-center gap-12 px-4">
            {/* Card 1 */}
            <div className="relative flex h-[375px] w-[375px] items-center justify-center rounded-full bg-[#0668B3] shadow-[0_25px_4px_rgba(125,194,66,0.5)]">
              <p className="absolute w-[300px] text-center font-redhat text-[32px] font-semibold leading-[42px] text-white">
                Build meaningful, genuine friendships with new people that go beyond academics!
              </p>
            </div>

            {/* Card 2 */}
            <div className="relative flex h-[375px] w-[375px] items-center justify-center rounded-full bg-[#7DC242] shadow-[0_25px_4px_rgba(6,104,79,0.5)]">
              <p className="absolute w-[300px] text-center font-redhat text-[32px] font-semibold leading-[42px] text-white">
                Bond, explore, and create unforgettable memories along the way!
              </p>
            </div>

            {/* Card 3 */}
            <div className="relative flex h-[375px] w-[375px] items-center justify-center rounded-full bg-[#0668B3] shadow-[0_25px_4px_rgba(125,194,66,0.5)]">
              <p className="absolute w-[300px] text-center font-redhat text-[32px] font-semibold leading-[42px] text-white">
                Surround yourself with a reliable support system of mentors and peers!
              </p>
            </div>
          </div>
          <div className="relative flex-row items-center justify-center gap-10 px-4 py-8 sm:flex">
            <p className="absolute w-[300px] text-center font-redhat text-[32px] font-semibold leading-[42px]"></p>
            <InfoCard
              text={
                <>
                  Apply to be <span className="text-[#7DC242]">MENTEE</span>
                </>
              }
            />
            <InfoCard
              text={
                <>
                  Apply to be <span className="text-[#0668B3]">MENTOR</span>
                </>
              }
            />
          </div>
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
