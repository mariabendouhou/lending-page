import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { usePrefersReducedMotion } from '../lib/hooks';
import { VIEWPORT, growBar } from '../lib/motion';
import { TRANCHES } from './BillMeter';
import { Icon3D } from './icons3d';
import SectionHead from './ui/SectionHead';
import { Reveal, RevealGroup, RevealItem } from './ui/Reveal';

const PILLAR_ICONS = ['tranche', 'bill', 'visibility'];

/** Where a 246 kWh quarter actually sits — used to place the "you are here" marker. */
const CURRENT_KWH = 246;

/**
 * Narrative beat 2 — the solution: visibility per circuit and per tranche.
 *
 * The tranche chart is the centrepiece and draws itself on scroll. Its bars are
 * proportional to the real Sonelgaz prices, so the tranche-2 cliff is visible
 * rather than described.
 */
export default function SolutionSection() {
  const { t, fmt, isRtl } = useLanguage();
  const reduce = usePrefersReducedMotion();

  const maxPrice = Math.max(...TRANCHES.map((band) => band.price));
  const currentBand = TRANCHES.findIndex((band) => CURRENT_KWH <= band.upTo);

  return (
    <section className="solution-section section-dark" id="solution">
      <div className="wrap">
        <SectionHead eyebrow={t.solution.eyebrow} title={t.solution.title} lead={t.solution.lead} />

        <div className="solution-body">
          <RevealGroup className="solution-pillars" each={0.12}>
            {t.solution.pillars.map((pillar, i) => (
              <RevealItem key={pillar.title} className="solution-pillar">
                <Icon3D name={PILLAR_ICONS[i]} size={54} label={pillar.title} />
                <div>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="tranche-chart" variant="in" delay={0.15}>
            <h3 className="tranche-chart-title">{t.solution.tranches.heading}</h3>

            <div className="tranche-bars">
              {TRANCHES.map((band, i) => {
                const height = (band.price / maxPrice) * 100;
                const isCurrent = i === currentBand;
                return (
                  <div key={i} className={`tranche-bar-col ${isCurrent ? 'is-current' : ''}`}>
                    <span className="tranche-price">
                      {fmt.kwh(band.price)}
                      <em>{t.solution.tranches.price}</em>
                    </span>
                    {/* Own row, so it cannot cover the price label above it. */}
                    <div className="tranche-marker">
                      {isCurrent ? (
                        <motion.span
                          className="tranche-you"
                          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={VIEWPORT}
                          transition={{ duration: 0.5, delay: 0.7 }}
                        >
                          {t.solution.tranches.you}
                          <span className="tranche-you-arrow" aria-hidden="true">
                            ▼
                          </span>
                        </motion.span>
                      ) : null}
                    </div>

                    <div className="tranche-bar-track">
                      <motion.div
                        className="tranche-bar"
                        style={{ height: `${height}%`, transformOrigin: 'bottom' }}
                        variants={growBar({ index: i, reduce })}
                        initial="hidden"
                        whileInView="visible"
                        viewport={VIEWPORT}
                      />
                    </div>
                    <span className="tranche-legend">{t.solution.tranches.legend[i]}</span>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
