import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RefreshCw, Share2, Copy, Linkedin, Twitter, ExternalLink, Activity, ArrowRight, Check } from 'lucide-react';
import { Reveal } from '../components1';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  category: string;
  url: string;
  publishedAt: string;
}

export const LiveTechRadar = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [countdown, setCountdown] = useState(30);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchNews = async () => {
    setLoading(true);
    try {
      // Calls netlify function, or falls back to local simulation if running in AI Studio preview where Netlify isn't present
      const response = await fetch('/.netlify/functions/tech-news').catch(() => null);
      if (response && response.ok) {
        const data = await response.json();
        setNews(data.articles);
      } else {
        // Fallback for dev environment without Netlify serverless functions running
        setNews(getFallbackData());
      }
    } catch (error) {
      setNews(getFallbackData());
    } finally {
      setLoading(false);
      setLastUpdated(new Date());
      setCountdown(30);
    }
  };

  useEffect(() => {
    fetchNews();

    // Frontend visual refresh interval (30 seconds)
    const refreshInterval = setInterval(() => {
      fetchNews();
    }, 30000);

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 30));
    }, 1000);

    return () => {
      clearInterval(refreshInterval);
      clearInterval(countdownInterval);
    };
  }, []);

  const handleCopyLink = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const shareToWhatsApp = (article: NewsItem) => {
    const text = `Thought you'd find this interesting: ${article.title} - ${article.url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const shareToLinkedIn = (article: NewsItem) => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(article.url)}`, '_blank');
  };

  const shareToTwitter = (article: NewsItem) => {
    const text = `Check out this web growth update: ${article.title}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(article.url)}`, '_blank');
  };

  return (
    <section className="py-24 relative overflow-hidden bg-main-dark border-y border-white/5" id="live-tech-radar">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-[var(--primary)]/10 blur-[120px] rounded-full mix-blend-screen"></div>
        <div className="absolute bottom-0 right-1/4 w-[30rem] h-[30rem] bg-[#00f2fe]/10 blur-[150px] rounded-full mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
      </div>

      <div className="max-w-[90rem] mx-auto px-4 lg:px-8 relative z-10">
        
        {/* Header Area */}
        <Reveal direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                <motion.div 
                  animate={{ opacity: [1, 0.3, 1] }} 
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Activity size={14} />
                </motion.div>
                Live Tech & Web Growth Radar
              </div>
              <h2 className="clamp-h2 font-black text-white leading-tight mb-4 tracking-tight">Stay Ahead of the Digital Curve.</h2>
              <p className="text-lg text-white/60 leading-relaxed font-medium">DEZO tracks the latest web development, SEO, AI, and digital growth updates so your business can move faster, rank better, and stay ahead of competitors.</p>
            </div>

            <div className="flex flex-col items-start md:items-end gap-2 md:shrink-0">
              <div className="text-xs text-white/40 font-mono font-medium flex items-center gap-2">
                <RefreshCw size={12} className={loading ? 'animate-spin' : ''} /> 
                {loading ? 'Refreshing...' : `Refreshes in ${countdown}s`}
              </div>
              <div className="text-xs text-white/40 font-mono">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Ticker / Trending Topics */}
        <Reveal direction="up" delay={100}>
          <div className="flex items-center gap-3 mb-10 overflow-x-auto pb-4 scrollbar-hide">
            <span className="text-xs font-bold text-white uppercase tracking-widest shrink-0 bg-white/10 px-3 py-1.5 rounded-md border border-white/10">Trending Now</span>
            {['Frontend Trends', 'Google Ranking', 'Meta Ads', 'Digital Marketing', 'AI Marketing Tools', 'Website Speed', 'Business Growth'].map((tag, i) => (
              <span key={i} className="text-sm font-medium text-white/60 bg-white/5 border border-white/5 px-4 py-1.5 rounded-full whitespace-nowrap hover:bg-white/10 smooth-transition cursor-default">
                #{tag.replace(/\s+/g, '')}
              </span>
            ))}
          </div>
        </Reveal>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {loading && news.length === 0 ? (
              // Loading Skeleton
              Array.from({ length: 3 }).map((_, i) => (
                <motion.div key={`skeleton-${i}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-white/5 border border-white/5 rounded-3xl p-8 h-full animate-pulse">
                  <div className="w-24 h-6 bg-white/10 rounded-full mb-6"></div>
                  <div className="w-full h-8 bg-white/10 rounded-lg mb-3"></div>
                  <div className="w-3/4 h-8 bg-white/10 rounded-lg mb-6"></div>
                  <div className="w-full h-4 bg-white/10 rounded-lg mb-2"></div>
                  <div className="w-5/6 h-4 bg-white/10 rounded-lg mb-8"></div>
                  <div className="w-32 h-4 bg-white/10 rounded-lg"></div>
                </motion.div>
              ))
            ) : (
              news.map((item, i) => (
                <motion.article 
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col h-full hover:border-[var(--primary)]/50 hover:bg-white/[0.08] smooth-transition group relative shadow-2xl overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)]/10 blur-[80px] rounded-full group-hover:bg-[var(--primary)]/30 smooth-transition pointer-events-none"></div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-6 gap-4">
                      <span className="text-[10px] font-bold text-white uppercase tracking-widest py-1 px-3 bg-white/10 rounded-full border border-white/10">
                        {item.category}
                      </span>
                      <time className="text-xs text-white/50 font-mono" dateTime={item.publishedAt}>
                        {new Date(item.publishedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </time>
                    </div>

                    <h3 className="text-xl md:text-2xl font-black text-white mb-4 line-clamp-3 group-hover:text-[var(--primary)] smooth-transition">
                      {item.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed mb-8 flex-grow">
                      {item.summary}
                    </p>

                    <div className="mt-auto border-t border-white/10 pt-6 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white opacity-80">{item.source}</span>
                      </div>
                      
                      {/* Interaction Actions */}
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleCopyLink(item.url, item.id)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 text-white/60 hover:text-white smooth-transition relative group/btn" aria-label="Copy link" title="Copy link">
                          {copiedId === item.id ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                        </button>
                        <button onClick={() => shareToWhatsApp(item)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#25D366]/20 text-white/60 hover:text-[#25D366] smooth-transition relative group/btn" aria-label="Share to WhatsApp" title="Share to WhatsApp">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 1.833 6.368L.141 24l5.803-1.492A12 12 0 1 0 11.944 0zm0 22C6.918 22 2.802 18.237 2.451 13.315l1.637 1.636a8.878 8.878 0 0 1 10.9-10.9l1.636-1.636C12.186 2.012 11.968 2 11.944 2c-5.522 0-10 4.477-10 10 0 1.76.452 3.411 1.233 4.887L1.93 21.365l4.63-1.196A9.957 9.957 0 0 0 11.944 22c5.522 0 10-4.478 10-10s-4.478-10-10-10zm5.176-6.425c-.282-.141-1.669-.824-1.927-.919-.258-.094-.447-.141-.635.141-.188.282-.729.919-.894 1.107-.165.188-.33.211-.612.07-.282-.141-1.19-.439-2.268-1.4-8.37-1.135 7.42-1.925 7.185-1.442-.236.483-3.692.671-5.127.812-.141.141-.33.353-.33.353s-.188.165-.188.447c0 .282.188.635.423.824.236.188.236.47.236.753.047.893-1.011 2.585-2.067 2.679-1.011.094-1.364.094-1.904-.094s-.541-.47-.541-.894.236-1.011.682-1.364c.541-.423.705-.682.894-1.152.188-.47.094-.894-.047-1.176-.141-.282-.635-1.528-.87-2.092-.235-.564-.47-.487-.635-.494-.165-.008-.353-.008-.541-.008s-.494.07-.753.353c-.258.282-1.011.988-1.011 2.4 0 1.411 1.035 2.775 1.176 2.963.141.188 2.022 3.081 4.891 4.316.682.294 1.223.47 1.646.6.682.216 1.305.185 1.796.113.551-.082 1.669-.682 1.904-1.34s.235-1.223.165-1.341c-.07-.118-.258-.188-.541-.33z"/></svg>
                        </button>
                        <button onClick={() => shareToLinkedIn(item)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#0A66C2]/20 text-white/60 hover:text-[#0A66C2] smooth-transition" aria-label="Share to LinkedIn" title="Share to LinkedIn">
                          <Linkedin size={14} />
                        </button>
                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="ml-2 pl-3 border-l border-white/10 font-bold text-xs uppercase tracking-widest text-[var(--primary)] hover:text-white smooth-transition flex items-center gap-1">
                          Read <ArrowRight size={14} />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Global CTAs */}
        <Reveal direction="up" delay={200}>
          <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-6">
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact" 
              className="px-8 py-4 bg-[var(--primary)] text-white font-black rounded-full shadow-[0_10px_30px_rgba(139,92,246,0.2)] hover:shadow-[0_15px_40px_rgba(139,92,246,0.4)] hover:bg-[var(--accent)] smooth-transition relative overflow-hidden group w-full md:w-auto text-center"
            >
              <span>Build Your Website With DEZO</span>
            </motion.a>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('https://wa.me/919114411026?text=Hi%20DEZO,%20I%20want%20free%20website%20growth%20advice.', '_blank')} 
              className="px-8 py-4 bg-[#25D366] text-white font-black rounded-full hover:shadow-[0_15px_30px_rgba(37,211,102,0.4)] smooth-transition flex items-center justify-center gap-2 w-full md:w-auto"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 1.833 6.368L.141 24l5.803-1.492A12 12 0 1 0 11.944 0zm0 22C6.918 22 2.802 18.237 2.451 13.315l1.637 1.636a8.878 8.878 0 0 1 10.9-10.9l1.636-1.636C12.186 2.012 11.968 2 11.944 2c-5.522 0-10 4.477-10 10 0 1.76.452 3.411 1.233 4.887L1.93 21.365l4.63-1.196A9.957 9.957 0 0 0 11.944 22c5.522 0 10-4.478 10-10s-4.478-10-10-10zm5.176-6.425c-.282-.141-1.669-.824-1.927-.919-.258-.094-.447-.141-.635.141-.188.282-.729.919-.894 1.107-.165.188-.33.211-.612.07-.282-.141-1.19-.439-2.268-1.4-8.37-1.135 7.42-1.925 7.185-1.442-.236.483-3.692.671-5.127.812-.141.141-.33.353-.33.353s-.188.165-.188.447c0 .282.188.635.423.824.236.188.236.47.236.753.047.893-1.011 2.585-2.067 2.679-1.011.094-1.364.094-1.904-.094s-.541-.47-.541-.894.236-1.011.682-1.364c.541-.423.705-.682.894-1.152.188-.47.094-.894-.047-1.176-.141-.282-.635-1.528-.87-2.092-.235-.564-.47-.487-.635-.494-.165-.008-.353-.008-.541-.008s-.494.07-.753.353c-.258.282-1.011.988-1.011 2.4 0 1.411 1.035 2.775 1.176 2.963.141.188 2.022 3.081 4.891 4.316.682.294 1.223.47 1.646.6.682.216 1.305.185 1.796.113.551-.082 1.669-.682 1.904-1.34s.235-1.223.165-1.341c-.07-.118-.258-.188-.541-.33z"/></svg>
              Get Free Website Growth Advice
            </motion.button>
          </div>
        </Reveal>
      </div>

    </section>
  );
};

// Fallback data helper
function getFallbackData(): NewsItem[] {
  return [
    {
      id: "f1",
      title: "React 19 RC Features Unveiled: What You Need to Know",
      summary: "The latest release candidate for React 19 brings powerful new hooks, compiler optimizations, and concurrent rendering improvements that will make enterprise web apps significantly faster.",
      source: "Web Dev Weekly",
      category: "Frontend Trends",
      url: "https://dezo.in/",
      publishedAt: new Date().toISOString(),
    },
    {
      id: "f2",
      title: "Google's Latest Core Update: Impact on Search Rankings in 2024",
      summary: "The newest Google core update heavily emphasizes original expert-authored content and penalizes high-scale low-value AI generated pages. Essential reading for your content strategy.",
      source: "Search Engine Radar",
      category: "Google Ranking",
      url: "https://dezo.in/",
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: "f3",
      title: "Meta Ads Introduces New Contextual AI Optimization",
      summary: "Advertisers can now let Meta's AI dynamically optimize ad formats and creative placements across Reels and Stories, reportedly lowering CPA by up to 20% in recent beta tests.",
      source: "Marketing Times",
      category: "Meta Ads",
      url: "https://dezo.in/",
      publishedAt: new Date(Date.now() - 7200000).toISOString(),
    },
    {
      id: "f4",
      title: "The Ultimate Guide to Improving Core Web Vitals (INP)",
      summary: "INP (Interaction to Next Paint) has fully replaced FID. Here is how modern web development agencies are tweaking their React and Next.js architecture for near-zero delay.",
      source: "Frontend Masters",
      category: "Website Speed",
      url: "https://dezo.in/",
      publishedAt: new Date(Date.now() - 14400000).toISOString(),
    },
    {
      id: "f5",
      title: "Startups Leveraging Next-Gen Open Source AI Models",
      summary: "How seed-stage startups are outsourcing data processing and customer support workflows to new powerful open-source AI models, cutting operational overhead significantly.",
      source: "Startup Pulse",
      category: "Business Growth",
      url: "https://dezo.in/",
      publishedAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: "f6",
      title: "Essential SEO Strategies for E-commerce Platforms",
      summary: "A rise in sophisticated multi-channel marketing means setting up robust SEO strategies and optimizing product pages is non-negotiable for scaling e-commerce businesses.",
      source: "SEO Daily",
      category: "SEO Updates",
      url: "https://dezo.in/",
      publishedAt: new Date(Date.now() - 172800000).toISOString(),
    }
  ];
}
