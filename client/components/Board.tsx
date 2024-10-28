import React from "react";
import officer from "../assets/images/board_page/boardimage.png";
import boardGroup from "../assets/images/board_page/placeholder.png";

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

      {/* Executive Board Section */}
      <div className="container mx-auto my-12">
        <div className="text-center font-[Poppins]">
          <h2 className="mt-6 text-3xl font-semibold">Executive Board</h2>
          <div className="mt-5 flex justify-center gap-16">
            <div className="flex flex-col items-center p-4 text-center">
              <p className="my-2 text-2xl text-gray-500">President</p>
              <img
                src={officer} // placeholder
                className="h-50 w-50 overflow-hidden rounded-2xl border-[2px] border-black shadow-[5px_5px_0px_0px_rgb(61,137,196)]"
              />
              <p className="mt-4 text-2xl">Emely Chhu</p>
            </div>
            <div className="flex flex-col items-center p-4 text-center">
              <p className="my-2 text-2xl text-gray-500">
                Internal Vice President (IVP)
              </p>
              <img
                src={officer} // placeholder
                className="h-50 w-50 overflow-hidden rounded-2xl border-[2px] border-black shadow-[5px_5px_0px_0px_rgb(61,137,196)]"
              />
              <p className="mt-4 text-2xl">Sharika Khondaker</p>
            </div>
            <div className="flex flex-col items-center p-4 text-center">
              <p className="my-2 text-2xl text-gray-500">
                External Vice President (EVP)
              </p>
              <img
                src={officer} // placeholder
                className="h-50 w-50 overflow-hidden rounded-2xl border-[2px] border-black shadow-[5px_5px_0px_0px_rgb(61,137,196)]"
              />
              <p className="mt-4 text-2xl">Max Huang</p>
            </div>
          </div>
        </div>
      </div>

      {/* chair board */}
      <div className="mt-12 text-center font-[Poppins]">
        <h2 className="text-3xl font-semibold">Chair Board</h2>
        <hr className="w-7/8 mx-auto my-2 border-t-2 border-blue-500" />
        <div className="mt-6 flex justify-center gap-8"></div>
      </div>
    </div>
  );
};

export default Board;
