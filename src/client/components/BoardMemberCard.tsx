import React, { useState } from "react";

interface Member {
  role: string;
  image: string;
  name: string;
  major: string;
  contact: string;
  description: string;
}

const BoardMemberCard = ({ member }: { member: Member }) => {
  const [isExpanded, setExpanded] = useState(false);

  const handleToggleExpand = () => {
    setExpanded(!isExpanded);
  };

  return (
    <div
      className={`group relative transform transition-transform duration-500 ease-in-out ${
        isExpanded ? "scale-105 cursor-default" : "scale-100 cursor-pointer"
      } flex flex-col items-center p-4 text-center`}
      onClick={() => !isExpanded && handleToggleExpand()}
      style={{
        width: "100%",
        maxWidth: "320px",
        minWidth: "220px",
      }}
    >
      {/* Role */}
      <p
        className={`my-2 flex w-[12em] items-center justify-center break-words text-center ${
          isExpanded ? "invisible" : "font-medium italic text-blue-500"
        }`}
        style={{
          fontSize: "clamp(14px, 1.2vw, 18px)",
          lineHeight: "1.5vw",
        }}
      >
        {member.role}
      </p>

      {/* Image */}
      <div
        className={`relative overflow-hidden rounded-2xl border border-black shadow-lg transition-transform duration-500 ease-in-out ${
          isExpanded ? "scale-110" : "scale-100"
        }`}
        style={{
          width: "100%",
          maxWidth: "260px",
          height: "260px",
          minHeight: "260px",
        }}
      >
        <img src={member.image} alt={`${member.name}'s photo`} className="h-full w-full rounded-t-2xl object-cover" />

        {/* "Learn More" Overlay */}
        {!isExpanded && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="text-sm font-semibold text-black underline sm:text-base md:text-lg">Learn More</span>
          </div>
        )}

        {/* Expanded Content with Left-Aligned Text & Scrollable Description */}
        {isExpanded && (
          <div
            className="absolute inset-0 flex flex-col bg-white p-4 transition-opacity duration-500 ease-in-out"
            onClick={handleToggleExpand} // Clicking anywhere except email closes the view
            style={{
              height: "100%",
              textAlign: "left",
              justifyContent: "start",
              overflowY: "auto",
            }}
          >
            <h3 className="text-lg font-bold">{member.role}</h3>
            <h4 className="text-md font-semibold">{member.name}</h4>
            <p className="text-sm text-gray-600">{member.major}</p>
            <a
              href={`mailto:${member.contact}`}
              className="text-sm text-blue-500 underline"
              onClick={(e) => e.stopPropagation()} // Prevents accidental closing when clicking email
            >
              {member.contact}
            </a>

            {/* Scrollable Description with Left Alignment */}
            <div
              className="mt-2 text-xs text-gray-800"
              style={{
                maxHeight: "100px",
                overflowY: "auto",
                whiteSpace: "normal",
              }}
            >
              {member.description}
            </div>
          </div>
        )}
      </div>

      {/* Name (Hidden when Expanded) */}
      <p className={`mt-2 text-lg sm:text-xl ${isExpanded ? "invisible" : "text-black"}`}>{member.name}</p>
    </div>
  );
};

export default BoardMemberCard;
