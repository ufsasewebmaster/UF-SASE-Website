import { cn } from "@/shared/utils";

const SponsorCard = (props: any) => {
  return (
    <div
      className={cn(
        {
          "bg-gradient from-saseBlue to-white": props.diamond == "Y",
          "bg-white": props.diamond == "N",
        },
        `flex flex-col items-center rounded-lg border-4 border-black`,
      )}
    >
      <img
        src={props.image}
        alt="Company Logo"
        className="h-3/4 w-full pl-1 pr-1 pt-1"
      />
      <p
        className={cn(
          {
            "text-white": props.diamond == "Y",
            "text-black": props.diamond == "N",
          },
          `h-1/4 w-full p-4 text-center text-2xl font-medium`,
        )}
      >
        {props.companyName}
      </p>
    </div>
  );
};

export default SponsorCard;
