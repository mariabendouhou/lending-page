import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { usePrefersReducedMotion } from '../lib/hooks';
import { EASE_OUT, fadeUp, stagger, wordReveal } from '../lib/motion';
import { Icon3D } from './icons3d';
import MagneticButton from './ui/MagneticButton';
import PhoneShowcase from './PhoneShowcase';

const PROOF_ICONS = ['realtime', 'tranche', 'budget', 'circuit'];

/**
 * Hero: eyebrow → H1 → subheadline → 4 proof points → 2 CTAs.
 *
 * The H1 is the largest text on the page and reveals word by word. The accent
 * clause (t.hero.h1Accent) is found inside the sentence rather than stored as a
 * separate key, so each language decides for itself which words are emphasised
 * without the sentence being chopped into fragments.
 */
export default function Hero() {
  const { t, isRtl } = useLanguage();
  const reduce = usePrefersReducedMotion();

  /**
   * Split the H1 into words, tagging those that fall inside the accent clause.
   *
   * Tokenising the whole sentence once — rather than slicing it around the
   * accent and splitting each piece — matters: the accent usually ends mid-word
   * ("…voir venir" inside "…voir venir."), and slicing first left the trailing
   * "." as a word of its own, rendering as an orphaned period after a space.
   */
  const words = useMemo(() => {
    const sentence = t.hero.h1;
    const accent = t.hero.h1Accent;
    const at = accent ? sentence.indexOf(accent) : -1;
    const accentStart = at;
    const accentEnd = at < 0 ? -1 : at + accent.length;

    const out = [];
    const re = /\S+/g;
    let match;
    while ((match = re.exec(sentence)) !== null) {
      const start = match.index;
      const mid = start + match[0].length / 2;
      out.push({
        word: match[0],
        isAccent: accentStart >= 0 && mid > accentStart && mid < accentEnd,
      });
    }
    return out;
  }, [t.hero.h1, t.hero.h1Accent]);

  return (
    <section className="hero section-dark" id="hero">
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-grid-glow" aria-hidden="true" />

      <div className="wrap hero-inner">
        <div className="hero-text">
          <motion.p
            className="hero-eyebrow"
            variants={fadeUp({ y: 14, duration: 0.6, reduce })}
            initial="hidden"
            animate="visible"
          >
            {t.hero.eyebrow}
          </motion.p>

          <motion.h1
            className="hero-headline"
            variants={stagger({ each: 0.055, delayChildren: 0.12, reduce })}
            initial="hidden"
            animate="visible"
          >
            {/* aria-label carries the clean sentence; the spans are decorative
                so a screen reader is not read a word-per-element stream */}
            <span className="sr-only">{t.hero.h1}</span>
            <span aria-hidden="true">
              {words.map(({ word, isAccent }, i) => (
                // The real space between masks matters: spacing the words with
                // CSS margin alone makes them concatenate when copied.
                <React.Fragment key={`${word}-${i}`}>
                  <span className="hero-word-mask">
                    <motion.span
                      className={`hero-word ${isAccent ? 'accent' : ''}`}
                      variants={wordReveal({ reduce })}
                    >
                      {word}
                    </motion.span>
                  </span>{' '}
                </React.Fragment>
              ))}
            </span>
          </motion.h1>

          <motion.p
            className="hero-sub"
            variants={fadeUp({ delay: 0.2, reduce })}
            initial="hidden"
            animate="visible"
          >
            {t.hero.sub}
          </motion.p>

          <motion.ul
            className="hero-proof"
            variants={stagger({ each: 0.08, delayChildren: 0.32, reduce })}
            initial="hidden"
            animate="visible"
          >
            {t.hero.proof.map((line, i) => (
              <motion.li key={line} className="hero-proof-item" variants={fadeUp({ y: 16, reduce })}>
                <Icon3D name={PROOF_ICONS[i]} size={40} label={line} className="hero-proof-icon" />
                <span>{line}</span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            className="hero-ctas"
            variants={fadeUp({ delay: 0.5, reduce })}
            initial="hidden"
            animate="visible"
          >
            <MagneticButton href="#final" className="btn btn-primary">
              {t.hero.ctaPrimary}
              <span className="btn-arrow" aria-hidden="true">
                {isRtl ? '←' : '→'}
              </span>
            </MagneticButton>
            <MagneticButton href="#providers" className="btn btn-hero-secondary" strength={6}>
              {t.hero.ctaSecondary}
            </MagneticButton>
          </motion.div>

          {/* Hardware is not the price of entry — said right under the CTA,
              because the subheadline above describes the kit and a reader
              without one should not conclude the product is not for them. */}
          <motion.p
            className="hero-nokit"
            variants={fadeUp({ y: 12, delay: 0.62, reduce })}
            initial="hidden"
            animate="visible"
          >
            <a href="#modes">{t.hero.noKit}</a>
          </motion.p>
        </div>

        <motion.div
          className="hero-visual"
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 30 }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: EASE_OUT }}
        >
          <PhoneShowcase />
        </motion.div>
      </div>
    </section>
  );
}
