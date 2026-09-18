import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import LanguageSwitcher from './LanguageSwitcher';
import MagneticButton from './ui/MagneticButton';

const SECTIONS = ['hero', 'problem', 'how', 'devices', 'providers', 'faq'];

export default function Navbar() {
  const { t, isRtl } = useLanguage();
  const [active, setActive] = useState('hero');
  const [indicator, setIndicator] = useState({ opacity: 0 });
  const [mobileOpen, setMobileOpen] = useState(false);
  const listRef = useRef(null);

  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 120], [0, 1]);

  const items = [
    { id: 'hero', label: t.nav.home },
    { id: 'problem', label: t.nav.problem },
    { id: 'how', label: t.nav.how },
    { id: 'devices', label: t.nav.devices },
    { id: 'providers', label: t.nav.providers },
    { id: 'faq', label: t.nav.faq },
  ];

  // Active section via IntersectionObserver rather than a scroll handler, so
  // nothing runs on the main thread while the page is being scrolled.
  useEffect(() => {
    const targets = SECTIONS.map((id) => document.getElementById(id)).filter(Boolean);
    if (!targets.length) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.2, 0.5] }
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // The pill follows the active link. Uses transform, not left/width.
  const moveIndicator = (el) => {
    if (!el || !listRef.current) return;
    const container = listRef.current.getBoundingClientRect();
    const rect = el.getBoundingClientRect();
    setIndicator({
      opacity: 1,
      width: rect.width,
      x: rect.left - container.left,
    });
  };

  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-id="${active}"]`);
    moveIndicator(el);
  }, [active, isRtl, t]);

  useEffect(() => {
    document.body.classList.toggle('nav-open', mobileOpen);
    return () => document.body.classList.remove('nav-open');
  }, [mobileOpen]);

  return (
    <header className="nav">
      <motion.div className="nav-bg" style={{ opacity: bgOpacity }} aria-hidden="true" />

      <div className="wrap nav-inner">
        <a href="#hero" className="logo" aria-label={t.alt.logo}>
          <img
            src="/logo-brand.webp"
            alt={t.alt.logo}
            className="logo-img"
            width="132"
            height="32"
            onError={(e) => {
              e.currentTarget.src = '/logo.webp';
            }}
          />
        </a>

        <nav className="nav-links" ref={listRef} aria-label={t.nav.menu}>
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              data-id={item.id}
              className={active === item.id ? 'is-active' : ''}
              aria-current={active === item.id ? 'true' : undefined}
              onMouseEnter={(e) => moveIndicator(e.currentTarget)}
              onMouseLeave={() => moveIndicator(listRef.current?.querySelector(`[data-id="${active}"]`))}
            >
              {item.label}
            </a>
          ))}
          <motion.span
            className="nav-indicator"
            aria-hidden="true"
            animate={indicator}
            transition={{ type: 'spring', stiffness: 420, damping: 34 }}
          />
        </nav>

        <div className="nav-right">
          <LanguageSwitcher />
          <MagneticButton href="#final" className="btn btn-primary nav-cta">
            {t.nav.cta}
            <span className="btn-arrow" aria-hidden="true">
              {isRtl ? '←' : '→'}
            </span>
          </MagneticButton>
          <button
            type="button"
            className="nav-burger"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? t.nav.close : t.nav.menu}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <motion.nav
        className="nav-mobile"
        initial={false}
        animate={{
          opacity: mobileOpen ? 1 : 0,
          y: mobileOpen ? 0 : -12,
          pointerEvents: mobileOpen ? 'auto' : 'none',
        }}
        transition={{ duration: 0.25 }}
        aria-hidden={!mobileOpen}
      >
        {items.map((item) => (
          <a key={item.id} href={`#${item.id}`} onClick={() => setMobileOpen(false)}>
            {item.label}
          </a>
        ))}
        <a href="#final" className="btn btn-primary" onClick={() => setMobileOpen(false)}>
          {t.nav.cta}
        </a>
      </motion.nav>
    </header>
  );
}
