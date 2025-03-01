import { cn } from "@/shared/utils";

const MobileMemberCard = ({
  image,
  imageSide,
  name,
  quote,
  role,
  textColor,
}: {
  image: string;
  name: string;
  role: string;
  textColor: string;
  quote: string;
  imageSide: string;
}) => {
  return (
    <div className="grid grid-cols-2 items-center gap-[10%] py-6">
      {imageSide == "left" ? <img src={image} alt={name} className="aspect-auto w-full rounded-2xl" /> : null}
      <div className="flex h-full flex-col justify-between py-[15%] font-redhat">
        <div>
          <p
            className={cn(
              {
                "text-saseBlue": textColor == "blue",
                "text-saseGreen": textColor == "green",
                "text-right": imageSide == "right",
              },
              `pb-2 text-2xl font-semibold sm:text-4xl md:text-5xl`,
            )}
          >
            {name}
          </p>
          <p
            className={cn(
              {
                "text-saseBlue": textColor == "blue",
                "text-saseGreen": textColor == "green",
                "text-right": imageSide == "right",
              },
              `text-xl font-medium italic sm:text-3xl md:text-4xl`,
            )}
          >
            {role}
          </p>
        </div>
        <p className={cn({ "text-right": imageSide == "right" }, `pt-[25%] text-lg italic sm:text-2xl md:text-3xl`)}>"{quote}"</p>
      </div>
      {imageSide == "right" ? <img src={image} alt={name} className="aspect-auto w-full rounded-2xl" /> : null}
    </div>
  );
};

export default MobileMemberCard;
