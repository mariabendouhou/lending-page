import React, { createContext, useContext, useEffect, useState } from 'react';
import { translations, LANGUAGES } from './translations';

const STORAGE_KEY = 'taqa-lang';
const RTL_LANGS = ['ar'];

const LanguageContext = createContext(null);

function getInitialLang() {
  if (typeof window === 'undefined') return 'fr';
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved && translations[saved]) return saved;
  return 'fr';
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = RTL_LANGS.includes(lang) ? 'rtl' : 'ltr';
    window.localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const value = {
    lang,
    setLang,
    t: translations[lang],
    languages: LANGUAGES,
    isRtl: RTL_LANGS.includes(lang),
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
}
