import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import mainImage from "../assets/gallery/DSC01367.jpg";

const GallerySlideshow = () => {
  return (
    <div>
      <div className="flex">
        <div className="w-3/12 pl-5"></div> {/* spacer element */}
        <div className="flex items-center justify-center pr-10">
          <FaChevronLeft size={40} className="cursor-pointer" />
        </div>
        <div className="relative w-full flex-1 overflow-hidden rounded-lg border-2 border-black shadow-[5px_5px_0px_0px_rgb(6,104,179)]">
          <img src={mainImage} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="flex items-center justify-center pl-10">
          <FaChevronRight size={40} className="cursor-pointer" />
        </div>{" "}
        {/* spacer element */}
        <div className="w-3/12 pr-5"></div> {/* spacer element */}
      </div>
      <div className="pt-10"></div> {/* spacer element */}
    </div>
  );
};

export default GallerySlideshow;
