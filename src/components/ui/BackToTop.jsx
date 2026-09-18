import React from 'react';
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { usePrefersReducedMotion } from '../../lib/hooks';
import { getLenis } from '../../lib/smoothScroll';
import LineIcon from '../icons3d/LineIcon';

const R = 25; // ring radius, matches .to-top in phone.css
const C = 2 * Math.PI * R;

/**
 * Back-to-top, doubling as a read-progress ring.
 *
 * Appears once the visitor is a screen deep. Scrolls through Lenis when it is
 * running so the return is eased like every other scroll on the page, and falls
 * back to native behaviour otherwise (including under prefers-reduced-motion,
 * where it jumps instead of animating).
 */
export default function BackToTop() {
  const { t } = useLanguage();
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress, scrollY } = useScroll();

  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });
  const dash = useTransform(progress, (v) => `${Math.max(0.001, v) * C} ${C}`);
  const shown = useTransform(scrollY, (v) => v > 700);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => shown.on('change', setVisible), [shown]);

  const toTop = () => {
    const lenis = getLenis();
    if (lenis && !reduce) lenis.scrollTo(0, { duration: 1.1 });
    else window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          className="to-top"
          onClick={toTop}
          aria-label={t.footer.backToTop}
          title={t.footer.backToTop}
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.8, y: 12 }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.8, y: 12 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          whileHover={reduce ? undefined : { scale: 1.07 }}
          whileTap={reduce ? undefined : { scale: 0.94 }}
        >
          <svg className="to-top-ring" viewBox="0 0 52 52" aria-hidden="true">
            <circle className="track" cx="26" cy="26" r={R} />
            <motion.circle className="bar" cx="26" cy="26" r={R} style={{ strokeDasharray: dash }} />
          </svg>
          <LineIcon name="arrowUp" size={20} tone="green" animate={false} className="to-top-icon" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
