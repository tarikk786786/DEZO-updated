import React, { useState, useEffect, useRef } from 'react';
import { Globe, Target, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const RotatingText = () => {
  const phrases = [
    "If We Commit, We Deliver.",
    "Clean Website. Clear Communication.",
    "If You Don't Like the First Design, We Improve It.",
    "Your Website Should Look Professional.",
    "We Build Until It Feels Right.",
    "No Confusing Process. No Hidden Drama.",
    "We Focus on Quality, Speed, and Trust.",
    "If Something Needs Fixing, We Help.",
    "Your Business Deserves a Serious Digital Presence.",
    "We Don't Just Build Pages — We Build Trust."
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [phrases.length]);

  return (
    <div className="min-h-[60px] md:min-h-[80px] flex items-center justify-center lg:justify-start pt-2 mb-4 relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.h3 
          key={index}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-xl sm:text-2xl md:text-3xl font-black leading-tight tracking-tight text-main-light absolute"
        >
          <span className="text-brand-gold border-b-2 border-white/20 pb-1 inline-block">
            {phrases[index]}
          </span>
        </motion.h3>
      </AnimatePresence>
    </div>
  );
};

export const FallbackImage = ({ src, alt, className, fallbackInitials }: any) => {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`${className} bg-main-dark border border-main-light flex flex-col items-center justify-center text-main-light font-black tracking-widest relative overflow-hidden`}>
        <span className="relative z-10">{fallbackInitials}</span>
      </div>
    );
  }
  return <img loading="lazy" decoding="async" src={src} alt={alt} className={className} onError={() => setError(true)} />;
};

export const HeroVisual = ({ nightMode }: any) => {
  const [slide, setSlide] = useState(0);
  const totalSlides = 3;
  const [direction, setDirection] = useState(0);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setSlide((prev) => (prev + newDirection + totalSlides) % totalSlides);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9
    })
  };

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full relative flex flex-col items-center justify-center">
      <div className="w-full relative h-[300px] md:h-[450px] flex items-center justify-center overflow-visible">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={slide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 260, damping: 20 },
              opacity: { duration: 0.5 },
              scale: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.8}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = Math.abs(offset.x) > 50 || Math.abs(velocity.x) > 500;
              if (swipe) {
                paginate(offset.x > 0 ? -1 : 1);
              }
            }}
            className="absolute inset-0 flex items-center justify-center p-4 cursor-grab active:cursor-grabbing"
          >
            {slide === 0 && (
              <motion.div 
                whileHover={{ rotateY: -10, rotateX: 5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ transformStyle: "preserve-3d" }}
                className="relative w-full max-w-lg aspect-video"
              >
                {/* Main Glass 3D Browser Window */}
                <div className="glass-card w-full h-[85%] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#030712]/80 md:backdrop-blur-xl">
                  <div className="h-10 bg-[#0F172A]/80 border-b border-white/10 flex items-center px-5 gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-slate-600"></div>
                    <div className="w-3 h-3 rounded-full bg-slate-600"></div>
                    <div className="mx-auto w-1/2 h-5 bg-[#020617] border border-white/5 rounded flex items-center justify-center">
                      <span className="text-[9px] font-bold text-slate-500 tracking-widest uppercase">design.dezo</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="w-32 h-6 bg-white/10 rounded-full mb-6"></div>
                    <div className="w-full h-24 bg-gradient-to-br from-[var(--primary)]/20 to-[var(--accent)]/10 rounded-xl border border-white/5 mb-4 relative overflow-hidden">
                       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-12 bg-white/5 rounded-lg"></div>
                      <div className="h-12 bg-white/5 rounded-lg"></div>
                    </div>
                  </div>
                </div>
                {/* Floating Code Snippet */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -bottom-4 -left-4 md:-left-12 w-[60%] sm:w-[50%] bg-[#020617]/95 backdrop-blur-xl border border-white/10 rounded-xl p-4 shadow-2xl"
                >
                  <div className="flex gap-1.5 mb-3">
                    <div className="w-2 h-2 rounded-full bg-red-400"></div>
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  </div>
                  <div className="space-y-1 font-mono text-[9px] sm:text-[11px]">
                    <div className="text-[var(--primary)]">const <span className="text-white">Growth</span> = () =&gt; {'{'}</div>
                    <div className="pl-3 text-[var(--accent)]">render(<span className="text-white">"Premium"</span>);</div>
                    <div className="text-[var(--primary)]">{'}'}</div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {slide === 1 && (
              <div className="w-full max-w-lg grid grid-cols-2 gap-4">
                <div className="glass-card col-span-2 p-6 rounded-2xl bg-[#0F172A]/80 border border-white/10 shadow-2xl">
                   <div className="flex justify-between items-center mb-6">
                     <span className="text-sm font-bold text-white uppercase tracking-widest">Performance ROI</span>
                     <TrendingUp className="text-green-400" size={20} />
                   </div>
                   <div className="text-4xl font-black text-white mb-2">4.8x</div>
                   <div className="text-xs text-slate-400 mb-6">Average Return on Ad Spend</div>
                   <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "85%" }}
                        className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]"
                      />
                   </div>
                </div>
                <div className="glass-card p-5 rounded-2xl bg-[#020617]/80 border border-white/5 shadow-xl">
                   <div className="text-[10px] text-slate-500 font-bold uppercase mb-2">SEO Health</div>
                   <div className="text-2xl font-bold text-green-400">100/100</div>
                </div>
                <div className="glass-card p-5 rounded-2xl bg-[#020617]/80 border border-white/5 shadow-xl">
                   <div className="text-[10px] text-slate-500 font-bold uppercase mb-2">Google Ads</div>
                   <div className="text-2xl font-bold text-[var(--primary)]">+142%</div>
                </div>
              </div>
            )}

            {slide === 2 && (
              <div className="w-full max-w-lg flex flex-col items-center text-center">
                 <div className="relative mb-8">
                    <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-[var(--primary)]/30 flex items-center justify-center p-4">
                       <div className="w-full h-full rounded-full border-t-4 border-[var(--accent)] animate-spin" style={{ animationDuration: '3s' }}></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                       <span className="text-3xl md:text-5xl font-black text-white">10x</span>
                       <span className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest">Growth Boost</span>
                    </div>
                 </div>
                 <div className="flex flex-wrap justify-center gap-3">
                    {['Reliable', 'Creative', 'Strategic', 'Native'].map((word, i) => (
                      <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-white/80">
                        {word}
                      </span>
                    ))}
                 </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Indicators */}
      <div className="flex items-center gap-4 mt-8 relative z-20">
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > slide ? 1 : -1);
                setSlide(i);
              }}
              className={`h-1.5 rounded-full smooth-transition ${slide === i ? 'w-8 bg-[var(--primary)]' : 'w-2 bg-white/20'}`}
            />
          ))}
        </div>
        <span className="text-[10px] font-black text-white/40 font-mono">{slide + 1} / {totalSlides}</span>
      </div>
      <div className="mt-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest animate-pulse flex items-center gap-2">
        <span className="opacity-50">←</span>
        {slide === 0 && "Design Excellence"}
        {slide === 1 && "Marketing ROI"}
        {slide === 2 && "Business Growth"}
        <span className="opacity-50">→</span>
      </div>
    </div>
  );
};
