import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { usePrefersReducedMotion, useIsVisible } from '../lib/hooks';
import { EASE_OUT } from '../lib/motion';
import { Icon3D } from './icons3d';

/**
 * The hero's live bill meter.
 *
 * A quarter's consumption climbs in real time, the cost climbs with it through
 * the real Sonelgaz tranche bands — and then an alert catches it just before it
 * crosses into tranche 3. That is the entire product argument in one loop:
 * the number was always moving, you just could not see it.
 */

/** Sonelgaz household tariff, code 54 M (quarterly, marginal pricing). */
export const TRANCHES = [
  { upTo: 125, price: 1.7787, vat: 0.09 },
  { upTo: 250, price: 4.1789, vat: 0.19 },
  { upTo: 1000, price: 4.812, vat: 0.19 },
  { upTo: Infinity, price: 5.4796, vat: 0.19 },
];

const START_KWH = 178;
const ALERT_AT = 246; // 4 kWh short of the tranche-3 threshold
const THRESHOLD = 250;
const CLIMB_MS = 5200;
const HOLD_MS = 4200;

/** Marginal cost in DA, VAT included. Only kWh above each band are repriced. */
export function costFor(kwh) {
  let remaining = kwh;
  let previous = 0;
  let total = 0;
  for (const band of TRANCHES) {
    const width = Math.min(remaining, band.upTo - previous);
    if (width <= 0) break;
    total += width * band.price * (1 + band.vat);
    remaining -= width;
    previous = band.upTo;
    if (remaining <= 0) break;
  }
  return total;
}

export function trancheFor(kwh) {
  return TRANCHES.findIndex((band) => kwh <= band.upTo) + 1 || TRANCHES.length;
}

export default function BillMeter() {
  const { t, fmt, interpolate, isRtl } = useLanguage();
  const reduce = usePrefersReducedMotion();
  const [wrapRef, visible] = useIsVisible({ rootMargin: '0px' });

  const [kwh, setKwh] = useState(reduce ? ALERT_AT : START_KWH);
  const [caught, setCaught] = useState(reduce);
  const frame = useRef(0);
  const timer = useRef(null);

  useEffect(() => {
    if (reduce || !visible) return undefined;

    let cancelled = false;

    const run = () => {
      if (cancelled) return;
      setCaught(false);
      const t0 = performance.now();

      const tick = (now) => {
        if (cancelled) return;
        const p = Math.min(1, (now - t0) / CLIMB_MS);
        // Consumption does not climb smoothly — appliances switch on and off.
        // A little noise on top of the ramp makes the number look measured
        // rather than interpolated.
        const jitter = Math.sin(p * 34) * 0.9 + Math.sin(p * 11) * 0.5;
        const value = START_KWH + (ALERT_AT - START_KWH) * p + (p < 1 ? jitter : 0);
        setKwh(Math.min(ALERT_AT, value));
        if (p < 1) {
          frame.current = requestAnimationFrame(tick);
        } else {
          setKwh(ALERT_AT);
          setCaught(true);
          timer.current = setTimeout(() => {
            setKwh(START_KWH);
            run();
          }, HOLD_MS);
        }
      };

      frame.current = requestAnimationFrame(tick);
    };

    run();

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame.current);
      clearTimeout(timer.current);
    };
  }, [reduce, visible]);

  const tranche = trancheFor(kwh);
  const remaining = Math.max(0, Math.round(THRESHOLD - kwh));
  // Progress through the CURRENT band, not through the whole quarter.
  const bandStart = tranche > 1 ? TRANCHES[tranche - 2].upTo : 0;
  const bandEnd = TRANCHES[tranche - 1].upTo;
  const bandProgress = Math.min(1, (kwh - bandStart) / (bandEnd - bandStart));

  return (
    <div className="bill-meter" ref={wrapRef}>
      <div className="bill-meter-glow" aria-hidden="true" />

      <div className="bill-meter-card">
        <header className="bm-head">
          <span className="bm-label">{t.hero.meter.label}</span>
          <span className={`bm-live ${caught ? 'is-caught' : ''}`}>
            <span className="bm-live-dot" aria-hidden="true" />
            {t.hero.meter.live}
          </span>
        </header>

        <div className="bm-readout">
          <span className="bm-value" aria-live="off">
            {fmt.kwh(kwh)}
          </span>
          <span className="bm-unit">{t.hero.meter.unit}</span>
        </div>

        <div className="bm-cost">
          <strong>{fmt.dzd(costFor(kwh))}</strong>
          <span>{t.hero.meter.cost}</span>
        </div>

        {/* tranche ladder — the four Sonelgaz bands, with the live position */}
        <div className="bm-tranches" role="presentation">
          {TRANCHES.map((band, i) => {
            const index = i + 1;
            const state = index < tranche ? 'done' : index === tranche ? 'current' : 'todo';
            return (
              <div key={index} className={`bm-tranche is-${state}`}>
                <div className="bm-tranche-bar">
                  <motion.span
                    className="bm-tranche-fill"
                    style={{ transformOrigin: isRtl ? 'right' : 'left' }}
                    animate={{ scaleX: state === 'done' ? 1 : state === 'current' ? bandProgress : 0 }}
                    transition={{ duration: 0.25, ease: 'linear' }}
                  />
                </div>
                <span className="bm-tranche-label">
                  {t.hero.meter.tranche} {fmt.int(index)}
                </span>
              </div>
            );
          })}
        </div>

        <AnimatePresence>
          {caught ? (
            <motion.div
              className="bm-alert"
              role="status"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.96 }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.45, ease: EASE_OUT }}
            >
              <Icon3D name="budget" size={38} label={t.hero.meter.caught} interactive={false} />
              <div className="bm-alert-text">
                <strong>{t.hero.meter.caught}</strong>
                <span>{interpolate(t.hero.meter.caughtDesc, { n: fmt.int(remaining) })}</span>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
