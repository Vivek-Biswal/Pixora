import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './ProfileShowcase.css';

const profiles = [
  {
    id: 1,
    title: 'Virginia Woolf',
    subtitle: 'THE WAVES',
    tags: 'A LIFE IN LANGUAGE • CONSCIOUSNESS • MEMORY',
    image: 'https://images.unsplash.com/photo-1544502062-f82887f03d1c?auto=format&fit=crop&w=400&q=80',
    leftImg: 'https://images.unsplash.com/photo-1505909182942-e2f09aee3e89?auto=format&fit=crop&w=600&q=80',
    rightImg: 'https://images.unsplash.com/photo-1518991669955-9c7e78ec80ca?auto=format&fit=crop&w=600&q=80',
    color: '#8b2525'
  },
  {
    id: 2,
    title: 'Marcus Aurelius',
    subtitle: 'MEDITATIONS',
    tags: 'STOICISM • PHILOSOPHY • RESILIENCE',
    image: 'https://images.unsplash.com/photo-1560961911-ba7fea0a2a3a?auto=format&fit=crop&w=400&q=80',
    leftImg: 'https://images.unsplash.com/photo-1604160450925-0eecf5b04515?auto=format&fit=crop&w=600&q=80',
    rightImg: 'https://images.unsplash.com/photo-1582050041567-9cfdd330d545?auto=format&fit=crop&w=600&q=80',
    color: '#1a365d'
  },
  {
    id: 3,
    title: 'Frida Kahlo',
    subtitle: 'THE TWO FRIDAS',
    tags: 'SURREALISM • IDENTITY • PASSION',
    image: 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&w=400&q=80',
    leftImg: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80',
    rightImg: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?auto=format&fit=crop&w=600&q=80',
    color: '#2d3748'
  }
];

const ProfileShowcase = () => {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % profiles.length);
  const prev = () => setIndex((i) => (i - 1 + profiles.length) % profiles.length);

  const p = profiles[index];

  return (
    <section className="profile-showcase" style={{ '--room-color': p.color }}>
      <div className="ps-header">
        <div className="ps-logo">DEMO PROFILE PROJECTS</div>
      </div>
      
      <button className="ps-nav ps-prev" onClick={prev}><ChevronLeft size={36}/></button>
      <button className="ps-nav ps-next" onClick={next}><ChevronRight size={36}/></button>

      <div className="ps-perspective">
        <AnimatePresence mode="wait">
          <motion.div 
            key={index}
            className="ps-room"
            initial={{ opacity: 0, scale: 0.95, translateZ: '-10vw' }}
            animate={{ opacity: 1, scale: 1, translateZ: '0vw' }}
            exit={{ opacity: 0, scale: 1.05, translateZ: '10vw' }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          >
            {/* Ceiling */}
            <div className="ps-wall ps-ceiling" />
            
            {/* Floor */}
            <div className="ps-wall ps-floor" />
            
            {/* Left Wall */}
            <div className="ps-wall ps-left">
              <img src={p.leftImg} className="ps-painting" alt="left" />
            </div>
            
            {/* Right Wall */}
            <div className="ps-wall ps-right">
              <img src={p.rightImg} className="ps-painting" alt="right" />
            </div>

            {/* Back Wall */}
            <div className="ps-wall ps-back">
              <div className="ps-content">
                <img src={p.image} className="ps-portrait" alt={p.title} />
                <h2 className="ps-title">{p.title}</h2>
                <h3 className="ps-subtitle">{p.subtitle}</h3>
                <p className="ps-tags">{p.tags}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProfileShowcase;
