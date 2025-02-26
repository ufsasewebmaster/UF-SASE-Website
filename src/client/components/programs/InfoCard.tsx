import React from "react";

interface SimpleCardProps {
  text: React.ReactNode;
}

const InfoCard: React.FC<SimpleCardProps> = ({ text }) => {
  return (
    <div className="relative mx-auto mb-14 w-full max-w-4xl p-5 font-redhat">
      {/* Main Card with Black Border and Green Shadow */}
      <div className="relative flex flex-col items-center rounded-3xl border-2 border-black bg-gray-100 p-12 shadow-[24px_24px_0px_#7DC242]">
        {/* Text Content */}
        <div className="flex flex-col justify-between">
          <p className="mb-4 text-xl text-black">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
