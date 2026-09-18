# Messaging research — home energy monitoring positioning

Research date: 2026-09-17. Phase 0 deliverable. **Report only — no wording below is copied; competitor
lines are quoted only as evidence of a *pattern*, and every recommendation is original.**

---

## 1. How the category frames the problem

Five reference players, and the frame each one actually leads with:

| Player | Hero line (verbatim, as evidence only) | Frame it leads with |
|---|---|---|
| **Sense** | "Energy intelligence for homes and the grid" / "Changing how we use energy starts with data" | **Data/visibility as the precondition for change.** Explicitly dual-audience: homes *and* the utility. |
| **Emporia (Vue)** | "Smart Home Energy Management Made Easy" / "Automate electricity bill savings…" | **Bill savings, automated.** Money first, ease second. |
| **Generac PWRview (ex-Neurio)** | "identify where your power is coming from and where it is going" | **Where does it go?** Leans hard on phantom / always-on loads. |
| **Smappee** | "Designed Energy Intelligence" | **Design + one platform, full control.** Premium, award-led. |
| **Octopus / Hive insights** | in-app "My energy insights" — usage, tariff and balance on one home screen | **Tariff-aware usage.** Consumption is shown *next to the tariff that prices it*. |

### The three problem frames that actually recur

1. **Bill shock / the invisible month.** The bill is the first and only feedback signal, and it arrives after the
   behaviour is unchangeable. Sense's own pitch rests on this: it "operates in the background, showing you how your
   activities affect your bill." Third-party reviews reach for the same image — staring at the bill "wondering which
   appliance is eating your money," with "almost no idea where that money goes."
2. **Attribution — "where does it go?"** Household totals are inert; per-appliance or per-circuit attribution is
   what makes the number actionable. PWRview's whole pitch is the provenance and destination of power. Emporia's
   best testimonials are attribution moments ("appliances accounting for 40% of my energy usage").
3. **Phantom / always-on load.** The unglamorous, highly credible wedge: PWRview markets identifying "phantom energy
   loads that waste power and push up the utility bill," with up-to-20% bill reduction from awareness alone.

### What they use as proof (and what it costs them)

- Sense: **4–8% average annual savings**, 3× demand savings vs. behavioural DR programs, 30× engagement vs. utility
  portals. Quantified, auditable, and split by audience.
- Emporia: awards (Wirecutter, Good Housekeeping, MotorTrend) plus named customer outcomes.
- Smappee: design awards (Red Dot, iF, two Henry van de Velde) plus "over a decade."
- **The pattern:** every one of them pairs the promise with a *number or a third party*. None relies on adjectives
  alone. This is the single biggest gap in our current page.

### Weaknesses in the category we can exploit

- **Abstraction.** "Energy intelligence", "Designed Energy Intelligence", "Energy management made easy" are
  interchangeable and describe the vendor, not the reader's day. A concrete, first-person problem sentence
  out-positions all of them.
- **Tariff blindness.** Only the retailers (Octopus/Hive) put usage next to the tariff. The hardware players show
  kWh and a flat currency estimate. In a country with a *progressive quarterly* tariff, this is a wide-open lane.
- **Savings-% as the hook.** "Save 8%" invites scepticism and a price comparison. Framing the product as
  *visibility* rather than *savings* is both more honest and harder to argue with.

---

## 2. Hero headline patterns that work

Ranked by how well they travel into EN/FR/AR and onto a 390px screen.

1. **Reframe the reader's assumption.** Name the thing they blame, then move the blame to the real cause. Two short
   sentences; the second does the work. Highest information-per-word and the most quotable. *This is the pattern the
   approved H1 uses* — "Your bill isn't the problem. Not seeing it coming is."
2. **Three-beat verb rhythm as an eyebrow, not as the H1.** "See it. Understand it. Save." Works as a *label* above
   the headline; fails as the headline because it makes a claim about the user's effort, not about their problem.
   (The current page runs two competing three-beat slogans — see the Phase 2 audit.)
3. **The attribution question.** "Where does your electricity actually go?" Strong, but it belongs on the problem
   block — it asks instead of promising, so it can't carry the hero.
4. **Precondition framing.** Sense's "changing X starts with data". Elegant but abstract and vendor-centric. Use as
   a transition line between sections, never as the H1.
5. **Dual-audience in the hero.** Sense puts "homes and the grid" in the H1 itself. For us that dilutes: the
   household is the emotional story, the provider the institutional one. Better to lead households and give
   providers a dedicated secondary CTA and their own section — which is what Phase 3.1 specifies.

### Subheadline mechanics observed

The subheadline is where the *mechanism* goes, in one breath: what it measures → at what granularity → and the one
thing it tells you that nothing else does. Granularity is the credibility word ("circuit by circuit",
"per appliance"). Avoid stacking more than four clauses; AR expands and FR expands more.

### Proof points

Four is the observed sweet spot, each ≤ 6 words, each a *capability with a consequence*. Icons must be literal
(bell = alert, not "innovation"), because at 4-up they are read as a scannable spec list, not decoration.

---

## 3. What to adapt for the Algerian / Sonelgaz context

This is where the category playbook has to be rewritten, not translated.

### 3.1 The visibility gap here is a *quarter*, not a month

Sonelgaz household electricity (code 54 M) is billed on **quarterly** meter readings, with four progressive
tranches on *quarterly* volume:

| Tranche | Quarterly kWh | Price | VAT |
|---|---|---|---|
| 1 | 0 – 125 | 1.7787 DA/kWh (social rate) | 9% |
| 2 | 125 – 250 | 4.1789 DA/kWh | 19% |
| 3 | 250 – 1 000 | 4.8120 DA/kWh | 19% |
| 4 | 1 000 + | 5.4796 DA/kWh | 19% |

Plus a *prime de puissance* of 4.37 DA/kW/month. Pricing is **marginal, not retroactive**: the first 125 kWh stay at
the social rate even for a heavy consumer; only the kWh above each threshold are repriced upward.

**Marketing consequences, in order of importance:**

- **Quarterly billing is the strongest problem statement available to us, and nobody in the category can use it.**
  In the US/UK references the feedback delay is a month. Here it can be *three months* — a habit formed in June is
  first priced in September. The core message ("not an electricity problem, a visibility problem") becomes literally
  measurable: the gap is up to ~90 days long. This should be the spine of the problem section.
- **Tranche 2 is a 2.35× jump from tranche 1.** That cliff — crossing out of the social rate — is the most dramatic
  and most explainable number on the whole tariff, and it is also where VAT doubles from 9% to 19%. A "you are
  X kWh from the next tranche" counter is a better product hook than any savings percentage.
- **Say "tranche", not "tier".** It is the word on the bill and in CREG's consumer guidance; in FR and in Algerian
  usage it is the term people recognise. Keep it untranslated in FR, use الشرائح in AR.
- **Frame marginal pricing as reassurance, not threat.** "You don't lose your social rate" is true, useful, and
  corrects a widespread misconception — a credibility win that costs us nothing.
- **Never promise a savings percentage.** We have no audited figure, and the category's 4–8% claims invite scrutiny
  we cannot answer. Promise *visibility, attribution and timing*. Quantify the product (per-circuit, 4 tranches,
  real time, alerts before the bill), not the outcome.

### 3.2 Summer AC peaks — the seasonal narrative

- A heavily-equipped household with air conditioning runs ~900 kWh/quarter and can pass **1 200 kWh in a summer
  quarter**, i.e. it crosses into tranche 4.
- Nationally the pattern is unambiguous: summer 2026 set a **21 828 MW** peak (14h30, during a heatwave) — the
  *fifth* record of that single summer — against 20 628 MW in 2025. Sonelgaz had forecast 21 360 MW with a
  22 150 MW heatwave scenario, and attributes the structural ~+1 000 MW/year to the spread of air conditioning and
  housing growth.
- **For households:** summer is the concrete, felt version of the abstract message. The AC does not feel expensive
  on any given afternoon; it is only expensive in aggregate, and the aggregate is invisible until autumn.
- **For providers:** the same numbers are the provider-side pitch. A national peak climbing ~1 GW a year and set by
  *residential cooling behaviour at 14h30* is exactly what per-circuit visibility and peak forecasting address.
  This is our Sense-style dual framing, grounded here in published national figures.

### 3.3 Load shedding — handle with care

Sonelgaz's public position for summer 2026 is that available capacity covered demand **without resorting to
délestage** (788 MW of new capacity received, 420 MW of it solar; a further 598 MW in July). Two rules follow:

1. **Do not sell against blackouts.** Claiming or implying load shedding contradicts the operator's public record,
   reads as alarmist, and is poor footing for a company that wants Sonelgaz as a customer.
2. **Sell peak *shaving* as a shared national interest instead.** The honest, flattering framing: every kW moved off
   the 14h30 peak is capacity that does not have to be built. That positions TaQa Contrôle as aligned with the
   operator's own stated strategy rather than as a critic of it.

### 3.4 Other local adaptations

- **Currency and units.** Always DZD (never €/$), kWh always shown next to DA, kg CO₂ for footprint. The DA figure
  is what makes the kWh mean anything.
- **Connectivity.** "Works with limited connectivity" is already on the page and is a genuine local differentiator
  none of the references need to claim. Keep it and move it into the trust block.
- **Data locality.** "Hosted in Algeria" is a trust asset in a market selling to a state operator. Pair it with
  "Algerian" in the Simple · Secure · Algerian triad.
- **Sonelgaz as anchor, not as endorsement.** Naming the tranches and the bill format is precise and verifiable.
  Implying a partnership is not. Keep every reference descriptive ("your Sonelgaz tranche"), never affiliative.
- **Trilingual load.** FR runs ~15–20% longer than EN, and AR headline glyphs are taller; the H1 must be tested at
  ≤390px in all three. The "reframe the assumption" pattern survives this because both sentences are short.

---

## Sources

- [Sense](https://sense.com/)
- [Emporia Energy](https://www.emporiaenergy.com/)
- [Smappee](https://www.smappee.com/)
- [Generac PWRview home energy monitor (Norwall)](https://norwall.com/products/pwrview-home-energy-monitor-W2HEM)
- [Generac PWRview support](https://support.generac.com/s/article/What-Is-the-Neurio-PWRView-App)
- [Octopus Energy — tracking your energy use](https://octopus.energy/blog/track-my-energy-use/)
- [Octopus Energy apps](https://octopus.energy/app/)
- [Tarifs Sonelgaz — algerie-electricite.com](https://algerie-electricite.com/tarifs)
- [CREG — comment lire votre facture](https://creg.gov.dz/fr/consommateurs/comment-lire-votre-facture/)
- [Sonelgaz — prévision pic été 2026 (Algérie Invest)](https://www.algerieinvest.dz/sonelgaz-pic-consommation-electricite-ete-2026/)
- [Nouveau record de consommation (Horizons)](https://www.horizons.dz/2026/08/electricite-lalgerie-bat-un-nouveau-record-de-consommation/)
- [Cinquième pic record (Awras)](https://www.awras.net/l-algerie-enregistre-un-cinquieme-pic-record-de-consommation-d-electricite.html)
