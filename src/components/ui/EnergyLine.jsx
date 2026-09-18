import React from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../../lib/hooks';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { VIEWPORT_EARLY, drawLine } from '../../lib/motion';

/**
 * The animated energy line that carries the eye between sections: a conductor
 * that draws itself as you arrive, with a charge travelling along it.
 * Mirrored in RTL so the charge always runs in the reading direction.
 */
export default function EnergyLine({ variant = 'wave', className = '' }) {
  const reduce = usePrefersReducedMotion();
  const { isRtl } = useLanguage();

  const path =
    variant === 'step'
      ? 'M0 40 H140 L200 12 H360 L420 68 H560 L620 40 H800'
      : 'M0 40 C120 40 160 8 280 8 S440 72 560 72 S720 40 800 40';

  return (
    <div className={`energy-line ${className}`} aria-hidden="true">
      <svg viewBox="0 0 800 80" preserveAspectRatio="none" style={{ transform: isRtl ? 'scaleX(-1)' : undefined }}>
        <defs>
          <linearGradient id={`el-grad-${variant}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#69E6B0" stopOpacity="0" />
            <stop offset="35%" stopColor="#69E6B0" stopOpacity="0.85" />
            <stop offset="65%" stopColor="#B9F2D5" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#69E6B0" stopOpacity="0" />
          </linearGradient>
        </defs>

        <motion.path
          d={path}
          fill="none"
          stroke={`url(#el-grad-${variant})`}
          strokeWidth="2"
          strokeLinecap="round"
          variants={drawLine({ reduce, duration: 1.8 })}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_EARLY}
        />

        {reduce ? null : (
          // The travelling charge. CSS motion-path keeps this on the compositor;
          // animating cx/cy instead would invalidate the SVG layout every frame.
          <motion.circle
            r="4"
            fill="#B9F2D5"
            style={{ offsetPath: `path("${path}")`, offsetRotate: '0deg' }}
            animate={{ offsetDistance: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: 'linear',
              times: [0, 0.12, 0.88, 1],
            }}
          />
        )}
      </svg>
    </div>
  );
}
