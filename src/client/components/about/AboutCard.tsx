import logoImage from "@assets/about/sase_logo.png";
import React from "react";

const AboutCard = () => {
  return (
    <div className="relative w-4/5">
      {/* Shadow Card */}
      <div className="absolute left-5 top-5 h-full w-full rounded-lg bg-saseGreen"></div>

      {/* Main Text Card */}
      <div className="relative rounded-lg border-2 border-black bg-gray-100 p-6 text-base shadow-xl">
        <p className="mb-4 text-black">
          The{" "}
          <span className="font-semibold">
            Society of Asian Scientists and Engineers (SASE){" "}
          </span>
          was established in 2010 as a student organization dedicated to the
          advancement of Asian heritage scientists and engineers. Above all,
          SASE is a welcoming community of driven individuals that cultivates a
          unique balance between professional development and a supportive, fun
          community.
        </p>
        <p className="mb-4 text-black">
          Through our{" "}
          <span className="font-semibold">general body meetings</span>,{" "}
          <span className="font-semibold">socials</span>,
          <span className="font-semibold">workshops</span>, and{" "}
          <span className="font-semibold">internal mentorship program</span>, we
          aim to build our members’ relationships, skills and knowledge that
          will enable them to succeed. We also offer an
          <span className="font-semibold">
            {" "}
            intramural program (SASE Sports)
          </span>
          , an <span className="font-semibold">engineering team (SET)</span>,
          and a{" "}
          <span className="font-semibold">
            leadership development program (SASE Interns)
          </span>
          .
        </p>

        <img
          src={logoImage}
          alt="Logo"
          style={{ width: "175px", height: "175px" }}
          className="absolute -bottom-20 -right-20 object-contain"
        />
      </div>
    </div>
  );
};

export default AboutCard;
