import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { usePrefersReducedMotion } from '../lib/hooks';
import { VIEWPORT, drawLine } from '../lib/motion';
import { Icon3D } from './icons3d';
import SectionHead from './ui/SectionHead';
import { RevealGroup, RevealItem } from './ui/Reveal';

const STEP_ICONS = ['remote', 'scan', 'tranche', 'pay'];

/**
 * How it works — sign up → feed it → understand → act.
 *
 * Deliberately NOT "install the module first": the Basic mode (a phone and a
 * paper bill) is the common entry point, so step 1 cannot be hardware.
 *
 * The connecting rail draws itself in the reading direction, so it runs
 * right-to-left in Arabic without a second set of markup.
 */
export default function HowItWorks() {
  const { t, fmt, isRtl } = useLanguage();
  const reduce = usePrefersReducedMotion();

  return (
    <section className="how section-dark" id="how">
      <div className="wrap">
        <SectionHead eyebrow={t.how.eyebrow} title={t.how.title} tone="dark" />

        <div className="how-rail" aria-hidden="true">
          <svg viewBox="0 0 800 4" preserveAspectRatio="none">
            <motion.line
              x1={isRtl ? 800 : 0}
              y1="2"
              x2={isRtl ? 0 : 800}
              y2="2"
              stroke="#69E6B0"
              strokeOpacity="0.45"
              strokeWidth="2"
              strokeDasharray="6 8"
              variants={drawLine({ reduce, duration: 1.6 })}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
            />
          </svg>
        </div>

        <RevealGroup className="how-steps" each={0.14}>
          {t.how.steps.map((step, i) => (
            <RevealItem key={step.title} className="how-step">
              <div className="how-step-icon">
                <Icon3D name={STEP_ICONS[i]} size={64} label={step.title} />
                <span className="how-step-num">{fmt.pad2(i + 1)}</span>
              </div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
