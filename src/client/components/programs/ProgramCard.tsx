import React from "react";

interface ProgramCardProps {
  image: string;
  text: React.ReactNode;
  link: string;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ image, link, text }) => {
  return (
    <div className="relative mb-24 w-full max-w-6xl p-6">
      {/* Main Card with Black Border and Green Shadow */}
      <div className="relative flex transform flex-col items-center rounded-3xl border-2 border-black bg-gray-100 p-12 shadow-[16px_16px_0px_#7DC242] transition duration-300 hover:shadow-[24px_24px_0px_#0668B3] sm:flex-row">
        {/* Image */}
        <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-8">
          <img
            src={image}
            alt="Program Image"
            className="h-[323px] w-[440px] rounded-2xl object-cover"
          />
        </div>

        {/* Text Content */}
        <div className="flex flex-col justify-between">
          <p className="mb-4 text-xl text-black">{text}</p>

          {/* Learn More Button */}
          <a href={link} target="_blank" rel="noopener noreferrer">
            <button className="mt-4 w-40 rounded-full bg-saseBlueLight py-2 text-center text-lg italic text-white transition duration-300 hover:scale-105 hover:bg-saseBlue focus:outline-none focus:ring-2 focus:ring-blue-500">
              LEARN MORE
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProgramCard;
