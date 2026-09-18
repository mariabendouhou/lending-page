import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../../lib/hooks';
import { fadeUp, VIEWPORT } from '../../lib/motion';

/**
 * Card with a cursor-reactive glow. The pointer position is written to CSS
 * custom properties so the highlight is painted by a compositor-friendly
 * radial-gradient rather than by React re-rendering on every mouse move.
 */
export default function GlowCard({
  children,
  className = '',
  delay = 0,
  as = 'div',
  lift = true,
  ...rest
}) {
  const reduce = usePrefersReducedMotion();
  const ref = useRef(null);

  const handleMove = (event) => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${((event.clientX - rect.left) / rect.width) * 100}%`);
    el.style.setProperty('--my', `${((event.clientY - rect.top) / rect.height) * 100}%`);
  };

  const Tag = motion[as] || motion.div;

  return (
    <Tag
      ref={ref}
      className={`glow-card ${className}`}
      onMouseMove={handleMove}
      variants={fadeUp({ delay, reduce })}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      whileHover={reduce || !lift ? undefined : { y: -6 }}
      transition={{ duration: 0.3 }}
      {...rest}
    >
      <span className="glow-card-sheen" aria-hidden="true" />
      {children}
    </Tag>
  );
}
