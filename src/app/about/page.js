'use client';

import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { ArrowRight, Heart, Sparkles, Feather, ShieldCheck } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="about-page">
      <Header />

      <main className="container about-container">
        {/* Story Hero */}
        <div className="about-hero">
          <span className="about-tagline">OUR STORY</span>
          <h1 className="about-heading">little moments, beautifully made.</h1>
          <p className="about-lead">
            At Bee Junior, we believe childhood is a wondrous tapestry of playful everyday adventures,
            quiet cozy afternoon hugs, and little moments that stay in our hearts forever.
          </p>
        </div>

        {/* Visual Banner */}
        <div className="about-visual-banner">
          <img
            src="/images/girls-banner.jpg"
            alt="Bee Junior childhood moments"
            className="banner-img"
          />
        </div>

        {/* Values Grid */}
        <div className="values-section">
          <h2 className="values-title">What Makes Us Special</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon-box" style={{ background: '#D9E6DF', color: '#537563' }}>
                <Feather size={24} />
              </div>
              <h3>100% Organic & Gentle</h3>
              <p>Every fiber that touches your child's delicate skin is certified organic, toxin-free, and breathable.</p>
            </div>

            <div className="value-card">
              <div className="value-icon-box" style={{ background: '#FBF0D5', color: '#A88022' }}>
                <Sparkles size={24} />
              </div>
              <h3>Timeless Minimal Design</h3>
              <p>Soft earthy hues, relaxed silhouettes, and functional details like natural wooden buttons and deep pockets.</p>
            </div>

            <div className="value-card">
              <div className="value-icon-box" style={{ background: '#D8E5EB', color: '#4C7387' }}>
                <ShieldCheck size={24} />
              </div>
              <h3>Made for Everyday Play</h3>
              <p>Sturdy double-stitched seams designed to endure tree climbing, backyard mud pies, and countless gentle machine washes.</p>
            </div>
          </div>
        </div>

        <div className="about-cta">
          <h2>Ready to explore little styles?</h2>
          <Link href="/shop" className="btn-primary" style={{ marginTop: '16px' }}>
            <span>Shop The Collection</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        .about-page {
          background-color: var(--bg-page);
          min-height: 100vh;
        }

        .about-container {
          padding: 40px 24px 80px;
        }

        .about-hero {
          text-align: center;
          max-width: 700px;
          margin: 0 auto 40px;
        }

        .about-tagline {
          font-family: var(--font-heading);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.14em;
          color: var(--text-secondary);
          display: block;
          margin-bottom: 8px;
        }

        .about-heading {
          font-size: 42px;
          color: var(--text-primary);
          line-height: 1.15;
          margin-bottom: 16px;
        }

        .about-lead {
          font-size: 16px;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .about-visual-banner {
          border-radius: var(--radius-xl);
          overflow: hidden;
          margin-bottom: 60px;
          box-shadow: var(--shadow-card);
        }

        .banner-img {
          width: 100%;
          height: auto;
          max-height: 440px;
          object-fit: cover;
        }

        .values-section {
          margin-bottom: 60px;
        }

        .values-title {
          text-align: center;
          font-size: 28px;
          color: var(--text-primary);
          margin-bottom: 36px;
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }

        .value-card {
          background: #FFFFFF;
          border-radius: var(--radius-lg);
          padding: 32px 24px;
          text-align: center;
          box-shadow: var(--shadow-subtle);
        }

        .value-icon-box {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 18px;
        }

        .value-card h3 {
          font-size: 17px;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .value-card p {
          font-size: 13.5px;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .about-cta {
          text-align: center;
          padding: 40px;
          background: var(--bg-card);
          border-radius: var(--radius-xl);
        }

        @media (max-width: 768px) {
          .values-grid {
            grid-template-columns: 1fr;
          }
          .about-heading {
            font-size: 32px;
          }
        }
      `}</style>
    </div>
  );
}
