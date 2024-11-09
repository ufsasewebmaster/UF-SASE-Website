import { createFileRoute } from "@tanstack/react-router";
import GallerySlideshow from "../components/GallerySlideshow"
import GalleryDropdown from "../components/GalleryDropdown";
import dropdown from "../assets/gallery/dropdown_image.webp"

export const Route = createFileRoute("/gallery")({
  component: () => {
    const images = new Array(30).fill(null)

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
        <div className="flex items-center justify-center pb-8 pt-3">
          <div className="w-1/12"></div> {/* spacer element */}
          <div className="flex-1 text-center">
            <GalleryDropdown/>
          </div>
          <div className="pl-10">
            <img src={dropdown} alt="" className="w-72 rounded-lg border-2 border-black "/>
          </div>
          <div className="pr-32"></div> {/* spacer element */}
        </div>
        <div className="flex w-full justify-center">
          <hr className="h-5 w-10/12 border-t-4 border-saseGreen" />
        </div>
        <div className="justify-center">
          <div className="flex-5 pb-5 pt-5 text-center font-oswald text-3xl">
            Fall 2024
          </div>
        </div>
        <div></div>
        <div id="slideshow" className="border-black">
          <GallerySlideshow />
        </div>
        <div className="flex items-center justify-center">
          <div className="flex-1 pl-7"></div> {/* spacer element */}
          <div className="flex-1 w-9/12">
            <ul className="flex flex-row overflow-y-auto">
              {images.map((item) => (
                  <li className="px-12 py-6 border-2 border-black bg-gray-300 hover:bg-gray-400">
                    {item}
                  </li>
                ))}
            </ul>    
          </div>
          <div className="flex-1 pr-5"></div> {/* spacer element */}
        </div>
        <div className="pt-10"></div> {/* spacer element */}
      </div>
    );
  },
});
