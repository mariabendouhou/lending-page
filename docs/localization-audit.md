# Localization audit — TaQa Contrôle landing page

Audit date: 2026-09-17. Phase 2 deliverable. Source of truth: `src/i18n/translations.js` (652 lines),
plus hardcoded strings in components. **Report only — no code was modified for this audit.**

Severity key: **S1** = wrong/misleading or brand-damaging · **S2** = meaning drift or missing key ·
**S3** = style, grammar, tone, capitalization.

---

## 0. Critical Arabic fix — the brand name

### The finding

The brief asked for occurrences of **تاقة**. There are **zero**. The defect is present but spelled differently:
the codebase uses **`تاقا`** (ت + ا + ق + ا) — a phonetic transliteration of the Latin "TAQA" — never the Arabic
word for energy. Same class of error, same fix.

- **Wrong:** `تاقا` / `تاقا كنترول` — ت (tāʾ), and ending in ا. Means nothing in Arabic; reads as a foreign
  syllable, which destroys the entire point of the name.
- **Correct:** **`طاقة`** — ط (ṭāʾ), ending in ة. This is the Arabic word for *energy*.
- **Correct product name:** **`طاقة كونترول`** (note also `كنترول` → `كونترول`, the standard Arabic
  transcription of "contrôle/control"; the existing `كنترول` drops the و and reads clipped).

**All 19 occurrences are in `src/i18n/translations.js`. Nothing else in the repo is affected** — confirmed by
sweeping the whole tree (components, `index.html`, `public/*.svg`, `sitemap.xml`, `robots.txt`, alt text, the
Google verification file). There is **no** `manifest.json`, and no image in `public/` contains Arabic text, so
there are no binary assets to re-render.

### Every occurrence, enumerated

| # | Line | Key | Current (wrong) | Fix |
|---|---|---|---|---|
| 1 | 446 | `ar.hero.desc` | `تساعدك **تاقا** على فهم…` | Replaced wholesale by the new approved subheadline (§1) |
| 2 | 447 | `ar.hero.ctaPrimary` | `ابدأ مع **تاقا**` | Replaced by `ابدأ المتابعة` (§1) |
| 3 | 461 | `ar.ps.subtitleLine2` | `**تاقا كنترول** تغيّر كل ذلك.` | `**طاقة كونترول** يغيّر ذلك.` (also fixes verb gender, §9) |
| 4 | 468 | `ar.ps.problemBadge` | `بدون **تاقا كنترول**` | `بدون **طاقة كونترول**` |
| 5 | 480 | `ar.ps.solutionBadge` | `مع **تاقا كنترول**` | `مع **طاقة كونترول**` |
| 6 | 501 | `ar.ps.bannerTag` | `— **تاقا كنترول**` | `— **طاقة كونترول**` |
| 7 | 525 | `ar.how.step2Desc` | `تجمع **تاقا** استهلاكك.` | `يقيس **طاقة كونترول** استهلاكك لحظة بلحظة.` |
| 8 | 545 | `ar.smart.solarDesc` | `تعمل **تاقا** تلقائيًا…` | `يُحسّن **طاقة كونترول** مصادر طاقتك تلقائيًا…` |
| 9 | 549 | `ar.ai.title` | `**تاقا** تتعلم عاداتك.` | `**طاقة كونترول** يتعلّم عاداتك.` |
| 10 | 550 | `ar.ai.desc` | `تحلل **تاقا** استهلاكك…` | `يحلّل **طاقة كونترول** استهلاكك…` |
| 11 | 571 | `ar.about.lead[0]` | `تعتمد **تاقا كنترول** على ` | `يعتمد **طاقة كونترول** على ` |
| 12 | 577 | `ar.about.dashboardPreview` | `معاينة لوحة تحكم **تاقا كنترول**` | `معاينة لوحة تحكّم **طاقة كونترول**` |
| 13 | 610 | `ar.faq.desc` | `…وتركيب **تاقا**.` | `…وتركيب **طاقة كونترول**.` |
| 14 | 614 | `ar.faq.items[0].a` | `تتصل **تاقا** بمنشأتك…` | `يتّصل **طاقة كونترول** بتركيبتك…` |
| 15 | 618 | `ar.faq.items[1].a` | `تُركَّب **تاقا** كإضافة…` | `يُركَّب **طاقة كونترول** كإضافة…` |
| 16 | 626 | `ar.faq.items[3].a` | `صُممت **تاقا** لتكون مرنة` | `صُمّم **طاقة كونترول** ليكون مرنًا` |
| 17 | 629 | `ar.faq.items[4].q` | `هل يمكن **لتاقا** قطع أجهزتي…` | `هل يمكن **لطاقة كونترول** قطع أجهزتي…` (proclitic ل + ط) |
| 18 | 636 | `ar.finalCta.button` | `اكتشف **تاقا**` | `اكتشف **طاقة كونترول**` |
| 19 | 639 | `ar.footer.copyright` | `© 2026 **تاقا** — جميع…` | `© 2026 **طاقة كونترول** — جميع…` |

### Two traps in the fix

1. **A blind find-and-replace is unsafe.** The same file already contains **9 correct** uses of `طاقة` as the
   ordinary noun *energy* — `للطاقة` (446), `طاقتك` (hero accent, 545, smart), `الطاقة` (ps.tag context, about),
   `الطاقوية` (573). Replacing `تاقا`→`طاقة` is safe because the strings are disjoint, but the reverse sweep
   ("find all طاقة and check it's the brand") must not touch these. Fix is scoped to the 19 rows above.
2. **`لتاقا` at line 629 is prefixed.** It is the preposition ل fused to the name. Replacing only the bare token
   `تاقا` leaves `لطاقا`. It must be handled as `لتاقا` → `لطاقة كونترول`.

### Consequence for Arabic grammar throughout — **S1**

`تاقا` was treated as **feminine** (`تاقا تتعلم`, `تحلل تاقا`, `صُممت تاقا`, `تعتمد تاقا كنترول`). The approved
AR subheadline in the brief treats the brand as **masculine**: *«يُريك طاقة كونترول…»*. One convention has to win,
and the brief's does. **Every AR sentence where the brand is the subject needs its verb re-agreed to masculine** —
rows 3, 7, 8, 9, 10, 11, 14, 15, 16 above. This is not optional polish: mixed gender agreement on a brand name
reads as machine translation, which is precisely the impression this page must not give.

---

## 1. Hero — `hero` · **the worst-affected section**

| Key | EN | FR | AR | Issue | Proposed fix (EN / FR / AR) |
|---|---|---|---|---|---|
| `titleLine1` + `titlePrefix` + `titleAccent` | "Take control" / "of your " / "energy." | "Prenez le contrôle" / "de votre " / "énergie." | "تحكّم" / "في " / "طاقتك." | **S1 — the H1 is a category cliché.** "Take control of your energy" is interchangeable with Emporia and Smappee, states no problem, and gives the reader nothing they didn't already assume. It also splits the sentence across 3 keys purely for the accent colour, which makes it untranslatable without re-deciding where the accent falls per language. | Replace with the approved single-string H1, plus a separate `h1Accent` marking the clause to highlight: **EN** "Your bill isn't the problem. Not seeing it coming is." / **FR** "Le problème, ce n'est pas votre facture. C'est de ne pas la voir venir." / **AR** "المشكلة ليست في فاتورتك، بل في أنك لا تراها قادمة." |
| *(new)* `eyebrow` | — | — | — | **S2 — missing key.** There is no hero eyebrow at all; the H1 starts cold. | **EN** "See it. Understand it. Save." / **FR** "Voyez. Comprenez. Économisez." / **AR** "راقب. افهم. وفّر." |
| `desc` | "TAQA helps you understand, monitor and optimize your energy consumption, effortlessly." | "TAQA vous aide à comprendre, surveiller et optimiser votre consommation énergétique, tout simplement." | "تساعدك تاقا على فهم ومراقبة وتحسين استهلاكك للطاقة، بكل بساطة." | **S1 — pure feature-verb triplet, zero mechanism.** "understand, monitor, optimize" describes the vendor's ambition. No granularity word, no tranche, no timing, no Sonelgaz. Nothing here could not be said by any of 5 competitors. Also brand name inconsistency: `TAQA` here vs `TAQA CONTROL` in `ps`, vs `Taqa Control` in `about`. | Replace with the approved subheadline naming circuit-level granularity, the Sonelgaz tranche, and the pre-bill warning (full text in the brief §3.1). |
| `ctaPrimary` | "Get started with TAQA" | "Commencer avec TAQA" | "ابدأ مع تاقا" | **S3** — "Get started with <brand>" is about the brand, not the outcome. | **EN** "Start monitoring" / **FR** "Commencer le suivi" / **AR** "ابدأ المتابعة" |
| `ctaSecondary` | "Discover how it works" | "Découvrir comment ça marche" | "اكتشف كيف يعمل" | **S1 — wrong job.** Points at `#how`, duplicating the navbar. The second CTA must open the provider audience, which currently has **no entry point anywhere on the page**. | **EN** "For energy providers" / **FR** "Pour les fournisseurs d'énergie" / **AR** "لمزوّدي الطاقة" — anchored to the new provider section. |
| `benefit1` | "Real-time tracking" | "Suivi en temps réel" | "متابعة في الوقت الفعلي" | **S3 (AR)** — "في الوقت الفعلي" is the literal calque of "in real time"; **لحظية** is shorter, idiomatic, and fits the 390px constraint. | **EN** "Real-time tracking per circuit" / **FR** "Suivi en temps réel par circuit" / **AR** "متابعة لحظية لكل دائرة" |
| `benefit2` | "Lower expenses" | "Moins de dépenses" | "نفقات أقل" | **S1 — an unevidenced outcome promise.** We have no audited savings figure (see research §3.1); the category's 4–8% claims invite scrutiny we can't answer. Replace an outcome we can't prove with a capability we can. | **EN** "Your bill broken down by tranche" / **FR** "Votre facture détaillée par tranche" / **AR** "تفصيل فاتورتك حسب الشرائح" |
| `benefit3` | "A more sustainable future" | "Un futur plus durable" | "مستقبل أكثر استدامة" | **S1 — corporate filler.** Says nothing about the product and is the weakest of the three. | **EN** "Alerts for peaks, anomalies and budget" / **FR** "Alertes : pics, anomalies, budget" / **AR** "تنبيهات الذروة والأعطال والميزانية" |
| *(new)* `benefit4` | — | — | — | **S2 — missing.** Remote control is a headline capability and appears nowhere in the hero. | **EN** "Turn circuits on or off remotely" / **FR** "Pilotez vos circuits à distance" / **AR** "تحكّم في دوائرك عن بُعد" |
| `metricWeek` | "vs last week" | "vs semaine dernière" | "مقارنة بالأسبوع الماضي" | **S2 — meaning drift + a factual bug.** The card renders `12%` with a **down-arrow** icon but the label never says *down*; and FR uses the English "vs" where "par rapport à" is standard. EN/FR read as −12%, AR as a flat comparison. | Make direction explicit and consistent: **EN** "−12% vs last week" / **FR** "−12 % par rapport à la semaine dernière" / **AR** "‎−12٪ مقارنة بالأسبوع الماضي". Note FR requires a **non-breaking space before `%`**; AR should use the Arabic percent sign ٪. |
| `metricEstimated` | "estimated" | "estimé" | "تقديري" | **S2** — "1,240 DZD estimated" is ambiguous: estimated for what period? The whole quarter is the meaningful unit under Sonelgaz billing. | **EN** "estimated this quarter" / **FR** "estimé ce trimestre" / **AR** "تقديري هذا الفصل" |
| `metricToday` | "Today" | "Aujourd'hui" | "اليوم" | OK | — |
| *(hardcoded)* `1,240 DZD` | `Hero.jsx:63` | | | **S2 — un-localized number format.** Hardcoded with an English comma separator. FR wants `1 240 DZD` (narrow no-break space), AR wants Arabic digit grouping. | Move into the locale bundle or format with `Intl.NumberFormat(lang)`. |
| *(hardcoded)* alt `"Application TAQA sur smartphone"` | `Hero.jsx:34` | | | **S1 — French alt text served to EN and AR users.** Also an SEO surface. | Add `hero.phoneAlt` in all three. |

### Slogan consolidation — **S1, the single most visible inconsistency**

Three competing slogans are live simultaneously:

| Where | EN | FR | AR |
|---|---|---|---|
| `hero.desc` | "understand, monitor and optimize" | "comprendre, surveiller et optimiser" | "فهم ومراقبة وتحسين" |
| `ps` pillars (`pillar1–3`) | "More visibility / More control / More responsible energy" | "Plus de visibilité / Plus de contrôle / Une énergie plus responsable" | "رؤية أوضح / تحكم أكبر / طاقة أكثر مسؤولية" |
| `how` steps 2–4 | "Measure / Understand / Optimize" | "Mesurez / Comprenez / Optimisez" | "قِس / افهم / حسّن" |

Three different three-beat rhythms in one scroll, none of them matching the others, and **the brief's
"Voyez. Comprenez. Économisez." appears nowhere in the codebase** — so the "competing slogans" named in the brief
are in fact *three* variants, not two. **Resolution: one canonical triad, used verbatim in exactly one place —
the hero eyebrow.** `See it. Understand it. Save.` / `Voyez. Comprenez. Économisez.` / `راقب. افهم. وفّر.` The
`ps` pillars become benefit statements instead of a rhythm (see §2), and the `how` steps become the mechanism
(device → app → alert → control), which is their actual job. No other section may restate the triad.

---

## 2. Problem/Solution comparison — `ps`

| Key | EN | FR | AR | Issue | Proposed fix (EN / FR / AR) |
|---|---|---|---|---|---|
| `tag` | "THE CHALLENGES" | "LES DÉFIS" | "التحديات" | **S3** — "challenges" is consultant-speak and softens the problem into an abstraction. | "THE REAL PROBLEM" / "LE VRAI PROBLÈME" / "المشكلة الحقيقية" |
| `titleLine1/2` | "Energy shouldn't / be a surprise." | "L'énergie ne devrait pas / être une surprise." | "الطاقة لا ينبغي / أن تكون مفاجأة." | **S2 — close to right but aimed at the wrong noun.** It's not energy that surprises you, it's the *bill*. Sharpening this also stops it competing with the H1. | "The bill arrives. / Three months too late." / "La facture arrive. / Trois mois trop tard." / "تأتي الفاتورة، / بعد ثلاثة أشهر من فوات الأوان." |
| `subtitleLine1/2` | "Too often, you discover your consumption on the bill, / you suffer the costs and react too late. TAQA CONTROL changes that." | "Trop souvent, on découvre sa consommation sur la facture, / on subit les coûts et on réagit trop tard. TAQA CONTRÔLE change la donne." | "غالبًا ما نكتشف استهلاكنا عند استلام الفاتورة، / ونتحمل التكاليف ونتصرف بعد فوات الأوان. تاقا كنترول تغيّر كل ذلك." | **S2 ×3.** (a) **Person drift:** EN is 2nd person ("you"), FR switches to impersonal "on", AR to 1st-person plural "نكتشف/نتحمل". Three different voices for one sentence. (b) The strongest local fact — Sonelgaz bills **quarterly**, so the blind spot is up to 90 days — is absent. (c) Brand `تاقا كنترول` + feminine verb (§0). | Unify on 2nd person in all three, and name the quarter: **EN** "Sonelgaz reads your meter once a quarter. Until then, you're guessing — and a habit you form in June is first priced in September." **FR** "Sonelgaz relève votre compteur une fois par trimestre. D'ici là, vous avancez à l'aveugle : une habitude prise en juin ne se paie qu'en septembre." **AR** "تُقرأ عدّادك مرّة كل ثلاثة أشهر. إلى ذلك الحين أنت تُخمّن — وما تعتاده في جوان لا تدفعه إلا في سبتمبر." |
| `pillar1Title/Desc` | "More visibility" / "into your consumption" | "Plus de visibilité" / "sur votre consommation" | "رؤية أوضح" / "لاستهلاكك" | **S1 — grammatical split across two keys.** The title/desc pair is one sentence chopped in half, so each language is forced into the *French* word order. AR "رؤية أوضح / لاستهلاكك" is not a natural clause break. Plus it's slogan #2 (§1). | Make each pillar one self-contained benefit string: **EN** "See every circuit, not just a total" / **FR** "Voyez chaque circuit, pas seulement un total" / **AR** "اعرف كل دائرة، لا المجموع فقط" |
| `pillar2Title/Desc` | "More control" / "over your spending" | "Plus de contrôle" / "sur vos dépenses" | "تحكم أكبر" / "في نفقاتك" | Same **S1** split. | **EN** "Know your tranche before you cross it" / **FR** "Connaissez votre tranche avant de la franchir" / **AR** "اعرف شريحتك قبل أن تتجاوزها" |
| `pillar3Title/Desc` | "More responsible" / "energy use" | "Une énergie" / "plus responsable" | "طاقة" / "أكثر مسؤولية" | **S1 — split falls in a different place in every language.** EN splits adjective|noun, FR and AR split noun|adjective. Nobody can maintain this. | **EN** "Cut what you waste, in kg CO₂" / **FR** "Réduisez le gaspillage, en kg CO₂" / **AR** "قلّل الهدر، بالكيلوغرام من ثاني أكسيد الكربون" |
| `problemBadge` / `solutionBadge` | "WITHOUT TAQA CONTROL" / "WITH TAQA CONTROL" | "SANS TAQA CONTRÔLE" / "AVEC TAQA CONTRÔLE" | "بدون تاقا كنترول" / "مع تاقا كنترول" | **S1 — brand name is spelled four different ways across the file:** `TAQA`, `TAQA CONTROL`, `TAQA CONTRÔLE`, `Taqa Control` (+ `تاقا`, `تاقا كنترول`). | **Freeze one lockup per language:** EN `TaQa Contrôle`, FR `TaQa Contrôle`, AR `طاقة كونترول`. Keep the circumflex in EN too — it's the registered name, and `taqacontrole.com` confirms it. Add a glossary entry. |
| `problem1Title/Desc` | "No visibility" / "You discover your consumption on the bill." | "Pas de visibilité" / "Vous découvrez votre consommation sur la facture." | "غياب الرؤية" / "تكتشف استهلاكك عند وصول الفاتورة." | **S2 — verbatim duplicate of `subtitleLine1`** two elements above it. The same sentence is on screen twice. | Differentiate to the appliance level: **EN** "You can't name the appliance that did it." / **FR** "Impossible de désigner l'appareil responsable." / **AR** "لا تستطيع تحديد الجهاز المسؤول." |
| `problem2Title/Desc` | "Unclear costs" / "You don't know why your bill is going up." | "Des coûts flous" / "Vous ne savez pas pourquoi votre facture augmente." | "تكاليف غامضة" / "لا تعرف لماذا ترتفع فاتورتك." | **S2 — key is dead.** Defined in all 3 languages but **never rendered**; `ProblemSolutionComparison.jsx` has a gap where problem 2 was (blank lines at ~`:139`). Its matching `sol2Title/Desc` + `donutHeading` + 4 `legend*` keys are also orphaned. | Either restore the pair — it's the single best slot for the tranche-jump story — or delete 8 keys × 3 languages. **Recommend restore**, retitled: **EN** "One number, no explanation" / **FR** "Un montant, aucune explication" / **AR** "مبلغ واحد، دون تفسير". |
| `problem3Title/Desc` | "Late reactions" / "You don't know when a problem occurs." | "Des réactions tardives" / "Vous ne savez pas quand un problème survient." | "ردود فعل متأخرة" / "لا تعرف متى تحدث المشكلة." | **S3** — "Late reactions" is a nominalization of the user's failure; blame-shaped. | **EN** "You find out when it's already paid for" / **FR** "Vous l'apprenez quand c'est déjà payé" / **AR** "تعرف بالأمر بعد أن تكون قد دفعته" |
| `problem4Title/Desc` | "No remote control" / "You can't manage your equipment remotely." | "Aucun contrôle à distance" / "Vous ne pouvez pas gérer vos équipements à distance." | "لا تحكم عن بعد" / "لا يمكنك إدارة أجهزتك عن بعد." | **S3 — tautology in all three languages.** The description restates the title with no added information ("No remote control" → "you can't control remotely"). | **EN** "The AC ran all day in an empty house." / **FR** "Le climatiseur a tourné toute la journée dans une maison vide." / **AR** "ظلّ المكيّف يعمل طوال النهار في منزل فارغ." |
| `co2ProblemDesc` | "You don't know the real carbon impact…" | "Vous ignorez l'impact carbone réel…" | "لا تعرف الأثر الكربوني الحقيقي…" | **S3** — third consecutive item opening "You don't know / Vous ne savez pas". The whole problem column is four negations in a row. | Vary the construction; keep one "you don't know" maximum per column. |
| `sol1Desc` | "Your consumption, at any moment." | "Votre consommation, à tout moment." | "استهلاكك، في أي لحظة." | **S3 — feature with no benefit** (brief §3.2/4). "At any moment" is a restatement of "real time". | **EN** "Watch the kitchen spike while it's happening." / **FR** "Voyez le pic de la cuisine pendant qu'il se produit." / **AR** "شاهد ذروة المطبخ لحظة حدوثها." |
| `sol2Desc` | "Your detailed, itemized bill." | "Votre facture détaillée et par tranche." | "فاتورتك مفصلة وموزعة بالشرائح." | **S1 — meaning drift, EN loses the product's core differentiator.** FR and AR both say **"par tranche" / "بالشرائح"**; EN says only "itemized", dropping the Sonelgaz tranche entirely. EN readers never learn about tranches from this string. | **EN** "Your bill split across the 4 Sonelgaz tranches." / **FR** "Votre facture répartie sur les 4 tranches Sonelgaz." / **AR** "فاتورتك موزّعة على شرائح سونلغاز الأربع." |
| `sol4Desc` | "Remotely, over your circuits and equipment." | "À distance, sur vos circuits et équipements." | "عن بعد، في دوائرك وأجهزتك." | **S3** — sentence fragment in all three; no benefit. | **EN** "Turn off what you forgot, from anywhere." / **FR** "Éteignez ce que vous avez oublié, où que vous soyez." / **AR** "أطفئ ما نسيته، أينما كنت." (matches brief §3.6) |
| `bannerLink` | "More than an app. Better management of your energy." | "Plus qu'une application. Une meilleure gestion de votre énergie." | "أكثر من مجرد تطبيق. إدارة أفضل لطاقتك." | **S3** — "More than an app" is a promise with no content, and "better management" is the vaguest possible payoff. | **EN** "More than an app. A meter you can finally read." / **FR** "Plus qu'une application. Un compteur enfin lisible." / **AR** "أكثر من تطبيق. عدّاد يمكنك أخيرًا قراءته." |
| `peakProblemDesc` | "High usage during peak hours drives up your bill without warning." | "Une forte consommation aux heures de pointe fait grimper votre facture sans prévenir." | "الاستهلاك المرتفع في ساعات الذروة يرفع فاتورتك دون سابق إنذار." | **S2 — factually loose.** Algerian household tariff (code 54 M) is **volume-tranche based, not time-of-use**; peak *hours* don't carry a higher household rate. The real mechanism is that peaks push quarterly **volume** across a tranche threshold. As written it's wrong. | **EN** "A hot July pushes your quarter past 1 000 kWh — and every kWh after that costs 5.48 DA." / **FR** "Un juillet de canicule pousse votre trimestre au-delà de 1 000 kWh — et chaque kWh suivant coûte 5,48 DA." / **AR** "شهر جويلية حارّ يدفع فصلك إلى ما بعد 1000 كيلوواط‑ساعة — وكل كيلوواط بعدها بـ 5.48 دج." |
| `tipDesc` | "Shift the water heater to after 10pm to smooth the peak." | "Décalez le chauffe-eau après 22h pour lisser le pic." | "أجّل تشغيل سخان الماء إلى ما بعد الساعة 22:00 لتخفيف الذروة." | **S2 — the advice doesn't save the household money** under a volume tranche (same kWh, same tranche). It helps the *grid*. Keeping it on the household side is a credibility risk if a reader checks. | Move this to the **provider** section (peak shaving = national interest, research §3.3), and give households an advice string that actually reduces volume. |
| `co2WidgetDesc` | "82 kg of CO2 estimated this month." | "82 kg de CO2 estimés ce mois-ci." | "ما يقدَّر بـ 82 كغ من CO2 هذا الشهر." | **S3 ×2.** "CO2" should be **CO₂** (U+2082) in all three; AR mixes Latin "CO2" mid-sentence where **ثاني أكسيد الكربون** or a properly-marked Latin run is needed. Same issue in `co2Badge`, `carbonBadge`, `co2ProblemTitle`. | Normalize to `CO₂` everywhere; in AR prefer the spelled-out form in body copy and reserve `CO₂` for compact badges. |
| `carbonValue` "-18%" | | | | **S2 — a hyphen-minus, not a minus sign, and unlocalized.** In RTL, `-18%` renders with the sign on the wrong side without a directional mark. | Use `−18 %` (U+2212, NBSP) in FR/EN and `‎−18٪` with an LRM in AR. |
| `switchOn` / `switchOff` | "On" / "Off" | "On" / "Off" | "تشغيل" / "إيقاف" | **S3 — mixed languages in FR.** French UI uses English "On/Off". Acceptable in product UI, sloppy on a marketing page. | FR "Activé" / "Éteint". |
| *(hardcoded)* 9 × `alt` | `ProblemSolutionComparison.jsx` | | | **S1 — all nine widget `alt` attributes are French literals** served to EN and AR: `Facture d'électricité`, `Anomalie détectée`, `Aucun contrôle à distance`, `Astuce du jour`, `Éclairage salon`, `Empreinte carbone`, `Pic de consommation`, `Consommation en temps réel`, `Application TAQA Contrôle`. | Add an `alt.*` namespace per locale. |

---

## 3. How it works — `how`

| Key | EN | FR | AR | Issue | Proposed fix (EN / FR / AR) |
|---|---|---|---|---|---|
| `title` | "A simple and effective process" | "Un processus simple et efficace" | "عملية بسيطة وفعالة" | **S3** — describes the diagram, not the outcome; "simple and effective" is content-free. | **EN** "From your panel to your phone, in four steps" / **FR** "De votre tableau électrique à votre téléphone, en quatre étapes" / **AR** "من لوحتك الكهربائية إلى هاتفك، في أربع خطوات" |
| `step1Desc` | "Your energy equipment." | "Vos équipements énergétiques." | "أجهزتك الكهربائية." | **S2 — fragment, and it misdescribes the product.** You don't connect *equipment*; you install a module on the electrical panel (per `faq.items[1]`, which contradicts this string). Also AR says "الكهربائية" (electrical) where FR says "énergétiques" (energy) — drift. | **EN** "A module clips onto your electrical panel. No meter swap." / **FR** "Un module se pose sur votre tableau électrique. Aucun changement de compteur." / **AR** "تُثبّت وحدة على لوحتك الكهربائية. دون تغيير العدّاد." |
| `step2Title/Desc` | "Measure" / "TAQA collects your consumption." | "Mesurez" / "TAQA collecte votre consommation." | "قِس" / "تجمع تاقا استهلاكك." | **S2 — mood mismatch.** The imperative title tells *the user* to measure, the description says the *product* does it. Also brand (§0) and part of slogan #3 (§1). | Titles become the mechanism, not user commands: **EN** "It measures" / **FR** "Il mesure" / **AR** "يقيس" — + "Every circuit, every second, sent to the app." |
| `step3Desc` | "Visualize your habits and devices." | "Visualisez vos habitudes et vos appareils." | "تصوّر عاداتك وأجهزتك." | **S3 (AR)** — **تصوّر** means "imagine/conceive", not "visualize on a screen". This is a dictionary-literal translation and reads wrong to a native reader. | **AR** "شاهد عاداتك وأجهزتك على الشاشة." |
| `step4Desc` | "Receive recommendations and control your consumption." | "Recevez des recommandations et contrôlez votre consommation." | "احصل على توصيات وتحكم في استهلاكك." | **S3** — two unrelated actions in one step; "control your consumption" is the whole product, not step 4. | Split intent: step 4 = act. **EN** "Get an alert, then switch the circuit off from your phone." / **FR** "Recevez une alerte, puis coupez le circuit depuis votre téléphone." / **AR** "يصلك تنبيه، ثم تقطع الدائرة من هاتفك." |

---

## 4. Smart control / devices — `smart`

| Key | EN | FR | AR | Issue | Proposed fix (EN / FR / AR) |
|---|---|---|---|---|---|
| `eyebrow` | "SMART CONTROL" | "CONTRÔLE INTELLIGENT" | "تحكم ذكي" | **S2 — the section is being renamed** to Devices per brief §3.6. | **EN** "DEVICES" / **FR** "APPAREILS" / **AR** "الأجهزة" |
| `titleLine1/2` | "Don't just monitor / your energy. Control it." | "Ne surveillez pas seulement / votre énergie. Contrôlez-la." | "لا تكتفِ بمراقبة / طاقتك. تحكم بها." | **S3** — good line, but it's the 4th "control" claim on the page and the `<br>`-split means the break point is hardcoded for FR length. | Keep the idea, drop the forced break; add the approved supporting line: **EN** "Turn off what you forgot, from anywhere." / **FR** "Éteignez ce que vous avez oublié, où que vous soyez." / **AR** "أطفئ ما نسيته، أينما كنت." |
| `desc` | "Manage your connected devices and prioritize the equipment that really matters." | "Gérez vos appareils connectés et priorisez les équipements qui comptent vraiment." | "أدر أجهزتك المتصلة وأعطِ الأولوية للمعدات الأكثر أهمية." | **S2 — describes a feature the UI doesn't have.** "Prioritize" implies load-priority ordering; the panel only has on/off toggles. Copy promises more than the product shows. | Rewrite to match the rebuilt section: four real circuits, live wattage, remote switch. |
| `tabEssential` / `tabSecondary` | "Essential" / "Secondary" | "Essentiels" / "Secondaires" | "أساسية" / "ثانوية" | **S2 — the whole tab concept is being removed** (brief §3.6: four circuit cards, no tabs). Also **S1 code smell**: `SmartControl.jsx:70` keys state on the French literals `'essentiels'`/`'secondaires'`, so the component's logic is hardcoded to one language. | Delete both keys and the tab state. |
| `deviceEssentialEquip` | "Essential equipment" | "Équipements essentiels" | "المعدات الأساسية" | **S1 — a category label sitting in a list of physical appliances** (fridge, lighting, security…). Not a device. It also shares the generic `Zap` bolt with AC and water heater, so icon and text convey nothing (Phase 1 §6). | Delete. Replaced by the four named circuits below. |
| `deviceFridge` / `deviceSecurity` | "Refrigerator" / "Security" | "Réfrigérateur" / "Sécurité" | "الثلاجة" / "الأمن" | **S2** — not among the four circuits specified in the brief; "Security" is also not a circuit you would ever remote-cut. | Replace the six-device list with the four approved circuits. |
| *(new)* `circuitLighting` | — | — | — | **S2 — missing key** | "Lighting" / "Éclairage" / "الإنارة" |
| *(new)* `circuitSockets` | — | — | — | **S2 — missing key** | "Sockets" / "Prises" / "المقابس" |
| `deviceAc` | "Living room AC" | "Climatiseur Salon" | "مكيف الصالون" | **S3 (FR)** — "Climatiseur Salon" has stray capital S and no article; correct FR is "Climatisation du salon". Per the brief the card is the generic circuit. | "Air conditioning" / "Climatisation" / "المكيّف" |
| `deviceWaterHeater` | "Water heater" | "Chauffe-eau" | "سخان الماء" | **S3 (AR)** — missing shadda: **سخّان**. | "Water heater" / "Chauffe-eau" / "سخّان الماء" |
| `solarTitle` / `solarDesc` | "Solar by day, grid by night." / "TAQA automatically optimizes your energy sources…" | "Solaire le jour, réseau la nuit." / "TAQA optimise automatiquement vos sources d'énergie…" | "طاقة شمسية نهارًا، وشبكة ليلاً." / "تعمل تاقا تلقائيًا…" | **S1 — claims a capability that is not in the product description.** Nothing in the brief's feature set (per-circuit monitoring, tranche breakdown, alerts, remote switching, CO₂) involves solar source switching or PV inverter control. This is an unsupported promise, and a prospect who asks about it will find nothing behind it. | **Recommend cutting the card.** If it must stay, reframe explicitly as roadmap, matching `algeriaCard` "Electricity today. Water and gas tomorrow." |
| *(hardcoded)* alt `"Maison connectée cuisine intelligente"` | `SmartControl.jsx:100` | | | **S1** — French alt in all locales. Also keyword-stuffed ("connected home smart kitchen"). | Localize and describe the actual image. |
| *(missing)* switch state labels | | | | **S2 — the toggles have no accessible or visible state.** `switchOn`/`switchOff` exist under `ps` but are never used by the real toggles; `aria-label` is only the device name, with no `role="switch"`/`aria-checked`. | Reuse one canonical `state.on`/`state.off` pair for both the widget and the live toggles. |

---

## 5. AI section — `ai`

| Key | EN | FR | AR | Issue | Proposed fix (EN / FR / AR) |
|---|---|---|---|---|---|
| `eyebrow` | "ARTIFICIAL INTELLIGENCE" | "INTELLIGENCE ARTIFICIELLE" | "الذكاء الاصطناعي" | **S3** — "AI" as a section label is a technology boast, not a benefit, and dates fast. | **EN** "WHAT IT SPOTS FOR YOU" / **FR** "CE QU'IL REPÈRE POUR VOUS" / **AR** "ما يكتشفه لك" |
| `title` | "TAQA learns your habits." | "TAQA apprend vos habitudes." | "تاقا تتعلم عاداتك." | **S3 + S1(AR)** — mildly surveillance-flavoured; and AR has the wrong brand *and* feminine agreement (§0 row 9). | **EN** "It knows what normal looks like in your home." / **FR** "Il sait à quoi ressemble une journée normale chez vous." / **AR** "يعرف كيف يبدو يومك العادي في المنزل." |
| `card1Desc` | "Anomalies and unusual consumption." | "Anomalies et consommations inhabituelles." | "حالات شاذة واستهلاك غير معتاد." | **S3 — fragment, and tautological** (anomalies = unusual consumption). AR "حالات شاذة" is also clinical/statistical register. | **EN** "A fridge drawing double since Tuesday." / **FR** "Un réfrigérateur qui consomme le double depuis mardi." / **AR** "ثلاجة تستهلك الضعف منذ الثلاثاء." |
| `card2Desc` | "Estimation of your consumption." | "Estimation de votre consommation." | "تقدير استهلاكك." | **S3 — nominalized fragment, no benefit.** | **EN** "Where your quarter lands, before it lands." / **FR** "Où finira votre trimestre, avant qu'il ne finisse." / **AR** "إلى أين يتّجه فصلك، قبل أن ينتهي." |
| `card3Desc` | "Concrete actions to save money." | "Actions concrètes pour économiser." | "إجراءات ملموسة لتوفير المال." | **S2** — promises money savings generically (same unevidenced-outcome problem as `hero.benefit2`). | **EN** "The one change that keeps you under the next tranche." / **FR** "Le geste qui vous garde sous la tranche suivante." / **AR** "الخطوة التي تُبقيك تحت الشريحة التالية." |

---

## 6. Algeria trust card — `algeriaCard`

| Key | EN | FR | AR | Issue | Proposed fix (EN / FR / AR) |
|---|---|---|---|---|---|
| `title` | "Designed for Algeria" | "Pensé pour l'Algérie" | "مصممة من أجل الجزائر" | **S3 (AR)** — feminine **مصممة** agreeing with nothing; with a masculine brand (§0) it must be **مصمّم**. Better still, drop the agreement problem: **"صُمّم من أجل الجزائر"**. | "Designed for Algeria" / "Pensé pour l'Algérie" / "صُمّم من أجل الجزائر" |
| `points[0]` | "Data hosted locally" | "Données hébergées localement" | "بيانات مستضافة محليًا" | **S3** — "locally" is vague (locally on device? in-country?). | **EN** "Your data stays in Algeria" / **FR** "Vos données restent en Algérie" / **AR** "بياناتك تبقى في الجزائر" |
| `points[1]` | "Works even with limited connectivity" | "Fonctionnement même avec une connectivité limitée" | "تعمل حتى مع اتصال محدود" | **S3** — FR is a nominalization ("Fonctionnement") where a verb reads better; genuine differentiator, worth strengthening. | **FR** "Fonctionne même avec une connexion instable" / **AR** "يعمل حتى مع اتصال غير مستقر" |
| `points[2]` | "Adapted to our energy reality" | "Adapté à notre réalité énergétique" | "مكيّفة مع واقعنا الطاقوي" | **S3 — vague in all three, and "réalité énergétique" is jargon.** AR "الطاقوي" is a rare calque. Say the concrete thing instead. | **EN** "Built around the Sonelgaz tranches" / **FR** "Conçu autour des tranches Sonelgaz" / **AR** "مبني على شرائح سونلغاز" |
| `points[3]` | "Electricity today. Water and gas tomorrow." | "Électricité aujourd'hui. Eau et gaz demain." | "الكهرباء اليوم. الماء والغاز غدًا." | OK — clean, honest roadmap line. Keep verbatim. | — |
| *(new)* trust triad | — | — | — | **S2 — brief §3.2/6 requires a "Simple · Secure · Algerian" trust block** that has no keys at all. | **EN** "Simple · Secure · Algerian" / **FR** "Simple · Sécurisé · Algérien" / **AR** "بسيط · آمن · جزائري" |

---

## 7. Providers / national platform — `about`

**S1 — this entire section is written for the wrong reader.** The brief's audience 2 is *energy providers and grid
operators*, with a concrete feature set: wilaya → commune → customer drill-down, peak forecasting, incident
localization, monthly reports, annual forecasts, tranche exports. The current copy instead describes an abstract
"national analytics platform" in institutional language and mentions **none** of those six capabilities.

| Key | EN | FR | AR | Issue | Proposed fix (EN / FR / AR) |
|---|---|---|---|---|---|
| `eyebrow` | "About" | "À propos" | "حول" | **S1 — wrong label.** "About" signals a company page; this is the second product. Also AR "حول" is a bare preposition ("around/about"), not a section name — **نبذة** or the retitled version below. | **EN** "FOR ENERGY PROVIDERS" / **FR** "POUR LES FOURNISSEURS D'ÉNERGIE" / **AR** "لمزوّدي الطاقة" — and it must be the target of the hero's secondary CTA. |
| `title` | "A national analytics platform for energy statistics" | "Une plateforme analytique nationale pour les statistiques énergétiques" | "منصة تحليلية وطنية لإحصائيات الطاقة" | **S3 — "energy statistics" sounds like a government yearbook.** No operator buys "statistics"; they buy peak forecasting and incident response. | **EN** "See the network from the wilaya down to the meter." / **FR** "Voyez le réseau, de la wilaya jusqu'au compteur." / **AR** "شاهد الشبكة من الولاية إلى العدّاد." |
| `lead` | "Taqa Control relies on a **national data analytics platform** for consumption, centralizing and enhancing **energy information** nationwide, for a global, reliable and real-time view." | "Taqa Control s'appuie sur une **plateforme nationale d'analyse des données** de consommation, qui centralise et valorise les informations **énergétiques** à l'échelle du pays…" | "تعتمد **تاقا كنترول** على **منصة وطنية لتحليل بيانات** الاستهلاك…" | **S1 ×4.** (a) Brand `Taqa Control` — a 4th spelling variant (§2). (b) FR **"valorise"** is corporate filler; EN renders it "enhancing", which means nothing in English — classic drift through literal translation. (c) EN "for a global… view" is a **false friend**: FR *globale* = "overall", not "worldwide". An EN reader understands "global view" as international. (d) AR brand + feminine verb (§0 row 11). (e) The `lead` is stored as an **array of `{text, strong}` fragments**, so the bold emphasis positions are frozen to French syntax and cannot be placed correctly in AR. | Rewrite as one plain string per locale with markup-free emphasis, naming real capabilities: **EN** "Drill from wilaya to commune to customer. Forecast the afternoon peak. Locate an incident while it's still happening." **FR** "De la wilaya à la commune jusqu'au client. Anticipez le pic de l'après-midi. Localisez un incident pendant qu'il se produit." **AR** "من الولاية إلى البلدية إلى المشترك. توقّع ذروة ما بعد الزوال. حدّد موقع العطل أثناء حدوثه." |
| `pillars[0]` | "Centralized data" / "A single source for all the country's energy data." | "Données centralisées" / "Une seule source pour toutes les données énergétiques du pays." | "بيانات مركزية" / "مصدر واحد لجميع بيانات الطاقة في البلاد." | **S2 — vendor-side benefit.** "Centralized" is an architecture property, not an operator outcome. | **EN** "Peak forecasting" / "Know tomorrow's 14:30 before it arrives." — the research shows 5 record peaks in summer 2026 alone. |
| `pillars[1]` | "National coverage" / "Analysis by region, province and sector of activity." | "Couverture nationale" / "Analyse par région, wilaya et secteur d'activité." | "تغطية وطنية" / "تحليل حسب الجهة والولاية وقطاع النشاط." | **S1 — terminology loss in EN.** FR says **"wilaya"** (the actual Algerian administrative unit); EN flattens it to "province", which is not the Algerian term and loses local credibility. AR correctly has **الولاية**. | Keep **wilaya** untranslated in all three. **EN** "Network view" / "Wilaya → commune → customer, in three clicks." |
| `pillars[2]` | "Reliable indicators" / "Accurate, certified data for better decision-making." | "Fiabilité des indicateurs" / "Des données précises et certifiées pour une meilleure prise de décision." | "موثوقية المؤشرات" / "بيانات دقيقة ومعتمدة لاتخاذ قرارات أفضل." | **S1 — "certified / certifiées / معتمدة" is an unsubstantiated claim.** Certified by whom? This is the kind of word a state operator's procurement team will ask about. | Drop "certified". **EN** "Incident alerts" / "An outage flagged and localized, not reported by phone." |
| `pillars[3]` | "Real-time monitoring" / "Dynamic dashboards, always up to date." | "Suivi en temps réel" / "Des tableaux de bord dynamiques et toujours à jour." | "متابعة في الوقت الفعلي" / "لوحات قيادة ديناميكية ومحدّثة باستمرار." | **S2 — verbatim duplicate of `hero.benefit1`** ("Real-time tracking / Suivi en temps réel"). Two sections claim the same thing in the same words. | **EN** "Reports & exports" / "Monthly reports, annual forecasts, tranche exports." |
| `dashboardPreview` | "TAQA CONTROL DASHBOARD PREVIEW" | "APERÇU TABLEAU DE BORD TAQA CONTROL" | "معاينة لوحة تحكم تاقا كنترول" | **S2 — this is the laptop image's `alt`, and it is a caption, not a description.** All-caps in EN/FR; brand variant #3; describes the frame rather than the content. **SEO surface.** | Describe the screen: **EN** "TaQa Contrôle dashboard: consumption by wilaya and by tranche" / **FR** "Tableau de bord TaQa Contrôle : consommation par wilaya et par tranche" / **AR** "لوحة تحكّم طاقة كونترول: الاستهلاك حسب الولاية والشريحة" |

---

## 8. Scale / vision — `scale`

| Key | EN | FR | AR | Issue | Proposed fix (EN / FR / AR) |
|---|---|---|---|---|---|
| `eyebrow` | "Our vision" | "Notre vision" | "رؤيتنا" | **S3** — "Our vision" is about us, at the point in the scroll where the reader wants to act. | **EN** "ONE METER, THEN A COUNTRY" / **FR** "UN COMPTEUR, PUIS UN PAYS" / **AR** "عدّاد واحد، ثم بلد بأكمله" |
| `titleLine1/2` | "From a home / to a national vision" | "D'une maison / à une vision nationale" | "من منزل / إلى رؤية وطنية" | **S2 — category error in the pairing.** "From a home to a *vision*" compares a place to an abstraction; the chain of nodes below it is Home → Building → Company → City → Algeria, i.e. all *places*. | **EN** "From one home to the whole grid" / **FR** "D'une maison à tout le réseau" / **AR** "من منزل واحد إلى الشبكة بأكملها" |
| `nodeCompany` | "Company" | "Entreprise" | "شركة" | **S3** — the icon is `Factory`; "Company" doesn't match an industrial plant. | **EN** "Industry" / **FR** "Industrie" / **AR** "مصنع" |
| `nodeCity` | "City" | "Ville" | "مدينة" | **S2 — skips the actual Algerian administrative tier** used everywhere else on the page (wilaya/commune). | **EN** "Wilaya" / **FR** "Wilaya" / **AR** "ولاية" |

---

## 9. FAQ — `faq`

| Key | EN | FR | AR | Issue | Proposed fix (EN / FR / AR) |
|---|---|---|---|---|---|
| `items[0].a` | "…via an IoT box compatible with all meters." | "…via un boîtier IoT compatible avec tous les compteurs." | "…عبر علبة إنترنت الأشياء متوافقة مع جميع العدادات." | **S1 — "compatible with all meters" is an absolute claim** that cannot be true and is trivially falsifiable. **S3 (AR):** "علبة إنترنت الأشياء" is a word-for-word rendering of "IoT box" and reads as machine output; **وحدة قياس ذكية** is natural. Also `how.step1Desc` calls it "equipment", `faq` calls it an "IoT box", brief calls it a "smart meter module" — three names for one object. | Soften and unify on one product noun: **EN** "a smart metering module compatible with standard Sonelgaz meters" / **FR** "un module de mesure intelligent compatible avec les compteurs Sonelgaz standard" / **AR** "وحدة قياس ذكية متوافقة مع عدّادات سونلغاز المعتادة". Add a glossary entry so the module has exactly one name. |
| `items[2].a` | "Your consumption data stays under your control and is hosted locally." | "Vos données de consommation restent sous votre contrôle et sont hébergées localement." | "تبقى بيانات استهلاكك تحت تحكمك وتُستضاف محليًا." | **S3** — same "locally" ambiguity as `algeriaCard.points[0]`, and "stays under your control" is unverifiable as stated. | Align wording with the trust block: "hosted in Algeria", plus the concrete consent statement already in the string's second half. |
| `items[3].a` | "TAQA is designed to be resilient: data is buffered locally and syncs as soon as the connection returns." | "TAQA est conçu pour rester résilient : les données sont mises en mémoire tampon localement et se synchronisent dès que la connexion revient." | "صُممت تاقا لتكون مرنة: تُخزَّن البيانات محليًا مؤقتًا…" | **S3** — "buffered / mémoire tampon" is engineer register on a consumer page. **S1(AR)** brand + feminine (§0 row 16). | **EN** "It keeps measuring offline and uploads everything once you're back online." + fix brand/agreement. |
| `items[4].q/a` | "Can TAQA cut off my devices on its own?" | "TAQA peut-il couper mes appareils tout seul ?" | "هل يمكن لتاقا قطع أجهزتي من تلقاء نفسها؟" | **S1(AR)** — `لتاقا` (prefixed, §0 row 17) **and** feminine **نفسها** where the masculine brand requires **نفسه**. Good Q&A otherwise — keep the substance. | Fix brand + agreement; keep the answer. |
| `title` | "Everything you need to know before getting started" | "Tout ce qu'il faut savoir avant de commencer" | "كل ما تحتاج معرفته قبل البدء" | OK | — |
| — | | | | **S2 — SEO gap:** a 5-question FAQ is rendered with **no `FAQPage` JSON-LD** in any locale. Highest-value structured-data opportunity on the page. | Emit `FAQPage` per locale (§11). |

---

## 10. Final CTA & footer — `finalCta`, `footer`

| Key | EN | FR | AR | Issue | Proposed fix (EN / FR / AR) |
|---|---|---|---|---|---|
| `finalCta.title` | "Tomorrow's energy starts with better understanding today's." | "L'énergie de demain commence par mieux comprendre celle d'aujourd'hui." | "طاقة الغد تبدأ بفهم أفضل لطاقة اليوم." | **S3** — elegant but abstract, and it ends the page on a platitude instead of the core message. | Close on the thesis: **EN** "Your next bill is already being written. Start reading it." / **FR** "Votre prochaine facture s'écrit déjà. Commencez à la lire." / **AR** "فاتورتك القادمة تُكتب الآن. ابدأ بقراءتها." |
| `finalCta.button` | "Discover TAQA" | "Découvrir TAQA" | "اكتشف تاقا" | **S2 — inconsistent with the hero CTA** ("Get started with TAQA"). Two different primary CTAs for the same action, and the link target is `#hero` — it scrolls the user back to the top rather than converting. | Reuse the single canonical primary CTA: "Start monitoring" / "Commencer le suivi" / "ابدأ المتابعة", pointing at a real destination. |
| `footer.tagline` | "Smarter energy for a more sustainable future." | "Une énergie plus intelligente pour un avenir durable." | "طاقة أكثر ذكاءً من أجل مستقبل أكثر استدامة." | **S3 — slogan variant #4**, and generic. Brief §3.7 asks for a short tagline. | Use the one-line thesis: **EN** "Visibility before the bill." / **FR** "La visibilité avant la facture." / **AR** "الرؤية قبل الفاتورة." |
| `footer.copyright` | "© 2026 TAQA — All rights reserved." | "© 2026 TAQA — Tous droits réservés." | "© 2026 تاقا — جميع الحقوق محفوظة." | **S2** — year hardcoded in three places; brand variant; §0 row 19. | `© {year} TaQa Contrôle` with the year computed, AR `طاقة كونترول`. |
| `footer.devBy` | "Developed by" | "Développé par" | "طوّرته" | **S3 (AR)** — **طوّرته** carries a feminine object pronoun ("developed *it*[f]"), agreeing with nothing. Brief §3.7 specifies **"من تطوير"**. | "Developed by" / "Développé par" / "من تطوير" |
| *(hardcoded)* `SMART TECH INNOVATION` | `Footer.jsx:38` | | | **S2** — all-caps with a space-separated spelling that doesn't match the brief's **SmartTech Innovation**; rendered twice (desktop + mobile trees). | Single constant, brief's casing, one render, `target="_blank" rel="noopener"`, URL in `SMARTTECH_URL`. |
| *(hardcoded)* `info@smarttechinnovation.com`, `+213 542 622 874` | `Footer.jsx:41,45` | | | Brief §3.7 removes the contact blocks. | Delete. |
| `footer.terms` / `footer.privacy` | "Terms of use" / "Privacy policy" | "Conditions d'utilisation" / "Politique de confidentialité" | "شروط الاستخدام" / "سياسة الخصوصية" | **S1 — both `href="#"`.** Live links to nonexistent pages, and they appear **only in the mobile tree**. A privacy link that goes nowhere, next to a claim about data handling, is the worst possible combination. | Either ship the pages or remove the links. Don't leave them dead. |
| *(missing)* footer language switcher | | | | **S2** — brief §3.7 requires one; currently only in `Navbar`. | Reuse the `languages` list from context. |

---

## 11. Cross-cutting findings

### Glossary — freeze these, they are violated today

| Concept | EN | FR | AR | Currently violated as |
|---|---|---|---|---|
| Product name | **TaQa Contrôle** | **TaQa Contrôle** | **طاقة كونترول** | `TAQA`, `TAQA CONTROL`, `TAQA CONTRÔLE`, `Taqa Control`, `تاقا`, `تاقا كنترول` |
| Tariff band | **tranche** | **tranche** | **شريحة / الشرائح** | EN drops it entirely in `sol2Desc` |
| Admin unit | **wilaya** | **wilaya** | **ولاية** | EN says "province" in `about.pillars[1]` |
| The hardware | **smart metering module** | **module de mesure intelligent** | **وحدة قياس ذكية** | "energy equipment", "IoT box", "boîtier IoT", "علبة إنترنت الأشياء" |
| Utility | **Sonelgaz** | **Sonelgaz** | **سونلغاز** | Absent from EN copy almost entirely |
| Carbon | **CO₂** | **CO₂** | **ثاني أكسيد الكربون** / CO₂ | `CO2` everywhere (no subscript) |
| Circuit | **circuit** | **circuit** | **دائرة** | consistent — keep |

### Typography and number formatting — **S3 throughout, ~20 strings**

- **FR needs a no-break space before `%`, `:`, `!`, `?`, `»`.** Currently `80%` (`ps.alertMsg`), `-18%`, `12%`,
  and `Alertes :` all lack it. This is the most visible "not written by a French speaker" tell.
- **Minus signs:** `-18%` uses hyphen-minus; should be U+2212.
- **Digit grouping:** `1,240 DZD` hardcoded English-style. FR `1 240`, AR per locale.
- **AR bidi:** every string mixing Arabic with Latin/digits (`CO2`, `80%`, `22:00`, `-18%`, `SmartStech Innovation`)
  needs LRM/RLM marks or it will render with punctuation on the wrong side. None are marked today.
- **Arabic diacritics are inconsistent:** `سخان` vs `سخّان`, `تحكم` vs `تحكّم`, `مفصلة` vs `مفصّلة`. Pick one policy —
  recommend shadda on ambiguous words only, applied consistently.
- **`<br>`-driven line splits** (`hero`, `ps.titleLine1/2`, `smart.titleLine1/2`, `scale.titleLine1/2`,
  `ps.subtitleLine1/2`) hardcode break points tuned to French length. In AR and EN they break mid-clause. **All
  should become single strings** with CSS controlling the wrap.

### Structural i18n defects — **S1/S2**

1. **Fragmented-sentence keys.** `hero.titleLine1/titlePrefix/titleAccent`, `about.lead` as a `{text, strong}[]`,
   and every `pillarNTitle/pillarNDesc` pair force French word order onto EN and AR. Any translator gets a
   half-sentence with no context. Convert to whole strings.
2. **No `dir`/bidi-aware formatting layer.** No `Intl.NumberFormat`, no directional marks, nothing.
3. **State keyed on French literals** — `SmartControl.jsx:70` `'essentiels'`/`'secondaires'`.
4. **Default locale is `fr` with no negotiation.** No `navigator.language` check, no `Accept-Language`, no
   `?lang=` override. An Arabic or English visitor always lands on French first.
5. **No fallback chain.** A missing key throws (`t.x.y` on undefined) rather than falling back to FR. With ~40 new
   keys coming in Phase 3, this will break the page during development.
6. **Two dead components** (`ProblemSection.jsx`, `SolutionSection.jsx`) hold ~350 words of hardcoded French
   — `LE PROBLÈME`, `Où part vraiment votre énergie ?`, `Notre solution`, `Votre énergie. À un seul endroit.`,
   and a 5-item checklist. **Approved for deletion**, so they are excluded from the tables above. Note
   `SolutionSection.jsx` is the only reference to `public/dashboard.webp`, which Phase 3.5 needs as the laptop
   screen texture — that asset must be preserved.
7. **~19 hardcoded French `alt` attributes** across `Hero`, `SmartControl`, `ProblemSolutionComparison`,
   `Navbar`, `Footer`. Needs an `alt.*` namespace.

### SEO gaps — **S1**

| Gap | Detail |
|---|---|
| **One title/description for three languages** | `index.html` `<head>` is static FR and never updates on `setLang`. EN and AR visitors are served, and indexed with, French metadata. |
| **No `hreflang`** | No `<link rel="alternate" hreflang>`, no `x-default`. Google cannot discover the EN/AR versions — they are effectively unindexable. |
| **`og:locale` hardcoded `fr_FR`** | No `og:locale:alternate`. Every share, in every language, previews as French. |
| **OG image is a 16 KB logo** | `logo-brand.webp`, not a 1200×630 card, and no `og:image:width/height`. Renders as a small square in most unfurls. |
| **Sitemap has 1 URL, no alternates** | No `xhtml:link rel="alternate"` entries. |
| **No structured data at all** | No `Organization`, no `SoftwareApplication`, and notably no `FAQPage` despite 5 Q&As being on the page. |
| **Single client-rendered URL** | Social scrapers execute no JS, so client-side `<head>` mutation cannot fix OG/Twitter. **Approved resolution: build-time locale routes `/`, `/en/`, `/ar/` with pre-rendered heads**, plus a sitemap with `xhtml:link` alternates. |
| **No favicon / apple-touch-icon / manifest / theme-color** | None declared. |
| **Keyword-stuffed alt text** | e.g. "Maison connectée cuisine intelligente". |

### Counts

| | S1 | S2 | S3 | Total |
|---|---|---|---|---|
| Arabic brand (`تاقا`) | 19 | — | — | **19** |
| Arabic gender agreement | 9 | — | — | 9 |
| Copy findings (all sections) | 17 | 24 | 29 | 70 |
| Hardcoded / un-localized strings | 19 | 4 | — | 23 |
| Structural i18n | 4 | 3 | — | 7 |
| SEO | 5 | 4 | — | 9 |

**Missing keys to add in Phase 3:** `hero.eyebrow`, `hero.benefit4`, `hero.phoneAlt`, `smart.circuitLighting`,
`smart.circuitSockets`, `smart.supportLine`, `state.on`, `state.off`, `trust.*` (triad + 3 items),
`providers.*` (retitled `about`), `alt.*` (≈19 entries), `seo.*` (title/description/ogAlt per locale),
`footer.devBy` target + `SMARTTECH_URL`. **≈45 new keys × 3 languages.**

---

## Recommended resolution order for Phase 3

1. Fix the 19 `تاقا` → `طاقة كونترول` occurrences **and** the 9 dependent verb-agreement changes together — they
   are one edit, and doing the brand without the grammar leaves Arabic worse than before.
2. Freeze the glossary; normalize the brand lockup to `TaQa Contrôle` / `طاقة كونترول` everywhere.
3. Collapse the four competing slogans to the single hero eyebrow.
4. Restructure fragmented keys into whole sentences (kills the `<br>` problem and the AR word-order problem at once).
5. Delete the two dead components; keep `dashboard.webp`.
6. Move all `alt` text and numbers into the locale bundle; add `Intl.NumberFormat` + bidi marks.
7. Rewrite `about` → `providers` around the six real operator capabilities, and wire the hero's secondary CTA to it.
8. Build-time locale routes + per-locale head, hreflang, sitemap alternates, `FAQPage` + `SoftwareApplication` JSON-LD.
