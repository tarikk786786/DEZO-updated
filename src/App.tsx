import React, { useState, useEffect, Suspense, lazy } from 'react';
import { 
  Menu, X, Search, 
  ArrowUpRight, ArrowUp, Phone, MessageSquare, MapPin
} from 'lucide-react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { ThemeStyles } from './ThemeStyles';
import { portfolioData, categories } from './data';
import { 
  useIntersectionObserver, Reveal, AnimatedCounter, DynamicHeadline 
} from './components1';
import { 
  RotatingText, FallbackImage, HeroVisual 
} from './components2';
import {
  ServicesSection, AboutSection, ProcessSection, FaqSection,
  MissionTargetSection, WhyChooseUsSection, BlogSection, IndustriesTestimonialsSections
} from './components3';
import { AnimatedFavicon } from './AnimatedFavicon';

import { AboutUsPage } from './AboutUsPage';
import { NotFoundPage } from './NotFoundPage';

const WebDevPage = lazy(() => import('./pages').then(m => ({ default: m.WebDevPage })));
const BbsrWebDevPage = lazy(() => import('./pages').then(m => ({ default: m.BbsrWebDevPage })));
const DigitalMarketingPage = lazy(() => import('./pages').then(m => ({ default: m.DigitalMarketingPage })));
const SeoServicesPage = lazy(() => import('./pages').then(m => ({ default: m.SeoServicesPage })));
const MetaAdsPage = lazy(() => import('./pages').then(m => ({ default: m.MetaAdsPage })));
const GoogleAdsPage = lazy(() => import('./pages').then(m => ({ default: m.GoogleAdsPage })));
const EcommercePage = lazy(() => import('./pages').then(m => ({ default: m.EcommercePage })));
const LandingPagePage = lazy(() => import('./pages').then(m => ({ default: m.LandingPagePage })));
const BlogPage = lazy(() => import('./pages').then(m => ({ default: m.BlogPage })));
const ContactPage = lazy(() => import('./pages').then(m => ({ default: m.ContactPage })));
const PortfolioPage = lazy(() => import('./pages').then(m => ({ default: m.PortfolioPage })));

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [is404, setIs404] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', businessName: '', city: '', service: '', budget: '', message: ''
  });
  const [formErrors, setFormErrors] = useState<any>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 1024);
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    
    document.title = "Dezo | Web Development & Digital Marketing Agency India";
    
    if (window.location.pathname !== '/' && window.location.pathname !== '') {
      setIs404(true);
    }

    const timer1 = setTimeout(() => setIsFadingOut(true), 400);
    const timer2 = setTimeout(() => setIsLoading(false), 800);
    
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const handleFormChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (formErrors[e.target.name]) setFormErrors({ ...formErrors, [e.target.name]: '' });
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    const errors: any = {};
    if (!formData.name) errors.name = "Please fill in your name.";
    if (!formData.phone) errors.phone = "Please fill in your phone number.";
    if (!formData.email) errors.email = "Please fill in your email address.";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) errors.email = "Invalid email format.";
    if (!formData.service) errors.service = "Please select a service.";
    if (!formData.message) errors.message = "Please write a short message.";
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setIsSubmitting(true);
    
    // Fire the email request in the background
    fetch("https://formsubmit.co/ajax/princetarikislam@gmail.com", {
      method: "POST",
      headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      body: JSON.stringify({
          _subject: "New Lead from DEZO Website",
          _template: "table",
          Name: formData.name,
          Email: formData.email,
          Phone: formData.phone,
          "Business Name": formData.businessName || 'N/A',
          City: formData.city || 'N/A',
          Budget: formData.budget || 'N/A',
          Service: formData.service,
          Message: formData.message,
      })
    }).catch(err => console.error("Form submission error:", err));

    setIsSubmitting(false);
    setIsSubmitted(true);
    
    const whatsappMessage = `Hello Tarik, I am ${formData.name}. 
Email: ${formData.email}
Phone: ${formData.phone}
Business: ${formData.businessName || 'N/A'}
City: ${formData.city || 'N/A'}
Budget: ${formData.budget || 'N/A'}
Interested in: ${formData.service}
Message: ${formData.message}`;

    const whatsappUrl = `https://wa.me/919114411026?text=${encodeURIComponent(whatsappMessage)}`;
    
    window.open(whatsappUrl, '_blank');
    
    setTimeout(() => setIsSubmitted(false), 8000);
    setFormData({ name: '', email: '', phone: '', businessName: '', city: '', service: '', budget: '', message: '' });
  };

  const filteredPortfolio = portfolioData.filter(item => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const highlightedProjects = [
    "Great India Public School", "Yasana Beauty Rituals", "Shree Ayurved", 
    "Nilkanth Paints", "BB Signs New Zealand", "Jai Bhavani Travels", 
    "The Paan Luxe", "Lax-Mi"
  ].map(title => portfolioData.find(p => p.title === title)).filter(Boolean);

  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (e: any, item: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (item === 'About') {
      navigate('/about');
      window.scrollTo({top: 0});
      return; 
    } 
    const sectionId = item.toLowerCase().replace(' ', '-');
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogoClick = (e: any) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      window.scrollTo({top: 0});
    } else {
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
  };

  if (isLoading) {
    return (
      <div className={`fixed inset-0 z-[200] bg-main-dark flex flex-col items-center justify-center smooth-transition ${isFadingOut ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}>
        <ThemeStyles />
        <div className="relative flex flex-col items-center">
          <div className="w-32 h-[3px] bg-slate-800 mb-8 overflow-hidden rounded-full shadow-[0_0_20px_rgba(124,58,237,0.5)]">
             <div className="w-full h-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] origin-left animate-[scale-x_0.6s_ease-in-out_forwards]"></div>
          </div>
          <span className="logo-animated text-main-light font-black tracking-[0.4em] text-5xl mb-3">DEZO</span>
          <span className="text-[var(--accent)] font-bold tracking-[0.2em] text-[10px] uppercase">Digital Excellence</span>
        </div>
        <style dangerouslySetInnerHTML={{__html: `@keyframes scale-x { 0% { transform: scaleX(0); } 100% { transform: scaleX(1); } }`}} />
      </div>
    );
  }

  if (is404) {
    return <NotFoundPage />;
  }

  return (
    <div className="min-h-screen bg-main-light text-main-dark font-sans scroll-smooth">
      <ThemeStyles />
      <AnimatedFavicon />

      <div className="fixed bottom-6 right-6 z-[70] flex flex-col gap-3">
        <button aria-label="Scroll to Top" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className={`w-12 h-12 bg-panel-white border border-main-light rounded-full flex items-center justify-center text-main-muted shadow-lg smooth-transition hover:bg-main-light active:scale-95 ${scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
          <ArrowUp size={20} />
        </button>
      </div>

      <header className={`fixed top-0 left-0 right-0 z-[60] smooth-transition ${scrolled ? 'bg-[var(--bg-nav)] backdrop-blur-[var(--glass-blur)] py-3 shadow-sm border-b border-main-light' : 'bg-transparent py-4 lg:py-6'}`}>
        <div className="max-w-[90rem] mx-auto px-4 lg:px-8 flex justify-between items-center">
          <a href="#" className="flex items-center gap-2 z-[70] group" aria-label="Dezo Home" onClick={handleLogoClick}>
            <span className={`font-black text-3xl tracking-[0.2em] smooth-transition logo-animated ${scrolled || mobileMenuOpen ? '' : 'drop-shadow-lg'}`}>DEZO</span>
          </a>

          <nav className={`hidden lg:flex items-center space-x-7 ${scrolled ? '' : 'bg-white/5 border border-white/10 backdrop-blur-md px-8 py-3.5 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.2)]'} smooth-transition`}>
            {['Services', 'Latest Work', 'About', 'Process', 'FAQ'].map((item) => (
              <a 
                key={item} 
                href={item === 'About' ? '#' : `#${item.toLowerCase().replace(' ', '-')}`} 
                onClick={(e) => handleNavClick(e, item)}
                className={`text-xs font-bold uppercase tracking-[0.15em] smooth-transition ${scrolled || currentPage !== 'home' ? 'text-main-muted hover:text-[var(--primary)]' : 'text-[#F8FAFC] hover:text-[#06B6D4]'}`}
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className={`px-7 py-3 text-sm font-bold text-white rounded-full smooth-transition shadow-lg ${scrolled ? 'bg-[var(--primary)]' : 'bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] shadow-[0_10px_20px_var(--primary)]'} hover:-translate-y-0.5 active:scale-95`}>
              Start a Project
            </a>
          </div>

          <button aria-label="Toggle Mobile Menu" aria-expanded={mobileMenuOpen} className="lg:hidden p-2 z-[70] active:scale-90 smooth-transition" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} className="text-main-dark" /> : <Menu size={28} className={scrolled ? 'text-main-dark' : 'text-white'} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`fixed inset-0 bg-panel-white z-[65] lg:hidden flex flex-col justify-center px-6 smooth-transition transform ${mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>
          <div className="flex flex-col space-y-6 text-center mt-16">
            {['Services', 'Latest Work', 'About', 'Process', 'FAQ'].map((item, i) => (
               <a 
                 key={item} 
                 href={item === 'About' ? '#' : `#${item.toLowerCase().replace(' ', '-')}`} 
                 onClick={(e) => handleNavClick(e, item)} 
                 className="text-2xl font-black tracking-tight text-main-dark hover:text-[var(--primary)] smooth-transition" 
                 style={{ transitionDelay: `${i * 50}ms` }}
               >
                {item}
              </a>
            ))}
            <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="mt-8 px-8 py-4 bg-[var(--primary)] text-white text-lg font-bold rounded-full mx-auto inline-block active:scale-95 smooth-transition">
              Start a Project
            </a>
          </div>
        </div>
      </header>

      <ScrollToTop />
      <Suspense fallback={<div className="min-h-screen bg-main-dark flex items-center justify-center"><div className="w-12 h-12 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div></div>}>
      <Routes>
        <Route path="/" element={
          <main>
          {/* HERO SECTION */}
          <section id="home" className="relative pt-40 pb-24 lg:pt-56 lg:pb-40 overflow-hidden smooth-transition bg-main-dark" style={{ background: 'var(--hero-bg)' }}>
            {/* Abstract Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none smooth-transition" style={{ opacity: 'var(--glow-opacity)' }}>
              <div className="hero-grid opacity-30"></div>
              <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-[var(--primary)] opacity-20 rounded-full blur-[120px] animate-float"></div>
              <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[var(--accent)] opacity-[0.15] rounded-full blur-[120px] animate-float-delayed"></div>
            </div>
            <div className="max-w-[90rem] mx-auto px-4 lg:px-8 relative z-10 text-center lg:text-left">
              <div className="grid lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-6">
                  <Reveal direction="up" delay={100}>
                    <h1 className="clamp-h1 font-black text-main-light mb-6">
                      Web Development <br/>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]">&amp; Digital Marketing</span>
                      <span className="block text-3xl md:text-5xl mt-2 text-white">Agency in India.</span>
                    </h1>
                  </Reveal>
                  <Reveal direction="up" delay={200}>
                    <div className="mb-6">
                      <RotatingText />
                    </div>
                  </Reveal>
                  <Reveal direction="up" delay={300}>
                    <p className="text-sm sm:text-base md:text-lg text-[#E2E8F0] opacity-90 mb-8 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                      DEZO is a web development and digital marketing agency in India helping businesses build fast, modern, and conversion-focused websites. We create premium websites, ecommerce stores, landing pages, SEO systems, Meta Ads, and Google Ads strategies that turn visitors into customers.
                    </p>
                  </Reveal>
                  <Reveal direction="up" delay={500}>
                    <div className="flex justify-center lg:justify-start gap-4 mb-12 flex-wrap">
                      <a href="#contact" className="px-9 py-4 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white font-bold rounded-full hover:-translate-y-1 shadow-[0_10px_20px_rgba(124,58,237,0.4)] hover:shadow-[0_15px_30px_rgba(236,72,153,0.6)] smooth-transition active:scale-95 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 smooth-transition rounded-full"></div>
                        <span className="relative z-10">Get Free Website Audit</span>
                      </a>
                      <a href="#latest-work" className="px-9 py-4 text-white font-bold rounded-full hover:bg-white/10 border border-white/20 smooth-transition active:scale-95 group">
                        <span>Start Your Project</span>
                      </a>
                    </div>
                    <p className="text-xs text-white/50 font-bold uppercase tracking-widest mt-4">Web Development, SEO, Meta Ads, Google Ads & Ecommerce</p>
                  </Reveal>
                </div>
                <div className="lg:col-span-6 hidden lg:block h-[600px]">
                  {isDesktop && (
                    <Reveal direction="left" delay={400} className="w-full h-full">
                      <HeroVisual nightMode={false} />
                    </Reveal>
                  )}
                </div>
              </div>
            </div>
          </section>

      {/* STATS */}
      <section className="py-16 lg:py-20 bg-panel-white border-b border-main-light overflow-hidden">
        <div className="max-w-[90rem] mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4 md:gap-6 text-center divide-x divide-main-light">
            {[
              { num: 50, suffix: "+", label: "Websites Delivered" },
              { num: 10, suffix: "+", label: "Industries Served" },
              { num: 100, suffix: "%", label: "Pan-India Experience" },
              { num: 24, suffix: "/7", label: "Fast & Secure Sites" }
            ].map((stat, i) => (
              <Reveal key={i} delay={i * 100} direction="up">
                <div>
                  <div className="text-3xl lg:text-4xl font-black text-main-dark mb-1"><AnimatedCounter end={stat.num} suffix={stat.suffix} nightMode={false} /></div>
                  <div className="text-[10px] md:text-[11px] font-bold text-brand-primary uppercase tracking-widest leading-snug lg:leading-normal">{stat.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ServicesSection nightMode={false} />
      <AboutSection />
      <MissionTargetSection />
      <WhyChooseUsSection />
      <IndustriesTestimonialsSections />
      <ProcessSection />

      {/* PORTFOLIO */}
      <section id="latest-work" className="py-24 lg:py-32 bg-panel-white border-y border-main-light overflow-hidden">
        <div className="max-w-[90rem] mx-auto px-4 lg:px-8">
          <Reveal direction="up">
            <h2 className="clamp-h2 font-black text-main-dark mb-8 text-center tracking-tight">Latest Website Design & Digital Marketing Projects</h2>
          </Reveal>
          
          <Reveal direction="up" delay={200}>
            <div className="mb-8 space-y-5">
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-main-muted" size={18} />
                <input aria-label="Search project" type="text" placeholder="Search project..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-main-light border border-main-light rounded-full py-4 pl-12 pr-6 text-sm font-bold shadow-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary smooth-transition" />
              </div>
              <div className="flex overflow-x-auto hide-scrollbar gap-2.5 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
                {categories.map((cat, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveCategory(cat)}
                    className={`shrink-0 px-5 py-2.5 rounded-full text-[11px] font-bold tracking-widest uppercase border smooth-transition active:scale-95 ${
                      activeCategory === cat ? 'bg-main-dark text-main-light border-main-dark' : 'bg-main-light text-main-muted border-main-light hover:border-main-muted'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {filteredPortfolio.slice(0, 15).map((project: any, i: number) => (
              <Reveal direction="up" delay={i * 50} key={i}>
                <a href={project.url !== "#" ? project.url : '#'} target={project.url !== "#" ? "_blank" : "_self"} rel={project.url !== "#" ? "noopener noreferrer" : ""} className="block group h-full">
                  <article className="bg-main-light rounded-3xl p-6 border border-main-light h-full flex flex-col justify-between hover:border-brand-primary smooth-transition shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.15)] relative overflow-hidden group-hover:-translate-y-1 active:translate-y-0 active:scale-[0.98]">
                    <div>
                      <div className="text-[10px] font-bold text-brand-primary uppercase bg-panel-white px-3 py-1 rounded-full border border-main-light inline-block mb-4 shadow-sm">{project.category}</div>
                      <h4 className="text-xl md:text-2xl font-black text-main-dark group-hover:text-brand-primary mb-2 line-clamp-2">{project.title}</h4>
                      <div className="text-xs text-main-muted font-mono opacity-70 mb-4 truncate">{project.url.replace(/^https?:\/\/(www\.)?/, '')}</div>
                    </div>
                    <div className="mt-auto border-t border-main-light pt-4 flex justify-between items-center group-hover:border-brand-primary/20 smooth-transition">
                      <span className="text-xs font-bold uppercase tracking-widest text-main-dark group-hover:text-brand-primary">Visit Website</span>
                      <div className="w-8 h-8 rounded-full bg-panel-white flex items-center justify-center border border-main-light group-hover:border-brand-primary group-hover:bg-brand-primary smooth-transition shadow-sm">
                        <ArrowUpRight size={16} className="text-main-muted group-hover:text-white smooth-transition"/>
                      </div>
                    </div>
                  </article>
                </a>
              </Reveal>
            ))}
          </div>
          <Reveal direction="up" delay={200}>
            <div className="text-center mt-12 bg-[var(--primary)]/5 p-8 rounded-3xl border border-[var(--primary)]/20 shadow-sm">
              <p className="text-2xl font-black text-[var(--primary)] mb-2">+ 174 more projects in this category.</p>
              <p className="text-main-muted font-bold text-sm tracking-widest uppercase">Here 5k website project we have</p>
            </div>
          </Reveal>
        </div>
      </section>

      <FaqSection openIndex={openFaqIndex} setOpenIndex={setOpenFaqIndex} />
      <BlogSection />

      {/* CONTACT */}
      <section id="contact" className="py-24 lg:py-32 bg-main-light overflow-hidden">
        <div className="max-w-[90rem] mx-auto px-4 lg:px-8">
          <Reveal direction="scale">
            <div className="bg-panel-white rounded-[2.5rem] p-6 lg:p-16 border border-main-light shadow-xl relative overflow-hidden flex flex-col lg:flex-row gap-12 lg:gap-16">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 blur-[100px] rounded-full pointer-events-none"></div>
              
              <div className="lg:w-1/3 relative z-10 flex flex-col justify-start pt-4">
                  <h2 className="clamp-h2 font-black text-main-dark mb-4 tracking-tight">Start Growing With Dezo Today</h2>
                  <p className="text-main-muted mb-10 font-medium">Ready to take your digital presence to the next level? Reach out to us today.</p>
                  
                  <div className="space-y-8">
                    <div>
                      <h4 className="text-xs font-bold text-main-dark uppercase tracking-[0.2em] mb-2 opacity-50">CEO</h4>
                      <p className="text-xl font-black text-[var(--primary)]">Rohan Dinkar Sanap</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-main-dark uppercase tracking-[0.2em] mb-2 opacity-50">Director</h4>
                      <p className="text-xl font-black text-[var(--primary)]">Tarik Islam</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-main-dark uppercase tracking-[0.2em] mb-2 opacity-50">Contact Info</h4>
                      <div className="flex flex-col gap-2">
                        <a href="tel:+919114411026" className="text-main-dark font-bold hover:text-[var(--accent)] smooth-transition flex items-center gap-2">
                          <Phone size={16} /> +91 91144 11026
                        </a>
                        <a href="mailto:princetarikislam@gmail.com" className="text-main-dark font-bold hover:text-[var(--accent)] smooth-transition flex items-center gap-2">
                          <MessageSquare size={16} /> princetarikislam@gmail.com
                        </a>
                        <a href="mailto:contact@dezo.in" className="text-main-dark font-bold hover:text-[var(--accent)] smooth-transition flex items-center gap-2">
                          <MessageSquare size={16} /> contact@dezo.in
                        </a>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-main-dark uppercase tracking-[0.2em] mb-2 opacity-50">Address</h4>
                      <div className="flex items-start gap-2">
                        <MapPin size={18} className="text-main-dark mt-1 shrink-0" />
                        <p className="text-main-dark font-bold leading-relaxed">
                          Phase 2, Patia<br/>
                          Bhubaneswar, Odisha<br/>
                          751024, India
                        </p>
                      </div>
                    </div>
                  </div>
              </div>
              
              <div className="lg:w-2/3 relative z-10">
                <form className="space-y-5" onSubmit={handleFormSubmit}>
                {isSubmitted && <div className="bg-green-50 text-green-700 p-4 rounded-xl text-sm font-bold border border-green-200">Form submitted successfully! We'll get back to you shortly.</div>}
                {formErrors.general && <div className="bg-red-50 text-red-700 p-4 rounded-xl text-sm font-bold border border-red-200">{formErrors.general}</div>}
                
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="nameInput" className="text-[10px] font-bold uppercase tracking-widest mb-2 block text-main-dark relative">Name <span className="text-red-500">*</span></label>
                    <input id="nameInput" name="name" type="text" value={formData.name} onChange={handleFormChange} className="w-full bg-main-light border border-main-light rounded-xl px-5 min-h-[56px] text-sm text-main-dark focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 smooth-transition" placeholder="Enter your full name" />
                    {formErrors.name && <p className="text-red-500 text-xs font-bold mt-1.5">{formErrors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="emailInput" className="text-[10px] font-bold uppercase tracking-widest mb-2 block text-main-dark">Email <span className="text-red-500">*</span></label>
                    <input id="emailInput" name="email" type="email" value={formData.email} onChange={handleFormChange} className="w-full bg-main-light border border-main-light rounded-xl px-5 min-h-[56px] text-sm text-main-dark focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 smooth-transition" placeholder="Your email address" />
                    {formErrors.email && <p className="text-red-500 text-xs font-bold mt-1.5">{formErrors.email}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="phoneInput" className="text-[10px] font-bold uppercase tracking-widest mb-2 block text-main-dark">Phone <span className="text-red-500">*</span></label>
                    <input id="phoneInput" name="phone" type="tel" value={formData.phone} onChange={handleFormChange} className="w-full bg-main-light border border-main-light rounded-xl px-5 min-h-[56px] text-sm text-main-dark focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 smooth-transition" placeholder="Your phone number" />
                    {formErrors.phone && <p className="text-red-500 text-xs font-bold mt-1.5">{formErrors.phone}</p>}
                  </div>
                  <div>
                    <label htmlFor="businessInput" className="text-[10px] font-bold uppercase tracking-widest mb-2 block text-main-dark">Business Name</label>
                    <input id="businessInput" name="businessName" type="text" value={formData.businessName} onChange={handleFormChange} className="w-full bg-main-light border border-main-light rounded-xl px-5 min-h-[56px] text-sm text-main-dark focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 smooth-transition" placeholder="Optional" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="cityInput" className="text-[10px] font-bold uppercase tracking-widest mb-2 block text-main-dark">City</label>
                    <input id="cityInput" name="city" type="text" value={formData.city} onChange={handleFormChange} className="w-full bg-main-light border border-main-light rounded-xl px-5 min-h-[56px] text-sm text-main-dark focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 smooth-transition" placeholder="e.g. Bhubaneswar" />
                  </div>
                  <div>
                    <label htmlFor="budgetInput" className="text-[10px] font-bold uppercase tracking-widest mb-2 block text-main-dark">Estimated Budget</label>
                    <select id="budgetInput" name="budget" value={formData.budget} onChange={handleFormChange} className="w-full bg-main-light border border-main-light rounded-xl px-5 min-h-[56px] text-sm text-main-dark appearance-none focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 smooth-transition" style={{ backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}>
                      <option value="">Select Budget (Optional)</option>
                      <option value="Under ₹50,000">Under ₹50,000</option>
                      <option value="₹50,000 - ₹1,000,000">₹50,000 - ₹1,00,000</option>
                      <option value="₹1,00,000 - ₹2,00,000">₹1,00,000 - ₹2,00,000</option>
                      <option value="₹2,00,000+">₹2,00,000+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="serviceInput" className="text-[10px] font-bold uppercase tracking-widest mb-2 block text-main-dark">Service Needed <span className="text-red-500">*</span></label>
                  <select id="serviceInput" name="service" value={formData.service} onChange={handleFormChange} className="w-full bg-main-light border border-main-light rounded-xl px-5 min-h-[56px] text-sm text-main-dark appearance-none focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 smooth-transition" style={{ backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}>
                    <option value="">Select Service</option>
                    <option value="Website Development">Website Development</option>
                    <option value="Ecommerce">Ecommerce</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                  </select>
                  {formErrors.service && <p className="text-red-500 text-xs font-bold mt-1.5">{formErrors.service}</p>}
                </div>

                <div>
                  <label htmlFor="messageInput" className="text-[10px] font-bold uppercase tracking-widest mb-2 block text-main-dark">Message <span className="text-red-500">*</span></label>
                  <textarea id="messageInput" name="message" value={formData.message} onChange={handleFormChange} rows={4} className="w-full bg-main-light border border-main-light rounded-xl px-5 py-4 text-sm text-main-dark focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 smooth-transition resize-vertical" placeholder="Tell us about your project..."></textarea>
                  {formErrors.message && <p className="text-red-500 text-xs font-bold mt-1.5">{formErrors.message}</p>}
                </div>
                
                <div className="pt-2 flex flex-col sm:flex-row gap-4">
                  <button type="submit" disabled={isSubmitting} className="flex-1 w-full min-h-[60px] rounded-xl bg-gradient-to-r from-brand-primary to-[var(--accent)] text-white font-black text-lg tracking-wide hover:shadow-[0_15px_30px_rgba(37,99,235,0.3)] hover:-translate-y-1 active:translate-y-0 active:scale-95 smooth-transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:pointer-events-none">
                    {isSubmitting ? (
                      <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Sending...</>
                    ) : (
                      "Submit Request"
                    )}
                  </button>
                  <button type="button" onClick={() => window.open('https://wa.me/919114411026', '_blank')} className="flex-1 w-full min-h-[60px] rounded-xl bg-[#25D366] text-white font-black text-lg tracking-wide hover:shadow-[0_15px_30px_rgba(37,211,102,0.3)] hover:-translate-y-1 active:translate-y-0 active:scale-95 smooth-transition flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 1.833 6.368L.141 24l5.803-1.492A12 12 0 1 0 11.944 0zm0 22C6.918 22 2.802 18.237 2.451 13.315l1.637 1.636a8.878 8.878 0 0 1 10.9-10.9l1.636-1.636C12.186 2.012 11.968 2 11.944 2c-5.522 0-10 4.477-10 10 0 1.76.452 3.411 1.233 4.887L1.93 21.365l4.63-1.196A9.957 9.957 0 0 0 11.944 22c5.522 0 10-4.478 10-10s-4.478-10-10-10zm5.176-6.425c-.282-.141-1.669-.824-1.927-.919-.258-.094-.447-.141-.635.141-.188.282-.729.919-.894 1.107-.165.188-.33.211-.612.07-.282-.141-1.19-.439-2.268-1.4-8.37-1.135 7.42-1.925 7.185-1.442-.236.483-3.692.671-5.127.812-.141.141-.33.353-.33.353s-.188.165-.188.447c0 .282.188.635.423.824.236.188.236.47.236.753.047.893-1.011 2.585-2.067 2.679-1.011.094-1.364.094-1.904-.094s-.541-.47-.541-.894.236-1.011.682-1.364c.541-.423.705-.682.894-1.152.188-.47.094-.894-.047-1.176-.141-.282-.635-1.528-.87-2.092-.235-.564-.47-.487-.635-.494-.165-.008-.353-.008-.541-.008s-.494.07-.753.353c-.258.282-1.011.988-1.011 2.4 0 1.411 1.035 2.775 1.176 2.963.141.188 2.022 3.081 4.891 4.316.682.294 1.223.47 1.646.6.682.216 1.305.185 1.796.113.551-.082 1.669-.682 1.904-1.34s.235-1.223.165-1.341c-.07-.118-.258-.188-.541-.33z"/></svg>
                    Chat on WhatsApp
                  </button>
                </div>
              </form>
            </div>
          </div>
          </Reveal>
        </div>
      </section>
      </main>
        } />
        <Route path="/web-development-company-india" element={<WebDevPage />} />
        <Route path="/website-development-bhubaneswar" element={<BbsrWebDevPage />} />
        <Route path="/digital-marketing-agency-india" element={<DigitalMarketingPage />} />
        <Route path="/seo-services-india" element={<SeoServicesPage />} />
        <Route path="/meta-ads-agency-india" element={<MetaAdsPage />} />
        <Route path="/google-ads-agency-india" element={<GoogleAdsPage />} />
        <Route path="/ecommerce-website-development" element={<EcommercePage />} />
        <Route path="/landing-page-design-services" element={<LandingPagePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutUsPage onBack={() => { navigate('/'); window.scrollTo({top: 0}); }} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      </Suspense>
      
      {/* FOOTER */}
      <footer className="bg-main-dark pt-20 lg:pt-28 pb-10 border-t border-main-dark">
          <div className="max-w-[90rem] mx-auto px-4 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                  <div className="col-span-2 md:col-span-1">
                    <span className="font-black text-3xl tracking-[0.2em] text-main-light mb-4 block">DEZO</span>
                    <p className="text-main-muted text-sm font-medium mb-6">Premium web development and digital marketing agency delivering scalable solutions for brands in India.</p>
                    <div className="flex gap-4 text-main-light/70 text-sm font-bold">
                        <a href="#" aria-label="Facebook"><span className="hover:text-[var(--primary)] smooth-transition cursor-pointer">FB</span></a>
                        <a href="#" aria-label="Instagram"><span className="hover:text-[var(--primary)] smooth-transition cursor-pointer">IG</span></a>
                        <a href="#" aria-label="LinkedIn"><span className="hover:text-[var(--primary)] smooth-transition cursor-pointer">IN</span></a>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">Services</h4>
                    <ul className="space-y-3 text-sm text-main-muted font-medium">
                      <li><Link to="/web-development-company-india" className="hover:text-[var(--primary)] smooth-transition">Web Development</Link></li>
                      <li><Link to="/ecommerce-website-development" className="hover:text-[var(--primary)] smooth-transition">Ecommerce Solutions</Link></li>
                      <li><Link to="/landing-page-design-services" className="hover:text-[var(--primary)] smooth-transition">Landing Page Design</Link></li>
                      <li><Link to="/digital-marketing-agency-india" className="hover:text-[var(--primary)] smooth-transition">Digital Marketing</Link></li>
                      <li><Link to="/seo-services-india" className="hover:text-[var(--primary)] smooth-transition">SEO Services</Link></li>
                      <li><Link to="/meta-ads-agency-india" className="hover:text-[var(--primary)] smooth-transition">Meta Ads Management</Link></li>
                      <li><Link to="/google-ads-agency-india" className="hover:text-[var(--primary)] smooth-transition">Google Ads Management</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">Company</h4>
                    <ul className="space-y-3 text-sm text-main-muted font-medium">
                      <li><Link to="/about" className="hover:text-[var(--primary)] smooth-transition">About Us</Link></li>
                      <li><Link to="/portfolio" className="hover:text-[var(--primary)] smooth-transition">Portfolio</Link></li>
                      <li><Link to="/blog" className="hover:text-[var(--primary)] smooth-transition">Blog</Link></li>
                      <li><Link to="/contact" className="hover:text-[var(--primary)] smooth-transition">Contact Us</Link></li>
                      <li><Link to="/website-development-bhubaneswar" className="hover:text-[var(--primary)] smooth-transition">Web Dev in Bhubaneswar</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">Contact</h4>
                    <ul className="space-y-3 text-sm text-main-muted font-medium">
                      <li>+91 91144 11026</li>
                      <li>contact@dezo.in</li>
                      <li>Phase 2, Patia<br/>Bhubaneswar, Odisha<br/>751024, India</li>
                    </ul>
                  </div>
              </div>
              <div className="text-center text-xs font-bold text-main-light/40 border-t border-white/10 pt-8">
                  <p>© {new Date().getFullYear()} DEZO Agency. All rights reserved. Premium Digital Solutions in India.</p>
              </div>
          </div>
      </footer>
    </div>
  );
}
