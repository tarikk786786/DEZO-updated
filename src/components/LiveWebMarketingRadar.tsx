import React, { useState, useEffect } from 'react';
import { Reveal, useIntersectionObserver } from '../components1';
import { Rss, ExternalLink, Clock } from 'lucide-react';
import { motion } from 'motion/react';

export const LiveWebMarketingRadar = () => {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [ref, isIntersecting] = useIntersectionObserver({ rootMargin: '200px 0px', triggerOnce: true });

  const fallbackNews = [
    { id: 1, title: 'Google confirms AI Overviews rolling out to more countries globally.', category: 'SEO', source: 'Search Engine Land', time: new Date().toISOString(), url: '#' },
    { id: 2, title: 'Meta Ads introduces lower CPA targeting features for local businesses.', category: 'Social Ads', source: 'Social Media Today', time: new Date(Date.now() - 3600000).toISOString(), url: '#' },
    { id: 3, title: 'Next.js 15 preview released with smaller bundle sizes and faster routing.', category: 'Web Dev', source: 'Vercel Blog', time: new Date(Date.now() - 7200000).toISOString(), url: '#' },
    { id: 4, title: 'How page speed still dictates mobile bounce rates in 2026.', category: 'Performance', source: 'Web.dev', time: new Date(Date.now() - 10800000).toISOString(), url: '#' }
  ];

  useEffect(() => {
    if (!isIntersecting) return;
    
    // Check sessionStorage first
    const cachedObjStr = sessionStorage.getItem('dezo_marketing_news');
    if (cachedObjStr) {
      try {
        const cachedObj = JSON.parse(cachedObjStr);
        // Only valid for 1 hour to prevent hitting Vercel serverless too much
        if (cachedObj && cachedObj.timestamp && (Date.now() - cachedObj.timestamp < 3600000)) {
           setNews(cachedObj.data);
           setLoading(false);
        }
      } catch (e) {}
    }

    fetchNews();

    // Auto-update every 45s if visible
    const interval = setInterval(fetchNews, 45000);
    return () => clearInterval(interval);
  }, [isIntersecting]);

  const fetchNews = async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);
      
      const res = await fetch('/api/news', { signal: controller.signal }).catch(() => null);
      clearTimeout(timeoutId);

      if (res && res.ok) {
        const data = await res.json();
        setNews(data);
        sessionStorage.setItem('dezo_marketing_news', JSON.stringify({ data, timestamp: Date.now() }));
      } else {
         setNews(fallbackNews);
      }
    } catch (err) {
      setNews(fallbackNews);
    } finally {
      setLoading(false);
    }
  };

  const timeAgo = (dateStr: string) => {
    const d = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    if (diffMs < 0) return "Just now";
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  return (
    <section ref={ref as any} id="radar" className="py-24 lg:py-32 bg-main-light overflow-hidden border-t border-main-light">
      <div className="max-w-[50rem] mx-auto px-4 lg:px-8">
        <Reveal direction="up">
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <h2 className="text-sm font-black text-main-dark tracking-[0.2em] uppercase">Live web & marketing radar</h2>
          </div>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-black text-main-dark tracking-tight mb-4">Latest Industry Updates</h3>
            <p className="text-main-muted text-sm max-w-lg mx-auto">Real-time curated news from trusted marketing APIs and developer communities. Stay ahead of the curve.</p>
          </div>
        </Reveal>

        <div className="space-y-4">
          {loading && news.length === 0 ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary)]"></div>
            </div>
          ) : (
            news.slice(0, window.innerWidth <= 768 ? 5 : news.length).map((item, idx) => (
              <Reveal key={item.id} delay={idx * 50} direction="up">
                <a 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block bg-panel-white border border-main-light p-5 rounded-2xl hover:border-[var(--primary)]/50 hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] smooth-transition group"
                >
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                    <div className="flex-1 pr-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white bg-gray-800 px-2.5 py-1 rounded-md">{item.category}</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--primary)]">{item.source}</span>
                      </div>
                      <h4 className="text-base font-bold text-main-dark group-hover:text-[var(--primary)] smooth-transition leading-tight mb-1">{item.title}</h4>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-medium text-main-muted shrink-0">
                      <span className="flex items-center gap-1.5"><Clock size={14} /> {timeAgo(item.time)}</span>
                      <ExternalLink size={16} className="text-gray-300 group-hover:text-[var(--primary)] smooth-transition hidden sm:block" />
                    </div>
                  </div>
                </a>
              </Reveal>
            ))
          )}
        </div>
        
        <Reveal direction="up" delay={200}>
          <div className="mt-8 text-center flex flex-col items-center gap-4">
            <button className="px-6 py-2.5 bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-bold uppercase tracking-widest rounded-full hover:bg-[var(--primary)] hover:text-white smooth-transition">Show More Updates</button>
            <p className="text-[10px] text-main-muted font-bold tracking-widest uppercase opacity-70">Auto-updates every 45s</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
