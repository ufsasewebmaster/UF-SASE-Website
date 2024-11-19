import StandInPicture from "@assets/home/board.png";
import BoardPicture from "@components/programs/BoardPicture";
import ProgramCard from "@components/programs/ProgramCard";
import { createFileRoute } from "@tanstack/react-router";
import React from "react";

export const Route = createFileRoute("/programs")({
  component: () => {
    return (
      <div className="mt-12 flex min-h-screen flex-col items-center bg-white font-[Poppins]">
        <div className="w-full max-w-7xl px-4 py-8">
          <header className="mb-14 flex items-center px-5">
            <div className="mr-3 h-14 w-1.5 bg-saseGreen"></div>
            <h2 className="rounded-sm text-5xl font-semibold text-gray-800">
              PROGRAMS
            </h2>
          </header>
          <BoardPicture />
          <header className="mb-6 flex items-center px-5">
            <div className="mr-3 h-11 w-1.5 bg-saseGreen"></div>
            <h2 className="text-4xl text-gray-800">SASE Interns</h2>
          </header>
          <ProgramCard
            image={StandInPicture}
            text={
              <>
                <strong>SASE Interns</strong> collaborate directly with board
                members in committees to plan events for the SASE community.
                Interns gain a behind-the-scenes look at how SASE operates and,
                in the process, are given the opportunity to develop their{" "}
                <strong>professional</strong> and <strong>leadership</strong>{" "}
                skills.
              </>
            }
            link="/interns"
          />
          <header className="mb-6 flex items-center px-5">
            <div className="mr-3 h-11 w-1.5 bg-saseGreen"></div>
            <h2 className="text-4xl text-gray-800">Engineering Team (SET)</h2>
          </header>
          <ProgramCard
            image={StandInPicture}
            text={
              <>
                <strong>SASE Interns</strong> collaborate directly with board
                members in committees to plan events for the SASE community.
                Interns gain a behind-the-scenes look at how SASE operates and,
                in the process, are given the opportunity to develop their{" "}
                <strong>professional</strong> and <strong>leadership</strong>{" "}
                skills.
              </>
            }
            link="/set"
          />
          <header className="mb-6 flex items-center px-5">
            <div className="mr-3 h-11 w-1.5 bg-saseGreen"></div>
            <h2 className="text-4xl text-gray-800">Web Development Team</h2>
          </header>
          <ProgramCard
            image={StandInPicture}
            text={
              <>
                The <strong>SASE Web Development Team</strong> is a group of{" "}
                <strong>UI/UX</strong>, <strong>Frontend</strong>, and{" "}
                <strong>Backend</strong> developers working together to build
                and enhance the UF SASE website. This team offers a chance to{" "}
                <strong>expand technical skills</strong>, gain experience with{" "}
                <strong>agile practices</strong>, and make a real impact.{" "}
                <strong>All skill levels are welcome!</strong>
              </>
            }
            link="/webdev"
          />
          <header className="mb-6 flex items-center px-5">
            <div className="mr-3 h-11 w-1.5 bg-saseGreen"></div>
            <h2 className="text-4xl text-gray-800">SASE Sports</h2>
          </header>
          <ProgramCard
            image={StandInPicture}
            text={
              <>
                <strong>SASE Interns</strong> collaborate directly with board
                members in committees to plan events for the SASE community.
                Interns gain a behind-the-scenes look at how SASE operates and,
                in the process, are given the opportunity to develop their{" "}
                <strong>professional</strong> and <strong>leadership</strong>{" "}
                skills.
              </>
            }
            link="/sports"
          />
        </div>
      </div>
    );
  },
});
