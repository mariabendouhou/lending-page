import React from 'react';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { Icon3D } from './icons3d';
import SectionHead from './ui/SectionHead';
import GlowCard from './ui/GlowCard';

/**
 * Features, each stated as a consequence rather than a capability name, and
 * each one a thing the platform actually does (PLATFORM-OVERVIEW, Part 2):
 * bill scan with OCR correction, payment through the Sonelgaz portal, the
 * tranche ladder, issued-vs-scanned separation, the merged alert feed, and
 * multi-home sharing.
 *
 * Icon and copy are paired one-to-one: no icon carries two meanings in this grid.
 */
const FEATURE_ICONS = ['scan', 'pay', 'tranche', 'bill', 'alerts', 'family'];

export default function FeaturesSection() {
  const { t } = useLanguage();

  return (
    <section className="features-section section-light" id="features">
      <div className="wrap">
        <SectionHead eyebrow={t.features.eyebrow} title={t.features.title} align="center" />

        <div className="features-grid">
          {t.features.items.map((item, i) => (
            <GlowCard key={item.title} className="feature-card" delay={(i % 3) * 0.08}>
              <Icon3D name={FEATURE_ICONS[i]} size={58} label={item.title} className="feature-icon" />
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
}
