import saseLogo from "@/client/assets/SASELogo.png";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { IoMdLink } from "react-icons/io";
import GalleryDropdown from "../components/GalleryDropdown";
import { seo } from "../utils/seo";
import GalleryZipExtraction from "../components/GalleryZipExtraction";

export const Route = createFileRoute("/gallery")({
  meta: () => [
    ...seo({
      title: "Gallery | UF SASE",
      description: "UF Society of Asian Scientists & Engineers",
      image: saseLogo,
    }),
  ],
  component: () => {
    const [slideshow, setSlideshow] = useState<string>("Fall 2024");
    const [slideshowLink, setSlideshowLink] = useState<string>("Fall 2024");

    const handleButton = () => {
      if (slideshow == "Fall 2024") {
        setSlideshowLink(
          "https://docs.google.com/document/d/1gjG2aHkh-IYXLQ5vTfmd6uphP7AYYN0M4liorjPt77k/edit?tab=t.0",
        );
      } else if (slideshow == "Spring 2024") {
        setSlideshowLink(
          "https://docs.google.com/document/d/1SohQfPM2D8fQhf4vkeWPfC9xTE3my4XTfVA-BNYYA9s/edit?tab=t.0",
        );
      } else {
        setSlideshowLink(
          "https://docs.google.com/document/d/18brpCElaHqD-rFcKd2eG4FGfjnBWXSthrI-aNdqoHYk/edit?tab=t.0",
        );
      }
    };

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
          <div className="flex-1 text-center">
            <GalleryDropdown
              slideshow={slideshow}
              setSlideshow={setSlideshow}
            />
          </div>
          <div className="flex w-full justify-center">
            <hr className="h-5 w-10/12 border-t-4 border-saseGreen" />
          </div>
          <div className="justify-center">
            <div className="flex-1 pb-5 pt-5 text-center font-oswald text-4xl">
              <p>{slideshow}</p>
            </div>
            <div></div>
            <div className="flex items-center justify-center pb-20">
              <GalleryZipExtraction slideshow={slideshow} />
            </div>
          </div>
          <div className="flex items-center justify-center pb-10">
            <a href={slideshowLink} target="__blank">
              <div
                className="... flex h-10 items-center justify-center rounded-sm border-2 border-gray-700 text-white
                bg-saseBlue transition delay-50 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-saseGreen hover:text-black"
                onClick={handleButton}
              >
                {" "}
                <div className="pl-2 font-redhat">
                  Click here to visit the Google Drives!
                </div>
                <div className="pl-2 pr-2">
                  <IoMdLink size={15} />{" "}
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    );
  },
});
