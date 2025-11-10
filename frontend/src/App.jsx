import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import FeaturesSection from "./pages/FeaturesSection";
import DemoSection from "./pages/DemoSection";
import TeamSection from "./pages/TeamSection";
import GallerySection from "./pages/GallerySection";
import ContactSection from "./pages/ContactSection";
import SubscriptionPage from "./pages/SubscriptionPage";

// const PageWrapper = ({ children }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -20 }}
//       transition={{ duration: 0.6, ease: "easeOut" }}
//       className="min-h-screen"
//     >
//       {children}
//     </motion.div>
//   );
// };

const AnimatedRoutes = () => {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<FeaturesSection />} />
        <Route path="/subscription" element={<SubscriptionPage />} />
        <Route path="/demo" element={<DemoSection />} />
        <Route path="/team" element={<TeamSection />} />
        <Route path="/gallery" element={<GallerySection />} />
        <Route path="/contact" element={<ContactSection />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <Header />
        <main className="flex-grow">
          <AnimatedRoutes />
        </main>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
