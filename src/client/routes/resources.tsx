import { cn } from "@/shared/utils";
import { imageUrls } from "@assets/imageUrls";
import ClassConnectorForms from "@components/ClassConnectorForms";
import FreshmenFAQ from "@components/resources/FreshmenFAQ";
import ResourcesCard from "@components/ResourcesCard";
import { createFileRoute } from "@tanstack/react-router";
import React, { useEffect, useRef, useState } from "react";
import { IoMdLink } from "react-icons/io";
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

const resourceTabs: Record<string, React.ReactNode> = {
  "Study Materials": studyMaterials.map((card, index) => <ResourcesCard key={index} {...card} />),
  Workshops: workshops.map((card, index) => <ResourcesCard key={index} {...card} />),
  "Career Resources": careerResources.map((card, index) => <ResourcesCard key={index} {...card} />),
  "Class Connector Forms": <ClassConnectorForms />,
  Resources: <FreshmenFAQ />,
};

export const Route = createFileRoute("/resources")({
  meta: () => [
    ...seo({
      title: "Resources | UF SASE",
      description:
        "Resources for students provided by UF SASE, such as study materials, workshop slides, career resources, and class connector forms.",
      image: imageUrls["SASELogo.png"],
    }),
  ],
  component: () => {
    useEffect(() => {
      applyOmbreDivider();
    }, []);

    const [activeTab, setActiveTab] = useState<keyof typeof resourceTabs>("Study Materials");
    const categories = Object.keys(resourceTabs);
    const tabRefs = useRef<Array<HTMLButtonElement>>([]);
    const [sliderStyle, setSliderStyle] = useState({
      left: "0px",
      width: "0px",
    });

    useEffect(() => {
      const currentIndex = categories.indexOf(activeTab);
      if (currentIndex < 0) return;
      const currentTab = tabRefs.current[currentIndex];
      if (!currentTab) return;
      setSliderStyle({
        left: currentTab.offsetLeft + "px",
        width: currentTab.offsetWidth + "px",
      });
    }, [activeTab, categories]);

    return (
      <div className="w-full">
        {/* Title */}
        <div className="text-center">
          <h1 className="mt-4 pb-8 font-oswald text-5xl font-medium sm:text-6xl md:text-7xl">RESOURCES</h1>
        </div>

        {/* Blue line under title */}
        <div className="ombre-divider"></div>

        {/* Tab Bar / Sliding Underline */}
        <div className="mt-6 flex justify-center border-b">
          <ul className="relative flex space-x-4 px-4">
            <div className="absolute bottom-0 h-1 bg-saseBlue transition-all duration-300" style={sliderStyle} />
            {categories.map((category, idx) => {
              const isActive = category === activeTab;
              return (
                <li key={category}>
                  <button
                    ref={(el) => {
                      if (el) tabRefs.current[idx] = el;
                    }}
                    onClick={() => setActiveTab(category as keyof typeof resourceTabs)}
                    className={cn(
                      "relative whitespace-nowrap px-4 py-2 text-base font-semibold transition-colors",
                      isActive ? "text-saseBlue" : "text-gray-600 hover:text-black",
                    )}
                  >
                    {category}
                  </button>
                </li>
              );
            })}
          </ul>
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
