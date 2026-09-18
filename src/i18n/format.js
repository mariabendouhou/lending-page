/**
 * Locale-aware number / bidi formatting.
 * Fixes the hardcoded "1,240 DZD" and unmarked mixed-direction runs
 * called out in docs/localization-audit.md §11.
 */

const LRM = '‎'; // left-to-right mark
const NBSP = ' ';
const MINUS = '−';

const INTL_LOCALE = {
  fr: 'fr-DZ',
  en: 'en-US',
  ar: 'ar-DZ',
};

/** Arabic-Indic digits, used so AR numerals match the surrounding script. */
const AR_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

export function toArabicDigits(str) {
  return String(str).replace(/[0-9]/g, (d) => AR_DIGITS[Number(d)]);
}

export function formatNumber(value, lang, options = {}) {
  const locale = INTL_LOCALE[lang] || INTL_LOCALE.fr;
  let out;
  try {
    // ar-DZ conventionally uses Latin digits; we force Arabic-Indic for visual
    // consistency with the surrounding Arabic copy.
    out = new Intl.NumberFormat(lang === 'ar' ? 'ar-DZ-u-nu-arab' : locale, options).format(value);
  } catch {
    out = String(value);
  }
  return out;
}

/** Integer with thousands grouping: 1 240 (fr) · 1,240 (en) · ١٢٤٠ (ar) */
export function formatInt(value, lang) {
  return formatNumber(Math.round(value), lang, { maximumFractionDigits: 0 });
}

/** kWh with one decimal. */
export function formatKwh(value, lang) {
  return formatNumber(value, lang, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

/** Currency in dinars, never € or $. FR gets its no-break space automatically. */
export function formatDzd(value, lang) {
  const n = formatInt(value, lang);
  if (lang === 'ar') return `${n}${NBSP}دج`;
  return `${n}${NBSP}DZD`;
}

/** Watts, with the unit in the right script. */
export function formatWatts(value, lang) {
  const n = formatInt(value, lang);
  if (lang === 'ar') return `${n}${NBSP}واط`;
  return `${n}${NBSP}W`;
}

/**
 * Percentage. FR requires a no-break space before %; AR uses ٪ and needs an
 * LRM so a leading minus does not jump to the wrong side of the number.
 */
export function formatPercent(value, lang, { signed = false } = {}) {
  const abs = Math.abs(value);
  const n = formatInt(abs, lang);
  const sign = value < 0 ? MINUS : signed ? '+' : '';
  if (lang === 'ar') return `${LRM}${sign}${n}٪`;
  if (lang === 'fr') return `${sign}${n}${NBSP}%`;
  return `${sign}${n}%`;
}

/** Wrap a Latin run (brand names, "54 M", "CO₂") so it renders correctly in RTL. */
export function isolateLatin(str, lang) {
  return lang === 'ar' ? `${LRM}${str}${LRM}` : str;
}

/** Fill {name}/{n} placeholders in a locale string. */
export function interpolate(template, values = {}) {
  if (typeof template !== 'string') return template;
  return template.replace(/\{(\w+)\}/g, (match, key) =>
    Object.prototype.hasOwnProperty.call(values, key) ? String(values[key]) : match
  );
}

export { NBSP, LRM, MINUS };
