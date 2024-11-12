import lightbulb from "@assets/about/lightbulb.png";
import people from "@assets/about/people.png";
import suitcase from "@assets/about/suitcase.png";
import MissionCard from "./MissionCard";

const MissionSection = () => (
  <section className="mb-12">
    <div className="mb-4 flex items-center">
      <div className="mr-3 h-12 w-1.5 rounded-sm bg-saseGreen"></div>{" "}
      <h2 className="text-3xl font-semibold text-gray-800">
        Mission Statement
      </h2>
    </div>

    <p className="mb-8 text-center text-xl text-black">
      To create a welcoming community where members:
    </p>
    <div className="flex flex-nowrap justify-center gap-20">
      <MissionCard
        title="Professional Development"
        logo={suitcase}
        text="To prepare Asian heritage students for success in the global business world."
        shadowColor="green"
      />
      <MissionCard
        title="Diversity"
        logo={people}
        text="To promote diversity and tolerance on campuses and in the workplace."
        shadowColor="blue"
      />
      <MissionCard
        title="Community"
        logo={lightbulb}
        text="To provide opportunities for our members to contribute to their local communities."
        shadowColor="green"
      />
    </div>
  </section>
);

export default MissionSection;
