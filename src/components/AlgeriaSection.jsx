import React from 'react';
import { Home, Building, Factory, Landmark, Zap } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext.jsx';

export default function AlgeriaSection() {
  const { t } = useLanguage();

  const scaleNodes = [
    { label: t.scale.nodeHome, icon: <Home size={20} /> },
    { label: t.scale.nodeBuilding, icon: <Building size={20} /> },
    { label: t.scale.nodeCompany, icon: <Factory size={20} /> },
    { label: t.scale.nodeCity, icon: <Landmark size={20} /> },
    { label: t.scale.nodeCountry, icon: <Zap size={22} />, isFinal: true },
  ];

  return (
    <section className="scale">
      <div className="wrap reveal-scale">
        <div className="eyebrow">{t.scale.eyebrow}</div>
        <h2>
          {t.scale.titleLine1}<br />
          {t.scale.titleLine2}
        </h2>

        <div className="scale-row">
          {scaleNodes.map((node, index) => (
            <React.Fragment key={node.label}>
              <div className={`scale-node ${node.isFinal ? 'final' : ''}`}>
                <div className="node-circle">{node.icon}</div>
                <span>{node.label}</span>
              </div>
              {index < scaleNodes.length - 1 && (
                <div className="scale-connector"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
