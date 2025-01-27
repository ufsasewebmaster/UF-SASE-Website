import { imageUrls } from "@assets/imageUrls";
import { cn } from "@shared/utils";
import type { SetStateAction } from "react";
import React, { useCallback, useState } from "react";
import { CgPlayButtonR } from "react-icons/cg";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

interface DropdownProps {
  slideshow: string;
  setSlideshow: React.Dispatch<SetStateAction<string>>;
}

const GalleryDropdown: React.FC<DropdownProps> = React.memo(({ setSlideshow }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(true);

  // Memoized callback functions to avoid re-renders
  const toggleVisibility = useCallback(() => {
    setIsDropdownVisible((prev) => !prev);
  }, []);

  const setFall2024 = useCallback(() => setSlideshow("Fall 2024"), [setSlideshow]);
  const setSpring2024 = useCallback(() => setSlideshow("Spring 2024"), [setSlideshow]);
  const setFall2023 = useCallback(() => setSlideshow("Fall 2023"), [setSlideshow]);

  return (
    <div className="align-items flex w-full flex-col justify-center gap-5 md:flex-row">
      <div className="w-full">
        <div
          id="photo_drives"
          className="flex w-full items-center justify-between rounded-lg border-2 border-black pb-1 pl-2 pt-1 text-left font-redhat text-lg font-semibold shadow-[5px_5px_0px_0px_rgb(125,194,66)] hover:cursor-pointer hover:opacity-70"
          onClick={toggleVisibility}
        >
          <div>Photo Google Drives</div>
          <div className="pr-3">{isDropdownVisible ? <FaChevronDown /> : <FaChevronUp />}</div>
        </div>
        <div className="py-2"></div>
        {isDropdownVisible && (
          <div className="w-full rounded-lg border-2 border-black pb-1 pl-2 pt-1 text-left font-redhat text-lg font-normal shadow-[5px_5px_0px_0px_rgb(125,194,66)]">
            <DropdownItem label="Fall 2024" onClick={setFall2024} />
            <DropdownItem label="Spring 2024" onClick={setSpring2024} />
            <DropdownItem label="Fall 2023" onClick={setFall2023} />
          </div>
        )}
      </div>

      <div
        className={cn({
          "invisible h-0": !isDropdownVisible,
          "flex justify-center transition duration-300 ease-in-out hover:translate-x-1 hover:scale-105": isDropdownVisible,
        })}
      >
        <img
          src={imageUrls["DropDownImage.webp"]}
          alt=""
          loading="lazy"
          className="max-h-96 rounded-lg border-2 border-black object-cover shadow-[5px_5px_0px_0px_rgb(30,119,186)]"
        />
      </div>
    </div>
  );
});

// Helper component for dropdown items
const DropdownItem: React.FC<{ label: string; onClick: () => void }> = ({ label, onClick }) => (
  <div className="flex items-center py-1">
    <p>{label}</p>
    <div className="p-1"></div>
    <div className="flex cursor-pointer items-center justify-center rounded-full border-2 border-gray-700 p-1 hover:opacity-45" onClick={onClick}>
      <div className="px-0.5">
        <CgPlayButtonR size={10} />
      </div>
      <p className="text-xs">Slideshow</p>
    </div>
  </div>
);

export default GalleryDropdown;
