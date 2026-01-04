import { useMemo } from 'react';

interface Particle {
  id: number;
  size: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
  opacity: number;
}

interface FloatingParticlesProps {
  count?: number;
  className?: string;
}

const FloatingParticles = ({ count = 20, className = '' }: FloatingParticlesProps) => {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      size: Math.random() * 8 + 4,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.3 + 0.1,
    }));
  }, [count]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-primary animate-parallax-float"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: particle.opacity,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
      {particles.slice(0, Math.floor(count / 2)).map((particle) => (
        <div
          key={`secondary-${particle.id}`}
          className="absolute rounded-full bg-secondary animate-parallax-float"
          style={{
            width: `${particle.size * 0.8}px`,
            height: `${particle.size * 0.8}px`,
            left: `${100 - particle.x}%`,
            top: `${100 - particle.y}%`,
            opacity: particle.opacity * 0.7,
            animationDuration: `${particle.duration * 1.2}s`,
            animationDelay: `${particle.delay + 2}s`,
            animationDirection: 'reverse',
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;
