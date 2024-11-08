import React, { useState } from "react";

const GalleryDropdown: React.FC  = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(true);

  const toggleVisibility = () => {
   setIsDropdownVisible((prev) => !prev);
 };

  return (
   <div>
      <div
         id="photo_drives"
         className="w-full rounded-lg border-2 text-left border-black pb-1 pl-2 pt-1 font-redhat text-lg font-semibold 
         shadow-[5px_5px_0px_0px_rgb(125,194,66)] hover:cursor-pointer"
         onClick={toggleVisibility}
      >
         Photo Google Drives
      </div>
      <div className="w-1/12 pt-5"></div> {/* spacer element */}
      {isDropdownVisible && <div
         id="photo_drives"
         className="w-full rounded-lg border-2 text-left border-black pb-1 pl-2 pt-1 font-redhat text-lg font-normal
         shadow-[5px_5px_0px_0px_rgb(125,194,66)]"
      >
         <div>
            <div className="flex">
               <p>Fall 2024</p>
               <div className="pl-2"></div>
            </div>
            <div className="pt-1">Spring 2024</div>
            <div className="pt-1">Fall 2023</div>
         </div>
      </div>}
   </div>
  )
}

export default GalleryDropdown
