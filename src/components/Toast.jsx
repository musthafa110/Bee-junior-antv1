'use client';

import React from 'react';
import { CheckCircle2, Info } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function Toast() {
  const { toast } = useStore();

  if (!toast) return null;

  return (
    <div className={`toast-notification ${toast.type}`}>
      {toast.type === 'info' ? (
        <Info size={18} color="#5A6E7C" />
      ) : (
        <CheckCircle2 size={18} color="#385E49" />
      )}
      <span className="toast-message">{toast.message}</span>

      <style jsx>{`
        .toast-notification {
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 24px;
          background: #FFFFFF;
          color: var(--text-primary);
          border-radius: var(--radius-pill);
          box-shadow: 0 10px 30px rgba(30, 58, 95, 0.15);
          font-family: var(--font-heading);
          font-size: 13.5px;
          font-weight: 500;
          z-index: 2000;
          border: 1px solid rgba(30, 58, 95, 0.08);
          animation: slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .toast-notification.info {
          background: #F4F7F9;
        }

        @keyframes slideUp {
          from {
            transform: translate(-50%, 20px);
            opacity: 0;
          }
          to {
            transform: translate(-50%, 0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
