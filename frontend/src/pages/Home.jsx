import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import DemoSection from "../components/DemoSection";
import TeamSection from "../components/TeamSection";
import GallerySection from "../components/GallerySection";
import ContactSection from "../components/ContactSection";

const Home = () => {
  return (
    <div className="relative w-full min-h-screen">
      <div
        className="absolute inset-0 -z-1"
        style={{
          background: "#ffffff",
          backgroundImage: `
        radial-gradient(
          circle at top right,
          rgba(70, 130, 180, 0.5),
          transparent 70%
        )
      `,
          filter: "blur(80px)",
          backgroundRepeat: "no-repeat",
        }}
      />
      <HeroSection />
      <FeaturesSection />
      <DemoSection />
      <TeamSection />
      <GallerySection />
      <ContactSection />
    </div>
  );
};

export default Home;
