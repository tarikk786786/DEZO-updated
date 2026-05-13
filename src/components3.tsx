import React, { useState } from 'react';
import { 
  Megaphone, LayoutTemplate, Target, CheckCircle2, 
  ArrowRight, Users, ChevronDown, Check, Zap, Star, ShieldCheck,
  Globe, Code, Search, Smartphone, TrendingUp, Layers, CheckCircle
} from 'lucide-react';
import { Reveal } from './components1';
import { FallbackImage } from './components2';
import { motion } from 'motion/react';

export const ServicesSection = ({ nightMode }: { nightMode?: boolean }) => {
  const services = [
    {
      title: "Business Websites (Starts ₹4,999)",
      description: "Fast, modern, SEO-ready business websites built for trust and lead generation.",
      icon: <LayoutTemplate size={32} />,
      features: ["Premium Design", "Mobile First", "SEO-Ready Structure", "WhatsApp Integration"]
    },
    {
      title: "Ecommerce Websites",
      description: "High-converting online stores with secure checkout and modern product displays.",
      icon: <Globe size={32} />,
      features: ["Secure Payments", "Inventory Management", "Fast Loading", "Optimized Cart"]
    },
    {
      title: "Platform & Database (Starts ₹3,000 extra)",
      description: "Advanced custom platforms, portals, and database-driven dynamic websites.",
      icon: <Layers size={32} />,
      features: ["Custom UI/UX", "Database Setup", "Dynamic Content", "Admin Dashboard"]
    },
    {
      title: "Basic Digital Marketing (Free)",
      description: "Free marketing guidance included with our website packages to help you grow.",
      icon: <TrendingUp size={32} />,
      features: ["Growth Strategy", "Social Media Setup", "Basic Lead Gen", "Conversion Tips"]
    },
    {
      title: "Meta Ads Management",
      description: "Targeted Facebook and Instagram campaigns to generate quality business leads.",
      icon: <Megaphone size={32} />,
      features: ["Creative Ad Design", "Audience Targeting", "Retargeting", "Lead Gen Focus"]
    },
    {
      title: "SEO Services",
      description: "Technical SEO and content optimization to rank higher on Google search.",
      icon: <Target size={32} />,
      features: ["On-Page SEO", "Technical Audits", "Keyword Strategy", "Local Visibility"]
    }
  ];

  return (
    <section id="services" className="py-24 lg:py-32 bg-main-dark border-y border-main-dark overflow-hidden relative">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center opacity-40">
        <div className="w-[800px] h-[800px] bg-gradient-to-r from-[var(--primary)] to-transparent rounded-full blur-[150px] mix-blend-screen opacity-20"></div>
      </div>
      <div className="max-w-[90rem] mx-auto px-4 lg:px-8 relative z-10">
        <Reveal direction="up">
          <div className="text-center mb-16">
            <h2 className="clamp-h2 font-black text-main-light mb-4 tracking-tight">Premium Website Development That Converts</h2>
            <p className="text-main-muted max-w-2xl mx-auto font-medium">We deliver end-to-end digital solutions that drive measurable growth.</p>
          </div>
        </Reveal>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 cursor-pointer">
          {services.map((service, idx) => (
            <Reveal key={idx} delay={idx * 150} direction="up" className="h-full">
              <motion.div 
                whileHover={{ y: -8, scale: 1.01, transition: { duration: 0.3 } }}
                whileTap={{ scale: 0.98 }}
                className="bg-main-light rounded-3xl p-8 lg:p-10 border border-main-light h-full hover:border-[var(--primary)]/50 hover:shadow-[0_20px_40px_rgba(139,92,246,0.15)] smooth-transition flex flex-col group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 to-[var(--accent)]/5 opacity-0 group-hover:opacity-100 smooth-transition pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)]/5 blur-3xl rounded-full pointer-events-none group-hover:bg-[var(--primary)]/20 smooth-transition"></div>
                <div className="w-16 h-16 rounded-2xl bg-panel-white flex items-center justify-center text-[var(--primary)] mb-8 shadow-sm border border-main-light group-hover:scale-110 group-hover:rotate-3 smooth-transition relative z-10">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-black text-main-dark mb-4 relative z-10">{service.title}</h3>
                <p className="text-main-muted leading-relaxed mb-8 flex-grow relative z-10">{service.description}</p>
                <ul className="space-y-3 relative z-10">
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-3 text-sm font-bold text-main-dark">
                      <div className="w-5 h-5 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] shrink-0">
                        <Check size={12} strokeWidth={3} />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 lg:py-32 bg-panel-white overflow-hidden">
      <div className="max-w-[90rem] mx-auto px-4 lg:px-8 border-t border-main-light pt-24 lg:pt-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <Reveal direction="left">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] opacity-20 blur-3xl rounded-[3rem]"></div>
              <img loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200" alt="Dezo Agency Team Collaboration" className="rounded-[2.5rem] shadow-2xl relative z-10 w-full object-cover aspect-[4/3] border border-main-light" />
              <div className="absolute -bottom-8 -right-8 bg-main-dark text-main-light p-8 rounded-[2rem] shadow-2xl z-20 hidden md:block border border-white/10">
                <div className="text-5xl font-black mb-2 text-[var(--primary)]">100+</div>
                <div className="text-sm font-bold uppercase tracking-widest text-[#94A3B8]">Successful<br/>Projects</div>
              </div>
            </div>
          </Reveal>
          
          <Reveal direction="right" delay={200}>
            <div>
              <div className="text-xs font-bold text-[var(--primary)] tracking-[0.2em] uppercase mb-4">About Dezo</div>
              <h2 className="clamp-h2 font-black text-main-dark mb-6 leading-tight">Ecommerce Websites, Landing Pages & Custom Web Solutions</h2>
              <p className="text-lg text-main-muted mb-8 leading-relaxed">
                At Dezo, we focus on clean design, fast performance, mobile responsiveness, strong SEO structure and measurable digital growth. Whether a business needs a new website, a high-converting landing page, ecommerce development or paid advertising support, our team builds digital systems that look premium and perform in real business conditions.
              </p>
              
              <div className="space-y-6 mb-10">
                {[
                  "Award-Winning Design Team",
                  "Data-Driven Marketing Strategies",
                  "Blazing Fast Web Technologies",
                  "Dedicated Support & Maintenance"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] shrink-0">
                      <CheckCircle2 size={18} />
                    </div>
                    <span className="font-bold text-main-dark text-lg">{item}</span>
                  </div>
                ))}
              </div>
              
              <a href="#contact" className="inline-flex items-center gap-3 font-bold text-[var(--primary)] hover:gap-5 smooth-transition border-b-2 border-[var(--primary)] pb-1">
                Meet The Team <ArrowRight size={20} />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export const MissionTargetSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-main-light overflow-hidden">
      <div className="max-w-[90rem] mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Reveal direction="up">
            <h2 className="clamp-h2 font-black text-main-dark mb-6">SEO, Meta Ads & Google Ads for Business Growth</h2>
            <p className="text-main-muted text-lg font-medium">To deliver exceptional digital value and help brands establish their dominance in the digital space through innovation and creativity.</p>
          </Reveal>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <Reveal direction="up" delay={100}>
            <motion.div 
              whileHover={{ y: -8, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="bg-panel-white p-10 rounded-[2rem] border border-main-light h-full group hover:shadow-[0_20px_40px_-10px_rgba(139,92,246,0.2)] smooth-transition relative overflow-hidden"
            >
               <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)] opacity-[0.05] group-hover:opacity-20 blur-3xl rounded-full smooth-transition"></div>
               <div className="w-16 h-16 bg-[var(--primary)]/10 text-[var(--primary)] rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:rotate-6 smooth-transition">
                 <Target size={32} />
               </div>
               <h3 className="text-2xl font-black text-main-dark mb-4">Local Business Growth</h3>
               <p className="text-main-muted leading-relaxed">
                 We aim to become the leading digital partner for forward-thinking enterprises, delivering web solutions that don't just look good but perform exceptionally. Our target is scaling businesses through data-driven digital architecture and establishing long-term partnerships.
               </p>
            </motion.div>
          </Reveal>
          <Reveal direction="up" delay={200}>
            <motion.div 
              whileHover={{ y: -8, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="bg-panel-white p-10 rounded-[2rem] border border-main-light h-full group hover:shadow-[0_20px_40px_-10px_rgba(236,72,153,0.2)] smooth-transition relative overflow-hidden"
            >
               <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent)] opacity-[0.05] group-hover:opacity-20 blur-3xl rounded-full smooth-transition"></div>
               <div className="w-16 h-16 bg-[var(--accent)]/10 text-[var(--accent)] rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:-rotate-6 smooth-transition">
                 <Star size={32} />
               </div>
               <h3 className="text-2xl font-black text-main-dark mb-4">Transparent Delivery and Support</h3>
               <p className="text-main-muted leading-relaxed">
                 To shatter the barriers of digital entry by providing top-tier, enterprise-grade development and design at accessible price points. We believe every business deserves a premium digital presence, and we are here to make that a reality through innovative engineering.
               </p>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export const WhyChooseUsSection = () => {
  const reasons = [
    { title: "11+ Years Experience", icon: <Star size={24} /> },
    { title: "100+ Websites Monthly", icon: <Globe size={24} /> },
    { title: "Expert Developers", icon: <Code size={24} /> },
    { title: "SEO-Friendly Websites", icon: <Search size={24} /> },
    { title: "Mobile-First Design", icon: <Smartphone size={24} /> },
    { title: "Meta Ads + SEO Support", icon: <TrendingUp size={24} /> },
    { title: "Fast Delivery", icon: <Zap size={24} /> },
    { title: "Real Portfolio", icon: <Layers size={24} /> },
    { title: "Transparent Process", icon: <CheckCircle size={24} /> },
    { title: "Conversion-Focused Design", icon: <Target size={24} /> },
  ];

  return (
    <section className="py-24 lg:py-32 bg-main-dark relative overflow-hidden" style={{ background: 'var(--hero-bg)' }}>
      <div className="max-w-[90rem] mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <Reveal direction="up">
            <h2 className="clamp-h2 font-black text-white mb-6">Why Businesses Choose DEZO</h2>
            <p className="text-main-muted text-lg font-medium">DEZO does not just design websites. We build business growth systems that help people trust you, contact you, and buy from you.</p>
          </Reveal>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mb-16">
          {reasons.map((item, i) => (
            <Reveal key={i} direction="up" delay={i * 50}>
              <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 h-full flex flex-col items-center justify-center text-center hover:bg-white/10 hover:border-[var(--primary)]/50 hover:-translate-y-1 smooth-transition relative overflow-hidden group">
                 <div className="text-[var(--primary)] mb-4 group-hover:scale-110 smooth-transition">
                   {item.icon}
                 </div>
                 <h3 className="text-sm font-bold text-white leading-snug">{item.title}</h3>
                 
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-[var(--primary)] opacity-0 blur-xl rounded-full group-hover:opacity-20 smooth-transition pointer-events-none"></div>
              </div>
            </Reveal>
          ))}
        </div>
        
        <Reveal direction="up" delay={300}>
          <div className="bg-gradient-to-r from-[var(--primary)]/20 to-[var(--accent)]/20 border border-[var(--primary)]/30 rounded-[2rem] p-10 text-center relative overflow-hidden max-w-4xl mx-auto">
            <h3 className="text-2xl font-black text-white mb-4">Dedicated Support After Delivery</h3>
            <p className="text-main-muted mx-auto font-medium mb-6">
              We stand by our work. Our relationship doesn't end at launch; we provide continuous technical support, SEO monitoring, and infrastructure optimizations to ensure your long-term success.
            </p>
            <a href="https://wa.me/919114411026?text=Hi%20dezo%2C%20I%20want%20to%20know%20more%20about%20your%20services" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white font-bold rounded-full hover:shadow-lg hover:shadow-[#25D366]/30 smooth-transition max-w-max mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 1.833 6.368L.141 24l5.803-1.492A12 12 0 1 0 11.944 0zm0 22C6.918 22 2.802 18.237 2.451 13.315l1.637 1.636a8.878 8.878 0 0 1 10.9-10.9l1.636-1.636C12.186 2.012 11.968 2 11.944 2c-5.522 0-10 4.477-10 10 0 1.76.452 3.411 1.233 4.887L1.93 21.365l4.63-1.196A9.957 9.957 0 0 0 11.944 22c5.522 0 10-4.478 10-10s-4.478-10-10-10zm5.176-6.425c-.282-.141-1.669-.824-1.927-.919-.258-.094-.447-.141-.635.141-.188.282-.729.919-.894 1.107-.165.188-.33.211-.612.07-.282-.141-1.19-.439-2.268-1.4-8.37-1.135 7.42-1.925 7.185-1.442-.236.483-3.692.671-5.127.812-.141.141-.33.353-.33.353s-.188.165-.188.447c0 .282.188.635.423.824.236.188.236.47.236.753.047.893-1.011 2.585-2.067 2.679-1.011.094-1.364.094-1.904-.094s-.541-.47-.541-.894.236-1.011.682-1.364c.541-.423.705-.682.894-1.152.188-.47.094-.894-.047-1.176-.141-.282-.635-1.528-.87-2.092-.235-.564-.47-.487-.635-.494-.165-.008-.353-.008-.541-.008s-.494.07-.753.353c-.258.282-1.011.988-1.011 2.4 0 1.411 1.035 2.775 1.176 2.963.141.188 2.022 3.081 4.891 4.316.682.294 1.223.47 1.646.6.682.216 1.305.185 1.796.113.551-.082 1.669-.682 1.904-1.34s.235-1.223.165-1.341c-.07-.118-.258-.188-.541-.33z"/></svg> 
                Discuss With Us
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export const IndustriesTestimonialsSections = () => {
  return (
    <>
      {/* Industries We Serve */}
      <section className="py-24 lg:py-32 bg-panel-white overflow-hidden border-b border-main-light">
        <div className="max-w-[90rem] mx-auto px-4 lg:px-8">
          <Reveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="clamp-h2 font-black text-main-dark mb-4 tracking-tight">Industries We Serve</h2>
              <p className="text-main-muted font-medium">We deliver specialized digital strategies tailored to your sector's unique audience.</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {["Real Estate & Builders", "Healthcare & Clinics", "Ecommerce & Retail", "Education & EdTech", "Travel & Tourism", "Manufacturing", "B2B SaaS", "Local Services"].map((industry, i) => (
              <Reveal key={i} direction="up" delay={i * 50}>
                <div className="p-6 md:p-8 bg-main-light rounded-3xl border border-main-light text-center hover:border-[var(--primary)] smooth-transition shadow-sm">
                  <h3 className="text-lg font-bold text-main-dark">{industry}</h3>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-24 lg:py-32 bg-main-light overflow-hidden border-b border-main-light">
        <div className="max-w-[90rem] mx-auto px-4 lg:px-8">
          <Reveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="clamp-h2 font-black text-main-dark mb-4 tracking-tight">What Our Clients Say</h2>
              <p className="text-main-muted font-medium">Don't just take our word for it—see how we've helped businesses grow.</p>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                text: "DEZO completely transformed our digital presence. Our new ecommerce site is lightning fast and the Meta Ads campaign doubled our ROAS in just 3 months.",
                author: "Amit S.",
                role: "Retail Founder"
              },
              {
                text: "The best web development company in India we have worked with. Their attention to detail, SEO-ready structure, and transparent communication is unmatched.",
                author: "Priya M.",
                role: "Marketing Director"
              },
              {
                text: "We hired DEZO for Google Ads management and landing page design. The conversion rate skyrocketed from 2% to 8%. Absolutely premium quality work.",
                author: "Kunal T.",
                role: "B2B SaaS Founder"
              }
            ].map((testimonial, i) => (
              <Reveal key={i} direction="up" delay={i * 100} className="h-full">
                <div className="bg-panel-white p-8 lg:p-10 rounded-3xl border border-main-light shadow-sm h-full flex flex-col justify-between hover:-translate-y-1 smooth-transition">
                  <div>
                    <div className="flex gap-1 text-[var(--primary)] mb-6">
                      <Star size={20} fill="currentColor" />
                      <Star size={20} fill="currentColor" />
                      <Star size={20} fill="currentColor" />
                      <Star size={20} fill="currentColor" />
                      <Star size={20} fill="currentColor" />
                    </div>
                    <p className="text-main-dark font-medium leading-relaxed mb-8">"{testimonial.text}"</p>
                  </div>
                  <div>
                    <p className="font-bold text-main-dark text-lg">{testimonial.author}</p>
                    <p className="text-sm font-medium text-main-muted">{testimonial.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      
      {/* Local SEO Section */}
      <section className="py-24 lg:py-32 bg-main-dark overflow-hidden">
        <div className="max-w-[90rem] mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal direction="left">
              <div>
                <h2 className="clamp-h2 font-black text-main-light mb-6">Website Development & Digital Marketing Services in Bhubaneswar, Odisha</h2>
                <p className="text-[#94A3B8] leading-relaxed mb-6 font-medium">As a premier digital marketing agency in Bhubaneswar, DEZO empowers local businesses across Odisha. We specialize in building high-performance websites, improving Google search rankings via SEO, and running targeted Meta Ads and Google Ads campaigns tailored for the Indian market.</p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-bold text-[#E2E8F0]">website development company in Bhubaneswar</span>
                  <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-bold text-[#E2E8F0]">SEO services in Bhubaneswar</span>
                  <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-bold text-[#E2E8F0]">website design company in Odisha</span>
                  <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-bold text-[#E2E8F0]">Meta Ads agency in Odisha</span>
                </div>
              </div>
            </Reveal>
            <Reveal direction="right" delay={200}>
              <div className="bg-white/5 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/10">
                <h3 className="text-2xl font-black text-white mb-6">Dominate Your Local Market</h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-white font-medium">
                    <div className="w-6 h-6 rounded-full bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)]"><Check size={14} /></div> Local SEO Optimization
                  </li>
                  <li className="flex items-center gap-3 text-white font-medium">
                    <div className="w-6 h-6 rounded-full bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)]"><Check size={14} /></div> Geotargeted Google Ads
                  </li>
                  <li className="flex items-center gap-3 text-white font-medium">
                    <div className="w-6 h-6 rounded-full bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)]"><Check size={14} /></div> Hyper-Local Meta Ads
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
};

export const BlogSection = () => {
  const blogs = [
    {
      title: "The Future of React in 2026: What You Need to Know",
      date: "May 4, 2026",
      category: "Development",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Why Minimalist Design is Converting Better Than Ever",
      date: "April 28, 2026",
      category: "Design",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Maximizing ROI with Next-Gen Digital Architecture",
      date: "April 15, 2026",
      category: "Business",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop"
    }
  ];

  return (
    <section id="blog" className="py-24 lg:py-32 bg-panel-white overflow-hidden">
      <div className="max-w-[90rem] mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <Reveal direction="left">
            <div>
              <div className="text-xs font-bold text-[var(--primary)] tracking-[0.2em] uppercase mb-4">DEZO Learnings</div>
              <h2 className="clamp-h2 font-black text-main-dark leading-tight">Resources for Web Growth & Marketing</h2>
            </div>
          </Reveal>
          <Reveal direction="right">
            <a href="#" className="font-bold text-[var(--primary)] hover:text-[var(--accent)] smooth-transition flex items-center gap-2">
              View All Posts <ArrowRight size={20} />
            </a>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {blogs.map((blog, i) => (
            <Reveal key={i} direction="up" delay={i * 100}>
              <article className="group cursor-pointer">
                <div className="rounded-[2rem] overflow-hidden mb-6 relative aspect-[4/3]">
                   <img loading="lazy" decoding="async" src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 smooth-transition duration-500" />
                   <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-main-dark uppercase tracking-widest shadow-lg">
                      {blog.category}
                   </div>
                </div>
                <div className="flex items-center gap-4 text-xs font-bold text-[#94A3B8] mb-3 uppercase tracking-widest">
                  <span>{blog.date}</span>
                </div>
                <h3 className="text-xl font-black text-main-dark group-hover:text-[var(--primary)] smooth-transition leading-snug line-clamp-2">
                  {blog.title}
                </h3>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export const ProcessSection = () => {
  const steps = [
    { num: "01", title: "Discovery", desc: "We deep dive into your business goals, target audience, and competitive landscape." },
    { num: "02", title: "Strategy & Design", desc: "Crafting wireframes and high-fidelity designs focused on user experience and conversion." },
    { num: "03", title: "Development", desc: "Building the solution using cutting-edge, scalable, and secure technologies." },
    { num: "04", title: "Launch & Scale", desc: "Rigorous testing, successful deployment, and ongoing optimization for growth." }
  ];

  return (
    <section id="process" className="py-24 lg:py-32 bg-main-light overflow-hidden">
      <div className="max-w-[90rem] mx-auto px-4 lg:px-8">
        <Reveal direction="up">
          <div className="text-center mb-16 lg:mb-24">
            <div className="text-xs font-bold text-brand-primary tracking-[0.2em] uppercase mb-4">Our Methodology</div>
            <h2 className="clamp-h2 font-black text-main-dark mb-4 tracking-tight">Our Web Development & Marketing Process</h2>
          </div>
        </Reveal>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <div className="hidden lg:block absolute top-[40px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-main-muted/20 to-transparent"></div>
          {steps.map((step, idx) => (
            <Reveal key={idx} delay={idx * 150} direction="up">
              <div className="relative text-center lg:text-left group">
                <div className="w-20 h-20 rounded-[1.5rem] bg-panel-white border-2 border-main-light shadow-xl flex items-center justify-center mx-auto lg:mx-0 mb-6 relative z-10 font-black text-2xl text-main-dark group-hover:border-brand-primary group-hover:text-brand-primary smooth-transition">
                  {step.num}
                </div>
                <h3 className="text-xl font-black text-main-dark mb-3">{step.title}</h3>
                <p className="text-main-muted leading-relaxed text-sm">{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = [
    { q: "How much does a website cost in India?", a: "At DEZO, our premium business websites start at just ₹4,999. The final price depends on specific requirements like the number of pages, custom design complexity, backend databases, and advanced functionalities." },
    { q: "What is included in ₹4,999 website?", a: "The starter ₹4,999 package includes a premium mobile-first design, basic SEO setup, fast-loading layout, WhatsApp integration, and free basic digital marketing guidance to help you grow." },
    { q: "What are platform/database add-ons?", a: "If your business needs dynamic data (like user accounts, inventory holding, real-time fetching) or an admin panel, we add a backend database infrastructure. These add-ons start from ₹3,000 depending on complexity." },
    { q: "Do you provide digital marketing?", a: "Yes. Along with free basic guidance included with selected website packages, we offer full-service digital marketing including Meta Ads, Lead Generation, and Growth Strategy." },
    { q: "Do you provide SEO?", a: "Yes, we build SEO-ready websites and offer dedicated Search Engine Optimization (SEO) services to help you rank higher on Google through technical, on-page, and local SEO." },
    { q: "Can you build ecommerce website?", a: "Yes. We build high-converting ecommerce platforms with secure checkout, inventory management, fast loading speeds, and optimized UX/UI." },
    { q: "Can you redesign my old website?", a: "Absolutely. We specialize in modernizing outdated sites to increase speed, improve mobile responsiveness, update the brand look, and optimize for conversions." },
    { q: "How do I contact DEZO?", a: "You can reach us instantly by clicking any WhatsApp button on this site, messaging us at +91 91144 11026, or filling out the secure contact form below." }
  ];

  return (
    <section id="faq" className="py-24 lg:py-32 bg-panel-white overflow-hidden border-t border-main-light">
      <div className="max-w-[50rem] mx-auto px-4 lg:px-8">
        <Reveal direction="up">
          <div className="text-center mb-16">
            <h2 className="clamp-h2 font-black text-main-dark tracking-tight">Frequently Asked Questions</h2>
          </div>
        </Reveal>
        
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <Reveal key={idx} delay={idx * 50} direction="up">
              <div className="border border-main-light rounded-2xl bg-main-light overflow-hidden smooth-transition hover:border-[var(--primary)]/50">
                <button 
                  className="w-full px-6 py-5 flex items-center justify-between font-bold text-left focus:outline-none"
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                >
                  <span className="text-base text-main-dark pr-8">{faq.q}</span>
                  <div className={`w-8 h-8 rounded-full bg-panel-white flex items-center justify-center border border-main-light shrink-0 text-main-dark smooth-transition ${openIndex === idx ? 'bg-[var(--primary)] text-white border-[var(--primary)] transform rotate-180' : ''}`}>
                    <ChevronDown size={16} />
                  </div>
                </button>
                <div 
                  className={`px-6 smooth-transition overflow-hidden ${openIndex === idx ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-main-muted font-medium pb-2 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
