import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, UserPlus, Globe } from 'lucide-react';
import ScrollAnimator from '../../components/ScrollAnimator';
import { useAuth } from '../../context/AuthContext';
import '../Login/Auth.css';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignup = (e) => {
    e.preventDefault();
    login(email || 'user@example.com'); // Auto login on signup for demo
    
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
              <h2>Create an account</h2>
              <p>Join Pixora to start building your next great digital experience.</p>
            </div>

            <form className="auth-form" onSubmit={handleSignup}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <div className="input-with-icon">
                  <User className="input-icon" size={18} />
                  <input type="text" className="form-control" placeholder="John Doe" required />
                </div>
              </div>

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

              <button type="submit" className="btn btn--primary btn--block btn--lg" style={{ marginTop: 'var(--space-8)' }}>
                Create Account <UserPlus size={18} style={{ marginLeft: '8px' }} />
              </button>
              
              <div className="auth-divider">
                <span>OR</span>
              </div>
              
              <button type="button" className="btn btn--white btn--block btn--lg social-btn">
                <Globe size={18} style={{ marginRight: '12px', color: '#4F6EF7' }} /> 
                Sign up with Google
              </button>
            </form>
          </div>
          
          <p className="auth-footer-text">
            Already have an account? <Link to="/login">Log in here</Link>
          </p>
        </ScrollAnimator>
      </div>
    </div>
  );
};

export default Signup;
