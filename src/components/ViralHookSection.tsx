import React from 'react';
import { motion } from 'motion/react';
import { Reveal } from '../components1';

export const ViralHookSection = () => {
  return (
    <section className="py-24 bg-main-dark border-t border-white/5 relative overflow-hidden" id="viral-hook">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--primary)]/5 blur-[120px] rounded-full mix-blend-screen"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        <div className="flex flex-col gap-12">
          <Reveal direction="left">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight max-w-4xl">
              <span className="text-white/40">"</span>Your website is not just a design — <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]">it is your digital salesman.</span><span className="text-white/40">"</span>
            </h2>
          </Reveal>
          
          <Reveal direction="right" delay={100}>
            <div className="flex justify-end">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight max-w-4xl text-right">
                <span className="text-white/40">"</span>A slow website <span className="text-red-400">silently kills</span> your leads.<span className="text-white/40">"</span>
              </h2>
            </div>
          </Reveal>
          
          <Reveal direction="left" delay={200}>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight max-w-4xl">
              <span className="text-white/40">"</span>Before running ads, fix your landing page first.<span className="text-white/40">"</span>
            </h2>
          </Reveal>

          <Reveal direction="right" delay={300}>
             <div className="flex justify-end">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight max-w-4xl text-right">
                <span className="text-white/40">"</span>Good design gets attention. <br className="hidden md:block" />Good strategy gets <span className="text-[#25D366]">customers.</span><span className="text-white/40">"</span>
              </h2>
            </div>
          </Reveal>

          <Reveal direction="up" delay={400}>
            <div className="text-center mt-12">
              <h2 className="text-2xl md:text-4xl font-black text-white leading-tight tracking-tight">
                Your website should not just look good. <br/>
                It should bring business.
              </h2>
              <div className="mt-8">
                 <motion.a 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={`https://wa.me/919114411026?text=Hi%20DEZO%2C%20I%20want%20to%20build%20a%20website%20that%20brings%20business.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--primary)] text-white font-black rounded-full shadow-[0_10px_20px_rgba(139,92,246,0.2)] hover:shadow-[0_15px_30px_rgba(139,92,246,0.3)] hover:bg-[var(--accent)] smooth-transition"
                  >
                    Start Growing Now
                  </motion.a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
