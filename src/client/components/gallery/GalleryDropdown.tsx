import { imageUrls } from "@assets/imageUrls";
import { cn } from "@shared/utils";
import React, { useCallback, useState } from "react";
import { CgPlayButtonR } from "react-icons/cg";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

interface DropdownProps {
  slideshow: string;
  setSlideshow: React.Dispatch<React.SetStateAction<string>>;
}

const GalleryDropdown: React.FC<DropdownProps> = React.memo(({ setSlideshow }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(true);

  // Memoized callback functions
  const toggleVisibility = useCallback(() => setIsDropdownVisible((prev) => !prev), []);
  const setSlideshowOption = useCallback((option: string) => () => setSlideshow(option), [setSlideshow]);

  return (
    <div className="flex w-full flex-col justify-center gap-5 md:flex-row">
      <div className="w-full">
        <div id="photo_drives" className="dropdown-container border-border pb-1 pl-2 pt-1 font-semibold text-foreground" onClick={toggleVisibility}>
          <div className="flex flex-row justify-between">
            <div>Photo Google Drives</div>
            <div className="flex items-center pr-3">{isDropdownVisible ? <FaChevronDown /> : <FaChevronUp />}</div>
          </div>
        </div>
        <div
          className={cn("dropdown-transition", {
            "max-h-96 translate-y-0 opacity-100": isDropdownVisible,
            "max-h-0 -translate-y-4 opacity-0": !isDropdownVisible,
          })}
        >
          <div className="dropdown-container mt-2 pb-2 pl-3 pt-2 font-normal">
            {["Fall 2024", "Spring 2024", "Fall 2023"].map((label) => (
              <DropdownItem key={label} label={label} onClick={setSlideshowOption(label)} />
            ))}
          </div>
        </div>
      </div>
      <div
        className={cn("dropdown-transition", {
          "max-h-96 translate-y-0 opacity-100": isDropdownVisible,
          "max-h-0 -translate-y-4 opacity-0": !isDropdownVisible,
        })}
      >
        <img src={imageUrls["DropDownImage.webp"]} alt="" loading="lazy" className="image-transition" />
      </div>
    </div>
  );
});

const DropdownItem: React.FC<{ label: string; onClick: () => void }> = ({ label, onClick }) => (
  <div className="dropdown-item">
    <p>{label}</p>
    <div className="p-1"></div>
    <div className="dropdown-button" onClick={onClick}>
      <div className="px-0.5">
        <CgPlayButtonR size={10} />
      </div>
      <p className="text-xs">Slideshow</p>
    </div>
  </div>
);

export default GalleryDropdown;
