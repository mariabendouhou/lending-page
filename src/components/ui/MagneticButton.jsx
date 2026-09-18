import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../../lib/hooks';
import { EASE_SPRING } from '../../lib/motion';

/**
 * A button/link that leans toward the cursor and carries a highlight that
 * follows it. Transform + a CSS custom property only — no layout is touched.
 */
export default function MagneticButton({
  as = 'a',
  href,
  onClick,
  children,
  className = '',
  strength = 9,
  ...rest
}) {
  const reduce = usePrefersReducedMotion();
  const ref = useRef(null);
  const [pull, setPull] = useState({ x: 0, y: 0 });

  const handleMove = (event) => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = (event.clientX - rect.left) / rect.width - 0.5;
    const dy = (event.clientY - rect.top) / rect.height - 0.5;
    setPull({ x: dx * strength * 2, y: dy * strength });
    el.style.setProperty('--glow-x', `${((event.clientX - rect.left) / rect.width) * 100}%`);
    el.style.setProperty('--glow-y', `${((event.clientY - rect.top) / rect.height) * 100}%`);
  };

  const reset = () => setPull({ x: 0, y: 0 });

  const Tag = motion[as] || motion.a;

  return (
    <Tag
      ref={ref}
      href={href}
      onClick={onClick}
      className={`magnetic ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      animate={reduce ? undefined : { x: pull.x, y: pull.y }}
      transition={EASE_SPRING}
      whileHover={reduce ? undefined : { scale: 1.03 }}
      whileTap={reduce ? undefined : { scale: 0.98 }}
      {...rest}
    >
      <span className="magnetic-inner">{children}</span>
      <span className="magnetic-glow" aria-hidden="true" />
    </Tag>
  );
}
