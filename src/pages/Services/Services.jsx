import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Monitor, ShoppingCart, Smartphone, BarChart, 
  Settings, Zap, Shield, Search, ArrowRight, Check 
} from 'lucide-react';
import ScrollAnimator from '../../components/ScrollAnimator';

const Services = () => {
  const allServices = [
    { 
      icon: <Monitor size={32} />, 
      title: "Business Websites", 
      desc: "Custom corporate solutions designed to build trust and authority in your industry.",
      features: ["Custom UI/UX Design", "Content Management System", "Mobile Responsive", "Speed Optimization"]
    },
    { 
      icon: <ShoppingCart size={32} />, 
      title: "E-commerce Solutions", 
      desc: "Complete online stores that turn visitors into loyal customers.",
      features: ["Product Management", "Secure Checkout", "Inventory Tracking", "Payment Integration"]
    },
    { 
      icon: <Smartphone size={32} />, 
      title: "Portfolio Websites", 
      desc: "Visual storytelling platforms for creatives, architects, and designers.",
      features: ["High-Res Galleries", "Interactive Elements", "Brand Storytelling", "Contact Forms"]
    },
    { 
      icon: <Zap size={32} />, 
      title: "Landing Pages", 
      desc: "Focused single-page sites designed specifically for conversion and marketing.",
      features: ["A/B Testing Ready", "Copywriting Support", "Lead Generation", "CRM Integration"]
    },
    { 
      icon: <Search size={32} />, 
      title: "SEO Optimization", 
      desc: "Strategic search engine positioning to increase your organic visibility.",
      features: ["Keyword Research", "On-Page SEO", "Technical SEO Audit", "Monthly Reports"]
    },
    { 
      icon: <Settings size={32} />, 
      title: "Maintenance & Care", 
      desc: "Worry-free maintenance plans to keep your site running perfectly 24/7.",
      features: ["Daily Backups", "Security Monitoring", "Content Updates", "Priority Support"]
    },
    { 
      icon: <Shield size={32} />, 
      title: "Website Redesign", 
      desc: "Breath new life into your existing site with a modern, fresh aesthetic.",
      features: ["Audit & Strategy", "Brand Modernization", "UX Improvement", "Tech Stack Upgrade"]
    },
    { 
      icon: <BarChart size={32} />, 
      title: "Custom Solutions", 
      desc: "Unique web applications and tools built specifically for your business logic.",
      features: ["API Integrations", "Database Design", "User Dashboards", "Automation Tools"]
    }
  ];

  return (
    <div className="services-page" style={{ paddingTop: 'var(--navbar-height)' }}>
      {/* Page Hero */}
      <section className="section bg-frost" style={{ background: 'var(--color-frost)', textAlign: 'center' }}>
        <div className="container">
          <ScrollAnimator animation="fade-in">
            <span className="section-badge">What We Do</span>
            <h1 style={{ marginBottom: 'var(--space-4)' }}>Our Specialized Services</h1>
            <p style={{ maxWidth: '600px', margin: '0 auto' }}>
              We combine creative design with technical excellence to deliver digital 
              products that help your business thrive in the modern world.
            </p>
          </ScrollAnimator>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section">
        <div className="container">
          <div className="grid-2">
            {allServices.map((service, i) => (
              <ScrollAnimator key={i} animation="from-bottom" delay={`delay-${(i % 2) + 1}`} className="card service-detail-card">
                <div className="icon-box" style={{ width: '60px', height: '60px' }}>{service.icon}</div>
                <h3 style={{ marginBottom: 'var(--space-3)' }}>{service.title}</h3>
                <p style={{ marginBottom: 'var(--space-6)' }}>{service.desc}</p>
                <ul style={{ marginBottom: 'var(--space-8)' }}>
                  {service.features.map((feat, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: 'var(--fs-small)', color: 'var(--color-gray-600)' }}>
                      <Check size={16} color="var(--color-blue)" /> {feat}
                    </li>
                  ))}
                </ul>
                <Link to="/request" className="btn btn--primary btn--sm">
                  Get Started <ArrowRight size={14} />
                </Link>
              </ScrollAnimator>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison / Why Us */}
      <section className="section" style={{ background: 'var(--color-night)', color: 'white' }}>
        <div className="container">
          <div className="section-header">
            <h2 style={{ color: 'white' }}>The Pixora Advantage</h2>
            <p style={{ color: 'var(--color-gray-400)' }}>Why our clients choose us over generic agencies.</p>
          </div>
          
          <div className="grid-3">
            <div style={{ textAlign: 'center' }}>
              <h4 style={{ color: 'var(--color-blue-light)', marginBottom: '10px' }}>Performance First</h4>
              <p style={{ color: 'var(--color-gray-300)', fontSize: '14px' }}>Every site we build is optimized for speed, scoring 90+ on Google PageSpeed Insights.</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h4 style={{ color: 'var(--color-blue-light)', marginBottom: '10px' }}>Conversion Driven</h4>
              <p style={{ color: 'var(--color-gray-300)', fontSize: '14px' }}>We don't just make it look pretty; we design for results and clear calls to action.</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h4 style={{ color: 'var(--color-blue-light)', marginBottom: '10px' }}>Future Proof</h4>
              <p style={{ color: 'var(--color-gray-300)', fontSize: '14px' }}>We use the latest tech stacks that are scalable and easy to maintain as you grow.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
