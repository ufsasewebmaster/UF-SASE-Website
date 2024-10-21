interface CardProps {
  text: string;
  shadowColor: string;
}

const MissionCard = ({ shadowColor, text }: CardProps) => (
  <div className="w-48 flex-none">
    <div
      className={`flex h-48 w-48 transform items-center justify-center rounded-lg border border-black bg-gray-200 p-6 shadow-md transition duration-300 hover:scale-105 hover:shadow-${shadowColor}`}
    >
      <p className="text-center text-black">{text}</p>
    </div>
  </div>
);

export default MissionCard;
