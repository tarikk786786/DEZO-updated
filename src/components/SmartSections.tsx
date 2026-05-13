import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ChevronDown, ChevronUp, LayoutTemplate, Globe, Layers, TrendingUp, Megaphone, Target, Search } from 'lucide-react';
import { Reveal } from '../components1';

// Compact Offer Banner Component
export const OfferBanner = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full bg-[#0F172A] border-y border-[#334155] cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
      <div className="max-w-[90rem] mx-auto px-4 py-3 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/10 via-[var(--accent)]/10 to-[var(--primary)]/10 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-2 text-sm md:text-base font-bold text-white tracking-wide">
            <span className="text-[#F59E0B]">🔥 LIMITED GROWTH OFFER:</span>
            <span>Premium Business Websites Starting at <span className="text-[var(--accent)] text-lg">₹4,999</span></span>
            {isOpen ? <ChevronUp size={18} className="text-[#94A3B8]" /> : <ChevronDown size={18} className="text-[#94A3B8]" />}
          </div>
          
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden w-full max-w-2xl mt-4"
              >
                <div className="grid sm:grid-cols-2 gap-4 bg-[#1E293B] p-5 rounded-2xl border border-[#334155]">
                  <div className="flex items-start gap-3">
                    <Check size={18} className="text-[#10B981] shrink-0 mt-0.5" />
                    <p className="text-sm font-medium text-[#E2E8F0] text-left">Platform / Database add-ons from <span className="font-bold text-white">₹3,000 extra</span></p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check size={18} className="text-[#10B981] shrink-0 mt-0.5" />
                    <p className="text-sm font-medium text-[#E2E8F0] text-left">Advanced scalable websites from <span className="font-bold text-white">₹10,000+</span></p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check size={18} className="text-[#10B981] shrink-0 mt-0.5" />
                    <p className="text-sm font-medium text-[#E2E8F0] text-left">Free basic digital marketing guidance included</p>
                  </div>
                  <div className="mt-2 sm:mt-0">
                    <a href="https://wa.me/919114411026?text=Hi%20DEZO%2C%20I%20want%20a%20website%20starting%20at%20%E2%82%B94%2C999.%20Please%20guide%20me." target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-lg font-bold text-sm w-full justify-center hover:opacity-90 smooth-transition" onClick={(e) => e.stopPropagation()}>
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// Expandable Section Component
export const ExpandableSection = ({ title, children, buttonText = "See Details" }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm font-bold text-[var(--accent)] hover:text-white transition-colors"
      >
        {isOpen ? buttonText.replace('See', 'Hide') : buttonText}
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mt-3"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Services Tabs Component
export const ServicesTabs = () => {
  const [activeTab, setActiveTab] = useState('websites');

  const tabs = [
    { id: 'websites', label: 'Websites' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'advanced', label: 'Advanced' },
    { id: 'optimization', label: 'Optimization' },
  ];

  const content: any = {
    websites: [
      {
        title: "Starter Website",
        desc: "Fast, modern business websites from ₹4,999.",
        icon: <LayoutTemplate size={24} />,
        problem: "No professional online presence.",
        solution: "A mobile-first, SEO-ready website built for trust.",
        benefits: ["Premium Design", "WhatsApp Integration", "Fast Loading"],
      },
      {
        title: "Business Website",
        desc: "Professional multi-page setups from ₹7,999.",
        icon: <Globe size={24} />,
        problem: "Need more pages to showcase services.",
        solution: "A structured business site with lead forms.",
        benefits: ["Multiple Sections", "Lead Generation", "SEO Structure"],
      },
      {
        title: "Ecommerce Website",
        desc: "Online stores built to sell.",
        icon: <Search size={24} />,
        problem: "Need to sell products online securely.",
        solution: "A high-converting store with payment integration.",
        benefits: ["Secure Checkout", "Inventory Sync", "Optimized Cart"],
      },
      {
        title: "Landing Page",
        desc: "High-converting single pages.",
        icon: <Target size={24} />,
        problem: "Ad traffic isn't converting.",
        solution: "Psychology-driven pages for maximum ROI.",
        benefits: ["A/B Testing Ready", "Fast Loading", "Conversion UX"],
      }
    ],
    marketing: [
      {
        title: "Digital Marketing Guidance",
        desc: "Free basic guidance securely with websites.",
        icon: <TrendingUp size={24} />,
        problem: "Don't know how to grow after launch.",
        solution: "Strategic advice on SEO, social, and leads.",
        benefits: ["Growth Strategy", "Social Media Setup", "Lead Gen Basics"],
      },
      {
        title: "Meta Ads",
        desc: "Targeted Facebook & Instagram campaigns.",
        icon: <Megaphone size={24} />,
        problem: "Need immediate traffic and leads.",
        solution: "High-ROI campaigns targeting your exact audience.",
        benefits: ["Creative Design", "Audience Targeting", "Retargeting"],
      },
      {
        title: "SEO",
        desc: "Rank higher on Google.",
        icon: <Target size={24} />,
        problem: "Nobody finds your website locally.",
        solution: "Technical & on-page SEO for sustained growth.",
        benefits: ["On-Page SEO", "Keyword Strategy", "Local Visibility"],
      }
    ],
    advanced: [
      {
        title: "Platform Development",
        desc: "Custom web apps & portals.",
        icon: <Layers size={24} />,
        problem: "Need unique functionality beyond standard websites.",
        solution: "Custom-coded platforms tailored to your operations.",
        benefits: ["Custom UI/UX", "User Roles", "Scalable Logic"],
        priceHint: "From ₹3,000 extra"
      },
      {
        title: "Database Integration",
        desc: "Dynamic data handling.",
        icon: <Layers size={24} />,
        problem: "Need to store and manage thousands of records.",
        solution: "Robust, secure backend database systems.",
        benefits: ["Data Modeling", "Secure Storage", "Dynamic Content"],
        priceHint: "From ₹3,000 extra"
      },
      {
        title: "Admin Panel / Dashboard",
        desc: "Manage your business easily.",
        icon: <LayoutTemplate size={24} />,
        problem: "Hard to manage website data and users.",
        solution: "A branded administrative control panel.",
        benefits: ["Analytics", "Content Management", "User Management"],
        priceHint: "From ₹3,000 extra"
      }
    ],
    optimization: [
      {
        title: "Speed Optimization",
        desc: "Lighthouse-perfect performance.",
        icon: <Zap size={24} />,
        problem: "Website loads slowly, losing visitors.",
        solution: "Image compression, code splitting, and caching strategies.",
        benefits: ["Higher Conversion", "Better SEO", "Lower Bounce Rate"],
      },
      {
        title: "Website Redesign",
        desc: "Modernize your old site.",
        icon: <LayoutTemplate size={24} />,
        problem: "Website looks outdated and untrustworthy.",
        solution: "A complete visual and structural overhaul.",
        benefits: ["Modern UI", "Better UX", "Mobile Responsive"],
      }
    ]
  };

  return (
    <section id="services" className="py-24 bg-panel-white overflow-hidden relative">
      <div className="max-w-[90rem] mx-auto px-4 lg:px-8">
        <Reveal direction="up">
          <div className="text-center mb-12">
            <h2 className="clamp-h2 font-black text-main-dark mb-4">Our Services</h2>
            <p className="text-main-muted font-medium max-w-2xl mx-auto">
              From fast business websites to custom platforms and digital marketing.
            </p>
          </div>
        </Reveal>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-full font-bold text-sm smooth-transition ${
                activeTab === tab.id 
                  ? 'bg-[var(--primary)] text-white shadow-md' 
                  : 'bg-panel-white text-main-muted border border-main-light hover:border-[var(--primary)] hover:text-[var(--primary)]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {content[activeTab].map((service: any, idx: number) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="bg-panel-white border border-main-light p-6 rounded-2xl shadow-sm hover:shadow-md smooth-transition flex flex-col h-full"
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center mb-6">
                  {service.icon}
                </div>
                <h3 className="font-black text-xl text-main-dark mb-2">{service.title}</h3>
                <p className="text-sm text-main-muted mb-4 font-medium flex-grow">{service.desc}</p>
                
                {service.priceHint && (
                  <p className="text-xs font-bold text-[#F59E0B] mb-4 bg-[#F59E0B]/10 w-fit px-2 py-1 rounded">
                    {service.priceHint}
                  </p>
                )}

                <ExpandableSection buttonText="More Details">
                  <div className="pt-4 border-t border-main-light space-y-3">
                    <div>
                      <strong className="text-xs uppercase tracking-widest text-[var(--primary)]">Problem:</strong>
                      <p className="text-sm text-main-light">{service.problem}</p>
                    </div>
                    <div>
                      <strong className="text-xs uppercase tracking-widest text-[#10B981]">Solution:</strong>
                      <p className="text-sm text-main-light">{service.solution}</p>
                    </div>
                    <ul className="pt-2">
                      {service.benefits.map((benefit: string, i: number) => (
                        <li key={i} className="flex gap-2 text-xs text-main-muted mb-1">
                          <Check size={14} className="text-[#10B981]" /> {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </ExpandableSection>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export const Zap = ({ size = 24, className = "" }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
);
