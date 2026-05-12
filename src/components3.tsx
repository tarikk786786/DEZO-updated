import React from 'react';
import { 
  Megaphone, LayoutTemplate, Target, CheckCircle2, 
  ArrowRight, Users, ChevronDown, Check, Zap, Star, ShieldCheck
} from 'lucide-react';
import { Reveal } from './components1';
import { FallbackImage } from './components2';

export const ServicesSection = ({ nightMode }: { nightMode?: boolean }) => {
  const services = [
    {
      title: "Web Development Services",
      description: "Custom-coded, lightning-fast, and highly converting websites tailored to your brand's unique needs.",
      icon: <LayoutTemplate size={32} />,
      features: ["React/Next.js Architecture", "Mobile First Design", "Lighthouse Optimized", "CMS Integration"]
    },
    {
      title: "Ecommerce Website Development",
      description: "Scalable online stores with secure checkout, inventory management, and high conversion rates.",
      icon: <LayoutTemplate size={32} />,
      features: ["Shopify & Custom", "Secure Gateway", "Inventory Sync", "Optimized Cart"]
    },
    {
      title: "Landing Page Design",
      description: "High-converting landing pages built for speed, psychological triggers, and ad campaign success.",
      icon: <LayoutTemplate size={32} />,
      features: ["A/B Testing", "Fast Loading", "Conversion UX", "Ad Alignment"]
    },
    {
      title: "SEO Services",
      description: "Data-driven SEO strategies that put you on the first page of Google and keep you there.",
      icon: <Target size={32} />,
      features: ["Technical SEO", "Content Strategy", "Link Building", "Local SEO"]
    },
    {
      title: "Meta Ads Management",
      description: "High-ROI Facebook and Instagram ad campaigns designed to generate quality leads and sales.",
      icon: <Megaphone size={32} />,
      features: ["Creative Design", "Audience Targeting", "Retargeting Funnels", "Pixel Setup"]
    },
    {
      title: "Google Ads Management",
      description: "Capture high-intent search traffic with optimized Search, Display, and Performance Max campaigns.",
      icon: <Megaphone size={32} />,
      features: ["Search Network", "Shopping Ads", "Keyword Strategy", "CPA Optimization"]
    }
  ];

  return (
    <section id="services" className="py-24 lg:py-32 bg-main-dark border-y border-main-dark overflow-hidden">
      <div className="max-w-[90rem] mx-auto px-4 lg:px-8">
        <Reveal direction="up">
          <div className="text-center mb-16">
            <h2 className="clamp-h2 font-black text-main-light mb-4 tracking-tight">Premium Website Development That Converts</h2>
            <p className="text-main-muted max-w-2xl mx-auto font-medium">We deliver end-to-end digital solutions that drive measurable growth.</p>
          </div>
        </Reveal>
        
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, idx) => (
            <Reveal key={idx} delay={idx * 150} direction="up" className="h-full">
              <div className="bg-main-light rounded-3xl p-8 lg:p-10 border border-main-light h-full hover:border-brand-primary smooth-transition flex flex-col group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 blur-3xl rounded-full pointer-events-none group-hover:bg-brand-primary/10 smooth-transition"></div>
                <div className="w-16 h-16 rounded-2xl bg-panel-white flex items-center justify-center text-brand-primary mb-8 shadow-sm border border-main-light group-hover:scale-110 smooth-transition">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-black text-main-dark mb-4">{service.title}</h3>
                <p className="text-main-muted leading-relaxed mb-8 flex-grow">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-3 text-sm font-bold text-main-dark">
                      <div className="w-5 h-5 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
                        <Check size={12} strokeWidth={3} />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
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
            <div className="bg-panel-white p-10 rounded-[2rem] border border-main-light h-full group hover:shadow-[0_20px_40px_var(--primary)_0.1] smooth-transition relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)] opacity-[0.05] group-hover:opacity-20 blur-3xl rounded-full smooth-transition"></div>
               <div className="w-16 h-16 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full flex items-center justify-center mb-6">
                 <Target size={32} />
               </div>
               <h3 className="text-2xl font-black text-main-dark mb-4">Local Business Growth</h3>
               <p className="text-main-muted leading-relaxed">
                 We aim to become the leading digital partner for forward-thinking enterprises, delivering web solutions that don't just look good but perform exceptionally. Our target is scaling businesses through data-driven digital architecture and establishing long-term partnerships.
               </p>
            </div>
          </Reveal>
          <Reveal direction="up" delay={200}>
            <div className="bg-panel-white p-10 rounded-[2rem] border border-main-light h-full group hover:shadow-[0_20px_40px_var(--accent)_0.1] smooth-transition relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent)] opacity-[0.05] group-hover:opacity-20 blur-3xl rounded-full smooth-transition"></div>
               <div className="w-16 h-16 bg-[var(--accent)]/10 text-[var(--accent)] rounded-full flex items-center justify-center mb-6">
                 <Star size={32} />
               </div>
               <h3 className="text-2xl font-black text-main-dark mb-4">Transparent Delivery and Support</h3>
               <p className="text-main-muted leading-relaxed">
                 To shatter the barriers of digital entry by providing top-tier, enterprise-grade development and design at accessible price points. We believe every business deserves a premium digital presence, and we are here to make that a reality through innovative engineering.
               </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export const WhyChooseUsSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-main-dark relative overflow-hidden" style={{ background: 'var(--hero-bg)' }}>
      <div className="max-w-[90rem] mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <Reveal direction="up">
            <h2 className="clamp-h2 font-black text-white mb-6">Why Businesses Choose DEZO</h2>
            <p className="text-main-muted text-lg font-medium">Premium quality, fast performance, transparent process, SEO-ready structure, and reliable support after delivery.</p>
          </Reveal>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              title: "Why We Are Different",
              desc: "We don't use bloatware or slow builders. Every line of code is structured using modern frameworks (React, Next.js). We optimize for Core Web Vitals, ensuring fast performance, resulting in better SEO and conversions.",
              icon: <ShieldCheck size={28} />
            },
            {
              title: "Transparent & Efficient",
              desc: "By utilizing streamlined agile processes, strategic development workflows, and an efficient tech-stack architecture, we reduce overhead and deliver premium digital assets that genuinely grow your business.",
              icon: <Star size={28} />
            },
            {
              title: "Our Commitment",
              desc: "Our commitment is simple: We deliver pixel-perfect, highly scalable web applications and data-driven marketing campaigns. We prioritize transparent communication and long-term partnerships over quick wins.",
              icon: <Target size={28} />
            }
          ].map((item, i) => (
            <Reveal key={i} direction="up" delay={i * 100}>
              <div className="bg-white/5 backdrop-blur-md p-8 rounded-[2rem] border border-white/10 h-full hover:bg-white/10 smooth-transition relative overflow-hidden group">
                 <div className="w-14 h-14 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] rounded-full flex items-center justify-center text-white mb-6 shadow-lg shadow-[var(--primary)]/30 group-hover:scale-110 smooth-transition">
                   {item.icon}
                 </div>
                 <h3 className="text-xl font-black text-white mb-4">{item.title}</h3>
                 <p className="text-main-muted leading-relaxed">{item.desc}</p>
                 
                 <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[var(--primary)] opacity-10 blur-3xl rounded-full group-hover:opacity-30 smooth-transition"></div>
              </div>
            </Reveal>
          ))}
        </div>
        
        <Reveal direction="up" delay={300}>
          <div className="bg-gradient-to-r from-[var(--primary)]/20 to-[var(--accent)]/20 border border-[var(--primary)]/30 rounded-[2rem] p-10 text-center relative overflow-hidden">
            <h3 className="text-2xl font-black text-white mb-4">Dedicated Support After Delivery</h3>
            <p className="text-main-muted max-w-2xl mx-auto font-medium">
              We stand by our work. Our relationship doesn't end at launch; we provide continuous technical support, SEO monitoring, and infrastructure optimizations to ensure your long-term success.
            </p>
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
                author: "Rohan K.",
                role: "B2B SaaS CEO"
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
              <div className="text-xs font-bold text-[var(--primary)] tracking-[0.2em] uppercase mb-4">Our Journal</div>
              <h2 className="clamp-h2 font-black text-main-dark leading-tight">Latest Website Design & Digital Marketing Projects</h2>
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

export const FaqSection = ({ openIndex, setOpenIndex }: { openIndex: number | null, setOpenIndex: (i: number | null) => void }) => {
  const faqs = [
    { q: "What does Dezo do?", a: "Dezo is a web development and digital marketing agency in India. We help businesses create fast, mobile-friendly websites, ecommerce stores, and high-converting landing pages. We also provide SEO, Meta Ads, and Google Ads management." },
    { q: "Does Dezo build ecommerce websites?", a: "Yes, we specialize in building fast and scalable ecommerce websites that convert visitors into buyers, featuring secure payment gateways and conversion-focused UI/UX." },
    { q: "Does Dezo provide SEO services?", a: "Yes, we implement technical SEO, on-page optimization, and content strategies to help businesses grow their organic search rankings consistently." },
    { q: "Can Dezo run Meta Ads and Google Ads?", a: "Absolutely. Our performance marketing team builds data-driven Meta Ads and Google Ads campaigns designed to generate quality leads and maximize your ROI." },
    { q: "Is Dezo suitable for small businesses in India?", a: "Yes, we provide affordable, high-quality digital growth solutions tailored to both local small businesses and large enterprises across India." }
  ];

  return (
    <section id="faq" className="py-24 lg:py-32 bg-panel-white overflow-hidden border-t border-main-light">
      <div className="max-w-[50rem] mx-auto px-4 lg:px-8">
        <Reveal direction="up">
          <div className="text-center mb-16">
            <h2 className="clamp-h2 font-black text-main-dark tracking-tight">Frequently Asked Questions About Dezo</h2>
          </div>
        </Reveal>
        
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <Reveal key={idx} delay={idx * 100} direction="up">
              <div className="border border-main-light rounded-2xl bg-main-light overflow-hidden smooth-transition hover:border-brand-primary/50 overflow-hidden">
                <button 
                  className="w-full px-6 py-5 flex items-center justify-between font-bold text-left focus:outline-none"
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                >
                  <span className="text-lg text-main-dark pr-8">{faq.q}</span>
                  <div className={`w-8 h-8 rounded-full bg-panel-white flex items-center justify-center border border-main-light shrink-0 text-main-dark smooth-transition ${openIndex === idx ? 'bg-brand-primary text-white border-brand-primary transform rotate-180' : ''}`}>
                    <ChevronDown size={16} />
                  </div>
                </button>
                <div 
                  className={`px-6 smooth-transition overflow-hidden ${openIndex === idx ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-main-muted">{faq.a}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
