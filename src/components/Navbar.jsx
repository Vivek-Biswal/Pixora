import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, ArrowRight, LayoutDashboard, LogOut, Sun, Moon,
  User, Settings, Bell, CreditCard, ChevronRight, Zap, Home
} from 'lucide-react';
import Logo from './Logo.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); setProfileOpen(false); }, [location]);

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
      if (e.key === 'Escape') setProfileOpen(false);
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
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
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
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => `nav-drawer__link ${isActive ? 'active' : ''}`}
                  >
                    {item.name}
                  </NavLink>
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
