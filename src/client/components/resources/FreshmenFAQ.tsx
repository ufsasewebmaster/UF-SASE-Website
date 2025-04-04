import { cn } from "@/shared/utils";
import FAQ from "@components/programs/FAQCard";
import { useEffect, useRef, useState } from "react";
import { faqFreshmenList } from "./faqFreshmenList";

const FreshmenFAQ = () => {
  const resourceTabs: Record<string, React.ReactNode> = {
    Academic: (
      <div>
        <p className="px-8 font-redhat text-lg font-medium">{faqFreshmenList[0].heading}</p>
        <FAQ faqData={faqFreshmenList[0].questions} />
      </div>
    ),
    Professional: (
      <div>
        <p className="px-8 font-redhat text-lg font-medium">{faqFreshmenList[1].heading}</p>
        <FAQ faqData={faqFreshmenList[1].questions} />
      </div>
    ),
    Extracurricular: (
      <div>
        <p className="px-8 font-redhat text-lg font-medium">{faqFreshmenList[2].heading}</p>
        <FAQ faqData={faqFreshmenList[2].questions} />
      </div>
    ),
    Miscellaneous: (
      <div>
        <p className="px-8 font-redhat text-lg font-medium">{faqFreshmenList[3].heading}</p>
        <FAQ faqData={faqFreshmenList[3].questions} />
      </div>
    ),
  };

  const [activeTab, setActiveTab] = useState<keyof typeof resourceTabs>("Academic");
  const categories = Object.keys(resourceTabs);
  const tabRefs = useRef<Array<HTMLButtonElement>>([]);
  const [sliderStyle, setSliderStyle] = useState({
    left: "0px",
    width: "0px",
  });

  useEffect(() => {
    const currentIndex = categories.indexOf(activeTab);
    if (currentIndex < 0) return;
    const currentTab = tabRefs.current[currentIndex];
    if (!currentTab) return;
    setSliderStyle({
      left: currentTab.offsetLeft + "px",
      width: currentTab.offsetWidth + "px",
    });
  }, [activeTab, categories]);

  return (
    <div>
      <div className="mt-6 flex justify-center border-b">
        <ul className="relative flex space-x-4 px-4">
          <div className="absolute bottom-0 h-1 bg-saseBlue transition-all duration-300" style={sliderStyle} />
          {categories.map((category, idx) => {
            const isActive = category === activeTab;
            return (
              <li key={category}>
                <button
                  ref={(el) => {
                    if (el) tabRefs.current[idx] = el;
                  }}
                  onClick={() => setActiveTab(category as keyof typeof resourceTabs)}
                  className={cn(
                    "relative whitespace-nowrap px-4 py-2 text-base font-semibold transition-colors",
                    isActive ? "text-saseBlue" : "text-gray-600 hover:text-black",
                  )}
                >
                  {category}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="px-8 pt-4">{resourceTabs[activeTab]}</div>
    </div>
  );
};

export default FreshmenFAQ;
