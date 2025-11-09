const HeroSection = () => {
  return (
    <section className="bg-blue-100 py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">
          Smart IoT Water Tank Monitoring System
        </h2>
        <p className="text-lg mb-6">
          Monitor and control your water tank remotely in real time.
        </p>
        <div className="space-x-4">
          <a
            href="#demo"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Live Demo
          </a>
          <a
            href="#features"
            className="bg-gray-200 px-6 py-3 rounded-lg hover:bg-gray-300"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
