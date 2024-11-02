import React, { useState } from "react";

const BoardMemberCard = ({ member }) => {
  const [isExpanded, setExpanded] = useState(false);

  const handleToggleExpand = () => {
    setExpanded(!isExpanded);
  };

  // check if role is single line or not
  const isSingleLine = member.role.length <= 20;

  return (
    <div
      className={`group relative transform transition-transform duration-500 ease-in-out ${
        isExpanded ? "scale-105" : "scale-100"
      } flex cursor-pointer flex-col items-center p-4 text-center`}
      onClick={handleToggleExpand}
    >
      {/* role */}
      <p
        className={`my-2 flex h-14 w-[200px] items-center justify-center break-words text-center text-2xl ${
          isExpanded ? "invisible" : "text-gray-500"
        }`}
        style={{
          minHeight: "3rem",
          lineHeight: "1.4rem",
          paddingTop: isSingleLine ? "0.5rem" : "0",
        }}
      >
        {member.role}
      </p>

      {/* image */}
      <div
        className={`relative overflow-hidden rounded-2xl border-[2px] border-black shadow-[5px_5px_0px_0px_rgb(61,137,196)] transition-transform duration-500 ease-in-out ${
          isExpanded ? "scale-110" : "scale-100"
        }`}
      >
        <img
          src={member.image}
          alt={`${member.name}'s photo`}
          className="h-full w-full rounded-2xl object-cover"
        />

        {/* learn more on hover */}
        {!isExpanded && (
          <div className="absolute inset-0 flex items-start justify-center bg-white bg-opacity-60 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="font-semibold text-black underline">
              Learn More
            </span>
          </div>
        )}

        {isExpanded && (
          <div className="absolute inset-0 flex flex-col bg-white bg-opacity-95 p-4 pt-2 transition-opacity duration-500 ease-in-out">
            <button
              className="absolute right-2 top-2 text-2xl text-gray-500 hover:text-black"
              onClick={(e) => {
                e.stopPropagation();
                setExpanded(false);
              }}
            >
              &times;
            </button>

            {/* info after hover */}
            <div className="mt-4 text-left">
              <h3 className="text-sm font-bold">{member.role}</h3>
              <h4 className="text-sm font-semibold">{member.name}</h4>
              <p className="text-sm text-gray-600">{member.major}</p>
              <p className="text-sm text-blue-500">{member.contact}</p>
            </div>

            {/* description of member */}
            <div className="flex flex-grow items-end justify-center">
              <p className="mt-4 text-center text-sm text-gray-800">
                {member.description}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* text turns invisible when it gets expanded */}
      <p className={`mt-4 text-2xl ${isExpanded ? "invisible" : "text-black"}`}>
        {member.name}
      </p>
    </div>
  );
};

export default BoardMemberCard;
