import { useEffect } from 'react';
import { useLanguage, LOCALE_PATHS, SITE_URL } from '../i18n/LanguageContext.jsx';
import { BRAND } from '../i18n/translations';

/**
 * JSON-LD, rebuilt whenever the language changes (audit §11 — the page had none
 * at all, despite carrying a six-question FAQ).
 *
 * Emits Organization, SoftwareApplication and FAQPage. The build step writes the
 * same graph statically into each pre-rendered locale head, so crawlers that do
 * not run JS still see it; this keeps it correct after a client-side switch.
 */
const SCRIPT_ID = 'taqa-jsonld';

export default function StructuredData() {
  const { t, lang } = useLanguage();

  useEffect(() => {
    const url = `${SITE_URL}${LOCALE_PATHS[lang]}`;
    const brand = BRAND[lang] || BRAND.fr;

    const graph = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': `${SITE_URL}/#organization`,
          name: brand,
          alternateName: 'TaQa Contrôle',
          url: SITE_URL,
          logo: `${SITE_URL}/logo-brand.webp`,
          areaServed: { '@type': 'Country', name: 'Algeria' },
          slogan: t.footer.tagline,
        },
        {
          '@type': 'SoftwareApplication',
          '@id': `${SITE_URL}/#app`,
          name: brand,
          applicationCategory: 'UtilitiesApplication',
          operatingSystem: 'Android, iOS, Web',
          inLanguage: lang,
          url,
          description: t.meta.description,
          publisher: { '@id': `${SITE_URL}/#organization` },
          featureList: t.features.items.map((item) => item.title),
        },
        {
          '@type': 'FAQPage',
          '@id': `${url}#faq`,
          inLanguage: lang,
          mainEntity: t.faq.items.map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: { '@type': 'Answer', text: item.a },
          })),
        },
        {
          '@type': 'WebPage',
          '@id': url,
          url,
          name: t.meta.title,
          description: t.meta.description,
          inLanguage: lang,
          isPartOf: { '@id': `${SITE_URL}/#organization` },
        },
      ],
    };

    let script = document.getElementById(SCRIPT_ID);
    if (!script) {
      script = document.createElement('script');
      script.id = SCRIPT_ID;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(graph);
  }, [t, lang]);

  return null;
}
