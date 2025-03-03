import { imageUrls } from "@/client/assets/imageUrls";
import { cn } from "@/shared/utils";
import { useEffect, useState } from "react";
import MissionCard from "./MissionCard";
import MissionSectionMobile from "./MissionSectionMobile";

const MissionSection: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? (
    <MissionSectionMobile />
  ) : (
    <section className={cn("mx-auto mb-12 w-full max-w-7xl px-4 sm:px-0")}>
      <div className={cn("mb-4 flex w-full items-center")}>
        <div className={cn("mr-3 h-12 w-1.5 rounded-sm bg-saseGreen")}></div>
        <h2 className={cn("font-oswald text-3xl font-semibold text-gray-800")}>Mission Statement</h2>
      </div>

      <p className={cn("mb-8 text-center text-xl text-black")}>To create a welcoming community where members:</p>

      {/* Desktop Layout */}
      <div className={cn("flex flex-nowrap justify-center gap-20")}>
        <MissionCard
          title="Professional Development"
          logo={imageUrls["Suitcase.png"]}
          text="To prepare Asian heritage students for success in the global business world."
          shadowColor="green"
        />
        <MissionCard
          title="Diversity"
          logo={imageUrls["People.png"]}
          text="To promote diversity and tolerance on campuses and in the workplace."
          shadowColor="blue"
        />
        <MissionCard
          title="Community"
          logo={imageUrls["Lightbulb.png"]}
          text="To provide opportunities for our members to contribute to their local communities."
          shadowColor="green"
        />
      </div>
    </section>
  );
};

export default MissionSection;
