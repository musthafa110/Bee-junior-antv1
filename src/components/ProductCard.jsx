'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Heart } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function ProductCard({ product }) {
  const { addToCart, setQuickViewProduct, toggleWishlist, isInWishlist } = useStore();
  const isWishlisted = isInWishlist(product.id);

  return (
    <div className="product-card">
      {/* Product Image Container */}
      <div className="image-container" onClick={() => setQuickViewProduct(product)}>
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
          loading="lazy"
        />

        {/* Subtle Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={16} fill={isWishlisted ? '#E09587' : 'none'} color={isWishlisted ? '#E09587' : '#1E3A5F'} />
        </button>

        {/* Quick View Trigger on Hover */}
        <div className="quick-view-badge">Quick View</div>
      </div>

      {/* Product Information */}
      <div className="product-info">
        <div className="product-details">
          <h3 className="product-title" onClick={() => setQuickViewProduct(product)}>
            {product.name}
          </h3>
          <p className="product-price">₹ {product.price}</p>
        </div>

        {/* Circular Arrow Button (Opens Quick View / Add to Cart) */}
        <button
          onClick={() => setQuickViewProduct(product)}
          className="btn-circle-arrow"
          aria-label={`View details for ${product.name}`}
        >
          <ArrowRight size={15} strokeWidth={2.2} />
        </button>
      </div>

      <style jsx>{`
        .product-card {
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: transform var(--transition-fast);
        }

        .product-card:hover {
          transform: translateY(-3px);
        }

        /* Image Container: Soft cream/off-white background matching reference */
        .image-container {
          position: relative;
          background-color: var(--bg-card);
          border-radius: var(--radius-md);
          overflow: hidden;
          aspect-ratio: 1 / 1.15;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          cursor: pointer;
          transition: background-color var(--transition-fast);
        }

        .product-card:hover .image-container {
          background-color: var(--bg-card-hover);
        }

        .product-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: transform var(--transition-normal);
        }

        .product-card:hover .product-image {
          transform: scale(1.03);
        }

        /* Wishlist button */
        .wishlist-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.85;
          transition: all var(--transition-fast);
          z-index: 2;
        }

        .wishlist-btn:hover {
          opacity: 1;
          transform: scale(1.1);
          background: #FFFFFF;
        }

        .wishlist-btn.active {
          opacity: 1;
          background: #FFFFFF;
        }

        /* Quick View Badge */
        .quick-view-badge {
          position: absolute;
          bottom: 12px;
          left: 50%;
          transform: translateX(-50%) translateY(10px);
          background: rgba(30, 58, 95, 0.9);
          color: #FFFFFF;
          font-family: var(--font-heading);
          font-size: 11.5px;
          font-weight: 500;
          padding: 5px 14px;
          border-radius: var(--radius-pill);
          opacity: 0;
          pointer-events: none;
          transition: all var(--transition-fast);
        }

        .product-card:hover .quick-view-badge {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }

        /* Product Details Row */
        .product-info {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 8px;
          padding: 0 4px;
        }

        .product-title {
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
          line-height: 1.3;
          margin-bottom: 4px;
          cursor: pointer;
        }

        .product-title:hover {
          color: var(--accent-sage-dark);
        }

        .product-price {
          font-family: var(--font-heading);
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
        }
      `}</style>
    </div>
  );
}
