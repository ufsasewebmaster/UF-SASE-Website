import GoogleFormsImg from "@assets/resources/GoogleForms.png";
import GoogleSheetsImg from "@assets/resources/GoogleSheets.png";
import React from "react";

interface ResourceCard {
  title: string;
  description: string;
  linkText: string;
  link: string;
  icon: JSX.Element;
  shadowColor: string;
}

const classConnectorForms: Array<ResourceCard> = [
  {
    title: "Google Form Link",
    description: "📝 Fill in your course information for peers to connect with you!",
    linkText: "Google Form Link",
    link: "https://docs.google.com/forms/d/e/1FAIpQLSfmL0xHfKMK-7x-ACH3ea98V0F1JS7lyK8s3v62eygY4105uQ/viewform",
    icon: <img src={GoogleFormsImg} alt="Google Forms" className="h-12 w-12 object-contain" />,
    shadowColor: "shadow-[24px_24px_0px_#A855F7]",
  },
  {
    title: "Google Sheets Link",
    description: "👆 Check out the sheets to reach out to fellow peers!",
    linkText: "Google Sheets Link",
    link: "https://docs.google.com/spreadsheets/d/1Kz8bk37vguUnc6mInzR_CyF2im3SxflUPYNdEjr8tJM/edit?gid=590225883#gid=590225883",
    icon: <img src={GoogleSheetsImg} alt="Google Sheets" className="h-12 w-12 object-contain" />,
    shadowColor: "shadow-[24px_24px_0px_#7DC242]",
  },
];

const ClassConnectorForms: React.FC = () => {
  return (
    <div className="w-full px-6 py-8">
      {/* Section Title */}
      <h2 className="mb-2 pl-6 text-2xl font-semibold">Class Connector Forms</h2>
      <p className="mb-6 inline-block pl-6 text-left text-gray-700">
        Want to know which member is in the same class or major as you? Or maybe even just find people to study with? The SASE Class Connector is here
        as an academic resource for members to connect with their fellow peers and find people who have shared interests.
      </p>

      {/* Cards - Align with Description */}
      <div className="flex flex-wrap justify-start gap-6">
        {classConnectorForms.map((card, index) => (
          <div key={index} className={`relative mb-14 w-full max-w-md p-5 font-redhat`}>
            {/* Main Card with Border & Shadow */}
            <div className={`relative flex flex-col rounded-3xl border-2 border-black bg-white p-12 ${card.shadowColor}`}>
              {/* Title & Icon Row */}
              <div className="flex w-full items-center justify-between">
                {/* Title Link */}
                <a href={card.link} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-blue-600 hover:underline">
                  {card.linkText}
                </a>
                {/* Icon (Logo) */}
                {card.icon}
              </div>

              {/* Description */}
              <p className="mt-4 text-left font-semibold text-gray-700">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassConnectorForms;
