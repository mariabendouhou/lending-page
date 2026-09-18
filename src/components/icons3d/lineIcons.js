/**
 * Stroke-based line icons, drawn to match the app's own icon style (thin
 * strokes, round caps, 24×24 — see public/ui screenshots).
 *
 * Why this exists: the extruded 3D icons are built from FILLED shapes, and a
 * filled glyph shrunk to 26–34px turns into an unreadable blob — bevels,
 * highlights and multi-part detail all collapse below roughly 40px. Small icons
 * now render from this set instead, so they stay crisp and legible, and 3D is
 * reserved for the sizes that can actually carry it.
 *
 * Each entry is an array of stroke sub-paths. `fill` marks a sub-path that
 * should be solid (a dot, a knob) rather than stroked.
 */

const S = (d) => ({ d });
const F = (d) => ({ d, fill: true });

export const LINE_ICONS = {
  // ── energy ────────────────────────────────────────────────────────────────
  bolt: [S('M13 3 L5.5 13.5 h5 L10 21 l8-11h-5.2z')],
  gauge: [S('M3.5 17a8.5 8.5 0 0 1 17 0'), S('M12 17l4.2-4.2')],
  trendUp: [S('M3.5 16.5 L9 11l3.5 3.5L20 7'), S('M14.5 7H20v5.5')],

  // ── alerting ──────────────────────────────────────────────────────────────
  bell: [
    S('M6.8 16.5c0-1 .7-1.6.7-5.2A4.5 4.5 0 0 1 12 6.8a4.5 4.5 0 0 1 4.5 4.5c0 3.6.7 4.2.7 5.2z'),
    S('M5.5 16.5h13'),
    S('M10 19.5a2 2 0 0 0 4 0'),
  ],
  alert: [S('M12 4 L21.5 20H2.5z'), S('M12 10v4'), F('M11.15 16.4h1.7v1.7h-1.7z')],
  sparkle: [S('M12 3.5l1.9 5.6 5.6 1.9-5.6 1.9L12 18.5l-1.9-5.6L4.5 11l5.6-1.9z')],

  // ── measurement & data ────────────────────────────────────────────────────
  chart: [S('M4.5 20V13'), S('M12 20V6.5'), S('M19.5 20v-9')],
  eye: [S('M2.5 12S6 6.5 12 6.5 21.5 12 21.5 12 18 17.5 12 17.5 2.5 12 2.5 12z'), S('M12 9.6a2.4 2.4 0 1 0 0 4.8 2.4 2.4 0 0 0 0-4.8z')],
  receipt: [S('M6 3h12v18l-3-1.8-3 1.8-3-1.8L6 21z'), S('M9 8h6'), S('M9 12h4')],
  clock: [S('M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17z'), S('M12 7.5V12l3.2 2')],
  calendar: [S('M4.5 6h15v14h-15z'), S('M8 3.5V7'), S('M16 3.5V7'), S('M4.5 10.5h15')],
  download: [S('M12 4v10'), S('M8 10.5l4 4 4-4'), S('M5 19.5h14')],

  // ── control ───────────────────────────────────────────────────────────────
  toggle: [S('M8 7.5h8a4.5 4.5 0 0 1 0 9H8a4.5 4.5 0 0 1 0-9z'), F('M16 9.2a2.8 2.8 0 1 1 0 5.6 2.8 2.8 0 0 1 0-5.6z')],
  plug: [S('M9 3.5V8'), S('M15 3.5V8'), S('M6.5 8h11v2.6a5.5 5.5 0 0 1-4 5.3v4.6h-3v-4.6a5.5 5.5 0 0 1-4-5.3z')],
  phone: [S('M7.5 3h9v18h-9z'), S('M10.5 5.6h3')],
  wifi: [S('M4 10.5a11 11 0 0 1 16 0'), S('M7 13.8a7 7 0 0 1 10 0'), F('M10.9 17.6h2.2v2.2h-2.2z')],
  network: [S('M12 9.2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6z'), S('M12 3.5v5.7'), S('M12 14.8v5.7'), S('M3.5 12h5.7'), S('M14.8 12h5.7')],

  // ── places ────────────────────────────────────────────────────────────────
  mapPin: [S('M12 3.5a6 6 0 0 0-6 6c0 4.5 6 11 6 11s6-6.5 6-11a6 6 0 0 0-6-6z'), S('M12 7.8a2.1 2.1 0 1 0 0 4.2 2.1 2.1 0 0 0 0-4.2z')],
  home: [S('M4 11l8-7 8 7'), S('M6 10v10h12V10'), S('M10 20v-5h4v5')],
  building: [S('M5.5 3.5h13v17h-13z'), S('M8.5 7h2.5'), S('M13 7h2.5'), S('M8.5 11h2.5'), S('M13 11h2.5'), S('M10.5 20.5v-4h3v4')],
  factory: [S('M3 20.5V10l5.5 3.5V10L14 13.5V6h7v14.5z')],
  flag: [S('M6 3.5v17'), S('M6 4.5h13v8H6z')],

  // ── home circuits ─────────────────────────────────────────────────────────
  lamp: [S('M12 3.5L5 11h14z'), S('M12 11v5'), S('M9.6 18.8a2.4 2.4 0 0 0 4.8 0z')],
  socket: [S('M4 4.5h16v15H4z'), S('M9.4 9.5v4'), S('M14.6 9.5v4')],
  snowflake: [S('M12 3v18'), S('M4.2 7.5l15.6 9'), S('M19.8 7.5l-15.6 9')],
  droplet: [S('M12 3.5s6 6.6 6 10.2a6 6 0 0 1-12 0C6 10.1 12 3.5 12 3.5z')],
  fridge: [S('M6.5 3.5h11v17h-11z'), S('M6.5 10h11'), S('M9 6.5v2'), S('M9 12.5v2.5')],
  oven: [S('M4 4.5h16v15H4z'), S('M4 9.5h16'), F('M6.6 6.4h1.6v1.6H6.6z'), S('M8 13h8v4H8z')],
  ac: [S('M4 5.5h16v6H4z'), S('M7 15c0 1.6 1 2.2 1 3.6'), S('M12 15c0 1.6 1 2.2 1 3.6'), S('M17 15c0 1.6-1 2.2-1 3.6')],
  pump: [S('M12 3.5s5 5.4 5 8.6a5 5 0 0 1-10 0C7 8.9 12 3.5 12 3.5z'), S('M10.2 12.2a1.8 1.8 0 0 0 3.6 0')],

  // ── nature & trust ────────────────────────────────────────────────────────
  leaf: [S('M20 4C11 4 5.5 8 5 14c-.3 3 1 5 2.4 6 .6-3.6 2.8-7 7-9.4'), S('M20 4c.4 10-5 15.6-11.6 16.6')],
  cloud: [S('M7 18.5a4.5 4.5 0 0 1-.6-9A6 6 0 0 1 18 9.6a4.5 4.5 0 0 1-.6 8.9z')],
  shield: [S('M12 3.5L4.5 6v5.5c0 4.6 3.2 8.7 7.5 10 4.3-1.3 7.5-5.4 7.5-10V6z')],
  lock: [S('M5.5 11h13v9.5h-13z'), S('M8.5 11V8a3.5 3.5 0 0 1 7 0v3'), F('M11.2 14.6h1.6v3h-1.6z')],
  bulb: [S('M12 3.5a6 6 0 0 0-3.4 11v2h6.8v-2A6 6 0 0 0 12 3.5z'), S('M9.8 19.5h4.4'), S('M10.4 21.5h3.2')],
  camera: [S('M3.5 7.5h17v13h-17z'), S('M9 7.5l1.4-3h3.2L15 7.5'), S('M12 10.6a3.4 3.4 0 1 0 0 6.8 3.4 3.4 0 0 0 0-6.8z')],
  keypad: [S('M4.5 3.5h15v17h-15z'), F('M8.2 8.2h1.8V10H8.2z'), F('M14 8.2h1.8V10H14z'), F('M8.2 13.4h1.8v1.8H8.2z'), F('M14 13.4h1.8v1.8H14z')],
  card: [S('M3 6h18v12H3z'), S('M3 10h18'), S('M6 14.5h4')],
  tray: [S('M12 3.5v8'), S('M8.6 8.4l3.4 3.4 3.4-3.4'), S('M3.5 13.5h4.2l1.5 2.8h5.6l1.5-2.8h4.2v7h-17z')],

  // ── ui ────────────────────────────────────────────────────────────────────
  check: [S('M4.5 12.5l5 5 10-10')],
  arrowRight: [S('M4 12h15'), S('M13.5 6.5L20 12l-6.5 5.5')],
  arrowUp: [S('M12 20V5'), S('M6 11l6-6 6 6')],
  person: [S('M12 4.5a3.4 3.4 0 1 0 0 6.8 3.4 3.4 0 0 0 0-6.8z'), S('M5.5 20.5c0-3.6 2.9-6.2 6.5-6.2s6.5 2.6 6.5 6.2')],
  settings: [S('M12 9.2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6z'), S('M12 3.5v2.4M12 18.1v2.4M4.9 7.8l2 1.2M17.1 15l2 1.2M4.9 16.2l2-1.2M17.1 9l2-1.2')],
};

/** Names that only exist in the 3D registry fall back to a sensible line icon. */
export const LINE_ALIASES = {
  realtime: 'clock',
  tranche: 'gauge',
  budget: 'bell',
  anomaly: 'alert',
  remote: 'phone',
  co2: 'cloud',
  carbon: 'leaf',
  visibility: 'eye',
  bill: 'receipt',
  peak: 'trendUp',
  forecast: 'calendar',
  exports: 'download',
  circuit: 'toggle',
  module: 'plug',
  secure: 'lock',
  offline: 'wifi',
  algerian: 'flag',
  detection: 'sparkle',
  wilaya: 'mapPin',
  grid: 'network',
  lighting: 'lamp',
  sockets: 'socket',
  waterHeater: 'droplet',
  industry: 'factory',
  simple: 'check',
  tip: 'bulb',
  scan: 'camera',
  readings: 'keypad',
  pay: 'card',
  inbox: 'tray',
  dispatch: 'mapPin',
  family: 'person',
  alerts: 'bell',
  report: 'camera',
  schedule: 'clock',
  away: 'lock',
  freezer: 'snowflake',
  waterPump: 'pump',
};

export function resolveLineIcon(name) {
  const key = LINE_ALIASES[name] || name;
  return LINE_ICONS[key] || null;
}
