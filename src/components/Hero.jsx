'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function Hero() {
  const { siteSettings } = useStore();

  return (
    <section className="hero-section">
      <div className="hero-overlay" aria-hidden="true" />
      
      {/* Background Organic Decorative Shapes - hidden for better background visibility or kept subtle */}
      <div className="corner-shape corner-shape-yellow" aria-hidden="true" />
      <div className="corner-shape corner-shape-blue" aria-hidden="true" />

      <div className="container hero-container">
        {/* Left Column: Typography & Action */}
        <div className="hero-content">
          <span className="hero-tagline">{siteSettings.heroTagline || 'KIDS CLOTHING'}</span>
          <h1 className="hero-heading">
            Little Styles<br />for Big Dreams
          </h1>
          <p className="hero-subtitle">
            {siteSettings.heroSubtitle || 'Comfortable. Playful. Everyday Wear.'}
          </p>

          <div className="hero-cta">
            <Link href="/shop" className="btn-primary hero-btn">
              <span>{siteSettings.heroButtonText || 'Shop Now'}</span>
              <ArrowRight size={16} strokeWidth={2.2} />
            </Link>
          </div>

          {/* Left Bottom Botanical Garden Illustration */}
          <div className="botanical-garden" aria-hidden="true">
            <svg viewBox="0 0 240 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="garden-svg">
              <circle cx="40" cy="45" r="30" fill="#8FA89B" fillOpacity="0.45" />
              <line x1="40" y1="45" x2="40" y2="95" stroke="#7A9386" strokeWidth="2" />
              <line x1="40" y1="65" x2="25" y2="52" stroke="#7A9386" strokeWidth="1.5" />
              <line x1="40" y1="72" x2="52" y2="60" stroke="#7A9386" strokeWidth="1.5" />
              <circle cx="95" cy="62" r="16" fill="#E2B755" fillOpacity="0.5" />
              <line x1="95" y1="62" x2="95" y2="95" stroke="#C69A38" strokeWidth="1.5" />
              <circle cx="68" cy="74" r="8" fill="#8FA89B" fillOpacity="0.6" />
              <line x1="68" y1="74" x2="68" y2="95" stroke="#7A9386" strokeWidth="1.2" />
              <path d="M140 95C140 75 148 65 152 50" stroke="#8FA89B" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="152" cy="48" r="5" fill="#E2B755" />
              <ellipse cx="145" cy="70" rx="6" ry="3" fill="#8FA89B" fillOpacity="0.4" transform="rotate(-30 145 70)" />
              <ellipse cx="151" cy="62" rx="6" ry="3" fill="#8FA89B" fillOpacity="0.4" transform="rotate(30 151 62)" />
            </svg>
          </div>
        </div>

        {/* Right Column: Kept for layout but removed the image */}
        <div className="hero-visual">
          <div className="bee-trail-container" aria-hidden="true">
            <svg viewBox="0 0 340 220" fill="none" className="trail-svg">
              <path
                d="M 10 180 C 80 140, 140 100, 200 60 C 240 35, 270 20, 295 15"
                stroke="#ffffff"
                strokeWidth="1.8"
                strokeDasharray="4 6"
                strokeLinecap="round"
                opacity="0.55"
              />
            </svg>
            <div className="bee-mascot floating-bee">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <ellipse cx="11" cy="9" rx="6" ry="8" fill="#FFFFFF" fillOpacity="0.85" stroke="#1E3A5F" strokeWidth="1.4" transform="rotate(-30 11 9)" />
                <ellipse cx="21" cy="9" rx="6" ry="8" fill="#FFFFFF" fillOpacity="0.85" stroke="#1E3A5F" strokeWidth="1.4" transform="rotate(30 21 9)" />
                <ellipse cx="16" cy="18" rx="8" ry="11" fill="#E2B755" stroke="#1E3A5F" strokeWidth="1.5" />
                <path d="M10 15H22" stroke="#1E3A5F" strokeWidth="2.2" strokeLinecap="round" />
                <path d="M9 19H23" stroke="#1E3A5F" strokeWidth="2.2" strokeLinecap="round" />
                <path d="M13 8C12 5 10 5 9 6" stroke="#1E3A5F" strokeWidth="1.4" strokeLinecap="round" />
                <path d="M19 8C20 5 22 5 23 6" stroke="#1E3A5F" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          <div className="botanical-right" aria-hidden="true">
            <svg width="40" height="90" viewBox="0 0 40 90" fill="none">
              <path d="M20 90V20" stroke="#8FA89B" strokeWidth="1.5" />
              <ellipse cx="14" cy="55" rx="7" ry="4" fill="#8FA89B" fillOpacity="0.45" transform="rotate(-25 14 55)" />
              <ellipse cx="26" cy="42" rx="7" ry="4" fill="#8FA89B" fillOpacity="0.45" transform="rotate(25 26 42)" />
              <circle cx="20" cy="18" r="5.5" fill="#E2B755" />
            </svg>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-section {
          position: relative;
          padding: 24px 0 32px;
          overflow: hidden;
          background-image: url('/images/hero-bg.jpg');
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.4);
          z-index: 1;
        }

        .corner-shape {
          position: absolute;
          pointer-events: none;
          z-index: 1;
        }

        .corner-shape-yellow {
          top: -30px;
          right: -40px;
          width: 220px;
          height: 220px;
          background-color: var(--accent-mustard);
          opacity: 0.35;
          border-radius: 48% 52% 60% 40% / 45% 55% 45% 55%;
        }

        .corner-shape-blue {
          top: -50px;
          right: 140px;
          width: 170px;
          height: 170px;
          background-color: var(--accent-blue);
          opacity: 0.28;
          border-radius: 60% 40% 50% 50% / 55% 45% 55% 45%;
        }

        .hero-container {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 1fr 1.08fr;
          align-items: center;
          gap: 40px;
          min-height: 440px;
        }

        .hero-content {
          position: relative;
          padding-top: 10px;
          z-index: 3;
        }

        .hero-tagline {
          display: inline-block;
          font-family: var(--font-heading);
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #f0f0f0;
          margin-bottom: 12px;
          text-shadow: 0 1px 2px rgba(0,0,0,0.5);
        }

        .hero-heading {
          font-size: 46px;
          line-height: 1.15;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 14px;
          letter-spacing: -0.02em;
          text-shadow: 0 2px 4px rgba(0,0,0,0.6);
        }

        .hero-subtitle {
          font-family: var(--font-body);
          font-size: 15px;
          color: #f8f8f8;
          margin-bottom: 26px;
          font-weight: 400;
          text-shadow: 0 1px 3px rgba(0,0,0,0.6);
        }

        .hero-cta {
          margin-bottom: 30px;
        }

        .hero-btn {
          padding: 13px 30px;
          font-size: 14.5px;
        }

        .botanical-garden {
          position: relative;
          width: 220px;
          height: 80px;
          margin-top: 10px;
        }

        .garden-svg {
          width: 100%;
          height: 100%;
        }

        .hero-visual {
          position: relative;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }

        .bee-trail-container {
          position: absolute;
          top: -25px;
          left: -80px;
          width: 320px;
          height: 180px;
          pointer-events: none;
          z-index: 4;
        }

        .trail-svg {
          width: 100%;
          height: 100%;
        }

        .bee-mascot {
          position: absolute;
          top: 0;
          right: 20px;
        }

        .botanical-right {
          position: absolute;
          right: -24px;
          bottom: 10px;
          pointer-events: none;
        }

        @media (max-width: 900px) {
          .hero-container {
            grid-template-columns: 1fr;
            gap: 28px;
            text-align: center;
          }

          .hero-heading {
            font-size: 36px;
          }

          .botanical-garden {
            margin: 0 auto;
          }

          .bee-trail-container {
            display: none;
          }

          .hero-visual {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .hero-heading {
            font-size: 30px;
          }
        }
      `}</style>
    </section>
  );
}
