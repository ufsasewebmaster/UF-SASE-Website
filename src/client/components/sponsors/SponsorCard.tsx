import { cn } from "@/shared/utils";
import { imageUrls } from "@assets/imageUrls";

const typeStyles = {
  Diamond: { src: imageUrls["Diamond.png"], size: "h-[23%]", translateY: "-translate-y-1/4", rotate: "rotate-[-15deg]" },
  Gold: { src: imageUrls["Gold.png"], size: "h-[24%]", translateY: "-translate-y-1/3", rotate: "" },
  Silver: { src: imageUrls["Silver.png"], size: "h-[23%]", translateY: "-translate-y-1/3", rotate: "" },
  Bronze: { src: imageUrls["Bronze.png"], size: "h-[21%]", translateY: "-translate-y-1/3", rotate: "" },
} as const;

const styleBase = "absolute left-0 top-0 -translate-x-1/2";

type SponsorType = keyof typeof typeStyles;

const SponsorCard = ({
  companyName,
  image,
  shadowcolor,
  type: sponsorTier,
}: {
  image: string;
  companyName: string;
  type: string;
  shadowcolor: string;
}) => {
  const sponsorType = sponsorTier in typeStyles ? (sponsorTier as SponsorType) : "Bronze";

  return (
    <div className="flex h-full w-full flex-col" style={{ zIndex: 10 }}>
      <p
        className={cn(
          {
            "text-saseBlue": sponsorType === "Diamond",
            "text-amber-300": sponsorType === "Gold",
            "text-slate-400": sponsorType === "Silver",
            "text-amber-700": sponsorType === "Bronze",
          },
          `pb-2 text-center font-redhat text-4xl font-semibold`,
        )}
      >
        {sponsorType}
      </p>

      <div
        className={`relative flex h-full flex-col items-center rounded-2xl border-4 border-black bg-white p-1 ${shadowcolor} shadow-2xl duration-300 hover:scale-105`}
      >
        <img src={image} alt="Company Logo" className="h-5/6 w-full rounded-2xl" />
        <p className="pb-4 pt-4 text-center font-redhat text-3xl font-semibold">{companyName}</p>

        {sponsorType in typeStyles && (
          <img
            src={typeStyles[sponsorType].src}
            alt={`${sponsorType} Icon`}
            className={cn(styleBase, typeStyles[sponsorType].size, typeStyles[sponsorType].translateY, typeStyles[sponsorType].rotate || "")}
          />
        )}
      </div>
    </div>
  );
};

export default SponsorCard;
