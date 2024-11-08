const MissionCard = ({
  image,
  mission,
  text,
}: {
  image: string;
  mission: string;
  text: string;
}) => {
  return (
    <div className="relative flex flex-col items-center rounded-2xl border border-black bg-white p-6">
      <p className="pb-4 text-center font-redhat text-2xl font-semibold">
        {mission}
      </p>
      <img src={image} alt="Briefcase icon" className="pb-4" />
      <p className="text-center font-redhat text-2xl">{text}</p>
      <div
        className="absolute left-3 top-4 h-full w-full rounded-xl border border-black bg-saseGreen"
        style={{ zIndex: -1 }}
      ></div>
    </div>
  );
};

export default MissionCard;
