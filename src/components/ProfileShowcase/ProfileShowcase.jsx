import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import './ProfileShowcase.css';

const profiles = [
  {
    id: 1,
    title: 'Sharma Dental Clinic',
    subtitle: 'HEALTHCARE · BHUBANESWAR',
    tags: ['BUSINESS SITE', 'BOOKING', 'SEO'],
    imageUrl: '/showcase/sharma_dental.png',
    description: 'A premium dental clinic website with online appointment booking, patient portal, and Google-first SEO. Bookings increased 3x within 30 days of launch.',
    accent: '#8B5CF6',
    accentRgb: '139, 92, 246',
    code: 'SD-01',
    url: 'sharmadental.in',
    specs: [
      { label: 'DELIVERY', value: '6 Days' },
      { label: 'BOOKINGS', value: '+3x' },
      { label: 'SCORE', value: '98/100' }
    ]
  },
  {
    id: 2,
    title: 'FitZone Gym',
    subtitle: 'FITNESS · DELHI',
    tags: ['LANDING PAGE', 'PAYMENTS', 'LEADS'],
    imageUrl: '/showcase/fitzone_gym.png',
    description: 'High-converting gym membership landing page with Razorpay integration, trial booking flow, and WhatsApp lead capture. 40+ new members in week one.',
    accent: '#10B981',
    accentRgb: '16, 185, 129',
    code: 'FZ-02',
    url: 'fitzonegym.in',
    specs: [
      { label: 'DELIVERY', value: '5 Days' },
      { label: 'MEMBERS', value: '+40' },
      { label: 'CVR', value: '8.5%' }
    ]
  },
  {
    id: 3,
    title: 'Spice Garden Restaurant',
    subtitle: 'F&B · MUMBAI',
    tags: ['E-COMMERCE', 'ORDERING', 'MENU'],
    imageUrl: '/showcase/spice_garden.png',
    description: 'A full restaurant website with online ordering, table reservations, digital menu, and Instagram integration. Revenue from online orders up 220% in month one.',
    accent: '#F59E0B',
    accentRgb: '245, 158, 11',
    code: 'SG-03',
    url: 'spicegarden.in',
    specs: [
      { label: 'DELIVERY', value: '7 Days' },
      { label: 'REVENUE', value: '+220%' },
      { label: 'ORDERS', value: 'DAILY' }
    ]
  },
  {
    id: 4,
    title: 'GlowUp Beauty Salon',
    subtitle: 'BEAUTY · CHENNAI',
    tags: ['BOOKING', 'GALLERY', 'REVIEWS'],
    imageUrl: '/showcase/glowup_salon.png',
    description: 'A stunning salon website with online appointment scheduling, service catalog, before-after gallery, and automated WhatsApp reminders. Walk-ins dropped 60% as clients booked online.',
    accent: '#EC4899',
    accentRgb: '236, 72, 153',
    code: 'GU-04',
    url: 'glowupsalon.in',
    specs: [
      { label: 'DELIVERY', value: '5 Days' },
      { label: 'BOOKINGS', value: '+85%' },
      { label: 'REVIEWS', value: '4.9★' }
    ]
  },
  {
    id: 5,
    title: 'UrbanNest Realty',
    subtitle: 'REAL ESTATE · GURUGRAM',
    tags: ['LISTINGS', 'CRM', 'LEAD GEN'],
    imageUrl: '/showcase/urbannest_realty.png',
    description: 'Property listing platform with advanced filters, virtual tour integration, lead capture forms, and agent dashboard. Lead quality improved 4x with verified inquiry system.',
    accent: '#3B82F6',
    accentRgb: '59, 130, 246',
    code: 'UN-05',
    url: 'urbannest.in',
    specs: [
      { label: 'DELIVERY', value: '10 Days' },
      { label: 'LEADS', value: '+4x' },
      { label: 'LISTINGS', value: '200+' }
    ]
  },
  {
    id: 6,
    title: 'PureBliss Yoga Studio',
    subtitle: 'WELLNESS · BANGALORE',
    tags: ['MEMBERSHIP', 'SCHEDULE', 'BLOG'],
    imageUrl: '/showcase/purebliss_yoga.png',
    description: 'Minimalist yoga studio website with class scheduling, membership plans, instructor profiles, and a wellness blog. Online memberships grew 150% in the first quarter.',
    accent: '#14B8A6',
    accentRgb: '20, 184, 166',
    code: 'PB-06',
    url: 'purebliss.in',
    specs: [
      { label: 'DELIVERY', value: '6 Days' },
      { label: 'MEMBERS', value: '+150%' },
      { label: 'RETENTION', value: '92%' }
    ]
  },
  {
    id: 7,
    title: 'CloudKitchen Co',
    subtitle: 'FOOD DELIVERY · HYDERABAD',
    tags: ['E-COMMERCE', 'DELIVERY', 'ANALYTICS'],
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&auto=format&fit=crop',
    description: 'Multi-brand cloud kitchen website with online ordering, delivery tracking, menu management, and analytics dashboard. Average order value increased 35% with upsell features.',
    accent: '#EF4444',
    accentRgb: '239, 68, 68',
    code: 'CK-07',
    url: 'cloudkitchen.co.in',
    specs: [
      { label: 'DELIVERY', value: '8 Days' },
      { label: 'AOV', value: '+35%' },
      { label: 'ORDERS', value: '500+/mo' }
    ]
  },
  {
    id: 8,
    title: 'CareFirst Physiotherapy',
    subtitle: 'HEALTHCARE · PUNE',
    tags: ['BOOKING', 'PATIENT PORTAL', 'SEO'],
    imageUrl: '/showcase/carefirst_physio.png',
    description: 'A professional physiotherapy clinic website with patient intake forms, appointment booking, exercise video library, and insurance verification. New patient registrations tripled.',
    accent: '#06B6D4',
    accentRgb: '6, 182, 212',
    code: 'CF-08',
    url: 'carefirst.in',
    specs: [
      { label: 'DELIVERY', value: '7 Days' },
      { label: 'PATIENTS', value: '+3x' },
      { label: 'SCORE', value: '96/100' }
    ]
  },
  {
    id: 9,
    title: 'Ananya Couture Boutique',
    subtitle: 'FASHION · KOLKATA',
    tags: ['E-COMMERCE', 'LOOKBOOK', 'UPI PAY'],
    imageUrl: '/showcase/ananya_couture.png',
    description: 'A premium fashion e-commerce store with lookbook galleries, size guide, Razorpay/UPI checkout, and Instagram shop integration. Online sales tripled within 30 days of launch.',
    accent: '#A855F7',
    accentRgb: '168, 85, 247',
    code: 'AC-09',
    url: 'ananyacouture.in',
    specs: [
      { label: 'DELIVERY', value: '12 Days' },
      { label: 'SALES', value: '+3x' },
      { label: 'PRODUCTS', value: '350+' }
    ]
  },
  {
    id: 10,
    title: 'TechLaunch Academy',
    subtitle: 'EDTECH · JAIPUR',
    tags: ['LMS', 'PAYMENTS', 'DASHBOARD'],
    imageUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1200&auto=format&fit=crop',
    description: 'An ed-tech platform with course catalog, student dashboard, video lectures, quiz system, and Razorpay subscription billing. Enrolled 800+ students in the first 3 months.',
    accent: '#F97316',
    accentRgb: '249, 115, 22',
    code: 'TL-10',
    url: 'techlaunch.in',
    specs: [
      { label: 'DELIVERY', value: '14 Days' },
      { label: 'STUDENTS', value: '800+' },
      { label: 'COURSES', value: '25+' }
    ]
  },
];

/* Ultra-smooth easing curve (approximates CSS ease-in-out with extra silkiness) */
const silkyEase = [0.25, 0.1, 0.25, 1.0];
const TRANSITION_DURATION = 0.85;
const AUTO_ROTATE_MS = 5000;

const ProfileShowcase = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back
  const containerRef = useRef(null);
  const autoTimerRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 35, stiffness: 80, mass: 0.8 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), springConfig);

  const resetAutoTimer = useCallback(() => {
    if (autoTimerRef.current) clearInterval(autoTimerRef.current);
    autoTimerRef.current = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % profiles.length);
    }, AUTO_ROTATE_MS);
  }, []);

  const next = useCallback(() => {
    setDirection(1);
    setIndex((i) => (i + 1) % profiles.length);
    resetAutoTimer();
  }, [resetAutoTimer]);

  const prev = useCallback(() => {
    setDirection(-1);
    setIndex((i) => (i - 1 + profiles.length) % profiles.length);
    resetAutoTimer();
  }, [resetAutoTimer]);

  const goTo = useCallback((target) => {
    setDirection(target > index ? 1 : -1);
    setIndex(target);
    resetAutoTimer();
  }, [index, resetAutoTimer]);

  const currentProject = profiles[index];

  const handleMouseMove = (e) => {
    if (!containerRef.current || window.innerWidth < 768) return;
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

  // Auto-rotation — single persistent interval
  useEffect(() => {
    resetAutoTimer();
    return () => {
      if (autoTimerRef.current) clearInterval(autoTimerRef.current);
    };
  }, [resetAutoTimer]);

  /* Card positioning — only show active, prev, next for performance */
  const getCardTransform = (cardIndex) => {
    const total = profiles.length;
    let diff = cardIndex - index;

    // Normalize to range [-half, half]
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    if (diff === 0) {
      return {
        active: true, zIndex: 10, opacity: 1, scale: 1,
        x: '0%', z: 0, rotateY: 0, filter: 'blur(0px)',
        pointerEvents: 'auto', display: true,
      };
    } else if (diff === -1) {
      return {
        active: false, zIndex: 5, opacity: 0.15, scale: 0.82,
        x: '-55%', z: -250, rotateY: 35, filter: 'blur(8px)',
        pointerEvents: 'none', display: true,
      };
    } else if (diff === 1) {
      return {
        active: false, zIndex: 5, opacity: 0.15, scale: 0.82,
        x: '55%', z: -250, rotateY: -35, filter: 'blur(8px)',
        pointerEvents: 'none', display: true,
      };
    } else {
      return {
        active: false, zIndex: 0, opacity: 0, scale: 0.7,
        x: diff < 0 ? '-80%' : '80%', z: -400, rotateY: diff < 0 ? 50 : -50,
        filter: 'blur(12px)', pointerEvents: 'none', display: false,
      };
    }
  };

  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.15 }
    }
  };

  const textItemVariants = {
    hidden: { opacity: 0, y: 16, filter: 'blur(8px)' },
    visible: {
      opacity: 1, y: 0, filter: 'blur(0px)',
      transition: { duration: 0.5, ease: silkyEase }
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
      {/* Ambient Glows */}
      <AnimatePresence>
        <motion.div key={`orb-1-${index}`} className="ps-ambient-glow ps-glow-1"
          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 0.25, scale: 1.15 }}
          exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 2.5, ease: silkyEase }}
          style={{ background: `radial-gradient(circle, rgba(${currentProject.accentRgb}, 0.3) 0%, transparent 65%)` }}
        />
        <motion.div key={`orb-2-${index}`} className="ps-ambient-glow ps-glow-2"
          initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 0.15, scale: 1.05 }}
          exit={{ opacity: 0, scale: 0.7 }} transition={{ duration: 3, ease: silkyEase }}
          style={{ background: `radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 55%)` }}
        />
      </AnimatePresence>

      {/* Header */}
      <div className="ps-header">
        <div className="ps-logo-container">
          <span className="ps-logo-scan-dot" />
          <div className="ps-logo">PIXORA — FEATURED WORK</div>
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

          /* Don't render cards too far away for performance */
          if (!layout.display) return null;

          return (
            <motion.div
              key={project.id}
              className={`ps-card-container ${layout.active ? 'active' : ''}`}
              style={{ zIndex: layout.zIndex, pointerEvents: layout.pointerEvents }}
              animate={{
                x: layout.x, z: layout.z, rotateY: layout.rotateY,
                opacity: layout.opacity, scale: layout.scale, filter: layout.filter
              }}
              transition={{
                duration: TRANSITION_DURATION,
                ease: [0.32, 0.72, 0, 1], /* ultra-smooth deceleration curve */
              }}
            >
              <motion.div
                className="ps-card-inner"
                style={layout.active ? { rotateX, rotateY, transformStyle: 'preserve-3d' } : { transformStyle: 'preserve-3d' }}
                whileHover={layout.active ? { scale: 1.008 } : {}}
                transition={{ duration: 0.4, ease: silkyEase }}
                drag={layout.active ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.12}
                onDragEnd={(e, info) => {
                  if (info.offset.x < -60) next();
                  else if (info.offset.x > 60) prev();
                }}
              >
                <div className="ps-card-glow-border" style={{ borderColor: `rgba(${project.accentRgb}, 0.45)` }} />

                {/* === DEVICE FRAME === */}
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

                  {/* Website Image */}
                  <div className="ps-screen">
                    <img
                      src={project.imageUrl}
                      alt={`${project.title} preview`}
                      className="ps-screenshot"
                      loading="lazy"
                      style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                    />
                  </div>

                  {/* Glass Reflection */}
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
                      exit="hidden"
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
                          <span>VIEW CASE STUDY</span>
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

      {/* Progress Dots */}
      <div className="ps-progress-bar">
        <div className="ps-dots-container">
          {profiles.map((project, idx) => (
            <button
              key={project.id}
              className={`ps-dot ${idx === index ? 'ps-dot--active' : ''}`}
              onClick={() => goTo(idx)}
              aria-label={`Go to ${project.title}`}
            >
              <span
                className="ps-dot-fill"
                style={idx === index ? {
                  background: currentProject.accent,
                  boxShadow: `0 0 10px ${currentProject.accent}`
                } : {}}
              />
            </button>
          ))}
        </div>
        <div className="ps-counter">
          <span className="ps-counter-current" style={{ color: currentProject.accent }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="ps-counter-sep">/</span>
          <span className="ps-counter-total">{String(profiles.length).padStart(2, '0')}</span>
        </div>
      </div>
    </section>
  );
};

export default ProfileShowcase;
