'use client';

import React from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useStore } from '../../context/StoreContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function CartPage() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    discountAmount,
    shippingFee,
    cartTotal,
    appliedPromo
  } = useStore();

  return (
    <div className="cart-page">
      <Header />

      <main className="container cart-container">
        <div className="cart-header">
          <h1 className="cart-title">Shopping Bag</h1>
          <p className="cart-sub">{cart.length} unique styles</p>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart-box">
            <ShoppingBag size={52} color="#8FA89B" strokeWidth={1.3} />
            <h2>Your bag is currently empty</h2>
            <p>Fill it with comfy, organic styles crafted for your little one.</p>
            <Link href="/shop" className="btn-primary" style={{ marginTop: '14px' }}>
              <span>Explore Collection</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            {/* Left Items Table/List */}
            <div className="cart-items-wrapper">
              <div className="table-header">
                <span>Product</span>
                <span>Quantity</span>
                <span>Price</span>
              </div>

              <div className="cart-items-list">
                {cart.map((item) => (
                  <div key={item.cartItemId} className="cart-row">
                    <div className="product-col">
                      <div className="item-thumb-box">
                        <img src={item.image} alt={item.name} className="item-thumb" />
                      </div>
                      <div className="item-info">
                        <h3 className="item-title">{item.name}</h3>
                        <p className="item-options">
                          Size: <strong>{item.selectedSize}</strong> • Color: <strong>{item.selectedColor}</strong>
                        </p>
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="remove-link"
                        >
                          <Trash2 size={13} />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>

                    <div className="quantity-col">
                      <div className="qty-control">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="qty-btn"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="qty-val">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="qty-btn"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>

                    <div className="price-col">
                      <span className="total-item-price">₹ {item.price * item.quantity}</span>
                      {item.quantity > 1 && (
                        <span className="unit-price">₹ {item.price} each</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-actions-row">
                <Link href="/shop" className="continue-shopping">
                  <ArrowLeft size={16} />
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>

            {/* Right Summary Sidebar */}
            <aside className="cart-summary-sidebar">
              <h2 className="summary-heading">Order Summary</h2>

              <div className="summary-lines">
                <div className="summary-line">
                  <span>Subtotal</span>
                  <span>₹ {cartSubtotal}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="summary-line discount">
                    <span>Discount ({appliedPromo?.discountPercent}%)</span>
                    <span>- ₹ {discountAmount}</span>
                  </div>
                )}

                <div className="summary-line">
                  <span>Shipping</span>
                  <span>{shippingFee === 0 ? 'FREE' : `₹ ${shippingFee}`}</span>
                </div>

                <div className="divider" />

                <div className="summary-line grand-total">
                  <span>Total</span>
                  <span>₹ {cartTotal}</span>
                </div>
              </div>

              <Link href="/checkout" className="btn-primary checkout-action-btn">
                <span>Proceed to Checkout</span>
                <ArrowRight size={16} />
              </Link>
            </aside>
          </div>
        )}
      </main>

      <Footer />

      <style jsx>{`
        .cart-page {
          background-color: var(--bg-page);
          min-height: 100vh;
        }

        .cart-container {
          padding: 30px 24px 80px;
        }

        .cart-header {
          margin-bottom: 32px;
        }

        .cart-title {
          font-size: 34px;
          color: var(--text-primary);
        }

        .cart-sub {
          font-size: 14px;
          color: var(--text-secondary);
        }

        .empty-cart-box {
          text-align: center;
          padding: 80px 20px;
          background: #FFFFFF;
          border-radius: var(--radius-xl);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .cart-layout {
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 40px;
          align-items: flex-start;
        }

        /* Items Wrapper */
        .cart-items-wrapper {
          background: #FFFFFF;
          border-radius: var(--radius-lg);
          padding: 24px 30px;
          box-shadow: var(--shadow-subtle);
        }

        .table-header {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          padding-bottom: 14px;
          border-bottom: 1px solid rgba(30, 58, 95, 0.08);
          font-family: var(--font-heading);
          font-size: 12.5px;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .cart-row {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          align-items: center;
          padding: 20px 0;
          border-bottom: 1px solid rgba(30, 58, 95, 0.06);
        }

        .product-col {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .item-thumb-box {
          width: 70px;
          height: 80px;
          background: var(--bg-card);
          border-radius: var(--radius-sm);
          padding: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .item-thumb {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .item-title {
          font-size: 15px;
          color: var(--text-primary);
          margin-bottom: 3px;
        }

        .item-options {
          font-size: 12.5px;
          color: var(--text-secondary);
          margin-bottom: 8px;
        }

        .remove-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          color: var(--text-muted);
          transition: color var(--transition-fast);
        }

        .remove-link:hover {
          color: var(--accent-coral);
        }

        .qty-control {
          display: inline-flex;
          align-items: center;
          border: 1px solid rgba(30, 58, 95, 0.15);
          border-radius: var(--radius-pill);
          padding: 2px 6px;
          gap: 10px;
        }

        .qty-btn {
          width: 22px;
          height: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
        }

        .qty-val {
          font-size: 13px;
          font-weight: 600;
        }

        .price-col {
          display: flex;
          flex-direction: column;
        }

        .total-item-price {
          font-family: var(--font-heading);
          font-size: 16px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .unit-price {
          font-size: 11.5px;
          color: var(--text-muted);
        }

        .cart-actions-row {
          padding-top: 20px;
        }

        .continue-shopping {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 13.5px;
          color: var(--text-primary);
          font-weight: 500;
        }

        /* Summary */
        .cart-summary-sidebar {
          background: #FFFFFF;
          border-radius: var(--radius-lg);
          padding: 28px;
          box-shadow: var(--shadow-subtle);
        }

        .summary-heading {
          font-size: 18px;
          color: var(--text-primary);
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(30, 58, 95, 0.08);
        }

        .summary-line {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          color: var(--text-secondary);
          margin-bottom: 12px;
        }

        .summary-line.discount {
          color: #4C7387;
        }

        .divider {
          height: 1px;
          background: rgba(30, 58, 95, 0.08);
          margin: 14px 0;
        }

        .summary-line.grand-total {
          font-size: 18px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 20px;
        }

        .checkout-action-btn {
          width: 100%;
          justify-content: center;
          padding: 14px 20px;
        }

        @media (max-width: 860px) {
          .cart-layout {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
