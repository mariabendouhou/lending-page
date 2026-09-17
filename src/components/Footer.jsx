import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Linkedin, Twitter, Instagram, Plus, Mail, Phone } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext.jsx';

export default function Footer() {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState(null);
  const [visibleFaqs, setVisibleFaqs] = useState(() => new Set());
  const faqRefs = useRef([]);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.faqIndex);
            setVisibleFaqs((prev) => (prev.has(index) ? prev : new Set(prev).add(index)));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    faqRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const faqs = t.faq.items;

  const devCredit = (
    <div className="footer-dev-credit">
      <span className="footer-dev-label">{t.footer.devBy}</span>
      <span className="footer-dev-name">SMART TECH INNOVATION</span>
      <a href="mailto:info@smarttechinnovation.com" className="footer-dev-link">
        <Mail size={13} />
        info@smarttechinnovation.com
      </a>
      <a href="tel:+213542622874" className="footer-dev-link">
        <Phone size={13} />
        +213 542 622 874
      </a>
    </div>
  );

  return (
    <>
      {/* FAQ Section */}
      <section className="faq" id="faq">
        <div className="wrap faq-inner">
          <div className="faq-head reveal-left">
            <div className="eyebrow dark">{t.faq.eyebrow}</div>
            <h2>{t.faq.title}</h2>
            <p>
              {t.faq.desc}
            </p>
          </div>

          <div className="faq-list">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              const isVisible = visibleFaqs.has(index);
              return (
                <div
                  key={index}
                  ref={(el) => (faqRefs.current[index] = el)}
                  data-faq-index={index}
                  className={`faq-item reveal-scale ${isVisible ? 'is-visible' : ''} ${isOpen ? 'active' : ''}`}
                  data-delay={`${index * 0.08}s`}
                >
                  <button
                    type="button"
                    className="faq-q"
                    onClick={() => toggleFaq(index)}
                  >
                    <span>{faq.q}</span>
                    <span className="plus">+</span>
                  </button>
                  <div className="faq-a">
                    <p>{faq.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="final-cta" id="final">
        <div className="final-bg"></div>
        <div className="wrap final-inner reveal-scale">
          <h2>
            {t.finalCta.title}
          </h2>
          <a href="#hero" className="btn btn-primary">
            {t.finalCta.button} <ArrowRight size={18} className="btn-arrow" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="wrap">
          {/* Desktop / tablet layout */}
          <div className="footer-top footer-top-desktop">
            <a href="#hero" className="logo">
              <img
                src="/logo-brand.webp"
                alt="TAQA Contrôle"
                className="logo-img"
                onError={(e) => { e.currentTarget.src = '/logo.webp'; }}
              />
            </a>
            <nav className="footer-links">
              <a href="#hero">{t.nav.home}</a>
              <a href="#solution">{t.nav.product}</a>
              <a href="#how">{t.nav.how}</a>
              <a href="#smart">{t.nav.intelligence}</a>
              <a href="#algeria">{t.nav.about}</a>
              <a href="#faq">{t.nav.faq}</a>
            </nav>
            <div className="footer-social">
              <a href="https://www.linkedin.com/company/smart-tech-innovation-software-development" aria-label="LinkedIn">
                <Linkedin size={16} />
              </a>
              <a href="https://x.com/Smarttechinnov" aria-label="X">
                <Twitter size={16} />
              </a>
              <a href="https://www.instagram.com/smart.tech.innovation/" aria-label="Instagram">
                <Instagram size={16} />
              </a>
            </div>
          </div>
          <div className="footer-bottom footer-bottom-desktop">
            {t.footer.copyright}
            {devCredit}
          </div>

          {/* Mobile layout */}
          <div className="footer-mobile">
            <a href="#hero" className="logo">
              <img
                src="/logo-brand.webp"
                alt="TAQA Contrôle"
                className="logo-img"
                onError={(e) => { e.currentTarget.src = '/logo.webp'; }}
              />
            </a>
            <p className="footer-tagline">{t.footer.tagline}</p>
            <div className="footer-social">
              <a href="https://www.linkedin.com/company/smart-tech-innovation-software-development" aria-label="LinkedIn">
                <Linkedin size={16} />
              </a>
              <a href="https://x.com/Smarttechinnov" aria-label="X">
                <Twitter size={16} />
              </a>
              <a href="https://www.instagram.com/smart.tech.innovation/" aria-label="Instagram">
                <Instagram size={16} />
              </a>
            </div>
            <nav className="footer-links footer-links-mobile">
              <a href="#hero">{t.nav.home}</a>
              <a href="#how">{t.nav.how}</a>
              <a href="#solution">{t.nav.product}</a>
              <a href="#algeria">{t.nav.about}</a>
              <a href="#smart">{t.nav.intelligence}</a>
              <a href="#faq">{t.nav.faq}</a>
            </nav>
            <a href="#hero" className="btn btn-primary footer-cta-mobile">
              {t.hero.ctaPrimary} <span className="btn-arrow">→</span>
            </a>
            <div className="footer-bottom-mobile">
              <div className="footer-bottom">{t.footer.copyright}</div>
              {devCredit}
              <div className="footer-legal">
                <a href="#">{t.footer.terms}</a>
                <a href="#">{t.footer.privacy}</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
