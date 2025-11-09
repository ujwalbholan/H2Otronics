
const features = [
  {
    title: "Real-time Level Monitoring",
    desc: "Always know your water tank status instantly.",
  },
  {
    title: "Automatic Pump Control",
    desc: "Turn pumps ON/OFF automatically based on level.",
  },
  {
    title: "Mobile Notifications",
    desc: "Get alerts on your phone for overflow or low water.",
  },
  { title: "Cloud Database", desc: "Store all readings securely on Firebase." },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto text-center">
        <h3 className="text-3xl font-bold mb-10">Key Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="p-6 bg-blue-50 rounded-lg shadow hover:shadow-lg transition"
            >
              <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
