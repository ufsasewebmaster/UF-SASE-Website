import { cn } from "@/shared/utils";
import { imageUrls } from "@assets/imageUrls";

const typeStyles = {
  Diamond: { src: imageUrls["Diamond.png"], size: "h-[23%]", translateY: "-translate-y-1/4", rotate: "rotate-[-15deg]" },
  Gold: { src: imageUrls["Gold.png"], size: "h-[24%]", translateY: "-translate-y-1/3" },
  Silver: { src: imageUrls["Silver.png"], size: "h-[23%]", translateY: "-translate-y-1/3" },
  Bronze: { src: imageUrls["Bronze.png"], size: "h-[21%]", translateY: "-translate-y-1/3" },
};

const styleBase = "absolute left-0 top-0 -translate-x-1/2";

const SponsorCard = ({ companyName, image, shadowcolor, type }: { image: string; companyName: string; type: string; shadowcolor: string }) => {
  return (
    <div className="flex h-full w-full flex-col" style={{ zIndex: 10 }}>
      <p
        className={cn(
          {
            "text-saseBlue": type == "Diamond",
            "text-amber-300": type == "Gold",
            "text-slate-400": type == "Silver",
            "text-amber-700": type == "Bronze",
          },
          `pb-2 text-center font-redhat text-4xl font-semibold`,
        )}
      >
        {type}
      </p>

      <div
        className={`relative flex h-full flex-col items-center rounded-2xl border-4 border-black bg-white p-1 ${shadowcolor} shadow-2xl duration-300 hover:scale-105`}
      >
        <img src={image} alt="Company Logo" className="h-5/6 w-full rounded-2xl" />
        <p className="pb-4 pt-4 text-center font-redhat text-3xl font-semibold">{companyName}</p>

        {type in typeStyles && (
          <img
            src={typeStyles[type].src}
            alt={`${type} Icon`}
            className={cn(styleBase, typeStyles[type].size, typeStyles[type].translateY, typeStyles[type].rotate)}
          />
        )}
      </div>
    </div>
  );
};

export default SponsorCard;
