import React from 'react';
import { useLanguage } from '../i18n/LanguageContext.jsx';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="hero" id="hero">
      <div className="hero-bg"></div>
      <div className="wrap hero-inner">
        <div className="hero-text">
          <h1 className="hero-headline">
            {t.hero.titleLine1}<br />
            {t.hero.titlePrefix}<span className="accent">{t.hero.titleAccent}</span>
          </h1>
          <p className="hero-desc">
            {t.hero.desc}
          </p>
          <div className="hero-ctas">
            <a href="#solution" className="btn btn-primary">
              {t.hero.ctaPrimary} <span className="btn-arrow">→</span>
            </a>
            <a href="#how" className="btn btn-hero-secondary">
              <span className="play-btn-circle">
                <svg width="10" height="10" viewBox="0 0 12 12" fill="currentColor">
                  <polygon points="3 1 11 6 3 11" />
                </svg>
              </span>{' '}
              {t.hero.ctaSecondary}
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="phone-mockup-wrap">
            <img src="/phoneMockup.webp" alt="Application TAQA sur smartphone" className="phone-mockup-img" width="380" />
          </div>

          <div className="metric-card metric-1">
            <div className="metric-icon-box metric-icon-green">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />
              </svg>
            </div>
            <div className="metric-info">
              <span className="metric-value">4.8 kWh</span>
              <span className="metric-label">{t.hero.metricToday}</span>
            </div>
          </div>

          <div className="metric-card metric-2">
            <div className="metric-icon-box metric-icon-green">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 4v16m-6-6l6 6 6-6" />
              </svg>
            </div>
            <div className="metric-info">
              <span className="metric-value">12%</span>
              <span className="metric-label">{t.hero.metricWeek}</span>
            </div>
          </div>

          <div className="metric-card metric-3">
            <div className="metric-icon-box metric-icon-gold">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 5H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z" />
                <path d="M16 12h2" />
              </svg>
            </div>
            <div className="metric-info">
              <span className="metric-value">1,240 DZD</span>
              <span className="metric-label">{t.hero.metricEstimated}</span>
            </div>
          </div>
        </div>

        <div className="hero-benefits">
          <div className="hero-benefit">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />
            </svg>
            {t.hero.benefit1}
          </div>
          <div className="hero-benefit">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 20A7 7 0 0 1 4 13a7 7 0 0 1 11-5.74V7a4 4 0 0 1 4 4v1a7 7 0 0 1-8 8Z" />
              <path d="M11 20v-6" />
            </svg>
            {t.hero.benefit2}
          </div>
          <div className="hero-benefit">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 20h10" />
              <path d="M10 20c0-4 1-7 4-9 0-3-2.5-5-5-5a5 5 0 0 0-5 5c3 2 4 5 4 9Z" />
              <path d="M14 11c2-1 4-1 5 1" />
            </svg>
            {t.hero.benefit3}
          </div>
        </div>
      </div>
    </section>
  );
}
