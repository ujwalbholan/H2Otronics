import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "motion/react";
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
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Dashboard from "./pages/Dashboard/Dashboard";
import Alerts from "./pages/Dashboard/Alerts";
import Analytics from "./pages/Dashboard/Analytics";
import Reports from "./pages/Dashboard/Reports";
import Settings from "./pages/Dashboard/Settings";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";

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

const Public = () => {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        //public route
        <Route
          path="/"
          element={
            <PublicRoute>
              <Home />
            </PublicRoute>
          }
        />
        <Route
          path="/about"
          element={
            <PublicRoute>
              <About />
            </PublicRoute>
          }
        />
        <Route
          path="/features"
          element={
            <PublicRoute>
              <FeaturesSection />
            </PublicRoute>
          }
        />
        <Route
          path="/subscription"
          element={
            <PublicRoute>
              <SubscriptionPage />
            </PublicRoute>
          }
        />
        <Route
          path="/demo"
          element={
            <PublicRoute>
              <DemoSection />
            </PublicRoute>
          }
        />
        <Route
          path="/team"
          element={
            <PublicRoute>
              <TeamSection />
            </PublicRoute>
          }
        />
        <Route
          path="/gallery"
          element={
            <PublicRoute>
              <GallerySection />
            </PublicRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <PublicRoute>
              <ContactSection />
            </PublicRoute>
          }
        />
        <Route
          path="/signin"
          element={
            <PublicRoute>
              <Signin />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

const Protected = () => {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        //protected route
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/alerts"
          element={
            <ProtectedRoute>
              <Alerts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get("authToken");

    console.log('token', token );

    if (token) setIsAuthenticated(true);
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        {isAuthenticated ? (
          <main className="flex-grow">
            <Protected />
          </main>
        ) : (
          <>
            <Header />
            <main className="flex-grow">
              <Public />
            </main>
            <Footer />
          </>
        )}
      </Router>
    </div>
  );
};

export default App;
