import React from 'react';
import { Reveal } from './Reveal';

/** Eyebrow → H2 → lead. The same rhythm in every section. */
export default function SectionHead({ eyebrow, title, lead, tone = 'light', align = 'start', id }) {
  return (
    <header className={`section-head section-head-${tone} align-${align}`}>
      {eyebrow ? (
        <Reveal className={`eyebrow eyebrow-${tone}`} as="p">
          {eyebrow}
        </Reveal>
      ) : null}
      <Reveal as="h2" delay={0.06} className="section-title" id={id}>
        {title}
      </Reveal>
      {lead ? (
        <Reveal as="p" delay={0.12} className="section-lead">
          {lead}
        </Reveal>
      ) : null}
    </header>
  );
}
