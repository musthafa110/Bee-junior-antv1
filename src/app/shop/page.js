'use client';

import React, { useState, useMemo } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductCard from '../../components/ProductCard';
import { useStore } from '../../context/StoreContext';
import { Filter, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

export default function ShopPage() {
  const { products } = useStore();

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSize, setSelectedSize] = useState('All');
  const [selectedColor, setSelectedColor] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(2000);
  const [inStockOnly, setInStockOnly] = useState(false);

  // Available Filter Options
  const categories = ['All', 'Boys', 'Girls', 'Baby', 'Tops', 'Bottoms', 'Dresses', 'Sets'];
  const sizes = ['All', '1-2Y', '2-3Y', '3-4Y', '4-5Y', '5-6Y'];
  const colors = ['All', 'Sage Green', 'Beige Stripe', 'Cream Floral', 'Sky Blue', 'Oatmeal Beige'];

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (selectedCategory !== 'All' && p.category !== selectedCategory && p.subCategory !== selectedCategory) {
          return false;
        }
        if (selectedSize !== 'All' && !p.sizes?.includes(selectedSize)) {
          return false;
        }
        if (selectedColor !== 'All' && !p.colors?.some((c) => c.name === selectedColor)) {
          return false;
        }
        if (p.price > maxPrice) {
          return false;
        }
        if (inStockOnly && p.stock <= 0) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        return 0; // default featured
      });
  }, [products, selectedCategory, selectedSize, selectedColor, maxPrice, inStockOnly, sortBy]);

  return (
    <div className="shop-page">
      <Header />

      <main className="container shop-container">
        {/* Page Header */}
        <div className="shop-header">
          <div className="shop-breadcrumbs">
            <span>Home</span> / <span>Shop</span> {selectedCategory !== 'All' && `/ ${selectedCategory}`}
          </div>
          <h1 className="shop-title">The Collection</h1>
          <p className="shop-description">
            Mindfully crafted essentials for childhood adventures. Premium organic cotton, timeless tailoring, and gentle fabrics.
          </p>
        </div>

        {/* Toolbar: Category Chips & Sort Dropdown */}
        <div className="shop-toolbar">
          <div className="category-chips">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`chip-btn ${selectedCategory === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="sort-wrap">
            <ArrowUpDown size={14} color="#1E3A5F" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="featured">Sort: Featured</option>
              <option value="newest">Sort: Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="shop-layout">
          {/* Left Sidebar: Detailed Filters */}
          <aside className="filters-sidebar">
            <div className="sidebar-header">
              <SlidersHorizontal size={16} color="#1E3A5F" />
              <h3>Filters</h3>
            </div>

            {/* Size Filter */}
            <div className="filter-group">
              <h4 className="filter-title">Size (Age)</h4>
              <div className="filter-size-grid">
                {sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`size-filter-btn ${selectedSize === sz ? 'active' : ''}`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="filter-group">
              <div className="price-title-row">
                <h4 className="filter-title">Max Price</h4>
                <span className="price-val">₹ {maxPrice}</span>
              </div>
              <input
                type="range"
                min="500"
                max="2000"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="price-range"
              />
            </div>

            {/* Availability */}
            <div className="filter-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                />
                <span>In Stock Only</span>
              </label>
            </div>

            {/* Reset */}
            {(selectedCategory !== 'All' || selectedSize !== 'All' || maxPrice < 2000) && (
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedSize('All');
                  setSelectedColor('All');
                  setMaxPrice(2000);
                  setInStockOnly(false);
                }}
                className="reset-filters-btn"
              >
                Reset All Filters
              </button>
            )}
          </aside>

          {/* Right Area: Products Grid */}
          <section className="catalog-content">
            <div className="results-count-row">
              <span className="results-count">Showing {filteredProducts.length} styles</span>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="empty-catalog">
                <p>No products match your current filters.</p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedSize('All');
                    setMaxPrice(2000);
                  }}
                  className="btn-primary"
                  style={{ marginTop: '14px' }}
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="shop-products-grid">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        .shop-page {
          min-height: 100vh;
          background-color: var(--bg-page);
        }

        .shop-container {
          padding-top: 20px;
          padding-bottom: 80px;
        }

        .shop-breadcrumbs {
          font-size: 12.5px;
          color: var(--text-muted);
          margin-bottom: 8px;
        }

        .shop-title {
          font-size: 38px;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .shop-description {
          font-size: 14.5px;
          color: var(--text-secondary);
          max-width: 600px;
          margin-bottom: 28px;
        }

        /* Toolbar */
        .shop-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 20px;
          margin-bottom: 24px;
          border-bottom: 1px solid rgba(30, 58, 95, 0.08);
          gap: 16px;
          flex-wrap: wrap;
        }

        .category-chips {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .chip-btn {
          padding: 7px 18px;
          border-radius: var(--radius-pill);
          background-color: var(--bg-card);
          font-family: var(--font-heading);
          font-size: 13px;
          font-weight: 500;
          color: var(--text-primary);
          transition: all var(--transition-fast);
        }

        .chip-btn:hover {
          background-color: var(--bg-card-hover);
        }

        .chip-btn.active {
          background-color: var(--text-primary);
          color: #FFFFFF;
        }

        .sort-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #FFFFFF;
          padding: 6px 14px;
          border-radius: var(--radius-pill);
          border: 1px solid rgba(30, 58, 95, 0.12);
        }

        .sort-select {
          border: none;
          outline: none;
          font-family: var(--font-heading);
          font-size: 13px;
          color: var(--text-primary);
          background: transparent;
          cursor: pointer;
        }

        /* Layout */
        .shop-layout {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 40px;
          align-items: flex-start;
        }

        /* Sidebar Filters */
        .filters-sidebar {
          background: #FFFFFF;
          border-radius: var(--radius-lg);
          padding: 24px;
          box-shadow: var(--shadow-subtle);
        }

        .sidebar-header {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 16px;
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(30, 58, 95, 0.08);
        }

        .filter-group {
          margin-bottom: 22px;
        }

        .filter-title {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 10px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .filter-size-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 6px;
        }

        .size-filter-btn {
          padding: 6px 0;
          text-align: center;
          border-radius: 6px;
          background-color: var(--bg-page);
          font-size: 12px;
          font-family: var(--font-heading);
          color: var(--text-primary);
          border: 1px solid transparent;
          transition: all var(--transition-fast);
        }

        .size-filter-btn:hover {
          border-color: var(--text-primary);
        }

        .size-filter-btn.active {
          background-color: var(--text-primary);
          color: #FFFFFF;
        }

        .price-title-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 6px;
        }

        .price-val {
          font-size: 13px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .price-range {
          width: 100%;
          accent-color: var(--text-primary);
          cursor: pointer;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: var(--text-primary);
          cursor: pointer;
        }

        .reset-filters-btn {
          width: 100%;
          padding: 8px 0;
          font-size: 12.5px;
          color: var(--text-secondary);
          text-decoration: underline;
          cursor: pointer;
        }

        /* Products Grid */
        .results-count-row {
          margin-bottom: 16px;
        }

        .results-count {
          font-size: 13px;
          color: var(--text-muted);
        }

        .shop-products-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .empty-catalog {
          text-align: center;
          padding: 60px 0;
          color: var(--text-secondary);
        }

        @media (max-width: 900px) {
          .shop-layout {
            grid-template-columns: 1fr;
          }

          .filters-sidebar {
            display: none;
          }

          .shop-products-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
        }
      `}</style>
    </div>
  );
}
