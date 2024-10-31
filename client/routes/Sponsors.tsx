import { createFileRoute } from "@tanstack/react-router";
import arthrex from "../assets/images/sponsors_page/Arthrex.png";
import axogen from "../assets/images/sponsors_page/Axogen.png";
import blueorigin from "../assets/images/sponsors_page/BlueOriginLogo.png";
import fmglobal from "../assets/images/sponsors_page/FMGlobal.png";
import google from "../assets/images/sponsors_page/Google.png";
import headerImage from "../assets/images/sponsors_page/Header_Bg.png";
import johnson from "../assets/images/sponsors_page/J&J.png";
import sargentlundy from "../assets/images/sponsors_page/S&L.png";
import SponsorCard from "../components/SponsorCard";

export const Route = createFileRoute("/sponsors")({
  component: () => {
    return (
      <div className="flex flex-col items-center">
        <h1 className="font-oswald mb-10 mt-16 text-7xl font-medium">
          CURRENT SPONSORS
        </h1>
        <div className="w-2/3">
          <div className="w-100 grid grid-cols-1 items-stretch justify-items-center gap-24 border-t-8 border-saseGreen bg-gradient-to-b from-gray-100 to-white p-24 md:grid-cols-2 xl:grid-cols-3">
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
        </div>

        <div className="relative w-2/3">
          <img
            src={headerImage}
            alt=""
            className="flex h-auto w-full flex-col items-center"
          />
          <div className="absolute top-2/3 m-0 flex flex-col items-center bg-gradient-to-t from-black to-transparent p-20 pt-5">
            <p className="font-redhat border-l-8 border-saseGreen pl-4 text-4xl font-medium text-white">
              Become a partner of the{" "}
              <p className="inline-block text-saseGreen">
                UF Society of Asian Scientists and Engineers (SASE)
              </p>{" "}
              Chapter
            </p>
            <br></br>
            <p className="font-redhat border-l-8 border-black pl-4 text-2xl font-medium italic text-white">
              To view our sponsorship packet, or for any related questions,
              please contact our External Vice President, Kayleen Diaz, at{" "}
              <p className="inline-block text-saseGreen underline">
                ufsase.evp@gmail.com
              </p>
            </p>
          </div>
        </div>
      </div>
    );
  },
});
