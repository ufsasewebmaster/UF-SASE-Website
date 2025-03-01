import { cn } from "@/shared/utils";
import { imageUrls } from "@assets/imageUrls";
import { Link } from "@tanstack/react-router";

interface SponsorStyle {
  src: string;
  size: string;
  translateY: string;
  rotate?: string;
}

type SponsorType = "Diamond" | "Gold" | "Silver" | "Bronze";

const typeStyles: Record<SponsorType, SponsorStyle> = {
  Diamond: {
    src: imageUrls["Diamond.png"],
    size: "h-[30%]",
    translateY: "-translate-y-1/3",
    rotate: "rotate-[-15deg]",
  },
  Gold: {
    src: imageUrls["Gold.png"],
    size: "h-[30%]",
    translateY: "-translate-y-1/3",
  },
  Silver: {
    src: imageUrls["Silver.png"],
    size: "h-[30%]",
    translateY: "-translate-y-1/3",
  },
  Bronze: {
    src: imageUrls["Bronze.png"],
    size: "h-[30%]",
    translateY: "-translate-y-1/3",
  },
};

interface SponsorCardProps {
  companyName: string;
  image: string;
  link: string;
  shadowcolor: string;
  type: SponsorType;
}

const SponsorCard = ({ companyName, image, link, shadowcolor, type }: SponsorCardProps) => {
  return (
    <div className="flex h-full w-full flex-col" style={{ zIndex: 10 }}>
      <p
        className={cn(
          {
            "text-saseBlue": type === "Diamond",
            "text-amber-300": type === "Gold",
            "text-slate-400": type === "Silver",
            "text-amber-700": type === "Bronze",
          },
          "pb-2 text-center font-redhat text-4xl font-semibold",
        )}
      >
        {type}
      </p>

      <div
        className={`relative flex h-full flex-col items-center rounded-2xl border-4 border-black bg-white p-1 ${shadowcolor} shadow-2xl duration-300 hover:scale-105`}
      >
        <Link to={link} className="absolute inset-0 z-10" />
        <img src={image} alt="Company Logo" className="h-5/6 w-full rounded-2xl" />
        <p className="pb-4 pt-4 text-center font-redhat text-3xl font-semibold">{companyName}</p>

        {type in typeStyles && (
          <img
            src={typeStyles[type].src}
            alt={`${type} Icon`}
            className={cn(
              "absolute left-0 top-0 -translate-x-1/2",
              typeStyles[type].size,
              typeStyles[type].translateY,
              typeStyles[type].rotate ?? "",
            )}
          />
        )}
      </div>
    </div>
  );
};

export default SponsorCard;
