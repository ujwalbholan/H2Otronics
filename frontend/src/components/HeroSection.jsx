import { motion } from "motion/react";
import Container from "./Container";

const HeroSection = () => {
  return (
    <Container>
      <section className="flex flex-col items-center justify-center w-full min-h-[80vh] text-center px-4 md:px-8">
        <motion.div
          className="max-w-4xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.2,
            ease: "easeOut",
          }}
        >
          <motion.h2
            className="mb-4 text-3xl font-bold leading-tight text-gray-800 md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            Smart IoT Water Tank Monitoring System
          </motion.h2>

          <motion.p
            className="mb-8 text-base text-gray-700 md:text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            Monitor and control your water tank remotely in real time with
            smart automation and live insights.
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <a
              href="#demo"
              className="relative px-8 py-3 text-white transition-all duration-300 bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700"
            >
              Live Demo
            </a>
            <a
              href="#features"
              className="relative px-8 py-3 text-blue-600 transition-all duration-300 bg-white border border-blue-600 rounded-lg shadow-lg hover:bg-blue-50"
            >
              Learn More
            </a>
          </motion.div>
        </motion.div>
      </section>
    </Container>
  );
};

export default HeroSection;
