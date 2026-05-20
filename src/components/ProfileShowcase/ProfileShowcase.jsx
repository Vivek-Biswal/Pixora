import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import './ProfileShowcase.css';

const profiles = [
  {
    id: 1,
    title: 'Virginia Woolf',
    subtitle: 'THE WAVES',
    tags: 'CONSCIOUSNESS • MEMORY • IDENTITY',
    image: 'https://images.unsplash.com/photo-1544502062-f82887f03d1c?auto=format&fit=crop&w=800&q=80',
    description: 'A pioneering dive into the fluid stream of consciousness. Deciphering the silent dialogues of the soul across the canvas of time, language, and human memory.',
    accent: '#a855f7',
    accentRgb: '168, 85, 247',
    code: 'VW-1931',
    specs: [
      { label: 'COGNITIVE RESOLUTION', value: '98.6%' },
      { label: 'TEMPORAL MATRIX', value: 'FLUID' },
      { label: 'LITERARY DENSITY', value: 'EXPONENTIAL' }
    ]
  },
  {
    id: 2,
    title: 'Marcus Aurelius',
    subtitle: 'MEDITATIONS',
    tags: 'STOICISM • STABILITY • RATIONAL MIND',
    image: 'https://images.unsplash.com/photo-1560961911-ba7fea0a2a3a?auto=format&fit=crop&w=800&q=80',
    description: "An emperor's timeless code of mental fortitude and inner peace. An intimate private dialogue on cosmic order, resilience, and the unbreakable human spirit.",
    accent: '#3b82f6',
    accentRgb: '59, 130, 246',
    code: 'MA-180',
    specs: [
      { label: 'STOIC RATIO', value: '100%' },
      { label: 'EQUANIMITY STATE', value: 'STABLE' },
      { label: 'SOVEREIGN CONTROL', value: 'ACTIVE' }
    ]
  },
  {
    id: 3,
    title: 'Frida Kahlo',
    subtitle: 'THE TWO FRIDAS',
    tags: 'SURREALISM • CHRONIC FORCE • HERITAGE',
    image: 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&w=800&q=80',
    description: 'A raw, vibrant translation of physical pain into transcendent surrealist art. Mapping identity, legacy, and the fierce dualities of existence.',
    accent: '#ec4899',
    accentRgb: '236, 72, 153',
    code: 'FK-1939',
    specs: [
      { label: 'VITALITY SPECTRUM', value: 'MAXIMAL' },
      { label: 'DUAL-SELF EMISSION', value: 'RESONANT' },
      { label: 'EXPRESSIVE ENERGY', value: '99.4%' }
    ]
  }
];

const ProfileShowcase = () => {
  const [index, setIndex] = useState(0);
  const containerRef = useRef(null);

  // Mouse tilt physics for the active card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120, mass: 0.8 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);

  const next = () => setIndex((i) => (i + 1) % profiles.length);
  const prev = () => setIndex((i) => (i - 1 + profiles.length) % profiles.length);

  const currentProject = profiles[index];

  // Mouse move handler for active parallax
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

  // Keyboard navigation listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Generate background particles once
  const particles = useMemo(() => {
    return Array.from({ length: 28 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1.5,
      delay: Math.random() * 8,
      duration: Math.random() * 15 + 10,
      opacity: Math.random() * 0.35 + 0.15
    }));
  }, []);

  // Compute 3D stage layout coordinates for infinite loop
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
        opacity: 0.25,
        scale: 0.78,
        x: '-36%',
        z: -250,
        rotateY: 40,
        filter: 'blur(4px)',
        pointerEvents: 'none'
      };
    } else {
      return {
        active: false,
        zIndex: 5,
        opacity: 0.25,
        scale: 0.78,
        x: '36%',
        z: -250,
        rotateY: -40,
        filter: 'blur(4px)',
        pointerEvents: 'none'
      };
    }
  };

  // Text transition stagger animations
  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1
      }
    }
  };

  const textItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 14 }
    }
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
      {/* Background Neon Grid & Dust */}
      <div className="ps-grid-overlay" />
      <div className="ps-grid-mask" />
      
      {/* Floating Particles */}
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
              boxShadow: `0 0 10px rgba(${currentProject.accentRgb}, 0.6)`
            }}
          />
        ))}
      </div>

      {/* Morphing Ambient Background Glowing Blobs */}
      <AnimatePresence>
        <motion.div
          key={`ambient-glow-1-${index}`}
          className="ps-ambient-glow ps-glow-1"
          initial={{ opacity: 0, scale: 0.8, x: '-10%', y: '-10%' }}
          animate={{ opacity: 0.4, scale: 1.25, x: '0%', y: '0%' }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: `radial-gradient(circle, rgba(${currentProject.accentRgb}, 0.35) 0%, transparent 60%)`
          }}
        />
        <motion.div
          key={`ambient-glow-2-${index}`}
          className="ps-ambient-glow ps-glow-2"
          initial={{ opacity: 0, scale: 0.7, x: '10%', y: '10%' }}
          animate={{ opacity: 0.35, scale: 1.15, x: '0%', y: '0%' }}
          exit={{ opacity: 0, scale: 0.7 }}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: `radial-gradient(circle, rgba(255, 255, 255, 0.12) 0%, transparent 55%)`
          }}
        />
      </AnimatePresence>

      {/* Futuristic Header */}
      <div className="ps-header">
        <div className="ps-logo-container">
          <span className="ps-logo-scan-dot" />
          <div className="ps-logo">PIXORA DIGITAL GALLERY</div>
        </div>
      </div>

      {/* Circular Nav Buttons */}
      <button className="ps-nav ps-prev" onClick={prev} aria-label="Previous Project">
        <svg className="ps-nav-svg-ring" viewBox="0 0 100 100">
          <circle className="ps-nav-circle-bg" cx="50" cy="50" r="45" />
          <circle 
            className="ps-nav-circle-glow" 
            cx="50" 
            cy="50" 
            r="45" 
            style={{ stroke: currentProject.accent }}
          />
        </svg>
        <ChevronLeft size={24} className="ps-nav-icon" />
      </button>

      <button className="ps-nav ps-next" onClick={next} aria-label="Next Project">
        <svg className="ps-nav-svg-ring" viewBox="0 0 100 100">
          <circle className="ps-nav-circle-bg" cx="50" cy="50" r="45" />
          <circle 
            className="ps-nav-circle-glow" 
            cx="50" 
            cy="50" 
            r="45" 
            style={{ stroke: currentProject.accent }}
          />
        </svg>
        <ChevronRight size={24} className="ps-nav-icon" />
      </button>

      {/* 3D Exhibition Stage */}
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
                stiffness: 90,
                damping: 20,
                mass: 0.9
              }}
            >
              {/* Inner card containing holographic interactive elements */}
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
                whileHover={layout.active ? { scale: 1.02 } : {}}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                // Swipe support via Framer Motion drag gestures
                drag={layout.active ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.3}
                onDragEnd={(e, info) => {
                  const swipeThreshold = 60;
                  if (info.offset.x < -swipeThreshold) next();
                  else if (info.offset.x > swipeThreshold) prev();
                }}
              >
                {/* Active Glowing Tint Borders */}
                <div 
                  className="ps-card-glow-border" 
                  style={{ borderColor: `rgba(${project.accentRgb}, 0.25)` }}
                />
                
                {/* Glass Card content */}
                <div className="ps-card-content">
                  
                  {/* Visual Portrait Column */}
                  <div className="ps-card-visual">
                    <div className="ps-portrait-container">
                      <img src={project.image} className="ps-image" alt={project.title} />
                      <div className="ps-hologram-overlay" />
                      <div className="ps-scanner-line" style={{ background: `linear-gradient(to bottom, transparent, ${project.accent}, transparent)` }} />
                    </div>
                    {/* Sci-fi absolute widgets */}
                    <div className="ps-widget-coord">{project.code}</div>
                    <div className="ps-widget-pulse" style={{ backgroundColor: project.accent }} />
                  </div>

                  {/* Informational Data Column */}
                  <div className="ps-card-details">
                    <AnimatePresence mode="wait">
                      {layout.active && (
                        <motion.div
                          key={`info-${project.id}`}
                          variants={textContainerVariants}
                          initial="hidden"
                          animate="visible"
                        >
                          {/* Tags / Badges */}
                          <motion.span 
                            variants={textItemVariants} 
                            className="ps-tag-label"
                            style={{ color: project.accent }}
                          >
                            SYSTEM ARCHIVE // 00{project.id}
                          </motion.span>

                          {/* Title & Subtitle */}
                          <motion.h2 variants={textItemVariants} className="ps-title">
                            {project.title}
                          </motion.h2>
                          <motion.h3 
                            variants={textItemVariants} 
                            className="ps-subtitle"
                            style={{ textShadow: `0 0 10px rgba(${project.accentRgb}, 0.3)` }}
                          >
                            {project.subtitle}
                          </motion.h3>

                          {/* Short Narrative */}
                          <motion.p variants={textItemVariants} className="ps-description">
                            {project.description}
                          </motion.p>

                          {/* Digital specs / Readouts */}
                          <motion.div variants={textItemVariants} className="ps-specs-table">
                            {project.specs.map((spec, sIdx) => (
                              <div key={sIdx} className="ps-spec-row">
                                <span className="ps-spec-label">{spec.label}</span>
                                <span 
                                  className="ps-spec-value" 
                                  style={{ color: project.accent }}
                                >
                                  {spec.value}
                                </span>
                              </div>
                            ))}
                          </motion.div>

                          {/* Interactive Button */}
                          <motion.button 
                            variants={textItemVariants} 
                            className="ps-action-btn"
                            style={{ 
                              '--btn-accent': project.accent,
                              '--btn-accent-rgb': project.accentRgb
                            }}
                          >
                            <span>EXPLORE EXPERIENCE</span>
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

      {/* Immersive Bottom Navigation Timeline */}
      <div className="ps-timeline">
        <div className="ps-timeline-label">ARCHIVE MATRIX INDEX</div>
        <div className="ps-timeline-track">
          {profiles.map((p, idx) => (
            <button
              key={p.id}
              className={`ps-timeline-dash ${index === idx ? 'active' : ''}`}
              onClick={() => setIndex(idx)}
              aria-label={`Jump to project ${idx + 1}`}
              style={{
                '--dash-accent': p.accent,
                '--dash-accent-rgb': p.accentRgb
              }}
            >
              <span className="ps-timeline-dash-num">0{p.id}</span>
              <span className="ps-timeline-dash-line" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfileShowcase;

