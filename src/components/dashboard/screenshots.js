import { useEffect, useState } from 'react';

/**
 * Per-locale dashboard screenshots.
 *
 * Drop `public/dashboard-fr.webp`, `-en.webp`, `-ar.webp` to get a localized
 * screen; until they exist the shared `dashboard.webp` is used, so the section
 * never renders an empty screen. `dashboard.webp` is the bare screenshot — the
 * old `dashboard-laptop-mockup.webp` had the laptop baked into the bitmap and
 * cannot be used as a texture.
 */
/**
 * `dashboard-screen.webp` is the supplied dashboard-image.png re-encoded to
 * WebP (1600×914, 840 kB → 72 kB) — it is the real product UI and the default
 * screen for every locale. Drop a `dashboard-<lang>.webp` beside it to override
 * per language; the older bare `dashboard.webp` remains as a last resort.
 */
export const DEFAULT_SCREEN = '/dashboard-screen.webp';

export function screenshotCandidates(lang) {
  return [`/dashboard-${lang}.webp`, DEFAULT_SCREEN];
}

/** Native aspect of the supplied screenshot, used to size the laptop screen. */
export const SCREEN_ASPECT = 1600 / 914;

export const VIDEO_SRC = '/videos/dashboard-hero.mp4';
export const VIDEO_POSTER = '/videos/dashboard-hero-poster.webp';

/**
 * Resolve to the first candidate that actually decodes.
 *
 * Starts on the known-good asset rather than null: the probe is an upgrade to a
 * localized screen, not a precondition for having one. Starting empty meant the
 * laptop rendered a blank screen for as long as the probe took — and Vite's dev
 * SPA fallback answers a missing /dashboard-fr.webp with 200 text/html, so the
 * probe has to fail a decode before it moves on.
 */
export function useScreenshot(lang) {
  const [src, setSrc] = useState(DEFAULT_SCREEN);

  useEffect(() => {
    let cancelled = false;
    const candidates = screenshotCandidates(lang);

    const tryNext = (i) => {
      if (cancelled || i >= candidates.length) return;
      const img = new Image();
      img.onload = () => {
        if (!cancelled) setSrc(candidates[i]);
      };
      img.onerror = () => tryNext(i + 1);
      img.src = candidates[i];
    };

    setSrc(null);
    tryNext(0);
    return () => {
      cancelled = true;
    };
  }, [lang]);

  return src;
}

/**
 * Is the optional background video present? The brief keeps this as a slot to
 * be filled later, so the page must work identically with and without it.
 */
export function useVideoAvailable() {
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(VIDEO_SRC, { method: 'HEAD' })
      .then((res) => {
        if (!cancelled && res.ok && (res.headers.get('content-type') || '').includes('video')) {
          setAvailable(true);
        }
      })
      .catch(() => {
        /* no video yet — the 3D laptop carries the section */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return available;
}

/**
 * The hero phone screen, per locale.
 *
 * The captures we have are the English UI. Drop `public/app/home-fr.webp` or
 * `-ar.webp` beside the default and the hero picks them up with no code change
 * — worth doing, because an English screen inside a French page is the kind of
 * mismatch a visitor notices immediately.
 */
export function appScreenCandidates(lang) {
  return [`/app/home-${lang}.webp`, '/app/home.webp'];
}

export function useAppScreen(lang) {
  const [src, setSrc] = useState('/app/home.webp');

  useEffect(() => {
    let cancelled = false;
    const candidates = appScreenCandidates(lang);
    const tryNext = (i) => {
      if (cancelled || i >= candidates.length) return;
      const img = new Image();
      img.onload = () => {
        if (!cancelled) setSrc(candidates[i]);
      };
      img.onerror = () => tryNext(i + 1);
      img.src = candidates[i];
    };
    tryNext(0);
    return () => {
      cancelled = true;
    };
  }, [lang]);

  return src;
}
