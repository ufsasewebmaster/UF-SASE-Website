import React, { useState } from "react";
import { CgPlayButtonR } from "react-icons/cg";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { IoMdLink } from "react-icons/io";

const GalleryDropdown: React.FC = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(true);

  const toggleVisibility = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  return (
    <div className="h-48">
      <div
        id="photo_drives"
        className="flex w-full flex-1 items-center rounded-lg border-2 border-black pb-1 pl-2 pt-1 text-left font-redhat text-lg font-semibold shadow-[5px_5px_0px_0px_rgb(125,194,66)] hover:cursor-pointer"
        onClick={toggleVisibility}
      >
        <div className="flex-1">Photo Google Drives</div>
        <div className="pr-3">
          {isDropdownVisible ? <FaChevronDown /> : <FaChevronUp />}
        </div>
      </div>
      <div className="w-1/12 pt-5"></div> {/* spacer element */}
      {isDropdownVisible && (
        <div
          id="photo_drives"
          className="w-full rounded-lg border-2 border-black pb-1 pl-2 pt-1 text-left font-redhat text-lg font-normal shadow-[5px_5px_0px_0px_rgb(125,194,66)]"
        >
          <div>
            <div className="flex items-center py-1 font-redhat">
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
                <div
                  id="fall2024_slideshow"
                  className="flex items-center justify-center rounded-full border-2 border-gray-700 p-1"
                >
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
  );
};

export default GalleryDropdown;
