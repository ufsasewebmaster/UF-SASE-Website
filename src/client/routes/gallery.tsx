import { createFileRoute } from "@tanstack/react-router";
import GalleryDropdown from "../components/GalleryDropdown";

export const Route = createFileRoute("/gallery")({
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
        <div className="flex items-center justify-center pb-8 pt-3">
          <div className="w-1/12"></div> {/* spacer element */}
          <div className="flex-1 pr-10 text-center">
            <GalleryDropdown />
          </div>
          <div className="flex-1">{/* add image eventually */}</div>
        </div>
        <div className="flex w-full justify-center">
          <hr className="h-5 w-10/12 border-t-4 border-saseGreen" />
        </div>
        <div className="justify-center">
          <div className="flex-5 pb-5 pt-5 text-center font-mono text-3xl">
            Spring 2024
          </div>
        </div>
        <div id="slideshow" className="border-black">
          {/* slideshow component goes in this div*/}
        </div>
      </div>
    );
  },
});
