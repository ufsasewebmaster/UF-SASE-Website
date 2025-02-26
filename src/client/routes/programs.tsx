import InternsCard from "@assets/programs/SaseInternsCard.png";
import SaseSportsCard from "@assets/programs/SaseSportsCard.png";
import SetCard from "@assets/programs/SetCard.png";
import WebDevCard from "@assets/programs/WebDevCard.png";
import BoardPicture from "@components/programs/BoardPicture";
import ProgramCard from "@components/programs/ProgramCard";
import { createFileRoute } from "@tanstack/react-router";
import React from "react";

export const Route = createFileRoute("/programs")({
  component: () => {
    return (
      <div className="mt-12 flex min-h-screen flex-col items-center bg-white">
        <div className="w-full max-w-7xl px-4 py-8">
          <header className="mb-14 flex items-center px-5">
            <div className="mr-3 h-14 w-1.5 bg-saseGreen"></div>
            <h2 className="rounded-sm font-oswald text-5xl font-semibold text-gray-800">PROGRAMS</h2>
          </header>
          <BoardPicture />
          <header className="mb-6 flex items-center px-5">
            <div className="mr-3 h-11 w-1.5 bg-saseGreen"></div>
            <h2 className="font-oswald text-4xl text-gray-800">SASE Interns</h2>
          </header>
          <ProgramCard
            image={InternsCard}
            text={
              <>
                <strong>SASE Interns</strong> collaborate directly with board members in committees to plan events for the SASE community. Interns
                gain a behind-the-scenes look at how SASE operates and, in the process, are given the opportunity to develop their{" "}
                <strong>professional</strong> and <strong>leadership</strong> skills.
              </>
            }
            link="/interns"
          />
          <header className="mb-6 flex items-center px-5">
            <div className="mr-3 h-11 w-1.5 bg-saseGreen"></div>
            <h2 className="font-oswald text-4xl text-gray-800">Engineering Team (SET)</h2>
          </header>
          <ProgramCard
            image={SetCard}
            text={
              <>
                The <strong>SASE Engineering Team</strong> works together on a yearlong project to explore technical creativity and problem-solving.
                Members gain hands-on experience, sharpen engineering and collaboration skills, and build impactful projects while growing in a
                supportive team environment.
              </>
            }
            link="/set"
          />
          <header className="mb-6 flex items-center px-5">
            <div className="mr-3 h-11 w-1.5 bg-saseGreen"></div>
            <h2 className="font-oswald text-4xl text-gray-800">Web Development Team</h2>
          </header>
          <ProgramCard
            image={WebDevCard}
            text={
              <>
                The <strong>SASE Web Development Team</strong> brings together UI/UX, Frontend, and Backend members to develop and enhance the UF SASE
                website. Team members gain hands-on experience with agile workflows and collaborate to create a self-hosted platform, sharpening
                technical and teamwork skills along the way.
              </>
            }
            link="/webdev"
          />
          <header className="mb-6 flex items-center px-5">
            <div className="mr-3 h-11 w-1.5 bg-saseGreen"></div>
            <h2 className="font-oswald text-4xl text-gray-800">SASE Sports</h2>
          </header>
          <ProgramCard
            image={SaseSportsCard}
            text={
              <>
                <strong>SASE Intramurals</strong> offer sports like Volleyball, Soccer, Ultimate Frisbee, and Pickleball year-round. It’s a fun way to
                meet new people, stay active, and enjoy friendly competition—no experience needed!
              </>
            }
            link="/sports"
          />
        </div>
      </div>
    );
  },
});
