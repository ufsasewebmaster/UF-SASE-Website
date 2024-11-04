import React from "react";
import officer from "../assets/images/board_page/boardimage.png";
import boardGroup from "../assets/images/board_page/placeholder.png";
import BoardMemberCard from "./BoardMemberCard";

const teamData = [
  {
    section: "Executive Board",
    members: [
      {
        name: "Vincent Lin",
        role: "President",
        image: officer,
        major: "3rd Year Computer Engineering",
        contact: "ufsase.p@gmail.com",
        description: "description",
      },
      {
        name: "Bryan Park",
        role: "Internal Vice President (IVP)",
        image: officer,
        major: "major",
        contact: "contact",
        description: "description",
      },
      {
        name: "Kayleen Diaz",
        role: "External Vice President (EVP)",
        image: officer,
        major: "major",
        contact: "contact",
        description: "description",
      },
      {
        name: "Gayatri Baskaran",
        role: "Treasurer",
        image: officer,
        major: "major",
        contact: "contact",
        description: "description",
      },
      {
        name: "Rachel Young",
        role: "Secretary",
        image: officer,
        major: "major",
        contact: "contact",
        description: "description",
      },
      {
        name: "Kimmy Chu",
        role: "Public Relations",
        image: officer,
        major: "major",
        contact: "contact",
        description: "description",
      },
    ],
  },
  {
    section: "Chair Board",
    members: [
      {
        name: "Ricky Zhang",
        role: "Webmaster",
        image: officer,
        major: "major",
        contact: "contact",
        description: "description",
      },
      {
        name: "Amanda Jiang",
        role: "Advancement",
        image: officer,
        major: "major",
        contact: "contact",
        description: "description",
      },
      {
        name: "Chloe Bai",
        role: "Fundraising",
        image: officer,
        major: "major",
        contact: "contact",
        description: "description",
      },
      {
        name: "Anna Lim",
        role: "Member Involvement",
        image: officer,
        major: "major",
        contact: "contact",
        description: "description",
      },
      {
        name: "Justin Doan",
        role: "Member Involvement",
        image: officer,
        major: "major",
        contact: "contact",
        description: "description",
      },
      {
        name: "Helen Zou",
        role: "Historian",
        image: officer,
        major: "major",
        contact: "contact",
        description: "description",
      },
      {
        name: "Adriel Poon",
        role: "Multimedia",
        image: officer,
        major: "major",
        contact: "contact",
        description: "description",
      },
      {
        name: "Reyna Simpson",
        role: "Multimedia",
        image: officer,
        major: "major",
        contact: "contact",
        description: "description",
      },
      {
        name: "Tabitha Gottipati",
        role: "Network",
        image: officer,
        major: "major",
        contact: "contact",
        description: "description",
      },
      {
        name: "Aahan Dwivedi",
        role: "Science",
        image: officer,
        major: "major",
        contact: "contact",
        description: "description",
      },
      {
        name: "Leann Tang",
        role: "Service",
        image: officer,
        major: "major",
        contact: "contact",
        description: "description",
      },
      {
        name: "Sophia Dong",
        role: "Social",
        image: officer,
        major: "major",
        contact: "contact",
        description: "description",
      },
      {
        name: "Jessica Lu",
        role: "Sports Coordinator",
        image: officer,
        major: "major",
        contact: "contact",
        description: "description",
      },
      {
        name: "Alexander Lou",
        role: "Sports Coordinator",
        image: officer,
        major: "major",
        contact: "contact",
        description: "description",
      },
      {
        name: "Manav Sanghvi",
        role: "Technical",
        image: officer,
        major: "major",
        contact: "contact",
        description: "description",
      },
      {
        name: "Kevin Tang",
        role: "Technical",
        image: officer,
        major: "major",
        contact: "contact",
        description: "description",
      },
    ],
  },
];

const Board: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 font-[Poppins] md:px-16">
      {/* title */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">Board</h1>
        <p className="mt-4 text-xl font-bold text-gray-600">
          Meet our 2023-2024 SASE Board Members!
        </p>
        <hr className="w-7/8 mx-auto my-4 border-t-2 border-green-500" />
      </div>

      {/* group picture */}
      <div className="mb-8 mt-10 flex justify-center font-[Poppins]">
        <div className="w-full max-w-3xl overflow-hidden rounded-2xl border-[3px] border-black shadow-[10px_10px_0px_0px_rgb(110,167,211)]">
          <img
            src={boardGroup} // placeholder
            className="w-full"
          />
        </div>
      </div>
      <hr className="w-7/8 mx-auto my-2 mt-10 border-t-2 border-blue-500" />

      {teamData.map((section, idx) => (
        <div key={idx} className="mb-12">
          <h2 className="mb-6 text-center text-3xl font-semibold">
            {section.section}
          </h2>
          <div className="flex flex-wrap justify-center gap-10">
            {section.members.map((member, idx) => (
              <BoardMemberCard key={idx} member={member} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Board;
