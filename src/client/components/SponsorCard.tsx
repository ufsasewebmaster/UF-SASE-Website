import { cn } from "@/shared/utils";
import diamond from "@assets/sponsors/Diamond.png";

const SponsorCard = ({
  companyName,
  image,
  type,
}: {
  image: string;
  companyName: string;
  type: string;
}) => {
  return (
    <div className="flex h-full w-full flex-col" style={{ zIndex: 10 }}>
      <p
        className={cn(
          {
            "text-saseBlue": type == "Diamond",
            "text-saseGreen": type == "Gold",
          },
          `pb-2 text-center font-redhat text-4xl font-semibold`,
        )}
      >
        {type}
      </p>

      <div className="relative flex h-full flex-col items-center rounded-2xl border-4 border-black bg-white p-1 shadow-[12px_12px_0px_#7DC242] duration-300 hover:scale-105">
        <img
          src={image}
          alt="Company Logo"
          className="h-5/6 w-full rounded-2xl"
        />
        <p className="pb-4 pt-4 text-center font-redhat text-3xl font-semibold">
          {companyName}
        </p>

        {type === "Diamond" ? (
          <img
            src={diamond}
            alt="Diamond Icon"
            className="absolute left-0 top-0 h-[30%] -translate-x-1/2 -translate-y-1/3"
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default SponsorCard;
