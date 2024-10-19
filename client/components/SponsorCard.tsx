const SponsorCard = (props: any) => {
  return (
    <div
      className={`flex flex-col items-center rounded-lg border-4 border-black ${props.diamond == "Y" ? "from-saseBlue bg-gradient-to-t to-white" : "bg-white"}`}
    >
      <img
        src={props.image}
        alt="Company Logo"
        className="h-3/4 w-full pl-1 pr-1 pt-1"
      />
      <p
        className={`h-1/4 w-full p-4 text-center text-2xl font-medium ${props.diamond == "Y" ? "text-white" : "text-black"}`}
      >
        {props.companyName}
      </p>
    </div>
  );
};

export default SponsorCard;
