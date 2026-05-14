import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

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
  const getVariants = () => {
    if (direction === 'up') return { hidden: { opacity: 0, y: 40, scale: 0.98 }, visible: { opacity: 1, y: 0, scale: 1 }};
    if (direction === 'down') return { hidden: { opacity: 0, y: -40, scale: 0.98 }, visible: { opacity: 1, y: 0, scale: 1 }};
    if (direction === 'left') return { hidden: { opacity: 0, x: 40, scale: 0.98 }, visible: { opacity: 1, x: 0, scale: 1 }};
    if (direction === 'right') return { hidden: { opacity: 0, x: -40, scale: 0.98 }, visible: { opacity: 1, x: 0, scale: 1 }};
    if (direction === 'scale') return { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 }};
    if (direction === 'outward') return { hidden: { opacity: 0, scale: 1.05 }, visible: { opacity: 1, scale: 1 }};
    return { hidden: { opacity: 0 }, visible: { opacity: 1 }};
  };

  return (
    <motion.div
      variants={getVariants()}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-5%", amount: 0.1 }}
      transition={{ 
        duration: 0.8, 
        delay: delay / 1000, 
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 0.6 }
      }}
      className={className}
    >
      {children}
    </motion.div>
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
      const easeProgress = 1 - Math.pow(1 - progress, 6); 
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
      }, 400);
    }, 4000);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <span className="inline-flex items-center">
      {prefix && <span className="mr-2">{prefix}</span>}
      <span className="relative inline-flex overflow-hidden pb-1 md:pb-2 min-w-[180px] sm:min-w-[220px] md:min-w-[340px] lg:min-w-[420px]">
        <motion.span 
          key={index}
          initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
          animate={{ opacity: fade ? 1 : 0, y: fade ? 0 : -15, filter: fade ? 'blur(0px)' : 'blur(4px)' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`absolute inset-0 ${gradient ? 'logo-animated animate-gradient-text' : ''}`}
        >
          {words[index]}
        </motion.span>
        <span className="opacity-0 pointer-events-none">{words.reduce((a: string, b: string) => a.length > b.length ? a : b)}</span>
      </span>
      {suffix && <span className="ml-2">{suffix}</span>}
    </span>
  );
};
