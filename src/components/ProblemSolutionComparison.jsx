import React, { useState } from 'react';
import {
  Eye,
  ShieldCheck,
  Leaf,
  HelpCircle,
  Bell,
  Home,
  Power,
  FileText,
  Zap,
  ArrowRight,
  ChevronRight,
  Layers,
  Lightbulb,
  Scan,
  CreditCard,
  Megaphone,
  History,
  Grid,
  Plus,
  Receipt,
  TrendingUp,
  Cloud
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext.jsx';

export default function ProblemSolutionComparison() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('home');

  return (
    <section className="ps-comparison-section" id="solution">
      {/* Background soft ambient accents */}
      <div className="ps-ambient-glow left-glow"></div>
      <div className="ps-ambient-glow right-glow"></div>

      <div className="wrap ps-container">
        {/* TOP HEADER */}
        <div className="ps-top-header reveal">
          <div className="ps-header-left">
            <span className="ps-pill-tag">{t.ps.tag}</span>
            <h2 className="ps-main-title">
              {t.ps.titleLine1}<br />{t.ps.titleLine2}
            </h2>
            <p className="ps-main-subtitle">
              {t.ps.subtitleLine1}<br className="hide-mobile" />
              {t.ps.subtitleLine2}
            </p>
          </div>

          <div className="ps-header-right">
            <div className="ps-pillar-item">
              <div className="ps-pillar-icon">
                <Eye size={24} strokeWidth={1.8} />
              </div>
              <div className="ps-pillar-text">
                <span className="ps-pillar-title">{t.ps.pillar1Title}</span>
                <span className="ps-pillar-desc">{t.ps.pillar1Desc}</span>
              </div>
            </div>

            <div className="ps-pillar-divider"></div>

            <div className="ps-pillar-item">
              <div className="ps-pillar-icon">
                <ShieldCheck size={24} strokeWidth={1.8} />
              </div>
              <div className="ps-pillar-text">
                <span className="ps-pillar-title">{t.ps.pillar2Title}</span>
                <span className="ps-pillar-desc">{t.ps.pillar2Desc}</span>
              </div>
            </div>

            <div className="ps-pillar-divider"></div>

            <div className="ps-pillar-item">
              <div className="ps-pillar-icon">
                <Leaf size={24} strokeWidth={1.8} />
              </div>
              <div className="ps-pillar-text">
                <span className="ps-pillar-title">{t.ps.pillar3Title}</span>
                <span className="ps-pillar-desc">{t.ps.pillar3Desc}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3-COLUMN MAIN COMPARISON GRID */}
        <div className="ps-main-grid" id="problem">
          {/* LEFT COLUMN - SANS TAQA CONTRÔLE */}
          <div className="ps-column ps-problem-col reveal-left" data-delay="0s">
            <div className="ps-col-header">
              <span className="ps-badge-pill problem-pill">{t.ps.problemBadge}</span>
              <h3 className="ps-col-title">{t.ps.problemColTitle}</h3>
            </div>

            <div className="ps-cards-stack">
              {/* Problem 0: Pic de consommation */}
              <div className="ps-card ps-problem-card">
                <div className="ps-card-left-info">
                  <div className="ps-icon-circle ps-problem-icon">
                    <TrendingUp size={20} />
                  </div>
                  <div className="ps-card-text">
                    <h4>{t.ps.peakProblemTitle}</h4>
                    <p>{t.ps.peakProblemDesc}</p>
                  </div>
                </div>
                <div className="ps-card-preview-widget">
                  <img
                    src="/histogram-icon.svg"
                    alt="Pic de consommation"
                    className="ps-invoice-img-preview"
                    width="320"
                    height="220"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Problem 1: Pas de visibilité */}
              <div className="ps-card ps-problem-card">
                <div className="ps-card-left-info">
                  <div className="ps-icon-circle ps-problem-icon">
                    <HelpCircle size={20} />
                  </div>
                  <div className="ps-card-text">
                    <h4>{t.ps.problem1Title}</h4>
                    <p>{t.ps.problem1Desc}</p>
                  </div>
                </div>
                <div className="ps-card-preview-widget">
                  <img
                    src="/invoice-icon.svg"
                    alt="Facture d’électricité"
                    className="ps-invoice-img-preview"
                    width="200"
                    height="165"
                    loading="lazy"
                  />
                </div>
              </div>

             

              {/* Problem 3: Des réactions tardives */}
              <div className="ps-card ps-problem-card">
                <div className="ps-card-left-info">
                  <div className="ps-icon-circle ps-problem-icon">
                    <Bell size={20} />
                  </div>
                  <div className="ps-card-text">
                    <h4>{t.ps.problem3Title}</h4>
                    <p>{t.ps.problem3Desc}</p>
                  </div>
                </div>
                <div className="ps-card-preview-widget">
                  <img
                    src="/anomaly-icon.svg"
                    alt="Anomalie détectée"
                    className="ps-invoice-img-preview"
                    width="200"
                    height="150"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Problem 4: Aucun contrôle à distance */}
              <div className="ps-card ps-problem-card">
                <div className="ps-card-left-info">
                  <div className="ps-icon-circle ps-problem-icon">
                    <Home size={20} />
                  </div>
                  <div className="ps-card-text">
                    <h4>{t.ps.problem4Title}</h4>
                    <p>{t.ps.problem4Desc}</p>
                  </div>
                </div>
                <div className="ps-card-preview-widget">
                  <img
                    src="/no-remote-control-icon.svg"
                    alt="Aucun contrôle à distance"
                    className="ps-switch-img-preview"
                    width="200"
                    height="165"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Problem 5: Émissions de CO2 */}
              <div className="ps-card ps-problem-card">
                <div className="ps-card-left-info">
                  <div className="ps-icon-circle ps-problem-icon">
                    <Cloud size={20} />
                  </div>
                  <div className="ps-card-text">
                    <h4>{t.ps.co2ProblemTitle}</h4>
                    <p>{t.ps.co2ProblemDesc}</p>
                  </div>
                </div>
                <div className="ps-card-preview-widget">
                  <img
                    src="/co2-emissions-icon.svg"
                    alt="Empreinte non maîtrisée"
                    className="ps-invoice-img-preview"
                    width="200"
                    height="150"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* CENTER COLUMN - THE PHONE MOCKUP (EXACT MATCH TO REFERENCE PHOTO) */}
          <div className="ps-column ps-center-col reveal-scale" data-delay="0.35s">
            {/* SVG Connecting Curves */}
            <svg className="ps-flow-line-left" viewBox="0 0 100 40" fill="none" preserveAspectRatio="none">
              <path d="M 4,20 Q 50,13 94,20" stroke="#69E6B0" strokeWidth="1.75" opacity="0.75" strokeLinecap="round" />
              <path d="M 87,14 L 99,20 L 87,26" stroke="#69E6B0" strokeWidth="1.75" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            <svg className="ps-flow-line-right" viewBox="0 0 100 40" fill="none" preserveAspectRatio="none">
              <path d="M 1,20 Q 50,27 91,20" stroke="#69E6B0" strokeWidth="1.75" opacity="0.75" strokeLinecap="round" />
              <path d="M 87,14 L 99,20 L 87,26" stroke="#69E6B0" strokeWidth="1.75" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            <div className="ps-phone-wrapper">
              <div className="ps-phone-halo"></div>
              <div className="ps-phone-img-container">
                <img
                  src="/phone-yaniss.webp"
                  alt="Application TAQA Contrôle"
                  className="ps-phone-mockup-img"
                  onError={(e) => {
                    e.currentTarget.src = '/ChatGPT%20Image%20Sep%2014,%202026,%2008_27_53%20PM.webp';
                  }}
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - AVEC TAQA CONTRÔLE */}
          <div className="ps-column ps-solution-col reveal-right" data-delay="0.7s">
            <div className="ps-col-header">
              <span className="ps-badge-pill solution-pill">{t.ps.solutionBadge}</span>
              <h3 className="ps-col-title">{t.ps.solutionColTitle}</h3>
            </div>

            <div className="ps-cards-stack">
              {/* Solution 0: Recommandations intelligentes */}
              <div className="ps-card ps-solution-card">
                <div className="ps-card-left-info">
                  <div className="ps-icon-circle ps-solution-icon">
                    <Lightbulb size={20} />
                  </div>
                  <div className="ps-card-text">
                    <h4>{t.ps.peakSolutionTitle}</h4>
                    <p>{t.ps.peakSolutionDesc}</p>
                  </div>
                </div>
                <div className="ps-card-preview-widget">
                  <img
                    src="/peak-optimization-chart.svg"
                    alt="Astuce du jour"
                    className="ps-invoice-img-preview"
                    width="680"
                    height="342"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Solution 1: Suivez en temps réel */}
              <div className="ps-card ps-solution-card">
                <div className="ps-card-left-info">
                  <div className="ps-icon-circle ps-solution-icon">
                    <Eye size={20} />
                  </div>
                  <div className="ps-card-text">
                    <h4>{t.ps.sol1Title}</h4>
                    <p>{t.ps.sol1Desc}</p>
                  </div>
                </div>
                <div className="ps-card-preview-widget">
                  <img
                    src="/realtime-tracking-icon.svg"
                    alt="Consommation en temps réel"
                    className="ps-invoice-img-preview"
                    width="580"
                    height="367"
                    loading="lazy"
                  />
                </div>
              </div>

             

              {/* Solution 3: Soyez alerté */}
              <div className="ps-card ps-solution-card">
                <div className="ps-card-left-info">
                  <div className="ps-icon-circle ps-solution-icon">
                    <Bell size={20} />
                  </div>
                  <div className="ps-card-text">
                    <h4>{t.ps.sol3Title}</h4>
                    <p>{t.ps.sol3Desc}</p>
                  </div>
                </div>
                <div className="ps-card-preview-widget">
                  <img
                    src="/budget-alert-icon.svg"
                    alt="Alerte budget"
                    className="ps-invoice-img-preview"
                    width="200"
                    height="145"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Solution 4: Gardez le contrôle */}
              <div className="ps-card ps-solution-card">
                <div className="ps-card-left-info">
                  <div className="ps-icon-circle ps-solution-icon">
                    <Power size={20} />
                  </div>
                  <div className="ps-card-text">
                    <h4>{t.ps.sol4Title}</h4>
                    <p>{t.ps.sol4Desc}</p>
                  </div>
                </div>
                <div className="ps-card-preview-widget">
                  <img
                    src="/smart-switch-icon.svg"
                    alt="Éclairage salon"
                    className="ps-switch-img-preview"
                    width="200"
                    height="150"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Solution 5: Empreinte carbone */}
              <div className="ps-card ps-solution-card">
                <div className="ps-card-left-info">
                  <div className="ps-icon-circle ps-solution-icon">
                    <Leaf size={20} />
                  </div>
                  <div className="ps-card-text">
                    <h4>{t.ps.co2SolutionTitle}</h4>
                    <p>{t.ps.co2SolutionDesc}</p>
                  </div>
                </div>
                <div className="ps-card-preview-widget">
                  <img
                    src="/co2-cloud-icon.svg"
                    alt="Empreinte carbone"
                    className="ps-invoice-img-preview"
                    width="200"
                    height="150"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM PANORAMIC BANNER */}
        <div className="ps-bottom-banner reveal">
          <div className="ps-banner-bg-img"></div>
          <div className="ps-banner-overlay"></div>
          <div className="ps-banner-content">
            <div className="ps-banner-tag">{t.ps.bannerTag}</div>
            <a href="#smart" className="ps-banner-link">
              <span>{t.ps.bannerLink}</span>
              <ArrowRight size={18} className="ps-banner-arrow" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
