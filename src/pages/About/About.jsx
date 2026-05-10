import React from 'react';
import { Target, Eye, Heart, Award, Shield, Users, Zap } from 'lucide-react';
import ScrollAnimator from '../../components/ScrollAnimator';

const About = () => {
  const values = [
    { icon: <Heart />, title: "Client Focused", desc: "Your success is our primary metric. We build partnerships, not just websites." },
    { icon: <Award />, title: "Excellence", desc: "We never settle for 'good enough'. Every pixel must serve a purpose." },
    { icon: <Zap />, title: "Innovation", desc: "We stay at the cutting edge of web technology to give you a competitive lead." },
    { icon: <Shield />, title: "Integrity", desc: "Transparent processes and honest communication at every step." },
    { icon: <Users />, title: "Collaboration", desc: "We work with you, leveraging your domain expertise with our digital skills." },
    { icon: <Target />, title: "Results Driven", desc: "Beautiful design is useless if it doesn't meet your business objectives." }
  ];

  const team = [
    { name: "Alex Rivera", role: "Founder & Creative Director", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" },
    { name: "Sarah Chen", role: "Head of Development", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80" },
    { name: "Marcus Thorne", role: "UX Strategist", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80" },
    { name: "Elena Kosta", role: "Lead SEO Specialist", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80" }
  ];

  return (
    <div className="about-page" style={{ paddingTop: 'var(--navbar-height)' }}>
      {/* Hero */}
      <section className="section bg-frost" style={{ background: 'var(--color-frost)', textAlign: 'center' }}>
        <div className="container">
          <ScrollAnimator animation="fade-in">
            <span className="section-badge">Our Story</span>
            <h1 style={{ marginBottom: 'var(--space-4)' }}>Building the Digital Future</h1>
            <p style={{ maxWidth: '700px', margin: '0 auto' }}>
              Founded in 2020, Pixora was born out of a desire to bridge the gap between 
              artistic design and technical performance. We believe the web should be 
              both beautiful and functional.
            </p>
          </ScrollAnimator>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section">
        <div className="container">
          <div className="grid-2">
            <ScrollAnimator animation="from-left" className="card" style={{ background: 'var(--gradient-primary)', color: 'white' }}>
              <div className="icon-box" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}><Target /></div>
              <h2 style={{ color: 'white', marginBottom: 'var(--space-4)' }}>Our Mission</h2>
              <p style={{ color: 'rgba(255,255,255,0.8)' }}>
                To empower businesses with premium digital tools that simplify their 
                operations and amplify their reach through world-class design.
              </p>
            </ScrollAnimator>
            <ScrollAnimator animation="from-right" className="card" style={{ border: '2px solid var(--color-blue)' }}>
              <div className="icon-box"><Eye /></div>
              <h2 style={{ marginBottom: 'var(--space-4)' }}>Our Vision</h2>
              <p>
                To become the global standard for high-performance web design, 
                recognized for our innovation, quality, and commitment to client success.
              </p>
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

      {/* Team */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">The Team</span>
            <h2>Meet the Experts</h2>
          </div>
          
          <div className="grid-4">
            {team.map((member, i) => (
              <ScrollAnimator key={i} animation="scale-up" delay={`delay-${i + 1}`} style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: '100%', 
                  aspectRatio: '1', 
                  borderRadius: 'var(--radius-xl)', 
                  overflow: 'hidden',
                  marginBottom: 'var(--space-4)',
                  boxShadow: 'var(--shadow-md)'
                }}>
                  <img src={member.image} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <h4>{member.name}</h4>
                <p style={{ color: 'var(--color-blue)', fontSize: 'var(--fs-small)', fontWeight: '600' }}>{member.role}</p>
              </ScrollAnimator>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
