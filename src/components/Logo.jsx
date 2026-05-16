import React from 'react';

const Logo = ({ className = "", dark = false }) => {
  return (
    <div className={`logo-container ${className}`} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <svg
        width="34"
        height="34"
        viewBox="0 0 34 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="logoGradMain" x1="2" y1="2" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8B5CF6" />
            <stop offset="1" stopColor="#3B82F6" />
          </linearGradient>
          <linearGradient id="logoGradAccent" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#EC4899" />
            <stop offset="1" stopColor="#8B5CF6" />
          </linearGradient>
          <filter id="logoGlow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        {/* Background rect */}
        <rect x="2" y="2" width="30" height="30" rx="8" fill="url(#logoGradMain)" />
        {/* Shine overlay */}
        <rect x="2" y="2" width="30" height="30" rx="8" fill="white" fillOpacity="0.08" />
        {/* Document lines */}
        <rect x="9" y="10" width="16" height="2.5" rx="1.25" fill="white" fillOpacity="0.9" />
        <rect x="9" y="15.5" width="12" height="2.5" rx="1.25" fill="white" fillOpacity="0.7" />
        <rect x="9" y="21" width="8" height="2.5" rx="1.25" fill="white" fillOpacity="0.5" />
        {/* Accent dot */}
        <circle cx="25" cy="23" r="5" fill="url(#logoGradAccent)" filter="url(#logoGlow)" />
        <circle cx="25" cy="23" r="3" fill="white" fillOpacity="0.3" />
      </svg>
      <span style={{
        fontSize: '1.4rem',
        fontWeight: '800',
        letterSpacing: '-0.04em',
        color: dark ? 'var(--color-night)' : 'var(--text-primary)',
        fontFamily: 'var(--font-primary)',
        lineHeight: 1,
      }}>
        Pixora
      </span>
    </div>
  );
};

export default Logo;
