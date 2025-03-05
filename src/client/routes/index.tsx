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

        <div className="flex flex-col items-center bg-black p-12">
          <div className="relative w-9/12 rounded-2xl bg-gradient-to-r from-saseBlue via-[#7DC242] to-saseGreen p-[4px]">
            <div className="flex h-full flex-col rounded-2xl bg-gray-950 p-10">
              <h1 className="pb-12 font-oswald text-3xl font-medium text-white sm:text-5xl">University of Florida Chapter</h1>
              <div>
                <iframe
                  className="block aspect-video w-full pb-8 pl-2 pr-2 xl:hidden"
                  src="https://www.youtube.com/embed/JV9HAUhVet8"
                  title="UF SASE Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <iframe
                  className="float-right hidden aspect-video w-1/2 pb-2 pl-8 xl:block"
                  src="https://www.youtube.com/embed/JV9HAUhVet8"
                  title="UF SASE Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <p className="font-redhat text-xl text-white">
                  The <span className="font-semibold">Society of Asian Scientists & Engineers </span> is a vibrant and dynamic organization at the
                  University of Florida. We are committed to fostering meaningful connections across cultures and empowering{" "}
                  <span className="font-semibold">Asian Pacific Islander Desi American (APIDA) </span> professionals in{" "}
                  <span className="font-semibold">science and engineering</span>.
                </p>
                <br />
                <p className="font-redhat text-xl text-white">
                  Through <span className="font-semibold">engaging meetings and events</span>, we provide a nurturing environment where you can
                  acquire <span className="font-semibold">essential skills and knowledge </span> to excel in the professional world. Our{" "}
                  <span className="font-semibold">inclusive community </span> welcomes individuals from all majors, offering a friendly atmosphere to
                  help you secure internships, jobs, and network with like-minded peers. Beyond <span className="font-semibold">personal growth</span>
                  , we are dedicated to making a positive impact in our <span className="font-semibold">local communities</span>. By celebrating
                  diversity and embracing our heritage, we create <span className="font-semibold">opportunities </span>for our members to contribute
                  meaningfully to society.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mr-2 flex w-full flex-col items-center bg-saseGray p-2">
          <h1 className="w-full pb-10 text-center font-oswald text-6xl font-medium">Sponsors</h1>
          <div className="justify-left flex w-9/12 flex-wrap items-start gap-12">
            <div className="ml-1 flex w-full flex-col items-center rounded-2xl border-4 border-black bg-white p-10 shadow-[12px_12px_0px_#7DC242] sm:w-[45%]">
              <p className="p-4 text-left font-redhat text-xl sm:text-2xl">
                Are you interested in becoming a partner with the UF Society of Asian Scientists and Engineers (SASE) Chapter?
                <br />
                <br />
                To get access to our sponsorship packet, please contact our External Vice President at
                <a href="mailto:ufsase.evp@gmail.com" className="text-saseGreen underline">
                  {" "}
                  ufsase.evp@gmail.com
                </a>
                .
              </p>
            </div>
            <div className="flex w-full flex-col items-center gap-16 sm:w-[50%]">
              <div className="grid w-full grid-cols-1 gap-10 sm:grid-cols-2">
                {SponsorInfo.map((sponsor) =>
                  sponsor.tier === "Diamond" ? (
                    <SponsorCard
                      key={sponsor.company}
                      image={sponsor.image}
                      companyName={sponsor.company}
                      type={sponsor.tier}
                      shadowcolor={sponsor.shadow_color}
                    />
                  ) : null,
                )}
              </div>
              <p className="m-0 mt-[-30px] w-full text-center font-redhat text-2xl italic text-black xl:text-3xl">Current Featured Sponsors</p>
            </div>
          </div>
        </div>
      </div>
    );
  },
});
