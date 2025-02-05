import { cn } from "@/shared/utils";
import { imageUrls } from "@assets/imageUrls";

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

        {type === "Diamond" ? (
          <img
            src={imageUrls["Diamond.png"]}
            alt="Diamond Icon"
            className="absolute left-0 top-0 h-[23%] -translate-x-1/2 -translate-y-1/4 rotate-[-15deg]"
          />
        ) : (
          ""
        )}
        {type === "Gold" ? (
          <img src={imageUrls["Gold.png"]} alt="Diamond Icon" className="absolute left-0 top-0 h-[24%] -translate-x-1/2 -translate-y-1/3" />
        ) : (
          ""
        )}
        {type === "Silver" ? (
          <img src={imageUrls["Silver.png"]} alt="Diamond Icon" className="absolute left-0 top-0 h-[23%] -translate-x-1/2 -translate-y-1/3" />
        ) : (
          ""
        )}
        {type === "Bronze" ? (
          <img src={imageUrls["Bronze.png"]} alt="Diamond Icon" className="absolute left-0 top-0 h-[21%] -translate-x-1/2 -translate-y-1/3" />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default SponsorCard;
