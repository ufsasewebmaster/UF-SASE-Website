import React, { useState } from "react";
import { CgPlayButtonR } from "react-icons/cg";
import { IoMdLink } from "react-icons/io";
import dropdownImage from "../assets/gallery/dropdown_image.webp";

const GalleryDropdown: React.FC = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(true);

  const toggleVisibility = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  return (
    <div className="flex w-full items-center justify-between pb-10">
      <div className="w-full pl-32 pr-5">
        <div
          id="photo_drives"
          className="w-full rounded-lg border-2 border-black pb-1 pl-2 pt-1 text-left font-redhat text-lg font-semibold shadow-[5px_5px_0px_0px_rgb(125,194,66)] hover:cursor-pointer"
          onClick={toggleVisibility}
        >
          Photo Google Drives
        </div>
        <div className="w-1/12 pt-5"></div> {/* spacer element */}
        {isDropdownVisible && (
          <div
            id="photo_drives"
            className="w-full rounded-lg border-2 border-black pb-1 pl-2 pt-1 text-left font-redhat text-lg font-normal shadow-[5px_5px_0px_0px_rgb(125,194,66)]"
          >
            <div>
              <div className="flex items-center py-1">
                <p>Fall 2024</p>
                <div className="p-1"></div> {/* spacer element */}
                <a
                  href="https://docs.google.com/document/d/1gjG2aHkh-IYXLQ5vTfmd6uphP7AYYN0M4liorjPt77k/edit?tab=t.0"
                  target="__blank"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-sm border-2 border-gray-700">
                    {" "}
                    <IoMdLink size={15} />{" "}
                  </div>
                </a>
                <div className="p-1"></div> {/* spacer element */}
                <div>
                  <div className="flex items-center justify-center rounded-full border-2 border-gray-700 p-1">
                    <div className="px-0.5">
                      <CgPlayButtonR size={10} />{" "}
                    </div>
                    <p className="text-xs">Slideshow</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center py-1">
                <p>Spring 2024</p>
                <div className="p-1"></div> {/* spacer element */}
                <a
                  href="https://docs.google.com/document/d/1SohQfPM2D8fQhf4vkeWPfC9xTE3my4XTfVA-BNYYA9s/edit?tab=t.0"
                  target="__blank"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-sm border-2 border-gray-700">
                    {" "}
                    <IoMdLink size={15} />{" "}
                  </div>
                </a>
                <div className="p-1"></div> {/* spacer element */}
                <div>
                  <div className="flex items-center justify-center rounded-full border-2 border-gray-700 p-1">
                    <div className="px-0.5">
                      <CgPlayButtonR size={10} />{" "}
                    </div>
                    <p className="text-xs">Slideshow</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center py-1">
                <p>Fall 2023</p>
                <div className="p-1"></div> {/* spacer element */}
                <a
                  href="https://docs.google.com/document/d/18brpCElaHqD-rFcKd2eG4FGfjnBWXSthrI-aNdqoHYk/edit?tab=t.0"
                  target="__blank"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-sm border-2 border-gray-700">
                    {" "}
                    <IoMdLink size={15} />{" "}
                  </div>
                </a>
                <div className="p-1"></div> {/* spacer element */}
                <div>
                  <div className="flex items-center justify-center rounded-full border-2 border-gray-700 p-1">
                    <div className="px-0.5">
                      <CgPlayButtonR size={10} />{" "}
                    </div>
                    <p className="text-xs">Slideshow</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-center pl-5 pr-32">
        <img
          src={dropdownImage}
          alt=""
          className="h-56 min-h-[150px] w-96 min-w-[300px] rounded-lg border-2 border-black object-cover"
        />
      </div>
    </div>
  );
};

export default GalleryDropdown;
