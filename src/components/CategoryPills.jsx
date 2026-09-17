'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Shirt, Sparkles, Heart } from 'lucide-react';

export default function CategoryPills() {
  const categories = [
    {
      name: 'Boys Collection',
      href: '/shop?category=Boys',
      bg: '#D9E6DF',
      iconColor: '#537563',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>
        </svg>
      )
    },
    {
      name: 'Girls Collection',
      href: '/shop?category=Girls',
      bg: '#FBF0D5',
      iconColor: '#A88022',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m9 3 1.5 5H6l2 13h8l2-13h-4.5L15 3a3 3 0 0 0-6 0z"/>
        </svg>
      )
    },
    {
      name: 'Baby Collection',
      href: '/shop?category=Baby',
      bg: '#DDE8E2',
      iconColor: '#587A69',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 12h.01"/>
          <path d="M15 12h.01"/>
          <path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5"/>
          <path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2.4 0 4.6.9 6.3 2.5"/>
        </svg>
      )
    },
    {
      name: 'New Arrivals',
      href: '/shop?filter=new',
      bg: '#E2EEF5',
      iconColor: '#547E99',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      )
    }
  ];

  return (
    <section className="categories-section">
      <div className="container">
        <div className="categories-row">
          {categories.map((cat, index) => (
            <React.Fragment key={cat.name}>
              <Link href={cat.href} className="category-pill">
                <div
                  className="cat-icon-wrap"
                  style={{ backgroundColor: cat.bg, color: cat.iconColor }}
                >
                  {cat.icon}
                </div>
                <span className="cat-name">{cat.name}</span>
                <span className="cat-arrow">→</span>
              </Link>
              {index < categories.length - 1 && (
                <div className="cat-divider" aria-hidden="true" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <style jsx>{`
        .categories-section {
          padding: 12px 0 36px;
        }

        .categories-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(255, 255, 255, 0.45);
          border: 1px solid rgba(30, 58, 95, 0.06);
          border-radius: var(--radius-pill);
          padding: 8px 16px;
          backdrop-filter: blur(6px);
        }

        .category-pill {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 16px;
          border-radius: var(--radius-pill);
          transition: all var(--transition-fast);
          flex: 1;
          justify-content: center;
        }

        .category-pill:hover {
          background-color: var(--bg-card);
          transform: translateY(-1px);
        }

        .cat-icon-wrap {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: transform var(--transition-fast);
        }

        .category-pill:hover .cat-icon-wrap {
          transform: scale(1.08);
        }

        .cat-name {
          font-family: var(--font-heading);
          font-size: 14px;
          font-weight: 500;
          color: var(--text-primary);
          white-space: nowrap;
        }

        .cat-arrow {
          font-size: 15px;
          color: var(--text-secondary);
          transition: transform var(--transition-fast);
        }

        .category-pill:hover .cat-arrow {
          transform: translateX(3px);
          color: var(--text-primary);
        }

        .cat-divider {
          width: 1px;
          height: 24px;
          background-color: rgba(30, 58, 95, 0.1);
          margin: 0 4px;
        }

        @media (max-width: 860px) {
          .categories-row {
            overflow-x: auto;
            justify-content: flex-start;
            border-radius: var(--radius-md);
            padding: 8px;
            scrollbar-width: none;
          }

          .categories-row::-webkit-scrollbar {
            display: none;
          }

          .category-pill {
            flex-shrink: 0;
            padding: 8px 14px;
          }

          .cat-divider {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
