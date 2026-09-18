import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { usePrefersReducedMotion, usePointerTilt } from '../lib/hooks';
import LineIcon from './icons3d/LineIcon';

/**
 * The hero visual: the supplied phone mockup, on a scroll-driven 3D stage.
 *
 * Uses public/mockups/Homepage-phone-mockup.webp directly — it is already a
 * lit, angled device with the real Home screen on it and a proper alpha
 * channel. Framing a raw screenshot in CSS, as this did before, only ever
 * approximated that badly.
 *
 * The callouts name the figures the reader is looking at on that screen, so
 * the mockup argues rather than decorates.
 */
export default function PhoneShowcase() {
  const { t, rtlSign } = useLanguage();
  const reduce = usePrefersReducedMotion();
  const stageRef = useRef(null);
  const { ref: tiltRef, offset, handlers } = usePointerTilt({ disabled: reduce });

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ['start end', 'end start'],
  });

  const spring = { stiffness: 90, damping: 22, mass: 0.6 };
  // The mockup is already shot at an angle, so the scroll rotation stays small:
  // enough to feel alive, not enough to fight the photograph's own perspective.
  const rotY = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [10 * rtlSign, 0, -8 * rtlSign]), spring);
  const rotX = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [-6, 0, 6]), spring);
  const floatY = useSpring(useTransform(scrollYProgress, [0, 1], ['-3%', '3%']), spring);

  const setRef = (el) => {
    stageRef.current = el;
    tiltRef.current = el;
  };

  return (
    <div
      className="phone-showcase"
      ref={setRef}
      onMouseMove={handlers.onPointerMove}
      onMouseLeave={handlers.onPointerLeave}
      style={{
        '--cursor-x': `${(offset.x * 4).toFixed(2)}deg`,
        '--cursor-y': `${(offset.y * -3).toFixed(2)}deg`,
      }}
    >
      <div className="phone-glow" aria-hidden="true" />

      <motion.div
        className="phone-tilt"
        style={reduce ? {} : { rotateY: rotY, rotateX: rotX, y: floatY }}
      >
        <img
          src="/mockups/Homepage-phone-mockup.webp"
          alt={t.alt.heroPhone}
          className="phone-mockup"
          width="900"
          height="1252"
          fetchpriority="high"
          decoding="async"
        />
      </motion.div>

      {t.hero.callouts.map((c, i) => (
        <motion.div
          key={c.label}
          className={`phone-callout callout-${i + 1}`}
          initial={reduce ? { opacity: 0 } : { opacity: 0, x: (i % 2 ? 24 : -24) * rtlSign, scale: 0.94 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.8 + i * 0.18, ease: [0.16, 1, 0.3, 1] }}
        >
          <LineIcon name={c.icon} size={22} tone={c.tone} />
          <span className="callout-text">
            <strong>{c.value}</strong>
            <em>{c.label}</em>
          </span>
        </motion.div>
      ))}
    </div>
  );
}
