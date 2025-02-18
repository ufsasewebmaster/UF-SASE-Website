import MemberCard from "@/client/components/home/MemberCard";
import MissionCard from "@/client/components/home/MissionCard";
import SponsorInfo from "@/client/components/sponsors/SponsorInfo";
import BoardPic from "@assets/home/Board.png";
import { imageUrls } from "@assets/imageUrls";
import EmblaCarousel from "@components/home/Carousel";
import SponsorCard from "@components/sponsors/SponsorCard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => {
    return (
      <div className="flex flex-col items-center">
        <div className="flex w-full flex-col items-center">
          <img src={BoardPic} alt="2023-2024 SASE Board" className="relative h-auto w-full" />
          <div className="absolute w-full items-center p-8 pt-[35%] font-oswald text-3xl font-bold italic text-white sm:text-5xl lg:text-6xl xl:text-7xl">
            <h1 className="flex w-full items-center pl-[5%] sm:pl-[10%]">
              <span>S </span>
              <img src={imageUrls["WhiteLogo.png"]} alt="SASE Logo" className="inline-block h-[1.5em] align-middle" />
              <span>CIETY OF ASIAN</span>
            </h1>
            <h1 className="w-full pr-[5%] text-right sm:pr-[10%]">SCIENTISTS & ENGINEERS</h1>
          </div>
        </div>

        <div className="flex flex-col items-center bg-black px-0 py-14 md:px-8 lg:px-12">
          <div className="relative w-9/12 rounded-2xl bg-gradient-to-r from-saseBlue via-[#7DC242] to-saseGreen p-[4px]">
            <div className="flex h-full flex-col rounded-2xl bg-gray-950 p-4 text-center lg:p-10 lg:text-start">
              <h1 className="pb-12 font-oswald text-3xl font-medium text-white sm:text-5xl">University of Florida Chapter</h1>
              <div>
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
                <p className="font-redhat text-lg text-white md:text-xl">
                  The <span className="font-semibold">Society of Asian Scientists & Engineers </span> is a vibrant and dynamic organization at the
                  University of Florida. We are committed to fostering meaningful connections across cultures and empowering{" "}
                  <span className="font-semibold">Asian Pacific Islander Desi American (APIDA) </span>
                  professionals in <span className="font-semibold">science and engineering</span>.
                </p>
                <br />
                <p className="font-redhat text-lg text-white md:text-xl">
                  Through <span className="font-semibold">engaging meetings and events</span>, we provide a nurturing environment where you can
                  acquire <span className="font-semibold">essential skills and knowledge </span>
                  to excel in the professional world. Our <span className="font-semibold">inclusive community </span>
                  welcomes individuals from all majors, offering a friendly atmosphere to help you secure internships, jobs, and network with
                  like-minded peers. Beyond <span className="font-semibold">personal growth</span>, we are dedicated to making a positive impact in
                  our <span className="font-semibold">local communities</span>. By celebrating diversity and embracing our heritage, we create{" "}
                  <span className="font-semibold">opportunities </span>for our members to contribute meaningfully to society.
                </p>
              </div>
              <img
                src={imageUrls["SASELogoStar.png"]}
                alt="SASE Logo"
                className="absolute right-0 top-0 w-[20%] -translate-y-1/2 translate-x-1/3 rotate-12 2xl:w-[10%]"
              />
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col items-center bg-saseGray p-12">
          <h1 className="pb-12 text-center font-oswald text-6xl font-medium">Our Mission</h1>
          <div className="grid gap-12 pl-4 pr-4 sm:grid-cols-1 md:grid-cols-3">
            <MissionCard
              image={imageUrls["Briefcase.png"]}
              mission="Professional Development"
              text="To prepare Asian heritage students for success in the
                transnational, global business world."
              shadow="green"
            />
            <MissionCard
              image={imageUrls["People.png"]}
              mission="Diversity"
              text="To promote diversity and tolerance on campuses and in the
                workplace."
              shadow="blue"
            />
            <MissionCard
              image={imageUrls["Lightbulb.png"]}
              mission="Community"
              text="To provide opportunities for its members to make contributions
                to their local communities."
              shadow="green"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-20 bg-white p-12 lg:grid-cols-3">
          <MemberCard image={imageUrls["President.jpeg"]} name="Vincent Lin" role="President" textColor="blue" quote="Love the SASE Community :)" />
          <MemberCard
            image={imageUrls["InternalVicePresident.jpeg"]}
            name="Bryan Park"
            role="Internal Vice President"
            textColor="green"
            quote="I love SASE <3"
          />
          <MemberCard
            image={imageUrls["ExternalVicePresident.jpeg"]}
            name="Kayleen Diaz"
            role="External Vice President"
            textColor="blue"
            quote="Grow professionally with SASE! :D"
          />
        </div>

        <div className="w-full bg-black p-10">
          <h1 className="w-full pb-12 text-center font-oswald text-6xl text-white">Our Values</h1>
          <EmblaCarousel />
        </div>

        <div className="flex w-full flex-col items-center bg-saseGray p-12">
          <h1 className="w-full pb-12 text-center font-oswald text-6xl font-medium">Sponsors</h1>
          <div className="flex w-9/12 flex-col items-center gap-12">
            <div className="flex w-full flex-col items-center rounded-2xl border-4 border-black bg-white p-10 shadow-[12px_12px_0px_#7DC242]">
              <p className="p-4 font-redhat text-xl sm:text-2xl">
                <span className="text-2xl font-semibold sm:text-3xl">CHANGE!!!!! </span>
                Are you interested in becoming a partner with the{" "}
                <span className="font-semibold"> UF Society of Asian Scientists and Engineers (SASE) Chapter</span>
                ?
                <br />
                <br />
                To get access to our <span className="font-semibold">sponsorship packet </span>
                please contact our External Vice President, Kayleen Diaz, at{" "}
                <div className="flex w-full items-center">
                  <a href={`mailto:ufsase.evp@gmail.com`} className="text-saseGreen underline">
                    ufsase.evp@gmail.com
                  </a>
                  <a
                    href="/sponsors"
                    className="ml-auto rounded-lg bg-saseGreen px-4 py-2 font-bold text-white transition duration-300 hover:bg-[#486f2b]"
                  >
                    Sponsors
                  </a>
                </div>
              </p>
            </div>

            <div className="flex w-full flex-col items-center gap-16">
              <div className="grid w-7/12 grid-cols-1 gap-20 sm:grid-cols-2">
                {SponsorInfo.map((sponsor) =>
                  sponsor.tier === "Diamond" ? (
                    <SponsorCard
                      key={sponsor.company}
                      image={sponsor.image}
                      companyName={sponsor.company}
                      type={sponsor.tier}
                      shadowcolor={sponsor.shadow_color}
                      link={sponsor.link}
                    />
                  ) : null,
                )}
              </div>
              <p className="m-0 w-full text-center font-redhat text-2xl italic text-black xl:text-3xl">Current Featured Sponsors</p>
            </div>
          </div>
        </div>
      </div>
    );
  },
});
