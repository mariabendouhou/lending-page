import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import {
  usePrefersReducedMotion,
  useCanRender3D,
  useIsVisible,
  usePointerTilt,
} from '../lib/hooks';
import { useScreenshot, useVideoAvailable, VIDEO_SRC, VIDEO_POSTER } from './dashboard/screenshots';
import { Icon3D } from './icons3d';
import SectionHead from './ui/SectionHead';
import { Reveal, RevealGroup, RevealItem } from './ui/Reveal';

// three.js only ships if a visitor actually reaches this section.
const DashboardCanvas = lazy(() => import('./dashboard/DashboardCanvas'));

/**
 * The operator portal on a 3D laptop (brief §3.5).
 *
 * The modelled laptop beats the flat mockup for one concrete reason: its screen
 * is a texture slot, so it shows the REAL dashboard screenshot and can swap it
 * per locale. A baked mockup can do neither.
 *
 * Three rendering paths, in order of preference:
 *   1. background video present → CSS 3D composite, with the real screenshot
 *      perspective-mapped over the screen area (generated footage cannot render
 *      the actual product UI, so the screenshot stays the source of truth).
 *   2. WebGL available → the modelled laptop, yawing on scroll, leaning to the
 *      cursor, with the screenshot as its screen.
 *   3. neither → the supplied laptop mockup, which needs no WebGL at all.
 */
export default function DashboardSection() {
  const { t, lang } = useLanguage();
  const reduce = usePrefersReducedMotion();
  const can3d = useCanRender3D();
  const screenshot = useScreenshot(lang);
  const hasVideo = useVideoAvailable();

  const stageRef = useRef(null);
  const [visibleRef, visible] = useIsVisible({ rootMargin: '300px' });
  const { ref: tiltRef, offset, handlers } = usePointerTilt({ disabled: reduce });

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ['start end', 'end start'],
  });
  const [scroll, setScroll] = useState(0.5);
  const hazeY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-10%', '10%']);

  useEffect(() => scrollYProgress.on('change', setScroll), [scrollYProgress]);

  const use3d = can3d === true && !hasVideo;

  const setRef = (el) => {
    stageRef.current = el;
    visibleRef.current = el;
    tiltRef.current = el;
  };

  return (
    <section className="dashboard-section section-light" id="dashboard">
      <motion.div className="dashboard-haze" style={{ y: hazeY }} aria-hidden="true" />

      <div className="wrap dashboard-inner">
        <div className="dashboard-copy">
          <SectionHead eyebrow={t.dashboard.eyebrow} title={t.dashboard.title} lead={t.dashboard.lead} />
          <RevealGroup className="dashboard-bullets" as="ul" each={0.09}>
            {t.dashboard.bullets.map((line) => (
              <RevealItem as="li" key={line} className="dashboard-bullet">
                <Icon3D name="simple" size={26} badge={false} />
                <span>{line}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <Reveal className="dashboard-stage-wrap" variant="scale" delay={0.1}>
          <div
            className={`dashboard-stage ${use3d ? 'is-3d' : hasVideo ? 'is-video' : 'is-flat'}`}
            ref={setRef}
            onMouseMove={handlers.onPointerMove}
            onMouseLeave={handlers.onPointerLeave}
            style={{
              '--tilt-x': `${(offset.y * -4).toFixed(2)}deg`,
              '--tilt-y': `${(offset.x * 7).toFixed(2)}deg`,
            }}
          >
            {hasVideo ? (
              <video
                className="dashboard-video"
                src={VIDEO_SRC}
                poster={VIDEO_POSTER}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-hidden="true"
              />
            ) : null}

            {use3d ? (
              <>
                {visible ? (
                  <Suspense fallback={null}>
                    <DashboardCanvas
                      active={visible}
                      screenshot={screenshot}
                      scroll={scroll}
                      tilt={offset}
                      reduce={reduce}
                      light
                    />
                  </Suspense>
                ) : null}
                <span className="dashboard-hint">{t.dashboard.hint}</span>
                {/* The screen is a texture, so the dashboard's accessible
                    description has to live in the DOM beside it. */}
                <span className="sr-only">{t.dashboard.alt}</span>
              </>
            ) : (
              // No WebGL (or a background video is present): the supplied
              // mockup carries the section instead.
              <div className="dashboard-css3d">
                <img
                  src="/mockups/dashboard-laptop-mockup.webp"
                  alt={t.dashboard.alt}
                  className="dashboard-mockup"
                  width="1200"
                  height="838"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            )}
          </div>
        </Reveal>

        <Reveal className="dashboard-caption" as="p" delay={0.2}>
          {t.dashboard.caption}
        </Reveal>
      </div>
    </section>
  );
}
