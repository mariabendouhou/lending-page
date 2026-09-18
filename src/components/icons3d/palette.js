/**
 * Brand colours as plain data — deliberately in its own module with no three.js
 * import, so the static SVG fallback can use them without pulling the entire
 * 3D stack into the initial bundle.
 */
export const PALETTE = {
  green: '#69E6B0',
  greenSoft: '#B9F2D5',
  dark: '#06251B',
  light: '#F5F7F0',
  gold: '#E8C37A',
  coral: '#FC8B7E',
};

export const TONE_FILL = {
  green: PALETTE.green,
  greenSoft: PALETTE.greenSoft,
  gold: PALETTE.gold,
  coral: PALETTE.coral,
  light: PALETTE.light,
  dark: PALETTE.dark,
};
