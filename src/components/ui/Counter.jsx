import React from 'react';
import { useCountUp, useInViewOnce } from '../../lib/hooks';
import { useLanguage } from '../../i18n/LanguageContext.jsx';

/**
 * Number that counts up once it scrolls into view, formatted for the active
 * locale (Arabic-Indic digits in AR, spaces in FR, commas in EN).
 */
export default function Counter({
  to,
  decimals = 0,
  duration = 1600,
  format = 'int',
  prefix = '',
  suffix = '',
  className = '',
}) {
  const [ref, inView] = useInViewOnce({ threshold: 0.4 });
  const { fmt } = useLanguage();
  const value = useCountUp(to, { duration, decimals, enabled: inView });

  const formatter = fmt[format] || fmt.int;

  return (
    <span ref={ref} className={`counter ${className}`}>
      {prefix}
      {/* tabular-nums in CSS keeps the digits from jittering as they change */}
      <span className="counter-value">{formatter(value)}</span>
      {suffix}
    </span>
  );
}
