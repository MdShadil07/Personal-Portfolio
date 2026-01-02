import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DashboardHome from "./pages/DashboardHome";
import LandingPage from "./pages/LandingPage";
import React from "react";
// Lazy-load recruiter page to tolerate either default or named exports
const LazyRecruiter = React.lazy(() => import("./pages/RecuiterPage").then(mod => ({
  default: (mod as unknown as { default?: React.ComponentType<unknown>; RecruiterPage?: React.ComponentType<unknown> }).default
    ?? (mod as unknown as { default?: React.ComponentType<unknown>; RecruiterPage?: React.ComponentType<unknown> }).RecruiterPage
    ?? (() => null)
} as { default: React.ComponentType<unknown> })));
import { ThemeProvider } from "@/components/theme-provider";

function App() {
  function Content() {
    const location = useLocation();
    const isLanding = location.pathname === "/";
    // Hide header/footer on landing and recruiter pages
    const hideGlobalNav = isLanding || location.pathname.startsWith("/recruiter");

    return (
      <>
        {/* show navbar/footer on pages except landing and recruiter */}
        {!hideGlobalNav && <Navbar />}

        <div className={hideGlobalNav ? "" : "pt-16"}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/recruiter" element={
              <React.Suspense fallback={null}>
                <LazyRecruiter />
              </React.Suspense>
            } />
            <Route path="/dashboard/*" element={<DashboardHome />} />
            <Route path="*" element={<LandingPage />} />
          </Routes>
        </div>

        {!isLanding && <Footer />}
      </>
    );
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Content />
      </Router>
    </ThemeProvider>
  );
}

export default App;
