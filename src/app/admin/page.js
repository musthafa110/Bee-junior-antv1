'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useStore } from '../../context/StoreContext';
import { DollarSign, ShoppingCart, Clock, Package, AlertTriangle, ArrowRight } from 'lucide-react';

export default function AdminDashboard() {
  const { products } = useStore();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('bee_orders') || '[]');
      setOrders(saved);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const lowStockProducts = products.filter((p) => p.stock <= 15);
  const totalSales = orders.reduce((acc, o) => acc + (o.total || 0), 0) + 12840; // baseline seed
  const totalOrdersCount = orders.length + 18; // baseline seed

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <div>
          <h1 className="dash-title">Store Overview</h1>
          <p className="dash-sub">Monitor your Bee Junior store performance and inventory.</p>
        </div>
      </div>

      {/* Top 5 Metric Cards */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon" style={{ background: '#ECFDF5', color: '#059669' }}>
            <DollarSign size={20} />
          </div>
          <div>
            <span className="metric-label">Today's Sales</span>
            <h3 className="metric-value">₹ {totalSales.toLocaleString()}</h3>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon" style={{ background: '#EFF6FF', color: '#2563EB' }}>
            <ShoppingCart size={20} />
          </div>
          <div>
            <span className="metric-label">Total Orders</span>
            <h3 className="metric-value">{totalOrdersCount}</h3>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon" style={{ background: '#FEF3C7', color: '#D97706' }}>
            <Clock size={20} />
          </div>
          <div>
            <span className="metric-label">Pending Orders</span>
            <h3 className="metric-value">{orders.length > 0 ? orders.length : 3}</h3>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon" style={{ background: '#F3E8FF', color: '#7C3AED' }}>
            <Package size={20} />
          </div>
          <div>
            <span className="metric-label">Total Products</span>
            <h3 className="metric-value">{products.length}</h3>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon" style={{ background: '#FEE2E2', color: '#DC2626' }}>
            <AlertTriangle size={20} />
          </div>
          <div>
            <span className="metric-label">Low Stock Items</span>
            <h3 className="metric-value">{lowStockProducts.length}</h3>
          </div>
        </div>
      </div>

      {/* 2-Column Tables Section */}
      <div className="tables-grid">
        {/* Recent Orders */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3>Recent Orders</h3>
            <Link href="/admin/orders" className="card-link">View All →</Link>
          </div>

          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.slice(0, 5).map((o) => (
                    <tr key={o.orderId}>
                      <td><strong>#{o.orderId}</strong></td>
                      <td>{o.customer?.fullName || 'Guest Customer'}</td>
                      <td>₹ {o.total}</td>
                      <td><span className="badge badge-success">{o.status || 'Confirmed'}</span></td>
                    </tr>
                  ))
                ) : (
                  <>
                    <tr>
                      <td><strong>#BJ-78421</strong></td>
                      <td>Aarav Patel</td>
                      <td>₹ 1,648</td>
                      <td><span className="badge badge-success">Delivered</span></td>
                    </tr>
                    <tr>
                      <td><strong>#BJ-78420</strong></td>
                      <td>Kavya Reddy</td>
                      <td>₹ 999</td>
                      <td><span className="badge badge-warning">Processing</span></td>
                    </tr>
                    <tr>
                      <td><strong>#BJ-78419</strong></td>
                      <td>Rohan Verma</td>
                      <td>₹ 2,198</td>
                      <td><span className="badge badge-info">Shipped</span></td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3>Low Stock Products</h3>
            <Link href="/admin/inventory" className="card-link">Manage Inventory →</Link>
          </div>

          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Stock</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {lowStockProducts.slice(0, 5).map((p) => (
                  <tr key={p.id}>
                    <td>
                      <div className="prod-cell">
                        <img src={p.image} alt="" className="table-thumb" />
                        <span>{p.name}</span>
                      </div>
                    </td>
                    <td>{p.category}</td>
                    <td>
                      <span className="stock-alert">{p.stock} units</span>
                    </td>
                    <td>
                      <Link href="/admin/inventory" className="restock-link">Restock</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style jsx>{`
        .admin-dashboard {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .dashboard-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .dash-title {
          font-size: 24px;
          color: #0F172A;
        }

        .dash-sub {
          font-size: 13.5px;
          color: #64748B;
        }

        /* Metrics */
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 16px;
        }

        .metric-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          padding: 18px;
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .metric-icon {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .metric-label {
          display: block;
          font-size: 12px;
          color: #64748B;
          margin-bottom: 2px;
        }

        .metric-value {
          font-size: 20px;
          font-weight: 700;
          color: #0F172A;
        }

        /* Tables Grid */
        .tables-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .dashboard-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          padding: 20px;
        }

        .card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .card-header h3 {
          font-size: 16px;
          color: #0F172A;
        }

        .card-link {
          font-size: 12.5px;
          color: #2563EB;
          font-weight: 500;
        }

        .admin-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
        }

        .admin-table th {
          text-align: left;
          padding: 10px 12px;
          border-bottom: 1px solid #E2E8F0;
          color: #64748B;
          font-weight: 600;
        }

        .admin-table td {
          padding: 12px;
          border-bottom: 1px solid #F1F5F9;
          color: #334155;
        }

        .prod-cell {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .table-thumb {
          width: 32px;
          height: 36px;
          object-fit: contain;
          background: #F8FAFC;
          border-radius: 4px;
        }

        .stock-alert {
          color: #DC2626;
          font-weight: 600;
          background: #FEF2F2;
          padding: 2px 8px;
          border-radius: 4px;
        }

        .restock-link {
          color: #2563EB;
          font-weight: 500;
        }

        .badge {
          display: inline-block;
          font-size: 11px;
          font-weight: 600;
          padding: 2px 8px;
          border-radius: 4px;
        }

        .badge-success { background: #DCFCE7; color: #15803D; }
        .badge-warning { background: #FEF3C7; color: #B45309; }
        .badge-info { background: #E0E7FF; color: #4338CA; }

        @media (max-width: 900px) {
          .tables-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
