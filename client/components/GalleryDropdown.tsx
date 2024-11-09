import React, { useState } from "react";
import { IoMdLink } from "react-icons/io";
import { CgPlayButtonR } from "react-icons/cg";

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
            <div className="flex items-center py-1">
               <p>Fall 2024</p>
               <div className="p-1"></div> {/* spacer element */}
               <a href="https://docs.google.com/document/d/1gjG2aHkh-IYXLQ5vTfmd6uphP7AYYN0M4liorjPt77k/edit?tab=t.0" target="__blank">
                  <div className="w-6 h-6 flex justify-center items-center border-2 border-gray-700 rounded-sm"> <IoMdLink size={15}/> </div>
               </a>
               
               <div className="p-1"></div> {/* spacer element */}
               <div>
                  <div className="flex justify-center items-center p-1 border-2 border-gray-700 rounded-full">
                      <div className="px-0.5"><CgPlayButtonR size={10}/> </div>
                      <p className="text-xs">Slideshow</p> 
                  </div>
               </div>
            </div>
            <div className="flex items-center py-1">
               <p>Spring 2024</p>
               <div className="p-1"></div> {/* spacer element */}
               <a href="https://docs.google.com/document/d/1SohQfPM2D8fQhf4vkeWPfC9xTE3my4XTfVA-BNYYA9s/edit?tab=t.0" target="__blank">
                  <div className="w-6 h-6 flex justify-center items-center border-2 border-gray-700 rounded-sm"> <IoMdLink size={15}/> </div>
               </a>
               
               <div className="p-1"></div> {/* spacer element */}
               <div>
                  <div className="flex justify-center items-center p-1 border-2 border-gray-700 rounded-full">
                      <div className="px-0.5"><CgPlayButtonR size={10}/> </div>
                      <p className="text-xs">Slideshow</p> 
                  </div>
               </div>
            </div>
            <div className="flex items-center py-1">
               <p>Fall 2023</p>
               <div className="p-1"></div> {/* spacer element */}
               <a href="https://docs.google.com/document/d/18brpCElaHqD-rFcKd2eG4FGfjnBWXSthrI-aNdqoHYk/edit?tab=t.0" target="__blank">
                  <div className="w-6 h-6 flex justify-center items-center border-2 border-gray-700 rounded-sm"> <IoMdLink size={15}/> </div>
               </a>
               
               <div className="p-1"></div> {/* spacer element */}
               <div>
                  <div className="flex justify-center items-center p-1 border-2 border-gray-700 rounded-full">
                      <div className="px-0.5"><CgPlayButtonR size={10}/> </div>
                      <p className="text-xs">Slideshow</p> 
                  </div>
               </div>
            </div>
         </div>
      </div>}
   </div>
  )
}

export default GalleryDropdown