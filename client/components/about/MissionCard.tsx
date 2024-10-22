interface CardProps {
  text: string;
  shadowColor: string; // Should be either 'blue' or 'green'
}

const MissionCard = ({ shadowColor, text }: CardProps) => {
  // Determine the shadow color class based on the prop
  const hoverShadowClass =
    shadowColor === "blue"
      ? "hover:shadow-[#0668B3]"
      : "hover:shadow-[#7DC242]";

  return (
    <div className="w-48 flex-none">
      <div
        className={`flex h-48 w-48 transform items-center justify-center rounded-lg border border-black bg-gray-200 p-6 shadow-md transition duration-300 hover:scale-105 ${hoverShadowClass}`}
      >
        <p className="text-center text-black">{text}</p>
      </div>
    </div>
  );
};

export default MissionCard;
