import { createFileRoute } from "@tanstack/react-router";
import board from "../assets/home/board.png";
import briefcase from "../assets/home/briefcase.png";
import dudes from "../assets/home/dudes.png";
import lightbulb from "../assets/home/lightbulb.png";
import logo from "../assets/home/logo.png";
import star_logo from "../assets/home/star_logo.png";
import MissionCard from "../components/MissionCard";

export const Route = createFileRoute("/")({
  component: () => {
    return (
      <div className="flex flex-col items-center">
        <div className="flex w-full flex-col items-center">
          <img
            src={board}
            alt="2023-2024 SASE Board"
            className="relative h-auto w-full"
          />
          <div className="absolute w-full items-center p-10 pt-[30%] font-redhat italic text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl">
            <h1 className="flex items-center">
              <span className="">S</span>
              <img src={logo} alt="SASE Logo" className="h-auto" />
              <span>CIETY OF ASIAN</span> <br />
            </h1>
            <h1 className="pr-12 text-right">SCIENTISTS & ENGINEERS</h1>
          </div>
        </div>

        <div className="flex flex-col items-center bg-black p-12">
          <div className="relative w-8/12 rounded-2xl border-4 border-b-saseGreen border-l-saseGreen border-r-saseBlue border-t-saseBlue bg-black p-12 opacity-50">
            <h1 className="pb-12 font-oswald text-5xl text-white">
              University of Florida Chapter
            </h1>
            <iframe
              className="float-right aspect-video w-1/2 pb-2 pl-8"
              src="https://www.youtube.com/embed/JV9HAUhVet8"
              title="UF SASE Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <p className="font-redhat text-2xl text-white">
              The Society of Asian Scientists & Engineers is a vibrant and
              dynamic organization at the University of Florida. We are
              committed to fostering meaningful connections across cultures and
              empowering Asian Pacific Islander Desi American (APIDA)
              professionals in science and engineering.
            </p>
            <br />
            <p className="font-redhat text-2xl text-white">
              Through engaging meetings and events, we provide a nurturing
              environment where you can acquire essential skills and knowledge
              to excel in the professional world. Our inclusive community
              welcomes individuals from all majors, offering a friendly
              atmosphere to help you secure internships, jobs, and network with
              like-minded peers. Beyond personal growth, we are dedicated to
              making a positive impact in our local communities. By celebrating
              diversity and embracing our heritage, we create opportunities for
              our members to contribute meaningfully to society.
            </p>
            <img
              src={star_logo}
              alt="SASE Logo"
              className="absolute right-0 top-0 w-[25%] translate-x-[30%] translate-y-[-40%] transform lg:w-[20%]"
            />
          </div>
        </div>

        <div
          className="flex w-full flex-col items-center bg-saseGray pb-10 pl-20 pr-20 pt-10"
          style={{ zIndex: -1 }}
        >
          <h1 className="pb-12 font-oswald text-6xl italic">Our Mission</h1>
          <div className="grid gap-12 sm:grid-cols-1 md:grid-cols-3">
            <MissionCard
              image={briefcase}
              mission="Professional Development"
              text="To prepare Asian heritage students for success in the
                transnational, global business world"
            />
            <MissionCard
              image={dudes}
              mission="Diversity"
              text="To promote diversity and tolerance on campuses and in the
                workplace"
            />
            <MissionCard
              image={lightbulb}
              mission="Community"
              text="To provide opportunities for its members to make contributions
                to their local communities"
            />
          </div>
        </div>

        {/* <h1 className="mb-4 text-3xl font-bold">Our Values</h1> */}
        {/* <div className="mb-12 grid grid-cols-2">
          <img
            className="w-100"
            src={professionalDevelopment}
            alt="Professional Development Image"
          />
          <div className="ml-4 mr-4 flex flex-col items-center justify-center gap-12">
            <p className="mb-4 text-2xl font-bold">Professional Development</p>
            <p className="mb-4 text-lg">
              Through our meetings, conferences, and events, we shape skills
              that will help our members succeed in the professional world.
            </p>
          </div>
          <div className="ml-4 mr-4 flex flex-col items-center justify-center gap-12">
            <p className="mb-4 text-2xl font-bold">Socials</p>
            <p className="mb-4 text-lg">
              We host multiple social events throughout the year, including a
              semesterly banquet, that give our members a chance to bond.
            </p>
          </div>
          <img
            src={professionalDevelopment}
            alt="Professional Development Image"
          />
          <img
            src={professionalDevelopment}
            alt="Professional Development Image"
          />
          <div className="ml-4 mr-4 flex flex-col items-center justify-center gap-12">
            <p className="mb-4 text-2xl font-bold">Service</p>
            <p className="mb-4 text-lg">
              We believe that it is important to make meaningful contributions
              to the community, so we organize service events for our members to
              join.
            </p>
          </div>
          <div className="ml-4 mr-4 flex flex-col items-center justify-center gap-12">
            <p className="mb-4 text-2xl font-bold">Sports</p>
            <p className="mb-4 text-lg">
              We believe that it is important to make meaningful contributions
              to the community, so we organize service events for our members to
              join.
            </p>
          </div>
          <img
            src={professionalDevelopment}
            alt="Professional Development Image"
          />
          <img
            src={professionalDevelopment}
            alt="Professional Development Image"
          />
          <div className="ml-4 mr-4 flex flex-col items-center justify-center gap-12">
            <p className="mb-4 text-2xl font-bold">Mentorship</p>
            <p className="mb-4 text-lg">
              To ensure each member has the personal and academic guidance they
              need, we organize a semesterly mentorship program. Keep an eye on
              our Instagram to apply!
            </p>
          </div>
        </div> */}
      </div>
    );
  },
});
