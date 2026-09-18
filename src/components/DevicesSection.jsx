import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { usePrefersReducedMotion, useIsVisible } from '../lib/hooks';
import { EASE_OUT } from '../lib/motion';
import { Icon3D } from './icons3d';
import LineIcon from './icons3d/LineIcon';
import SectionHead from './ui/SectionHead';
import { Reveal, RevealGroup, RevealItem } from './ui/Reveal';

/**
 * Control (PLATFORM-OVERVIEW Part 2 + the app's own Control screen).
 *
 * Rebuilt to match what the app actually does, which is more interesting than
 * what I had: essential appliances are marked P1 and carry a PADLOCK, not a
 * switch — they cannot be cut from the app at all. Only non-essentials (P2)
 * toggle. Every row shows `Room · W · DZD`, exactly as the app does.
 *
 * That makes the safety promise something the visitor can see rather than read:
 * they try to switch off the fridge and find they can't.
 */

const EXTRA_ICONS = ['away', 'schedule', 'circuit'];
const KNOB_TRAVEL = 24; // px — track width minus knob minus padding

function Switch({ on, onToggle, label, stateText }) {
  const reduce = usePrefersReducedMotion();
  const { rtlSign } = useLanguage();
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      className={`dv-switch ${on ? 'is-on' : ''}`}
      onClick={onToggle}
    >
      {/* transform, not `left`, and mirrored so the knob travels in the
          reading direction */}
      <motion.span
        className="dv-switch-knob"
        animate={{ x: (on ? KNOB_TRAVEL : 0) * rtlSign }}
        transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 520, damping: 32 }}
      />
      <span className="sr-only">{stateText}</span>
    </button>
  );
}

function ApplianceRow({ item, locked, on, onToggle, live, index }) {
  const { t, fmt, interpolate } = useLanguage();
  const reduce = usePrefersReducedMotion();
  const watts = locked ? item.watts : on ? live : 0;

  return (
    <motion.li
      className={`ap-row ${locked ? 'is-locked' : on ? 'is-on' : 'is-off'}`}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: EASE_OUT }}
    >
      <span className="ap-icon" aria-hidden="true">
        <LineIcon name={item.icon} size={24} tone={locked ? 'greenSoft' : 'green'} animate={false} />
      </span>

      <span className="ap-id">
        <span className="ap-name">
          {item.name}
          <em className={`ap-prio ${locked ? 'p1' : 'p2'}`}>{locked ? 'P1' : 'P2'}</em>
        </span>
        <span className="ap-meta">
          {item.room} · {fmt.watts(watts)} · {fmt.dzd(item.dzd)}
        </span>
      </span>

      {locked ? (
        <span className="ap-lock" title={t.devices.locked}>
          <LineIcon name="lock" size={20} tone="greenSoft" animate={false} />
          <span className="sr-only">{t.devices.locked}</span>
        </span>
      ) : (
        <Switch
          on={on}
          onToggle={onToggle}
          label={interpolate(t.devices.toggleLabel, { name: item.name })}
          stateText={on ? t.devices.on : t.devices.off}
        />
      )}
    </motion.li>
  );
}

export default function DevicesSection() {
  const { t, fmt } = useLanguage();
  const reduce = usePrefersReducedMotion();
  const [sectionRef, visible] = useIsVisible({ rootMargin: '100px' });

  const essentials = t.devices.essentials;
  const secondary = t.devices.secondary;

  const [states, setStates] = useState(() => secondary.map((_, i) => i !== 2));
  const [live, setLive] = useState(() => secondary.map((s) => s.watts));
  const tick = useRef(null);

  // Wattage wanders while a circuit is on; stopped off-screen and under
  // prefers-reduced-motion.
  useEffect(() => {
    if (reduce || !visible) return undefined;
    tick.current = setInterval(() => {
      setLive(secondary.map((s) => Math.max(0, Math.round(s.watts + (Math.random() - 0.5) * s.watts * 0.08))));
    }, 1500);
    return () => clearInterval(tick.current);
  }, [reduce, visible, secondary]);

  const total = useMemo(() => {
    const fixed = essentials.reduce((sum, e) => sum + e.watts, 0);
    const variable = secondary.reduce((sum, _, i) => sum + (states[i] ? live[i] : 0), 0);
    return fixed + variable;
  }, [essentials, secondary, states, live]);

  return (
    <section className="devices-section section-dark" id="devices" ref={sectionRef}>
      <div className="devices-bg" aria-hidden="true" />

      <div className="wrap">
        <SectionHead eyebrow={t.devices.eyebrow} title={t.devices.title} tone="dark" align="center" />

        <Reveal className="devices-support" as="p" delay={0.08}>
          {t.devices.support}
        </Reveal>

        <div className="ap-groups">
          <Reveal className="ap-group is-essential" variant="up">
            <header className="ap-group-head">
              <h3>{t.devices.essentialTitle}</h3>
              <p>{t.devices.essentialNote}</p>
            </header>
            <ul className="ap-list">
              {essentials.map((item, i) => (
                <ApplianceRow key={item.name} item={item} locked index={i} />
              ))}
            </ul>
          </Reveal>

          <Reveal className="ap-group is-secondary" variant="up" delay={0.1}>
            <header className="ap-group-head">
              <h3>{t.devices.secondaryTitle}</h3>
              <p>{t.devices.secondaryNote}</p>
            </header>
            <ul className="ap-list">
              {secondary.map((item, i) => (
                <ApplianceRow
                  key={item.name}
                  item={item}
                  locked={false}
                  index={i}
                  on={states[i]}
                  live={live[i]}
                  onToggle={() => setStates((prev) => prev.map((v, j) => (j === i ? !v : v)))}
                />
              ))}
            </ul>
            <p className="ap-remote">
              <LineIcon name="remote" size={18} tone="green" animate={false} />
              {t.devices.remote}
            </p>
          </Reveal>
        </div>

        <Reveal className="devices-total" delay={0.16}>
          <span>{t.devices.total}</span>
          <strong aria-live="polite">{fmt.watts(total)}</strong>
        </Reveal>

        <RevealGroup className="devices-extras" each={0.1}>
          {t.devices.extras.map((extra, i) => (
            <RevealItem key={extra.title} className="devices-extra">
              <Icon3D name={EXTRA_ICONS[i]} size={34} label={extra.title} />
              <div>
                <h4>{extra.title}</h4>
                <p>{extra.body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="devices-limit" as="p" delay={0.2}>
          {t.devices.limit}
        </Reveal>
      </div>
    </section>
  );
}
