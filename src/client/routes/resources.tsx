import { cn } from "@/shared/utils";
import { imageUrls } from "@assets/imageUrls";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { IoMdLink } from "react-icons/io";
import { seo } from "../utils/seo";

export const Route = createFileRoute("/resources")({
  meta: () => [
    ...seo({
      title: "Resources | UF SASE",
      description: "UF Society of Asian Scientists & Engineers",
      image: imageUrls["SASELogo.png"],
    }),
  ],
  component: () => {
    const [resourceCategory, setResourceCategory] = useState<string>("Study Materials");
    const [resourceLink, setResourceLink] = useState<string>("");

    const resourceLinks = new Map<string, string>([
      ["Study Materials", "https://docs.google.com/document/d/1StudyMaterialsLink"],
      ["Workshops", "https://docs.google.com/document/d/1WorkshopsLink"],
      ["Career Resources", "https://docs.google.com/document/d/1CareerResourcesLink"],
    ]);

    const resourceCards = [
      {
        title: "Default Title 1",
        description: "Default description for resource 1.",
        linkText: "Access Resource 1",
        link: "#",
      },
      {
        title: "Default Title 2",
        description: "Default description for resource 2.",
        linkText: "Access Resource 2",
        link: "#",
      },
      {
        title: "Default Title 3",
        description: "Default description for resource 3.",
        linkText: "Access Resource 3",
        link: "#",
      },
      {
        title: "Default Title 4",
        description: "Default description for resource 4.",
        linkText: "Access Resource 4",
        link: "#",
      },
      {
        title: "Default Title 5",
        description: "Default description for resource 5.",
        linkText: "Access Resource 5",
        link: "#",
      },
      {
        title: "Default Title 6",
        description: "Default description for resource 6.",
        linkText: "Access Resource 6",
        link: "#",
      },
      {
        title: "Default Title 7",
        description: "Default description for resource 7.",
        linkText: "Access Resource 7",
        link: "#",
      },
    ];

    useEffect(() => {
      setResourceLink(resourceLinks.get(resourceCategory) || "");
    }, [resourceCategory]);

    return (
      <div>
        <p className={cn("flex justify-center pb-5 text-center font-oswald text-7xl")}>RESOURCES</p>
        <div className={cn("mx-[5%] border-b-4 border-t-4 border-b-saseGreen border-t-saseBlue px-10 py-10 lg:px-20")}>
          <div className={cn("flex justify-center")}>
            <select
              aria-label="Select Resource Category"
              value={resourceCategory}
              onChange={(e) => setResourceCategory(e.target.value)}
              className={cn("rounded-lg border bg-white p-2 shadow-sm")}
            >
              {[...resourceLinks.keys()].map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={cn("grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3")}>
          {resourceCards.map((card, index) => (
            <div key={index} className={cn("rounded-lg border p-4 shadow-md transition hover:shadow-lg")}>
              <h2 className={cn("mb-2 text-xl font-semibold")}>{card.title}</h2>
              <p className={cn("mb-4 text-gray-600")}>{card.description}</p>
              <a href={card.link} target="_blank" rel="noopener noreferrer" className={cn("font-medium text-blue-600 hover:text-blue-800")}>
                {card.linkText}
              </a>
            </div>
          ))}
        </div>

        <div className={cn("flex-1 justify-center text-center")}>
          <p className={cn("pb-5 pt-5 text-center font-oswald text-4xl")}>{resourceCategory}</p>
          <div className={cn("flex-center pb-10")}>
            <a href={resourceLink} target="_blank" rel="noopener noreferrer">
              <div
                className={cn(
                  "delay-50 flex h-10 items-center justify-center rounded-full border-2 border-gray-700 bg-saseBlue text-white shadow-[0px_5px_0px_0px_rgb(203,203,212)] transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-saseGreen hover:text-black",
                )}
              >
                <div className={cn("pl-5 font-redhat")}>Linktree Default</div>
                <div className={cn("pl-2 pr-5")}>
                  <IoMdLink size={15} />
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    );
  },
});
