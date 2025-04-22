import { cn } from "@/shared/utils";
import { imageUrls } from "@assets/imageUrls";
import ClassConnectorForms from "@components/ClassConnectorForms";
import FreshmenFAQ from "@components/resources/FreshmenFAQ";
import ResourcesCard from "@components/ResourcesCard";
import { createFileRoute } from "@tanstack/react-router";
import React, { useEffect, useRef, useState } from "react";
import { IoMdLink } from "react-icons/io";
import BoardOfficeHours from "../components/resources/BoardOfficeHours";
import MarstonBooking from "../components/resources/MarstonBooking";
import { applyOmbreDivider } from "../utils/ombre-divider";
import { seo } from "../utils/seo";

interface ResourceCard {
  title: string;
  description: string;
  linkText: string;
  link: string;
}

const studyMaterials: Array<ResourceCard> = [
  {
    title: "Study Guide 1",
    description: "Comprehensive guide for subject ABC.",
    linkText: "View Guide",
    link: "#",
  },
  {
    title: "Study Guide 2",
    description: "Practice problems for XYZ.",
    linkText: "Access Problems",
    link: "#",
  },
];

const workshops: Array<ResourceCard> = [
  {
    title: "Workshop Slides",
    description: "Slides from our recent leadership workshop.",
    linkText: "Open Slides",
    link: "#",
  },
  {
    title: "Workshop Recording",
    description: "Watch the session from last semester’s event.",
    linkText: "Watch",
    link: "#",
  },
];

const careerResources: Array<ResourceCard> = [
  {
    title: "Resume Tips",
    description: "A quick guide to building a strong resume.",
    linkText: "View Tips",
    link: "#",
  },
  {
    title: "Interview Prep",
    description: "Resources to help you ace your interviews.",
    linkText: "Start Preparing",
    link: "#",
  },
];

const mapToCards = (data: Array<ResourceCard>) => data.map((card, index) => <ResourcesCard key={index} {...card} />);

const resourceTabs: Record<string, React.ReactNode> = {
  "Board Office Hours": <BoardOfficeHours />,
  "Marston Study Room Booking": <MarstonBooking />,
  "Class Connector Forms": <ClassConnectorForms />,
  "Freshman FAQs": <FreshmenFAQ />,
  "Study Materials": mapToCards(studyMaterials),
  Workshops: mapToCards(workshops),
  "Career Resources": mapToCards(careerResources),
};

export const Route = createFileRoute("/resources")({
  meta: () => [
    ...seo({
      title: "Resources | UF SASE",
      description: "UF Society of Asian Scientists & Engineers",
      image: imageUrls["SASELogo.png"],
    }),
  ],
  component: () => {
    useEffect(() => {
      applyOmbreDivider();
    }, []);

    const [activeTab, setActiveTab] = useState<keyof typeof resourceTabs>("Board Office Hours");
    const tabRefs = useRef<Array<HTMLButtonElement>>([]);
    const categories = Object.keys(resourceTabs);

    return (
      <div className="w-full">
        {/* Title */}
        <div className="text-center">
          <h1 className="mt-4 pb-8 font-oswald text-5xl font-medium sm:text-6xl md:text-7xl">RESOURCES</h1>
        </div>

        {/* Blue line under title */}
        <div className="ombre-divider"></div>

        {/* Tab Bar */}
        <div className="mt-6 border-b-2 border-gray-300 pb-6">
          <div className="mx-auto max-w-5xl px-4">
            <div className="mb-4 flex flex-wrap justify-center gap-4">
              {categories.map((category, idx) => {
                const isActive = category === activeTab;
                return (
                  <button
                    key={category}
                    ref={(el) => {
                      if (el) tabRefs.current[idx] = el;
                    }}
                    onClick={() => setActiveTab(category as keyof typeof resourceTabs)}
                    className={cn(
                      "whitespace-nowrap rounded-full border px-5 py-2 font-redhat text-base font-semibold transition-colors duration-200",
                      isActive
                        ? "border-saseGray bg-saseBlueLight text-white shadow-sm"
                        : "border-transparent bg-transparent text-black hover:text-saseBlueLight",
                    )}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Resource Cards */}
        <div className="py-8">{resourceTabs[activeTab]}</div>

        {/* Green line */}
        <div className="ombre-divider"></div>

        {/* Linktree Button */}
        <div className="flex justify-center py-8">
          <a href="#" target="_blank" rel="noopener noreferrer">
            <div
              className={cn(
                "mx-auto flex h-10 w-fit items-center justify-center rounded-full border-2",
                "border-gray-700 bg-saseBlue px-4 text-white shadow-[0px_5px_0px_0px_rgb(203,203,212)]",
                "transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-saseGreen hover:text-black",
              )}
            >
              <div className="pr-2 font-redhat">Linktree Default</div>
              <IoMdLink size={15} />
            </div>
          </a>
        </div>
      </div>
    );
  },
});
