/**
 * Post-build: emit one pre-rendered HTML file per locale, plus the sitemap.
 *
 * Why this exists (docs/localization-audit.md §11): the site is a single
 * client-rendered URL with a static French <head>. Social scrapers run no JS, so
 * mutating <head> on a language switch cannot fix OG/Twitter, and without
 * hreflang + distinct URLs Google has nothing to index for EN and AR.
 *
 * Output:
 *   dist/index.html      fr  (as built by Vite)
 *   dist/en/index.html    en
 *   dist/ar/index.html    ar
 *   dist/sitemap.xml      all three, cross-linked with xhtml:link alternates
 *
 * Asset URLs are rewritten to absolute paths so the nested copies resolve.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');

const SITE = 'https://taqacontrole.com';
const LOCALES = ['fr', 'en', 'ar'];
const PATHS = { fr: '/', en: '/en/', ar: '/ar/' };

/** Read the locale copy straight out of the source of truth. */
async function loadMeta() {
  const src = await readFile(path.join(root, 'src/i18n/translations.js'), 'utf8');
  const meta = {};
  for (const locale of LOCALES) {
    // The meta block is the first object inside each locale key.
    const localeAt = src.indexOf(`\n  ${locale}: {`);
    if (localeAt < 0) throw new Error(`locale "${locale}" not found in translations.js`);
    const slice = src.slice(localeAt, localeAt + 4000);
    const pick = (key) => {
      const m = new RegExp(`${key}:\\s*\n?\\s*(['"\`])([\\s\\S]*?)\\1`).exec(slice);
      return m ? m[2] : '';
    };
    meta[locale] = {
      title: pick('title'),
      description: pick('description'),
      ogLocale: pick('ogLocale'),
      ogAlt: pick('ogAlt'),
      keywords: pick('keywords'),
      dir: locale === 'ar' ? 'rtl' : 'ltr',
    };
    if (!meta[locale].title) throw new Error(`no meta.title for "${locale}"`);
  }
  return meta;
}

const escapeAttr = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

function localizeHead(html, locale, meta) {
  const m = meta[locale];
  const url = `${SITE}${PATHS[locale]}`;
  let out = html;

  // <html lang dir>
  out = out.replace(/<html[^>]*>/, `<html lang="${locale}" dir="${m.dir}">`);

  out = out.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeAttr(m.title)}</title>`);

  const setMeta = (attr, name, value) => {
    const re = new RegExp(`(<meta\\s+${attr}="${name}"\\s+content=")[\\s\\S]*?(")`);
    out = re.test(out) ? out.replace(re, `$1${escapeAttr(value)}$2`) : out;
  };

  setMeta('name', 'description', m.description);
  setMeta('name', 'keywords', m.keywords);
  setMeta('property', 'og:title', m.title);
  setMeta('property', 'og:description', m.description);
  setMeta('property', 'og:url', url);
  setMeta('property', 'og:locale', m.ogLocale);
  setMeta('property', 'og:image:alt', m.ogAlt);
  setMeta('name', 'twitter:title', m.title);
  setMeta('name', 'twitter:description', m.description);
  setMeta('name', 'twitter:image:alt', m.ogAlt);

  // canonical points at this locale; the hreflang set is identical everywhere
  out = out.replace(
    /<link rel="canonical"[^>]*>/,
    `<link rel="canonical" href="${url}" />`
  );

  // og:locale:alternate should list the OTHER two locales
  const alternates = LOCALES.filter((l) => l !== locale)
    .map((l) => `    <meta property="og:locale:alternate" content="${meta[l].ogLocale}" />`)
    .join('\n');
  out = out.replace(
    /\s*<meta property="og:locale:alternate"[^>]*>\s*(?:<meta property="og:locale:alternate"[^>]*>\s*)*/,
    `\n${alternates}\n    `
  );

  // Nested routes need absolute asset paths.
  if (PATHS[locale] !== '/') {
    out = out.replace(/(src|href)="\.?\/(?!\/)/g, '$1="/');
  }

  return out;
}

function sitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const entries = LOCALES.map((locale) => {
    const links = LOCALES.map(
      (other) =>
        `      <xhtml:link rel="alternate" hreflang="${other}" href="${SITE}${PATHS[other]}" />`
    ).join('\n');
    return `  <url>
    <loc>${SITE}${PATHS[locale]}</loc>
${links}
      <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}/" />
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${locale === 'fr' ? '1.0' : '0.9'}</priority>
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries}
</urlset>
`;
}

async function main() {
  const meta = await loadMeta();
  const base = await readFile(path.join(dist, 'index.html'), 'utf8');

  // French is the root document.
  await writeFile(path.join(dist, 'index.html'), localizeHead(base, 'fr', meta), 'utf8');

  for (const locale of LOCALES.filter((l) => l !== 'fr')) {
    const dir = path.join(dist, locale);
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, 'index.html'), localizeHead(base, locale, meta), 'utf8');
    console.log(`  ✓ dist/${locale}/index.html — ${meta[locale].title}`);
  }

  await writeFile(path.join(dist, 'sitemap.xml'), sitemap(), 'utf8');
  console.log('  ✓ dist/sitemap.xml — 3 locales with hreflang alternates');
}

main().catch((error) => {
  console.error('build-locales failed:', error.message);
  process.exit(1);
});
