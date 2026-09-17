import React, { useState } from 'react';
import {
  AlertTriangle,
  TrendingUp,
  Lightbulb,
  Shield,
  Refrigerator,
  Zap,
  Check,
  Sun,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext.jsx';

export default function SmartControl() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('essentiels');
  const [devices, setDevices] = useState({
    fridge: true,
    lights: true,
    security: true,
    essentialEquip: true,
    ac: false,
    waterHeater: true,
  });

  const toggleDevice = (key) => {
    setDevices((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const essentialDevices = [
    {
      key: 'fridge',
      name: t.smart.deviceFridge,
      icon: <Refrigerator size={17} strokeWidth={2} />,
    },
    {
      key: 'lights',
      name: t.smart.deviceLights,
      icon: <Lightbulb size={17} strokeWidth={2} />,
    },
    {
      key: 'security',
      name: t.smart.deviceSecurity,
      icon: <Shield size={17} strokeWidth={2} />,
    },
    {
      key: 'essentialEquip',
      name: t.smart.deviceEssentialEquip,
      icon: <Zap size={17} strokeWidth={2} />,
    },
  ];

  const secondaryDevices = [
    {
      key: 'ac',
      name: t.smart.deviceAc,
      icon: <Zap size={17} strokeWidth={2} />,
    },
    {
      key: 'waterHeater',
      name: t.smart.deviceWaterHeater,
      icon: <Zap size={17} strokeWidth={2} />,
    },
  ];

  const currentDeviceList =
    activeTab === 'essentiels' ? essentialDevices : secondaryDevices;

  const algeriaPoints = t.algeriaCard.points;

  return (
    <section className="smart-wrap" id="smart">
      {/* ROW 1: 100% EDGE-TO-EDGE FULL-BLEED BANNER */}
      <div className="smart-banner-edge-to-edge reveal">
        {/* Main Dark Control Banner (Flush on left) */}
        <div className="smart-main-card">
          {/* Kitchen & Appliances Image */}
          <div className="smart-photo-col">
            <img
              src="/smart-kitchen.webp"
              alt="Maison connectée cuisine intelligente"
              className="smart-kitchen-img"
              loading="lazy"
            />
          </div>

          {/* Middle text description */}
          <div className="smart-content-col">
            <div className="eyebrow smart-eyebrow">{t.smart.eyebrow}</div>
            <h2>
              {t.smart.titleLine1}<br />
              {t.smart.titleLine2}
            </h2>
            <p>
              {t.smart.desc}
            </p>
          </div>

          {/* Right inside dark banner: Interactive device control card */}
          <div className="smart-panel-col">
            <div className="smart-control-card">
              {/* Tabs */}
              <div className="scc-tabs-container">
                <button
                  type="button"
                  className={`scc-tab-pill ${activeTab === 'essentiels' ? 'active' : ''}`}
                  onClick={() => setActiveTab('essentiels')}
                >
                  {t.smart.tabEssential}
                </button>
                <button
                  type="button"
                  className={`scc-tab-pill ${activeTab === 'secondaires' ? 'active' : ''}`}
                  onClick={() => setActiveTab('secondaires')}
                >
                  {t.smart.tabSecondary}
                </button>
              </div>

              {/* Device rows */}
              <div className="scc-devices-list">
                {currentDeviceList.map((device) => (
                  <div key={device.key} className="scc-device-row">
                    <div className="scc-device-left">
                      <span className="scc-device-icon">{device.icon}</span>
                      <span className="scc-device-name">{device.name}</span>
                    </div>
                    <button
                      type="button"
                      className={`scc-toggle-btn ${devices[device.key] ? 'active' : ''}`}
                      onClick={() => toggleDevice(device.key)}
                      aria-label={`${device.name}`}
                    >
                      <span className="scc-toggle-knob" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right side Solar Card (Flush on right) */}
        <div className="solar-side-card">
          <div className="solar-decor-watermark"></div>
          <div className="solar-icon-box">
            <Sun size={28} className="solar-sun-icon" />
          </div>
          <h3>{t.smart.solarTitle}</h3>
          <p>
            {t.smart.solarDesc}
          </p>
        </div>
      </div>

      {/* ROW 2: AI SECTION & PENSÉ POUR L'ALGÉRIE */}
      <div className="smart-bottom-grid reveal-scale" data-delay="0.1s">
          {/* Left: AI Intro */}
          <div className="ai-intro-col">
            <div className="eyebrow on-light">{t.ai.eyebrow}</div>
            <h2>{t.ai.title}</h2>
            <p>
              {t.ai.desc}
            </p>
          </div>

          {/* Middle: 3 AI Feature Cards */}
          <div className="ai-cards-trio">
            {/* Card 1: Détection */}
            <div className="ai-feature-box ai-card-danger">
              <div className="ai-feature-icon-wrap">
                <AlertTriangle size={24} strokeWidth={2.2} />
              </div>
              <h4>{t.ai.card1Title}</h4>
              <p>{t.ai.card1Desc}</p>
            </div>

            {/* Card 2: Prédiction */}
            <div className="ai-feature-box ai-card-trend">
              <div className="ai-feature-icon-wrap">
                <TrendingUp size={24} strokeWidth={2.2} />
              </div>
              <h4>{t.ai.card2Title}</h4>
              <p>{t.ai.card2Desc}</p>
            </div>

            {/* Card 3: Recommandation */}
            <div className="ai-feature-box ai-card-tip">
              <div className="ai-feature-icon-wrap">
                <Lightbulb size={24} strokeWidth={2.2} />
              </div>
              <h4>{t.ai.card3Title}</h4>
              <p>{t.ai.card3Desc}</p>
            </div>
          </div>

          {/* Right: Pensé pour l'Algérie Card */}
          <div className="algeria-highlight-card">
            <div className="algeria-watermark-pattern"></div>
            <div className="algeria-card-header">
              <h3>{t.algeriaCard.title}</h3>
              <div className="algeria-flag-badge">
                <svg viewBox="0 0 36 36" width="34" height="34">
                  <clipPath id="circleClip">
                    <circle cx="18" cy="18" r="18" />
                  </clipPath>
                  <g clipPath="url(#circleClip)">
                    <rect width="18" height="36" fill="#006633" />
                    <rect x="18" width="18" height="36" fill="#FFFFFF" />
                    <circle cx="18" cy="18" r="9" fill="#D21034" />
                    <circle cx="20.5" cy="18" r="7.2" fill="#FFFFFF" />
                    <polygon
                      points="21,14.2 22.2,17.2 25.5,17.2 22.8,19.2 23.8,22.2 21,20.4 18.2,22.2 19.2,19.2 16.5,17.2 19.8,17.2"
                      fill="#D21034"
                    />
                  </g>
                </svg>
              </div>
            </div>

            <ul className="algeria-card-list">
              {algeriaPoints.map((text, i) => (
                <li key={i}>
                  <div className="algeria-check-icon">
                    <Check size={11} strokeWidth={3.5} />
                  </div>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
      </div>
    </section>
  );
}
