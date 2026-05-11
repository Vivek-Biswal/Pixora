import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
import { AuthProvider, useAuth } from './context/AuthContext.jsx';

// ─── Protected Route ────────────────────────────────────────────────────────
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, isAuthenticated, loading } = useAuth();

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
  if (adminOnly && user?.role !== 'admin') return <Navigate to="/dashboard" replace />;

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
  return (
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
          <Route path="/admin" element={
            <ProtectedRoute adminOnly={true}>
              <AdminDashboard />
            </ProtectedRoute>
          } />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
