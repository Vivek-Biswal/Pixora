import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Globe, Send, ArrowUp, Zap, Mail, Phone, MapPin, MessageCircle, Camera, Code2 } from 'lucide-react';
import { XIcon, InstagramIcon, GithubIcon, GmailIcon } from './SocialIcons.jsx';
import Logo from './Logo.jsx';
import './Footer.css';

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const footerLinks = {
    'Company': [
      { label: 'About Us',     to: '/about'     },
      { label: 'Portfolio',    to: '/portfolio'  },
      { label: 'Pricing',      to: '/pricing'    },
      { label: 'Contact',      to: '/contact'    },
      { label: 'Get a Quote',  to: '/request'    },
    ],
    'Services': [
      { label: 'Business Websites', to: '/services' },
      { label: 'E-Commerce Stores', to: '/services' },
      { label: 'SEO Optimization',  to: '/services' },
      { label: 'Landing Pages',     to: '/services' },
      { label: 'Maintenance',       to: '/services' },
    ],
    'Legal': [
      { label: 'Privacy Policy',    to: '/privacy-policy'    },
      { label: 'Terms & Conditions',to: '/terms-conditions'  },
      { label: 'Refund Policy',     to: '/refund-policy'     },
      { label: 'Shipping Policy',   to: '/shipping-policy'   },
    ],
  };

  const socials = [
    {
      icon: <MessageCircle size={16} />,
      href: 'https://wa.me/919876543210',
      label: 'WhatsApp',
    },
    {
      icon: <Camera size={16} />,
      href: 'https://instagram.com/pixora.studio',
      label: 'Instagram',
    },
    {
      icon: <Globe size={16} />,
      href: 'https://linkedin.com/company/pixora',
      label: 'LinkedIn',
    },
    {
      icon: <Code2 size={16} />,
      href: 'https://github.com/pixora',
      label: 'GitHub',
    },
  ];

  return (
    <footer className="footer">
      {/* Gradient top border */}
      <div className="footer__gradient-line" />

      <div className="container">
        <div className="footer__contact-strip">
          <div className="footer__contact-item">
            <Mail size={15} />
            <a href="mailto:hello@pixora.studio">hello@pixora.studio</a>
          </div>
          <div className="footer__contact-divider" />
          <div className="footer__contact-item">
            <Phone size={15} />
            <a href="tel:+919876543210">+91 98765 43210</a>
          </div>
          <div className="footer__contact-divider" />
          <div className="footer__contact-item">
            <MapPin size={15} />
            <span>Bhubaneswar, Odisha, India</span>
          </div>
        </div>
        {/* Main Grid */}
        <div className="footer__grid">
          {/* Brand Column */}
          <div className="footer__brand">
            <Logo />
            <p className="footer__tagline">
              Premium done-for-you websites for Indian businesses.
              Delivered in 7 days. Owned by you. Forever.
            </p>
            <Link to="/request" className="btn btn--primary btn--sm footer__cta">
              <Zap size={14} /> Get a Free Quote
            </Link>
            {/* Socials */}
            <div className="footer__socials">
              {socials.map((s) => (
                <a key={s.label} href={s.href} className="social-link" aria-label={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading} className="footer__col">
              <h4 className="footer__heading">{heading}</h4>
              <ul className="footer__links">
                {links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="footer__link">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div className="footer__newsletter">
            <h4 className="footer__heading">Stay Updated</h4>
            <p>Get design tips, case studies, and Pixora updates.</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                className="newsletter-input"
                placeholder="your@email.com"
                required
              />
              <button type="submit" className="btn btn--primary btn--sm newsletter-btn">
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer__bottom">
          <div className="footer__copy-row">
            <p className="footer__copy">
              © {new Date().getFullYear()} Pixora Web Studio.
              All rights reserved. Made with ❤️ in India.
            </p>
            <p className="footer__copy footer__gst">
              GST: 21XXXXX0000X1ZX
            </p>
          </div>
          <motion.button
            className="back-to-top"
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            title="Back to top"
          >
            <ArrowUp size={16} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
