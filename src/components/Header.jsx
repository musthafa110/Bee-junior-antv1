'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, User, ShoppingBag, Menu, X, Heart } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function Header() {
  const pathname = usePathname();
  const { cartItemCount, setIsCartOpen, setIsSearchOpen, wishlist } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <header className="site-header">
      <div className="container header-container">
        {/* Left: Text-based Logo */}
        <Link href="/" className="brand-logo" aria-label="Bee Junior Home">
          <span className="logo-bee">bee</span>
          <span className="logo-junior">JUNIOR</span>
        </Link>

        {/* Center: Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-list">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.name} className="nav-item">
                  <Link
                    href={link.href}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                  >
                    {link.name}
                    {isActive && <span className="active-indicator" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right: Actions */}
        <div className="header-actions">
          {/* Search Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="action-btn"
            aria-label="Search products"
          >
            <Search size={19} strokeWidth={1.8} />
          </button>

          {/* Account Link */}
          <Link href="/account" className="action-btn" aria-label="Account">
            <User size={19} strokeWidth={1.8} />
          </Link>

          {/* Wishlist Link (Quick glance) */}
          <Link href="/wishlist" className="action-btn wishlist-btn" aria-label="Wishlist">
            <Heart size={19} strokeWidth={1.8} />
            {wishlist.length > 0 && (
              <span className="badge-count wishlist-badge">{wishlist.length}</span>
            )}
          </Link>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="action-btn cart-btn"
            aria-label="Shopping Bag"
          >
            <ShoppingBag size={19} strokeWidth={1.8} />
            {cartItemCount > 0 && (
              <span className="badge-count">{cartItemCount}</span>
            )}
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="action-btn mobile-menu-btn"
            aria-label="Open Navigation Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-menu-content" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <div className="brand-logo">
                <span className="logo-bee">bee</span>
                <span className="logo-junior">JUNIOR</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="close-btn">
                <X size={22} />
              </button>
            </div>

            <nav className="mobile-nav-links">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`mobile-link ${pathname === link.href ? 'active' : ''}`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="mobile-divider" />
              <Link
                href="/account"
                onClick={() => setMobileMenuOpen(false)}
                className="mobile-link"
              >
                My Account
              </Link>
              <Link
                href="/wishlist"
                onClick={() => setMobileMenuOpen(false)}
                className="mobile-link"
              >
                Wishlist ({wishlist.length})
              </Link>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="mobile-link admin-link"
              >
                Admin Portal
              </Link>
            </nav>

            <div className="mobile-menu-footer">
              <p className="mobile-tagline">little moments, beautifully made.</p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .site-header {
          position: sticky;
          top: 0;
          z-index: 50;
          background-color: var(--bg-page);
          padding: 22px 0 16px;
          transition: background-color var(--transition-normal);
        }

        .header-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* Text-based Logo */
        .brand-logo {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          line-height: 0.95;
          user-select: none;
        }

        .logo-bee {
          font-family: var(--font-heading);
          font-size: 32px;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.03em;
        }

        .logo-junior {
          font-family: var(--font-heading);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.28em;
          color: var(--text-primary);
          padding-left: 2px;
        }

        /* Desktop Nav */
        .desktop-nav {
          display: flex;
          align-items: center;
        }

        .nav-list {
          display: flex;
          align-items: center;
          gap: 36px;
          list-style: none;
        }

        .nav-link {
          position: relative;
          font-family: var(--font-body);
          font-size: 14.5px;
          font-weight: 500;
          color: var(--text-primary);
          padding: 6px 0;
          transition: color var(--transition-fast);
        }

        .nav-link:hover {
          color: var(--accent-sage-dark);
        }

        .nav-link.active {
          font-weight: 600;
        }

        .active-indicator {
          position: absolute;
          bottom: -2px;
          left: 50%;
          transform: translateX(-50%);
          width: 22px;
          height: 2px;
          background-color: var(--accent-mustard);
          border-radius: var(--radius-pill);
        }

        /* Actions */
        .header-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .action-btn {
          position: relative;
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
          border-radius: 50%;
          transition: background-color var(--transition-fast), transform var(--transition-fast);
        }

        .action-btn:hover {
          background-color: var(--bg-card);
          transform: scale(1.05);
        }

        .badge-count {
          position: absolute;
          top: 4px;
          right: 4px;
          min-width: 17px;
          height: 17px;
          background-color: var(--text-primary);
          color: #FFFFFF;
          border-radius: 50%;
          font-size: 10px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 4px;
        }

        .wishlist-badge {
          background-color: var(--accent-coral);
        }

        .mobile-menu-btn {
          display: none;
        }

        /* Mobile Overlay */
        .mobile-menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(30, 58, 95, 0.3);
          backdrop-filter: blur(4px);
          z-index: 100;
        }

        .mobile-menu-content {
          width: 280px;
          height: 100%;
          background-color: var(--bg-page);
          padding: 24px;
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-drawer);
          animation: slideIn 0.25s ease-out;
        }

        @keyframes slideIn {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }

        .mobile-menu-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 32px;
        }

        .mobile-nav-links {
          display: flex;
          flex-direction: column;
          gap: 18px;
          flex: 1;
        }

        .mobile-link {
          font-family: var(--font-heading);
          font-size: 18px;
          font-weight: 500;
          color: var(--text-primary);
          padding: 4px 0;
        }

        .mobile-link.active {
          color: var(--accent-sage-dark);
          font-weight: 600;
        }

        .admin-link {
          font-size: 14px;
          color: var(--text-muted);
        }

        .mobile-divider {
          height: 1px;
          background-color: rgba(30, 58, 95, 0.08);
          margin: 12px 0;
        }

        .mobile-menu-footer {
          margin-top: auto;
          font-size: 12px;
          color: var(--text-muted);
          font-style: italic;
        }

        @media (max-width: 820px) {
          .desktop-nav {
            display: none;
          }
          .mobile-menu-btn {
            display: flex;
          }
          .wishlist-btn {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
