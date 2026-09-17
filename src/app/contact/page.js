'use client';

import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="contact-page">
      <Header />

      <main className="container contact-container">
        <div className="contact-header">
          <h1 className="contact-title">We'd love to hear from you</h1>
          <p className="contact-sub">Have a question regarding sizes, orders, or styling advice? Reach out anytime.</p>
        </div>

        <div className="contact-grid">
          {/* Form */}
          <div className="contact-card">
            {submitted ? (
              <div className="submitted-box">
                <CheckCircle2 size={48} color="#537563" />
                <h3>Thank you for reaching out!</h3>
                <p>We've received your note and our team will get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label>Your Name *</label>
                  <input type="text" required placeholder="Priya Sharma" />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input type="email" required placeholder="priya@example.com" />
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <input type="text" placeholder="Size enquiry / Order assistance" />
                </div>
                <div className="form-group">
                  <label>Message *</label>
                  <textarea rows={5} required placeholder="How can we help your little one?" />
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  <span>Send Message</span>
                  <Send size={15} />
                </button>
              </form>
            )}
          </div>

          {/* Contact Details */}
          <div className="info-column">
            <div className="info-card">
              <div className="info-item">
                <div className="info-icon" style={{ background: '#D9E6DF', color: '#537563' }}>
                  <Mail size={18} />
                </div>
                <div>
                  <h4>Email Us</h4>
                  <p>hello@beejunior.com</p>
                  <span>Mon - Fri, 9am - 6pm IST</span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon" style={{ background: '#FBF0D5', color: '#A88022' }}>
                  <Phone size={18} />
                </div>
                <div>
                  <h4>Call / WhatsApp</h4>
                  <p>+91 (800) BEE-JR-01</p>
                  <span>Customer Support Care</span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon" style={{ background: '#D8E5EB', color: '#4C7387' }}>
                  <MapPin size={18} />
                </div>
                <div>
                  <h4>Studio Headquarters</h4>
                  <p>Bee Junior Kidswear Pvt Ltd</p>
                  <span>Indiranagar, Bengaluru, KA 560038</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        .contact-page {
          background-color: var(--bg-page);
          min-height: 100vh;
        }

        .contact-container {
          padding: 40px 24px 80px;
        }

        .contact-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .contact-title {
          font-size: 36px;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .contact-sub {
          font-size: 15px;
          color: var(--text-secondary);
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: 40px;
          max-width: 900px;
          margin: 0 auto;
        }

        .contact-card, .info-card {
          background: #FFFFFF;
          border-radius: var(--radius-lg);
          padding: 36px;
          box-shadow: var(--shadow-subtle);
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 16px;
        }

        .form-group label {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .form-group input, .form-group textarea {
          padding: 11px 14px;
          border: 1.5px solid rgba(30, 58, 95, 0.15);
          border-radius: var(--radius-sm);
          font-family: var(--font-body);
          font-size: 14px;
          background-color: var(--bg-page);
          outline: none;
        }

        .form-group input:focus, .form-group textarea:focus {
          border-color: var(--text-primary);
          background-color: #FFFFFF;
        }

        .submitted-box {
          text-align: center;
          padding: 40px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .info-card {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .info-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }

        .info-icon {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .info-item h4 {
          font-size: 14.5px;
          color: var(--text-primary);
          margin-bottom: 2px;
        }

        .info-item p {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .info-item span {
          font-size: 12px;
          color: var(--text-muted);
        }

        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
