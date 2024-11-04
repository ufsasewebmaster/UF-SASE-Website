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
        logo={suitcase}
        text="Are able to help each other develop professional, academic, and leadership skills"
        shadowColor="green"
      />
      <MissionCard
        logo={people}
        text="Learn and understand how their own culture affects the workplace"
        shadowColor="blue"
      />
      <MissionCard
        logo={lightbulb}
        text="Actively engage in and contribute to the development of the local community"
        shadowColor="green"
      />
    </div>
  </section>
);

export default MissionSection;
