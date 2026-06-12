import React, { useState } from 'react';
import { Check, ArrowRight, Zap, Award, Rocket } from 'lucide-react';
import ScrollAnimator from '../../components/ScrollAnimator';
import { motion } from 'framer-motion';

const Pricing = () => {
  const [billing, setBilling] = useState('project'); // project or monthly

  const plans = [
    {
      name: "Basic",
      tagline: "Perfect for local businesses",
      icon: <Zap size={24} />,
      price: "24,999",
      period: "one-time",
      delivery: "5-7 days",
      desc: "Get your business online quickly with a beautiful, fast, and SEO-ready website.",
      features: ["Up to 5 pages", "Mobile responsive", "Contact form", "Basic SEO setup", "Google Maps embed", "3 months support"],
      popular: false
    },
    {
      name: "Business",
      tagline: "Most chosen by growing brands",
      icon: <Award size={24} />,
      price: "49,999",
      period: "one-time",
      delivery: "7-10 days",
      desc: "A powerful digital presence with content management and advanced marketing tools.",
      features: ["Up to 12 pages", "CMS (edit yourself)", "Advanced SEO + Analytics", "WhatsApp chat button", "Blog or news section", "1 year support", "Speed optimization"],
      popular: true
    },
    {
      name: "E-Commerce",
      tagline: "Sell online from day one",
      icon: <Rocket size={24} />,
      price: "89,999",
      period: "one-time",
      delivery: "10-14 days",
      desc: "Complete digital storefront with payments, inventory, and order management.",
      features: ["Unlimited products", "Razorpay / UPI payments", "Order management panel", "Inventory tracking", "Coupon & discount system", "Lifetime support", "Full ownership"],
      popular: false
    }
  ];

  return (
    <div className="pricing-page" style={{ paddingTop: 'var(--navbar-height)' }}>
      {/* Hero */}
      <section className="section" style={{ textAlign: 'center', position: 'relative' }}>
        {/* Background glow */}
        <div style={{ position: 'absolute', top: '-50%', left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '800px', height: '800px', background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 60%)', filter: 'blur(60px)', zIndex: 0, pointerEvents: 'none' }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <ScrollAnimator animation="fade-in">
            <span className="section-badge">Pricing</span>
            <h1 style={{ marginBottom: 'var(--space-4)', fontSize: 'var(--fs-h1)', letterSpacing: 'var(--ls-tightest)' }}>Simple Pricing. You Own It Forever.</h1>
            <p style={{ maxWidth: '600px', margin: '0 auto', marginBottom: 'var(--space-10)', fontSize: 'var(--fs-lg)', color: 'var(--text-secondary)' }}>
              One-time payment. No monthly fees. No hidden costs. Your website, your code, your ownership — always.
            </p>
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
                
                <h3 style={{ fontSize: 'var(--fs-h3)', marginBottom: '4px' }}>{plan.name}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: 'var(--space-6)' }}>
                  {plan.tagline}
                </p>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: 'var(--space-6)' }}>
                  <span style={{ fontSize: 'var(--fs-display)', fontWeight: 'var(--fw-black)', color: 'var(--text-primary)', letterSpacing: 'var(--ls-tightest)' }}>₹{plan.price}</span>
                  <span style={{ color: 'var(--text-muted)' }}>{plan.period}</span>
                </div>

                <div style={{ 
                  background: 'rgba(139,92,246,0.1)', 
                  color: 'var(--color-purple-light)', 
                  padding: '8px 12px', 
                  borderRadius: '8px', 
                  fontSize: '13px', 
                  fontWeight: '600',
                  marginBottom: 'var(--space-8)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <Rocket size={14} /> {plan.delivery}
                </div>
                
                <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', marginBottom: 'var(--space-8)' }} />
                
                <ul style={{ marginBottom: 'var(--space-10)' }}>
                  {plan.features.map((feat, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                      <Check size={16} color="var(--color-purple-light)" /> {feat}
                    </li>
                  ))}
                </ul>
                
                <button className={`btn ${plan.popular ? 'btn--primary' : 'btn--outline'} btn--block`} style={{ width: '100%' }}>
                  Get Started <ArrowRight size={16} />
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
