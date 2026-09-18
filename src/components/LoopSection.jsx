import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { usePrefersReducedMotion } from '../lib/hooks';
import { VIEWPORT, drawLine } from '../lib/motion';
import { Icon3D } from './icons3d';
import SectionHead from './ui/SectionHead';
import { RevealGroup, RevealItem } from './ui/Reveal';

const STEP_ICONS = ['scan', 'inbox', 'dispatch', 'budget'];

/**
 * The resident-report → field-dispatch loop (PLATFORM-OVERVIEW, "How the two
 * meet"): a report submitted in the app lands in the operator inbox scoped to
 * that wilaya, becomes a work order, and the status changes come back.
 *
 * It is the strongest proof on the page that both halves of the platform are
 * one system rather than two products sharing a name — and, per the doc, it is
 * one of the five surfaces that already runs against the real backend.
 */
export default function LoopSection() {
  const { t, fmt, isRtl } = useLanguage();
  const reduce = usePrefersReducedMotion();

  return (
    <section className="loop-section section-light" id="loop">
      <div className="loop-bg" aria-hidden="true" />

      <div className="wrap">
        <SectionHead eyebrow={t.loop.eyebrow} title={t.loop.title} lead={t.loop.lead} align="center" />

        {/* the round trip, drawn: out to the operator and back to the resident */}
        <div className="loop-track" aria-hidden="true">
          <svg viewBox="0 0 900 60" preserveAspectRatio="none">
            <motion.path
              d="M20 30 H880"
              fill="none"
              stroke="#69E6B0"
              strokeOpacity="0.4"
              strokeWidth="2"
              strokeDasharray="5 7"
              variants={drawLine({ reduce, duration: 1.8 })}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              style={{ transform: isRtl ? 'scaleX(-1)' : undefined, transformOrigin: 'center' }}
            />
          </svg>
        </div>

        <RevealGroup className="loop-steps" each={0.12}>
          {t.loop.steps.map((step, i) => (
            <RevealItem key={step.title} className="loop-step">
              <div className="loop-step-icon">
                <Icon3D name={STEP_ICONS[i]} size={52} label={step.title} />
              </div>
              <span className="loop-step-num">{fmt.pad2(i + 1)}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
