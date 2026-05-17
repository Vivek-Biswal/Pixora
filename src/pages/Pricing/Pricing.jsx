import React, { useState } from 'react';
import { Check, ArrowRight, Zap, Award, Rocket } from 'lucide-react';
import ScrollAnimator from '../../components/ScrollAnimator';
import { motion } from 'framer-motion';

const Pricing = () => {
  const [billing, setBilling] = useState('project'); // project or monthly

  const plans = [
    {
      name: "Starter",
      icon: <Zap size={24} />,
      price: billing === 'project' ? "499" : "99",
      period: billing === 'project' ? "project" : "mo",
      desc: "Perfect for personal brands and small landing pages.",
      features: ["3 Pages Custom Design", "Mobile Responsive", "Basic SEO Setup", "1 Week Turnaround", "3 Months Support"],
      popular: false
    },
    {
      name: "Professional",
      icon: <Award size={24} />,
      price: billing === 'project' ? "999" : "199",
      period: billing === 'project' ? "project" : "mo",
      desc: "Ideal for growing businesses needing a full corporate site.",
      features: ["8 Pages Custom Design", "Advanced SEO Setup", "CMS Integration", "2 Weeks Turnaround", "1 Year Support", "Speed Optimization"],
      popular: true
    },
    {
      name: "Premium",
      icon: <Rocket size={24} />,
      price: billing === 'project' ? "2499" : "499",
      period: billing === 'project' ? "project" : "mo",
      desc: "Complete digital solution with e-commerce and apps.",
      features: ["Unlimited Pages", "E-commerce System", "Custom App Logic", "4 Weeks Turnaround", "Lifetime Support", "Priority Updates", "Full Marketing Integration"],
      popular: false
    }
  ];

  return (
    <div className="pricing-page" style={{ paddingTop: 'var(--navbar-height)' }}>
      {/* Hero */}
      <section className="section" style={{ textAlign: 'center', position: 'relative' }}>
        {/* Background glow */}
        <div style={{ position: 'absolute', top: '-50%', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 60%)', filter: 'blur(60px)', zIndex: 0, pointerEvents: 'none' }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <ScrollAnimator animation="fade-in">
            <span className="section-badge">Pricing</span>
            <h1 style={{ marginBottom: 'var(--space-4)', fontSize: 'var(--fs-h1)', letterSpacing: 'var(--ls-tightest)' }}>Transparent Pricing</h1>
            <p style={{ maxWidth: '600px', margin: '0 auto', marginBottom: 'var(--space-10)', fontSize: 'var(--fs-lg)', color: 'var(--text-secondary)' }}>
              No hidden fees. Choose the plan that fits your business stage.
            </p>
            
            {/* Premium Toggle */}
            <div style={{ 
              display: 'inline-flex', 
              background: 'rgba(255,255,255,0.03)', 
              padding: '6px', 
              borderRadius: '999px',
              border: '1px solid rgba(255,255,255,0.05)',
              position: 'relative'
            }}>
              {['project', 'monthly'].map((type) => (
                <button
                  key={type}
                  onClick={() => setBilling(type)}
                  style={{
                    position: 'relative',
                    padding: '10px 24px',
                    borderRadius: '999px',
                    border: 'none',
                    background: 'transparent',
                    color: billing === type ? '#fff' : 'var(--text-secondary)',
                    fontWeight: billing === type ? '600' : '500',
                    fontSize: '14px',
                    cursor: 'pointer',
                    zIndex: 1,
                    transition: 'color 0.2s ease'
                  }}
                >
                  {billing === type && (
                    <motion.div
                      layoutId="pricing-toggle"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(135deg, var(--color-purple), #60a5fa)',
                        borderRadius: '999px',
                        zIndex: -1,
                        boxShadow: '0 4px 15px rgba(139,92,246,0.3)'
                      }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {type === 'project' ? 'Project-based' : 'Monthly Retainer'}
                </button>
              ))}
            </div>
          </ScrollAnimator>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="section">
        <div className="container">
          <div className="grid-3" style={{ alignItems: 'start' }}>
            {plans.map((plan, i) => (
              <ScrollAnimator 
                key={i} 
                animation="from-bottom" 
                delay={`delay-${i + 1}`} 
                className={`card ${plan.popular ? 'popular-card' : ''}`}
                style={{ 
                  background: 'var(--glass-bg)',
                  borderColor: plan.popular ? 'var(--color-accent)' : 'var(--border-subtle)',
                  transform: plan.popular ? 'scale(1.05)' : 'scale(1)',
                  boxShadow: plan.popular ? '0 0 30px rgba(139,92,246,0.1)' : 'none',
                  backdropFilter: 'blur(10px)',
                  position: 'relative'
                }}
              >
                {plan.popular && (
                  <div style={{ 
                    position: 'absolute', top: '16px', right: '16px', 
                    background: 'linear-gradient(135deg, var(--color-accent), #60a5fa)', color: 'white', 
                    padding: '4px 12px', borderRadius: '999px',
                    fontSize: '11px', fontWeight: 'bold', letterSpacing: '0.05em'
                  }}>
                    MOST POPULAR
                  </div>
                )}
                <div className="icon-box" style={{ background: plan.popular ? 'rgba(139,92,246,0.15)' : 'var(--glass-bg-hover)', color: plan.popular ? 'var(--color-accent)' : 'var(--text-secondary)' }}>
                  {plan.icon}
                </div>
                <h3>{plan.name}</h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', margin: 'var(--space-4) 0' }}>
                  <span style={{ fontSize: 'var(--fs-h2)', fontWeight: 'var(--fw-black)', color: 'var(--text-primary)', letterSpacing: 'var(--ls-tightest)' }}>₹{plan.price}</span>
                  <span style={{ color: 'var(--text-muted)' }}>/{plan.period}</span>
                </div>
                <p style={{ fontSize: '14px', marginBottom: 'var(--space-8)', color: 'var(--text-secondary)' }}>{plan.desc}</p>
                
                <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', marginBottom: 'var(--space-8)' }} />
                
                <ul style={{ marginBottom: 'var(--space-10)' }}>
                  {plan.features.map((feat, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', fontSize: '14px' }}>
                      <Check size={16} color="var(--color-blue)" /> {feat}
                    </li>
                  ))}
                </ul>
                
                <button className={`btn ${plan.popular ? 'btn--primary' : 'btn--outline'} btn--block`} style={{ width: '100%' }}>
                  Choose {plan.name} <ArrowRight size={16} />
                </button>
              </ScrollAnimator>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table Placeholder */}
      <section className="section bg-frost" style={{ background: 'var(--color-frost)' }}>
        <div className="container">
          <div className="section-header">
            <h2>Detailed Comparison</h2>
            <p>Every feature explained in detail.</p>
          </div>
          
          <div className="card" style={{ padding: 0, overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-gray-200)' }}>
                  <th style={{ padding: '20px' }}>Features</th>
                  <th style={{ padding: '20px' }}>Starter</th>
                  <th style={{ padding: '20px' }}>Professional</th>
                  <th style={{ padding: '20px' }}>Premium</th>
                </tr>
              </thead>
              <tbody>
                {[
                  "Responsive Design", "SEO Foundation", "Performance Optimization", 
                  "CMS Support", "E-commerce", "Priority Support"
                ].map((feat, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--color-gray-100)' }}>
                    <td style={{ padding: '15px 20px', fontSize: '14px' }}>{feat}</td>
                    <td style={{ padding: '15px 20px' }}><Check size={16} color="var(--color-blue)" /></td>
                    <td style={{ padding: '15px 20px' }}><Check size={16} color="var(--color-blue)" /></td>
                    <td style={{ padding: '15px 20px' }}><Check size={16} color="var(--color-blue)" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
