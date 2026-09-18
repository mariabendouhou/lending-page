import React from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../../lib/hooks';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { VIEWPORT, fadeUp, fadeIn, scaleIn, stagger } from '../../lib/motion';

const BUILDERS = { up: fadeUp, in: fadeIn, scale: scaleIn };

/**
 * Section-level reveal. `variant="in"` is direction-aware: it enters from the
 * inline start edge, which mirrors automatically in RTL.
 */
export function Reveal({
  children,
  variant = 'up',
  delay = 0,
  y,
  x,
  duration,
  as = 'div',
  className = '',
  ...rest
}) {
  const reduce = usePrefersReducedMotion();
  const { rtlSign } = useLanguage();
  const build = BUILDERS[variant] || fadeUp;
  const variants = build({ delay, duration, reduce, y, x, sign: rtlSign });
  const Tag = motion[as] || motion.div;

  return (
    <Tag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Parent that releases its Reveal.Item children one after another. */
export function RevealGroup({ children, each = 0.09, delayChildren = 0, as = 'div', className = '', ...rest }) {
  const reduce = usePrefersReducedMotion();
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      className={className}
      variants={stagger({ each, delayChildren, reduce })}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Child of RevealGroup — inherits the parent's stagger timing. */
export function RevealItem({ children, variant = 'up', y = 26, as = 'div', className = '', ...rest }) {
  const reduce = usePrefersReducedMotion();
  const { rtlSign } = useLanguage();
  const build = BUILDERS[variant] || fadeUp;
  const Tag = motion[as] || motion.div;
  return (
    <Tag className={className} variants={build({ reduce, y, sign: rtlSign })} {...rest}>
      {children}
    </Tag>
  );
}

export default Reveal;
