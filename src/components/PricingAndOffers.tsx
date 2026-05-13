import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ShieldCheck, Zap, ArrowRight, Star, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';
import { Reveal } from '../components1';

// Custom Expandable Features Component for Pricing
const ExpandableFeatures = ({ features }: { features: string[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex-grow mt-2">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="text-[11px] font-bold uppercase tracking-widest text-main-muted hover:text-white flex items-center gap-1.5 smooth-transition mb-4 text-left"
      >
        {isOpen ? "Hide Advanced Features" : "Show Advanced Features"}
        {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.ul 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="space-y-4 mb-4"
          >
            {features.map((feature, idx) => (
              <li key={idx} className="flex gap-3 text-sm font-medium text-[#94A3B8]">
                <Check size={18} className="text-[#10B981]/50 shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export const PricingSection = () => {
  return (
    <section id="pricing" className="py-24 lg:py-32 bg-main-dark border-y border-[#334155] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center opacity-30">
        <div className="w-[800px] h-[800px] bg-[var(--primary)] rounded-full blur-[150px] mix-blend-screen opacity-10"></div>
      </div>
      
      <div className="max-w-[90rem] mx-auto px-4 lg:px-8 relative z-10">
        <Reveal direction="up">
          <div className="text-center mb-16">
            <h2 className="clamp-h2 font-black text-main-light mb-4 tracking-tight">Simple, Transparent Pricing</h2>
            <p className="text-[#94A3B8] font-medium max-w-2xl mx-auto text-lg pt-2">
              Start with a premium business website, and add advanced custom platform features if needed.
            </p>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Starter Plan */}
          <Reveal direction="up" delay={100} className="h-full">
            <div className="bg-[#1E293B] border border-[#334155] p-8 md:p-10 rounded-3xl h-full flex flex-col hover:-translate-y-2 smooth-transition shadow-[0_15px_30px_rgba(0,0,0,0.2)] hover:border-[var(--primary)]/50">
              <h3 className="text-2xl font-black text-white mb-2">Starter Website</h3>
              <p className="text-[#94A3B8] font-medium mb-6 text-sm">Perfect for establishing online trust</p>
              <div className="mb-8">
                <span className="text-4xl font-black text-[var(--primary)]">₹4,999</span>
                <span className="text-[#94A3B8] text-sm ml-2">onwards</span>
              </div>
              <ul className="space-y-4 flex-grow mb-2">
                {[
                  "Premium & Modern Design",
                  "Mobile-First & Fast Loading",
                  "SEO-Ready Structure",
                ].map((feature, idx) => (
                  <li key={idx} className="flex gap-3 text-sm font-bold text-[#E2E8F0]">
                    <Check size={18} className="text-[#10B981] shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
                <ExpandableFeatures features={["Basic Contact Form", "WhatsApp Integration", "Speed Optimization", "High-Converting UI"]} />
              </ul>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('https://wa.me/919114411026?text=Hi%20DEZO%2C%20I%20want%20a%20website%20starting%20at%20%E2%82%B94%2C999.%20Please%20guide%20me.', '_blank')}
                className="w-full py-4 text-center text-white bg-[#334155] hover:bg-gradient-to-r hover:from-[var(--primary)] hover:to-[var(--accent)] hover:shadow-[0_10px_20px_rgba(124,58,237,0.3)] smooth-transition font-bold rounded-xl"
              >
                Get Website at ₹4,999
              </motion.button>
            </div>
          </Reveal>

          {/* Business Growth Plan */}
          <Reveal direction="up" delay={200} className="h-full relative z-20">
            <div className="absolute -inset-0.5 bg-gradient-to-b from-[var(--primary)] to-[var(--accent)] rounded-[1.6rem] blur-[2px] opacity-70"></div>
            <div className="bg-[#0F172A] border border-transparent p-8 md:p-10 rounded-3xl h-full flex flex-col relative z-30 transform md:scale-105 shadow-[0_20px_40px_rgba(124,58,237,0.2)]">
              <div className="absolute top-0 right-0 bg-gradient-to-r from-[#F59E0B] to-[#EF4444] text-white text-xs font-black uppercase tracking-wider py-1.5 px-4 rounded-bl-xl rounded-tr-3xl shadow-sm">
                Most Popular
              </div>
              <h3 className="text-2xl font-black text-white mb-2 pt-2">Business Growth</h3>
              <p className="text-[#94A3B8] font-medium mb-6 text-sm">Advanced sites + Marketing Guidance</p>
              <div className="mb-8">
                <span className="text-4xl font-black text-[var(--accent)]">₹10,000+</span>
              </div>
              <ul className="space-y-4 flex-grow mb-2">
                {[
                  "Advanced Custom Design",
                  "In-depth Technical SEO",
                  "Free Marketing Guidance"
                ].map((feature, idx) => (
                  <li key={idx} className="flex gap-3 text-sm font-bold text-[#E2E8F0]">
                    <Check size={18} className="text-[#F59E0B] shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
                <ExpandableFeatures features={["Multiple Landing Pages", "Advanced Lead Generation", "Custom Branding & UI/UX", "High-Speed Performance", "Analytics Integration"]} />
              </ul>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('https://wa.me/919114411026?text=Hi%20DEZO%2C%20I%20want%20to%20discuss%20a%20Business%20Growth%20website%20package.', '_blank')}
                className="w-full py-4 text-center text-white bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] shadow-[0_10px_20px_rgba(124,58,237,0.3)] hover:shadow-[0_15px_30px_rgba(236,72,153,0.5)] smooth-transition font-bold rounded-xl"
              >
                Discuss My Project
              </motion.button>
            </div>
          </Reveal>

          {/* Platform / Database Plan */}
          <Reveal direction="up" delay={300} className="h-full">
            <div className="bg-[#1E293B] border border-[#334155] p-8 md:p-10 rounded-3xl h-full flex flex-col hover:-translate-y-2 smooth-transition shadow-[0_15px_30px_rgba(0,0,0,0.2)] hover:border-[var(--primary)]/50">
              <h3 className="text-2xl font-black text-white mb-2">Platform / Database</h3>
              <p className="text-[#94A3B8] font-medium mb-6 text-sm">Add-on for Web Apps & Portals</p>
              <div className="mb-8">
                <span className="text-4xl font-black text-[var(--primary)]">+₹3,000</span>
                <span className="text-[#94A3B8] text-sm ml-2">extra</span>
              </div>
              <ul className="space-y-4 flex-grow mb-2">
                {[
                  "Backend Database Integration",
                  "User Authentication Ready",
                  "Admin Panel / Dashboard",
                ].map((feature, idx) => (
                  <li key={idx} className="flex gap-3 text-sm font-bold text-[#E2E8F0]">
                    <Check size={18} className="text-[#10B981] shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
                <ExpandableFeatures features={["Dynamic Data Modeling", "API Integrations", "Secure Asset Storage", "Custom Logic & Rules", "Scalable Infrastructure"]} />
              </ul>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('https://wa.me/919114411026?text=Hi%20DEZO%2C%20I%20need%20a%20platform/database%20website.', '_blank')}
                className="w-full py-4 text-center text-white bg-[#334155] hover:bg-gradient-to-r hover:from-[var(--primary)] hover:to-[var(--accent)] hover:shadow-[0_10px_20px_rgba(124,58,237,0.3)] smooth-transition font-bold rounded-xl"
              >
                Get Custom Quote
              </motion.button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export const ChallengeSection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] relative overflow-hidden">
      <div className="absolute inset-0 bg-white/5 opacity-50 mix-blend-overlay"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/20 blur-3xl rounded-full"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-black/20 blur-3xl rounded-full"></div>

      <div className="max-w-4xl mx-auto px-4 lg:px-8 relative z-10 text-center">
        <Reveal direction="up">
          <h2 className="clamp-h2 font-black text-white mb-6 tracking-tight drop-shadow-md">DEZO Growth Challenge</h2>
          <p className="text-lg md:text-xl text-white/90 font-medium leading-relaxed mb-6 max-w-3xl mx-auto">
            We challenge weak websites, slow designs, confusing layouts, and poor mobile experiences.
          </p>
          <p className="text-base md:text-lg text-white/80 font-medium leading-relaxed mb-10 max-w-3xl mx-auto">
            If your current website does not build trust, load fast, and guide users clearly, DEZO can make it stronger. If you find the same level of design, speed, mobile experience, SEO structure, and business-focused execution at a better value, we will improve your package with extra value.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="bg-black/20 backdrop-blur-sm border border-white/10 px-6 py-4 rounded-full flex gap-3 items-center">
              <ShieldCheck className="text-[#10B981]" size={24} />
              <span className="font-bold text-white text-sm md:text-base">Premium Design Quality</span>
            </div>
            <div className="bg-black/20 backdrop-blur-sm border border-white/10 px-6 py-4 rounded-full flex gap-3 items-center">
              <Zap className="text-[#F59E0B]" size={24} />
              <span className="font-bold text-white text-sm md:text-base">Built for Speed & SEO</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export const DigitalMarketingSection = () => {
  return (
    <section className="py-24 bg-panel-white border-y border-main-light overflow-hidden relative">
      <div className="max-w-[90rem] mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <Reveal direction="left">
            <div>
              <div className="inline-block px-4 py-1.5 bg-[#FEF3C7] text-[#D97706] font-bold text-xs uppercase tracking-widest rounded-full mb-6">
                Included Value
              </div>
              <h2 className="clamp-h2 font-black text-main-dark mb-6 leading-tight">Free Digital Marketing Guidance</h2>
              <p className="text-lg text-main-muted leading-relaxed mb-8">
                A great website is just the beginning. With selected website packages, we provide free basic guidance on how to grow your business online and get more leads using digital marketing.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4 mb-10">
                {[
                  "Social Media Setup Tips",
                  "Local SEO Best Practices",
                  "Lead Generation Strategy",
                  "Meta Ads Fundamentals"
                ].map((item, idx) => (
                  <div key={idx} className="bg-main-light p-4 rounded-2xl flex items-center gap-3 border border-main-light">
                    <div className="w-8 h-8 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] shrink-0">
                      <Star size={14} className="fill-current" />
                    </div>
                    <span className="font-bold text-main-dark text-sm">{item}</span>
                  </div>
                ))}
              </div>
              
              <a href="#contact" className="inline-flex items-center gap-2 font-bold text-[var(--primary)] hover:gap-4 smooth-transition">
                Claim Your Free Guidance <ArrowRight size={20} />
              </a>
            </div>
          </Reveal>
          
          <Reveal direction="right" delay={200} className="relative hidden lg:block">
            <div className="absolute -inset-4 bg-gradient-to-br from-[var(--primary)]/10 to-[var(--accent)]/10 blur-2xl rounded-full"></div>
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" 
              alt="Digital Marketing Growth" 
              className="rounded-[2.5rem] shadow-xl relative z-10 object-cover aspect-video border border-main-light"
            />
            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-3xl shadow-2xl z-20 border border-main-light flex gap-4 items-center animate-float">
              <div className="w-12 h-12 bg-[#10B981]/10 rounded-full flex items-center justify-center text-[#10B981]">
                <TrendingUp size={24} />
              </div>
              <div>
                <p className="font-black text-main-dark text-lg">Growth Strategy</p>
                <p className="text-sm font-bold text-main-muted">Free with packages</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export const GrowthOffersSection = () => {
  const offers = [
    { title: "Starter Website", price: "₹4,999", bestFor: "Establishing online trust", benefit: "Professional business presence", features: ["Premium Design", "Mobile-First Layout", "WhatsApp CTA"] },
    { title: "Landing Page for Ads", price: "₹3,999", bestFor: "Meta/Google Ads traffic", benefit: "High conversion rates", features: ["Fast Loading", "Conversion Copy", "Lead Form"] },
    { title: "SEO-Ready Website", price: "₹5,999", bestFor: "Organic Google ranking", benefit: "Long-term traffic growth", features: ["On-Page SEO", "Fast Speeds", "Schema Markup"] },
    { title: "Business Growth Website", price: "₹7,999", bestFor: "Scaling businesses", benefit: "Advanced branding & trust", features: ["Custom Branding", "Lead Gen Focus", "Analytics Setup"] },
    { title: "Ecommerce Website", price: "₹12,999", bestFor: "Selling products online", benefit: "Automated sales & payments", features: ["Payment Gateway", "Product Pages", "Cart System"] },
    { title: "Platform / Database Website", price: "₹10,000+", bestFor: "Custom web apps & portals", benefit: "Complex logic & data", features: ["Backend Database", "Admin Panel", "User Login"] },
    { title: "Add Advanced Features", price: "from ₹3,000 extra", bestFor: "Extending functionality", benefit: "Custom modules & tools", features: ["API Integrations", "Custom Forms", "Automations"] },
    { title: "Free Digital Marketing Guidance", price: "Value Add", bestFor: "Selected packages", benefit: "Growth strategy", features: ["SEO Tips", "Ads Strategy", "Social Media Setup"] }
  ];

  return (
    <section id="offers" className="py-24 bg-panel-white border-y border-main-light overflow-hidden">
      <div className="max-w-[90rem] mx-auto px-4 lg:px-8">
        <Reveal direction="up">
          <div className="text-center mb-16">
            <h2 className="clamp-h2 font-black text-main-dark mb-4 tracking-tight">DEZO Website & Digital Growth Offers</h2>
            <p className="text-main-muted font-medium max-w-2xl mx-auto text-lg pt-2">
              Final pricing depends on pages, features, design complexity, database, admin panel, automation, content, and custom requirements.
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {offers.map((offer, idx) => (
            <Reveal key={idx} direction="up" delay={idx * 50}>
              <motion.div whileHover={{ y: -5 }} className="bg-white border border-main-light p-6 rounded-2xl h-full flex flex-col hover:shadow-xl smooth-transition hover:border-[var(--primary)]/30 group">
                <div className="mb-4">
                  <h3 className="text-xl font-black text-main-dark mb-1">{offer.title}</h3>
                  <div className="text-2xl font-black text-[var(--primary)]">{offer.price}</div>
                </div>
                <div className="text-sm font-medium text-main-muted mb-4 border-b border-main-light pb-4">
                  <span className="block mb-1"><strong>Best for:</strong> {offer.bestFor}</span>
                  <span className="block"><strong>Benefit:</strong> {offer.benefit}</span>
                </div>
                <ul className="space-y-3 flex-grow mb-6">
                  {offer.features.map((feature, i) => (
                    <li key={i} className="flex gap-2 text-sm font-bold text-main-dark">
                      <Check size={16} className="text-[#10B981] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.open(`https://wa.me/919114411026?text=Hi%20DEZO%2C%20I%20am%20interested%20in%20the%20${offer.title}%20offer.`, '_blank')}
                  className="w-full py-3 text-center text-sm text-[var(--primary)] bg-[var(--primary)]/10 hover:bg-[var(--primary)] hover:text-white smooth-transition font-bold rounded-xl mt-auto"
                >
                  Claim Offer
                </motion.button>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

