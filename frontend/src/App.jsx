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

const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageWrapper>
              <Home />
            </PageWrapper>
          }
        />
        <Route
          path="/about"
          element={
            <PageWrapper>
              <About />
            </PageWrapper>
          }
        />
        <Route
          path="/features"
          element={
            <PageWrapper>
              <FeaturesSection />
            </PageWrapper>
          }
        />
        <Route
          path="/demo"
          element={
            <PageWrapper>
              <DemoSection />
            </PageWrapper>
          }
        />
        <Route
          path="/team"
          element={
            <PageWrapper>
              <TeamSection />
            </PageWrapper>
          }
        />
        <Route
          path="/gallery"
          element={
            <PageWrapper>
              <GallerySection />
            </PageWrapper>
          }
        />
        <Route
          path="/contact"
          element={
            <PageWrapper>
              <ContactSection />
            </PageWrapper>
          }
        />
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
