import saseLogo from "@/client/assets/SASELogo.png";
import { createFileRoute } from "@tanstack/react-router";
import { seo } from "../utils/seo";
import GalleryDropdown from "../components/GalleryDropdown";
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
    return (
      <div>
        <div className="py-5"></div> {/* spacer element */}
        <div className="flex justify-center">
          <div className="flex-5 pb-5 text-center font-mono text-7xl">
            GALLERY
          </div>
        </div>
        <div className="flex w-full justify-center">
          <hr className="h-5 w-10/12 border-t-4 border-saseBlue" />
        </div>
        <div className="flex items-center justify-center pb-8"></div>
        <div className="flex-1 text-center">
          <div className="flex-1 text-center">
            <GalleryDropdown />
          </div>
          <div className="flex w-full justify-center">
            <hr className="h-5 w-10/12 border-t-4 border-saseGreen" />
          </div>
          <div className="justify-center">
            <div className="flex-1 pb-5 pt-5 text-center font-oswald text-3xl">
              <p>Fall 2024</p>
            </div>
            <div></div>
            <div className="flex items-center justify-center pb-20">
              <GalleryZipExtraction />
            </div>
          </div>
        </div>
      </div>
    );
  },
});
