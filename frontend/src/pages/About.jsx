import Container from "../components/Container";
import { Link } from "react-router-dom";
import WaterButton from "../components/WaterButton";

const About = () => {
  return (
    <Container>
      <section id="about" className="w-full py-20">
        <div className="max-w-5xl px-4 mx-auto text-center">
          <h2 className="mb-6 text-3xl font-bold text-blue-800 md:text-4xl">
            About Us
          </h2>
          <p className="mb-8 text-lg text-gray-700 md:text-xl text-justify">
            H₂Otronics is a cutting-edge IoT water tank monitoring system
            designed to make water management smart, efficient, and hassle-free.
            Our platform enables real-time monitoring of water levels, automatic
            pump control, and instant notifications for any critical changes.
          </p>
          <p className="mb-6 text-lg text-gray-700 md:text-xl text-justify">
            Our team combines expertise in hardware, web development, and sensor
            technology to provide reliable, scalable, and user-friendly
            solutions for homes, offices, and industrial water management.
          </p>
          <div className="flex justify-center gap-6 mt-6">
            <WaterButton to="/demo">Live Demo</WaterButton>

            <Link
              to="/features"
              className="px-6 py-3 transition bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default About;
