import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProblemSection from './components/ProblemSection';
import SolutionSection from './components/SolutionSection';
import ModesSection from './components/ModesSection';
import HowItWorks from './components/HowItWorks';
import FeaturesSection from './components/FeaturesSection';
import DashboardSection from './components/DashboardSection';
import DevicesSection from './components/DevicesSection';
import LoopSection from './components/LoopSection';
import ProvidersSection from './components/ProvidersSection';
import TrustSection from './components/TrustSection';
import FaqSection from './components/FaqSection';
import FinalCta from './components/FinalCta';
import Footer from './components/Footer';
import EnergyLine from './components/ui/EnergyLine';
import StructuredData from './components/StructuredData';
import BackToTop from './components/ui/BackToTop';
import { initSmoothScroll, destroySmoothScroll, scrollToId } from './lib/smoothScroll';

/**
 * The scroll is the argument (brief §3.2):
 *
 *   hero      → the bill is not the problem; not seeing it is
 *   problem   → why it shocks you: a 90-day blind spot, the tranche cliff, summer
 *   solution  → the visibility: your tranche, your estimate, your circuits
 *   modes     → two ways to start; hardware is not the price of entry
 *   how       → sign up → feed it → understand → act
 *   features  → six things the bill will never tell you
 *   devices   → remote control, demonstrated rather than claimed
 *   loop      → a report reaches an operator, and comes back
 *   providers → the operator portal
 *   dashboard → that portal on screen (the screenshot IS the portal, so it
 *               sits here rather than under a household heading)
 *   trust     → Simple · Secure · Algerian
 *   faq       → objections
 *   final     → the close
 *
 * Nothing here answers none of those questions, which is why the old "vision",
 * "solar" and "AI" blocks are gone.
 */
export default function App() {
  useEffect(() => {
    initSmoothScroll();

    // Route same-page anchors through Lenis so a nav click eases like the rest
    // of the page instead of teleporting mid-animation.
    const onClick = (event) => {
      const link = event.target.closest?.('a[href^="#"]');
      if (!link) return;
      const id = link.getAttribute('href').slice(1);
      if (!id || !document.getElementById(id)) return;
      event.preventDefault();
      scrollToId(id);
      if (window.history?.replaceState) window.history.replaceState(null, '', `#${id}`);
    };

    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('click', onClick);
      destroySmoothScroll();
    };
  }, []);

  return (
    <div className="app-container">
      <StructuredData />
      <Navbar />

      <main>
        <Hero />
        <ProblemSection />
        <EnergyLine variant="wave" className="between-sections" />
        <SolutionSection />
        <ModesSection />
        <HowItWorks />
        <EnergyLine variant="step" className="between-sections" />
        <FeaturesSection />
        <DevicesSection />
        <LoopSection />
        <ProvidersSection />
        <DashboardSection />
        <TrustSection />
        <FaqSection />
        <FinalCta />
      </main>

      <Footer />

      <BackToTop />
    </div>
  );
}
