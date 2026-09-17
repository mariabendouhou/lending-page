import React from 'react';
import { Plug, BarChart3, Brain, Leaf, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext.jsx';

export default function HowItWorks() {
  const { t, isRtl } = useLanguage();

  const steps = [
    {
      idx: '01',
      title: t.how.step1Title,
      description: t.how.step1Desc,
      icon: <Plug size={24} strokeWidth={2} />,
      delay: '0s',
    },
    {
      idx: '02',
      title: t.how.step2Title,
      description: t.how.step2Desc,
      icon: <BarChart3 size={24} strokeWidth={2} />,
      delay: '0.1s',
    },
    {
      idx: '03',
      title: t.how.step3Title,
      description: t.how.step3Desc,
      icon: <Brain size={24} strokeWidth={2} />,
      delay: '0.2s',
    },
    {
      idx: '04',
      title: t.how.step4Title,
      description: t.how.step4Desc,
      icon: <Leaf size={24} strokeWidth={2} />,
      delay: '0.3s',
    },
  ];

  return (
    <section className="how" id="how">
      <div className="wrap">
        <div className="how-head reveal-left">
          <div className="eyebrow dark">{t.how.eyebrow}</div>
          <h2>{t.how.title}</h2>
        </div>

        <div className="how-process-grid">
          {steps.map((step, index) => (
            <div
              key={step.idx}
              className="how-step-col reveal-scale"
              data-delay={step.delay}
            >
              <div className="how-icon-row">
                <div className="how-dark-circle">
                  {step.icon}
                </div>
                {index < steps.length - 1 && (
                  <div className="how-arrow-connector">
                    <div className="how-arrow-line"></div>
                    {isRtl ? (
                      <ArrowLeft size={15} className="how-arrow-tip" />
                    ) : (
                      <ArrowRight size={15} className="how-arrow-tip" />
                    )}
                  </div>
                )}
              </div>

              <div className="how-step-body">
                <span className="how-step-num">{step.idx}</span>
                <h3 className="how-step-title">{step.title}</h3>
                <p className="how-step-desc">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
