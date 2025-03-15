import React from "react";

interface ResourceCardProps {
  title: string;
  description: string;
  linkText: string;
  link: string;
}

const ResourcesCard: React.FC<ResourceCardProps> = ({ description, link, linkText, title }) => {
  return (
    <div className="w-full max-w-md rounded-lg border p-4 shadow-md hover:shadow-lg">
      <h2 className="mb-2 text-xl font-semibold">{title}</h2>
      <p className="mb-4 text-gray-600">{description}</p>
      <a href={link} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:text-blue-800">
        {linkText}
      </a>
    </div>
  );
};

export default ResourcesCard;
