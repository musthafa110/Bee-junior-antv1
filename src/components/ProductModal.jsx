'use client';

import React, { useState } from 'react';
import { X, Heart, ShoppingBag, Check, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function ProductModal() {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist
  } = useStore();

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isWishlisted = isInWishlist(product.id);
  const currentSize = selectedSize || product.sizes?.[0] || '2-3Y';
  const currentColor = selectedColor || product.colors?.[0]?.name || 'Natural';
  const galleryImages = product.images || [product.image];

  const handleAddToCart = () => {
    addToCart(product, currentSize, currentColor, quantity);
    setQuickViewProduct(null);
  };

  return (
    <div className="modal-overlay" onClick={() => setQuickViewProduct(null)}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="modal-close-btn"
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        <div className="modal-body">
          {/* Left: Image Gallery */}
          <div className="gallery-column">
            <div className="main-image-container">
              <img
                src={galleryImages[activeImageIndex] || product.image}
                alt={product.name}
                className="main-preview-image"
              />
            </div>

            {/* Thumbnail dots/selectors */}
            {galleryImages.length > 1 && (
              <div className="thumbnails-row">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`thumb-btn ${activeImageIndex === idx ? 'active' : ''}`}
                  >
                    <img src={img} alt="" className="thumb-img" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details & Purchase Form */}
          <div className="details-column">
            <div className="category-tag">{product.category} • {product.subCategory || 'Kids'}</div>
            <h2 className="product-title">{product.name}</h2>

            <div className="price-rating-row">
              <div className="price-wrap">
                <span className="current-price">₹ {product.price}</span>
                {product.mrp > product.price && (
                  <span className="mrp-price">₹ {product.mrp}</span>
                )}
                {product.mrp > product.price && (
                  <span className="discount-badge">
                    {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
                  </span>
                )}
              </div>
              <div className="stock-status">
                <span className="stock-dot" />
                <span>In Stock ({product.stock} available)</span>
              </div>
            </div>

            <p className="product-description">{product.description}</p>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="option-section">
                <label className="option-label">
                  Color: <strong>{currentColor}</strong>
                </label>
                <div className="colors-row">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`color-swatch ${currentColor === c.name ? 'selected' : ''}`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {currentColor === c.name && <Check size={12} color="#1E3A5F" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="option-section">
                <div className="size-label-row">
                  <label className="option-label">
                    Size: <strong>{currentSize}</strong>
                  </label>
                  <span className="size-guide-hint">1-5 Years True to Size</span>
                </div>
                <div className="sizes-grid">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`size-pill ${currentSize === sz ? 'selected' : ''}`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Actions */}
            <div className="actions-section">
              <div className="quantity-selector">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="qty-step-btn"
                >
                  -
                </button>
                <span className="qty-value">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="qty-step-btn"
                >
                  +
                </button>
              </div>

              <button onClick={handleAddToCart} className="btn-primary add-bag-btn">
                <ShoppingBag size={17} strokeWidth={2} />
                <span>Add to Bag • ₹ {product.price * quantity}</span>
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                className={`wishlist-toggle ${isWishlisted ? 'active' : ''}`}
                aria-label="Wishlist"
              >
                <Heart size={18} fill={isWishlisted ? '#E09587' : 'none'} color={isWishlisted ? '#E09587' : '#1E3A5F'} />
              </button>
            </div>

            {/* Value Guarantees */}
            <div className="trust-points">
              <div className="trust-point">
                <Truck size={15} color="#537563" />
                <span>Free delivery on orders over ₹999</span>
              </div>
              <div className="trust-point">
                <RefreshCw size={15} color="#537563" />
                <span>Hassle-free 7 days exchange</span>
              </div>
              <div className="trust-point">
                <ShieldCheck size={15} color="#537563" />
                <span>100% Skin-safe organic materials</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(30, 58, 95, 0.4);
          backdrop-filter: blur(5px);
          z-index: 1050;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: fadeIn 0.2s ease-out;
        }

        .modal-card {
          position: relative;
          background-color: var(--bg-page);
          width: 100%;
          max-width: 820px;
          max-height: 90vh;
          overflow-y: auto;
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-card);
          padding: 36px;
          animation: scaleIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .modal-close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(30, 58, 95, 0.06);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
          transition: all var(--transition-fast);
          z-index: 5;
        }

        .modal-close-btn:hover {
          background: var(--text-primary);
          color: #FFFFFF;
        }

        .modal-body {
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          gap: 36px;
        }

        /* Gallery */
        .gallery-column {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .main-image-container {
          background-color: var(--bg-card);
          border-radius: var(--radius-lg);
          aspect-ratio: 1 / 1.15;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          overflow: hidden;
        }

        .main-preview-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .thumbnails-row {
          display: flex;
          gap: 10px;
          overflow-x: auto;
        }

        .thumb-btn {
          width: 60px;
          height: 60px;
          border-radius: var(--radius-sm);
          background-color: var(--bg-card);
          border: 1.5px solid transparent;
          overflow: hidden;
          padding: 4px;
          transition: border-color var(--transition-fast);
        }

        .thumb-btn.active {
          border-color: var(--text-primary);
        }

        .thumb-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        /* Details */
        .details-column {
          display: flex;
          flex-direction: column;
        }

        .category-tag {
          font-family: var(--font-heading);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-secondary);
          margin-bottom: 6px;
        }

        .product-title {
          font-size: 26px;
          color: var(--text-primary);
          line-height: 1.2;
          margin-bottom: 12px;
        }

        .price-rating-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
          padding-bottom: 14px;
          border-bottom: 1px solid rgba(30, 58, 95, 0.08);
        }

        .price-wrap {
          display: flex;
          align-items: baseline;
          gap: 10px;
        }

        .current-price {
          font-family: var(--font-heading);
          font-size: 22px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .mrp-price {
          font-size: 14px;
          color: var(--text-muted);
          text-decoration: line-through;
        }

        .discount-badge {
          font-size: 11px;
          font-weight: 700;
          color: var(--accent-sage-dark);
          background: var(--accent-sage-bg);
          padding: 2px 8px;
          border-radius: var(--radius-pill);
        }

        .stock-status {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #385E49;
          font-weight: 500;
        }

        .stock-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: #537563;
        }

        .product-description {
          font-size: 13.5px;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 20px;
        }

        /* Options */
        .option-section {
          margin-bottom: 18px;
        }

        .size-label-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 8px;
        }

        .option-label {
          font-size: 13px;
          color: var(--text-primary);
          margin-bottom: 8px;
          display: block;
        }

        .size-guide-hint {
          font-size: 11.5px;
          color: var(--text-muted);
        }

        .colors-row {
          display: flex;
          gap: 10px;
        }

        .color-swatch {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 2px solid #FFFFFF;
          box-shadow: 0 0 0 1px rgba(30, 58, 95, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform var(--transition-fast);
        }

        .color-swatch.selected {
          transform: scale(1.15);
          box-shadow: 0 0 0 2px var(--text-primary);
        }

        .sizes-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .size-pill {
          padding: 7px 16px;
          border-radius: var(--radius-pill);
          border: 1px solid rgba(30, 58, 95, 0.18);
          background: #FFFFFF;
          font-family: var(--font-heading);
          font-size: 12.5px;
          font-weight: 500;
          color: var(--text-primary);
          transition: all var(--transition-fast);
        }

        .size-pill:hover {
          border-color: var(--text-primary);
        }

        .size-pill.selected {
          background-color: var(--text-primary);
          color: #FFFFFF;
          border-color: var(--text-primary);
        }

        /* Actions */
        .actions-section {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 10px;
          margin-bottom: 22px;
        }

        .quantity-selector {
          display: inline-flex;
          align-items: center;
          border: 1.5px solid rgba(30, 58, 95, 0.18);
          border-radius: var(--radius-pill);
          background: #FFFFFF;
          padding: 4px 8px;
          gap: 10px;
        }

        .qty-step-btn {
          font-size: 16px;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
        }

        .qty-value {
          font-size: 13px;
          font-weight: 600;
          min-width: 16px;
          text-align: center;
        }

        .add-bag-btn {
          flex: 1;
          justify-content: center;
          padding: 13px 20px;
        }

        .wishlist-toggle {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1.5px solid rgba(30, 58, 95, 0.18);
          display: flex;
          align-items: center;
          justify-content: center;
          background: #FFFFFF;
          transition: all var(--transition-fast);
        }

        .wishlist-toggle:hover,
        .wishlist-toggle.active {
          border-color: var(--accent-coral);
          background: var(--accent-coral-bg);
        }

        /* Trust Points */
        .trust-points {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding-top: 14px;
          border-top: 1px solid rgba(30, 58, 95, 0.08);
        }

        .trust-point {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: var(--text-secondary);
        }

        @media (max-width: 740px) {
          .modal-body {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .modal-card {
            padding: 24px;
          }

          .actions-section {
            flex-wrap: wrap;
          }

          .add-bag-btn {
            order: 3;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
