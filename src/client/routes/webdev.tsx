import Carousel from "@/client/components/carousel/Carousel";
import BackendLead from "@assets/webdev/BackendLead.jpeg";
import FrontEndLead from "@assets/webdev/FrontendLead.png";
import FullStackLead from "@assets/webdev/FullStackLead2.jpg";
import UIUXLead from "@assets/webdev/UIUXLead.jpg";
import WebmasterChair from "@assets/webdev/WebmasterChair.jpeg";
import MemberCard from "@components/home/MemberCard";
import MobileMemberCard from "@components/mobile/MobileMemberCard";
import FAQ from "@components/programs/FAQCard";
import { faqData } from "@components/programs/faqWebdev";
import GoalCard from "@components/programs/GoalCard";
import InfoCard from "@components/programs/InfoCard";
import { useIsMobile } from "@hooks/useIsMobile";
import { createFileRoute } from "@tanstack/react-router";
import { imageUrls } from "../assets/imageUrls";
import { seo } from "../utils/seo";

export const Route = createFileRoute("/webdev")({
  meta: () => [
    ...seo({
      title: "Web Dev | UF SASE",
      description: "UF SASE Web Development team consists of UI/UX, Frontend, and Backend teams creating the SASE website, using agile practices.",
      image: imageUrls["SASELogo.png"],
    }),
  ],

  component: () => {
    const isMobile = useIsMobile();

    return (
      <div className="mt-12 flex min-h-screen flex-col items-center bg-background">
        <div className="flex w-full max-w-7xl flex-col items-start px-4 py-8 sm:flex-row">
          <header className="mr-8 mt-10 flex items-center px-5">
            {/* Green Line and Text in Row */}
            <div className="mr-5 h-40 w-1.5 bg-saseGreen"></div>
            <h2 className="font-oswald text-7xl font-semibold leading-tight text-foreground">
              WEB
              <br />
              TEAM
            </h2>
          </header>
          <InfoCard
            text={
              <>
                The SASE Web Team consists of <strong>UI/UX, Frontend</strong>, and <strong>Backend</strong> teams working together to create the UF
                SASE website. Are you looking to expand your skill set and gain experience with <strong>agile practices</strong> commonly used in the
                industry? Do you want to apply your technical experience for the good of all SASE? If so, this is a great opportunity! We're seeking
                committed members to bring our ideas to life and publish an improved, self-hosted version of our website. We encourage people of all
                skill levels to apply!
              </>
            }
          />
        </div>
        <div className="w-full max-w-7xl px-4 py-8">
          <Carousel purpose="Images" prog="Web Dev" />
          <header className="mb-6 flex max-w-7xl items-center px-5">
            <div className="mr-3 h-11 w-1.5 bg-saseGreen"></div>
            <h2 className="font-oswald text-4xl text-foreground">Leadership</h2>
          </header>
          {isMobile ? (
            <>
              <MobileMemberCard
                image={WebmasterChair}
                name="Ricky Zhang"
                role="Webmaster"
                textColor="blue"
                quote="SASE deserves a better website"
                imageSide="left"
              />
              <div className="h-1 w-5/6 bg-gradient-to-r from-saseGreen to-saseBlue" />
              <MobileMemberCard
                image={FullStackLead}
                name="Arman Kumaraswamy"
                role="Full-Stack"
                textColor="green"
                quote="[object Object]"
                imageSide="right"
              />
              <div className="h-1 w-5/6 bg-gradient-to-l from-saseBlue to-saseGreen" />
              <MobileMemberCard
                image={FrontEndLead}
                name="Joseph Kim"
                role="Frontend"
                textColor="blue"
                quote="still don't how to center a div"
                imageSide="left"
              />
              <div className="h-1 w-5/6 bg-gradient-to-l from-saseGreen to-saseBlue" />
              <MobileMemberCard
                image={BackendLead}
                name="Sihala Senevirathne"
                role="Backend"
                textColor="green"
                quote="Ricky, please pay me"
                imageSide="right"
              />
              <div className="h-1 w-5/6 bg-gradient-to-l from-saseBlue to-saseGreen" />
              <MobileMemberCard image={UIUXLead} name="Catherine Wu" role="UI/UX" textColor="blue" quote="sigma Figma team" imageSide="left" />
            </>
          ) : (
            <div className="grid grid-cols-1 gap-1 bg-background p-12 md:grid-cols-2 lg:grid-cols-5">
              <MemberCard image={FullStackLead} name="Arman Kumaraswamy" role="Full-Stack" textColor="blue" quote="[object Object]" />
              <MemberCard image={FrontEndLead} name="Joseph Kim" role="Frontend" textColor="green" quote="still don't how to center a div" />
              <MemberCard image={WebmasterChair} name="Ricky Zhang" role="Webmaster" textColor="blue" quote="SASE deserves a better website" />
              <MemberCard image={BackendLead} name="Sihala Senevirathne" role="Backend" textColor="green" quote="Ricky, please pay me" />
              <MemberCard image={UIUXLead} name="Catherine Wu" role="UI/UX" textColor="blue" quote="sigma Figma team" />
            </div>
          )}
          <header className="mb-12 flex max-w-7xl items-center px-5">
            <div className="mr-3 h-11 w-1.5 bg-saseGreen"></div>
            <h2 className="font-oswald text-4xl text-foreground">Goals & Outcomes</h2>
          </header>
          <div className="mb-24 flex flex-col flex-nowrap items-center justify-center gap-10 md:flex-row lg:gap-36">
            <GoalCard text="Work with agile practices commonly found in the industry." color="blue" />
            <GoalCard text="Develop technical skills related to UI/UX, frontend, or backend development." color="green" />
            <GoalCard text="Gain hands-on experience with web development and contribute to SASE in a meaningful way." color="blue" />
          </div>
          <header className="flex max-w-7xl items-center px-5">
            <div className="mr-3 h-11 w-1.5 bg-saseGreen"></div>
            <h2 className="font-oswald text-4xl text-foreground">FAQs</h2>
          </header>
          <FAQ faqData={faqData} />
        </div>
      </div>
    );
  },
});
