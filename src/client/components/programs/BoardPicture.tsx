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
            We offer a variety of programs that provide members of all experience levels with opportunities to network, socialize, and develop
            technical and leadership skills. Read on to learn more about our Intern Program, Engineering Team, Web Team, and Intramural sports league.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BoardPicture;
