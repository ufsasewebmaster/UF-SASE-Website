import Star from "@assets/programs/star.png";
import React from "react";

interface PastProjectsSectionProps {
  description: string;
  image: string;
}

const PastProjectsSection: React.FC<PastProjectsSectionProps> = ({
  description,
  image,
}) => {
  return (
    <div className="mb-24 flex max-w-7xl items-center bg-white p-6">
      {/* Image Section */}
      <div className="relative flex-shrink-0 rounded-3xl border-2 border-black shadow-[18px_18px_0px_#7DC242]">
        <img
          src={image}
          alt="Past Project"
          className="h-[500px] w-[400px] rounded-3xl object-cover"
        />
        {/* Decorative Icon */}
        <img
          src={Star}
          alt="Decorative star"
          className="absolute -bottom-6 -left-9 h-20 w-20"
        />
      </div>

      {/* Text Section */}
      <div className="ml-24 border-l-4 border-saseGreen pl-6">
        <p className="mb-4 text-3xl text-gray-800">{description}</p>
      </div>
    </div>
  );
};

export default PastProjectsSection;
