import arthrex from "@assets/sponsors/Arthrex.png";
import axogen from "@assets/sponsors/Axogen.png";
import blueorigin from "@assets/sponsors/BlueOriginLogo.png";
import headerImage from "@assets/sponsors/Board.png";
import fmglobal from "@assets/sponsors/FMGlobal.png";
import google from "@assets/sponsors/Google.png";
import johnson from "@assets/sponsors/J&J.png";
import sargentlundy from "@assets/sponsors/S&L.png";
import { createFileRoute } from "@tanstack/react-router";
import SponsorCard from "../components/SponsorCard";

export const Route = createFileRoute("/sponsors")({
  component: () => {
    return (
      <div className="flex flex-col items-center">
        <h1 className="pb-10 pt-16 font-oswald text-7xl font-medium">
          CURRENT SPONSORS
        </h1>

        <div className="flex w-2/3 flex-col items-center justify-center">
          <div className="w-100 grid grid-cols-1 items-stretch justify-items-center gap-24 border-t-8 border-saseGreen bg-gradient-to-b from-gray-100 to-white p-24 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
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
            <SponsorCard
              image={sargentlundy}
              companyName="Sargent & Lundy"
              type="Gold"
            />
            <SponsorCard image={axogen} companyName="Axogen" type="Gold" />
            <SponsorCard
              image={johnson}
              companyName="Johnson & Johnson"
              type="Silver"
            />
            <SponsorCard image={arthrex} companyName="Anthrex" type="Bronze" />
            <SponsorCard image={google} companyName="Google" type="Bronze" />
          </div>

          <div className="relative flex w-11/12 flex-col items-center justify-end border-t-8 border-saseGreen pt-10">
            <img src={headerImage} alt="" className="w-full" />
            <div className="absolute flex w-full flex-col justify-center bg-gradient-to-b from-transparent to-black pb-4">
              <p className="ml-12 mr-12 self-center border-l-8 border-saseGreen pl-4 font-redhat text-4xl font-medium text-white sm:text-lg md:text-xl lg:text-3xl xl:text-4xl">
                Become a partner of the{" "}
                <span className="text-saseGreen">
                  UF Society of Asian Scientists and Engineers (SASE)
                </span>{" "}
                Chapter
              </p>
              <br />
              <p className="ml-12 mr-12 self-center font-redhat text-2xl font-medium italic text-white sm:text-base md:text-lg lg:text-2xl xl:text-3xl">
                To view our sponsorship packet, or for any related questions,
                please contact our External Vice President, Kayleen Diaz, at{" "}
                <span className="text-saseGreen underline">
                  ufsase.evp@gmail.com
                </span>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  },
});
