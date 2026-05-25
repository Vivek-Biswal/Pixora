import { useState, useRef, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import {
  ArrowRight, Check, Monitor, ShoppingCart, Search, Settings, Zap, Layout,
  Star, Plus, BarChart3, Shield, Users, HeartHandshake,
  MessageCircle, Palette, Code, Rocket
} from 'lucide-react';
import './Home.css';
import ProfileShowcase from '../../components/ProfileShowcase/ProfileShowcase';
import HeroMockup from '../../components/HeroMockup/HeroMockup';

/* ---- Animation Variants ---- */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }
  })
};

const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

/* ---- Animated Section Wrapper ---- */
const Section = ({ children, className = '', id }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={stagger}
    >
      {children}
    </motion.section>
  );
};

/* ---- Spotlight Card ---- */
const SpotlightCard = ({ children, className = '' }) => {
  const cardRef = useRef(null);
  const handleMouse = useCallback((e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cardRef.current.style.setProperty('--mouse-x', `${x}%`);
    cardRef.current.style.setProperty('--mouse-y', `${y}%`);
  }, []);
  return (
    <motion.div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouse}
      variants={fadeUp}
    >
      {children}
    </motion.div>
  );
};

/* ============================================================ */

const StatCounter = ({ value, label, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  
  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = parseInt(value);
      if (isNaN(end)) return;
      const duration = 1500;
      const incrementTime = 16;
      const step = end / (duration / incrementTime);
      
      const timer = setInterval(() => {
        start += step;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(start));
        }
      }, incrementTime);
      return () => clearInterval(timer);
    }
  }, [inView, value]);

  return (
    <div className="stat-item" ref={ref}>
      <span className="stat-num">{count}{suffix}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
};

const Home = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  /* ---- Interactive Parallax Hooks ---- */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 100, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Background layers (slow, opposite direction)
  const blobX = useTransform(smoothMouseX, [-500, 500], [25, -25]);
  const blobY = useTransform(smoothMouseY, [-500, 500], [25, -25]);
  const blobXReverse = useTransform(smoothMouseX, [-500, 500], [-25, 25]);
  const blobYReverse = useTransform(smoothMouseY, [-500, 500], [-25, 25]);



  // Parallax reveal for statement section
  const statementRef = useRef(null);
  const { scrollYProgress: statementScroll } = useScroll({
    target: statementRef,
    offset: ["start end", "end start"]
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Only apply on desktop to avoid weird mobile behavior
      if (window.innerWidth < 768) return;
      const { innerWidth, innerHeight } = window;
      const x = e.clientX - innerWidth / 2;
      const y = e.clientY - innerHeight / 2;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  /* ---- Data ---- */
  const services = [
    {
      icon: <Monitor size={22} />,
      title: 'Business Websites',
      desc: 'A premium site that builds trust, captures leads, and ranks on Google.',
      from: '₹24,999',
      color: '#8B5CF6',
      colorRgb: '139, 92, 246',
      featured: true,
    },
    {
      icon: <ShoppingCart size={22} />,
      title: 'E-Commerce Stores',
      desc: 'Full online store with payments, inventory, and seamless checkout.',
      from: '₹49,999',
      color: '#3B82F6',
      colorRgb: '59, 130, 246',
      featured: false,
    },
    {
      icon: <Search size={22} />,
      title: 'SEO Optimization',
      desc: 'Rank on page 1 of Google. More traffic, more leads, zero guesswork.',
      from: '₹9,999/mo',
      color: '#10B981',
      colorRgb: '16, 185, 129',
      featured: false,
    },
    {
      icon: <Settings size={22} />,
      title: 'Maintenance & Support',
      desc: '24/7 monitoring, updates, and fixes so your site never breaks.',
      from: '₹4,999/mo',
      color: '#F59E0B',
      colorRgb: '245, 158, 11',
      featured: false,
    },
    {
      icon: <Zap size={22} />,
      title: 'Landing Pages',
      desc: 'Single-page conversion machines built for ads and campaigns.',
      from: '₹14,999',
      color: '#EC4899',
      colorRgb: '236, 72, 153',
      featured: false,
    },
    {
      icon: <Layout size={22} />,
      title: 'Dashboard & CMS',
      desc: 'Manage your content yourself — no developer needed, ever.',
      from: '₹34,999',
      color: '#06B6D4',
      colorRgb: '6, 182, 212',
      featured: false,
    },
  ];

  const processSteps = [
    {
      num: '01',
      icon: <MessageCircle size={20} />,
      timeframe: 'Day 1–2',
      title: 'Discovery Call',
      desc: 'We learn your goals, audience, and brand in a 30-min call. You receive a full project quote within 24 hours.',
      color: '#8B5CF6',
      colorRgb: '139, 92, 246',
    },
    {
      num: '02',
      icon: <Palette size={20} />,
      timeframe: 'Day 2–4',
      title: 'Design & Prototype',
      desc: 'Our designer builds your full website mockup. You see exactly how it looks before a single line of code is written.',
      color: '#3B82F6',
      colorRgb: '59, 130, 246',
    },
    {
      num: '03',
      icon: <Code size={20} />,
      timeframe: 'Day 4–6',
      title: 'Build & Review',
      desc: 'We develop the approved design into a fast, responsive website. You review and request changes — we refine until perfect.',
      color: '#EC4899',
      colorRgb: '236, 72, 153',
    },
    {
      num: '04',
      icon: <Rocket size={20} />,
      timeframe: 'Day 7',
      title: 'Launch & Handoff',
      desc: 'Your website goes live on your domain. You get full ownership, login credentials, and 3 months of free support.',
      color: '#10B981',
      colorRgb: '16, 185, 129',
    },
  ];

  const testimonials = [
    { name: 'Dr. Priya Sharma', role: 'Dental Clinic Owner', quote: 'Pixora built our clinic website in just 2 weeks. Patient bookings increased by 60% in the first month. Absolutely worth every penny.', initials: 'PS' },
    { name: 'Rahul Mehta', role: 'Fitness Studio Founder', quote: 'We went from zero online presence to getting 40+ new membership inquiries per week. The website looks like it cost 10x what we paid.', initials: 'RM' },
    { name: 'Ananya Desai', role: 'Boutique Owner', quote: 'Our e-commerce store is beautiful and easy to manage. Sales grew 3x since launch. The Pixora team feels like an extension of our own team.', initials: 'AD' },
    { name: 'Vikram Patel', role: 'Restaurant Chain Director', quote: 'All 5 of our restaurant locations now have cohesive, fast websites with online ordering. Customer satisfaction scores went through the roof.', initials: 'VP' },
    { name: 'Sonia Kapoor', role: 'Freelance Photographer', quote: 'My portfolio site is stunning. I\'ve landed 3 corporate clients within weeks of launching. Pixora understood exactly what I needed.', initials: 'SK' },
    { name: 'Arjun Nair', role: 'SaaS Startup CEO', quote: 'The landing page Pixora built converts at 8.5%. Their design instinct and technical skills are genuinely world-class.', initials: 'AN' },
    { name: 'Meera Joshi', role: 'Salon Owner', quote: 'Booking through our website has replaced phone calls entirely. Our clients love the convenience. Best investment we\'ve made this year.', initials: 'MJ' },
    { name: 'Karan Singh', role: 'Real Estate Agent', quote: 'Pixora gave us a property listing site that looks premium and loads instantly. Lead quality improved dramatically. Highly recommend.', initials: 'KS' },
  ];

  const capabilities = [
    {
      title: 'Lightning Fast Performance',
      desc: 'We build on modern stacks like React and Next.js, ensuring your website loads in milliseconds. Faster sites mean better SEO and higher conversion rates.',
      icon: <Zap size={28} />,
      color: 'var(--color-purple)'
    },
    {
      title: 'SEO Optimized by Default',
      desc: 'Every site comes with technical SEO built-in. From meta tags to semantic HTML and schema markup, we ensure Google loves your website.',
      icon: <Search size={28} />,
      color: 'var(--color-blue)'
    },
    {
      title: 'Conversion Focused Design',
      desc: 'Beautiful is good, but profitable is better. Our designs are driven by data and psychology to turn your visitors into paying customers.',
      icon: <BarChart3 size={28} />,
      color: 'var(--color-pink)'
    }
  ];

  const pricingPlans = [
    {
      name: 'Basic',
      tagline: 'Perfect for local businesses',
      price: '₹24,999',
      delivery: '5–7 days',
      features: [
        'Up to 5 pages',
        'Mobile responsive',
        'Contact form',
        'Basic SEO setup',
        'Google Maps embed',
        '3 months support',
      ],
      popular: false,
      cta: 'Get Started',
    },
    {
      name: 'Business',
      tagline: 'Most chosen by growing brands',
      price: '₹49,999',
      delivery: '7–10 days',
      features: [
        'Up to 12 pages',
        'CMS (edit yourself)',
        'Advanced SEO + Analytics',
        'WhatsApp chat button',
        'Blog or news section',
        '1 year support',
        'Speed optimization',
      ],
      popular: true,
      cta: 'Get Started',
    },
    {
      name: 'E-Commerce',
      tagline: 'Sell online from day one',
      price: '₹89,999',
      delivery: '10–14 days',
      features: [
        'Unlimited products',
        'Razorpay / UPI payments',
        'Order management panel',
        'Inventory tracking',
        'Coupon & discount system',
        'Lifetime support',
        'Full ownership',
      ],
      popular: false,
      cta: 'Get Started',
    },
  ];

  const faqs = [
    { q: 'How long does a typical website project take?', a: 'Most projects take 2-6 weeks depending on complexity. Simple landing pages can be ready in just 1 week, while full e-commerce sites may take 4-6 weeks.' },
    { q: 'Do you offer ongoing maintenance?', a: 'Yes! All plans include initial support, and we offer monthly maintenance packages starting at ₹4,999/mo that cover security updates, content changes, and performance monitoring.' },
    { q: 'Will my website be mobile-friendly?', a: 'Absolutely. Every website we build is fully responsive and optimized for smartphones, tablets, and desktops. We test across all major devices and browsers.' },
    { q: 'Can you help with branding and content?', a: 'Yes, we offer add-on services for logo design, brand identity, copywriting, and professional photography coordination to ensure your site looks complete and professional.' },
    { q: 'What if I need changes after launch?', a: 'We include revision rounds during development. After launch, your support period covers minor changes. For larger updates, we offer flexible retainer packages.' },
    { q: 'Do I own my website?', a: 'Yes, 100%. You own all the code, design assets, and content. We deploy to your preferred hosting provider and give you full access to everything.' },
  ];

  const row1 = testimonials.slice(0, 4);
  const row2 = testimonials.slice(4, 8);

  return (
    <div className="home-page">

      {/* ==================== HERO ==================== */}
      <section className="hero">
        {/* Background Orbs */}
        <div className="hero-orb hero-orb-1"></div>
        <div className="hero-orb hero-orb-2"></div>

        <div className="container hero-container">
          <div className="hero-left">
            <motion.div 
              className="hero-badge"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              ⚡ 7-Day Delivery Guarantee
            </motion.div>

            <motion.h1 
              className="hero-headline"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.06 } }
              }}
            >
              {"Your Business Deserves a Website That ".split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  style={{ display: "inline-block", marginRight: "0.25em" }}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                  }}
                >
                  {word}
                </motion.span>
              ))}
              <motion.span 
                className="highlight"
                style={{ display: "inline-block" }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                }}
              >
                Converts.
              </motion.span>
            </motion.h1>

            <motion.p 
              className="hero-subheadline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + 7 * 0.06 }}
            >
              We design, build, and deliver premium websites for Indian businesses — fully managed, no tech skills needed, ownership 100% yours.
            </motion.p>

            <motion.div 
              className="hero-ctas"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + 0.3 + 7 * 0.06 }}
            >
              <Link to="/request" className="cta-primary">
                Get My Free Website Quote <ArrowRight size={16} style={{ marginLeft: '8px' }} />
              </Link>
              <Link to="/portfolio" className="cta-secondary">
                View Our Work ↓
              </Link>
            </motion.div>

            <motion.div 
              className="hero-trust-strip"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 + 0.3 + 7 * 0.06 }}
            >
              <div className="trust-marquee-content">
                <span>✓ Delivered in 7 Days</span>
                <span className="dot">·</span>
                <span>✓ Full Ownership</span>
                <span className="dot">·</span>
                <span>✓ Free Revisions</span>
                <span className="dot">·</span>
                <span>✓ GST Invoice</span>
              </div>
            </motion.div>

            <motion.div 
              className="hero-stats"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 + 0.3 + 7 * 0.06 }}
            >
              <StatCounter value="50" label="Websites Delivered" suffix="+" />
              <div className="stat-divider"></div>
              <StatCounter value="7" label="Avg. Delivery Time" suffix=" Days" />
              <div className="stat-divider"></div>
              <StatCounter value="100" label="Client Satisfaction" suffix="%" />
            </motion.div>
          </div>

          <motion.div 
            className="hero-right"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <motion.div className="floating-badge badge-1" animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
              <Zap size={14} className="text-yellow" /> Lightning Fast
            </motion.div>
            <motion.div className="floating-badge badge-2" animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
              <Shield size={14} className="text-green" /> Secure & Scalable
            </motion.div>
            <motion.div className="floating-badge badge-3" animate={{ y: [0, -8, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}>
              <Search size={14} className="text-blue" /> SEO Optimized
            </motion.div>

            <HeroMockup />
          </motion.div>
        </div>
      </section>

      {/* ==================== LOGOS ==================== */}
      <div className="logos">
        <div className="container">
          <p className="logos__label">
            50+ Indian businesses already launched with Pixora
          </p>
        </div>

        <div className="logos__rows-wrapper">

          {/* Row 1 — scrolls left */}
          <div className="logos__row logos__row--left">
            {[
              { icon: '🏥', name: 'Sharma Dental'     },
              { icon: '💪', name: 'FitZone Gym'        },
              { icon: '🍽', name: 'Spice Garden'       },
              { icon: '💅', name: 'GlowUp Salon'       },
              { icon: '🏠', name: 'UrbanNest Realty'   },
              { icon: '🚀', name: 'TechLaunch'         },
              { icon: '🧘', name: 'PureBliss Spa'      },
              { icon: '☁️', name: 'CloudKitchen Co'   },
              { icon: '👨‍⚕️', name: 'CareFirst Clinic' },
              { icon: '🛒', name: 'QuickMart Store'    },
            ].concat([
              { icon: '🏥', name: 'Sharma Dental'     },
              { icon: '💪', name: 'FitZone Gym'        },
              { icon: '🍽', name: 'Spice Garden'       },
              { icon: '💅', name: 'GlowUp Salon'       },
              { icon: '🏠', name: 'UrbanNest Realty'   },
              { icon: '🚀', name: 'TechLaunch'         },
              { icon: '🧘', name: 'PureBliss Spa'      },
              { icon: '☁️', name: 'CloudKitchen Co'   },
              { icon: '👨‍⚕️', name: 'CareFirst Clinic' },
              { icon: '🛒', name: 'QuickMart Store'    },
            ]).map((item, i) => (
              <span key={i} className="logos__pill">
                <span className="logos__pill-icon">{item.icon}</span>
                <span className="logos__pill-name">{item.name}</span>
              </span>
            ))}
          </div>

          {/* Row 2 — scrolls right */}
          <div className="logos__row logos__row--right">
            {[
              { icon: '⚡', name: 'Delivered in 7 Days'   },
              { icon: '✦',  name: '100% Code Ownership'   },
              { icon: '📱', name: 'Mobile First Design'   },
              { icon: '🔍', name: 'SEO Built-In'          },
              { icon: '🔒', name: 'Secure & Fast'         },
              { icon: '🧾', name: 'GST Invoice Included'  },
              { icon: '🔄', name: 'Free Revisions'        },
              { icon: '🇮🇳', name: 'Made for India'       },
              { icon: '💬', name: 'WhatsApp Support'      },
              { icon: '🏆', name: '98% Client Satisfaction'},
            ].concat([
              { icon: '⚡', name: 'Delivered in 7 Days'   },
              { icon: '✦',  name: '100% Code Ownership'   },
              { icon: '📱', name: 'Mobile First Design'   },
              { icon: '🔍', name: 'SEO Built-In'          },
              { icon: '🔒', name: 'Secure & Fast'         },
              { icon: '🧾', name: 'GST Invoice Included'  },
              { icon: '🔄', name: 'Free Revisions'        },
              { icon: '🇮🇳', name: 'Made for India'       },
              { icon: '💬', name: 'WhatsApp Support'      },
              { icon: '🏆', name: '98% Client Satisfaction'},
            ]).map((item, i) => (
              <span key={i} className="logos__pill logos__pill--feature">
                <span className="logos__pill-icon">{item.icon}</span>
                <span className="logos__pill-name">{item.name}</span>
              </span>
            ))}
          </div>

        </div>
      </div>

      {/* ==================== DEMO PROFILE SHOWCASE ==================== */}
      <ProfileShowcase />

      <div style={{ position: 'relative', zIndex: 10, background: 'var(--color-bg)' }}>
        {/* ==================== STATS ==================== */}
        <Section className="stats section" id="stats">
          <div className="container">
            <div className="stats__grid">
              {[
                { num: '150+', label: 'Projects Delivered', icon: <BarChart3 size={20} /> },
                { num: '98%', label: 'Client Satisfaction', icon: <HeartHandshake size={20} /> },
                { num: '50+', label: 'Active Clients', icon: <Users size={20} /> },
                { num: '24/7', label: 'Expert Support', icon: <Shield size={20} /> },
              ].map((stat, i) => (
                <motion.div key={i} className="stats__item" variants={fadeUp} custom={i}>
                  <div className="stats__number gradient-text">{stat.num}</div>
                  <div className="stats__label">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>
      </div>

      {/* ==================== BIG STATEMENT (LOVABLE REVEAL EFFECT) ==================== */}
      <div className="statement-wrapper">
        <section className="statement-fixed" id="statement">
          <motion.div className="statement__blob statement__blob--1" style={{ x: blobX, y: blobY }} />
          <motion.div className="statement__blob statement__blob--2" style={{ x: blobXReverse, y: blobYReverse }} />
          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <p className="statement__small">
              Your business deserves more than a template.
            </p>
            <h2 className="statement__big gradient-text">
              We craft websites<br />that convert.
            </h2>
          </div>
        </section>
      </div>

      <div style={{ position: 'relative', zIndex: 10, background: 'var(--color-bg)' }}>
        {/* ==================== CAPABILITIES (STACKED CARDS) ==================== */}
        <section className="stacked-section" id="capabilities">
        <div className="container stacked-layout">
          {/* Left Column - Sticky Header */}
          <div className="stacked-layout__left">
            <motion.div className="section-header section-header--left" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}>
              <span className="section-badge">Capabilities</span>
              <h2>Built for Growth</h2>
              <p>We don't just build websites; we build scalable digital engines for your business.</p>
            </motion.div>
          </div>

          {/* Right Column - Scrolling Cards */}
          <div className="stacked-layout__right">
            <div className="stacked-cards">
              {capabilities.map((cap, i) => (
                <div key={i} className="stacked-card" style={{ top: `calc(120px + ${i * 30}px)` }}>
                  <div className="stacked-card__inner">
                    <div className="stacked-card__icon" style={{ color: cap.color, backgroundColor: `color-mix(in srgb, ${cap.color} 15%, transparent)` }}>
                      {cap.icon}
                    </div>
                    <div className="stacked-card__content">
                      <h3>{cap.title}</h3>
                      <p>{cap.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      </div>

      {/* ==================== SERVICES ==================== */}
      <Section className="section" id="services">
        <div className="container">
          <motion.div className="section-header" variants={fadeUp}>
            <span className="section-badge">What We Do</span>
            <h2>Everything You Need to Go Online</h2>
            <p>End-to-end web solutions tailored for your industry — designed to convert visitors into customers.</p>
          </motion.div>

          <div className="services__grid">
            {services.map((s, i) => (
              <SpotlightCard
                key={i}
                className={`service-card ${s.featured ? 'service-card--featured' : ''}`}
                style={{
                  '--service-color': s.color,
                  '--service-color-rgb': s.colorRgb,
                }}
              >
                {s.featured && (
                  <div className="service-card__badge">Most Popular</div>
                )}
                <div
                  className="service-card__icon"
                  style={{
                    background: `rgba(${s.colorRgb}, 0.12)`,
                    border: `1px solid rgba(${s.colorRgb}, 0.25)`,
                    color: s.color,
                  }}
                >
                  {s.icon}
                </div>
                <h3>{s.title}</h3>
                <span className="service-card__price">from {s.from}</span>
                <p>{s.desc}</p>
                <Link
                  to="/request"
                  className="service-card__cta"
                  aria-label={`Get started with ${s.title}`}
                >
                  Get Started
                  <ArrowRight
                    size={14}
                    className="service-card__cta-arrow"
                  />
                </Link>
              </SpotlightCard>
            ))}
          </div>

          <motion.div
            variants={fadeUp}
            style={{ textAlign: 'center', marginTop: 'var(--space-12)' }}
          >
            <Link to="/request" className="btn btn--primary">
              Start Your Project <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </Section>

      {/* ==================== HOW IT WORKS ==================== */}
      <Section className="section" id="process">
        <div className="container">
          <motion.div className="section-header" variants={fadeUp}>
            <span className="section-badge">How It Works</span>
            <h2>Your Website Live in 7 Days <br />— Guaranteed</h2>
            <p>
              A clear 4-step process designed around your schedule.
              No jargon, no delays, no surprises.
            </p>
          </motion.div>

          <div className="process__grid">
            {processSteps.map((step, i) => (
              <motion.div
                key={i}
                className="process__step"
                variants={fadeUp}
                custom={i}
                style={{
                  '--step-color': step.color,
                  '--step-color-rgb': step.colorRgb,
                }}
              >
                <span className="process__timeframe">{step.timeframe}</span>

                <div className="process__icon-row">
                  <div className="process__number">{step.num}</div>
                  <div
                    className="process__icon"
                    style={{
                      color: step.color,
                      background: `rgba(${step.colorRgb}, 0.12)`,
                      border: `1px solid rgba(${step.colorRgb}, 0.25)`,
                    }}
                  >
                    {step.icon}
                  </div>
                </div>

                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={fadeUp}
            custom={4}
            style={{ textAlign: 'center', marginTop: 'var(--space-12)' }}
          >
            <Link to="/request" className="btn btn--primary btn--lg">
              Start Your 7-Day Build <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </Section>

      {/* ==================== TESTIMONIALS MARQUEE ==================== */}
      <Section className="testimonials section" id="testimonials">
        <div className="container">
          <motion.div className="section-header" variants={fadeUp}>
            <span className="section-badge">Testimonials</span>
            <h2>Loved by Businesses Everywhere</h2>
            <p>Real stories from real clients who transformed their online presence with Pixora.</p>
          </motion.div>
        </div>

        {/* Row 1 — scroll left */}
        <div className="testimonials__row testimonials__row--left">
          {[...row1, ...row1].map((t, i) => (
            <div key={i} className="testimonial-card">
              <div className="testimonial-card__stars">
                {[...Array(5)].map((_, j) => <Star key={j} size={14} fill="#FBBF24" strokeWidth={0} />)}
              </div>
              <p className="testimonial-card__quote">"{t.quote}"</p>
              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar">{t.initials}</div>
                <div>
                  <div className="testimonial-card__name">{t.name}</div>
                  <div className="testimonial-card__role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2 — scroll right */}
        <div className="testimonials__row testimonials__row--right">
          {[...row2, ...row2].map((t, i) => (
            <div key={i} className="testimonial-card">
              <div className="testimonial-card__stars">
                {[...Array(5)].map((_, j) => <Star key={j} size={14} fill="#FBBF24" strokeWidth={0} />)}
              </div>
              <p className="testimonial-card__quote">"{t.quote}"</p>
              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar">{t.initials}</div>
                <div>
                  <div className="testimonial-card__name">{t.name}</div>
                  <div className="testimonial-card__role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ==================== PRICING PREVIEW ==================== */}
      <Section className="section--lg section" id="pricing">
        <div className="container">
          <motion.div className="section-header" variants={fadeUp}>
            <span className="section-badge">Pricing</span>
            <h2>Simple Pricing. You Own It Forever.</h2>
            <p>
              One-time payment. No monthly fees. No hidden costs.
              Your website, your code, your ownership — always.
            </p>
          </motion.div>

          <div className="pricing-preview__grid">
            {pricingPlans.map((plan, i) => (
              <motion.div
                key={i}
                className={`pricing-card ${plan.popular ? 'pricing-card--popular' : ''}`}
                variants={fadeUp}
                custom={i}
              >
                {plan.popular && (
                  <div className="pricing-card__badge">Most Popular</div>
                )}

                <div className="pricing-card__header">
                  <div className="pricing-card__name">{plan.name}</div>
                  <p className="pricing-card__tagline">{plan.tagline}</p>
                </div>

                <div className="pricing-card__price-row">
                  <span className="pricing-card__price">{plan.price}</span>
                  <span className="pricing-card__onetime">one-time</span>
                </div>

                <div className="pricing-card__delivery">
                  🚀 Delivered in {plan.delivery}
                </div>

                <ul className="pricing-card__features">
                  {plan.features.map((f, j) => (
                    <li key={j}>
                      <Check size={14} />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/request"
                  className={`btn ${plan.popular
                    ? 'btn--primary'
                    : 'btn--ghost'} pricing-card__btn`}
                >
                  {plan.cta} <ArrowRight size={15} />
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={fadeUp}
            custom={3}
            style={{
              textAlign: 'center',
              marginTop: 'var(--space-8)',
            }}
          >
            <p style={{
              fontSize: 'var(--fs-small)',
              color: 'var(--text-muted)',
              marginBottom: 'var(--space-4)',
            }}>
              Need something custom?{' '}
              <Link
                to="/contact"
                style={{
                  color: 'var(--color-purple-light)',
                  textDecoration: 'underline',
                }}
              >
                Let's talk →
              </Link>
            </p>
            <div className="pricing-trust-row">
              <span>✓ GST Invoice</span>
              <span>✓ 100% Code Ownership</span>
              <span>✓ Free Revisions Included</span>
              <span>✓ No Monthly Fees</span>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ==================== FAQ ==================== */}
      <Section className="section" id="faq">
        <div className="container">
          <motion.div className="section-header" variants={fadeUp}>
            <span className="section-badge">FAQ</span>
            <h2>Common Questions</h2>
          </motion.div>

          <div className="faq__list">
            {faqs.map((f, i) => (
              <motion.div
                key={i}
                className={`faq__item ${activeFaq === i ? 'active' : ''}`}
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                variants={fadeUp}
                custom={i}
              >
                <div className="faq__question">
                  {f.q}
                  <Plus size={18} className="faq__icon" />
                </div>
                <div className="faq__answer">
                  <p>{f.a}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ==================== FINAL CTA ==================== */}
      <section className="cta-final">
        <motion.div className="cta-final__blob cta-final__blob--1" style={{ x: blobX, y: blobY }} />
        <motion.div className="cta-final__blob cta-final__blob--2" style={{ x: blobXReverse, y: blobYReverse }} />
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
          >
            <motion.h2 variants={fadeUp}>
              Ready to Build Something{' '}
              <span className="gradient-text">Amazing?</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={1}>
              Join 150+ businesses who chose Pixora to bring their vision online.
              Let's build your dream website together.
            </motion.p>
            <motion.div className="cta-final__actions" variants={fadeUp} custom={2}>
              <Link to="/request" className="btn btn--primary btn--lg">
                Start Your Project <ArrowRight size={18} />
              </Link>
              <Link to="/contact" className="btn btn--ghost btn--lg">
                Talk to Us
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
