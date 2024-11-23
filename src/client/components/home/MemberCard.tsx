import { cn } from "@/shared/utils";

const MemberCard = ({
  image,
  name,
  role,
  textColor,
}: {
  image: string;
  name: string;
  role: string;
  textColor: string;
}) => {
  return (
    <div
      className="flex aspect-auto w-auto flex-col justify-center rounded-2xl bg-cover bg-center pb-4"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div
        className={cn(
          {
            "text-saseBlue": textColor == "blue",
            "border-saseBlue": textColor == "blue",
            "text-saseGreen": textColor == "green",
            "border-saseGreen": textColor == "green",
          },
          `ml-8 mr-8 border-b-2 pb-2 pt-[150%] font-redhat text-2xl`,
        )}
      >
        <p className="text-center font-semibold">{name}</p>
        <p className="text-center italic">{role}</p>
      </div>
      <p className="p-2 text-center font-redhat text-xl text-white">
        "SASE is Cool!"
      </p>
    </div>
  );
};

export default MemberCard;
