import React from 'react';
import '../css/Footer.css'; // Import the CSS file that contains footer styles

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content-wrapper">
        <div className="footer-grid">
          <div className="footer-col footer-col-logo">
            <h4 className="footer-logo">Shreemcraft</h4>
            <p className="footer-tagline">
              Custom handmade goods that inspire.
            </p>
            <input
              type="email"
              placeholder="Email Address"
              className="newsletter-input"
            />
            <button className="newsletter-button">SUBSCRIBE</button>
          </div>

          <div className="footer-links-grid">
            <div className="footer-col">
              <p className="footer-heading">CONTACT</p>
              <span className="footer-link-item">+(123) 456-7890</span>
              <span className="footer-link-item">hello@shreemcraft.com</span>
              <span className="footer-link-item">123 Artisan Alley</span>
            </div>

            <div className="footer-col">
              <p className="footer-heading">HELP</p>
              <span className="footer-link-item">SHIPPING & RETURNS</span>
              <span className="footer-link-item">STORE POLICY</span>
              <span className="footer-link-item">FAQ</span>
            </div>

            <div className="footer-col">
              <p className="footer-heading">COMPANY</p>
              <span className="footer-link-item">ABOUT US</span>
              <span className="footer-link-item">WORK WITH US</span>
              <span className="footer-link-item">PRIVACY POLICY</span>
              <span className="footer-link-item">TERMS & CONDITIONS</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}