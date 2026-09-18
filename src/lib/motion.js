/**
 * Shared motion vocabulary.
 *
 * Rules enforced here (brief §3.4):
 *   - transform / opacity only. Never width, height, top, left.
 *   - every variant collapses to a plain fade when prefers-reduced-motion is set
 *   - directional motion is mirrored in RTL via the `sign` argument
 */

export const EASE_OUT = [0.16, 1, 0.3, 1];
export const EASE_IN_OUT = [0.65, 0, 0.35, 1];
export const EASE_SPRING = { type: 'spring', stiffness: 260, damping: 26, mass: 0.9 };

/** Viewport config for whileInView — fires once, slightly before full entry. */
export const VIEWPORT = { once: true, amount: 0.2, margin: '0px 0px -10% 0px' };
export const VIEWPORT_EARLY = { once: true, amount: 0.05, margin: '0px 0px -5% 0px' };

const reduced = (duration = 0.3) => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration } },
});

/** Fade + rise. The default section-content reveal. */
export function fadeUp({ y = 24, delay = 0, duration = 0.7, reduce = false } = {}) {
  if (reduce) return reduced();
  return {
    hidden: { opacity: 0, y },
    visible: { opacity: 1, y: 0, transition: { duration, delay, ease: EASE_OUT } },
  };
}

/** Fade in from the inline start edge. `sign` is -1 in RTL. */
export function fadeIn({ x = 24, sign = 1, delay = 0, duration = 0.7, reduce = false } = {}) {
  if (reduce) return reduced();
  return {
    hidden: { opacity: 0, x: x * sign },
    visible: { opacity: 1, x: 0, transition: { duration, delay, ease: EASE_OUT } },
  };
}

export function scaleIn({ from = 0.94, delay = 0, duration = 0.65, reduce = false } = {}) {
  if (reduce) return reduced();
  return {
    hidden: { opacity: 0, scale: from },
    visible: { opacity: 1, scale: 1, transition: { duration, delay, ease: EASE_OUT } },
  };
}

/** Parent that releases its children one after another. */
export function stagger({ each = 0.08, delayChildren = 0, reduce = false } = {}) {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduce ? 0 : each,
        delayChildren: reduce ? 0 : delayChildren,
      },
    },
  };
}

/** Word-by-word headline reveal. Words rise and un-blur into place. */
export function wordReveal({ reduce = false } = {}) {
  if (reduce) return reduced(0.25);
  return {
    hidden: { opacity: 0, y: '0.5em', rotateX: -35 },
    visible: {
      opacity: 1,
      y: '0em',
      rotateX: 0,
      transition: { duration: 0.75, ease: EASE_OUT },
    },
  };
}

/** Stroke-drawing for inline SVG charts. */
export function drawLine({ delay = 0, duration = 1.6, reduce = false } = {}) {
  if (reduce) {
    return {
      hidden: { opacity: 0, pathLength: 1 },
      visible: { opacity: 1, pathLength: 1, transition: { duration: 0.3 } },
    };
  }
  return {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { pathLength: { duration, delay, ease: EASE_IN_OUT }, opacity: { duration: 0.2, delay } },
    },
  };
}

/** Bars growing from their baseline. Uses scaleY, not height. */
export function growBar({ index = 0, reduce = false } = {}) {
  if (reduce) return reduced();
  return {
    hidden: { scaleY: 0, opacity: 0 },
    visible: {
      scaleY: 1,
      opacity: 1,
      transition: { duration: 0.7, delay: 0.06 * index, ease: EASE_OUT },
    },
  };
}

/** Slow ambient drift for background/decor layers. */
export function ambientFloat({ y = 10, duration = 7, reduce = false } = {}) {
  if (reduce) return {};
  return {
    animate: { y: [0, -y, 0] },
    transition: { duration, repeat: Infinity, ease: 'easeInOut' },
  };
}
