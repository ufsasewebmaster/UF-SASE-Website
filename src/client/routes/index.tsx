import r_z from "@assets/board/ricky_zhang.jpeg";
import board from "@assets/home/board.png";
import briefcase from "@assets/home/briefcase.png";
import dudes from "@assets/home/dudes.png";
import lightbulb from "@assets/home/lightbulb.png";
import logo from "@assets/home/logo.png";
import star_logo from "@assets/home/star_logo.png";
import blueorigin from "@assets/sponsors/BlueOriginLogo.png";
import fmglobal from "@assets/sponsors/FMGlobal.png";
import MissionCard from "@components/MissionCard";
import SponsorCard from "@components/SponsorCard";
import { createFileRoute } from "@tanstack/react-router";

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
          <div className="absolute w-full items-center p-8 pt-[30%] font-redhat text-2xl italic text-white sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl">
            <h1 className="flex items-center">
              <span>S </span>
              <img
                src={logo}
                alt="SASE Logo"
                className="inline-block h-[1.5em] align-middle"
              />
              <span>CIETY OF ASIAN</span>
            </h1>
            <h1 className="text-right">SCIENTISTS & ENGINEERS</h1>
          </div>
        </div>

        <div className="flex flex-col items-center bg-black pb-12 pt-12">
          <div className="relative w-9/12 rounded-2xl border-4 border-b-saseGreen border-l-saseGreen border-r-saseBlue border-t-saseBlue bg-black p-10 opacity-50">
            <h1 className="pb-12 font-oswald text-5xl text-white">
              University of Florida Chapter
            </h1>

            {/* Video for sm-xl screens */}
            <iframe
              className="block aspect-video w-full pb-8 pl-2 pr-2 xl:hidden"
              src="https://www.youtube.com/embed/JV9HAUhVet8"
              title="UF SASE Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>

            {/* Video for xl+ screen */}
            <iframe
              className="float-right hidden aspect-video w-1/2 pb-2 pl-8 xl:block"
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
          <h1 className="pb-12 text-center font-oswald text-6xl font-medium">
            Our Mission
          </h1>
          <div className="grid gap-12 sm:grid-cols-1 md:grid-cols-3">
            <MissionCard
              image={briefcase}
              mission="Professional Development"
              text="To prepare Asian heritage students for success in the
                transnational, global business world."
            />
            <MissionCard
              image={dudes}
              mission="Diversity"
              text="To promote diversity and tolerance on campuses and in the
                workplace."
            />
            <MissionCard
              image={lightbulb}
              mission="Community"
              text="To provide opportunities for its members to make contributions
                to their local communities."
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-20 bg-white p-12 md:grid-cols-3">
          <div
            className="flex aspect-[4/3] w-auto flex-col justify-center rounded-2xl bg-cover bg-center"
            style={{ backgroundImage: `url(${r_z})` }}
          >
            <p className="pt-[125%]">First Last</p>
            <p>Sase Member</p>
            <p>Filler filler filler filler filler filler</p>
          </div>
          <div
            className="flex w-auto flex-col justify-center rounded-2xl bg-cover bg-center"
            style={{ backgroundImage: `url(${r_z})` }}
          >
            <p className="pt-[125%]">First Last</p>
            <p>Sase Member</p>
            <p>Filler filler filler filler filler filler</p>
          </div>
          <div
            className="flex w-auto flex-col justify-center rounded-2xl bg-cover bg-center"
            style={{ backgroundImage: `url(${r_z})` }}
          >
            <p className="pt-[125%]">First Last</p>
            <p>Sase Member</p>
            <p>Filler filler filler filler filler filler</p>
          </div>
        </div>

        <div className="h-96 w-full bg-black p-12">
          <h1 className="w-full text-center font-oswald text-6xl text-white">
            Our Values
          </h1>
        </div>

        <div className="bg-saseGray p-16" style={{ zIndex: 10 }}>
          <h1 className="w-full pb-10 text-center font-oswald text-6xl font-medium">
            Sponsors
          </h1>
          <div className="grid grid-cols-1 gap-20 xl:grid-cols-[1fr_1.5fr]">
            <div className="relative rounded-2xl border-4 border-black bg-white p-10">
              <p className="font-redhat text-2xl">
                CHANGE!!!! Are you interested in becoming a partner with the UF
                Society of Asian Scientists and Engineers (SASE) Chapter? Click
                the button below to download our sponsorship packet!
                <br /> <br />
                If you have any questions, please contact our External Vice
                President at
                <br /> <br />
                ufsase.evp@gmail.com
              </p>
              <div
                className="absolute left-[3%] top-[4%] h-full w-full rounded-2xl bg-saseGreen"
                style={{ zIndex: -1 }}
              ></div>
            </div>

            <div className="flex h-3/4 flex-col gap-16 pl-[8%] pr-[8%]">
              <div className="grid grid-cols-1 gap-20 sm:grid-cols-2">
                <SponsorCard
                  image={blueorigin}
                  companyName="Blue Origin"
                  type="Diamond"
                />
                <SponsorCard
                  image={fmglobal}
                  companyName="FM Global"
                  type="Diamond"
                />
              </div>
              <p className="m-0 w-full text-center font-redhat text-xl italic">
                Current Featured Sponsors
              </p>
            </div>
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
