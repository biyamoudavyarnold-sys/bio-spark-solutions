import { useState, useEffect, useRef } from 'react';

interface UseCountUpOptions {
  start?: number;
  end: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}

export const useCountUp = ({
  start = 0,
  end,
  duration = 2000,
  decimals = 0,
  suffix = '',
  prefix = '',
}: UseCountUpOptions) => {
  const [value, setValue] = useState(start);
  const [isAnimating, setIsAnimating] = useState(false);
  const ref = useRef<HTMLElement | null>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            setIsAnimating(true);
            
            const startTime = Date.now();
            const endValue = end;
            
            const animate = () => {
              const now = Date.now();
              const progress = Math.min((now - startTime) / duration, 1);
              
              // Easing function (ease-out-expo)
              const easeOutExpo = progress === 1 
                ? 1 
                : 1 - Math.pow(2, -10 * progress);
              
              const currentValue = start + (endValue - start) * easeOutExpo;
              setValue(Number(currentValue.toFixed(decimals)));
              
              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                setIsAnimating(false);
              }
            };
            
            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [start, end, duration, decimals]);

  const formattedValue = `${prefix}${value.toLocaleString()}${suffix}`;

  return { ref, value, formattedValue, isAnimating };
};
