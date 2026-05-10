import React, { useState } from 'react';
import { Check, ArrowRight, Zap, Award, Rocket } from 'lucide-react';
import ScrollAnimator from '../../components/ScrollAnimator';

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
      <section className="section bg-frost" style={{ background: 'var(--color-frost)', textAlign: 'center' }}>
        <div className="container">
          <ScrollAnimator animation="fade-in">
            <span className="section-badge">Pricing</span>
            <h1 style={{ marginBottom: 'var(--space-4)' }}>Transparent Pricing</h1>
            <p style={{ maxWidth: '600px', margin: '0 auto', marginBottom: 'var(--space-8)' }}>
              No hidden fees. Choose the plan that fits your business stage.
            </p>
            
            {/* Toggle */}
            <div style={{ 
              display: 'inline-flex', 
              background: 'var(--color-white)', 
              padding: '6px', 
              borderRadius: 'var(--radius-full)',
              boxShadow: 'var(--shadow-sm)',
              border: '1px solid var(--color-gray-200)'
            }}>
              <button 
                onClick={() => setBilling('project')}
                className={`btn btn--sm ${billing === 'project' ? 'btn--primary' : ''}`}
                style={{ borderRadius: 'var(--radius-full)', background: billing === 'project' ? '' : 'transparent', color: billing === 'project' ? '' : 'var(--color-gray-600)' }}
              >
                Project-based
              </button>
              <button 
                onClick={() => setBilling('monthly')}
                className={`btn btn--sm ${billing === 'monthly' ? 'btn--primary' : ''}`}
                style={{ borderRadius: 'var(--radius-full)', background: billing === 'monthly' ? '' : 'transparent', color: billing === 'monthly' ? '' : 'var(--color-gray-600)' }}
              >
                Monthly Retainer
              </button>
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
                style={plan.popular ? { border: '2px solid var(--color-blue)', transform: 'scale(1.05)' } : {}}
              >
                {plan.popular && (
                  <div style={{ 
                    position: 'absolute', top: '15px', right: '15px', 
                    background: 'var(--color-blue)', color: 'white', 
                    padding: '4px 12px', borderRadius: 'var(--radius-full)',
                    fontSize: '10px', fontWeight: 'bold'
                  }}>
                    MOST POPULAR
                  </div>
                )}
                <div className="icon-box" style={{ background: plan.popular ? 'var(--color-blue)' : '', color: plan.popular ? 'white' : '' }}>
                  {plan.icon}
                </div>
                <h3>{plan.name}</h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', margin: 'var(--space-4) 0' }}>
                  <span style={{ fontSize: 'var(--fs-h2)', fontWeight: 'bold', color: 'var(--color-night)' }}>${plan.price}</span>
                  <span style={{ color: 'var(--color-gray-500)' }}>/{plan.period}</span>
                </div>
                <p style={{ fontSize: '14px', marginBottom: 'var(--space-8)' }}>{plan.desc}</p>
                
                <hr style={{ border: 'none', borderTop: '1px solid var(--color-gray-200)', marginBottom: 'var(--space-8)' }} />
                
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
