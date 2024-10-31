import { cn } from "@/shared/utils";

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
    <div className="flex h-full w-full flex-col">
      <p
        className={cn(
          {
            "text-saseBlue": type == "Diamond",
            "text-saseGreen": type == "Gold",
          },
          `font-redhat pb-2 text-center text-4xl font-semibold`,
        )}
      >
        {type}
      </p>
      <div className="relative flex h-auto w-full flex-col items-center rounded-2xl border-4 border-black bg-white">
        <img
          src={image}
          alt="Company Logo"
          className="h-5/6 w-full rounded-2xl pl-1 pr-1 pt-1"
        />
        <div className="flex w-full items-center justify-center">
          <p className="font-redhat p-4 text-center text-3xl font-semibold">
            {companyName}
          </p>
        </div>

        <div className="absolute left-2 top-2 z-0 h-full w-full rounded-2xl border-b-8 border-r-8 border-saseGreen"></div>
      </div>
    </div>
  );
};

export default SponsorCard;
