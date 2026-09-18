import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { usePrefersReducedMotion } from '../lib/hooks';
import { VIEWPORT_EARLY, drawLine } from '../lib/motion';
import { BRAND } from '../i18n/translations';
import LanguageSwitcher from './LanguageSwitcher';
import { Reveal } from './ui/Reveal';

/**
 * TODO_REPLACE — the SmartTech Innovation website. Listed in the handover
 * summary; this is the only place the URL appears.
 */
export const SMARTTECH_URL = 'TODO_REPLACE';

/** Traces for the animated circuit pattern. Drawn, then quietly pulsing. */
const TRACES = [
  'M0 120 H180 V60 H420 V150 H700 V90 H960',
  'M0 40 H120 V170 H340 V30 H620 V120 H960',
  'M0 190 H260 V110 H520 V190 H960',
];

const NODES = [
  [180, 120],
  [420, 60],
  [700, 150],
  [120, 40],
  [340, 170],
  [620, 30],
  [260, 190],
  [520, 110],
];

/**
 * Footer (brief §3.7).
 *
 * Minimal: logo, tagline, language switcher, © year, and the developer credit.
 * The long contact blocks are gone — and with them the duplicated
 * desktop/mobile DOM trees and the two dead legal links that pointed at "#".
 *
 * The empty background now carries an animated circuit pattern, a soft gradient
 * glow, and a large faint watermark of the brand name — طاقة in Arabic.
 */
export default function Footer() {
  const { t, lang, isRtl } = useLanguage();
  const reduce = usePrefersReducedMotion();
  const year = new Date().getFullYear();
  const watermark = lang === 'ar' ? 'طاقة' : 'TaQa';

  return (
    <footer className="site-footer section-dark">
      {/* ── background ─────────────────────────────────────────────────────── */}
      <div className="footer-glow" aria-hidden="true" />

      <div className="footer-circuit" aria-hidden="true">
        <svg viewBox="0 0 960 220" preserveAspectRatio="none">
          <defs>
            <linearGradient id="fc-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#69E6B0" stopOpacity="0.05" />
              <stop offset="50%" stopColor="#69E6B0" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#69E6B0" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {TRACES.map((d, i) => (
            <motion.path
              key={d}
              d={d}
              fill="none"
              stroke="url(#fc-grad)"
              strokeWidth="1.4"
              strokeLinejoin="round"
              variants={drawLine({ reduce, duration: 2.4, delay: i * 0.25 })}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_EARLY}
            />
          ))}

          {NODES.map(([cx, cy], i) =>
            reduce ? (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.5" fill="#69E6B0" fillOpacity="0.35" />
            ) : (
              <motion.circle
                key={`${cx}-${cy}`}
                cx={cx}
                cy={cy}
                r="2.5"
                fill="#69E6B0"
                animate={{ opacity: [0.18, 0.75, 0.18], scale: [1, 1.5, 1] }}
                transition={{
                  duration: 3.2,
                  repeat: Infinity,
                  delay: i * 0.35,
                  ease: 'easeInOut',
                }}
                style={{ transformOrigin: `${cx}px ${cy}px` }}
              />
            )
          )}
        </svg>
      </div>

      <span className="footer-watermark" aria-hidden="true">
        {watermark}
      </span>

      {/* ── content ────────────────────────────────────────────────────────── */}
      <div className="wrap footer-inner">
        <Reveal className="footer-brand">
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
          <p className="footer-tagline">{t.footer.tagline}</p>
        </Reveal>

        <Reveal className="footer-side" delay={0.08}>
          <LanguageSwitcher variant="footer" />
          <a href="#hero" className="footer-top-link">
            {t.footer.backToTop}
            <span aria-hidden="true">{isRtl ? '↑' : '↑'}</span>
          </a>
        </Reveal>
      </div>

      <div className="wrap footer-bottom">
        <p className="footer-copy">
          © {year} {BRAND[lang] || BRAND.fr} — {t.footer.rights}
        </p>
        <p className="footer-dev">
          {t.footer.devBy}{' '}
          <a href={SMARTTECH_URL} target="_blank" rel="noopener noreferrer">
            <strong>SmartTech Innovation</strong>
          </a>
        </p>
      </div>
    </footer>
  );
}
