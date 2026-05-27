import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Globe, Send, ArrowUp, Zap } from 'lucide-react';
import { XIcon, InstagramIcon, GithubIcon, GmailIcon } from './SocialIcons.jsx';
import Logo from './Logo.jsx';
import './Footer.css';

const Footer = () => {
  const [subscribed, setSubscribed] = React.useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
  };

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
    { icon: <GmailIcon size={16} />, href: 'mailto:hello@pixora.studio', label: 'Email' },
    { icon: <XIcon size={16} />, href: 'https://x.com/Pixora_Studio', label: 'X (Twitter)' },
    { icon: <InstagramIcon size={16} />, href: 'https://www.instagram.com/hi.pixora.studio?igsh=cWJ5Y2Z6OGQzZGw2', label: 'Instagram' },
    { icon: <GithubIcon size={16} />, href: 'https://github.com/Vivek-Biswal/Pixora.git', label: 'GitHub' },
  ];

  return (
    <footer className="footer">
      {/* Gradient top border */}
      <div className="footer__gradient-line" />

      <div className="container">
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
            {subscribed ? (
              <motion.div
                className="newsletter-success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span>🎉 Thanks for subscribing!</span>
              </motion.div>
            ) : (
              <form className="newsletter-form" onSubmit={handleSubscribe}>
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
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer__bottom">
          <div className="footer__copy-row">
            <p className="footer__copy">
              © {new Date().getFullYear()} Pixora Web Studio.
              All rights reserved. Made with ❤️ in India.
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
