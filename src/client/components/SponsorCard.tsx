import { cn } from "@/shared/utils";
import diamond from "../assets/sponsors/Diamond.png";

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

      <div className="relative flex h-full flex-col items-center rounded-2xl border-4 border-black bg-white p-1">
        <img
          src={image}
          alt="Company Logo"
          className="h-5/6 w-full rounded-2xl"
        />
        <p className="pb-4 pt-4 text-center font-redhat text-3xl font-semibold">
          {companyName}
        </p>

        <div
          className="absolute left-[6%] top-[7%] h-full w-full rounded-2xl bg-saseGreen"
          style={{ zIndex: -1 }}
        ></div>

        {type === "Diamond" ? (
          <img
            src={diamond}
            alt="Diamond Icon"
            className="absolute -left-[16%] -top-[10%] h-[30%]"
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default SponsorCard;
