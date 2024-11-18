import board from "@assets/home/board.png";
import briefcase from "@assets/home/briefcase.png";
import b_p from "@assets/home/bryan.png";
import dudes from "@assets/home/dudes.png";
import k_d from "@assets/home/kayleen.png";
import lightbulb from "@assets/home/lightbulb.png";
import logo from "@assets/home/logo.png";
import star_logo from "@assets/home/star_logo.png";
import v_l from "@assets/home/vincent.png";
import MemberCard from "@components/MemberCard";
import MissionCard from "@components/MissionCard";
import SponsorCard from "@components/SponsorCard";
import SponsorInfo from "@components/SponsorInfo";
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
          <div className="absolute w-full items-center p-8 pt-[30%] font-oswald text-3xl font-bold italic text-white sm:text-5xl lg:text-6xl xl:text-7xl 2xl:pl-32 2xl:pr-32 2xl:text-8xl">
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

        <div className="flex flex-col items-center bg-black p-12">
          <div className="relative w-9/12 rounded-2xl border-4 border-b-saseGreen border-l-saseGreen border-r-saseBlue border-t-saseBlue bg-gray-950 p-10">
            <h1 className="pb-12 font-oswald text-3xl font-medium text-white sm:text-5xl">
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
              className="absolute right-0 top-0 w-[20%] -translate-y-1/2 translate-x-1/3"
            />
          </div>
        </div>

        <div className="flex w-full flex-col items-center bg-saseGray p-12">
          <h1 className="pb-12 text-center font-oswald text-6xl font-medium">
            Our Mission
          </h1>
          <div className="grid gap-12 pl-4 pr-4 sm:grid-cols-1 md:grid-cols-3">
            <MissionCard
              image={briefcase}
              mission="Professional Development"
              text="To prepare Asian heritage students for success in the
                transnational, global business world."
              shadow="green"
            />
            <MissionCard
              image={dudes}
              mission="Diversity"
              text="To promote diversity and tolerance on campuses and in the
                workplace."
              shadow="blue"
            />
            <MissionCard
              image={lightbulb}
              mission="Community"
              text="To provide opportunities for its members to make contributions
                to their local communities."
              shadow="green"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-20 bg-white p-12 lg:grid-cols-3">
          <MemberCard
            image={v_l}
            name="Vincent Lin"
            role="President"
            textColor="blue"
          />
          <MemberCard
            image={b_p}
            name="Bryan Park"
            role="Internal Vice President"
            textColor="green"
          />
          <MemberCard
            image={k_d}
            name="Kayleen Diaz"
            role="External Vice President"
            textColor="blue"
          />
        </div>

        <div className="w-full bg-black p-12">
          <h1 className="w-full pb-12 text-center font-oswald text-6xl text-white">
            Our Values
          </h1>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            <MissionCard
              image={dudes}
              mission="Professional Development"
              text="Through our meetings, conferences, and events, we shape skills that will help our members succeed in the professional world."
              shadow="blue"
            />
            <MissionCard
              image={dudes}
              mission="Socials"
              text="We host multiple social events throughout the year, including a semesterly banquet, that give our members a chance to bond."
              shadow="blue"
            />
            <MissionCard
              image={dudes}
              mission="Service"
              text="We believe that it is important to make meaningful contributions to the community, so we organize service events for our members to join."
              shadow="blue"
            />
            <MissionCard
              image={dudes}
              mission="Sports"
              text="To facilitate bonding and interaction, we have a year-round intramural sports program with 10+ different sports that members can participate in. No experience required!"
              shadow="blue"
            />
            <MissionCard
              image={dudes}
              mission="Mentorship"
              text="To ensure each member has the personal and academic guidance they need, we organize a semesterly mentorship program. Keep an eye on our Instagram to apply!"
              shadow="blue"
            />
          </div>
        </div>

        <div className="bg-saseGray p-12">
          <h1 className="w-full pb-12 text-center font-oswald text-6xl font-medium">
            Sponsors
          </h1>
          <div className="grid grid-cols-1 gap-12 pl-8 pr-8 xl:grid-cols-[1fr_1fr]">
            <div className="flex flex-col items-center rounded-2xl border-4 border-black bg-white p-10 shadow-[12px_12px_0px_#7DC242]">
              <p className="font-redhat text-2xl">
                <span className="font-semibold">CHANGE!!!!! </span>
                Are you interested in becoming a partner with the{" "}
                <span className="font-semibold">
                  {" "}
                  UF Society of Asian Scientists and Engineers (SASE) Chapter
                </span>
                ?
                <br />
                <br />
                To get access to our{" "}
                <span className="font-semibold">sponsorship packet </span>
                please contact our External Vice President, Kayleen Diaz, at{" "}
                <span>
                  <a
                    href={`mailto:ufsase.evp@gmail.com`}
                    className="text-saseGreen underline"
                  >
                    ufsase.evp@gmail.com
                  </a>
                </span>
              </p>
              {/* <div className="mt-20 text-center duration-300 hover:scale-105">
                <a
                  href="public/UF SASE Sponsorship Packet.pdf"
                  className="p-4 rounded-full bg-saseBlue text-white font-redhat text-2xl"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Sponsorship Packet
                </a>
              </div> */}
            </div>

            <div className="flex h-3/4 flex-col gap-16 pl-8 pr-8">
              <div className="grid grid-cols-1 gap-20 sm:grid-cols-2">
                {SponsorInfo.map((sponsor) =>
                  sponsor.tier === "Diamond" ? (
                    <SponsorCard
                      key={sponsor.company}
                      image={sponsor.image}
                      companyName={sponsor.company}
                      type={sponsor.tier}
                    />
                  ) : null,
                )}
              </div>
              <p className="m-0 w-full text-center font-redhat text-2xl italic text-black">
                Current Featured Sponsors
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  },
});
