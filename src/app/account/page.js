'use client';

import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { User, Package, MapPin, Heart, LogOut, ArrowRight, Clock, CheckCircle } from 'lucide-react';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = JSON.parse(localStorage.getItem('bee_orders') || '[]');
        setOrders(stored);
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  return (
    <div className="account-page">
      <Header />

      <main className="container account-container">
        <div className="account-header">
          <h1 className="account-title">My Account</h1>
          <p className="account-sub">Welcome back to your Bee Junior family profile.</p>
        </div>

        <div className="account-layout">
          {/* Sidebar Navigation */}
          <aside className="account-sidebar">
            <div className="user-profile-badge">
              <div className="avatar-circle">
                <User size={26} color="#1E3A5F" />
              </div>
              <div className="avatar-details">
                <h3 className="user-name">Musthafa</h3>
                <span className="user-email">musthafa110@example.com</span>
              </div>
            </div>

            <nav className="account-nav">
              <button
                onClick={() => setActiveTab('orders')}
                className={`nav-tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
              >
                <Package size={17} />
                <span>My Orders ({orders.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className={`nav-tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
              >
                <User size={17} />
                <span>Profile Details</span>
              </button>

              <button
                onClick={() => setActiveTab('addresses')}
                className={`nav-tab-btn ${activeTab === 'addresses' ? 'active' : ''}`}
              >
                <MapPin size={17} />
                <span>Saved Addresses</span>
              </button>

              <Link href="/wishlist" className="nav-tab-btn">
                <Heart size={17} />
                <span>Wishlist</span>
              </Link>

              <div className="sidebar-divider" />

              <Link href="/admin" className="nav-tab-btn admin-badge-btn">
                <span>Go to Admin Panel →</span>
              </Link>
            </nav>
          </aside>

          {/* Main Account Content Area */}
          <div className="account-content">
            {activeTab === 'orders' && (
              <div className="tab-pane">
                <h2 className="pane-title">Order History</h2>

                {orders.length === 0 ? (
                  <div className="empty-orders">
                    <Package size={44} color="#8FA89B" />
                    <h3>No orders yet</h3>
                    <p>Once you place an order, you can track its delivery status here.</p>
                    <Link href="/shop" className="btn-primary" style={{ marginTop: '14px' }}>
                      <span>Start Shopping</span>
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                ) : (
                  <div className="orders-list">
                    {orders.map((ord) => (
                      <div key={ord.orderId} className="order-card">
                        <div className="order-card-header">
                          <div>
                            <span className="order-id">Order #{ord.orderId}</span>
                            <span className="order-date">{ord.date}</span>
                          </div>
                          <span className="order-status-badge">
                            <CheckCircle size={13} /> {ord.status || 'Confirmed'}
                          </span>
                        </div>

                        <div className="order-items-preview">
                          {ord.items.map((it, idx) => (
                            <div key={idx} className="preview-item">
                              <img src={it.image} alt={it.name} className="preview-img" />
                              <div className="preview-info">
                                <h4>{it.name}</h4>
                                <p>Qty: {it.quantity} • Size: {it.selectedSize} • ₹ {it.price}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="order-card-footer">
                          <span>Total Amount: <strong>₹ {ord.total}</strong></span>
                          <span className="est-delivery">Estimated Delivery: 3-5 Business Days</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="tab-pane">
                <h2 className="pane-title">Profile Settings</h2>
                <div className="profile-form-wrap">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" defaultValue="Musthafa" />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" defaultValue="musthafa110@example.com" />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" defaultValue="+91 98765 43210" />
                  </div>
                  <button className="btn-primary" style={{ marginTop: '10px' }}>
                    Save Profile Changes
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="tab-pane">
                <h2 className="pane-title">Saved Delivery Addresses</h2>
                <div className="address-card default">
                  <div className="address-badge">Default Address</div>
                  <h3>Musthafa</h3>
                  <p>12th Main Road, HAL 2nd Stage, Indiranagar</p>
                  <p>Bengaluru, Karnataka - 560038</p>
                  <p>Phone: +91 98765 43210</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        .account-page {
          background-color: var(--bg-page);
          min-height: 100vh;
        }

        .account-container {
          padding: 30px 24px 80px;
        }

        .account-header {
          margin-bottom: 32px;
        }

        .account-title {
          font-size: 34px;
          color: var(--text-primary);
        }

        .account-sub {
          font-size: 14px;
          color: var(--text-secondary);
        }

        .account-layout {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 36px;
          align-items: flex-start;
        }

        /* Sidebar */
        .account-sidebar {
          background: #FFFFFF;
          border-radius: var(--radius-lg);
          padding: 24px;
          box-shadow: var(--shadow-subtle);
        }

        .user-profile-badge {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-bottom: 20px;
          margin-bottom: 18px;
          border-bottom: 1px solid rgba(30, 58, 95, 0.08);
        }

        .avatar-circle {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background-color: var(--accent-blue-bg);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .user-name {
          font-size: 16px;
          color: var(--text-primary);
        }

        .user-email {
          font-size: 12px;
          color: var(--text-muted);
        }

        .account-nav {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .nav-tab-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 14px;
          border-radius: var(--radius-sm);
          font-family: var(--font-heading);
          font-size: 13.5px;
          color: var(--text-secondary);
          transition: all var(--transition-fast);
          text-align: left;
        }

        .nav-tab-btn:hover {
          background-color: var(--bg-card);
          color: var(--text-primary);
        }

        .nav-tab-btn.active {
          background-color: var(--accent-sage-bg);
          color: var(--accent-sage-dark);
          font-weight: 600;
        }

        .sidebar-divider {
          height: 1px;
          background: rgba(30, 58, 95, 0.08);
          margin: 12px 0;
        }

        .admin-badge-btn {
          color: var(--text-primary);
          font-weight: 600;
          background: var(--bg-card);
        }

        /* Pane */
        .tab-pane {
          background: #FFFFFF;
          border-radius: var(--radius-lg);
          padding: 32px;
          box-shadow: var(--shadow-subtle);
        }

        .pane-title {
          font-size: 20px;
          color: var(--text-primary);
          margin-bottom: 24px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(30, 58, 95, 0.08);
        }

        .empty-orders {
          text-align: center;
          padding: 60px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        .orders-list {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .order-card {
          border: 1px solid rgba(30, 58, 95, 0.1);
          border-radius: var(--radius-md);
          overflow: hidden;
        }

        .order-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: var(--bg-page);
          padding: 12px 20px;
          border-bottom: 1px solid rgba(30, 58, 95, 0.08);
        }

        .order-id {
          font-family: var(--font-heading);
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
          margin-right: 12px;
        }

        .order-date {
          font-size: 12px;
          color: var(--text-muted);
        }

        .order-status-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: var(--accent-sage-bg);
          color: var(--accent-sage-dark);
          padding: 4px 10px;
          border-radius: var(--radius-pill);
          font-size: 11.5px;
          font-weight: 600;
        }

        .order-items-preview {
          padding: 18px 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .preview-item {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .preview-img {
          width: 44px;
          height: 48px;
          object-fit: contain;
          background: var(--bg-card);
          border-radius: 6px;
        }

        .preview-info h4 {
          font-size: 13.5px;
          color: var(--text-primary);
        }

        .preview-info p {
          font-size: 12px;
          color: var(--text-muted);
        }

        .order-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 20px;
          background: var(--bg-page);
          font-size: 13px;
        }

        .est-delivery {
          font-size: 12px;
          color: var(--text-muted);
        }

        /* Profile & Address */
        .profile-form-wrap {
          max-width: 440px;
        }

        .form-group {
          margin-bottom: 14px;
          display: flex;
          flex-direction: column;
          gap: 6px;
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
        }

        .address-card {
          border: 1.5px solid var(--accent-sage-dark);
          background: var(--accent-sage-bg);
          padding: 20px;
          border-radius: var(--radius-md);
          max-width: 400px;
        }

        .address-badge {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          color: var(--accent-sage-dark);
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        @media (max-width: 768px) {
          .account-layout {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
