'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { useStore } from '../context/StoreContext';

export default function BestSellers() {
  const { products } = useStore();

  // Pick top 4 products matching reference
  const bestSellers = products.slice(0, 4);

  return (
    <section className="best-sellers-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="header-titles">
            <span className="section-tagline">FEATURED COLLECTION</span>
            <h2 className="section-title">Our Best Sellers</h2>
            <p className="section-subtitle">Loved by kids. Chosen by parents.</p>
          </div>

          <Link href="/shop" className="view-all-link">
            <span>View All</span>
            <ArrowRight size={15} strokeWidth={2} />
          </Link>
        </div>

        {/* 4-Column Product Grid */}
        <div className="products-grid">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .best-sellers-section {
          padding: 40px 0 60px;
        }

        .section-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 28px;
        }

        .header-titles {
          display: flex;
          flex-direction: column;
        }

        .view-all-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-heading);
          font-size: 13.5px;
          font-weight: 500;
          color: var(--text-primary);
          transition: transform var(--transition-fast), color var(--transition-fast);
          padding-bottom: 4px;
        }

        .view-all-link:hover {
          color: var(--accent-sage-dark);
          transform: translateX(3px);
        }

        /* 4 Columns Desktop Grid */
        .products-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 22px;
        }

        @media (max-width: 960px) {
          .products-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 18px;
          }
        }

        @media (max-width: 480px) {
          .section-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          .products-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 14px;
          }
        }
      `}</style>
    </section>
  );
}
