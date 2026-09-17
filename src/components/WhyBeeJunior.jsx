'use client';

import React from 'react';
import { Feather, ShieldCheck, Smile, Star } from 'lucide-react';

export default function WhyBeeJunior() {
  const features = [
    {
      title: 'Soft & Breathable',
      description: 'Gentle on delicate skin.',
      bg: '#D9E6DF',
      color: '#537563',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
        </svg>
      )
    },
    {
      title: 'Durable Quality',
      description: 'Made for everyday play.',
      bg: '#D8E5EB',
      color: '#4C7387',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
        </svg>
      )
    },
    {
      title: 'Comfortable Fit',
      description: 'Freedom to move.',
      bg: '#FBF0D5',
      color: '#A88022',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
          <line x1="9" y1="9" x2="9.01" y2="9"/>
          <line x1="15" y1="9" x2="15.01" y2="9"/>
        </svg>
      )
    },
    {
      title: 'Timeless Styles',
      description: 'Classic looks, always.',
      bg: '#F8E8C7',
      color: '#9C741E',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      )
    }
  ];

  return (
    <section className="why-us-section">
      <div className="container why-us-container">
        {/* Left: Child in Organic Blob / Arch Frame with Handwritten Script */}
        <div className="why-us-visual">
          <div className="organic-image-frame">
            <img
              src="/images/why-us-boy.jpg"
              alt="Toddler in comfortable organic clothing"
              className="toddler-photo"
              loading="lazy"
            />
          </div>

          {/* Handwritten Annotation with Dotted Line & Heart */}
          <div className="script-badge">
            <span className="script-text">
              Made<br />for little<br />moments
            </span>
            <span className="script-heart">♡</span>

            {/* Dotted curve leading to image */}
            <svg viewBox="0 0 60 70" fill="none" className="script-trail">
              <path
                d="M 50 10 C 30 35, 10 50, 0 65"
                stroke="#1E3A5F"
                strokeWidth="1.5"
                strokeDasharray="3 4"
                opacity="0.45"
              />
            </svg>
          </div>
        </div>

        {/* Right: Value Propositions */}
        <div className="why-us-content">
          <h2 className="why-us-heading">Why Bee Junior?</h2>

          <div className="features-grid">
            {features.map((feature) => (
              <div key={feature.title} className="feature-item">
                <div
                  className="feature-icon"
                  style={{ backgroundColor: feature.bg, color: feature.color }}
                >
                  {feature.icon}
                </div>
                <div className="feature-texts">
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-desc">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .why-us-section {
          padding: 50px 0 70px;
        }

        .why-us-container {
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          align-items: center;
          gap: 60px;
        }

        /* Left Visual */
        .why-us-visual {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .organic-image-frame {
          width: 320px;
          height: 320px;
          background-color: var(--bg-card);
          border-radius: 58% 42% 48% 52% / 46% 54% 46% 54%;
          overflow: hidden;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 30px rgba(30, 58, 95, 0.05);
        }

        .toddler-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Handwritten script note */
        .script-badge {
          position: absolute;
          right: 20px;
          top: 30px;
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 2;
        }

        .script-text {
          font-family: var(--font-script);
          font-size: 24px;
          line-height: 1.15;
          color: var(--text-primary);
          text-align: center;
          transform: rotate(-3deg);
        }

        .script-heart {
          font-size: 18px;
          color: var(--text-primary);
          margin-top: 2px;
        }

        .script-trail {
          width: 50px;
          height: 60px;
          margin-top: -10px;
        }

        /* Right Content */
        .why-us-content {
          padding-left: 10px;
        }

        .why-us-heading {
          font-size: 32px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 36px;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px 24px;
        }

        .feature-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }

        .feature-icon {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .feature-texts {
          display: flex;
          flex-direction: column;
        }

        .feature-title {
          font-family: var(--font-heading);
          font-size: 15px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 3px;
        }

        .feature-desc {
          font-family: var(--font-body);
          font-size: 13.5px;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        @media (max-width: 880px) {
          .why-us-container {
            grid-template-columns: 1fr;
            gap: 40px;
            text-align: center;
          }

          .why-us-content {
            padding-left: 0;
          }

          .features-grid {
            max-width: 500px;
            margin: 0 auto;
            text-align: left;
          }

          .script-badge {
            right: 10%;
          }
        }

        @media (max-width: 540px) {
          .organic-image-frame {
            width: 260px;
            height: 260px;
          }

          .features-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .script-badge {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
