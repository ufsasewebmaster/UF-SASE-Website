interface CardProps {
  text: string;
  shadowColor: string;
  logo: string;
}

const MissionCard = ({ logo, shadowColor, text }: CardProps) => {
  const hoverShadowClass =
    shadowColor === "blue"
      ? "hover:shadow-[12px_12px_0px_#0668B3]"
      : "hover:shadow-[12px_12px_0px_#7DC242]";

  return (
    <div className="flex-none">
      <div
        className={`flex h-56 w-56 transform flex-col items-center rounded-2xl border-2 border-black bg-gray-100 p-4 transition duration-300 hover:scale-105 ${hoverShadowClass}`}
      >
        <img src={logo} alt="Logo" className="mb-2 h-10 w-10 object-contain" />
        <p className="overflow-hidden text-center text-lg text-black">{text}</p>
      </div>
    </div>
  );
};

export default MissionCard;
