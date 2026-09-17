'use client';

import React from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductCard from '../../components/ProductCard';
import { useStore } from '../../context/StoreContext';
import { Heart, ArrowRight } from 'lucide-react';

export default function WishlistPage() {
  const { wishlist } = useStore();

  return (
    <div className="wishlist-page">
      <Header />

      <main className="container wishlist-container">
        <div className="wishlist-header">
          <h1 className="wishlist-title">My Wishlist</h1>
          <p className="wishlist-sub">
            {wishlist.length} {wishlist.length === 1 ? 'favorite style saved' : 'favorite styles saved'}
          </p>
        </div>

        {wishlist.length === 0 ? (
          <div className="empty-wishlist">
            <div className="empty-icon-wrap">
              <Heart size={44} color="#E09587" strokeWidth={1.5} />
            </div>
            <h2>Your wishlist is empty</h2>
            <p>Save your favorite little outfits by clicking the heart icon on any product.</p>
            <Link href="/shop" className="btn-primary" style={{ marginTop: '16px' }}>
              <span>Discover Collection</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        ) : (
          <div className="wishlist-grid">
            {wishlist.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <Footer />

      <style jsx>{`
        .wishlist-page {
          background-color: var(--bg-page);
          min-height: 100vh;
        }

        .wishlist-container {
          padding: 30px 24px 80px;
        }

        .wishlist-header {
          margin-bottom: 30px;
        }

        .wishlist-title {
          font-size: 34px;
          color: var(--text-primary);
        }

        .wishlist-sub {
          font-size: 14px;
          color: var(--text-secondary);
        }

        .empty-wishlist {
          text-align: center;
          padding: 80px 20px;
          background: #FFFFFF;
          border-radius: var(--radius-xl);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          max-width: 500px;
          margin: 0 auto;
        }

        .empty-icon-wrap {
          width: 76px;
          height: 76px;
          border-radius: 50%;
          background: var(--accent-coral-bg);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .wishlist-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        @media (max-width: 900px) {
          .wishlist-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
        }
      `}</style>
    </div>
  );
}
