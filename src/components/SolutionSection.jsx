import React from 'react';
import { Check } from 'lucide-react';

export default function SolutionSection() {
  const checklist = [
    'Consommation en temps réel',
    'Historique quotidien et mensuel',
    'Estimation des coûts',
    'Empreinte carbone',
    'Suivi par appareil',
  ];

  return (
    <section className="solution" id="solution">
      <div className="wrap solution-inner">
        <div className="solution-content reveal-left">
          <div className="eyebrow">Notre solution</div>
          <h2>
            Votre énergie.<br />
            À un seul endroit.
          </h2>
          <p className="solution-desc">
            Une vue complète et intuitive de votre consommation, de vos coûts et
            de votre empreinte carbone, mise à jour en continu.
          </p>
          <ul className="checklist">
            {checklist.map((item, index) => (
              <li key={index}>
                <div className="check-icon-wrap">
                  <Check size={14} strokeWidth={3} />
                </div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="dash-ph reveal-right">
          <img
            src="/dashboard.webp"
            alt="Dashboard de consommation d'énergie TAQA"
            className="dash-img"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
