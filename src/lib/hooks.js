import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * prefers-reduced-motion, live. Framer's own hook exists but we need the value
 * outside React-motion contexts too (r3f render loops, counters, CSS toggles).
 */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (!window.matchMedia) return undefined;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

/** True once the element has entered the viewport. Never flips back. */
export function useInViewOnce({ threshold = 0.2, rootMargin = '0px 0px -10% 0px' } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (!('IntersectionObserver' in window)) {
      setInView(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, inView];
}

/**
 * Live in/out visibility — unlike useInViewOnce this keeps tracking, so the
 * shared 3D canvas can stop rendering icons that scrolled away.
 */
export function useIsVisible({ threshold = 0, rootMargin = '200px' } = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold,
      rootMargin,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, visible];
}

/**
 * Count from 0 to `to` once in view. Uses rAF, writes a number to state at
 * ~60fps but only while running, and snaps straight to the end value under
 * prefers-reduced-motion.
 */
export function useCountUp(to, { duration = 1600, decimals = 0, start = 0, enabled = true } = {}) {
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = useState(start);
  const frame = useRef(0);

  useEffect(() => {
    if (!enabled) return undefined;
    if (reduced) {
      setValue(to);
      return undefined;
    }
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / duration);
      // easeOutCubic — fast start, settles gently on the final digit
      const eased = 1 - Math.pow(1 - p, 3);
      const next = start + (to - start) * eased;
      setValue(decimals ? Number(next.toFixed(decimals)) : Math.round(next));
      if (p < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [to, duration, decimals, start, enabled, reduced]);

  return value;
}

/**
 * Normalised pointer offset from an element's centre, in the range [-1, 1].
 * Powers the magnetic buttons, card glow and cursor-tilt on the 3D pieces.
 * Returns {x, y} plus handlers to spread onto the element.
 */
export function usePointerTilt({ max = 1, disabled = false } = {}) {
  const ref = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onPointerMove = useCallback(
    (event) => {
      if (disabled) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      setOffset({
        x: Math.max(-max, Math.min(max, x)),
        y: Math.max(-max, Math.min(max, y)),
      });
    },
    [disabled, max]
  );

  const onPointerLeave = useCallback(() => setOffset({ x: 0, y: 0 }), []);

  return { ref, offset, handlers: { onPointerMove, onPointerLeave } };
}

/**
 * Coarse capability probe: no WebGL, software rasteriser, low core count, low
 * memory or data-saver → stay on the static SVG.
 *
 * Cached at module scope and the probe context is explicitly released. Running
 * this per component created one throwaway WebGL context per icon; past ~16
 * Chrome starts evicting the oldest context, which killed the shared canvas
 * and left the 3D sections blank ("Too many active WebGL contexts").
 */
let probeResult = null;

function probe3D() {
  if (probeResult !== null) return probeResult;
  let ok = true;
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) {
      ok = false;
    } else {
      const info = gl.getExtension('WEBGL_debug_renderer_info');
      if (info) {
        // A software rasteriser technically works, but not at 60fps.
        const renderer = String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL) || '');
        if (/swiftshader|software|llvmpipe/i.test(renderer)) ok = false;
      }
      // Hand the context back before the real canvas asks for one.
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    }
  } catch {
    ok = false;
  }
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) ok = false;
  if (navigator.deviceMemory && navigator.deviceMemory < 2) ok = false;
  if (navigator.connection?.saveData) ok = false;
  probeResult = ok;
  return ok;
}

export function useCanRender3D() {
  const [can, setCan] = useState(probeResult);

  useEffect(() => {
    if (can === null) setCan(probe3D());
  }, [can]);

  return can;
}
