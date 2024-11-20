import { imageUrls } from "@assets/imageUrls";
import boardInfo from "@components/BoardInfo";
import BoardMemberCard from "@components/BoardMemberCard";
import { createFileRoute } from "@tanstack/react-router";
import { seo } from "../utils/seo";

export const Route = createFileRoute("/board")({
  meta: () => [
    ...seo({
      title: "Board | UF SASE",
      description: "UF Society of Asian Scientists & Engineers",
      image: imageUrls["SASELogo.png"],
    }),
  ],
  component: () => {
    return (
      <div className="min-h-screen px-4 py-8 font-[Poppins] md:px-16">
        {/* title */}
        <div className="text-center">
          <h1 className="font-oswald text-7xl font-medium">BOARD</h1>
          <p className="mb-8 mt-8 text-2xl text-black">
            Meet our 2024-2025 SASE Board Members!
          </p>
          <hr className="w-7/8 mx-auto my-4 border-t-2 border-green-500" />
        </div>

        {/* group picture */}
        <div className="mb-8 mt-10 flex justify-center font-[Poppins]">
          <div className="w-full max-w-3xl overflow-hidden rounded-2xl border-[3px] border-black shadow-[10px_10px_0px_0px_rgb(110,167,211)]">
            <img src={imageUrls["BoardPic.jpeg"]} className="w-full" />
          </div>
        </div>
        <hr className="w-7/8 mb-10 mt-16 border-t-2 border-blue-500" />

        {boardInfo.map((section, idx) => (
          <div key={idx} className="mb-12">
            {section.section === "Chair Board" && (
              <hr className="w-7/8 my-10 border-t-2 border-green-500" />
            )}
            <h2 className="mb-6 text-center font-oswald text-5xl">
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
  },
});
