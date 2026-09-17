import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext.jsx';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const navContainerRef = useRef(null);
  const langMenuRef = useRef(null);
  const { lang, setLang, t, languages } = useLanguage();

  const navItems = [
    { id: 'hero', label: t.nav.home },
    { id: 'solution', label: t.nav.product },
    { id: 'how', label: t.nav.how },
    { id: 'smart', label: t.nav.intelligence },
    { id: 'algeria', label: t.nav.about },
  ];

  const currentLanguage = languages.find((l) => l.code === lang) || languages[0];

  const updateIndicator = (element) => {
    if (element && navContainerRef.current) {
      const containerRect = navContainerRef.current.getBoundingClientRect();
      const itemRect = element.getBoundingClientRect();
      setIndicatorStyle({
        left: `${itemRect.left - containerRect.left}px`,
        width: `${itemRect.width}px`,
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => document.getElementById(item.id)).filter(Boolean);
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const activeEl = document.querySelector(`.nav-links a[data-id="${activeSection}"]`);
    if (activeEl) {
      updateIndicator(activeEl);
    }
  }, [activeSection, lang]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <a href="#hero" className="logo">
          <img src="/logo-brand.webp" alt="TAQA Contrôle" className="logo-img" onError={(e) => { e.currentTarget.src = '/logo.webp'; }} />
        </a>
        <nav className="nav-links" ref={navContainerRef}>
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              data-id={item.id}
              className={activeSection === item.id ? 'active' : ''}
              onMouseEnter={(e) => updateIndicator(e.currentTarget)}
              onMouseLeave={() => {
                const activeEl = document.querySelector(`.nav-links a[data-id="${activeSection}"]`);
                updateIndicator(activeEl);
              }}
            >
              {item.label}
            </a>
          ))}
          <div className="nav-indicator" style={indicatorStyle} />
        </nav>

        <div className="nav-right">
          <div className="lang-switcher" ref={langMenuRef}>
            <button
              type="button"
              className="lang-switcher-btn"
              onClick={() => setLangMenuOpen((open) => !open)}
              aria-haspopup="listbox"
              aria-expanded={langMenuOpen}
            >
              {currentLanguage.short}
              <ChevronDown size={14} className={`lang-chevron ${langMenuOpen ? 'open' : ''}`} />
            </button>
            {langMenuOpen && (
              <ul className="lang-menu" role="listbox">
                {languages.map((language) => (
                  <li key={language.code}>
                    <button
                      type="button"
                      className={`lang-menu-item ${language.code === lang ? 'active' : ''}`}
                      role="option"
                      aria-selected={language.code === lang}
                      onClick={() => {
                        setLang(language.code);
                        setLangMenuOpen(false);
                      }}
                    >
                      {language.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <a href="#final" className="btn btn-primary">
            {t.nav.cta} <span className="btn-arrow">→</span>
          </a>
        </div>
      </div>
    </header>
  );
}
