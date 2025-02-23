import { cn } from "@/shared/utils";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

const HistorySection = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className={cn("mb-8")}>
      <div className={cn("max-w-5xl")}>
        <p className={cn("mb-4 text-lg text-gray-800")}>
          <span className={cn("font-semibold")}>Since being founded during the summer of 2010,</span> the University of Florida chapter has had an
          abundant effort put forth for the development of our members.
        </p>
        <p className={cn("mb-4 text-lg text-gray-800")}>
          This development is centered on <span className={cn("font-semibold")}>five core values</span> of our mission statement:{" "}
          <span className={cn("font-semibold")}>leadership, professionalism, service, academics,</span> and{" "}
          <span className={cn("font-semibold")}>diversity.</span> Our meetings and events are catered to ensure that not only our mission is being
          fulfilled, but also that a community of support among Asian heritage students is being built. We pride ourselves on our measurable successes
          but could not have done so without the help of our members, faculty, and sponsors.
        </p>

        {/* Read More / Read Less Toggle */}
        {!isExpanded && (
          <div className={cn("flex w-fit cursor-pointer items-center text-blue-600 hover:underline")} onClick={() => setIsExpanded(true)}>
            <span>Read more</span>
            <FaChevronDown className={cn("ml-1 h-4 w-4")} />
          </div>
        )}

        {/* Expandable Content */}
        <div
          className={cn("transition-all duration-300", {
            "max-h-[1000px] opacity-100": isExpanded,
            "max-h-0 overflow-hidden opacity-0": !isExpanded,
          })}
        >
          <p className={cn("mb-4 text-lg text-gray-800")}>
            Through <span className={cn("font-semibold")}>events</span> we have hosted in the past, such as our annual Quick Race or the Southeast
            Regional Conferences of 2014-2016, many of our members have been able to get involved in committees and take on leadership roles. Many of
            our other events allow students to <span className={cn("font-semibold")}>develop professional skills</span> that are essential for
            positions in industry.
          </p>
          <p className={cn("mb-4 text-lg text-gray-800")}>
            Our SASE chapter is not only active on campus, but also within the <span className={cn("font-semibold")}>Gainesville community</span>,
            such as when we participated in a 5K raising money for a local robotics team. We are also heavily involved in the{" "}
            <span className={cn("font-semibold")}>Asian American Student Union</span> at the University of Florida, taking part in their annual
            welcome assembly and hosting events with cultural and professional sub-organizations.
          </p>

          {/* Read Less Link (Appears at Bottom After Expansion) */}
          <div className={cn("flex w-fit cursor-pointer items-center text-blue-600 hover:underline")} onClick={() => setIsExpanded(false)}>
            <span>Read less</span>
            <FaChevronUp className={cn("ml-1 h-4 w-4")} />
          </div>
        </div>
      </div>

      {/* Constitution Link */}
      <div className={cn("mt-4 text-center")}>
        <a
          href="2024-2025-SASE-Constitution.docx.pdf"
          className={cn("mt-6 inline-block transform rounded-full bg-[#0f6cb6] px-6 py-2 text-white transition duration-300 hover:scale-105")}
          target="_blank"
          rel="noopener noreferrer"
        >
          2024-2025 SASE Constitution
        </a>
      </div>
    </section>
  );
};

export default HistorySection;
