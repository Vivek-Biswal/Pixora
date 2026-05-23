import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, Send } from 'lucide-react';
import { XIcon, InstagramIcon, GithubIcon, GmailIcon } from '../../components/SocialIcons.jsx';
import toast, { Toaster } from 'react-hot-toast';
import ScrollAnimator from '../../components/ScrollAnimator';
import { submitContactMessage } from '../../services/db';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: 'New Project Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitContactMessage({
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        subject: formData.subject,
        message: formData.message
      });
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({
        firstName: '', lastName: '', email: '', subject: 'New Project Inquiry', message: ''
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="contact-page" style={{ paddingTop: 'var(--navbar-height)' }}>
      <Toaster position="top-right" />
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
                <form onSubmit={handleSubmit}>
                  <div className="grid-2">
                    <div className="form-group">
                      <label className="form-label">First Name</label>
                      <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="form-control" placeholder="John" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Last Name</label>
                      <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="form-control" placeholder="Doe" required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" placeholder="john@example.com" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Subject</label>
                    <select name="subject" value={formData.subject} onChange={handleChange} className="form-control">
                      <option>New Project Inquiry</option>
                      <option>General Support</option>
                      <option>Partnership</option>
                      <option>Job Opportunity</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Message</label>
                    <textarea name="message" value={formData.message} onChange={handleChange} className="form-control" placeholder="Tell us more about your needs..." required></textarea>
                  </div>
                  <button type="submit" className="btn btn--primary btn--lg" style={{ width: '100%' }} disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message'} <Send size={18} />
                  </button>
                </form>
              </div>
            </ScrollAnimator>

            {/* Info */}
            <ScrollAnimator animation="from-right">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
                <div className="contact-info-item" style={{ display: 'flex', gap: '20px' }}>
                  <div className="icon-box" style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><GmailIcon size={24} /></div>
                  <div>
                    <h4 style={{ marginBottom: '5px' }}>Official Support</h4>
                    <p style={{ color: 'var(--color-blue)', fontWeight: '600' }}>hi.pixora.studio@gmail.com</p>
                    <p style={{ fontSize: '14px' }}>Business inquiries and support.</p>
                  </div>
                </div>
                
                <div className="contact-info-item" style={{ display: 'flex', gap: '20px' }}>
                  <div className="icon-box" style={{ flexShrink: 0 }}><Phone /></div>
                  <div>
                    <h4 style={{ marginBottom: '5px' }}>Phone Support</h4>
                    <p style={{ color: 'var(--color-blue)', fontWeight: '600' }}>+91 98765 43210</p>
                    <p style={{ fontSize: '14px' }}>Mon-Fri, 10am to 6pm IST.</p>
                  </div>
                </div>
                
                <div className="contact-info-item" style={{ display: 'flex', gap: '20px' }}>
                  <div className="icon-box" style={{ flexShrink: 0 }}><MapPin /></div>
                  <div>
                    <h4 style={{ marginBottom: '5px' }}>Registered Office</h4>
                    <p style={{ fontWeight: '600' }}>Plot No. 42, Digital Hub, Sector 5</p>
                    <p style={{ fontSize: '14px' }}>Bhubaneswar, Odisha, India 751024</p>
                  </div>
                </div>

                <hr style={{ border: 'none', borderTop: '1px solid var(--color-gray-200)' }} />

                <div>
                  <h4 style={{ marginBottom: 'var(--space-4)' }}>Follow Our Journey</h4>
                  <div style={{ display: 'flex', gap: '15px' }}>
                    <a href="https://www.instagram.com/hi.pixora.studio?igsh=cWJ5Y2Z6OGQzZGw2" target="_blank" rel="noopener noreferrer" className="social-link" style={{ width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><InstagramIcon size={20} /></a>
                    <a href="https://x.com/Pixora_Studio" target="_blank" rel="noopener noreferrer" className="social-link" style={{ width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><XIcon size={20} /></a>
                    <a href="https://github.com/Vivek-Biswal/Pixora.git" target="_blank" rel="noopener noreferrer" className="social-link" style={{ width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><GithubIcon size={20} /></a>
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
