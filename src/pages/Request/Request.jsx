import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Check, ArrowRight, ArrowLeft, Send, Sparkles, User, Briefcase, Calendar, AlertCircle, UploadCloud } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import ScrollAnimator from '../../components/ScrollAnimator';
import { useAuth } from '../../context/AuthContext';
import { submitProjectRequest } from '../../services/db';

const Request = () => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  // Temporary local state for form preserving
  const [formData, setFormData] = useState({
    name: '', company: '', email: '', phone: '',
    category: '', description: '', budget: '', deadline: ''
  });
  const [file, setFile] = useState(null);

  // Load saved progress on mount
  useEffect(() => {
    const savedData = localStorage.getItem('pixora_request_data');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
    const savedStep = localStorage.getItem('pixora_request_step');
    if (savedStep && isAuthenticated) {
      setStep(parseInt(savedStep, 10));
      localStorage.removeItem('pixora_request_step');
    } else if (savedStep && parseInt(savedStep, 10) === 4 && !isAuthenticated) {
      setStep(3); // push back if not auth
    }
  }, [isAuthenticated]);

  // Save progress on change
  useEffect(() => {
    localStorage.setItem('pixora_request_data', JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (step === 3 && !isAuthenticated) {
      localStorage.setItem('pixora_request_step', '4');
      navigate('/login?returnTo=/request');
      return;
    }
    setStep(step + 1);
  };
  
  const prevStep = () => setStep(step - 1);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) return;

    setIsSubmitting(true);
    try {
      await submitProjectRequest(user.uid, formData, file);
      setSubmitted(true);
      localStorage.removeItem('pixora_request_data');
      localStorage.removeItem('pixora_request_step');
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="request-page" style={{ paddingTop: 'var(--navbar-height)', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <div className="container">
          <ScrollAnimator animation="scale-up" className="card" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto', padding: 'var(--space-16)' }}>
            <div className="icon-box" style={{ margin: '0 auto var(--space-6)', width: '80px', height: '80px', background: 'var(--color-blue)', color: 'white' }}>
              <Check size={40} />
            </div>
            <h2>Request Received!</h2>
            <p style={{ margin: 'var(--space-4) 0 var(--space-8)' }}>
              Thank you for choosing Pixora. Our team will review your project details 
              and reach out to you within the next 24 hours to schedule a discovery call.
            </p>
            <a href="/" className="btn btn--primary">Return Home</a>
          </ScrollAnimator>
        </div>
      </div>
    );
  }

  return (
    <div className="request-page" style={{ paddingTop: 'var(--navbar-height)' }}>
      <Toaster position="top-right" />
      <section className="section" style={{ textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '-50%', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 60%)', filter: 'blur(60px)', zIndex: 0, pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <ScrollAnimator animation="fade-in">
            <span className="section-badge">Project Planner</span>
            <h1 style={{ fontSize: 'var(--fs-h1)', letterSpacing: 'var(--ls-tightest)' }}>Let's build your vision</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Tell us about your project and we'll help you find the best solution.</p>
          </ScrollAnimator>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {/* Progress Bar */}
            <div style={{ marginBottom: 'var(--space-12)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                {['Basic Info', 'Project Details', 'Budget & Timeline', 'Review'].map((s, i) => (
                  <span key={i} style={{ 
                    fontSize: '13px', fontWeight: '600', letterSpacing: '0.02em',
                    color: step > i ? 'var(--text-primary)' : 'var(--text-muted)'
                  }}>
                    {s}
                  </span>
                ))}
              </div>
              <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '999px', overflow: 'hidden', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.2)' }}>
                <div style={{ 
                  width: `${(step / 4) * 100}%`, height: '100%', 
                  background: 'linear-gradient(135deg, var(--color-accent), #60a5fa)', 
                  boxShadow: '0 0 10px rgba(139, 92, 246, 0.5)',
                  transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  borderRadius: '999px'
                }}></div>
              </div>
            </div>

            <div className="card" style={{ padding: 'var(--space-10)', background: 'var(--glass-bg)', backdropFilter: 'blur(12px)', border: '1px solid var(--border-subtle)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  <ScrollAnimator animation="fade-in">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: 'var(--space-6)' }}>
                      <User style={{ color: 'var(--color-accent)' }} />
                      <h3 style={{ margin: 0, fontSize: 'var(--fs-h4)' }}>Step 1: Personal Information</h3>
                    </div>
                    <div className="grid-2">
                      <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" placeholder="John Doe" required />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Company Name</label>
                        <input type="text" name="company" value={formData.company} onChange={handleChange} className="form-control" placeholder="Acme Inc." />
                      </div>
                    </div>
                    <div className="grid-2">
                      <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" placeholder="john@company.com" required />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Phone Number</label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="form-control" placeholder="+1 (555) 000-0000" />
                      </div>
                    </div>
                  </ScrollAnimator>
                )}

                {step === 2 && (
                  <ScrollAnimator animation="fade-in">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: 'var(--space-6)' }}>
                      <Briefcase style={{ color: 'var(--color-accent)' }} />
                      <h3 style={{ margin: 0, fontSize: 'var(--fs-h4)' }}>Step 2: Project Details</h3>
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ color: 'var(--text-secondary)' }}>Project Category</label>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '12px' }}>
                        {['Business Website', 'E-commerce', 'Portfolio', 'Redesign', 'Other'].map(cat => (
                          <label key={cat} style={{ 
                            padding: '16px 12px', borderRadius: '12px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', cursor: 'pointer', fontSize: '14px', fontWeight: '500',
                            background: formData.category === cat ? 'rgba(139, 92, 246, 0.15)' : 'var(--glass-bg)',
                            border: '1px solid',
                            borderColor: formData.category === cat ? 'var(--color-accent)' : 'var(--border-subtle)',
                            color: formData.category === cat ? '#fff' : 'var(--text-secondary)',
                            transition: 'all 0.2s ease',
                            boxShadow: formData.category === cat ? '0 0 15px rgba(139, 92, 246, 0.2)' : 'none'
                          }}>
                            <input type="radio" name="category" value={cat} checked={formData.category === cat} onChange={handleChange} style={{ display: 'none' }} /> 
                            {cat}
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Description of your needs</label>
                      <textarea name="description" value={formData.description} onChange={handleChange} className="form-control" placeholder="Tell us what you want to achieve..." style={{ height: '150px' }}></textarea>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Upload Reference Files (Temporarily Disabled)</label>
                      <div style={{ 
                        border: '2px dashed var(--color-gray-300)', borderRadius: 'var(--radius-lg)', 
                        padding: '2rem', textAlign: 'center', cursor: 'not-allowed', background: 'var(--color-frost)',
                        opacity: 0.6
                      }}>
                        <UploadCloud size={32} style={{ color: 'var(--color-gray-400)', marginBottom: '10px' }} />
                        <p style={{ margin: 0, fontSize: '14px', color: 'var(--color-gray-500)' }}>
                          File uploads are currently being activated. <br />
                          Please share links to your files in the description above instead.
                        </p>
                      </div>
                    </div>
                  </ScrollAnimator>
                )}

                {step === 3 && (
                  <ScrollAnimator animation="fade-in">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: 'var(--space-6)' }}>
                      <Calendar style={{ color: 'var(--color-accent)' }} />
                      <h3 style={{ margin: 0, fontSize: 'var(--fs-h4)' }}>Step 3: Budget & Timeline</h3>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Estimated Budget</label>
                      <select name="budget" value={formData.budget} onChange={handleChange} className="form-control" style={{ background: 'var(--color-bg)', color: 'var(--text-primary)' }}>
                        <option value="" style={{ background: 'var(--color-bg)', color: 'var(--text-primary)' }}>Select budget</option>
                        <option style={{ background: 'var(--color-bg)', color: 'var(--text-primary)' }}>₹50,000 - ₹1,00,000</option>
                        <option style={{ background: 'var(--color-bg)', color: 'var(--text-primary)' }}>₹1,00,000 - ₹2,50,000</option>
                        <option style={{ background: 'var(--color-bg)', color: 'var(--text-primary)' }}>₹2,50,000 - ₹5,00,000</option>
                        <option style={{ background: 'var(--color-bg)', color: 'var(--text-primary)' }}>₹5,00,000 - ₹10,00,000</option>
                        <option style={{ background: 'var(--color-bg)', color: 'var(--text-primary)' }}>₹10,00,000+</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Desired Deadline</label>
                      <select name="deadline" value={formData.deadline} onChange={handleChange} className="form-control" style={{ background: 'var(--color-bg)', color: 'var(--text-primary)' }}>
                        <option value="" style={{ background: 'var(--color-bg)', color: 'var(--text-primary)' }}>Select timeline</option>
                        <option style={{ background: 'var(--color-bg)', color: 'var(--text-primary)' }}>ASAP (Within 2 weeks)</option>
                        <option style={{ background: 'var(--color-bg)', color: 'var(--text-primary)' }}>Within 1 month</option>
                        <option style={{ background: 'var(--color-bg)', color: 'var(--text-primary)' }}>1-3 months</option>
                        <option style={{ background: 'var(--color-bg)', color: 'var(--text-primary)' }}>No rush</option>
                      </select>
                    </div>
                  </ScrollAnimator>
                )}

                {step === 4 && (
                  <ScrollAnimator animation="fade-in">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: 'var(--space-6)' }}>
                      <Sparkles style={{ color: 'var(--color-accent)' }} />
                      <h3 style={{ margin: 0, fontSize: 'var(--fs-h4)' }}>Step 4: Review & Submit</h3>
                    </div>
                    <div style={{ background: 'var(--color-frost)', padding: '20px', borderRadius: 'var(--radius-lg)', marginBottom: 'var(--space-8)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-blue)', marginBottom: '10px' }}>
                        <AlertCircle size={20} />
                        <strong>Welcome back, {user?.name || 'User'}!</strong>
                      </div>
                      <p style={{ fontSize: '14px', marginBottom: '10px' }}>You can now submit your project request. Please review your details and click submit to start your journey with Pixora.</p>
                      <ul style={{ fontSize: '13px', color: 'var(--color-gray-600)' }}>
                        <li>✓ Premium Design Standards</li>
                        <li>✓ Modern Tech Stack</li>
                        <li>✓ Performance Optimized</li>
                        <li>✓ 24/7 Priority Support</li>
                      </ul>
                    </div>
                  </ScrollAnimator>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--space-10)' }}>
                  {step > 1 ? (
                    <button type="button" onClick={prevStep} className="btn btn--secondary">
                      <ArrowLeft size={18} /> Back
                    </button>
                  ) : (
                    <div></div>
                  )}

                  {step < 4 ? (
                    <button type="button" onClick={nextStep} className="btn btn--primary">
                      Next Step <ArrowRight size={18} />
                    </button>
                  ) : (
                    <button type="submit" className="btn btn--coral btn--lg" disabled={isSubmitting}>
                      {isSubmitting ? 'Submitting...' : 'Submit Request'} <Send size={18} />
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Request;
