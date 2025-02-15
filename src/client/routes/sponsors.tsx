import SponsorInfo from "@/client/components/sponsors/SponsorInfo";
import { imageUrls } from "@assets/imageUrls";
import SponsorCard from "@components/sponsors/SponsorCard";
import { createFileRoute } from "@tanstack/react-router";
import { seo } from "../utils/seo";

export const Route = createFileRoute("/sponsors")({
  meta: () => [
    ...seo({
      title: "Sponsors | UF SASE",
      description: "UF Society of Asian Scientists & Engineers",
      image: imageUrls["SASELogo.png"],
    }),
  ],
  component: () => {
    return (
      <div className="flex flex-col items-center">
        <h1 className="pb-10 pt-16 text-center font-oswald text-6xl font-medium sm:text-7xl">CURRENT SPONSORS</h1>

        <div className="flex w-full flex-col items-center justify-center sm:w-2/3">
          <div className="w-100 grid grid-cols-1 items-stretch justify-items-center gap-24 border-t-8 border-saseGreen bg-gradient-to-b from-gray-100 to-white p-24 lg:grid-cols-2 xl:grid-cols-3">
            {SponsorInfo.map((sponsor) => (
              <SponsorCard
                key={sponsor.company}
                image={sponsor.image}
                companyName={sponsor.company}
                type={sponsor.tier}
                shadowcolor={sponsor.shadow_color}
                link={sponsor.link}
              />
            ))}
          </div>

          <div className="relative flex w-11/12 flex-col items-center border-t-8 border-saseGreen pb-8 pt-8">
            <p className="mb-8 w-full self-center border-l-8 border-saseGreen pl-4 font-oswald text-xl font-medium text-black sm:text-4xl md:text-5xl">
              Become a partner of the <span className="text-saseGreen">UF Society of Asian Scientists and Engineers (SASE)</span> Chapter
            </p>
            <div className="relative w-full">
              <img src={imageUrls["SponsorsWorkshop.png"]} alt="Sponsors Workshop" className="w-full" />
              <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black to-transparent"></div>
            </div>
            <p className="absolute bottom-[10%] pl-4 pr-4 text-center font-redhat text-base font-medium italic text-white md:text-xl lg:text-2xl xl:text-3xl">
              To view our sponsorship packet, or for any related questions, please contact our External Vice President, Kayleen Diaz, at{" "}
              <span>
                <a href={`mailto:ufsase.evp@gmail.com`} className="text-saseGreen underline">
                  ufsase.evp@gmail.com
                </a>
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    );
  },
});
