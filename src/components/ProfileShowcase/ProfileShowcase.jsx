import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, ExternalLink, MousePointer2 } from 'lucide-react';
import './ProfileShowcase.css';

const profiles = [
  {
    id: 1,
    title: 'Neuro Dashboard',
    subtitle: 'AI-POWERED ANALYTICS',
    tags: ['AI', 'DASHBOARD', 'SAAS'],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    description: 'An intelligent analytics platform with real-time data visualization, predictive insights, and seamless team collaboration.',
    accent: '#a855f7',
    accentRgb: '168, 85, 247',
    code: 'NR-01',
    url: 'neuro-dashboard.app',
    specs: [
      { label: 'RENDER', value: '1.2ms' },
      { label: 'ARCH', value: 'EDGE' },
      { label: 'SYNC', value: 'REAL-TIME' }
    ]
  },
  {
    id: 2,
    title: 'PayFlow',
    subtitle: 'FINANCIAL INFRASTRUCTURE',
    tags: ['FINTECH', 'PAYMENTS', 'API'],
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    description: 'Next-generation payment infrastructure powering millions of transactions with sub-50ms latency across 195 countries.',
    accent: '#3b82f6',
    accentRgb: '59, 130, 246',
    code: 'PF-02',
    url: 'payflow.dev',
    specs: [
      { label: 'UPTIME', value: '99.999%' },
      { label: 'SECURITY', value: 'PCI-DSS' },
      { label: 'REACH', value: '195 COUNTRIES' }
    ]
  },
  {
    id: 3,
    title: 'Velox Cloud',
    subtitle: 'DEPLOYMENT PLATFORM',
    tags: ['DEVOPS', 'CLOUD', 'EDGE'],
    imageUrl: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?q=80&w=1200&auto=format&fit=crop',
    description: 'Zero-config deployments on a global edge network. Ship faster with instant rollbacks, preview environments, and real-time logs.',
    accent: '#ec4899',
    accentRgb: '236, 72, 153',
    code: 'VX-03',
    url: 'velox.cloud',
    specs: [
      { label: 'LATENCY', value: '<50ms' },
      { label: 'NODES', value: '200+' },
      { label: 'DEPLOY', value: '<3s' }
    ]
  }
];

const ProfileShowcase = () => {
  const [index, setIndex] = useState(0);
  const containerRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

  const next = useCallback(() => setIndex((i) => (i + 1) % profiles.length), []);
  const prev = useCallback(() => setIndex((i) => (i - 1 + profiles.length) % profiles.length), []);

  const currentProject = profiles[index];

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [next, prev]);

  // Auto-rotation logic
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % profiles.length);
    }, 6000); // Auto-rotate every 6 seconds

    return () => clearInterval(timer);
  }, [index]);

  const getCardTransform = (cardIndex) => {
    let diff = cardIndex - index;
    if (diff < -1) diff += profiles.length;
    if (diff > 1) diff -= profiles.length;

    if (diff === 0) {
      return { active: true, zIndex: 10, opacity: 1, scale: 1, x: '0%', z: 0, rotateY: 0, filter: 'blur(0px)', pointerEvents: 'auto' };
    } else if (diff === -1 || diff === profiles.length - 1) {
      return { active: false, zIndex: 5, opacity: 0.12, scale: 0.82, x: '-50%', z: -200, rotateY: 30, filter: 'blur(6px)', pointerEvents: 'none' };
    } else {
      return { active: false, zIndex: 5, opacity: 0.12, scale: 0.82, x: '50%', z: -200, rotateY: -30, filter: 'blur(6px)', pointerEvents: 'none' };
    }
  };

  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.1 } }
  };

  const textItemVariants = {
    hidden: { opacity: 0, y: 12, filter: 'blur(6px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: 'spring', stiffness: 100, damping: 14 } }
  };

  return (
    <section
      ref={containerRef}
      className="profile-showcase"
      style={{
        '--room-color': currentProject.accent,
        '--room-color-rgb': currentProject.accentRgb
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <AnimatePresence>
        <motion.div key={`orb-1-${index}`} className="ps-ambient-glow ps-glow-1"
          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 0.3, scale: 1.2 }}
          exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 2 }}
          style={{ background: `radial-gradient(circle, rgba(${currentProject.accentRgb}, 0.35) 0%, transparent 65%)` }}
        />
        <motion.div key={`orb-2-${index}`} className="ps-ambient-glow ps-glow-2"
          initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 0.2, scale: 1.1 }}
          exit={{ opacity: 0, scale: 0.7 }} transition={{ duration: 2.5 }}
          style={{ background: `radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 55%)` }}
        />
      </AnimatePresence>

      {/* Header */}
      <div className="ps-header">
        <div className="ps-logo-container">
          <span className="ps-logo-scan-dot" />
          <div className="ps-logo">PIXORA DIGITAL GALLERY</div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button className="ps-arrow ps-arrow-left" onClick={prev} aria-label="Previous">
        <ChevronLeft size={22} />
      </button>
      <button className="ps-arrow ps-arrow-right" onClick={next} aria-label="Next">
        <ChevronRight size={22} />
      </button>

      {/* 3D Carousel Stage */}
      <div className="ps-stage">
        {profiles.map((project, idx) => {
          const layout = getCardTransform(idx);

          return (
            <motion.div
              key={project.id}
              className={`ps-card-container ${layout.active ? 'active' : ''}`}
              style={{ zIndex: layout.zIndex, pointerEvents: layout.pointerEvents }}
              animate={{
                x: layout.x, z: layout.z, rotateY: layout.rotateY,
                opacity: layout.opacity, scale: layout.scale, filter: layout.filter
              }}
              transition={{ type: 'spring', stiffness: 70, damping: 18, mass: 0.8 }}
            >
              <motion.div
                className="ps-card-inner"
                style={layout.active ? { rotateX, rotateY, transformStyle: 'preserve-3d' } : { transformStyle: 'preserve-3d' }}
                whileHover={layout.active ? { scale: 1.01 } : {}}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                drag={layout.active ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={(e, info) => {
                  if (info.offset.x < -50) next();
                  else if (info.offset.x > 50) prev();
                }}
              >
                <div className="ps-card-glow-border" style={{ borderColor: `rgba(${project.accentRgb}, 0.5)` }} />

                {/* === FULL-WIDTH DEVICE FRAME === */}
                <div className="ps-device-wrapper">
                  {/* Browser Chrome */}
                  <div className="ps-browser-bar">
                    <div className="ps-browser-dots">
                      <span className="brdot close" />
                      <span className="brdot minimize" />
                      <span className="brdot maximize" />
                    </div>
                    <div className="ps-browser-address">
                      <span className="ps-lock-icon">🔒</span>
                      <span>{project.url}</span>
                    </div>
                    <div className="ps-browser-actions">
                      <ExternalLink size={12} />
                    </div>
                  </div>

                  {/* Full-width Website Image */}
                  <div className="ps-screen">
                    <img
                      src={project.imageUrl}
                      alt={`${project.title} preview`}
                      className="ps-screenshot"
                      style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                    />
                  </div>

                  {/* Glass Reflection overlay */}
                  <div className="ps-screen-reflection" />
                </div>

                {/* === OVERLAY INFO PANEL === */}
                <AnimatePresence mode="wait">
                  {layout.active && (
                    <motion.div
                      key={`overlay-${project.id}`}
                      className="ps-info-overlay"
                      variants={textContainerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <div className="ps-info-left">
                        <motion.div className="ps-tag-row" variants={textItemVariants}>
                          {project.tags.map((tag, tIdx) => (
                            <span key={tIdx} className="ps-tag" style={{ borderColor: `rgba(${project.accentRgb}, 0.5)`, color: project.accent }}>{tag}</span>
                          ))}
                        </motion.div>

                        <motion.h2 variants={textItemVariants} className="ps-title">{project.title}</motion.h2>
                        <motion.p variants={textItemVariants} className="ps-subtitle">{project.subtitle}</motion.p>
                        <motion.p variants={textItemVariants} className="ps-description">{project.description}</motion.p>
                      </div>

                      <div className="ps-info-right">
                        <motion.div variants={textItemVariants} className="ps-specs-col">
                          {project.specs.map((spec, sIdx) => (
                            <div key={sIdx} className="ps-spec-item">
                              <span className="ps-spec-val" style={{ color: project.accent }}>{spec.value}</span>
                              <span className="ps-spec-lbl">{spec.label}</span>
                            </div>
                          ))}
                        </motion.div>

                        <motion.button
                          variants={textItemVariants}
                          className="ps-action-btn"
                          style={{ '--btn-accent': project.accent, '--btn-accent-rgb': project.accentRgb }}
                        >
                          <span>VIEW PROJECT</span>
                          <ArrowUpRight size={14} className="ps-action-icon" />
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default ProfileShowcase;
