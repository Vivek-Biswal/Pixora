import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowUpRight, Play, Maximize2 } from 'lucide-react';
import './ProfileShowcase.css';

const profiles = [
  {
    id: 1,
    title: 'Linear.app Concept',
    subtitle: 'ISSUE TRACKING REDEFINED',
    tags: 'WORKSPACE • EFFICIENCY • DESIGN',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
    videoUrl: 'https://cdn.pixabay.com/video/2021/08/04/83866-584745300_large.mp4',
    description: 'A visionary approach to software building. Seamless issue tracking, lighting-fast performance, and a dark-mode first aesthetic designed for elite product teams.',
    accent: '#a855f7',
    accentRgb: '168, 85, 247',
    code: 'LN-01',
    specs: [
      { label: 'RENDER SPEED', value: '1.2ms' },
      { label: 'ARCHITECTURE', value: 'EDGE' },
      { label: 'SYNC ENGINE', value: 'REAL-TIME' }
    ]
  },
  {
    id: 2,
    title: 'Stripe Checkout',
    subtitle: 'FINANCIAL INFRASTRUCTURE',
    tags: 'PAYMENTS • CONVERSION • GLOBAL',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
    videoUrl: 'https://cdn.pixabay.com/video/2020/07/31/46122-446700812_large.mp4',
    description: "The gold standard of internet economy infrastructure. Maximizing conversion with beautifully designed, fiercely optimized checkout flows and global routing.",
    accent: '#3b82f6',
    accentRgb: '59, 130, 246',
    code: 'ST-02',
    specs: [
      { label: 'UPTIME', value: '99.999%' },
      { label: 'SECURITY', value: 'PCI-DSS' },
      { label: 'GLOBAL REACH', value: '195 COUNTRIES' }
    ]
  },
  {
    id: 3,
    title: 'Vercel Deployment',
    subtitle: 'THE FRONTEND CLOUD',
    tags: 'HOSTING • PERFORMANCE • DX',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop',
    videoUrl: 'https://cdn.pixabay.com/video/2023/10/22/186064-876935292_large.mp4',
    description: 'Empowering developers to create at the speed of thought. Zero-configuration deployments, global edge networks, and an unparalleled developer experience.',
    accent: '#ec4899',
    accentRgb: '236, 72, 153',
    code: 'VC-03',
    specs: [
      { label: 'LATENCY', value: '<50ms' },
      { label: 'EDGE NODES', value: '200+' },
      { label: 'FRAMEWORKS', value: 'AGNOSTIC' }
    ]
  }
];

const ProfileShowcase = () => {
  const [index, setIndex] = useState(0);
  const containerRef = useRef(null);

  // Advanced Mouse tilt physics for the active card (faster, smoother)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 }; // Snappier Apple-like feel
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);
  const glowX = useSpring(useTransform(mouseX, [-0.5, 0.5], ['20%', '80%']), springConfig);
  const glowY = useSpring(useTransform(mouseY, [-0.5, 0.5], ['20%', '80%']), springConfig);

  const next = () => setIndex((i) => (i + 1) % profiles.length);
  const prev = () => setIndex((i) => (i - 1 + profiles.length) % profiles.length);

  const currentProject = profiles[index];

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = (e.clientX - rect.left) / width - 0.5;
    const y = (e.clientY - rect.top) / height - 0.5;
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
  }, []);

  const particles = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 10,
      opacity: Math.random() * 0.5 + 0.2
    }));
  }, []);

  // Compute 3D stage layout coordinates
  const getCardTransform = (cardIndex) => {
    let diff = cardIndex - index;
    if (diff < -1) diff += profiles.length;
    if (diff > 1) diff -= profiles.length;

    if (diff === 0) {
      return {
        active: true,
        zIndex: 10,
        opacity: 1,
        scale: 1,
        x: '0%',
        z: 0,
        rotateY: 0,
        filter: 'blur(0px)',
        pointerEvents: 'auto'
      };
    } else if (diff === -1 || diff === profiles.length - 1) {
      return {
        active: false,
        zIndex: 5,
        opacity: 0.15,
        scale: 0.85,
        x: '-45%',
        z: -150,
        rotateY: 25,
        filter: 'blur(8px)',
        pointerEvents: 'none'
      };
    } else {
      return {
        active: false,
        zIndex: 5,
        opacity: 0.15,
        scale: 0.85,
        x: '45%',
        z: -150,
        rotateY: -25,
        filter: 'blur(8px)',
        pointerEvents: 'none'
      };
    }
  };

  // Cinematic staggered text reveals
  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: 0.15 }
    }
  };

  const textItemVariants = {
    hidden: { opacity: 0, y: 15, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { type: 'spring', stiffness: 120, damping: 14 }
    }
  };

  // Word-by-word reveal for description
  const descriptionWords = currentProject.description.split(' ');

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
      {/* Background Mesh & Depth */}
      <div className="ps-grid-overlay" />
      <div className="ps-grid-mask" />
      
      {/* Cinematic Particles */}
      <div className="ps-particles">
        {particles.map((p) => (
          <div
            key={p.id}
            className="ps-particle"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              opacity: p.opacity,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              boxShadow: `0 0 12px rgba(${currentProject.accentRgb}, 0.8)`
            }}
          />
        ))}
      </div>

      {/* Dynamic Moving Orbs */}
      <AnimatePresence>
        <motion.div
          key={`orb-1-${index}`}
          className="ps-ambient-glow ps-glow-1"
          initial={{ opacity: 0, scale: 0.8, x: '-5%', y: '-5%' }}
          animate={{ opacity: 0.35, scale: 1.3, x: '5%', y: '5%' }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 2, ease: "easeOut" }}
          style={{
            background: `radial-gradient(circle, rgba(${currentProject.accentRgb}, 0.4) 0%, transparent 65%)`
          }}
        />
        <motion.div
          key={`orb-2-${index}`}
          className="ps-ambient-glow ps-glow-2"
          initial={{ opacity: 0, scale: 0.7, x: '10%', y: '10%' }}
          animate={{ opacity: 0.25, scale: 1.1, x: '-5%', y: '-5%' }}
          exit={{ opacity: 0, scale: 0.7 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          style={{
            background: `radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 60%)`
          }}
        />
      </AnimatePresence>

      <div className="ps-header">
        <div className="ps-logo-container">
          <span className="ps-logo-scan-dot" />
          <div className="ps-logo">PIXORA DIGITAL GALLERY</div>
        </div>
      </div>

      {/* Main 3D Carousel Stage */}
      <div className="ps-stage">
        {profiles.map((project, idx) => {
          const layout = getCardTransform(idx);
          
          return (
            <motion.div
              key={project.id}
              className={`ps-card-container ${layout.active ? 'active' : ''}`}
              style={{
                zIndex: layout.zIndex,
                pointerEvents: layout.pointerEvents,
              }}
              animate={{
                x: layout.x,
                z: layout.z,
                rotateY: layout.rotateY,
                opacity: layout.opacity,
                scale: layout.scale,
                filter: layout.filter
              }}
              transition={{
                type: 'spring',
                stiffness: 80,
                damping: 20,
                mass: 0.8
              }}
            >
              <motion.div
                className="ps-card-inner"
                style={
                  layout.active
                    ? {
                        rotateX,
                        rotateY,
                        transformStyle: 'preserve-3d',
                      }
                    : { transformStyle: 'preserve-3d' }
                }
                whileHover={layout.active ? { scale: 1.015, translateZ: 20 } : {}}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                drag={layout.active ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(e, info) => {
                  if (info.offset.x < -50) next();
                  else if (info.offset.x > 50) prev();
                }}
              >
                {/* Mouse-reactive inner glow */}
                {layout.active && (
                  <motion.div 
                    className="ps-card-mouse-glow"
                    style={{
                      background: `radial-gradient(800px circle at ${glowX} ${glowY}, rgba(${project.accentRgb}, 0.15), transparent 40%)`
                    }}
                  />
                )}
                
                <div 
                  className="ps-card-glow-border" 
                  style={{ borderColor: `rgba(${project.accentRgb}, 0.4)` }}
                />
                
                <div className="ps-card-content">
                  
                  {/* VISUAL COLUMN (Device Frame) */}
                  <div className="ps-card-visual">
                    <div className="ps-device-frame">
                      {/* macOS style window controls */}
                      <div className="ps-device-topbar">
                        <div className="ps-device-dots">
                          <span className="dot close" />
                          <span className="dot min" />
                          <span className="dot max" />
                        </div>
                        <div className="ps-device-url">pixora.dev/projects/{project.code.toLowerCase()}</div>
                      </div>
                      
                      {/* Video/Iframe Container */}
                      <div className="ps-device-screen">
                        {/* Fallback poster image or loading state can be added, using video for now */}
                        <video 
                          className="ps-device-video" 
                          src={project.videoUrl} 
                          poster={project.image}
                          autoPlay 
                          loop 
                          muted 
                          playsInline 
                        />
                        <div className="ps-device-reflection" />
                        {/* Hover Overlay elements */}
                        <div className="ps-device-hover-ui">
                          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="ps-play-btn">
                            <Play size={20} fill="currentColor" />
                          </motion.button>
                          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="ps-expand-btn">
                            <Maximize2 size={16} />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* DATA COLUMN */}
                  <div className="ps-card-details">
                    <AnimatePresence mode="wait">
                      {layout.active && (
                        <motion.div
                          key={`info-${project.id}`}
                          variants={textContainerVariants}
                          initial="hidden"
                          animate="visible"
                          className="ps-details-wrapper"
                        >
                          <motion.span 
                            variants={textItemVariants} 
                            className="ps-tag-label"
                            style={{ color: project.accent, textShadow: `0 0 12px rgba(${project.accentRgb}, 0.5)` }}
                          >
                            CASE STUDY // {project.code}
                          </motion.span>

                          <motion.h2 variants={textItemVariants} className="ps-title">
                            {project.title}
                          </motion.h2>
                          <motion.h3 variants={textItemVariants} className="ps-subtitle">
                            {project.subtitle}
                          </motion.h3>

                          {/* Word-by-word staggered description */}
                          <motion.p variants={textItemVariants} className="ps-description">
                            {descriptionWords.map((word, wIdx) => (
                              <motion.span key={wIdx} className="ps-desc-word">
                                {word}{' '}
                              </motion.span>
                            ))}
                          </motion.p>

                          <motion.div variants={textItemVariants} className="ps-specs-table">
                            {project.specs.map((spec, sIdx) => (
                              <div key={sIdx} className="ps-spec-row">
                                <span className="ps-spec-label">{spec.label}</span>
                                <span 
                                  className="ps-spec-value" 
                                  style={{ color: project.accent, textShadow: `0 0 8px rgba(${project.accentRgb}, 0.4)` }}
                                >
                                  {spec.value}
                                </span>
                              </div>
                            ))}
                          </motion.div>

                          <motion.button 
                            variants={textItemVariants} 
                            className="ps-action-btn"
                            style={{ 
                              '--btn-accent': project.accent,
                              '--btn-accent-rgb': project.accentRgb
                            }}
                          >
                            <span>VIEW LIVE PROJECT</span>
                            <ArrowUpRight size={16} className="ps-action-icon" />
                          </motion.button>

                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Advanced Magnetic Bottom Navigation */}
      <div className="ps-adv-timeline">
        <div className="ps-timeline-track">
          {profiles.map((p, idx) => {
            const isActive = index === idx;
            return (
              <div 
                key={p.id} 
                className={`ps-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setIndex(idx)}
                style={{
                  '--nav-accent': p.accent,
                  '--nav-accent-rgb': p.accentRgb
                }}
              >
                {/* Thumbnail Tooltip */}
                <div className="ps-nav-tooltip">
                  <img src={p.image} alt={p.title} className="ps-nav-thumb" />
                  <span className="ps-nav-tooltip-title">{p.title}</span>
                </div>
                
                <span className="ps-nav-text">0{p.id}</span>
                
                {isActive && (
                  <motion.div 
                    layoutId="navIndicator"
                    className="ps-nav-indicator"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProfileShowcase;

