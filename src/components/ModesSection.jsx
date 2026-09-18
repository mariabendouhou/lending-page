import React from 'react';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { Icon3D } from './icons3d';
import SectionHead from './ui/SectionHead';
import GlowCard from './ui/GlowCard';
import { Reveal } from './ui/Reveal';

const MODE_ICONS = ['bill', 'module'];
const POINT_ICONS = [
  ['scan', 'readings', 'tranche', 'pay'],
  ['realtime', 'detection', 'circuit', 'budget'],
];

/**
 * Two ways to start (PLATFORM-OVERVIEW, "Onboarding": a household chooses Basic
 * — a phone and a paper bill — or a paired kit).
 *
 * This is the section the page was missing entirely. Leading with the kit made
 * hardware look like the price of entry, when the whole Basic mode exists so it
 * isn't: scan the bill, enter readings by hand, follow the tranche ladder, pay.
 */
export default function ModesSection() {
  const { t } = useLanguage();

  return (
    <section className="modes-section section-light" id="modes">
      <div className="wrap">
        <SectionHead
          eyebrow={t.modes.eyebrow}
          title={t.modes.title}
          lead={t.modes.lead}
          align="center"
        />

        <div className="modes-grid">
          {t.modes.cards.map((card, i) => (
            <GlowCard
              key={card.title}
              className={`mode-card ${i === 0 ? 'is-basic' : 'is-kit'}`}
              delay={i * 0.1}
            >
              <header className="mode-card-head">
                <Icon3D name={MODE_ICONS[i]} size={58} label={card.title} />
                <span className="mode-badge">{card.badge}</span>
              </header>

              <h3>{card.title}</h3>
              <p className="mode-card-body">{card.body}</p>

              <ul className="mode-points">
                {card.points.map((point, j) => (
                  <li key={point}>
                    <Icon3D name={POINT_ICONS[i][j]} size={30} interactive={false} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </GlowCard>
          ))}
        </div>

        <Reveal className="modes-note" as="p" delay={0.18}>
          {t.modes.note}
        </Reveal>
      </div>
    </section>
  );
}
