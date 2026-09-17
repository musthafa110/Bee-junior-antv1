'use client';

import React, { useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function SearchModal() {
  const {
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    filteredProducts,
    setQuickViewProduct
  } = useStore();

  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 50);
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  return (
    <div className="search-overlay" onClick={() => setIsSearchOpen(false)}>
      <div className="search-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Search Input Bar */}
        <div className="search-bar">
          <Search size={20} color="#1E3A5F" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search shirts, dresses, sets, shorts..."
            className="search-input"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="clear-btn">
              <X size={16} />
            </button>
          )}
          <button onClick={() => setIsSearchOpen(false)} className="close-btn">
            ESC
          </button>
        </div>

        {/* Quick Suggestion Tags */}
        {searchQuery === '' && (
          <div className="search-suggestions">
            <span className="suggestions-label">Popular Searches:</span>
            <div className="tags-row">
              {['Henley', 'Linen Shirt', 'Floral Dress', 'Shorts', 'Sets', 'Organic Cotton'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearchQuery(tag)}
                  className="search-tag"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        {searchQuery !== '' && (
          <div className="search-results">
            {filteredProducts.length === 0 ? (
              <div className="no-results">
                <p>No products found matching "{searchQuery}"</p>
                <span>Try searching for 'tee', 'dress', 'shirt', or 'linen'</span>
              </div>
            ) : (
              <div className="results-list">
                {filteredProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      setQuickViewProduct(p);
                      setIsSearchOpen(false);
                    }}
                    className="result-item"
                  >
                    <img src={p.image} alt={p.name} className="result-thumb" />
                    <div className="result-info">
                      <h4 className="result-name">{p.name}</h4>
                      <p className="result-category">{p.category} • ₹ {p.price}</p>
                    </div>
                    <ArrowRight size={16} color="#1E3A5F" />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        .search-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(30, 58, 95, 0.45);
          backdrop-filter: blur(5px);
          z-index: 1100;
          display: flex;
          justify-content: center;
          padding-top: 90px;
          animation: fadeIn 0.15s ease-out;
        }

        .search-dialog {
          width: 100%;
          max-width: 600px;
          background-color: var(--bg-page);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-card);
          overflow: hidden;
          max-height: 80vh;
          display: flex;
          flex-direction: column;
        }

        .search-bar {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 18px 24px;
          border-bottom: 1px solid rgba(30, 58, 95, 0.08);
          background: #FFFFFF;
        }

        .search-input {
          flex: 1;
          border: none;
          outline: none;
          font-family: var(--font-body);
          font-size: 16px;
          color: var(--text-primary);
          background: transparent;
        }

        .search-input::placeholder {
          color: var(--text-muted);
        }

        .clear-btn {
          color: var(--text-muted);
        }

        .close-btn {
          font-size: 11px;
          font-weight: 600;
          color: var(--text-secondary);
          background: var(--bg-card);
          padding: 4px 8px;
          border-radius: 4px;
        }

        .search-suggestions {
          padding: 24px;
        }

        .suggestions-label {
          font-size: 12px;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 12px;
          display: block;
        }

        .tags-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .search-tag {
          padding: 6px 14px;
          border-radius: var(--radius-pill);
          background-color: var(--bg-card);
          font-size: 13px;
          color: var(--text-primary);
          transition: all var(--transition-fast);
        }

        .search-tag:hover {
          background-color: var(--accent-sage-bg);
          color: var(--accent-sage-dark);
        }

        .search-results {
          padding: 16px 24px 24px;
          overflow-y: auto;
        }

        .no-results {
          text-align: center;
          padding: 30px 0;
          color: var(--text-secondary);
        }

        .no-results span {
          display: block;
          font-size: 12px;
          color: var(--text-muted);
          margin-top: 6px;
        }

        .results-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .result-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 10px 14px;
          background: #FFFFFF;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .result-item:hover {
          transform: translateX(4px);
          background: var(--bg-card);
        }

        .result-thumb {
          width: 48px;
          height: 48px;
          object-fit: contain;
          background: var(--bg-card);
          border-radius: var(--radius-sm);
        }

        .result-info {
          flex: 1;
        }

        .result-name {
          font-size: 14px;
          color: var(--text-primary);
          font-weight: 600;
        }

        .result-category {
          font-size: 12px;
          color: var(--text-secondary);
        }
      `}</style>
    </div>
  );
}
