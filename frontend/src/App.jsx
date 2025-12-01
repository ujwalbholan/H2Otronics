import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Loading from "./components/Loading";

import { lazy, Suspense, useState, useEffect } from "react";
import Cookies from "js-cookie";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const FeaturesSection = lazy(() => import("./pages/FeaturesSection"));
const DemoSection = lazy(() => import("./pages/DemoSection"));
const TeamSection = lazy(() => import("./pages/TeamSection"));
const GallerySection = lazy(() => import("./pages/GallerySection"));
const ContactSection = lazy(() => import("./pages/ContactSection"));
const Signin = lazy(() => import("./pages/Signin"));
const Signup = lazy(() => import("./pages/Signup"));
const DashboardLayout = lazy(() => import("./pages/Dashboard/DashboardLayout"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const Alerts = lazy(() => import("./pages/Dashboard/Alerts"));
const SubscriptionPage = lazy(() => import("./pages/SubscriptionPage"));

// const Analytics = lazy(() => import("./pages/Dashboard/Analytics"));
// const Reports = lazy(() => import("./pages/Dashboard/Reports"));
// const Settings = lazy(() => import("./pages/Dashboard/Settings"));

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get("authToken");

    if (token) setIsAuthenticated(true);
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        {!isAuthenticated && <Header />}
        <main className="grow">
          <Suspense
            fallback={
              <div className="flex items-center justify-center w-full py-16 text-sm text-gray-500">
                <Loading />
              </div>
            }
          >
            <Routes>
              {/* public route */}
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

              {/* protected routes */}
              <Route
                path="/dashboard/*"
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="alerts" element={<Alerts />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="reports" element={<Reports />} />
                <Route path="settings" element={<Settings />} />
                <Route path="subscription" element={<SubscriptionPage />} />
              </Route>
            </Routes>
          </Suspense>
        </main>
        {!isAuthenticated && <Footer />}
      </Router>
    </div>
  );
};

export default App;
