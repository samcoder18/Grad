import { useEffect, useState } from "react";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Marquee from "./components/Marquee.jsx";
import FlavorAccordion from "./components/FlavorAccordion.jsx";
import HitsBento from "./components/HitsBento.jsx";
import Manifesto from "./components/Manifesto.jsx";
import Production from "./components/Production.jsx";
import Gudis from "./components/Gudis.jsx";
import Esarom from "./components/Esarom.jsx";
import Faq from "./components/Faq.jsx";
import Cta from "./components/Cta.jsx";
import LocationSection from "./components/LocationSection.jsx";
import Footer from "./components/Footer.jsx";
import OrderModal from "./components/OrderModal.jsx";
import Privacy from "./components/Privacy.jsx";

export default function App() {
  const [isPrivacy, setIsPrivacy] = useState(
    () => window.location.hash === "#privacy",
  );

  // Hash route for the privacy policy page (opened from the order form).
  useEffect(() => {
    const onHashChange = () =>
      setIsPrivacy(window.location.hash === "#privacy");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // Reset scroll when the privacy page opens or closes.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isPrivacy]);

  if (isPrivacy) {
    return (
      <main className="w-full max-w-full overflow-x-clip">
        <Privacy />
      </main>
    );
  }

  return (
    <main className="w-full max-w-full overflow-x-clip">
      <Nav />
      <Hero />
      <Marquee />
      <FlavorAccordion />
      <HitsBento />
      <Manifesto />
      <Production />
      <Gudis />
      <Esarom />
      <Faq />
      <Cta />
      <LocationSection />
      <Footer />
      <OrderModal />
    </main>
  );
}
