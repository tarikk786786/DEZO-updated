import React, { useState, useEffect, useRef } from 'react';
import { Globe, Target, TrendingUp } from 'lucide-react';

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
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % phrases.length);
        setFade(true);
      }, 600);
    }, 4000);
    return () => clearInterval(interval);
  }, [phrases.length]);

  return (
    <div className="min-h-[60px] md:min-h-[80px] flex items-center justify-center lg:justify-start pt-2 mb-4">
      <h3 
        className="text-xl sm:text-2xl md:text-3xl font-black leading-tight tracking-tight text-main-light smooth-transition"
        style={{
          opacity: fade ? 1 : 0,
          transform: fade ? 'translateY(0)' : 'translateY(10px)'
        }}
      >
        <span className="text-brand-gold border-b-2 border-white/20 pb-1 inline-block">
          {phrases[index]}
        </span>
      </h3>
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
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: any) => {
    if (nightMode || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20; 
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    setMouse({ x, y });
  };

  const handleMouseLeave = () => setMouse({ x: 0, y: 0 });

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full h-full relative" 
      style={{ perspective: '2000px' }}
    >
      <div 
        className="w-full h-full transition-transform duration-[600ms] ease-out"
        style={{ 
          transformStyle: 'preserve-3d', 
          transform: nightMode ? 'none' : `rotateY(${mouse.x}deg) rotateX(${mouse.y}deg)` 
        }}
      >
        {/* Main Glass 3D Browser Window */}
        <div 
          className="glass-card absolute right-[-5%] top-[5%] w-[100%] h-[80%] rounded-[2rem] overflow-hidden animate-float"
          style={{ transform: 'translateZ(20px)' }}
        >
          <div className="h-10 bg-[#0F172A]/80 border-b border-white/10 flex items-center px-5 gap-2.5 backdrop-blur-md">
            <div className="w-3 h-3 rounded-full bg-slate-600"></div>
            <div className="w-3 h-3 rounded-full bg-slate-600"></div>
            <div className="w-3 h-3 rounded-full bg-slate-600"></div>
            <div className="mx-auto w-1/2 h-5 bg-[#020617] border border-white/5 rounded flex items-center justify-center">
              <span className="text-[9px] font-bold text-slate-500 tracking-widest uppercase">dezo.agency</span>
            </div>
          </div>
          <div className="p-8 h-full bg-[#030712] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary)] opacity-[0.15] blur-[80px] rounded-full"></div>
            <div className="w-32 h-6 bg-white/10 rounded-full mb-8 backdrop-blur-sm border border-white/5"></div>
            <div className="w-[90%] h-14 bg-gradient-to-r from-[var(--primary)]/20 to-[var(--accent)]/20 border border-[var(--accent)]/30 rounded-xl mb-6 flex items-center px-4 relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
               <div className="w-1/2 h-3 bg-white/40 rounded-full"></div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
              <div className="h-20 bg-white/5 rounded-xl border border-white/10 p-4 relative overflow-hidden backdrop-blur-md">
                <div className="absolute top-0 right-0 w-16 h-16 bg-[var(--primary)] opacity-20 blur-xl"></div>
                <div className="w-8 h-8 rounded-full border border-[var(--primary)]/50 mb-2 shadow-[0_0_10px_var(--primary)]"></div>
                <div className="w-full h-2 bg-white/10 rounded-full"></div>
              </div>
              <div className="h-20 bg-white/5 rounded-xl border border-white/10 p-4 relative overflow-hidden backdrop-blur-md">
                <div className="absolute top-0 right-0 w-16 h-16 bg-[var(--accent)] opacity-20 blur-xl"></div>
                <div className="w-8 h-8 rounded-full border border-[var(--accent)]/50 mb-2 shadow-[0_0_10px_var(--accent)]"></div>
                <div className="w-full h-2 bg-white/10 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Code Editor Panel */}
        <div 
          className="absolute left-[-15%] top-[25%] w-[55%] bg-[#020617]/95 backdrop-blur-xl rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] border border-[#1E293B] p-5 animate-float-delayed"
          style={{ transform: 'translateZ(70px)' }}
        >
          <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-2">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
            </div>
            <div className="text-[9px] font-mono text-slate-500">LandingPage.jsx</div>
          </div>
          <div className="space-y-2 text-[12px] font-mono leading-relaxed">
            <div className="text-[var(--primary)]">import <span className="text-white">React</span> from <span className="text-[var(--accent)]">'react'</span>;</div>
            <div className="text-purple-400">export default function <span className="text-[var(--gold)]">Hero</span>() {'{'}</div>
            <div className="pl-4 text-[#64748B]">// Award-winning Indian Agency</div>
            <div className="pl-4 text-[var(--accent)]">return (</div>
            <div className="pl-8 text-[var(--primary)]">&lt;div className="<span className="text-green-300">premium-growth</span>"&gt;</div>
            <div className="pl-12 text-white font-bold animate-[text-pop_2s_infinite]">10x Your Digital Presence</div>
            <div className="pl-8 text-[var(--primary)]">&lt;/div&gt;</div>
            <div className="pl-4 text-[var(--accent)]">);</div>
            <div className="text-purple-400">{'}'}</div>
          </div>
        </div>

        {/* Advanced SEO Dashboard */}
        <div 
          className="absolute right-[-5%] bottom-[15%] w-[45%] bg-[#0F172A]/95 backdrop-blur-xl rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] border border-white/10 p-5 animate-float"
          style={{ transform: 'translateZ(110px)' }}
        >
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2 text-xs font-bold text-white"><Globe size={16} className="text-[#06B6D4]" /> Organic Traffic</div>
            <div className="flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 px-2 py-1 rounded-full">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-[9px] text-green-400 font-bold uppercase tracking-widest">Live</span>
            </div>
          </div>
          <div className="flex items-end gap-1.5 h-16 border-b border-white/10 pb-1">
            {[30, 45, 40, 60, 50, 80, 75, 100].map((h, i) => (
              <div key={i} className="relative w-full h-full flex items-end group">
                 <div className="w-full bg-gradient-to-t from-[#2563EB] to-[#06B6D4] rounded-t-sm opacity-90 animate-bar-grow" style={{ height: `${h}%`, animationDelay: `${i * 100}ms` }}></div>
                 <div className="absolute top-0 opacity-0 group-hover:opacity-100 bg-white text-black text-[8px] font-bold p-1 rounded -translate-y-full w-max left-1/2 -translate-x-1/2 transition-opacity z-10">{h}k</div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Meta Ads Tracker */}
        <div 
          className="absolute left-[10%] bottom-[0%] w-[40%] bg-gradient-to-br from-[#2563EB] to-blue-900 rounded-2xl shadow-[0_30px_60px_rgba(37,99,235,0.3)] border border-white/20 p-5 animate-float-delayed relative overflow-hidden"
          style={{ transform: 'translateZ(140px)' }}
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNykiLz48L3N2Zz4=')] opacity-50"></div>
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2 text-xs font-bold text-white"><Target size={16} className="text-white" /> Meta Ads ROI</div>
              <div className="bg-white/20 p-1 rounded backdrop-blur-md border border-white/10"><TrendingUp size={12} className="text-white"/></div>
            </div>
            <div className="text-3xl font-black text-white tracking-tighter mb-1">4.8x</div>
            <div className="text-[10px] text-blue-100 font-medium">Average Return on Ad Spend</div>
            <div className="mt-3 h-1 w-full bg-white/20 rounded-full overflow-hidden">
               <div className="h-full bg-white rounded-full animate-[scale-x_2s_ease-out_infinite_alternate] origin-left w-[80%]"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
