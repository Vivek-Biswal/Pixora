import React from 'react';
import { Target, Eye, Heart, Award, Shield, Users, Zap } from 'lucide-react';
import ScrollAnimator from '../../components/ScrollAnimator';
import './About.css';

const About = () => {
  const values = [
    { icon: <Heart />, title: "Client Focused", desc: "Your success is our primary metric. We build partnerships, not just websites." },
    { icon: <Award />, title: "Excellence", desc: "We never settle for 'good enough'. Every pixel must serve a purpose." },
    { icon: <Zap />, title: "Innovation", desc: "We stay at the cutting edge of web technology to give you a competitive lead." },
    { icon: <Shield />, title: "Integrity", desc: "Transparent processes and honest communication at every step." },
    { icon: <Users />, title: "Collaboration", desc: "We work with you, leveraging your domain expertise with our digital skills." },
    { icon: <Target />, title: "Results Driven", desc: "Beautiful design is useless if it doesn't meet your business objectives." }
  ];



  return (
    <div className="about-page" style={{ paddingTop: 'var(--navbar-height)' }}>
      {/* Hero */}
      <section className="section bg-frost" style={{ background: 'var(--color-frost)', textAlign: 'center', paddingBottom: 'var(--space-24)' }}>
        <div className="container">
          <ScrollAnimator animation="fade-in">
            <span className="section-badge">Our Story</span>
            <h1 style={{ marginBottom: 'var(--space-4)' }}>
              We Build Websites That Work for You
            </h1>
            <p style={{ maxWidth: '680px', margin: '0 auto', fontSize: '1.1rem', lineHeight: 1.7 }}>
              Pixora was built on a simple belief: every Indian business —
              no matter how small — deserves a world-class website.
              We are a team of designers and developers who obsess over
              delivery speed, design quality, and client results.
            </p>
          </ScrollAnimator>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="about-stats">
            {[
              { num: '50+',  label: 'Websites Delivered' },
              { num: '7',    label: 'Days Average Delivery' },
              { num: '98%',  label: 'Client Satisfaction Rate' },
              { num: '100%', label: 'Ownership to Clients' },
            ].map((s, i) => (
              <div key={i} className="about-stat-item">
                <span className="about-stat-num gradient-text">{s.num}</span>
                <span className="about-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section">
        <div className="container">
          <div className="grid-2">
            <ScrollAnimator animation="from-left" style={{ height: '100%' }}>
              <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div className="icon-box"><Target /></div>
                <h2 style={{ marginBottom: 'var(--space-4)' }}>Our Mission</h2>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, flexGrow: 1 }}>
                  To give every Indian business — clinic, gym, restaurant,
                  or startup — a website that genuinely grows their revenue.
                  Premium quality, honest pricing, real ownership.
                </p>
              </div>
            </ScrollAnimator>
            <ScrollAnimator animation="from-right" style={{ height: '100%' }}>
              <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div className="icon-box"><Eye /></div>
                <h2 style={{ marginBottom: 'var(--space-4)' }}>Our Vision</h2>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, flexGrow: 1 }}>
                  To become the most trusted web studio in India — known not
                  for being the cheapest or the fanciest, but for being the
                  most reliable. Every client should feel like our only client.
                </p>
              </div>
            </ScrollAnimator>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-frost" style={{ background: 'var(--color-frost)' }}>
        <div className="container">
          <div className="section-header">
            <h2>The Pixora Values</h2>
            <p>Our core beliefs guide every decision we make and every project we take on.</p>
          </div>
          
          <div className="grid-3">
            {values.map((v, i) => (
              <ScrollAnimator key={i} animation="from-bottom" delay={`delay-${(i % 3) + 1}`} className="card" style={{ padding: 'var(--space-6)' }}>
                <div className="icon-box" style={{ width: '48px', height: '48px' }}>{v.icon}</div>
                <h4 style={{ marginBottom: '10px' }}>{v.title}</h4>
                <p style={{ fontSize: '14px' }}>{v.desc}</p>
              </ScrollAnimator>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Why Choose Us</span>
            <h2>What Makes Pixora Different</h2>
            <p>We are not a marketplace. Not a freelancer platform. We are a focused studio with one goal — your launch.</p>
          </div>
          <div className="grid-3">
            {[
              {
                icon: <Zap />,
                title: '7-Day Delivery',
                desc: 'We set a launch date on Day 1 and we hit it. No delays, no excuses, no surprises. Speed is our competitive advantage.',
              },
              {
                icon: <Shield />,
                title: '100% Code Ownership',
                desc: 'You own everything — code, design, domain, hosting account. No lock-in. No monthly platform fees. It is yours forever.',
              },
              {
                icon: <Users />,
                title: 'Built for India',
                desc: 'GST invoices, Razorpay integration, Hindi/regional support, local hosting options. We understand the Indian market.',
              },
            ].map((item, i) => (
              <ScrollAnimator key={i} animation="from-bottom" delay={`delay-${i + 1}`} style={{ height: '100%' }}>
                <div className="card" style={{ padding: 'var(--space-7)', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div className="icon-box">{item.icon}</div>
                  <h4 style={{ marginBottom: '10px' }}>{item.title}</h4>
                  <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--text-secondary)', flexGrow: 1 }}>{item.desc}</p>
                </div>
              </ScrollAnimator>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
