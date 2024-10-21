import MissionCard from "./MissionCard";

const MissionSection = () => (
  <section className="mb-12">
    <h2 className="mb-4 text-2xl font-semibold text-gray-800">Our Mission</h2>
    <p className="mb-8 text-black">
      To create a welcoming community where members:
    </p>
    <div className="flex flex-nowrap justify-center gap-20">
      <MissionCard
        text="Are able to help each other develop professionally, foster leadership skills, and excel academically"
        shadowColor="#0668B3"
      />
      <MissionCard
        text="Are inspired and encouraged to pursue their goals by creating their own opportunities"
        shadowColor="#7DC242"
      />
      <MissionCard
        text="Learn and understand how their own culture affects the workplace"
        shadowColor="#0668B3"
      />
      <MissionCard
        text="Actively contribute to the local community"
        shadowColor="#7DC242"
      />
    </div>
  </section>
);

export default MissionSection;
