import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { translations, LANGUAGES, DEFAULT_LANG, RTL_LANGS, BRAND } from './translations';
import {
  formatDzd,
  formatInt,
  formatKwh,
  formatNumber,
  formatPercent,
  formatWatts,
  interpolate,
} from './format';

const STORAGE_KEY = 'taqa-lang';
const LanguageContext = createContext(null);

/** Locale routes are pre-rendered at build time: "/" = fr, "/en/", "/ar/". */
export const LOCALE_PATHS = { fr: '/', en: '/en/', ar: '/ar/' };
export const SITE_URL = 'https://taqacontrole.com';

function langFromPath(pathname) {
  const match = /^\/(en|ar)(\/|$)/.exec(pathname || '');
  return match ? match[1] : null;
}

function langFromNavigator() {
  if (typeof navigator === 'undefined') return null;
  const candidates = navigator.languages || [navigator.language];
  for (const tag of candidates) {
    if (!tag) continue;
    const base = String(tag).toLowerCase().split('-')[0];
    if (translations[base]) return base;
  }
  return null;
}

function savedLang() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved && translations[saved] ? saved : null;
  } catch {
    return null; // private mode / blocked storage
  }
}

/**
 * The path is authoritative.
 *
 * Each locale route is pre-rendered with its own <html lang>, title, canonical
 * and og:locale, so the running app must agree with the URL it was served from.
 * Letting navigator.language win here made "/" (the French canonical) render in
 * English while still serving the French <head> — a metadata mismatch Google
 * reads as a broken hreflang cluster.
 */
function getInitialLang() {
  if (typeof window === 'undefined') return DEFAULT_LANG;
  const fromPath = langFromPath(window.location.pathname);
  if (fromPath) return fromPath;
  const fromQuery = new URLSearchParams(window.location.search).get('lang');
  if (fromQuery && translations[fromQuery]) return fromQuery;
  return DEFAULT_LANG;
}

/**
 * Only consulted at the root path, and applied through setLang — which rewrites
 * the URL — so preference and route never drift apart.
 */
function preferredLang() {
  if (typeof window === 'undefined') return null;
  if (langFromPath(window.location.pathname)) return null; // an explicit route
  if (new URLSearchParams(window.location.search).get('lang')) return null;
  return savedLang() || langFromNavigator();
}

/**
 * Proxy that falls back to French for any key a locale has not defined yet,
 * instead of throwing on `t.a.b` when `a` is undefined. Prevents a missing key
 * from blanking the page.
 */
function withFallback(target, fallback) {
  if (target === null || target === undefined) return fallback;
  if (typeof target !== 'object' || Array.isArray(target)) return target;
  return new Proxy(target, {
    get(obj, key) {
      if (key in obj) {
        const value = obj[key];
        const fb = fallback && typeof fallback === 'object' ? fallback[key] : undefined;
        if (value && typeof value === 'object' && !Array.isArray(value)) {
          return withFallback(value, fb);
        }
        return value;
      }
      const fb = fallback && typeof fallback === 'object' ? fallback[key] : undefined;
      if (fb !== undefined && import.meta.env.DEV) {
        console.warn(`[i18n] missing key "${String(key)}" — falling back to ${DEFAULT_LANG}`);
      }
      return fb;
    },
  });
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(getInitialLang);
  // setLang is defined below; the mount effect reaches it through this ref
  const setLangRef = useRef(null);

  const isRtl = RTL_LANGS.includes(lang);
  const t = useMemo(
    () => withFallback(translations[lang] || translations[DEFAULT_LANG], translations[DEFAULT_LANG]),
    [lang]
  );

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = isRtl ? 'rtl' : 'ltr';
    root.setAttribute('data-lang', lang);
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
  }, [lang, isRtl]);

  // Keep <head> in sync for the client-side switch. The pre-rendered per-locale
  // heads (scripts/build-locales.mjs) are what crawlers and social scrapers see;
  // this handles the in-page language switch for real users.
  useEffect(() => {
    const meta = translations[lang]?.meta;
    if (!meta) return;
    document.title = meta.title;

    const setMeta = (selector, attr, value) => {
      const el = document.head.querySelector(selector);
      if (el) el.setAttribute(attr, value);
    };
    setMeta('meta[name="description"]', 'content', meta.description);
    setMeta('meta[name="keywords"]', 'content', meta.keywords || '');
    setMeta('meta[property="og:title"]', 'content', meta.title);
    setMeta('meta[property="og:description"]', 'content', meta.description);
    setMeta('meta[property="og:locale"]', 'content', meta.ogLocale);
    setMeta('meta[property="og:image:alt"]', 'content', meta.ogAlt);
    setMeta('meta[property="og:url"]', 'content', `${SITE_URL}${LOCALE_PATHS[lang]}`);
    setMeta('meta[name="twitter:title"]', 'content', meta.title);
    setMeta('meta[name="twitter:description"]', 'content', meta.description);
    setMeta('meta[name="twitter:image:alt"]', 'content', meta.ogAlt);
    const canonical = document.head.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', `${SITE_URL}${LOCALE_PATHS[lang]}`);
  }, [lang]);

  // At "/", honour a returning visitor's saved choice (or their browser
  // language) by moving them to that locale's real route, rather than rendering
  // a different language than the URL claims.
  useEffect(() => {
    const preferred = preferredLang();
    if (preferred && preferred !== lang) setLangRef.current(preferred);
    // mount only — a later switch is the visitor's explicit choice
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setLang = useCallback((next) => {
    if (!translations[next]) return;
    setLangState(next);
    // Reflect the locale in the URL so the address bar matches the pre-rendered
    // route and the link stays shareable.
    if (typeof window !== 'undefined' && window.history?.replaceState) {
      const target = LOCALE_PATHS[next];
      const hash = window.location.hash || '';
      if (window.location.pathname !== target) {
        window.history.replaceState(null, '', `${target}${hash}`);
      }
    }
  }, []);

  setLangRef.current = setLang;

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t,
      languages: LANGUAGES,
      isRtl,
      dir: isRtl ? 'rtl' : 'ltr',
      brand: BRAND[lang] || BRAND[DEFAULT_LANG],
      /** Flip a signed value so directional motion mirrors in RTL. */
      rtlSign: isRtl ? -1 : 1,
      fmt: {
        int: (n) => formatInt(n, lang),
        // "01".."04" step numbers — zero-padded in the locale's own digits,
        // so Arabic gets ٠١ rather than a Latin 0 glued to an Arabic 1.
        pad2: (n) => formatNumber(n, lang, { minimumIntegerDigits: 2, useGrouping: false }),
        kwh: (n) => formatKwh(n, lang),
        dzd: (n) => formatDzd(n, lang),
        watts: (n) => formatWatts(n, lang),
        percent: (n, opts) => formatPercent(n, lang, opts),
      },
      interpolate,
    }),
    [lang, setLang, t, isRtl]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
}
