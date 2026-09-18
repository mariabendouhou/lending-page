import React from 'react';
import { motion } from 'framer-motion';
import { resolveLineIcon } from './lineIcons';
import { PALETTE } from './palette';
import { usePrefersReducedMotion } from '../../lib/hooks';

const STROKE = {
  green: PALETTE.green,
  greenSoft: PALETTE.greenSoft,
  gold: PALETTE.gold,
  coral: PALETTE.coral,
  light: PALETTE.light,
  dark: PALETTE.dark,
};

/**
 * A small icon, drawn as strokes and animated by drawing itself in.
 *
 * At 24–40px this reads far better than an extruded solid: the stroke weight
 * stays constant, nothing collapses, and the draw-on is legible motion at a
 * size where a bevel and a specular highlight are invisible anyway.
 */
export default function LineIcon({
  name,
  size = 28,
  tone = 'green',
  title,
  className = '',
  animate = true,
  strokeWidth,
}) {
  const paths = resolveLineIcon(name);
  const reduce = usePrefersReducedMotion();
  if (!paths) return null;

  const color = STROKE[tone] || PALETTE.green;
  // Keep the optical weight even as the box changes: thinner at large sizes.
  const sw = strokeWidth ?? (size >= 34 ? 1.6 : 1.8);
  const doAnimate = animate && !reduce;

  return (
    <svg
      className={`line-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? 'img' : 'presentation'}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : 'true'}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      {paths.map((p, i) =>
        p.fill ? (
          <motion.path
            key={i}
            d={p.d}
            fill={color}
            stroke="none"
            initial={doAnimate ? { opacity: 0, scale: 0.4 } : false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.25 + i * 0.06 }}
            style={{ transformOrigin: '50% 50%' }}
          />
        ) : (
          <motion.path
            key={i}
            d={p.d}
            initial={doAnimate ? { pathLength: 0, opacity: 0 } : false}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: { duration: 0.65, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.15, delay: i * 0.09 },
            }}
          />
        )
      )}
    </svg>
  );
}
