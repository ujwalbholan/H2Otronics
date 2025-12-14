import Container from "../components/Container";

const team = [
  { name: "Tamang Sujan", role: "Hardware Integration" },
  { name: "Mandal Mohan", role: "Web/API Developer" },
  { name: "Tamang Sabir", role: "Sensor Research" },
  { name: "Rai Salim", role: "Testing & Simulation" },
  { name: "Tamang Raj", role: "UI/UX & Prototype Design" },
];

const TeamSection = () => {
  return (
    <Container>
      <section id="team" className="w-full py-20 md:py-20 h-[85vh]">
        <div className="mb-12 text-center">
          <h3 className="text-3xl font-bold text-gray-800 md:text-4xl">
            Our Team
          </h3>
          <p className="mt-2 text-sm text-gray-600 md:text-base">
            Meet the brilliant minds behind H₂Otronics
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-items-center -z-1">
          {team.map((member, idx) => (
            <div
              key={idx}
              className="w-full max-w-[200px] p-6 bg-blue-50 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="flex flex-col items-center">
                {/* You can later add profile images here */}
                <div className="flex items-center justify-center w-20 h-20 mb-4 text-xl font-semibold text-blue-700 bg-blue-200 rounded-full">
                  {member.name.charAt(0)}
                </div>
                <h4 className="mb-1 text-lg font-semibold text-gray-800">
                  {member.name}
                </h4>
                <p className="text-sm text-gray-600">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
};

export default TeamSection;
