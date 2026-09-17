'use client';

import React, { useState } from 'react';
import { useStore } from '../../../context/StoreContext';
import { Plus, Edit2, Trash2, Search, Check, AlertCircle, Eye } from 'lucide-react';

export default function AdminProductsPage() {
  const { products, setProducts, showToast } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category: 'Boys',
    subCategory: 'Tops',
    mrp: '',
    price: '',
    stock: '',
    status: 'Published',
    description: '',
    image: '/images/relaxed-tee.jpg'
  });

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: 'Boys',
      subCategory: 'Tops',
      mrp: '',
      price: '',
      stock: '20',
      status: 'Published',
      description: '',
      image: '/images/relaxed-tee.jpg'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      subCategory: product.subCategory || 'Tops',
      mrp: product.mrp.toString(),
      price: product.price.toString(),
      stock: product.stock.toString(),
      status: product.status || 'Published',
      description: product.description || '',
      image: product.image
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this product? It will be removed from the store.')) {
      const updated = products.filter((p) => p.id !== id);
      setProducts(updated);
      localStorage.setItem('bee_products', JSON.stringify(updated));
      showToast('Product removed from store', 'info');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const mrpNum = Number(formData.mrp) || Number(formData.price);
    const priceNum = Number(formData.price);
    const stockNum = Number(formData.stock) || 0;

    let updatedProducts;

    if (editingProduct) {
      // Update
      updatedProducts = products.map((p) =>
        p.id === editingProduct.id
          ? {
              ...p,
              name: formData.name,
              category: formData.category,
              subCategory: formData.subCategory,
              mrp: mrpNum,
              price: priceNum,
              stock: stockNum,
              status: formData.status,
              description: formData.description,
              image: formData.image
            }
          : p
      );
      showToast(`Updated product "${formData.name}"`);
    } else {
      // Add
      const newProduct = {
        id: `bj-${Date.now()}`,
        name: formData.name,
        slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
        category: formData.category,
        subCategory: formData.subCategory,
        mrp: mrpNum,
        price: priceNum,
        stock: stockNum,
        status: formData.status,
        description: formData.description,
        image: formData.image,
        sizes: ['1-2Y', '2-3Y', '3-4Y', '4-5Y'],
        colors: [{ name: 'Standard', hex: '#8FA89B' }],
        isFeatured: false,
        isNew: true
      };
      updatedProducts = [newProduct, ...products];
      showToast(`Published "${formData.name}" to store!`);
    }

    setProducts(updatedProducts);
    localStorage.setItem('bee_products', JSON.stringify(updatedProducts));
    setIsModalOpen(false);
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="products-admin">
      <div className="page-header">
        <div>
          <h1 className="page-title">Products ({products.length})</h1>
          <p className="page-sub">Create, edit, and organize all Bee Junior apparel collections.</p>
        </div>

        <button onClick={handleOpenAdd} className="admin-btn-primary">
          <Plus size={16} />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <Search size={16} color="#64748B" />
        <input
          type="text"
          placeholder="Filter by product name or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Products Table */}
      <div className="table-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>MRP</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id}>
                <td>
                  <div className="product-cell">
                    <img src={p.image} alt="" className="thumb" />
                    <div>
                      <span className="prod-name">{p.name}</span>
                      <span className="prod-id">{p.id}</span>
                    </div>
                  </div>
                </td>
                <td>{p.category}</td>
                <td><strong>₹ {p.price}</strong></td>
                <td><span className="mrp">₹ {p.mrp}</span></td>
                <td>
                  <span className={`stock-tag ${p.stock <= 10 ? 'low' : ''}`}>
                    {p.stock} units
                  </span>
                </td>
                <td>
                  <span className={`status-pill ${p.status === 'Published' ? 'published' : 'draft'}`}>
                    {p.status || 'Published'}
                  </span>
                </td>
                <td>
                  <div className="actions-cell">
                    <button
                      onClick={() => handleOpenEdit(p)}
                      className="icon-btn edit"
                      title="Edit Product"
                    >
                      <Edit2 size={15} />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="icon-btn delete"
                      title="Delete Product"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="modal-window" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="close-x">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label>Product Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Linen Button-Down Shirt"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="Boys">Boys</option>
                    <option value="Girls">Girls</option>
                    <option value="Baby">Baby</option>
                    <option value="Bottoms">Bottoms</option>
                    <option value="Sets">Sets</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Subcategory</label>
                  <input
                    type="text"
                    value={formData.subCategory}
                    onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}
                    placeholder="Tops / Dresses / Shorts"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Selling Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="649"
                  />
                </div>

                <div className="form-group">
                  <label>MRP (₹) *</label>
                  <input
                    type="number"
                    required
                    value={formData.mrp}
                    onChange={(e) => setFormData({ ...formData, mrp: e.target.value })}
                    placeholder="899"
                  />
                </div>

                <div className="form-group">
                  <label>Stock Quantity *</label>
                  <input
                    type="number"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    placeholder="20"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="Published">Published (Live in Store)</option>
                  <option value="Draft">Draft (Hidden)</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe material, fit, and care instructions..."
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-cancel"
                >
                  Cancel
                </button>
                <button type="submit" className="admin-btn-primary">
                  {editingProduct ? 'Save Changes' : 'Publish Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .products-admin {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .page-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .page-title {
          font-size: 24px;
          color: #0F172A;
        }

        .page-sub {
          font-size: 13.5px;
          color: #64748B;
        }

        .admin-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #1E3A5F;
          color: #FFFFFF;
          padding: 10px 18px;
          border-radius: 8px;
          font-size: 13.5px;
          font-weight: 600;
        }

        .search-bar {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 8px;
          padding: 10px 16px;
          max-width: 420px;
        }

        .search-bar input {
          border: none;
          outline: none;
          width: 100%;
          font-size: 13.5px;
        }

        .table-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          overflow: hidden;
        }

        .admin-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13.5px;
        }

        .admin-table th {
          text-align: left;
          padding: 12px 18px;
          background: #F8FAFC;
          border-bottom: 1px solid #E2E8F0;
          color: #475569;
          font-weight: 600;
        }

        .admin-table td {
          padding: 14px 18px;
          border-bottom: 1px solid #F1F5F9;
          color: #1E293B;
        }

        .product-cell {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .thumb {
          width: 42px;
          height: 46px;
          object-fit: contain;
          background: #F8FAFC;
          border-radius: 6px;
        }

        .prod-name {
          display: block;
          font-weight: 600;
          color: #0F172A;
        }

        .prod-id {
          font-size: 11px;
          color: #94A3B8;
        }

        .mrp {
          color: #94A3B8;
          text-decoration: line-through;
        }

        .stock-tag {
          font-size: 12px;
          font-weight: 600;
          color: #059669;
        }

        .stock-tag.low {
          color: #DC2626;
        }

        .status-pill {
          display: inline-block;
          font-size: 11.5px;
          font-weight: 600;
          padding: 3px 10px;
          border-radius: 9999px;
        }

        .status-pill.published {
          background: #DCFCE7;
          color: #15803D;
        }

        .status-pill.draft {
          background: #F1F5F9;
          color: #64748B;
        }

        .actions-cell {
          display: flex;
          gap: 8px;
        }

        .icon-btn {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #E2E8F0;
        }

        .icon-btn.edit:hover {
          background: #EFF6FF;
          color: #2563EB;
          border-color: #BFDBFE;
        }

        .icon-btn.delete:hover {
          background: #FEF2F2;
          color: #DC2626;
          border-color: #FECACA;
        }

        /* Modal */
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(15, 23, 42, 0.4);
          backdrop-filter: blur(4px);
          z-index: 1200;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .modal-window {
          background: #FFFFFF;
          width: 100%;
          max-width: 600px;
          border-radius: 14px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          overflow: hidden;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid #E2E8F0;
        }

        .modal-header h2 {
          font-size: 18px;
          color: #0F172A;
        }

        .close-x {
          font-size: 16px;
          color: #64748B;
        }

        .modal-form {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .form-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 14px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-group label {
          font-size: 12.5px;
          font-weight: 600;
          color: #334155;
        }

        .form-group input, .form-group select, .form-group textarea {
          padding: 9px 12px;
          border: 1px solid #CBD5E1;
          border-radius: 6px;
          font-size: 13.5px;
          outline: none;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 16px;
          padding-top: 14px;
          border-top: 1px solid #E2E8F0;
        }

        .btn-cancel {
          padding: 9px 16px;
          border-radius: 6px;
          border: 1px solid #CBD5E1;
          font-size: 13px;
          color: #475569;
        }
      `}</style>
    </div>
  );
}
