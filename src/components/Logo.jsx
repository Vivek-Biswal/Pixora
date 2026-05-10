import React from 'react';

const Logo = ({ className = "" }) => {
  return (
    <div className={`logo-container ${className}`} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0px 2px 4px rgba(26, 26, 62, 0.1))' }}
      >
        {/* Main Document Icon Shape */}
        <rect x="4" y="4" width="24" height="24" rx="6" fill="#4F6EF7" />
        {/* Subtle Gradient Overlay */}
        <defs>
          <linearGradient id="logoGrad" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
            <stop stopColor="#7B96FF" stopOpacity="0.2" />
            <stop offset="1" stopColor="#4F6EF7" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect x="4" y="4" width="24" height="24" rx="6" fill="url(#logoGrad)" />
        {/* Decorative Lines */}
        <rect x="9" y="11" width="14" height="2" rx="1" fill="white" fillOpacity="0.8" />
        <rect x="9" y="16" width="10" height="2" rx="1" fill="white" fillOpacity="0.8" />
        <rect x="9" y="21" width="6" height="2" rx="1" fill="white" fillOpacity="0.8" />
        {/* The Brand Dot (Coral) */}
        <circle cx="23" cy="23" r="5" fill="white" />
        <circle cx="23" cy="23" r="3.5" fill="#FF6B6B" />
      </svg>
      <span style={{
        fontSize: '1.5rem',
        fontWeight: '800',
        letterSpacing: '-0.03em',
        color: 'var(--color-night)',
        fontFamily: 'var(--font-primary)'
      }}>
        Pixora
      </span>
    </div>
  );
};

export default Logo;
