import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { MessageCircle, X } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Styles
import './styles/variables.css';
import './styles/base.css';
import './styles/animations.css';
import './styles/components.css';

import Home from './pages/Home/Home.jsx';
import Services from './pages/Services/Services.jsx';
import Portfolio from './pages/Portfolio/Portfolio.jsx';
import About from './pages/About/About.jsx';
import Pricing from './pages/Pricing/Pricing.jsx';
import Contact from './pages/Contact/Contact.jsx';
import Request from './pages/Request/Request.jsx';
import Login from './pages/Login/Login.jsx';
import Signup from './pages/Signup/Signup.jsx';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword.jsx';
import AdminDashboard from './pages/Admin/AdminDashboard.jsx';
import ClientDashboard from './pages/Client/ClientDashboard.jsx';
import PrivacyPolicy from './pages/Legal/PrivacyPolicy.jsx';
import TermsConditions from './pages/Legal/TermsConditions.jsx';
import RefundPolicy from './pages/Legal/RefundPolicy.jsx';
import ShippingPolicy from './pages/Legal/ShippingPolicy.jsx';
import SettingsStub from './pages/Settings/Settings.jsx';
import NotificationsStub from './pages/Notifications/Notifications.jsx';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';

// ─── Protected Route ────────────────────────────────────────────────────────
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', background: '#0a0a0c', color: 'white',
        fontSize: '18px', fontFamily: 'Outfit, sans-serif'
      }}>
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (adminOnly && user?.role !== 'admin') {
    setTimeout(() => toast.error('Not authorized to access Admin panel'), 100);
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

// ─── Redirect authenticated users away from login/signup ────────────────────
const PublicRoute = ({ children }) => {
  const { isAuthenticated, user, loading } = useAuth();
  if (loading) return null;
  if (isAuthenticated) {
    return <Navigate to={user?.role === 'admin' ? '/admin' : '/dashboard'} replace />;
  }
  return children;
};

// ─── Scroll to top on route change ──────────────────────────────────────────
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

// ─── Main site layout (with Navbar + Footer) ────────────────────────────────
const SiteLayout = ({ children }) => (
  <>
    <Navbar />
    <main>{children}</main>
    <Footer />
  </>
);

function App() {
  const WhatsAppButton = () => {
    const location = useLocation();
    const [visible, setVisible] = useState(false);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => setVisible(true), 2500);
      return () => clearTimeout(timer);
    }, []);

    if (location.pathname.startsWith('/admin') || location.pathname.startsWith('/dashboard')) {
      return null;
    }

    const waLink = 'https://wa.me/919818457227?text=' +
      encodeURIComponent(
        'Hi Pixora! I visited your website and I am interested in getting a website built for my business.'
      );

    return (
      <div
        className={`wa-fab ${visible ? 'wa-fab--visible' : ''}`}
        aria-label="Chat on WhatsApp"
      >
        {expanded && (
          <div className="wa-fab__popup">
            <button
              className="wa-fab__close"
              onClick={() => setExpanded(false)}
              aria-label="Close"
            >
              <X size={14} />
            </button>
            <div className="wa-fab__popup-avatar">P</div>
            <div className="wa-fab__popup-body">
              <p className="wa-fab__popup-name">Pixora Team</p>
              <p className="wa-fab__popup-msg">
                Hi! 👋 Ready to build your website in 7 days?
                Chat with us now — it's free!
              </p>
            </div>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="wa-fab__popup-cta"
            >
              Start Chat →
            </a>
          </div>
        )}

        <button
          className="wa-fab__btn"
          onClick={() => setExpanded(!expanded)}
          aria-label="Chat on WhatsApp"
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="white"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.527 5.845L.057 23.882l6.198-1.626A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.802 9.802 0 01-5.001-1.371l-.358-.213-3.72.976 1.001-3.628-.233-.373A9.79 9.79 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
          </svg>
          <span className="wa-fab__pulse" aria-hidden="true" />
        </button>
      </div>
    );
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <ScrollToTop />
        <Routes>
          {/* Public site pages — wrapped in Navbar + Footer */}
          <Route path="/" element={<SiteLayout><Home /></SiteLayout>} />
          <Route path="/services" element={<SiteLayout><Services /></SiteLayout>} />
          <Route path="/portfolio" element={<SiteLayout><Portfolio /></SiteLayout>} />
          <Route path="/about" element={<SiteLayout><About /></SiteLayout>} />
          <Route path="/pricing" element={<SiteLayout><Pricing /></SiteLayout>} />
          <Route path="/contact" element={<SiteLayout><Contact /></SiteLayout>} />
          <Route path="/request" element={<SiteLayout><Request /></SiteLayout>} />
          <Route path="/request/:serviceId" element={<SiteLayout><Request /></SiteLayout>} />
          <Route path="/privacy-policy" element={<SiteLayout><PrivacyPolicy /></SiteLayout>} />
          <Route path="/terms-conditions" element={<SiteLayout><TermsConditions /></SiteLayout>} />
          <Route path="/refund-policy" element={<SiteLayout><RefundPolicy /></SiteLayout>} />
          <Route path="/shipping-policy" element={<SiteLayout><ShippingPolicy /></SiteLayout>} />

          {/* Auth pages — redirect to dashboard if already logged in */}
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Dashboard pages — standalone, no Navbar/Footer */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <ClientDashboard />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <ClientDashboard defaultTab="profile" />
            </ProtectedRoute>
          } />
          <Route path="/billing" element={
            <ProtectedRoute>
              <ClientDashboard defaultTab="billing" />
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute>
              <SettingsStub />
            </ProtectedRoute>
          } />
          <Route path="/notifications" element={
            <ProtectedRoute>
              <NotificationsStub />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute adminOnly={true}>
              <AdminDashboard />
            </ProtectedRoute>
          } />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <WhatsAppButton />
      </Router>
    </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
