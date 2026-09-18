import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { usePrefersReducedMotion } from '../lib/hooks';
import { VIEWPORT, drawLine } from '../lib/motion';
import { Icon3D } from './icons3d';
import SectionHead from './ui/SectionHead';
import GlowCard from './ui/GlowCard';
import { Reveal } from './ui/Reveal';

const CARD_ICONS = ['visibility', 'tranche', 'peak'];

/**
 * Narrative beat 1 — the problem.
 *
 * Answers "why does the bill shock you": you get no feedback for a quarter,
 * the tranche cliff is steep, and summer pushes you over it. Each card carries
 * a real figure so the section argues rather than asserts.
 */
export default function ProblemSection() {
  const { t } = useLanguage();
  const reduce = usePrefersReducedMotion();

  return (
    <section className="problem-section section-light" id="problem">
      <div className="problem-bg" aria-hidden="true" />

      <div className="wrap">
        <SectionHead
          eyebrow={t.problem.eyebrow}
          title={t.problem.title}
          lead={t.problem.lead}
          tone="light"
        />

        {/* The 90-day blind spot, drawn: a quarter of silence, then one spike
            of information on the day the bill lands. */}
        <Reveal className="blindspot" variant="scale" delay={0.1}>
          <svg viewBox="0 0 800 140" preserveAspectRatio="none" role="img" aria-label={t.problem.lead}>
            <defs>
              <linearGradient id="bs-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FC8B7E" stopOpacity="0.32" />
                <stop offset="100%" stopColor="#FC8B7E" stopOpacity="0" />
              </linearGradient>
            </defs>

            <motion.path
              d="M0 118 H640 L664 118 C676 118 680 24 700 24 S724 118 736 118 H800"
              fill="none"
              stroke="#FC8B7E"
              strokeWidth="2.5"
              strokeLinecap="round"
              variants={drawLine({ reduce, duration: 2.2 })}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
            />
            <motion.path
              d="M640 118 C676 118 680 24 700 24 S724 118 736 118 Z"
              fill="url(#bs-fill)"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.6, delay: 1.5 }}
            />
            {[0, 1, 2].map((i) => (
              <motion.line
                key={i}
                x1={213 * i + 8}
                y1="128"
                x2={213 * i + 8}
                y2="104"
                stroke="#B9F2D5"
                strokeOpacity="0.35"
                strokeWidth="1.5"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.15 }}
              />
            ))}
          </svg>
        </Reveal>

        <div className="problem-cards">
          {t.problem.cards.map((card, i) => (
            <GlowCard key={card.title} className="problem-card" delay={i * 0.1}>
              <Icon3D name={CARD_ICONS[i]} size={60} label={card.title} className="problem-card-icon" />
              <div className="problem-card-stat">
                <strong>{card.stat}</strong>
                <span>{card.statUnit}</span>
              </div>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </GlowCard>
          ))}
        </div>

        <Reveal className="problem-footnote" delay={0.2} as="p">
          {t.problem.footnote}
        </Reveal>
      </div>
    </section>
  );
}
