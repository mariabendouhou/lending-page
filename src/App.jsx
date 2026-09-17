import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProblemSolutionComparison from './components/ProblemSolutionComparison';
import HowItWorks from './components/HowItWorks';
import SmartControl from './components/SmartControl';
import TechForAlgeria from './components/TechForAlgeria';
import AlgeriaSection from './components/AlgeriaSection';
import Footer from './components/Footer';

export default function App() {
  useEffect(() => {
    // Scroll reveal observer
    const observerOptions = {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll(
      '.reveal, .reveal-left, .reveal-right, .reveal-scale'
    );
    revealElements.forEach((el) => {
      if (el.dataset.delay) {
        el.style.transitionDelay = el.dataset.delay;
      }
      revealObserver.observe(el);
    });

    return () => {
      revealElements.forEach((el) => revealObserver.unobserve(el));
    };
  }, []);

  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Hero />
        <ProblemSolutionComparison />
        <HowItWorks />
        <SmartControl />
        <TechForAlgeria />
        <AlgeriaSection />
      </main>
      <Footer />
    </div>
  );
}
