import React from 'react';
import { BarChart3, MapPin, ShieldCheck, Clock } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext.jsx';

const PILLAR_ICONS = [
  <BarChart3 size={17} strokeWidth={2} />,
  <MapPin size={17} strokeWidth={2} />,
  <ShieldCheck size={17} strokeWidth={2} />,
  <Clock size={17} strokeWidth={2} />,
];

const PILLAR_DELAYS = ['0s', '0.1s', '0.2s', '0.3s'];

export default function TechForAlgeria() {
  const { t } = useLanguage();

  const pillars = t.about.pillars.map((pillar, i) => ({
    ...pillar,
    icon: PILLAR_ICONS[i],
    delay: PILLAR_DELAYS[i],
  }));

  return (
    <section className="algeria" id="algeria">
      <div className="wrap">
        <div className="algeria-top reveal">
          <div>
            <div className="eyebrow dark">{t.about.eyebrow}</div>
            <h2>{t.about.title}</h2>
            <p className="algeria-lead">
              {t.about.lead.map((part, i) =>
                part.strong ? <strong key={i}>{part.text}</strong> : <React.Fragment key={i}>{part.text}</React.Fragment>
              )}
            </p>
          </div>
          <div className="algeria-visual">
            <img
              src="/dashboard-laptop-mockup.webp"
              alt={t.about.dashboardPreview}
              className="algeria-visual-img"
              loading="lazy"
            />
          </div>
        </div>

        <div className="pillars">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="pillar reveal-scale" data-delay={pillar.delay}>
              <div className="pillar-icon">{pillar.icon}</div>
              <h3>{pillar.title}</h3>
              <p>{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
