import React, { useState, useEffect } from 'react';
import { ExternalLink, Eye, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import ScrollAnimator from '../../components/ScrollAnimator';
import './Portfolio.css';

const Portfolio = () => {
  const location = useLocation();
  const [activeFilter, setActiveFilter] = useState('All');

  const scrollToSection = (cat) => {
    setActiveFilter(cat);
    if (cat === 'All') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const id = cat.toLowerCase().replace(/\s+/g, '-');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (location.hash) {
      const hash = location.hash.replace('#', '');
      const match = categories.find(c => c.toLowerCase().replace(/\s+/g, '-') === hash);
      if (match) setActiveFilter(match);
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  const projects = [
    { id: 1, title: "TechFlow SaaS", category: "Business", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" },
    { id: 2, title: "Lumina Store", category: "E-commerce", image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80" },
    { id: 3, title: "Nexus Portfolio", category: "Portfolio", image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80" },
    { id: 4, title: "Vortex Landing", category: "Landing Pages", image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=800&q=80" },
    { id: 5, title: "Synergy Agency", category: "Business", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80" },
    { id: 6, title: "Eclipse Shop", category: "E-commerce", image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=800&q=80" },
    { id: 7, title: "Artisan Wood", category: "Business", image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80" },
    { id: 8, title: "Crypto App", category: "Landing Pages", image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80" },
  ];

  const categories = ['Business', 'E-commerce', 'Portfolio', 'Landing Pages'];
  const filterTabs = ['All', ...categories];

  return (
    <div className="portfolio-page" style={{ paddingTop: 'var(--navbar-height)' }}>
      {/* Hero */}
      <section className="section" style={{ textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '-50%', left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '800px', height: '800px', background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 60%)', filter: 'blur(60px)', zIndex: 0, pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <ScrollAnimator animation="fade-in">
            <span className="section-badge">Our Work</span>
            <h1 style={{ marginBottom: 'var(--space-4)', fontSize: 'var(--fs-h1)', letterSpacing: 'var(--ls-tightest)' }}>Portfolio of Excellence</h1>
            <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: 'var(--fs-lg)', color: 'var(--text-secondary)' }}>
              Explore our latest projects where design meets functionality to create 
              exceptional digital experiences.
            </p>
          </ScrollAnimator>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <div className="portfolio-filters">
            {filterTabs.map(cat => (
              <button 
                key={cat} 
                className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
                onClick={() => scrollToSection(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Project Sections by Category */}
      {categories.map((cat, catIdx) => (
        <section 
          key={cat} 
          id={cat.toLowerCase().replace(/\s+/g, '-')} 
          className="section" 
          style={{ paddingTop: catIdx === 0 ? 'var(--space-8)' : '0' }}
        >
          <div className="container">
            <h2 style={{ marginBottom: 'var(--space-6)', fontSize: 'var(--fs-h2)' }}>{cat}</h2>
            <div className="portfolio-grid">
              {projects.filter(p => p.category === cat).map((p, i) => (
                <ScrollAnimator key={p.id} animation="scale-up" delay={`delay-${(i % 4) + 1}`} className="portfolio-item">
                  <div className="project-card">
                    <img src={p.image} alt={p.title} className="project-image" />
                    <div className="project-overlay">
                      <span className="project-category">{p.category}</span>
                      <h3 className="project-title">{p.title}</h3>
                      <div className="project-links">
                        <button className="btn btn--white btn--sm"><Eye size={14} /> View Case</button>
                        <a href="#" className="project-link-icon"><ExternalLink size={18} /></a>
                      </div>
                    </div>
                  </div>
                </ScrollAnimator>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="section" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', maxWidth: '600px', height: '600px', background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 60%)', filter: 'blur(60px)', zIndex: 0, pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px', background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(12px)', border: '1px solid var(--border-subtle)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
            <div>
              <h3 style={{ fontSize: 'var(--fs-h3)', marginBottom: '8px' }}>Have a project in mind?</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Let's discuss how we can bring your vision to life.</p>
            </div>
            <Link to="/request" className="btn btn--primary">
              Contact Us Today <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;

