import React from 'react';
import LineIcon from './LineIcon';
import { useLanguage } from '../../i18n/LanguageContext.jsx';

/**
 * The page's single icon component.
 *
 * It used to render extruded WebGL solids. That was a mistake: a filled glyph
 * with bevels and specular highlights is unreadable at the 48–58px a card icon
 * actually occupies — it renders as a washed-out blob, which is exactly how it
 * looked on the feature grid. Flat stroke icons in a tinted badge, matching the
 * app's own icon language (see public/ui), read correctly at every size, cost
 * nothing, and animate by drawing themselves in.
 *
 * `Icons3DRoot` is kept as a no-op so nothing has to change if the 3D layer is
 * ever reinstated for a deliberate hero moment.
 */
export function Icons3DRoot() {
  return null;
}

export default function Icon3D({
  name,
  size = 56,
  tone = 'green',
  label,
  className = '',
  badge = true,
  animate = true,
  // accepted and ignored — kept so existing call sites stay valid
  interactive,
  spin,
  force3d,
}) {
  const { t, interpolate } = useLanguage();
  const title = label ? interpolate(t.a11y.icon3dLabel, { name: label }) : undefined;

  // The glyph sits at ~54% of the badge, which is the ratio the app uses.
  const glyph = badge ? Math.round(size * 0.54) : size;

  if (!badge) {
    return <LineIcon name={name} size={glyph} tone={tone} title={title} className={className} animate={animate} />;
  }

  return (
    <span className={`icon-badge tone-${tone} ${className}`} style={{ width: size, height: size }}>
      <LineIcon name={name} size={glyph} tone={tone} title={title} animate={animate} />
    </span>
  );
}
