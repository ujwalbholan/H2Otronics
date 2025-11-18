import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

import { lazy, Suspense, useState, useEffect } from "react";
import Cookies from "js-cookie";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const FeaturesSection = lazy(() => import("./pages/FeaturesSection"));
const DemoSection = lazy(() => import("./pages/DemoSection"));
const TeamSection = lazy(() => import("./pages/TeamSection"));
const GallerySection = lazy(() => import("./pages/GallerySection"));
const ContactSection = lazy(() => import("./pages/ContactSection"));
const SubscriptionPage = lazy(() => import("./pages/SubscriptionPage"));
const Signin = lazy(() => import("./pages/Signin"));
const Signup = lazy(() => import("./pages/Signup"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const Alerts = lazy(() => import("./pages/Dashboard/Alerts"));
// const Loading = lazy(() => import("./components/Loading"));

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
          {/* <Suspense
            fallback={
              <div className="flex items-center justify-center w-full py-16 text-sm text-gray-500">
                <Loading />
              </div>
            }
          > */}
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

            {/* protected route */}
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
            {/* Future protected routes can stay commented until needed */}
            {/* <Route
                path="/analytics"
                element={
                  <ProtectedRoute>
                    <Analytics />
                  </ProtectedRoute>
                }
              /> */}
          </Routes>
          {/* </Suspense> */}
        </main>
        {!isAuthenticated && <Footer />}
      </Router>
    </div>
  );
};

export default App;
