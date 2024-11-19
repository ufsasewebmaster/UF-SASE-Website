import type { SetStateAction } from "react";
import React, { useCallback, useState } from "react";
import { CgPlayButtonR } from "react-icons/cg";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import dropdownImage from "../assets/gallery/dropdown_image.webp";

interface DropdownProps {
  slideshow: string;
  setSlideshow: React.Dispatch<SetStateAction<string>>;
}

const GalleryDropdown: React.FC<DropdownProps> = React.memo(
  ({ setSlideshow }) => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(true);

    // Memoized callback functions to avoid re-renders
    const toggleVisibility = useCallback(() => {
      setIsDropdownVisible((prev) => !prev);
    }, []);

    const setFall2024 = useCallback(
      () => setSlideshow("Fall 2024"),
      [setSlideshow],
    );
    const setSpring2024 = useCallback(
      () => setSlideshow("Spring 2024"),
      [setSlideshow],
    );
    const setFall2023 = useCallback(
      () => setSlideshow("Fall 2023"),
      [setSlideshow],
    );

    return (
      <div className="items-top flex w-full justify-between pb-10">
        <div className="w-full pl-32 pr-5 pt-5">
          <div
            id="photo_drives"
            className="flex w-full items-center justify-between rounded-lg border-2 border-black pb-1 pl-2 pt-1 text-left font-redhat text-lg font-semibold shadow-[5px_5px_0px_0px_rgb(125,194,66)] hover:cursor-pointer hover:opacity-70"
            onClick={toggleVisibility}
          >
            <div>Photo Google Drives</div>
            <div className="pr-3">
              {isDropdownVisible ? <FaChevronDown /> : <FaChevronUp />}
            </div>
          </div>
          {isDropdownVisible && (
            <div className="w-full rounded-lg border-2 border-black pb-1 pl-2 pt-1 text-left font-redhat text-lg font-normal shadow-[5px_5px_0px_0px_rgb(125,194,66)]">
              <DropdownItem label="Fall 2024" onClick={setFall2024} />
              <DropdownItem label="Spring 2024" onClick={setSpring2024} />
              <DropdownItem label="Fall 2023" onClick={setFall2023} />
            </div>
          )}
        </div>
        <div className="flex justify-center pl-5 pr-32">
          <img
            src={dropdownImage}
            alt=""
            loading="lazy"
            className="h-56 min-h-[150px] w-96 min-w-[300px] rounded-lg border-2 border-black object-cover"
          />
        </div>
      </div>
    );
  },
);

// Helper component for dropdown items
const DropdownItem: React.FC<{ label: string; onClick: () => void }> = ({
  label,
  onClick,
}) => (
  <div className="flex items-center py-1">
    <p>{label}</p>
    <div className="p-1"></div>
    <div
      className="flex cursor-pointer items-center justify-center rounded-full border-2 border-gray-700 p-1 hover:opacity-45"
      onClick={onClick}
    >
      <div className="px-0.5">
        <CgPlayButtonR size={10} />
      </div>
      <p className="text-xs">Slideshow</p>
    </div>
  </div>
);

export default GalleryDropdown;
