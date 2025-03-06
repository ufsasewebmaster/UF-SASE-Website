import { cn } from "@/shared/utils";

interface CardProps {
  title: string;
  text: string;
  shadowColor: string;
  logo: string;
}

const MissionCard = ({ logo, shadowColor, text, title }: CardProps) => {
  return (
    <div className="flex-none">
      <div
        className={cn(
          `flex h-64 w-56 transform flex-col items-center justify-between rounded-2xl border-2 border-black bg-gray-100 p-4 transition duration-300 hover:scale-105 dark:bg-black`,
          {
            "hover:shadow-[12px_12px_0px_#0668B3]": shadowColor === "blue",
            "hover:shadow-[12px_12px_0px_#7DC242]": shadowColor === "green",
          },
        )}
      >
        <h3 className="text-center text-lg font-bold text-gray-800">{title}</h3>
        <img src={logo} alt="Logo" className="my-2 h-14 w-14 object-contain" />
        <p className="text-m text-center text-black">{text}</p>
      </div>
    </div>
  );
};

export default MissionCard;
