import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, ArrowRight, LayoutDashboard, LogOut, Sun, Moon,
  User, Settings, Bell, CreditCard, ChevronRight, ChevronDown, Zap, Home
} from 'lucide-react';
import Logo from './Logo.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const dropdownRef = useRef(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownTimeoutRef = useRef(null);

  // Cleanup dropdown timeout on unmount
  useEffect(() => {
    return () => clearTimeout(dropdownTimeoutRef.current);
  }, []);

  const handleDropdownEnter = (name) => {
    clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(name);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); setProfileOpen(false); setActiveDropdown(null); }, [location]);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    if (profileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [profileOpen]);

  // Close dropdown on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') { setProfileOpen(false); setActiveDropdown(null); }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  const navItems = [
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'About', path: '/about' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Contact', path: '/contact' },
  ];

  const getInitials = () => {
    if (user?.name) {
      const parts = user.name.split(' ');
      return parts.length > 1
        ? (parts[0][0] + parts[1][0]).toUpperCase()
        : parts[0].substring(0, 2).toUpperCase();
    }
    if (user?.email) return user.email.substring(0, 2).toUpperCase();
    return 'U';
  };

  const handleLogout = async () => {
    setProfileOpen(false);
    await logout();
    navigate('/');
  };

  return (
    <>
      <motion.nav
        className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container navbar__inner">
          {/* Brand */}
          <Link to="/" className="nav-brand" aria-label="Pixora home">
            <Logo />
          </Link>

          {/* Desktop Nav Links */}
          <ul className="nav-links" role="list">
            {navItems.map((item) => {
              /* ─── Services Mega-Menu ─── */
              if (item.name === 'Services') {
                return (
                  <li
                    key={item.name}
                    className="nav-dropdown-trigger"
                    onMouseEnter={() => handleDropdownEnter('services')}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `nav-link nav-link--has-dropdown ${isActive ? 'active' : ''} ${activeDropdown === 'services' ? 'nav-link--dropdown-open' : ''}`
                      }
                    >
                      {item.name}
                      <ChevronDown
                        size={14}
                        className={`nav-link__chevron ${activeDropdown === 'services' ? 'nav-link__chevron--open' : ''}`}
                      />
                    </NavLink>
                    <AnimatePresence>
                      {activeDropdown === 'services' && (
                        <motion.div
                          className="nav-mega"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <div className="nav-mega__grid">
                            <div className="nav-mega__section">
                              <div className="nav-mega__section-title">What We Build</div>
                              <Link to="/services" className="nav-mega__item" onClick={() => setActiveDropdown(null)}>
                                <div className="nav-mega__item-title">Business Websites</div>
                                <div className="nav-mega__item-desc">Custom corporate sites that build trust.</div>
                              </Link>
                              <Link to="/services" className="nav-mega__item" onClick={() => setActiveDropdown(null)}>
                                <div className="nav-mega__item-title">E-Commerce Solutions</div>
                                <div className="nav-mega__item-desc">Online stores that convert visitors.</div>
                              </Link>
                              <Link to="/services" className="nav-mega__item" onClick={() => setActiveDropdown(null)}>
                                <div className="nav-mega__item-title">Portfolio Websites</div>
                                <div className="nav-mega__item-desc">Visual platforms for creatives.</div>
                              </Link>
                              <Link to="/services" className="nav-mega__item" onClick={() => setActiveDropdown(null)}>
                                <div className="nav-mega__item-title">Landing Pages</div>
                                <div className="nav-mega__item-desc">High-conversion marketing pages.</div>
                              </Link>
                            </div>
                            <div className="nav-mega__section">
                              <div className="nav-mega__section-title">What We Do</div>
                              <Link to="/services" className="nav-mega__item" onClick={() => setActiveDropdown(null)}>
                                <div className="nav-mega__item-title">SEO Optimization</div>
                                <div className="nav-mega__item-desc">Boost your organic search visibility.</div>
                              </Link>
                              <Link to="/services" className="nav-mega__item" onClick={() => setActiveDropdown(null)}>
                                <div className="nav-mega__item-title">Maintenance & Care</div>
                                <div className="nav-mega__item-desc">Keep your site running 24/7.</div>
                              </Link>
                              <Link to="/services" className="nav-mega__item" onClick={() => setActiveDropdown(null)}>
                                <div className="nav-mega__item-title">Website Redesign</div>
                                <div className="nav-mega__item-desc">Modernize your digital presence.</div>
                              </Link>
                              <Link to="/services" className="nav-mega__item" onClick={() => setActiveDropdown(null)}>
                                <div className="nav-mega__item-title">Custom Solutions</div>
                                <div className="nav-mega__item-desc">Tailored web apps for your needs.</div>
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              }

              /* ─── Portfolio Mega-Menu ─── */
              if (item.name === 'Portfolio') {
                return (
                  <li
                    key={item.name}
                    className="nav-dropdown-trigger"
                    onMouseEnter={() => handleDropdownEnter('portfolio')}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `nav-link nav-link--has-dropdown ${isActive ? 'active' : ''} ${activeDropdown === 'portfolio' ? 'nav-link--dropdown-open' : ''}`
                      }
                    >
                      {item.name}
                      <ChevronDown
                        size={14}
                        className={`nav-link__chevron ${activeDropdown === 'portfolio' ? 'nav-link__chevron--open' : ''}`}
                      />
                    </NavLink>
                    <AnimatePresence>
                      {activeDropdown === 'portfolio' && (
                        <motion.div
                          className="nav-mega"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <div className="nav-mega__grid">
                            <div className="nav-mega__section">
                              <div className="nav-mega__section-title">Browse by Category</div>
                              <Link to="/portfolio" className="nav-mega__item" onClick={() => setActiveDropdown(null)}>
                                <div className="nav-mega__item-title">Business</div>
                                <div className="nav-mega__item-desc">Corporate & agency websites.</div>
                              </Link>
                              <Link to="/portfolio" className="nav-mega__item" onClick={() => setActiveDropdown(null)}>
                                <div className="nav-mega__item-title">E-Commerce</div>
                                <div className="nav-mega__item-desc">Online stores & marketplaces.</div>
                              </Link>
                              <Link to="/portfolio" className="nav-mega__item" onClick={() => setActiveDropdown(null)}>
                                <div className="nav-mega__item-title">Portfolio</div>
                                <div className="nav-mega__item-desc">Creative & personal showcases.</div>
                              </Link>
                              <Link to="/portfolio" className="nav-mega__item" onClick={() => setActiveDropdown(null)}>
                                <div className="nav-mega__item-title">Landing Pages</div>
                                <div className="nav-mega__item-desc">Campaign & product pages.</div>
                              </Link>
                            </div>
                            <div className="nav-mega__section">
                              <div className="nav-mega__section-title">Featured</div>
                              <div className="nav-mega__featured">
                                <div className="nav-mega__featured-badge">50+ Projects</div>
                                <p className="nav-mega__featured-text">
                                  Explore our portfolio of premium websites built for Indian businesses across industries.
                                </p>
                                <Link
                                  to="/portfolio"
                                  className="nav-mega__featured-link"
                                  onClick={() => setActiveDropdown(null)}
                                >
                                  View All Projects <ArrowRight size={14} />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              }

              /* ─── Regular Nav Link ─── */
              return (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  >
                    {item.name}
                  </NavLink>
                </li>
              );
            })}
          </ul>

          {/* Desktop Actions */}
          <div className="nav-actions">
            <button 
              className="icon-btn" 
              onClick={() => navigate('/')} 
              aria-label="Home"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', 
                width: '38px', height: '38px', 
                borderRadius: '8px', 
                background: 'rgba(255,255,255,0.03)', 
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                marginRight: '12px'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
            >
              <Home size={20} strokeWidth={2} />
            </button>
            {isAuthenticated ? (
              /* ── Premium Profile Menu ── */
              <div ref={dropdownRef} style={{ position: 'relative' }}>
                <button
                  className="profile-avatar-btn"
                  onClick={() => setProfileOpen(!profileOpen)}
                  aria-label="Profile menu"
                  aria-expanded={profileOpen}
                >
                  {user?.photoURL ? (
                    <img src={user.photoURL} alt={user.name || 'Profile'} />
                  ) : (
                    getInitials()
                  )}
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      className="profile-dropdown"
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {/* Header */}
                      <div className="profile-dropdown__header">
                        <div className="profile-dropdown__avatar">{getInitials()}</div>
                        <div className="profile-dropdown__info">
                          <div className="profile-dropdown__name">{user?.name || 'User'}</div>
                          <div className="profile-dropdown__email">{user?.email}</div>
                        </div>
                      </div>

                      {/* Body */}
                      <div className="profile-dropdown__body">
                        <Link
                          to={user?.role === 'admin' ? '/admin' : '/dashboard'}
                          className="profile-dropdown__item"
                          onClick={() => setProfileOpen(false)}
                        >
                          <LayoutDashboard size={16} />
                          Dashboard
                          <ChevronRight size={14} style={{ marginLeft: 'auto', opacity: 0.4 }} />
                        </Link>

                        <Link
                          to="/dashboard"
                          className="profile-dropdown__item"
                          onClick={() => setProfileOpen(false)}
                        >
                          <User size={16} />
                          Profile
                        </Link>

                        <Link
                          to="/dashboard"
                          className="profile-dropdown__item"
                          onClick={() => setProfileOpen(false)}
                        >
                          <Settings size={16} />
                          Settings
                        </Link>

                        <div className="profile-dropdown__divider" />

                        <button
                          className="profile-dropdown__theme-row"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleTheme();
                          }}
                        >
                          {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
                          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                          <div className="profile-dropdown__theme-toggle" />
                        </button>

                        <Link
                          to="/dashboard"
                          className="profile-dropdown__item"
                          onClick={() => setProfileOpen(false)}
                        >
                          <Bell size={16} />
                          Notifications
                        </Link>

                        <Link
                          to="/pricing"
                          className="profile-dropdown__item"
                          onClick={() => setProfileOpen(false)}
                        >
                          <CreditCard size={16} />
                          Billing
                        </Link>
                      </div>

                      {/* Footer */}
                      <div className="profile-dropdown__footer">
                        <button
                          className="profile-dropdown__item profile-dropdown__item--danger"
                          onClick={handleLogout}
                        >
                          <LogOut size={16} />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn--ghost btn--sm">Login</Link>
                <div className="nav-actions-divider" aria-hidden="true" />
                <Link to="/request" className="btn btn--primary btn--sm">
                  Get a Quote <ArrowRight size={15} />
                </Link>
              </>
            )}
            
            {/* Mobile Toggle */}
            <button
              className="mobile-toggle"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X size={22} />
                  </motion.span>
                ) : (
                  <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu size={22} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="nav-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="nav-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          >
            <div className="nav-drawer__header">
              <Logo />
              <button className="icon-btn" onClick={() => setIsOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <ul className="nav-drawer__links" role="list">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i + 0.1 }}
                >
                  {item.name === 'Services' || item.name === 'Portfolio' ? (
                    <div className="nav-drawer__accordion">
                      <button 
                        className={`nav-drawer__accordion-trigger ${mobileExpanded === item.name ? 'active' : ''}`}
                        onClick={() => setMobileExpanded(mobileExpanded === item.name ? null : item.name)}
                      >
                        {item.name}
                        <ChevronDown size={18} className={`nav-drawer__accordion-icon ${mobileExpanded === item.name ? 'open' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {mobileExpanded === item.name && (
                          <motion.div 
                            className="nav-drawer__accordion-content"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                          >
                            {item.name === 'Services' && (
                              <div className="mobile-sub-menu">
                                <div className="mobile-sub-title">What We Build</div>
                                <Link to="/services" className="mobile-sub-link" onClick={() => setIsOpen(false)}>Business Websites</Link>
                                <Link to="/services" className="mobile-sub-link" onClick={() => setIsOpen(false)}>E-Commerce Solutions</Link>
                                <Link to="/services" className="mobile-sub-link" onClick={() => setIsOpen(false)}>Portfolio Websites</Link>
                                <Link to="/services" className="mobile-sub-link" onClick={() => setIsOpen(false)}>Landing Pages</Link>
                                
                                <div className="mobile-sub-title">What We Do</div>
                                <Link to="/services" className="mobile-sub-link" onClick={() => setIsOpen(false)}>SEO Optimization</Link>
                                <Link to="/services" className="mobile-sub-link" onClick={() => setIsOpen(false)}>Maintenance & Care</Link>
                                <Link to="/services" className="mobile-sub-link" onClick={() => setIsOpen(false)}>Website Redesign</Link>
                                <Link to="/services" className="mobile-sub-link" onClick={() => setIsOpen(false)}>Custom Solutions</Link>
                              </div>
                            )}
                            {item.name === 'Portfolio' && (
                              <div className="mobile-sub-menu">
                                <div className="mobile-sub-title">Browse by Category</div>
                                <Link to="/portfolio" className="mobile-sub-link" onClick={() => setIsOpen(false)}>Business</Link>
                                <Link to="/portfolio" className="mobile-sub-link" onClick={() => setIsOpen(false)}>E-Commerce</Link>
                                <Link to="/portfolio" className="mobile-sub-link" onClick={() => setIsOpen(false)}>Portfolio</Link>
                                <Link to="/portfolio" className="mobile-sub-link" onClick={() => setIsOpen(false)}>Landing Pages</Link>
                                
                                <div className="mobile-sub-title">Featured</div>
                                <Link to="/portfolio" className="mobile-sub-link mobile-sub-link--featured" onClick={() => setIsOpen(false)}>
                                  View All Projects <ArrowRight size={14}/>
                                </Link>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => `nav-drawer__link ${isActive ? 'active' : ''}`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </NavLink>
                  )}
                </motion.li>
              ))}
            </ul>

            <div className="nav-drawer__actions">
              {isAuthenticated ? (
                <>
                  <Link to={user?.role === 'admin' ? '/admin' : '/dashboard'} className="btn btn--secondary" style={{ width: '100%' }}>
                    <LayoutDashboard size={16} /> Dashboard
                  </Link>
                  <button onClick={handleLogout} className="btn btn--ghost" style={{ width: '100%' }}>
                    <LogOut size={16} /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/request" className="btn btn--primary" style={{ width: '100%' }}>
                    <Zap size={16} /> Get Started Free
                  </Link>
                  <Link to="/login" className="btn btn--ghost" style={{ width: '100%' }}>
                    Login
                  </Link>
                </>
              )}
              
              <button
                onClick={toggleTheme}
                className="nav-drawer__theme-mini"
                aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              >
                {theme === 'light' ? <Moon size={15} /> : <Sun size={15} />}
                <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
