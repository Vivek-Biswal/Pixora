import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, MessageCircle, Camera, Briefcase, Code, Send, ArrowUp } from 'lucide-react';
import Logo from './Logo.jsx';
import './Footer.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo />
            <p>
              Crafting premium digital experiences for forward-thinking brands. 
              We blend innovative design with robust technology to help your business grow.
            </p>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <div className="footer-links">
              <Link to="/" className="footer-link">Home</Link>
              <Link to="/services" className="footer-link">Services</Link>
              <Link to="/portfolio" className="footer-link">Portfolio</Link>
              <Link to="/about" className="footer-link">About Us</Link>
              <Link to="/contact" className="footer-link">Contact</Link>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Services</h4>
            <div className="footer-links">
              <Link to="/services" className="footer-link">Web Design</Link>
              <Link to="/services" className="footer-link">Development</Link>
              <Link to="/services" className="footer-link">E-commerce</Link>
              <Link to="/services" className="footer-link">SEO Optimization</Link>
              <Link to="/services" className="footer-link">Maintenance</Link>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Legal</h4>
            <div className="footer-links">
              <Link to="/privacy-policy" className="footer-link">Privacy Policy</Link>
              <Link to="/terms-conditions" className="footer-link">Terms & Conditions</Link>
              <Link to="/refund-policy" className="footer-link">Refund Policy</Link>
              <Link to="/shipping-policy" className="footer-link">Shipping Policy</Link>
            </div>
          </div>

          <div className="footer-col footer-newsletter">
            <h4 className="footer-heading">Stay Updated</h4>
            <p>Subscribe to our newsletter for the latest design trends and studio updates.</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Email Address" required />
              <button type="submit" className="btn btn--primary btn--sm">
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copy">
            &copy; {new Date().getFullYear()} Pixora Web Design Studio. All rights reserved.
          </div>
          
          <div className="footer-socials">
            <a href="#" className="social-link"><Globe size={18} /></a>
            <a href="#" className="social-link"><MessageCircle size={18} /></a>
            <a href="#" className="social-link"><Camera size={18} /></a>
            <a href="#" className="social-link"><Briefcase size={18} /></a>
            <a href="#" className="social-link"><Code size={18} /></a>
          </div>

          <button className="social-link" onClick={scrollToTop} title="Back to Top">
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
