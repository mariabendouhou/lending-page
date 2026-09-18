import React from 'react';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { Icon3D } from './icons3d';
import SectionHead from './ui/SectionHead';
import GlowCard from './ui/GlowCard';
import MagneticButton from './ui/MagneticButton';
import Counter from './ui/Counter';
import { Reveal, RevealGroup, RevealItem } from './ui/Reveal';

/** The four portal capabilities that run against the real backend today. */
const ITEM_ICONS = ['wilaya', 'inbox', 'alerts', 'bill'];
const ALARM_ICONS = ['anomaly', 'circuit'];

/**
 * The operator portal (PLATFORM-OVERVIEW, Part 1).
 *
 * Deliberately leads with the four surfaces that are live — the wilaya-scoped
 * map, the resident-report inbox and dispatch board, the public-alert composer,
 * and bill issuance — and states the grid domain (peak analytics, shedding,
 * ESG) as roadmap, because it has no backend behind it. Marketing seven
 * MSW-backed screens as shipped is the one thing this section must not do.
 */
export default function ProvidersSection() {
  const { t, isRtl } = useLanguage();

  return (
    <section className="providers-section section-dark" id="providers">
      <div className="providers-bg" aria-hidden="true" />

      <div className="wrap">
        <SectionHead
          eyebrow={t.providers.eyebrow}
          title={t.providers.title}
          lead={t.providers.lead}
          tone="dark"
        />

        <div className="providers-grid">
          {t.providers.items.map((item, i) => (
            <GlowCard key={item.title} className="provider-card" delay={(i % 2) * 0.08}>
              <Icon3D name={ITEM_ICONS[i]} size={56} label={item.title} />
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </GlowCard>
          ))}
        </div>

        {/* The two fault distinctions. These are the most persuasive thing the
            portal has to say to an operator: they are the difference between
            dispatching a crew correctly and dispatching it somewhere else. */}
        <div className="alarm-block">
          <Reveal as="h3" className="alarm-block-title">
            {t.providers.alarms.title}
          </Reveal>
          <RevealGroup className="alarm-grid" each={0.12}>
            {t.providers.alarms.items.map((item, i) => (
              <RevealItem key={item.title} className="alarm-card">
                <Icon3D name={ALARM_ICONS[i]} size={48} label={item.title} />
                <h4>{item.title}</h4>
                <p>{item.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <Reveal className="providers-stat" variant="scale" delay={0.15}>
          <div className="providers-stat-value">
            <Counter to={21828} duration={2200} />
            <span className="providers-stat-unit">{t.providers.stat.unit}</span>
          </div>
          <p>{t.providers.stat.label}</p>
          <MagneticButton href="#final" className="btn btn-outline">
            {t.providers.cta}
            <span className="btn-arrow" aria-hidden="true">
              {isRtl ? '←' : '→'}
            </span>
          </MagneticButton>
        </Reveal>

        <Reveal className="providers-roadmap" as="p" delay={0.2}>
          {t.providers.roadmap}
        </Reveal>
      </div>
    </section>
  );
}
