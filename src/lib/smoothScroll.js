import Lenis from 'lenis';

/**
 * Lenis smooth scroll, wired to framer-motion and GSAP.
 *
 * Lenis is the piece that makes heavy scroll animation feel intentional rather
 * than twitchy: it takes over the scroll position and eases it, and — unlike
 * most smooth-scroll hacks — it drives the real document scroll, so `position:
 * sticky`, IntersectionObserver and framer's `useScroll` keep working.
 *
 * Disabled entirely under prefers-reduced-motion: hijacking someone's scroll
 * after they have asked for less motion is the wrong trade.
 */

let lenis = null;
let rafId = 0;

export function initSmoothScroll() {
  if (typeof window === 'undefined' || lenis) return null;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null;
  // Touch devices already have native momentum that feels better than ours.
  if (window.matchMedia('(pointer: coarse)').matches) return null;

  lenis = new Lenis({
    duration: 1.05,
    // A gentle exponential ease-out: quick to respond, slow to settle.
    easing: (x) => Math.min(1, 1.001 - Math.pow(2, -10 * x)),
    smoothWheel: true,
    syncTouch: false,
    wheelMultiplier: 1,
  });

  const raf = (time) => {
    lenis?.raf(time);
    rafId = requestAnimationFrame(raf);
  };
  rafId = requestAnimationFrame(raf);

  // `scroll-behavior: smooth` in CSS fights Lenis for the same gesture.
  document.documentElement.classList.add('lenis-active');

  /**
   * Lenis owns the scroll position, so the browser's own jump to `#id` on load
   * is swallowed and a deep link such as /#faq lands at the top of the page.
   * Re-issue it through Lenis once layout has settled.
   */
  const jumpToHash = (immediate) => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const el = document.getElementById(id);
    if (el) lenis.scrollTo(el, { offset: -88, immediate });
  };

  if (window.location.hash) {
    // Two frames: one for layout, one for fonts/images that shift it again.
    requestAnimationFrame(() => requestAnimationFrame(() => jumpToHash(true)));
  }
  window.addEventListener('hashchange', () => jumpToHash(false));

  return lenis;
}

export function destroySmoothScroll() {
  cancelAnimationFrame(rafId);
  lenis?.destroy();
  lenis = null;
  document.documentElement.classList.remove('lenis-active');
}

export const getLenis = () => lenis;

/** Anchor links must go through Lenis, or they jump while the page is easing. */
export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: -88, duration: 1.1 });
  else el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
