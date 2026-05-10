import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, CheckCircle, Monitor, ShoppingCart, 
  Smartphone, BarChart, Settings, Rocket, Shield, 
  Users, Zap, Star, ChevronDown, Plus 
} from 'lucide-react';
import ScrollAnimator from '../../components/ScrollAnimator';
import './Home.css';

const Home = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const services = [
    { icon: <Monitor />, title: "Business Websites", desc: "Custom-built corporate websites that drive results and establish authority." },
    { icon: <ShoppingCart />, title: "E-commerce", desc: "Powerful online stores with seamless checkout and inventory management." },
    { icon: <Smartphone />, title: "Portfolio Sites", desc: "Stunning visual showcases designed to land your next big client." },
    { icon: <BarChart />, title: "SEO Optimization", desc: "Data-driven strategies to get your site to the first page of Google." },
    { icon: <Settings />, title: "Maintenance", desc: "24/7 support and updates to keep your website fast, secure, and fresh." },
    { icon: <Zap />, title: "Landing Pages", desc: "High-converting single-page sites designed for marketing campaigns." }
  ];

  const processSteps = [
    { num: "01", title: "Request", desc: "Tell us about your project goals." },
    { num: "02", title: "Planning", desc: "We map out the strategy and UX." },
    { num: "03", title: "Design", desc: "Creative concepts brought to life." },
    { num: "04", title: "Dev", desc: "Building with the latest tech." },
    { num: "05", title: "Launch", desc: "Your site goes live to the world." },
    { num: "06", title: "Support", desc: "Ongoing care and optimization." }
  ];

  const faqs = [
    { q: "How long does a typical project take?", a: "Most website projects take between 4-8 weeks depending on complexity. Small landing pages can be ready in as little as 2 weeks." },
    { q: "Do you offer monthly maintenance plans?", a: "Yes! We offer several maintenance tiers that include security updates, content changes, and regular performance audits." },
    { q: "Will my website be mobile-friendly?", a: "Absolutely. Every single site we build is responsive and optimized for all devices, from smartphones to large desktops." },
    { q: "Can you help with branding and logos?", a: "Yes, we offer full brand identity services including logo design, color palette development, and typography selection." },
    { q: "What platform do you build on?", a: "We specialize in React, Next.js, and custom headless CMS solutions for maximum performance and flexibility." },
    { q: "Do you provide hosting services?", a: "We help you set up premium hosting with providers like Vercel, Netlify, or AWS and manage the deployment process for you." }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
        <div className="container">
          <ScrollAnimator animation="fade-in" className="hero-content">
            <div className="hero-badge">
              <Star size={14} fill="currentColor" /> Web Design Agency of the Year 2024
            </div>
            <h1>Premium Web Design for <span>Modern Brands</span></h1>
            <p>
              We design and build high-performance websites that capture attention, 
              generate leads, and scale with your business goals.
            </p>
            <div className="hero-btns">
              <Link to="/request" className="btn btn--primary btn--lg">
                Start Your Project <ArrowRight size={20} />
              </Link>
              <Link to="/portfolio" className="btn btn--white btn--lg">
                View Portfolio
              </Link>
            </div>
          </ScrollAnimator>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="trusted">
        <div className="container">
          <div className="ticker-container">
            <div className="ticker-track">
              {['TECHFLOW', 'LUMINA', 'NEXUS', 'VORTEX', 'SYNERGY', 'ECLIPSE', 'TECHFLOW', 'LUMINA', 'NEXUS', 'VORTEX', 'SYNERGY', 'ECLIPSE'].map((name, i) => (
                <span key={i} className="client-logo">{name}</span>
              ))}
            </div>
          </div>
          
          <div className="stats-grid">
            <ScrollAnimator animation="scale-up" delay="delay-1" className="stat-item">
              <h3>150+</h3>
              <p>Projects Done</p>
            </ScrollAnimator>
            <ScrollAnimator animation="scale-up" delay="delay-2" className="stat-item">
              <h3>98%</h3>
              <p>Satisfaction</p>
            </ScrollAnimator>
            <ScrollAnimator animation="scale-up" delay="delay-3" className="stat-item">
              <h3>50+</h3>
              <p>Global Clients</p>
            </ScrollAnimator>
            <ScrollAnimator animation="scale-up" delay="delay-4" className="stat-item">
              <h3>24/7</h3>
              <p>Expert Support</p>
            </ScrollAnimator>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section section--lg">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Our Services</span>
            <h2>How We Can Help You Grow</h2>
            <p>We provide end-to-end digital solutions tailored to your specific business needs.</p>
          </div>
          
          <div className="grid-3">
            {services.map((s, i) => (
              <ScrollAnimator key={i} animation="from-bottom" delay={`delay-${i % 3 + 1}`} className="card service-card">
                <div className="service-icon-wrapper">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </ScrollAnimator>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 'var(--space-12)' }}>
            <Link to="/services" className="btn btn--outline">View All Services</Link>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section bg-frost" style={{ background: 'var(--color-frost)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Our Process</span>
            <h2>From Concept to Conversion</h2>
            <p>Our proven 6-step workflow ensures your project is delivered on time and exceeds expectations.</p>
          </div>
          
          <div className="process-grid">
            {processSteps.map((step, i) => (
              <ScrollAnimator key={i} animation="fade-in" delay={`delay-${i + 1}`} className="process-item">
                <div className="process-number">{step.num}</div>
                <h4>{step.title}</h4>
                <p style={{ fontSize: 'var(--fs-small)' }}>{step.desc}</p>
              </ScrollAnimator>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section section--lg">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Testimonials</span>
            <h2>What Our Clients Say</h2>
          </div>
          
          <div className="card testimonial-card">
            <ScrollAnimator animation="scale-up">
              <div className="testimonial-quote">
                "Pixora transformed our outdated website into a modern, high-converting machine. 
                Our leads increased by 40% in the first month alone!"
              </div>
              <div className="testimonial-author">
                <div className="author-avatar"></div>
                <div className="author-name">Sarah Jenkins</div>
                <div className="author-role">CEO at TechFlow</div>
              </div>
            </ScrollAnimator>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">FAQ</span>
            <h2>Common Questions</h2>
          </div>
          
          <div className="faq-list">
            {faqs.map((f, i) => (
              <div key={i} className={`faq-item ${activeFaq === i ? 'active' : ''}`} onClick={() => toggleFaq(i)}>
                <div className="faq-question">
                  {f.q}
                  <Plus size={20} className="faq-toggle" />
                </div>
                <div className="faq-answer">
                  <p>{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section section--lg">
        <div className="container">
          <div className="card card--dark" style={{ textAlign: 'center', background: 'var(--gradient-cta)', border: 'none' }}>
            <ScrollAnimator animation="fade-in">
              <h2 style={{ color: 'white', marginBottom: 'var(--space-4)' }}>Ready to build something amazing?</h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 'var(--space-8)' }}>
                Join 50+ happy clients and take your business to the next level today.
              </p>
              <div className="hero-btns">
                <Link to="/request" className="btn btn--coral btn--lg">Get Started Now</Link>
                <Link to="/contact" className="btn btn--white btn--lg">Contact Sales</Link>
              </div>
            </ScrollAnimator>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
