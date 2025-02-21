import { imageUrls } from "@assets/imageUrls";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { IoMdLink } from "react-icons/io";
import GalleryDropdown from "../components/gallery/GalleryDropdown";
import GalleryYearbook from "../components/gallery/GalleryYearbook";
import GalleryZipExtraction from "../components/gallery/GalleryZipExtraction";
import { seo } from "../utils/seo";

export const Route = createFileRoute("/gallery")({
  meta: () => [...seo({ title: "Gallery | UF SASE", description: "UF Society of Asian Scientists & Engineers", image: imageUrls["SASELogo.png"] })],
  component: () => {
    const [slideshow, setSlideshow] = useState<string>("Fall 2024");
    const [slideshowLink, setSlideshowLink] = useState<string>("");

    // Map of slideshow names to Google Drive links
    const slideshowLinks = new Map<string, string>([
      ["Fall 2024", "https://docs.google.com/document/d/1gjG2aHkh-IYXLQ5vTfmd6uphP7AYYN0M4liorjPt77k/edit?tab=t.0"],
      ["Spring 2024", "https://docs.google.com/document/d/1SohQfPM2D8fQhf4vkeWPfC9xTE3my4XTfVA-BNYYA9s/edit?tab=t.0"],
      ["Fall 2023", "https://docs.google.com/document/d/18brpCElaHqD-rFcKd2eG4FGfjnBWXSthrI-aNdqoHYk/edit?tab=t.0"],
    ]);

    // Update slideshowLink whenever slideshow changes
    useEffect(() => {
      setSlideshowLink(slideshowLinks.get(slideshow) || "");
    }, [slideshow, slideshowLinks]);

    return (
      <div>
        {/* <GallerySlideshow/> */}
        <p className="flex justify-center pb-5 text-center font-oswald text-7xl">GALLERY</p>
        <div className="mx-[5%] border-b-4 border-t-4 border-b-saseGreen border-t-saseBlue px-10 py-10 lg:px-20">
          <GalleryDropdown slideshow={slideshow} setSlideshow={setSlideshow} />
        </div>
        <div className="flex-1 justify-center text-center">
          <p className="pb-5 pt-5 text-center font-oswald text-4xl">{slideshow}</p>
          <div className="pb-20">
            <GalleryZipExtraction slideshow={slideshow} />
          </div>
          <div className="flex-center pb-10">
            <a href={slideshowLink} target="__blank">
              <div className="delay-50 ... flex h-10 items-center justify-center rounded-full border-2 border-gray-700 bg-saseBlue text-white shadow-[0px_5px_0px_0px_rgb(203,203,212)] transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-saseGreen hover:text-black">
                <div className="pl-5 font-redhat">Click here to visit the Google Drives!</div>
                <div className="pl-2 pr-5">
                  <IoMdLink size={15} />
                </div>
              </div>
            </a>
          </div>
          <div className="flex-center">
            <div className="mb-20 w-10/12 rounded-lg bg-blue-300 px-3 pb-10 pt-5 shadow-[10px_10px_0px_0px_rgb(6,104,179)] transition duration-150 hover:scale-105">
              <GalleryYearbook />
            </div>
          </div>
          <div className="flex justify-center pb-10 font-redhat">
            <a href="https://www.mixbook.com/photo-books/interests/blank-canvas-34402104?vk=dlMW6WL1SBIaedVXgd2n" target="_blank">
              <button className="delay-50 ... flex h-10 items-center justify-center rounded-full border-2 border-gray-700 bg-saseBlue pl-5 pr-5 text-white shadow-[0px_5px_0px_0px_rgb(203,203,212)] transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-saseGreen hover:text-black">
                2024-2025 SASE Yearbook
              </button>
            </a>
          </div>
        </div>
      </div>
    );
  },
});
