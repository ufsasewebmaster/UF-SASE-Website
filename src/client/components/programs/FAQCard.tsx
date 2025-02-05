import React, { useState } from "react";

interface FAQItemProps {
  question: string;
  answer: string;
}

interface FAQProps {
  faqData: Array<FAQItemProps>;
}

const FAQItem: React.FC<FAQItemProps> = ({ answer, question }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`transition-shadow duration-200 ${
        isOpen ? "shadow-[8px_8px_0px_#7DC242]" : "shadow-none"
      } my-6 overflow-hidden rounded-3xl border border-border`}
    >
      {/* Question Section */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between bg-muted px-6 py-5 text-left text-2xl font-semibold text-muted-foreground focus:outline-none"
      >
        <span>{question}</span>
        <span className={`transform text-2xl transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}>{isOpen ? "−" : "+"}</span>
      </button>

      {/* Answer Section with Smooth Dropdown Animation */}
      <div
        className={`transition-all duration-200 ease-in-out ${
          isOpen ? "max-h-[800px] py-5 opacity-100" : "max-h-0 py-0 opacity-0"
        } overflow-hidden border-t border-gray-300 bg-white px-6`}
        style={{ transitionProperty: "max-height, opacity, padding" }}
      >
        <div className="text-xl text-muted-foreground" dangerouslySetInnerHTML={{ __html: answer }} />
      </div>
    </div>
  );
};

const FAQ: React.FC<FAQProps> = ({ faqData }) => {
  return (
    <div className="w-full p-8">
      {faqData.map((item, index) => (
        <FAQItem key={index} question={item.question} answer={item.answer} />
      ))}
    </div>
  );
};

export default FAQ;
