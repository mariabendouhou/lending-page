import React from 'react';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import MagneticButton from './ui/MagneticButton';
import { Reveal } from './ui/Reveal';
import { Icon3D } from './icons3d';

/**
 * Narrative beat 7 — the close. Ends on the thesis rather than on a platitude,
 * and the primary CTA is the same string as the hero's (audit §10 flagged two
 * different primary CTAs competing for the same action).
 */
export default function FinalCta() {
  const { t, isRtl } = useLanguage();

  return (
    <section className="final-cta section-dark" id="final">
      <div className="final-bg" aria-hidden="true" />

      <div className="wrap final-inner">
        <Reveal className="final-icon" variant="scale">
          <Icon3D name="bolt" size={72} interactive={false} />
        </Reveal>
        <Reveal as="h2" delay={0.06}>
          {t.finalCta.title}
        </Reveal>
        <Reveal as="p" className="final-sub" delay={0.12}>
          {t.finalCta.sub}
        </Reveal>
        <Reveal className="final-ctas" delay={0.18}>
          <MagneticButton href="#hero" className="btn btn-primary">
            {t.finalCta.button}
            <span className="btn-arrow" aria-hidden="true">
              {isRtl ? '←' : '→'}
            </span>
          </MagneticButton>
          <MagneticButton href="#providers" className="btn btn-ghost" strength={6}>
            {t.finalCta.secondary}
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}
