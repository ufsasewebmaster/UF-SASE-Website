import GoogleFormsImg from "@assets/resources/GoogleForms.png";
import GoogleSheetsImg from "@assets/resources/GoogleSheets.png";
import type { ResourceCardProps } from "@components/ResourcesCard";
import ResourceCard from "@components/ResourcesCard";

const classConnectorForms: Array<ResourceCardProps> = [
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
          <ResourceCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

export default ClassConnectorForms;
