'use client';

import React from 'react';
import Link from 'next/link';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    discountAmount,
    shippingFee,
    cartTotal,
    cartItemCount,
    appliedPromo
  } = useStore();

  if (!isCartOpen) return null;

  return (
    <div className="cart-overlay" onClick={() => setIsCartOpen(false)}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="header-title-wrap">
            <h2 className="drawer-title">Your Bag</h2>
            <span className="drawer-count">({cartItemCount} {cartItemCount === 1 ? 'item' : 'items'})</span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="close-drawer-btn"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="shipping-bar">
          {cartSubtotal >= 999 ? (
            <p className="shipping-text highlight">Yay! You unlocked <strong>FREE Shipping</strong></p>
          ) : (
            <p className="shipping-text">
              Add <strong>₹{999 - cartSubtotal}</strong> more for <strong>FREE Shipping</strong>
            </p>
          )}
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${Math.min(100, (cartSubtotal / 999) * 100)}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="cart-items-container">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-icon-wrap">
                <ShoppingBag size={42} strokeWidth={1.4} color="#8FA89B" />
              </div>
              <h3 className="empty-title">Your bag is empty</h3>
              <p className="empty-subtitle">Looks like you haven't chosen any little styles yet.</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="btn-primary"
                style={{ marginTop: '16px' }}
              >
                <span>Start Shopping</span>
                <ArrowRight size={15} />
              </button>
            </div>
          ) : (
            <div className="items-list">
              {cart.map((item) => (
                <div key={item.cartItemId} className="cart-item">
                  <div className="item-image-wrap">
                    <img src={item.image} alt={item.name} className="item-image" />
                  </div>

                  <div className="item-info">
                    <div className="item-title-row">
                      <h4 className="item-name">{item.name}</h4>
                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="remove-btn"
                        aria-label="Remove item"
                      >
                        <Trash2 size={15} strokeWidth={1.8} />
                      </button>
                    </div>

                    <div className="item-meta">
                      <span>Size: <strong>{item.selectedSize}</strong></span>
                      <span className="dot">•</span>
                      <span>Color: <strong>{item.selectedColor}</strong></span>
                    </div>

                    <div className="item-price-row">
                      <div className="qty-control">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="qty-btn"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="qty-num">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="qty-btn"
                          aria-label="Increase quantity"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <div className="item-price">
                        ₹ {item.price * item.quantity}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer / Checkout Area */}
        {cart.length > 0 && (
          <div className="drawer-footer">
            <div className="summary-row">
              <span className="summary-label">Subtotal</span>
              <span className="summary-value">₹ {cartSubtotal}</span>
            </div>

            {discountAmount > 0 && (
              <div className="summary-row discount-row">
                <span className="summary-label">Promo Discount ({appliedPromo?.discountPercent}%)</span>
                <span className="summary-value">- ₹ {discountAmount}</span>
              </div>
            )}

            <div className="summary-row">
              <span className="summary-label">Estimated Shipping</span>
              <span className="summary-value">
                {shippingFee === 0 ? <strong style={{ color: '#537563' }}>FREE</strong> : `₹ ${shippingFee}`}
              </span>
            </div>

            <div className="summary-divider" />

            <div className="summary-row total-row">
              <span className="total-label">Total</span>
              <span className="total-value">₹ {cartTotal}</span>
            </div>

            <Link
              href="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="btn-primary checkout-btn"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={16} strokeWidth={2.2} />
            </Link>

            <p className="secure-badge">🔒 Guaranteed Safe & Secure Checkout</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .cart-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(30, 58, 95, 0.35);
          backdrop-filter: blur(4px);
          z-index: 1000;
          display: flex;
          justify-content: flex-end;
          animation: fadeIn 0.2s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .cart-drawer {
          width: 100%;
          max-width: 420px;
          height: 100%;
          background-color: var(--bg-page);
          box-shadow: var(--shadow-drawer);
          display: flex;
          flex-direction: column;
          animation: slideDrawer 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes slideDrawer {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }

        /* Header */
        .drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 22px 24px;
          border-bottom: 1px solid rgba(30, 58, 95, 0.08);
        }

        .header-title-wrap {
          display: flex;
          align-items: baseline;
          gap: 8px;
        }

        .drawer-title {
          font-size: 20px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .drawer-count {
          font-size: 13px;
          color: var(--text-muted);
        }

        .close-drawer-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          transition: background-color var(--transition-fast);
        }

        .close-drawer-btn:hover {
          background-color: var(--bg-card);
          color: var(--text-primary);
        }

        /* Free Shipping Bar */
        .shipping-bar {
          padding: 12px 24px;
          background: var(--accent-sage-bg);
        }

        .shipping-text {
          font-size: 12px;
          color: var(--text-primary);
          margin-bottom: 6px;
        }

        .shipping-text.highlight {
          color: #385E49;
        }

        .progress-track {
          height: 4px;
          background: rgba(30, 58, 95, 0.1);
          border-radius: var(--radius-pill);
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: var(--accent-sage-dark);
          transition: width 0.3s ease;
        }

        /* Items Container */
        .cart-items-container {
          flex: 1;
          overflow-y: auto;
          padding: 20px 24px;
        }

        .empty-cart {
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .empty-icon-wrap {
          width: 76px;
          height: 76px;
          background: var(--bg-card);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }

        .empty-title {
          font-size: 18px;
          color: var(--text-primary);
          margin-bottom: 6px;
        }

        .empty-subtitle {
          font-size: 13.5px;
          color: var(--text-secondary);
          max-width: 240px;
        }

        .items-list {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .cart-item {
          display: flex;
          gap: 14px;
          padding-bottom: 18px;
          border-bottom: 1px solid rgba(30, 58, 95, 0.06);
        }

        .item-image-wrap {
          width: 72px;
          height: 82px;
          background: var(--bg-card);
          border-radius: var(--radius-sm);
          overflow: hidden;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6px;
        }

        .item-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .item-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .item-title-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 8px;
        }

        .item-name {
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
          line-height: 1.3;
        }

        .remove-btn {
          color: var(--text-muted);
          transition: color var(--transition-fast);
          padding: 2px;
        }

        .remove-btn:hover {
          color: var(--accent-coral);
        }

        .item-meta {
          font-size: 12px;
          color: var(--text-secondary);
          margin: 4px 0 8px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .dot {
          color: var(--text-muted);
        }

        .item-price-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .qty-control {
          display: inline-flex;
          align-items: center;
          border: 1px solid rgba(30, 58, 95, 0.15);
          border-radius: var(--radius-pill);
          background: #FFFFFF;
          padding: 2px 6px;
          gap: 8px;
        }

        .qty-btn {
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
        }

        .qty-num {
          font-size: 12px;
          font-weight: 600;
          min-width: 14px;
          text-align: center;
        }

        .item-price {
          font-family: var(--font-heading);
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
        }

        /* Footer */
        .drawer-footer {
          padding: 20px 24px 28px;
          background: #FFFFFF;
          border-top: 1px solid rgba(30, 58, 95, 0.08);
          box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.03);
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          font-size: 13.5px;
          margin-bottom: 8px;
          color: var(--text-secondary);
        }

        .discount-row {
          color: #4C7387;
        }

        .summary-divider {
          height: 1px;
          background: rgba(30, 58, 95, 0.08);
          margin: 10px 0;
        }

        .total-row {
          font-size: 17px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 16px;
        }

        .checkout-btn {
          width: 100%;
          justify-content: center;
          padding: 14px 20px;
          font-size: 15px;
        }

        .secure-badge {
          text-align: center;
          font-size: 11.5px;
          color: var(--text-muted);
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
}
