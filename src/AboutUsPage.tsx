import React from 'react';
import { ArrowLeft, Target, ShieldCheck, Zap, Users, Sparkles, CheckCircle2 } from 'lucide-react';
import { Reveal } from './components1';
import { ThemeStyles } from './ThemeStyles';

export const AboutUsPage = ({ onBack }: { onBack: () => void }) => {
  return (
    <main className="bg-main-light min-h-screen pt-24 pb-32">
      <div className="max-w-[70rem] mx-auto px-4 lg:px-8">
        
        <Reveal direction="down">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-main-dark font-bold hover:text-[var(--primary)] smooth-transition mb-12 group"
          >
            <div className="w-10 h-10 rounded-full bg-panel-white border border-main-light flex justify-center items-center group-hover:border-[var(--primary)] group-hover:bg-[var(--primary)]/5 smooth-transition">
              <ArrowLeft size={18} />
            </div>
            Back to Home
          </button>
        </Reveal>

        <Reveal direction="up">
          <div className="text-center mb-16">
            <h1 className="clamp-h1 font-black text-main-dark mb-4 drop-shadow-xl relative inline-block">
              <span className="logo-animated leading-tight pb-2 block">DEZO — Digital Excellence,</span>
              <span className="text-main-dark">Zero Ordinary</span>
            </h1>
          </div>
        </Reveal>

        <div className="space-y-12 text-lg md:text-xl text-main-muted leading-relaxed font-medium">
          
          <Reveal direction="up" delay={100}>
            <div className="bg-panel-white p-10 md:p-14 rounded-[2.5rem] border border-main-light shadow-xl relative overflow-hidden group">
              <div className="absolute top-[-20%] right-[-10%] w-[300px] h-[300px] bg-[var(--primary)] opacity-[0.05] group-hover:opacity-[0.1] blur-[80px] rounded-full smooth-transition"></div>
              
              <p className="mb-6">
                DEZO was created for business owners who are tired of looking <span className="text-[var(--accent)] font-black">average online</span> and losing customers because of weak websites, poor design, slow speed, and digital marketing that does not perform.
              </p>
              <p>
                With <span className="logo-animated font-black px-1">11 years of experience</span>, a strong team of skilled programmers, creative developers, designers, SEO experts, and digital marketing specialists, DEZO is built to deliver websites that do not just look good — <span className="text-[var(--primary)] font-black">they work, attract, convert, and grow businesses.</span>
              </p>
            </div>
          </Reveal>

          <Reveal direction="up" delay={200}>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-panel-white p-10 rounded-[2rem] border border-main-light hover:border-[var(--primary)]/30 smooth-transition shadow-lg">
                <div className="w-14 h-14 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full flex items-center justify-center mb-6">
                  <Target size={28} />
                </div>
                <p>
                  We have worked with businesses across different industries and understand one thing clearly: <span className="text-main-dark font-black">your website is not just a page on the internet.</span> It is your first impression, your online office, your sales machine, and your 24/7 brand representative. 
                </p>
                <p className="mt-4">
                  When someone visits your website, they should instantly feel <span className="text-[var(--primary)] font-black">trust, quality, confidence,</span> and a strong reason to choose you instead of your competitors.
                </p>
              </div>

              <div className="bg-panel-white p-10 rounded-[2rem] border border-main-light hover:border-[var(--accent)]/30 smooth-transition shadow-lg">
                <div className="w-14 h-14 bg-[var(--accent)]/10 text-[var(--accent)] rounded-full flex items-center justify-center mb-6">
                  <Zap size={28} />
                </div>
                <p>
                  At DEZO, we build powerful websites and digital marketing systems designed to <span className="text-[var(--accent)] font-black">grab attention, create trust, and turn visitors into real customers.</span>
                </p>
                <p className="mt-4">
                  We specialize in premium web development, SEO-ready websites, Meta ads, landing pages, business websites, portfolio websites, branding, lead-generation pages, mobile optimization, fast loading speed, smooth animations, and conversion-focused content. 
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal direction="up" delay={300}>
            <div className="bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-white p-10 md:p-14 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 smooth-transition"></div>
              <h3 className="text-2xl font-black mb-6">The DEZO Standard</h3>
              <p className="text-white/90 mb-6 text-xl">
                Every section, button, headline, color, animation, and word is planned with one clear goal: <span className="font-black text-white bg-black/20 px-2 py-1 rounded">to make your business look stronger, sharper, more professional, and more valuable online.</span>
              </p>
              <p className="text-white/90">
                We proudly build and manage hundreds of websites every month, giving us real experience, speed, creativity, and deep understanding of what works in the market. Our team does not depend on random ideas or basic templates. We use tested strategies, modern design standards, clean coding practices, strong SEO structure, responsive layouts, and growth-focused digital systems to make every project feel professional and powerful.
              </p>
            </div>
          </Reveal>

          <Reveal direction="up" delay={400}>
            <div className="bg-panel-white p-10 md:p-14 rounded-[2.5rem] border border-main-light shadow-xl">
              <h3 className="text-3xl font-black text-main-dark mb-6">Why We Made DEZO</h3>
              <p className="mb-6">
                We made DEZO because too many businesses are stuck with <span className="line-through decoration-red-500 opacity-70">copied-looking websites, slow pages, weak content, poor mobile design, and marketing that brings no serious results</span>. 
              </p>
              <p className="mb-6 text-xl text-[var(--primary)] font-bold">
                Your business deserves better than an average online presence. 
              </p>
              <p>
                In today’s digital world, customers judge your brand before they call you, message you, or visit your store. If your website does not look professional, your competitors will take the attention, the trust, and the customers. <span className="text-main-dark font-black">DEZO is built to stop that from happening.</span>
              </p>
            </div>
          </Reveal>

          <Reveal direction="up" delay={500}>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-main-dark text-white p-10 rounded-[2rem] shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--primary)] opacity-[0.1] blur-[50px] rounded-full group-hover:opacity-[0.2] smooth-transition"></div>
                <div className="w-14 h-14 bg-white/10 text-white rounded-full flex items-center justify-center mb-6">
                  <ShieldCheck size={28} />
                </div>
                <h3 className="text-2xl font-black mb-4 flex items-center gap-2"><Sparkles className="text-[var(--gold)]" /> Our Promise</h3>
                <p className="text-white/80 leading-relaxed">
                  Our promise is simple and serious: we do not create ordinary digital work. We create websites that look premium, feel smooth, load fast, work perfectly on mobile, and guide visitors toward action. We do not just design for beauty — <span className="text-[var(--primary)] font-bold">we design for trust, clarity, speed, performance, ranking, leads, and growth.</span> We listen to your business, understand your audience, study your goals, and build a digital presence that connects with people and makes your brand impossible to ignore.
                </p>
              </div>

              <div className="bg-main-dark text-white p-10 rounded-[2rem] shadow-2xl relative overflow-hidden group">
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-[var(--accent)] opacity-[0.1] blur-[50px] rounded-full group-hover:opacity-[0.2] smooth-transition"></div>
                <div className="w-14 h-14 bg-white/10 text-white rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 size={28} />
                </div>
                <h3 className="text-2xl font-black mb-4 flex items-center gap-2"><ShieldCheck className="text-[var(--primary)]" /> Our Guarantee</h3>
                <p className="text-white/80 leading-relaxed">
                  Our guarantee is bold: your website will look better, feel stronger, and present your business more professionally than before. It will be responsive, SEO-friendly, fast-loading, clean, modern, secure, and ready to represent your brand with confidence. If it does not feel polished, powerful, and worthy of your business, we keep improving it. <span className="text-[var(--accent)] font-bold">We do not stop at "okay." We do not accept "average."</span> We refine, upgrade, and perfect until your digital presence feels ready to compete.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal direction="up" delay={600}>
            <div className="bg-panel-white p-10 md:p-14 rounded-[2.5rem] border border-[var(--primary)]/20 shadow-[0_20px_50px_var(--primary)_0.1] text-center">
              <p className="text-2xl md:text-3xl leading-snug mb-8">
                DEZO is for businesses that want to grow, stand out, and be remembered. We build websites that do not just sit online — <span className="text-[var(--primary)] font-black">they work, attract, convince, and convert.</span>
              </p>
              <p className="mb-10 max-w-4xl mx-auto">
                Backed by 11 years of experience, a strong expert team, and the ability to deliver hundreds of websites every month, we know how to create digital experiences that make brands look serious, trusted, and unstoppable.
              </p>
              
              <div className="bg-main-light p-8 rounded-2xl border border-main-light italic text-main-dark font-medium shadow-inner mb-12">
                "Your competitors are already fighting for attention. Your customers are already searching online. The question is simple: when they find you, will they trust you instantly or move to someone else?"
              </div>

              <p className="text-2xl md:text-3xl leading-snug font-black text-main-dark mb-12">
                With DEZO, your brand does not just appear online. It stands out, speaks clearly, builds confidence, and pushes people to take action.
              </p>

              <div className="bg-main-dark text-white p-8 md:p-12 rounded-[2rem] shadow-2xl relative overflow-hidden text-left border border-white/10">
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/20 to-[var(--accent)]/20 blur-[50px]"></div>
                <div className="relative z-10 flex flex-col items-center text-center">
                  <h2 className="logo-animated text-3xl md:text-4xl font-black mb-6 tracking-wide">DEZO — Digital Excellence, Zero Ordinary</h2>
                  <div className="flex flex-wrap justify-center gap-3 mb-8">
                    {["11 Years Experience", "Hundreds of Websites/Mo", "Expert Programmers", "Creative Developers", "Powerful Marketing"].map((tag, i) => (
                      <span key={i} className="bg-white/10 backdrop-blur text-white px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider">{tag}</span>
                    ))}
                  </div>
                  <div className="flex flex-wrap justify-center gap-4 text-white/50 text-sm font-black uppercase tracking-widest">
                    <span className="line-through decoration-red-500">No weak design</span> • 
                    <span className="line-through decoration-red-500">No slow experience</span> • 
                    <span className="line-through decoration-red-500">No average presence</span>
                  </div>
                  <div className="mt-8 text-xl text-[var(--accent)] font-black">
                    Only premium websites and digital growth built to make your business look unstoppable.
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </main>
  );
};
