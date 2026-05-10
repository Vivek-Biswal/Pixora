import React from 'react';
import { Mail, Phone, MapPin, MessageSquare, Send, Camera, MessageCircle, Briefcase } from 'lucide-react';
import ScrollAnimator from '../../components/ScrollAnimator';

const Contact = () => {
  return (
    <div className="contact-page" style={{ paddingTop: 'var(--navbar-height)' }}>
      {/* Hero */}
      <section className="section bg-frost" style={{ background: 'var(--color-frost)', textAlign: 'center' }}>
        <div className="container">
          <ScrollAnimator animation="fade-in">
            <span className="section-badge">Contact Us</span>
            <h1 style={{ marginBottom: 'var(--space-4)' }}>Let's Start a Conversation</h1>
            <p style={{ maxWidth: '600px', margin: '0 auto' }}>
              Whether you have a specific project in mind or just want to learn more, 
              we're here to help. Reach out to us today.
            </p>
          </ScrollAnimator>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ gap: 'var(--space-16)' }}>
            {/* Form */}
            <ScrollAnimator animation="from-left">
              <div className="card" style={{ padding: 'var(--space-10)' }}>
                <h3 style={{ marginBottom: 'var(--space-6)' }}>Send us a message</h3>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="grid-2">
                    <div className="form-group">
                      <label className="form-label">First Name</label>
                      <input type="text" className="form-control" placeholder="John" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Last Name</label>
                      <input type="text" className="form-control" placeholder="Doe" required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input type="email" className="form-control" placeholder="john@example.com" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Subject</label>
                    <select className="form-control">
                      <option>New Project Inquiry</option>
                      <option>General Support</option>
                      <option>Partnership</option>
                      <option>Job Opportunity</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Message</label>
                    <textarea className="form-control" placeholder="Tell us more about your needs..." required></textarea>
                  </div>
                  <button type="submit" className="btn btn--primary btn--lg" style={{ width: '100%' }}>
                    Send Message <Send size={18} />
                  </button>
                </form>
              </div>
            </ScrollAnimator>

            {/* Info */}
            <ScrollAnimator animation="from-right">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
                <div className="contact-info-item" style={{ display: 'flex', gap: '20px' }}>
                  <div className="icon-box" style={{ flexShrink: 0 }}><Mail /></div>
                  <div>
                    <h4 style={{ marginBottom: '5px' }}>Email Us</h4>
                    <p style={{ color: 'var(--color-blue)', fontWeight: '600' }}>hello@pixora.studio</p>
                    <p style={{ fontSize: '14px' }}>Expect a response within 24 hours.</p>
                  </div>
                </div>
                
                <div className="contact-info-item" style={{ display: 'flex', gap: '20px' }}>
                  <div className="icon-box" style={{ flexShrink: 0 }}><Phone /></div>
                  <div>
                    <h4 style={{ marginBottom: '5px' }}>Call Us</h4>
                    <p style={{ color: 'var(--color-blue)', fontWeight: '600' }}>+1 (555) 000-PIXORA</p>
                    <p style={{ fontSize: '14px' }}>Mon-Fri from 9am to 6pm EST.</p>
                  </div>
                </div>
                
                <div className="contact-info-item" style={{ display: 'flex', gap: '20px' }}>
                  <div className="icon-box" style={{ flexShrink: 0 }}><MapPin /></div>
                  <div>
                    <h4 style={{ marginBottom: '5px' }}>Our Studio</h4>
                    <p style={{ fontWeight: '600' }}>123 Design Avenue, Suite 400</p>
                    <p style={{ fontSize: '14px' }}>Creative District, NY 10001</p>
                  </div>
                </div>

                <hr style={{ border: 'none', borderTop: '1px solid var(--color-gray-200)' }} />

                <div>
                  <h4 style={{ marginBottom: 'var(--space-4)' }}>Follow Our Journey</h4>
                  <div style={{ display: 'flex', gap: '15px' }}>
                    <a href="#" className="social-link" style={{ width: '45px', height: '45px' }}><Camera /></a>
                    <a href="#" className="social-link" style={{ width: '45px', height: '45px' }}><MessageCircle /></a>
                    <a href="#" className="social-link" style={{ width: '45px', height: '45px' }}><Briefcase /></a>
                  </div>
                </div>

                {/* Map Placeholder */}
                <div style={{ 
                  width: '100%', height: '200px', background: 'var(--color-frost)', 
                  borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-gray-200)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--color-gray-400)', fontSize: '14px', position: 'relative', overflow: 'hidden'
                }}>
                  <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=600&q=40" style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} />
                  <span style={{ position: 'relative', zIndex: 1, fontWeight: 'bold' }}>Interactive Map Coming Soon</span>
                </div>
              </div>
            </ScrollAnimator>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
