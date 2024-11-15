import StandInPicture from "@assets/home/board.png";
import InfoCard from "@components/programs/InfoCard";
import TestimonialCard from "@components/programs/TestimonialCard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/interns")({
  component: () => {
    return (
      <div className="mt-12 flex min-h-screen flex-col items-center bg-white font-[Poppins]">
        <div className="flex w-full max-w-7xl items-start px-4 py-8">
          <header className="mr-8 mt-10 flex items-center px-5">
            {/* Green Line and Text in Row */}
            <div className="mr-5 h-40 w-1.5 bg-saseGreen"></div>
            <h2 className="text-7xl font-semibold leading-tight text-gray-800">
              SASE
              <br />
              INTERNS
            </h2>
          </header>
          <InfoCard
            text={
              <>
                <strong>SASE Interns</strong> collaborate with other members to
                execute a project for the SASE community, honing your
                communication, event planning, and leadership skills. Throughout
                the process, interns will gain{" "}
                <strong>experience to add to your resume</strong> and talk about
                during job interviews. Interns will also obtain{" "}
                <strong>behind-the-scenes insights</strong> through board
                presentations and shadowing opportunities—valuable for future
                leadership roles in and out of SASE. Aside from projects,
                interns will have the chance to network and connect through{" "}
                <strong>interns-only</strong> socials and Board x Interns
                events.
              </>
            }
          />
        </div>
        {/* Placeholder Image */}
        <div className="w-full max-w-7xl px-4 py-8">
          <div className="mx-auto mb-24 w-full max-w-7xl px-4">
            <img
              src={StandInPicture}
              alt="Placeholder"
              className="w-full rounded-3xl border-4 border-saseGreen"
              style={{ height: "600px", objectFit: "cover" }}
            />
          </div>
          <header className="mb-6 flex max-w-7xl items-center px-5">
            <div className="mr-3 h-11 w-1.5 bg-saseGreen"></div>
            <h2 className="text-4xl text-gray-800">Testimonials</h2>
          </header>
          <TestimonialCard
            image={StandInPicture}
            text="SASE Interns was an incredible experience. I learned a lot about organizational, leadership, and planning skills and gained a lot of insight from SASE Board members. This program has greatly helped my professional development."
            name="First Last"
            title="2024 Intern"
          />
        </div>
      </div>
    );
  },
});
