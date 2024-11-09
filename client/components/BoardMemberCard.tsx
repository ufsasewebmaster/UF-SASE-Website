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

  // check if role is single line or not
  const isSingleLine = member.role.length <= 20;

  return (
    <div
      className={`group relative transform transition-transform duration-500 ease-in-out ${
        isExpanded ? "scale-105 cursor-default" : "scale-100 cursor-pointer"
      } flex flex-col items-center p-4 text-center`}
      onClick={() => !isExpanded && handleToggleExpand()}
      style={{
        width: "22vw",
        maxWidth: "22vw",
      }}
    >
      {/* role */}
      <p
        className={`my-2 flex h-[3.5vw] w-[12em] items-center justify-center break-words text-center ${
          isExpanded ? "invisible" : "text-blue-500 font-medium italic"
        }`}
        style={{
          fontSize: "1.4vw",
          lineHeight: "1.8vw",
          paddingTop: isSingleLine ? "0.5vw" : "0",
        }}
      >
        {member.role}
      </p>

      {/* image */}
      <div
        className={`relative overflow-hidden rounded-2xl border-[0.15vw] border-black shadow-[0.5vw_0.5vw_0px_0px_rgb(61,137,196)] transition-transform duration-500 ease-in-out ${
          isExpanded ? "scale-110" : "scale-100"
        }`}
        style={{
          height: "20vw",
          width: "20vw",
        }}
      >
        <img
          src={member.image}
          alt={`${member.name}'s photo`}
          className="h-full w-full object-cover"
        />

        {/* learn more */}
        {!isExpanded && (
          <div className="absolute inset-0 flex items-start justify-center bg-white bg-opacity-60 p-[1vw] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="font-semibold text-black underline text-[1.2vw]">
              Learn More
            </span>
          </div>
        )}

        {isExpanded && (
          <div className="absolute inset-0 flex flex-col bg-white bg-opacity-95 p-[1vw] pt-[0.5vw] transition-opacity duration-500 ease-in-out">
            <button
              className="absolute right-[1vw] top-[1vw] text-[1.5vw] text-gray-500 hover:text-black cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setExpanded(false);
              }}
            >
              &times;
            </button>

            {/* info once expanded */}
            <div className="mt-[1.5vw] text-left">
              <h3 className="text-[1.2vw] font-bold">{member.role}</h3>
              <h4 className="text-[1vw] font-semibold">{member.name}</h4>
              <p className="text-[0.9vw] text-gray-600">{member.major}</p>
              <a
                href={`mailto:${member.contact}`}
                className="text-[0.9vw] text-blue-500 underline"
              >
                {member.contact}
              </a>
            </div>

            {/* description */}
            <div className="flex flex-grow items-end justify-center">
              <p className="mt-[1.5vw] text-center text-[0.9vw] text-gray-800">
                {member.description}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* role/name turns invisible on click of learn more */}
      <p
        className={`mt-[1.5vw] ${
          isExpanded ? "invisible" : "text-black"
        }`}
        style={{ fontSize: "1.6vw" }}
      >
        {member.name}
      </p>
    </div>
  );
};

export default BoardMemberCard;
