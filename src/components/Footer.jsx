'use client';

import React from 'react';
import Link from 'next/link';
import { Instagram } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      {/* Botanical Wildflower on right edge */}
      <div className="footer-botanical" aria-hidden="true">
        <svg width="45" height="90" viewBox="0 0 45 90" fill="none">
          <path d="M22 90V15" stroke="#8FA89B" strokeWidth="1.5" strokeLinecap="round" />
          <ellipse cx="14" cy="50" rx="8" ry="4" fill="#8FA89B" fillOpacity="0.4" transform="rotate(-30 14 50)" />
          <ellipse cx="30" cy="38" rx="8" ry="4" fill="#8FA89B" fillOpacity="0.4" transform="rotate(30 30 38)" />
          <ellipse cx="16" cy="24" rx="7" ry="3.5" fill="#8FA89B" fillOpacity="0.4" transform="rotate(-20 16 24)" />
          <circle cx="22" cy="12" r="4.5" fill="#E2B755" />
        </svg>
      </div>

      <div className="container footer-container">
        {/* Main Footer Row */}
        <div className="footer-main">
          {/* Left: Text-based Logo */}
          <Link href="/" className="footer-logo">
            <span className="logo-bee">bee</span>
            <span className="logo-junior">JUNIOR</span>
          </Link>

          {/* Center Navigation */}
          <nav className="footer-nav">
            <Link href="/" className="footer-link">Home</Link>
            <Link href="/shop" className="footer-link">Shop</Link>
            <Link href="/about" className="footer-link">About</Link>
            <Link href="/contact" className="footer-link">Contact</Link>
          </nav>

          {/* Right: Instagram Follow Us */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social"
          >
            <Instagram size={17} strokeWidth={1.8} />
            <span>Follow us</span>
          </a>
        </div>

        {/* Bottom Copyright */}
        <div className="footer-bottom">
          <p className="copyright-text">
            © {currentYear} Bee Junior. All rights reserved.
          </p>
        </div>
      </div>

      {/* Layered Decorative Wave SVG Shapes at the base */}
      <div className="wave-container" aria-hidden="true">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="wave-svg"
        >
          {/* Back Wave: Powder Blue */}
          <path
            d="M0,60 C320,110 520,20 840,70 C1120,110 1320,30 1440,65 L1440,120 L0,120 Z"
            fill="#B9D7E8"
            fillOpacity="0.45"
          />
          {/* Front Wave: Soft Ocean Blue */}
          <path
            d="M0,85 C280,45 600,115 920,65 C1200,20 1360,90 1440,75 L1440,120 L0,120 Z"
            fill="#8EB5CE"
            fillOpacity="0.55"
          />
        </svg>
      </div>

      <style jsx>{`
        .site-footer {
          position: relative;
          padding-top: 40px;
          padding-bottom: 70px;
          overflow: hidden;
          background-color: var(--bg-page);
        }

        .footer-botanical {
          position: absolute;
          right: 32px;
          top: 10px;
          pointer-events: none;
        }

        .footer-container {
          position: relative;
          z-index: 3;
        }

        .footer-main {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 24px;
        }

        /* Logo */
        .footer-logo {
          display: flex;
          flex-direction: column;
          line-height: 0.95;
        }

        .logo-bee {
          font-family: var(--font-heading);
          font-size: 28px;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.03em;
        }

        .logo-junior {
          font-family: var(--font-heading);
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.28em;
          color: var(--text-primary);
          padding-left: 2px;
        }

        /* Nav */
        .footer-nav {
          display: flex;
          align-items: center;
          gap: 32px;
        }

        .footer-link {
          font-family: var(--font-body);
          font-size: 14px;
          color: var(--text-secondary);
          transition: color var(--transition-fast);
        }

        .footer-link:hover {
          color: var(--text-primary);
        }

        /* Social */
        .footer-social {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-heading);
          font-size: 13.5px;
          color: var(--text-primary);
          transition: color var(--transition-fast), transform var(--transition-fast);
        }

        .footer-social:hover {
          color: var(--accent-sage-dark);
          transform: translateY(-1px);
        }

        /* Bottom */
        .footer-bottom {
          text-align: center;
          padding-top: 14px;
        }

        .copyright-text {
          font-family: var(--font-body);
          font-size: 11.5px;
          color: var(--text-muted);
        }

        /* Wave Decoration */
        .wave-container {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 70px;
          pointer-events: none;
          z-index: 1;
        }

        .wave-svg {
          width: 100%;
          height: 100%;
        }

        @media (max-width: 768px) {
          .footer-main {
            flex-direction: column;
            gap: 20px;
            text-align: center;
          }

          .footer-logo {
            align-items: center;
          }

          .footer-nav {
            gap: 20px;
          }

          .footer-botanical {
            display: none;
          }
        }
      `}</style>
    </footer>
  );
}
