import React from "react";

interface ProgramCardProps {
  image: string;
  text: React.ReactNode;
  link: string;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ image, link, text }) => {
  return (
    <div className="relative mb-24 w-full max-w-6xl p-6">
      <div className="group relative">
        <div className="absolute left-5 top-5 z-0 h-full w-full rounded-3xl bg-gradient-to-b from-saseGreen to-saseBlue"></div>
        <div className="absolute left-5 top-5 z-0 h-full w-full rounded-3xl bg-gradient-to-b from-saseBlue to-saseGreen opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100"></div>

        {/* Main Card */}
        <div className="relative z-10 flex transform flex-col items-center rounded-3xl border-2 border-border bg-muted p-12 transition sm:flex-row">
          {/* Image */}
          <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-8">
            <img src={image} alt="Program Image" className="h-[323px] w-[440px] rounded-2xl object-cover" />
          </div>

          {/* Text Content */}
          <div className="flex flex-col justify-between">
            <p className="mb-4 font-redhat text-xl text-foreground">{text}</p>

            {/* Learn More Button */}
            <a href={link} target="_blank" rel="noopener noreferrer">
              <button className="mt-4 w-40 rounded-full bg-saseBlueLight py-2 text-center font-redhat text-lg italic text-white transition duration-300 hover:scale-105 hover:bg-saseBlue focus:outline-none focus:ring-2 focus:ring-blue-500">
                LEARN MORE
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramCard;
