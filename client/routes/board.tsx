import { createFileRoute } from "@tanstack/react-router";
import boardGroup from "@assets/board/placeholder.png";
import BoardMemberCard from "@components/BoardMemberCard";
import boardInfo from "@components/BoardInfo";

export const Route = createFileRoute("/board")({
  component: () => {
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
              src={boardGroup}
              className="w-full"
            />
          </div>
        </div>
        <hr className="w-7/8 mx-auto my-2 mt-10 border-t-2 border-blue-500" />
  
        {boardInfo.map((section, idx) => (
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
  }
});
