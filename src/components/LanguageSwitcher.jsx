import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { usePrefersReducedMotion } from '../lib/hooks';
import { EASE_OUT } from '../lib/motion';

/**
 * Shared by the navbar and the footer (the footer previously had none).
 * `variant` only changes the styling hook, never the behaviour.
 */
export default function LanguageSwitcher({ variant = 'nav' }) {
  const { lang, setLang, languages, t } = useLanguage();
  const reduce = usePrefersReducedMotion();
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);

  const current = languages.find((l) => l.code === lang) || languages[0];

  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className={`lang-switcher lang-switcher-${variant}`} ref={boxRef}>
      <button
        type="button"
        className="lang-switcher-btn"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t.footer.language}
      >
        <span>{current.short}</span>
        <ChevronDown size={14} className={`lang-chevron ${open ? 'is-open' : ''}`} aria-hidden="true" />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.ul
            className="lang-menu"
            role="listbox"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.97 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
          >
            {languages.map((language) => (
              <li key={language.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={language.code === lang}
                  className={`lang-menu-item ${language.code === lang ? 'is-active' : ''}`}
                  lang={language.code}
                  onClick={() => {
                    setLang(language.code);
                    setOpen(false);
                  }}
                >
                  {language.label}
                </button>
              </li>
            ))}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
