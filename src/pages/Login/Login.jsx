import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, LogIn, Globe } from 'lucide-react';
import ScrollAnimator from '../../components/ScrollAnimator';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
    login(email || 'user@example.com');
    
    // Check if we need to return to a specific page
    const searchParams = new URLSearchParams(location.search);
    const returnTo = searchParams.get('returnTo');
    
    if (returnTo) {
      navigate(returnTo);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="auth-page">
      {/* Background elements for premium feel */}
      <div className="auth-bg-glow glow-1"></div>
      <div className="auth-bg-glow glow-2"></div>
      <div className="auth-grid"></div>

      <div className="container auth-container">
        <ScrollAnimator animation="fade-in" className="auth-wrapper">
          <div className="auth-card">
            <div className="auth-header">
              <h2>Welcome back</h2>
              <p>Log in to access your Pixora dashboard and manage your projects.</p>
            </div>

            <form className="auth-form" onSubmit={handleLogin}>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <div className="input-with-icon">
                  <Mail className="input-icon" size={18} />
                  <input 
                    type="email" 
                    className="form-control" 
                    placeholder="hello@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="input-with-icon">
                  <Lock className="input-icon" size={18} />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    className="form-control" 
                    placeholder="••••••••" 
                    required 
                  />
                  <button 
                    type="button" 
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="auth-options">
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span className="checkbox-custom"></span>
                  Remember me
                </label>
                <a href="#" className="forgot-password">Forgot Password?</a>
              </div>

              <button type="submit" className="btn btn--primary btn--block btn--lg">
                Sign In <LogIn size={18} style={{ marginLeft: '8px' }} />
              </button>
              
              <div className="auth-divider">
                <span>OR</span>
              </div>
              
              <button type="button" className="btn btn--white btn--block btn--lg social-btn">
                <Globe size={18} style={{ marginRight: '12px', color: '#4F6EF7' }} /> 
                Continue with Google
              </button>
            </form>
          </div>
          
          <p className="auth-footer-text">
            Don't have an account? <Link to="/signup">Sign up for free</Link>
          </p>
        </ScrollAnimator>
      </div>
    </div>
  );
};

export default Login;
