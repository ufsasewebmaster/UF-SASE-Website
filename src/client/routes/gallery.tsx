import { imageUrls } from "@assets/imageUrls";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { IoMdLink } from "react-icons/io";
import GalleryDropdown from "../components/GalleryDropdown";
import GalleryZipExtraction from "../components/GalleryZipExtraction";
import { seo } from "../utils/seo";

export const Route = createFileRoute("/gallery")({
  meta: () => [
    ...seo({
      title: "Gallery | UF SASE",
      description: "UF Society of Asian Scientists & Engineers",
      image: imageUrls["SASELogo.png"],
    }),
  ],
  component: () => {
    const [slideshow, setSlideshow] = useState<string>("Fall 2024");
    const [slideshowLink, setSlideshowLink] = useState<string>("");

    // Map of slideshow names to Google Drive links
    const slideshowLinks = new Map<string, string>([
      [
        "Fall 2024",
        "https://docs.google.com/document/d/1gjG2aHkh-IYXLQ5vTfmd6uphP7AYYN0M4liorjPt77k/edit?tab=t.0",
      ],
      [
        "Spring 2024",
        "https://docs.google.com/document/d/1SohQfPM2D8fQhf4vkeWPfC9xTE3my4XTfVA-BNYYA9s/edit?tab=t.0",
      ],
      [
        "Fall 2023",
        "https://docs.google.com/document/d/18brpCElaHqD-rFcKd2eG4FGfjnBWXSthrI-aNdqoHYk/edit?tab=t.0",
      ],
    ]);

    // Update slideshowLink whenever slideshow changes
    useEffect(() => {
      setSlideshowLink(slideshowLinks.get(slideshow) || "");
    }, [slideshow, slideshowLinks]);

    return (
      <div>
        <div className="py-5"></div> {/* spacer element */}
        <div className="flex justify-center">
          <div className="flex-5 pb-5 text-center font-oswald text-7xl">
            GALLERY
          </div>
        </div>
        <div className="flex w-full justify-center">
          <hr className="h-5 w-10/12 border-t-4 border-saseBlue" />
        </div>
        <div className="flex items-center justify-center pb-8"></div>
        <div className="flex-1 text-center">
          <GalleryDropdown slideshow={slideshow} setSlideshow={setSlideshow} />
          <div className="flex w-full justify-center">
            <hr className="h-5 w-10/12 border-t-4 border-saseGreen" />
          </div>
          <div className="justify-center">
            <div className="flex-1 pb-5 pt-5 text-center font-oswald text-4xl">
              <p>{slideshow}</p>
            </div>
            <div className="flex items-center justify-center pb-20">
              <GalleryZipExtraction slideshow={slideshow} />
            </div>
          </div>
          <div className="flex items-center justify-center pb-10">
            <a href={slideshowLink} target="__blank">
              <div className="... delay-50 flex h-10 items-center justify-center rounded-sm border-2 border-gray-700 bg-saseBlue text-white transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-saseGreen hover:text-black">
                <div className="pl-2 font-redhat">
                  Click here to visit the Google Drives!
                </div>
                <div className="pl-2 pr-2">
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
