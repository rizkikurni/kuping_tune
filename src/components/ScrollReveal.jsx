import React, { useRef, useState, useEffect } from 'react';

/**
 * ScrollReveal Component
 * Triggers entrance animations only when the section or element scrolls into view.
 * Prevents offscreen animation playback before user has scrolled down.
 */
export default function ScrollReveal({
  children,
  animation = 'animate-enter-fade-up',
  delay = '',
  threshold = 0.12,
  rootMargin = '0px 0px -40px 0px',
  className = '',
  style = {},
  as: Component = 'div',
  ...props
}) {
  const domRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = domRef.current;
    if (!node) return;

    // Fallback if browser doesn't support IntersectionObserver
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  const activeClass = isVisible 
    ? `${animation} ${delay}`.trim() 
    : 'scroll-reveal-hidden';

  return (
    <Component
      ref={domRef}
      className={`${className} ${activeClass}`.trim()}
      style={style}
      {...props}
    >
      {children}
    </Component>
  );
}
