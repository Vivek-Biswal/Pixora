import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Send } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import ScrollAnimator from '../../components/ScrollAnimator';
import { useAuth } from '../../context/AuthContext';
import '../Login/Auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const { resetPassword } = useAuth();

  const handleReset = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    setIsSubmitting(true);
    try {
      await resetPassword(email);
      setIsSent(true);
      toast.success("Password reset link sent!");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to send reset link");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <Toaster position="top-right" />
      <div className="auth-bg-glow glow-1"></div>
      <div className="auth-bg-glow glow-2"></div>
      <div className="auth-grid"></div>

      <div className="container auth-container">
        <ScrollAnimator animation="fade-in" className="auth-wrapper">
          <div className="auth-card">
            <div className="auth-header">
              <h2>Reset Password</h2>
              <p>
                {isSent 
                  ? "Check your email for a link to reset your password. If it doesn't appear within a few minutes, check your spam folder."
                  : "Enter your email address and we'll send you a link to reset your password."}
              </p>
            </div>

            {!isSent ? (
              <form className="auth-form" onSubmit={handleReset}>
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

                <button type="submit" className="btn btn--primary btn--block" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Reset Link'} <Send size={18} style={{ marginLeft: '8px' }} />
                </button>
              </form>
            ) : (
              <button onClick={() => setIsSent(false)} className="btn btn--outline btn--block">
                Try another email
              </button>
            )}
            
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <Link to="/login" style={{ color: 'var(--color-gray-400)', textDecoration: 'none', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <ArrowLeft size={16} /> Back to Login
              </Link>
            </div>
          </div>
        </ScrollAnimator>
      </div>
    </div>
  );
};

export default ForgotPassword;
