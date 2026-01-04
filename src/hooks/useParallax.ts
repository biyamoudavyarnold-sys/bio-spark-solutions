import { useState, useEffect, useCallback } from 'react';

interface ParallaxConfig {
  speed?: number;
  direction?: 'up' | 'down';
}

export const useParallax = (config: ParallaxConfig = {}) => {
  const { speed = 0.5, direction = 'up' } = config;
  const [offset, setOffset] = useState(0);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const multiplier = direction === 'up' ? -1 : 1;
    setOffset(scrollY * speed * multiplier);
  }, [speed, direction]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return offset;
};

export const useMouseParallax = (intensity: number = 0.05) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    setPosition({
      x: (clientX - centerX) * intensity,
      y: (clientY - centerY) * intensity,
    });
  }, [intensity]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return position;
};
