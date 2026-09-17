'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useStore } from '../../context/StoreContext';
import { CheckCircle2, ShieldCheck, ArrowRight, ShoppingBag, CreditCard, Truck } from 'lucide-react';

export default function CheckoutPage() {
  const { cart, cartSubtotal, discountAmount, shippingFee, cartTotal, clearCart, appliedPromo } = useStore();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pin: '',
    country: 'India',
    paymentMethod: 'test'
  });

  const [orderPlaced, setOrderPlaced] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate payment processing & order creation
    setTimeout(() => {
      const orderId = `BJ-${Math.floor(100000 + Math.random() * 900000)}`;
      const newOrder = {
        orderId,
        date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
        items: [...cart],
        subtotal: cartSubtotal,
        discount: discountAmount,
        shipping: shippingFee,
        total: cartTotal,
        customer: formData,
        status: 'Confirmed'
      };

      // Store in local storage for order history
      try {
        const existingOrders = JSON.parse(localStorage.getItem('bee_orders') || '[]');
        localStorage.setItem('bee_orders', JSON.stringify([newOrder, ...existingOrders]));
      } catch (err) {
        console.error(err);
      }

      setOrderPlaced(newOrder);
      clearCart();
      setIsSubmitting(false);
    }, 1200);
  };

  if (orderPlaced) {
    return (
      <div className="order-success-page">
        <Header />
        <main className="container success-container">
          <div className="success-card">
            <div className="success-icon-wrap">
              <CheckCircle2 size={54} color="#537563" />
            </div>
            <span className="success-tagline">THANK YOU FOR YOUR ORDER</span>
            <h1 className="success-title">Order Confirmed!</h1>
            <p className="order-number">Order ID: <strong>{orderPlaced.orderId}</strong></p>
            <p className="success-message">
              We've sent an order confirmation and tracking details to <strong>{orderPlaced.customer.email}</strong>.
              Your little ones' styles will arrive in 3-5 business days.
            </p>

            <div className="success-summary">
              <h3>Shipping to:</h3>
              <p><strong>{orderPlaced.customer.fullName}</strong></p>
              <p>{orderPlaced.customer.address}, {orderPlaced.customer.city}, {orderPlaced.customer.state} - {orderPlaced.customer.pin}</p>
              <p>Phone: {orderPlaced.customer.phone}</p>
            </div>

            <div className="success-actions">
              <Link href="/shop" className="btn-primary">
                <span>Continue Shopping</span>
                <ArrowRight size={16} />
              </Link>
              <Link href="/account" className="btn-secondary">
                <span>View Order History</span>
              </Link>
            </div>
          </div>
        </main>
        <Footer />

        <style jsx>{`
          .success-container {
            padding: 60px 24px 100px;
            display: flex;
            justify-content: center;
          }
          .success-card {
            background: #FFFFFF;
            border-radius: var(--radius-xl);
            padding: 48px;
            max-width: 580px;
            width: 100%;
            text-align: center;
            box-shadow: var(--shadow-card);
          }
          .success-icon-wrap {
            width: 80px;
            height: 80px;
            background: var(--accent-sage-bg);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
          }
          .success-tagline {
            font-size: 11.5px;
            font-weight: 600;
            letter-spacing: 0.14em;
            color: var(--accent-sage-dark);
            display: block;
            margin-bottom: 6px;
          }
          .success-title {
            font-size: 32px;
            color: var(--text-primary);
            margin-bottom: 8px;
          }
          .order-number {
            font-size: 15px;
            color: var(--text-primary);
            margin-bottom: 12px;
          }
          .success-message {
            font-size: 14px;
            color: var(--text-secondary);
            line-height: 1.5;
            margin-bottom: 24px;
          }
          .success-summary {
            background: var(--bg-page);
            padding: 18px 24px;
            border-radius: var(--radius-md);
            text-align: left;
            margin-bottom: 28px;
            font-size: 13.5px;
            color: var(--text-secondary);
          }
          .success-summary h3 {
            font-size: 14px;
            color: var(--text-primary);
            margin-bottom: 6px;
          }
          .success-actions {
            display: flex;
            gap: 14px;
            justify-content: center;
            flex-wrap: wrap;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <Header />

      <main className="container checkout-container">
        <div className="checkout-header">
          <h1 className="checkout-title">Checkout</h1>
          <p className="checkout-sub">Complete your little moments order.</p>
        </div>

        {cart.length === 0 ? (
          <div className="empty-state">
            <ShoppingBag size={48} color="#8FA89B" />
            <h2>Your bag is currently empty</h2>
            <p>Add some items to your bag before checking out.</p>
            <Link href="/shop" className="btn-primary" style={{ marginTop: '16px' }}>
              <span>Explore Collection</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        ) : (
          <div className="checkout-grid">
            {/* Left Column: Customer & Delivery Address Form */}
            <form onSubmit={handlePlaceOrder} className="checkout-form">
              <div className="form-section">
                <h2 className="form-heading">1. Contact Information</h2>
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="Sarah Jenkins"
                      value={formData.fullName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Email Address (for order tracking) *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="sarah@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-section">
                <h2 className="form-heading">2. Delivery Address</h2>
                <div className="form-group">
                  <label>Street Address *</label>
                  <input
                    type="text"
                    name="address"
                    required
                    placeholder="Flat / House No., Apartment, Street"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>City *</label>
                    <input
                      type="text"
                      name="city"
                      required
                      placeholder="Bengaluru"
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>State *</label>
                    <input
                      type="text"
                      name="state"
                      required
                      placeholder="Karnataka"
                      value={formData.state}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>PIN Code *</label>
                    <input
                      type="text"
                      name="pin"
                      required
                      placeholder="560001"
                      value={formData.pin}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h2 className="form-heading">3. Payment Option</h2>
                <div className="payment-options">
                  <label className={`payment-option ${formData.paymentMethod === 'test' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="test"
                      checked={formData.paymentMethod === 'test'}
                      onChange={handleInputChange}
                    />
                    <div className="option-info">
                      <CreditCard size={18} color="#1E3A5F" />
                      <div>
                        <strong>Online Payment / Test Gateway (Sandbox)</strong>
                        <span>Instant order placement for development testing</span>
                      </div>
                    </div>
                  </label>

                  <label className={`payment-option ${formData.paymentMethod === 'cod' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                    />
                    <div className="option-info">
                      <Truck size={18} color="#1E3A5F" />
                      <div>
                        <strong>Cash on Delivery (COD)</strong>
                        <span>Pay comfortably when your order arrives</span>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary submit-order-btn"
              >
                <span>{isSubmitting ? 'Placing Order...' : `Place Order • ₹ ${cartTotal}`}</span>
                <ArrowRight size={17} />
              </button>

              <div className="secure-badge">
                <ShieldCheck size={16} color="#537563" />
                <span>256-Bit SSL Encrypted & Protected Checkout</span>
              </div>
            </form>

            {/* Right Column: Order Summary */}
            <aside className="order-summary-box">
              <h2 className="summary-title">Order Summary ({cart.length} items)</h2>

              <div className="summary-items-list">
                {cart.map((item) => (
                  <div key={item.cartItemId} className="summary-item">
                    <img src={item.image} alt={item.name} className="summary-item-img" />
                    <div className="summary-item-details">
                      <h4>{item.name}</h4>
                      <p>Qty: {item.quantity} • Size: {item.selectedSize}</p>
                    </div>
                    <div className="summary-item-price">
                      ₹ {item.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>

              <div className="calculation-rows">
                <div className="calc-row">
                  <span>Bag Subtotal</span>
                  <span>₹ {cartSubtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="calc-row discount">
                    <span>Discount ({appliedPromo?.discountPercent}%)</span>
                    <span>- ₹ {discountAmount}</span>
                  </div>
                )}
                <div className="calc-row">
                  <span>Shipping Fee</span>
                  <span>{shippingFee === 0 ? 'FREE' : `₹ ${shippingFee}`}</span>
                </div>
                <div className="calc-divider" />
                <div className="calc-row total">
                  <span>Grand Total</span>
                  <span>₹ {cartTotal}</span>
                </div>
              </div>
            </aside>
          </div>
        )}
      </main>

      <Footer />

      <style jsx>{`
        .checkout-page {
          background-color: var(--bg-page);
          min-height: 100vh;
        }

        .checkout-container {
          padding: 30px 24px 80px;
        }

        .checkout-header {
          margin-bottom: 30px;
        }

        .checkout-title {
          font-size: 34px;
          color: var(--text-primary);
        }

        .checkout-sub {
          font-size: 14px;
          color: var(--text-secondary);
        }

        .empty-state {
          text-align: center;
          padding: 80px 20px;
          background: #FFFFFF;
          border-radius: var(--radius-xl);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .checkout-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 40px;
          align-items: flex-start;
        }

        .form-section {
          background: #FFFFFF;
          border-radius: var(--radius-lg);
          padding: 28px;
          margin-bottom: 24px;
          box-shadow: var(--shadow-subtle);
        }

        .form-heading {
          font-size: 17px;
          color: var(--text-primary);
          margin-bottom: 18px;
          border-bottom: 1px solid rgba(30, 58, 95, 0.08);
          padding-bottom: 10px;
        }

        .form-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 16px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 14px;
        }

        .form-group label {
          font-size: 12.5px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .form-group input {
          padding: 10px 14px;
          border: 1.5px solid rgba(30, 58, 95, 0.15);
          border-radius: var(--radius-sm);
          font-family: var(--font-body);
          font-size: 14px;
          color: var(--text-primary);
          background-color: var(--bg-page);
          outline: none;
          transition: border-color var(--transition-fast);
        }

        .form-group input:focus {
          border-color: var(--text-primary);
          background-color: #FFFFFF;
        }

        .payment-options {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .payment-option {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 18px;
          border: 1.5px solid rgba(30, 58, 95, 0.15);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .payment-option.selected {
          border-color: var(--text-primary);
          background-color: var(--accent-blue-bg);
        }

        .option-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .option-info strong {
          display: block;
          font-size: 14px;
          color: var(--text-primary);
        }

        .option-info span {
          display: block;
          font-size: 12px;
          color: var(--text-secondary);
        }

        .submit-order-btn {
          width: 100%;
          justify-content: center;
          padding: 16px;
          font-size: 16px;
          margin-top: 10px;
        }

        .secure-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 12px;
          color: var(--text-secondary);
          margin-top: 14px;
        }

        /* Order Summary Box */
        .order-summary-box {
          background: #FFFFFF;
          border-radius: var(--radius-lg);
          padding: 28px;
          box-shadow: var(--shadow-subtle);
          position: sticky;
          top: 90px;
        }

        .summary-title {
          font-size: 18px;
          color: var(--text-primary);
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(30, 58, 95, 0.08);
        }

        .summary-items-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
          max-height: 320px;
          overflow-y: auto;
          margin-bottom: 20px;
        }

        .summary-item {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .summary-item-img {
          width: 52px;
          height: 58px;
          object-fit: contain;
          background: var(--bg-card);
          border-radius: var(--radius-sm);
        }

        .summary-item-details {
          flex: 1;
        }

        .summary-item-details h4 {
          font-size: 13.5px;
          color: var(--text-primary);
        }

        .summary-item-details p {
          font-size: 12px;
          color: var(--text-muted);
        }

        .summary-item-price {
          font-family: var(--font-heading);
          font-size: 13.5px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .calculation-rows {
          border-top: 1px solid rgba(30, 58, 95, 0.08);
          padding-top: 14px;
        }

        .calc-row {
          display: flex;
          justify-content: space-between;
          font-size: 13.5px;
          color: var(--text-secondary);
          margin-bottom: 8px;
        }

        .calc-row.discount {
          color: #4C7387;
        }

        .calc-divider {
          height: 1px;
          background: rgba(30, 58, 95, 0.08);
          margin: 12px 0;
        }

        .calc-row.total {
          font-size: 18px;
          font-weight: 700;
          color: var(--text-primary);
        }

        @media (max-width: 860px) {
          .checkout-grid {
            grid-template-columns: 1fr;
          }
          .order-summary-box {
            order: -1;
            position: static;
          }
        }
      `}</style>
    </div>
  );
}
