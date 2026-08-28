import { Suspense, lazy, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Marquee from "./components/Marquee.jsx";
import FlavorAccordion from "./components/FlavorAccordion.jsx";
import HitsBento from "./components/HitsBento.jsx";
import Manifesto from "./components/Manifesto.jsx";
import Gudis from "./components/Gudis.jsx";
import Faq from "./components/Faq.jsx";
import Cta from "./components/Cta.jsx";
import LocationSection from "./components/LocationSection.jsx";
import Footer from "./components/Footer.jsx";
import OrderModal from "./components/OrderModal.jsx";
import Privacy from "./components/Privacy.jsx";

const OfficeShell = lazy(() => import("./components/office/OfficeShell.jsx"));

const ease = [0.16, 1, 0.3, 1];

function OfficeFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-paper">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-line border-t-brand" />
    </div>
  );
}

export default function App() {
  const [view, setView] = useState("landing");
  const [isPrivacy, setIsPrivacy] = useState(
    () => window.location.hash === "#privacy",
  );
  const reduce = useReducedMotion();

  // Hash route for the privacy policy page (opened from the order form).
  useEffect(() => {
    const onHashChange = () =>
      setIsPrivacy(window.location.hash === "#privacy");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // Reset scroll on every view switch.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view, isPrivacy]);

  if (isPrivacy) {
    return (
      <main className="w-full max-w-full overflow-x-clip">
        <Privacy />
      </main>
    );
  }

  return (
    <main className="w-full max-w-full overflow-x-clip">
      <AnimatePresence mode="wait">
        {view === "landing" ? (
          <motion.div
            key="landing"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease }}
          >
            <Nav onEnterOffice={() => setView("office")} />
            <Hero />
            <Marquee />
            <FlavorAccordion />
            <HitsBento />
            <Manifesto />
            <Gudis />
            <Faq />
            <Cta />
            <LocationSection />
            <Footer />
          </motion.div>
        ) : (
          <motion.div
            key="office"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease }}
          >
            <Suspense fallback={<OfficeFallback />}>
              <OfficeShell onExit={() => setView("landing")} />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
      <OrderModal />
    </main>
  );
}
