import React from 'react';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { Icon3D } from './icons3d';
import SectionHead from './ui/SectionHead';
import GlowCard from './ui/GlowCard';
import { Reveal, RevealGroup, RevealItem } from './ui/Reveal';

const TRIAD_ICONS = ['simple', 'secure', 'algerian'];
const ITEM_ICONS = ['tranche', 'scan', 'wilaya', 'alerts'];
const EXTRA_ICONS = ['secure', 'grid', 'visibility', 'carbon'];

/**
 * Trust, argued from restraint (PLATFORM-OVERVIEW, "What is not built" and the
 * privacy notes on the map).
 *
 * The old version listed reassurances — "certified data", "hosted locally". This
 * one lists the claims the platform deliberately does NOT make: an estimate is
 * never a Sonelgaz figure, a scanned photo is never drawn as a debt, an
 * out-of-scope wilaya returns nothing rather than an error, and a push is
 * recorded as attempted rather than received. Refusals are harder to fake than
 * assurances, which is exactly why they persuade.
 */
export default function TrustSection() {
  const { t } = useLanguage();

  return (
    <section className="trust-section section-dark" id="trust">
      <div className="wrap">
        <Reveal className="trust-triad" variant="scale">
          {t.trust.triad.map((word, i) => (
            <React.Fragment key={word}>
              <span className="trust-triad-item">
                <Icon3D name={TRIAD_ICONS[i]} size={40} interactive={false} />
                {word}
              </span>
              {i < t.trust.triad.length - 1 ? (
                <span className="trust-triad-dot" aria-hidden="true">
                  ·
                </span>
              ) : null}
            </React.Fragment>
          ))}
        </Reveal>

        <SectionHead eyebrow={t.trust.eyebrow} title={t.trust.title} align="center" />

        <div className="trust-grid">
          {t.trust.items.map((item, i) => (
            <GlowCard key={item.title} className="trust-card" delay={(i % 2) * 0.08}>
              <Icon3D name={ITEM_ICONS[i]} size={50} label={item.title} />
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </GlowCard>
          ))}
        </div>

        <RevealGroup className="trust-extra" as="ul" each={0.08}>
          {t.trust.extra.map((line, i) => (
            <RevealItem as="li" key={line} className="trust-extra-item">
              <Icon3D name={EXTRA_ICONS[i]} size={28} interactive={false} />
              <span>{line}</span>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
