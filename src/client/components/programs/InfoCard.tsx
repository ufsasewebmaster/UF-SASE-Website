import React from "react";

interface SimpleCardProps {
  text: React.ReactNode;
}

const InfoCard: React.FC<SimpleCardProps> = ({ text }) => {
  return (
    <div className="relative mx-auto mb-14 w-full max-w-4xl p-5 font-redhat">
      {/* Gradient Border Background */}
      <div className="rounded-[2rem] bg-gradient-to-br from-saseBlue to-saseGreen p-[8px] shadow-[12px_12px_12px_rgba(125,194,66,0.5)]">
        <div className="flex flex-col items-center rounded-[calc(1.5rem-3px)] bg-muted p-12">
          {/* Text Content */}
          <div className="flex flex-col justify-between">
            <p className="mb-4 text-xl text-foreground">{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
