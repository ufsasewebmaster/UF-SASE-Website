import { cn } from "@/shared/utils";

interface GoalCardProps {
  text: string;
  color: "blue" | "green";
}

const GoalCard = ({ color, text }: GoalCardProps) => {
  return (
    <div className="flex-none">
      <div
        className={cn(
          `flex h-64 w-64 transform flex-col items-center justify-center rounded-3xl border-2 border-border bg-muted p-6 transition duration-300 hover:scale-105`,
          {
            "hover:shadow-[18px_18px_0px_#0668B3]": color === "blue",
            "hover:shadow-[18px_18px_0px_#7DC242]": color === "green",
          },
        )}
      >
        <p className="font-redhat text-2xl text-foreground">{text}</p>
      </div>
    </div>
  );
};

export default GoalCard;
