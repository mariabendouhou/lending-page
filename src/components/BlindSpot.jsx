import React, { useMemo, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { usePrefersReducedMotion, useCountUp } from '../lib/hooks';
import { EASE_OUT } from '../lib/motion';

/**
 * Two-panel comparison: WITHOUT vs WITH TAQA Control.
 *
 * Both panels share the same consumption curve and timeline (June → Aug).
 *
 *   TOP    "Without" — the curve is drawn dimmed behind a hatched veil.
 *          No data labels. A bill badge drops in at the right edge.
 *          → message: data existed, you just couldn't see it.
 *
 *   BOTTOM "With" — the same curve, vivid green, with insight callouts
 *          (usage today, tranche entry, estimated bill).
 *          → message: now you can.
 *
 * Pure SVG + framer-motion. No charting library.
 */

/* ── layout constants (shared viewBox) ────────────────────────────────── */
const W = 800;
const H_PANEL = 160;     // height per chart panel
const X0 = 10;           // left padding
const X1 = 700;          // right edge of the quarter timeline
const XBILL = 750;       // bill / projected marker

const CURVE_TOP = 28;    // highest point the curve can reach
const CURVE_BASE = 130;  // baseline for the curve

/* A quarter of realistic-looking consumption. */
const USAGE = [
  0.30, 0.38, 0.33, 0.46, 0.44, 0.55, 0.62, 0.58,
  0.71, 0.66, 0.80, 0.86, 0.79, 0.92,
];

/** Catmull-Rom → cubic bezier, smooth curve without a chart library. */
function smoothPath(points) {
  if (points.length < 2) return '';
  let d = `M ${points[0][0]} ${points[0][1]}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d;
}

/* ── sub-components ───────────────────────────────────────────────────── */

/** Shared month tick marks + labels. */
function MonthTicks({ months, y }) {
  const monthX = [X0, X0 + (X1 - X0) / 3, X0 + (2 * (X1 - X0)) / 3];
  return monthX.map((x, i) => (
    <g key={months[i]}>
      <line className="bs-tick" x1={x} y1={y} x2={x} y2={y + 8} />
      <text className="bs-month" x={x} y={y + 22}>{months[i]}</text>
    </g>
  ));
}

/** The "WITHOUT" panel — dimmed curve, hatch veil, bill badge. */
function WithoutPanel({ curve, area, copy, inView, reduce, isRtl }) {
  const draw = { duration: reduce ? 0 : 2.1, ease: EASE_OUT };

  const amount = useCountUp(2882, { duration: 1400, enabled: inView && !reduce });
  const shownAmount = reduce || !inView
    ? copy.amount
    : new Intl.NumberFormat(isRtl ? 'ar-DZ-u-nu-arab' : 'fr-DZ').format(amount);

  const blindCx = X0 + (X1 - X0) * 0.38;
  const blindW = Math.min(X1 - X0 - 24, Math.max(170, copy.blind.length * 8.4 + 34));

  return (
    <svg viewBox={`0 0 ${W} ${H_PANEL}`} role="img" aria-label={copy.without}>
      <defs>
        <linearGradient id="bs-area-dim" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#69E6B0" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#69E6B0" stopOpacity="0.01" />
        </linearGradient>
        <pattern id="bs-hatch" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="9" height="9" fill="#06251B" fillOpacity="0.6" />
          <line x1="0" y1="0" x2="0" y2="9" stroke="#B9F2D5" strokeOpacity="0.14" strokeWidth="3" />
        </pattern>
        <clipPath id="bs-clip-top">
          <rect x={X0} y={CURVE_TOP - 10} width={X1 - X0} height={CURVE_BASE - CURVE_TOP + 16} />
        </clipPath>
      </defs>

      {/* dimmed consumption area + curve */}
      <motion.path
        d={area}
        fill="url(#bs-area-dim)"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
      />
      <motion.path
        d={curve}
        fill="none"
        stroke="#69E6B0"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeOpacity="0.35"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={draw}
      />

      {/* hatched veil — you can't see through it */}
      <motion.rect
        clipPath="url(#bs-clip-top)"
        x={X0}
        y={CURVE_TOP - 10}
        width={X1 - X0}
        height={CURVE_BASE - CURVE_TOP + 16}
        fill="url(#bs-hatch)"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: reduce ? 0 : 1.3 }}
      />

      {/* "90 days with no visibility" pill */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: reduce ? 0 : 1.6 }}
      >
        <rect
          className="bs-blind-pill"
          x={blindCx - blindW / 2}
          y={CURVE_BASE - 48}
          rx="13"
          width={blindW}
          height="26"
        />
        <text className="bs-blind-text" x={blindCx} y={CURVE_BASE - 30} textAnchor="middle">
          {copy.blind}
        </text>
      </motion.g>

      {/* bill marker — vertical dashed line */}
      <motion.line
        x1={XBILL} y1={CURVE_TOP - 4} x2={XBILL} y2={CURVE_BASE + 4}
        stroke="#FC8B7E"
        strokeWidth="1.5"
        strokeDasharray="4 3"
        strokeOpacity="0.6"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.3, delay: reduce ? 0 : 2.0 }}
      />

      {/* bill badge */}
      <motion.g
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.85 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ type: 'spring', stiffness: 260, damping: 18, delay: reduce ? 0 : 2.15 }}
        style={{ transformOrigin: `${XBILL}px ${CURVE_TOP + 14}px` }}
      >
        <rect className="bs-bill-pill" x={XBILL - 68} y={CURVE_TOP - 8} rx="10" width="136" height="22" />
        <text className="bs-bill-label" x={XBILL} y={CURVE_TOP + 8} textAnchor="middle">
          {copy.bill}
        </text>
        <rect className="bs-bill-amount-pill" x={XBILL - 62} y={CURVE_TOP + 18} rx="12" width="124" height="28" />
        <text className="bs-bill-amount" x={XBILL} y={CURVE_TOP + 37} textAnchor="middle">
          {shownAmount} {copy.currency}
        </text>
      </motion.g>

      {/* month ticks */}
      <MonthTicks months={copy.months} y={CURVE_BASE + 6} />
    </svg>
  );
}

/** The "WITH" panel — vivid curve, insight badges, estimated bill. */
function WithPanel({ curve, area, copy, inView, reduce }) {
  const draw = { duration: reduce ? 0 : 2.0, ease: EASE_OUT };
  const baseDelay = reduce ? 0 : 2.6; // stagger after the top panel

  /* x position for the "Entered T3" marker — roughly day 60 of 90 (~2/3) */
  const trancheX = X0 + (X1 - X0) * 0.67;
  /* y for the curve at that x (approximate from USAGE data) */
  const trancheY = CURVE_BASE - 0.80 * (CURVE_BASE - CURVE_TOP);

  /* x position near end of curve for the "usage today" badge */
  const todayX = X0 + (X1 - X0) * 0.88;
  const todayY = CURVE_BASE - 0.86 * (CURVE_BASE - CURVE_TOP);

  return (
    <svg viewBox={`0 0 ${W} ${H_PANEL}`} role="img" aria-label={copy.with}>
      <defs>
        <linearGradient id="bs-area-vivid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#69E6B0" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#69E6B0" stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {/* vivid consumption area + curve */}
      <motion.path
        d={area}
        fill="url(#bs-area-vivid)"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: baseDelay }}
      />
      <motion.path
        d={curve}
        fill="none"
        stroke="#69E6B0"
        strokeWidth="2.6"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{ duration: draw.duration, delay: baseDelay, ease: EASE_OUT }}
      />

      {/* "Entered T3" vertical marker */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: baseDelay + 1.2 }}
      >
        <line
          x1={trancheX} y1={CURVE_TOP + 4} x2={trancheX} y2={CURVE_BASE}
          stroke="#E8C37A"
          strokeWidth="1.2"
          strokeDasharray="4 3"
          strokeOpacity="0.7"
        />
        <rect x={trancheX - 42} y={CURVE_TOP - 2} rx="8" width="84" height="20"
          fill="rgba(232,195,122,0.18)" stroke="#E8C37A" strokeWidth="1" strokeOpacity="0.6" />
        <text className="bs-insight-label bs-insight-gold" x={trancheX} y={CURVE_TOP + 13} textAnchor="middle">
          {copy.entered}
        </text>
      </motion.g>

      {/* "Usage today" badge near end of curve */}
      <motion.g
        initial={{ opacity: 0, y: 6 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: baseDelay + 1.5 }}
      >
        <rect x={todayX - 40} y={todayY - 36} rx="10" width="80" height="32"
          fill="rgba(6,37,27,0.85)" stroke="rgba(105,230,176,0.4)" strokeWidth="1" />
        <text className="bs-insight-label bs-insight-green" x={todayX} y={todayY - 22} textAnchor="middle">
          {copy.usageToday}
        </text>
        <text className="bs-insight-value" x={todayX} y={todayY - 10} textAnchor="middle">
          {copy.usageValue}
        </text>
        {/* connector line from badge to curve */}
        <line x1={todayX} y1={todayY - 4} x2={todayX} y2={todayY}
          stroke="#69E6B0" strokeWidth="1" strokeOpacity="0.5" />
        <circle cx={todayX} cy={todayY} r="3.5" fill="#69E6B0" />
      </motion.g>

      {/* estimated bill — green badge at right edge */}
      <motion.g
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.9 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ type: 'spring', stiffness: 240, damping: 20, delay: baseDelay + 1.8 }}
        style={{ transformOrigin: `${XBILL}px ${CURVE_TOP + 24}px` }}
      >
        <line x1={XBILL} y1={CURVE_TOP + 4} x2={XBILL} y2={CURVE_BASE}
          stroke="#69E6B0" strokeWidth="1.2" strokeDasharray="4 3" strokeOpacity="0.5" />
        <rect className="bs-projected-pill" x={XBILL - 70} y={CURVE_TOP - 4} rx="10" width="140" height="22" />
        <text className="bs-insight-label bs-insight-green" x={XBILL} y={CURVE_TOP + 12} textAnchor="middle">
          {copy.projected}
        </text>
        <rect className="bs-projected-amount-pill" x={XBILL - 64} y={CURVE_TOP + 22} rx="12" width="128" height="28" />
        <text className="bs-projected-amount" x={XBILL} y={CURVE_TOP + 41} textAnchor="middle">
          {copy.projectedVal}
        </text>
      </motion.g>

      {/* month ticks */}
      <MonthTicks months={copy.months} y={CURVE_BASE + 6} />
    </svg>
  );
}

/* ── main component ───────────────────────────────────────────────────── */

export default function BlindSpot() {
  const { t, isRtl } = useLanguage();
  const reduce = usePrefersReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const copy = t.problem.blindspot;

  /* Shared curve data — identical for both panels. */
  const { curve, area } = useMemo(() => {
    const pts = USAGE.map((v, i) => [
      X0 + ((X1 - X0) * i) / (USAGE.length - 1),
      CURVE_BASE - v * (CURVE_BASE - CURVE_TOP),
    ]);
    const line = smoothPath(pts);
    return { curve: line, area: `${line} L ${X1} ${CURVE_BASE} L ${X0} ${CURVE_BASE} Z` };
  }, []);

  return (
    <div className="blindspot" ref={ref}>
      {/* ── top: WITHOUT TAQA Control ──────────────────────────────── */}
      <div className="bs-panel bs-panel--without">
        <div className="bs-panel-header">
          <span className="bs-panel-heading bs-panel-heading--coral">{copy.without}</span>
          <p className="bs-panel-sub">{copy.withoutSub}</p>
        </div>
        <WithoutPanel
          curve={curve}
          area={area}
          copy={copy}
          inView={inView}
          reduce={reduce}
          isRtl={isRtl}
        />
      </div>

      <hr className="bs-separator" aria-hidden="true" />

      {/* ── bottom: WITH TAQA Control ─────────────────────────────── */}
      <div className="bs-panel bs-panel--with">
        <div className="bs-panel-header">
          <span className="bs-panel-heading bs-panel-heading--green">{copy.with}</span>
          <p className="bs-panel-sub">{copy.withSub}</p>
        </div>
        <WithPanel
          curve={curve}
          area={area}
          copy={copy}
          inView={inView}
          reduce={reduce}
        />
      </div>
    </div>
  );
}
