import React from 'react';
import { Zap, BarChart3, Leaf } from 'lucide-react';

export default function ProblemSection() {
  const problemCards = [
    {
      id: 'voir',
      icon: <Zap size={22} strokeWidth={2.2} />,
      title: 'Voir',
      description: 'Découvrez quels appareils consomment le plus.',
      delay: '0s',
    },
    {
      id: 'comprendre',
      icon: <BarChart3 size={22} strokeWidth={2.2} />,
      title: 'Comprendre',
      description: 'Transformez les données en informations simples.',
      delay: '0.1s',
    },
    {
      id: 'ameliorer',
      icon: <Leaf size={22} strokeWidth={2.2} />,
      title: 'Améliorer',
      description: 'Agissez pour réduire les gaspillages.',
      delay: '0.2s',
    },
  ];

  return (
    <section className="problem" id="problem">
      <div className="problem-bg-decor"></div>
      <div className="wrap problem-inner">
        <div className="problem-head reveal-left">
          <div className="eyebrow on-light">LE PROBLÈME</div>
          <h2>Où part vraiment votre énergie ?</h2>
          <p>
            La plupart des foyers consomment de l'énergie chaque jour sans savoir
            quels appareils consomment le plus, quand la consommation augmente,
            ou combien cela coûte.
          </p>
        </div>

        <div className="problem-card-grid">
          {problemCards.map((card) => (
            <div
              key={card.id}
              className="p-card reveal-scale"
              data-delay={card.delay}
            >
              <div className="p-icon-wrap">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
