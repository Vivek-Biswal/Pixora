import React, { useEffect, useRef, useState } from 'react';

/**
 * ScrollAnimator wraps children and applies animation classes when they enter the viewport.
 * Uses Intersection Observer API for performance.
 */
const ScrollAnimator = ({
  children,
  animation = "from-bottom", // from-bottom, from-left, from-right, scale-up, fade-in
  delay = "", // delay-1, delay-2, etc.
  threshold = 0.1,
  once = true,
  className = "",
  style = {}
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(domRef.current);
        } else if (!once) {
          setIsVisible(false);
        }
      });
    }, { threshold });

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [once, threshold]);

  return (
    <div
      ref={domRef}
      className={`animate-on-scroll ${animation} ${delay} ${isVisible ? 'visible' : ''} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

export default ScrollAnimator;
