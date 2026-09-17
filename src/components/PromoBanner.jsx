'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function PromoBanner() {
  const { siteSettings } = useStore();

  return (
    <section className="promo-section">
      <div className="container">
        <div className="promo-card">
          {/* Left Decorative Botanical Branch */}
          <div className="botanical-left" aria-hidden="true">
            <svg width="65" height="75" viewBox="0 0 65 75" fill="none">
              <path d="M10 75C20 55 35 35 45 10" stroke="#8FA89B" strokeWidth="2" strokeLinecap="round" />
              <ellipse cx="22" cy="50" rx="9" ry="5" fill="#8FA89B" fillOpacity="0.55" transform="rotate(-35 22 50)" />
              <ellipse cx="38" cy="38" rx="9" ry="5" fill="#8FA89B" fillOpacity="0.55" transform="rotate(35 38 38)" />
              <ellipse cx="32" cy="22" rx="8" ry="4" fill="#8FA89B" fillOpacity="0.55" transform="rotate(-25 32 22)" />
              <circle cx="46" cy="10" r="5" fill="#8FA89B" fillOpacity="0.7" />
            </svg>
          </div>

          {/* Center/Left Content */}
          <div className="promo-content">
            <span className="promo-tagline">
              {siteSettings.promoBannerTitle || 'Summer Collection'}
            </span>
            <h2 className="promo-headline">
              {siteSettings.promoBannerDiscount || '10% Off'}
            </h2>
            <p className="promo-subtext">
              {siteSettings.promoBannerSubtitle || 'On Selected Styles'}
            </p>
          </div>

          {/* Right Action Button */}
          <div className="promo-action">
            <Link href="/shop?filter=sale" className="btn-primary promo-btn">
              <span>{siteSettings.promoBannerButton || 'Shop Now'}</span>
              <ArrowRight size={15} strokeWidth={2.2} />
            </Link>
          </div>

          {/* Bottom Wildflowers Accent */}
          <div className="botanical-bottom" aria-hidden="true">
            <svg width="100" height="35" viewBox="0 0 100 35" fill="none">
              <line x1="20" y1="35" x2="20" y2="10" stroke="#8FA89B" strokeWidth="1.2" />
              <circle cx="20" cy="8" r="4" fill="#E2B755" />
              <line x1="60" y1="35" x2="60" y2="15" stroke="#8FA89B" strokeWidth="1.2" />
              <circle cx="60" cy="14" r="3.5" fill="#E2B755" />
            </svg>
          </div>
        </div>
      </div>

      <style jsx>{`
        .promo-section {
          padding: 30px 0 50px;
        }

        .promo-card {
          position: relative;
          background: linear-gradient(135deg, #E2EFF6 0%, #D8EBF3 100%);
          border-radius: var(--radius-xl);
          padding: 36px 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          overflow: hidden;
          box-shadow: var(--shadow-subtle);
        }

        .botanical-left {
          position: absolute;
          left: 28px;
          bottom: 10px;
          pointer-events: none;
          opacity: 0.85;
        }

        .botanical-bottom {
          position: absolute;
          right: 280px;
          bottom: 0;
          pointer-events: none;
        }

        .promo-content {
          position: relative;
          z-index: 2;
          margin-left: 50px;
        }

        .promo-tagline {
          display: block;
          font-family: var(--font-heading);
          font-size: 13.5px;
          font-weight: 500;
          color: var(--text-secondary);
          margin-bottom: 4px;
        }

        .promo-headline {
          font-family: var(--font-heading);
          font-size: 34px;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.1;
          margin-bottom: 4px;
        }

        .promo-subtext {
          font-family: var(--font-body);
          font-size: 13px;
          color: var(--text-secondary);
        }

        .promo-action {
          position: relative;
          z-index: 2;
        }

        .promo-btn {
          padding: 12px 28px;
        }

        @media (max-width: 768px) {
          .promo-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
            padding: 28px 24px;
          }

          .promo-content {
            margin-left: 0;
          }

          .botanical-left {
            display: none;
          }

          .botanical-bottom {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
