import Container from "./container";

const HeroSection = () => {
  return (
    <Container>
      <section className="flex flex-col items-center justify-center w-full min-h-[80vh] text-center px-4 md:px-8">
        <div className="max-w-4xl">
          <h2 className="mb-4 text-3xl font-bold leading-tight text-gray-800 md:text-5xl">
            Smart IoT Water Tank Monitoring System
          </h2>
          <p className="mb-8 text-base text-gray-700 md:text-lg">
            Monitor and control your water tank remotely in real time with smart automation and live insights.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <a
              href="#demo"
              className="px-8 py-3 text-white transition-all duration-300 bg-blue-600 rounded-lg shadow hover:bg-blue-700"
            >
              Live Demo
            </a>
            <a
              href="#features"
              className="px-8 py-3 text-blue-600 transition-all duration-300 bg-white border border-blue-600 rounded-lg shadow hover:bg-blue-50"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default HeroSection;
