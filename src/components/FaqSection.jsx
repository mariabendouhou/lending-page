import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { usePrefersReducedMotion } from '../lib/hooks';
import { EASE_OUT } from '../lib/motion';
import SectionHead from './ui/SectionHead';
import { RevealGroup, RevealItem } from './ui/Reveal';

/**
 * FAQ. Lifted out of Footer.jsx, which was rendering three unrelated sections.
 *
 * The answer panel animates with height:auto through framer rather than the old
 * max-height + padding transition — same visual, but it no longer animates two
 * layout properties on every open.
 */
export default function FaqSection() {
  const { t } = useLanguage();
  const reduce = usePrefersReducedMotion();
  const [open, setOpen] = useState(null);

  return (
    <section className="faq section-light" id="faq">
      <div className="wrap faq-inner">
        <SectionHead eyebrow={t.faq.eyebrow} title={t.faq.title} lead={t.faq.desc} tone="light" />

        <RevealGroup className="faq-list" each={0.07}>
          {t.faq.items.map((item, index) => {
            const isOpen = open === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;
            return (
              <RevealItem key={item.q} className={`faq-item ${isOpen ? 'is-open' : ''}`} y={18}>
                <h3 className="faq-q-wrap">
                  <button
                    type="button"
                    id={buttonId}
                    className="faq-q"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : index)}
                  >
                    <span>{item.q}</span>
                    <motion.span
                      className="faq-plus"
                      aria-hidden="true"
                      animate={{ rotate: isOpen ? 135 : 0 }}
                      transition={reduce ? { duration: 0 } : { duration: 0.3, ease: EASE_OUT }}
                    >
                      +
                    </motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className="faq-a"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={reduce ? { duration: 0 } : { duration: 0.35, ease: EASE_OUT }}
                    >
                      <p>{item.a}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
