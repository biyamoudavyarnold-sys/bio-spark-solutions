import { useCountUp } from '@/hooks/useCountUp';
import { cn } from '@/lib/utils';

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
}

const AnimatedCounter = ({
  end,
  suffix = '',
  prefix = '',
  duration = 2000,
  decimals = 0,
  className,
}: AnimatedCounterProps) => {
  const { ref, formattedValue, isAnimating } = useCountUp({
    end,
    suffix,
    prefix,
    duration,
    decimals,
  });

  return (
    <span
      ref={ref as React.RefObject<HTMLSpanElement>}
      className={cn(
        'tabular-nums transition-transform',
        isAnimating && 'scale-105',
        className
      )}
    >
      {formattedValue}
    </span>
  );
};

export default AnimatedCounter;
