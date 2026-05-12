import React, { useState, useEffect, useRef } from 'react';

export const useIntersectionObserver = (options: any = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<any>(null);
  const optionsStr = JSON.stringify(options);

  useEffect(() => {
    const parsedOptions = JSON.parse(optionsStr);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        if (parsedOptions.triggerOnce !== false) observer.unobserve(entry.target);
      } else if (parsedOptions.triggerOnce === false) {
        setIsIntersecting(false);
      }
    }, { threshold: 0, rootMargin: '50px 0px -50px 0px', ...parsedOptions });

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, [optionsStr]);

  return [ref, isIntersecting] as const;
};

export const Reveal = ({ children, delay = 0, direction = 'up', className = '' }: any) => {
  const [ref, isVisible] = useIntersectionObserver({ triggerOnce: true });
  
  const getTransform = () => {
    if (isVisible) return 'translate(0, 0) scale(1)';
    if (direction === 'up') return 'translateY(var(--anim-dist))';
    if (direction === 'left') return 'translateX(var(--anim-dist))';
    if (direction === 'right') return 'translateX(calc(var(--anim-dist) * -1))';
    if (direction === 'scale') return 'scale(0.95)';
    return 'none';
  };

  return (
    <div 
      ref={ref as any} 
      className={className}
      style={{ 
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transitionProperty: 'opacity, transform',
        transitionDuration: 'var(--anim-speed)',
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
        transitionDelay: `${delay}ms`,
        willChange: 'opacity, transform'
      }}
    >
      {children}
    </div>
  );
};

export const AnimatedCounter = ({ end, duration = 2500, suffix = "", nightMode }: any) => {
  const [count, setCount] = useState(0);
  const [ref, isVisible] = useIntersectionObserver({ triggerOnce: true });

  useEffect(() => {
    if (!isVisible) return;
    let startTime: number | null = null;
    let animationFrameId: number;
    const currentDuration = nightMode ? 500 : duration;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / currentDuration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 5); 
      setCount(Math.floor(easeProgress * end));
      
      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };
    
    animationFrameId = window.requestAnimationFrame(step);
    return () => { if (animationFrameId) window.cancelAnimationFrame(animationFrameId); };
  }, [isVisible, end, duration, nightMode]);

  return <span ref={ref as any} className="logo-animated">{count}{suffix}</span>;
};

export const DynamicHeadline = ({ words, prefix = "", suffix = "", gradient = false }: any) => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setFade(true);
      }, 500);
    }, 3500);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <span className="inline-flex items-center">
      {prefix && <span className="mr-2">{prefix}</span>}
      <span className="relative inline-flex overflow-hidden pb-1 md:pb-2 min-w-[220px] md:min-w-[340px] lg:min-w-[420px]">
        <span 
          className={`absolute inset-0 smooth-transition ${fade ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-4 blur-[8px]'} ${gradient ? 'logo-animated animate-gradient-text' : ''}`}
        >
          {words[index]}
        </span>
        <span className="opacity-0 pointer-events-none">{words.reduce((a: string, b: string) => a.length > b.length ? a : b)}</span>
      </span>
      {suffix && <span className="ml-2">{suffix}</span>}
    </span>
  );
};
