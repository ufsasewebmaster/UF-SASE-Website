import { cn } from "@/shared/utils";

const MissionCard = ({
  image,
  mission,
  shadow,
  text,
}: {
  image: string;
  mission: string;
  text: string;
  shadow: string;
}) => {
  return (
    <div
      className={cn(
        {
          "hover:shadow-[12px_12px_0px_#0668B3]": shadow === "blue",
          "hover:shadow-[12px_12px_0px_#7DC242]": shadow === "green",
        },
        `flex flex-col items-center rounded-2xl border border-black bg-white p-6 duration-300 hover:scale-105`,
      )}
    >
      <p className="pb-4 text-center font-redhat text-2xl font-semibold">
        {mission}
      </p>
      <img src={image} alt="Icon" className="pb-4" />
      <p className="text-center font-redhat text-2xl">{text}</p>
    </div>
  );
};

export default MissionCard;
