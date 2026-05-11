import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
<<<<<<< HEAD
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
=======
import { Mail, Lock, Eye, EyeOff, LogIn, Globe } from 'lucide-react';
>>>>>>> 318d02ee012d758f89ea62caa95d6ee562e4c88e
import toast, { Toaster } from 'react-hot-toast';
import ScrollAnimator from '../../components/ScrollAnimator';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);
    try {
<<<<<<< HEAD
      const firebaseUser = await login(email, password);
      toast.success("Welcome back!");
      
      // The ProtectedRoute and AuthContext handle role fetching.
      // We navigate based on the returnTo or default to dashboard/admin.
      const searchParams = new URLSearchParams(location.search);
      const returnTo = searchParams.get('returnTo');
      
      // Use a timeout to allow AuthContext to update the user object
      setTimeout(() => {
        navigate(returnTo || '/dashboard');
      }, 500);
    } catch (error) {
      console.error(error);
      let message = "Failed to log in";
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        message = "Invalid email or password.";
      }
      toast.error(message);
=======
      await login(email, password);
      toast.success("Welcome back!");
      
      const searchParams = new URLSearchParams(location.search);
      const returnTo = searchParams.get('returnTo');
      navigate(returnTo || '/');
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to log in");
>>>>>>> 318d02ee012d758f89ea62caa95d6ee562e4c88e
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      toast.success("Welcome back!");
      const searchParams = new URLSearchParams(location.search);
      const returnTo = searchParams.get('returnTo');
<<<<<<< HEAD
      
      setTimeout(() => {
        navigate(returnTo || '/dashboard');
      }, 500);
    } catch (error) {
      console.error("DEBUG: Google Login Failed", error);
      if (error.code === 'auth/popup-closed-by-user') {
        toast.error("Sign-in popup was closed.");
      } else if (error.code === 'auth/unauthorized-domain') {
        toast.error("Domain unauthorized. Please add your Vercel URL in Firebase Console > Auth > Settings > Authorized Domains.");
      } else if (error.code === 'auth/internal-error') {
        toast.error("Internal Firebase error. Try again in a moment.");
      } else {
        toast.error(`Google sign-in failed: ${error.code}`);
      }
=======
      navigate(returnTo || '/');
    } catch (error) {
      console.error(error);
      toast.error("Google sign in failed.");
>>>>>>> 318d02ee012d758f89ea62caa95d6ee562e4c88e
    }
  };

  return (
    <div className="auth-page">
      <Toaster position="top-right" />
<<<<<<< HEAD
=======
      {/* Background elements for premium feel */}
>>>>>>> 318d02ee012d758f89ea62caa95d6ee562e4c88e
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
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <label className="form-label" style={{ marginBottom: 0 }}>Password</label>
                  <Link to="/forgot-password" style={{ fontSize: '12px', color: 'var(--color-blue)', textDecoration: 'none' }}>Forgot password?</Link>
                </div>
                <div className="input-with-icon">
                  <Lock className="input-icon" size={18} />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    className="form-control" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

              <button type="submit" className="btn btn--primary btn--block" disabled={isSubmitting}>
                {isSubmitting ? 'Logging in...' : 'Log In'} <LogIn size={18} style={{ marginLeft: '8px' }} />
              </button>
            </form>

            <div className="auth-divider">
              <span>or continue with</span>
            </div>
            
            <button type="button" className="btn btn--outline btn--block google-btn" onClick={handleGoogleLogin}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Sign in with Google
            </button>
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
