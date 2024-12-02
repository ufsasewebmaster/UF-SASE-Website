import { imageUrls } from "@/client/assets/imageUrls";
import React from "react";

const BoardPicture = () => {
  return (
    <div className="relative mx-auto mb-24 w-full max-w-7xl">
      {/* Background Image */}
      <img src={imageUrls["Board.png"]} alt="Board Picture" className="h-auto w-full rounded-xl object-cover" />

      {/* Text Overlay */}
      <div className="absolute inset-0 flex items-end justify-center p-4">
        <div className="w-5/6 rounded-b-xl bg-gradient-to-t from-black to-transparent p-4">
          <p className="text-lg text-white">
            Brief overview of what <span className="text-saseGreen">SASE programs</span> there are, what they do, why they were created, what
            participants get out of the programs, etc. Just general overview kinda thing.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BoardPicture;
