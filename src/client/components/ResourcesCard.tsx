import React from "react";

export interface ResourceCardProps {
  title: string;
  description: string;
  linkText: string;
  link: string;
  icon?: JSX.Element;
  shadowColor?: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ description, icon, link, linkText, shadowColor }) => {
  return (
    <div className={`relative mb-14 w-full max-w-md p-5 font-redhat`}>
      {/* Main Card with Border & Shadow */}
      <div className={`relative flex flex-col rounded-3xl border-2 border-black bg-white p-12 ${shadowColor || ""}`}>
        {/* Title & Icon Row */}
        <div className="flex w-full items-center justify-between">
          {/* Title Link */}
          <a href={link} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-blue-600 hover:underline">
            {linkText}
          </a>
          {/* Icon (Logo) */}
          {icon}
        </div>
        {/* Description */}
        <p className="mt-4 text-left font-semibold text-gray-700">{description}</p>
      </div>
    </div>
  );
};

export default ResourceCard;
