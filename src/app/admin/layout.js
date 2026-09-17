'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Layers,
  Tag,
  Users,
  Globe,
  Settings,
  LogOut,
  ExternalLink
} from 'lucide-react';

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingBag },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Inventory', href: '/admin/inventory', icon: Layers },
    { name: 'Offers', href: '/admin/offers', icon: Tag },
    { name: 'Customers', href: '/admin/customers', icon: Users },
    { name: 'Website', href: '/admin/website', icon: Globe },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="admin-container">
      {/* Admin Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-brand">
          <div className="admin-logo">
            <span className="logo-text">bee JUNIOR</span>
            <span className="admin-tag">STORE ADMIN</span>
          </div>
        </div>

        <nav className="admin-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`admin-nav-item ${isActive ? 'active' : ''}`}
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <Link href="/" target="_blank" className="admin-nav-item store-link">
            <ExternalLink size={16} />
            <span>View Live Store</span>
          </Link>

          <Link href="/admin/login" className="admin-nav-item logout-link">
            <LogOut size={16} />
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Admin Content */}
      <main className="admin-main">
        <header className="admin-topbar">
          <div className="topbar-status">
            <span className="status-indicator live" />
            <span>Store Online (Production Ready)</span>
          </div>
          <div className="topbar-user">
            <span>Admin</span>
            <div className="user-initial">A</div>
          </div>
        </header>

        <div className="admin-content-inner">
          {children}
        </div>
      </main>

      <style jsx>{`
        .admin-container {
          display: flex;
          min-height: 100vh;
          background-color: #F8FAFC;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          color: #0F172A;
        }

        /* Sidebar */
        .admin-sidebar {
          width: 250px;
          background-color: #FFFFFF;
          border-right: 1px solid #E2E8F0;
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
        }

        .sidebar-brand {
          padding: 24px;
          border-bottom: 1px solid #F1F5F9;
        }

        .admin-logo {
          display: flex;
          flex-direction: column;
        }

        .logo-text {
          font-family: 'Outfit', sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: #1E3A5F;
        }

        .admin-tag {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: #64748B;
        }

        .admin-nav {
          padding: 20px 14px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex: 1;
        }

        .admin-nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 13.5px;
          font-weight: 500;
          color: #475569;
          transition: all 0.15s ease;
        }

        .admin-nav-item:hover {
          background-color: #F1F5F9;
          color: #0F172A;
        }

        .admin-nav-item.active {
          background-color: #1E3A5F;
          color: #FFFFFF;
          font-weight: 600;
        }

        .sidebar-bottom {
          padding: 16px 14px;
          border-top: 1px solid #F1F5F9;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .store-link {
          color: #0284C7;
        }

        .logout-link {
          color: #EF4444;
        }

        /* Main Area */
        .admin-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
        }

        .admin-topbar {
          height: 64px;
          background-color: #FFFFFF;
          border-bottom: 1px solid #E2E8F0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 32px;
        }

        .topbar-status {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #059669;
          font-weight: 500;
        }

        .status-indicator.live {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #10B981;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
        }

        .topbar-user {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13.5px;
          font-weight: 600;
          color: #334155;
        }

        .user-initial {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: #1E3A5F;
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
        }

        .admin-content-inner {
          padding: 32px;
          flex: 1;
        }
      `}</style>
    </div>
  );
}
