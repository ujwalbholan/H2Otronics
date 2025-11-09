const team = [
  { name: "Tamang Sujan", role: "Hardware Integration" },
  { name: "Mandal Mohan", role: "Web/API Developer" },
  { name: "Tamang Sabir", role: "Sensor Research" },
  { name: "Rai Salim", role: "Testing & Simulation" },
  { name: "Tamang Raj", role: "UI/UX & Prototype Design" },
];

const TeamSection = () => {
  return (
    <section id="team" className="py-20 bg-white">
      <div className="container mx-auto text-center">
        <h3 className="text-3xl font-bold mb-10">Our Team</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {team.map((member, idx) => (
            <div
              key={idx}
              className="p-6 bg-blue-50 rounded-lg shadow hover:shadow-lg transition"
            >
              <h4 className="text-xl font-semibold mb-1">{member.name}</h4>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
