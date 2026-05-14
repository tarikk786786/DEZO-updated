import React, { useState, Suspense, lazy } from 'react';
import { motion } from 'motion/react';
import { Reveal } from '../components1';
import { Calculator, Target, Search, Megaphone, Type, PenTool, CheckCircle, BarChart, Instagram } from 'lucide-react';
import { ToolModal } from './ui/ToolModal';

const WebsiteCostCalculator = lazy(() => import('./tools/WebsiteCostCalculator').then(m => ({ default: m.WebsiteCostCalculator })));
const SEOMetaGenerator = lazy(() => import('./tools/SEOMetaGenerator').then(m => ({ default: m.SEOMetaGenerator })));
const WebsiteAuditTool = lazy(() => import('./tools/WebsiteAuditTool').then(m => ({ default: m.WebsiteAuditTool })));
const MetaAdsCopyGenerator = lazy(() => import('./tools/MetaAdsCopyGenerator').then(m => ({ default: m.MetaAdsCopyGenerator })));
const LandingPageHeadlineGenerator = lazy(() => import('./tools/LandingPageHeadlineGenerator').then(m => ({ default: m.LandingPageHeadlineGenerator })));
const BlogIdeaGenerator = lazy(() => import('./tools/BlogIdeaGenerator').then(m => ({ default: m.BlogIdeaGenerator })));
const BusinessNameGenerator = lazy(() => import('./tools/BusinessNameGenerator').then(m => ({ default: m.BusinessNameGenerator })));
const InstagramBioGenerator = lazy(() => import('./tools/InstagramBioGenerator').then(m => ({ default: m.InstagramBioGenerator })));
const GoogleRankingChecklist = lazy(() => import('./tools/GoogleRankingChecklist').then(m => ({ default: m.GoogleRankingChecklist })));
const MetaAdsBudgetCalculator = lazy(() => import('./tools/MetaAdsBudgetCalculator').then(m => ({ default: m.MetaAdsBudgetCalculator })));

const toolsList = [
  {
    id: 'cost-calculator',
    title: 'Website Cost Calculator',
    description: 'Get an instant, reliable estimate for your next premium website.',
    icon: <Calculator size={24} className="text-[#10B981]" />,
    component: <WebsiteCostCalculator />
  },
  {
    id: 'ads-budget',
    title: 'Meta Ads Budget Planner',
    description: 'Calculate projected clicks, conversions, and CPA for your ad campaigns.',
    icon: <BarChart size={24} className="text-[var(--accent)]" />,
    component: <MetaAdsBudgetCalculator />
  },
  {
    id: 'ads-copy',
    title: 'Meta Ads Copy Generator',
    description: 'Write smart, direct ad copies for Facebook and Instagram instantly.',
    icon: <Megaphone size={24} className="text-[#EC4899]" />,
    component: <MetaAdsCopyGenerator />
  },
  {
    id: 'lp-headline',
    title: 'Landing Page Headliner',
    description: 'Generate aggressive, hard-hitting headlines that convert visitors into leads.',
    icon: <Type size={24} className="text-[var(--primary)]" />,
    component: <LandingPageHeadlineGenerator />
  },
  {
    id: 'seo-generator',
    title: 'SEO Meta Generator',
    description: 'Generate optimized titles, descriptions, and keywords for better ranking.',
    icon: <Target size={24} className="text-[#F59E0B]" />,
    component: <SEOMetaGenerator />
  },
  {
    id: 'google-check',
    title: 'Google Ranking Checklist',
    description: 'The exact 10-point technical checklist to ensure Google loves your website.',
    icon: <CheckCircle size={24} className="text-[#10B981]" />,
    component: <GoogleRankingChecklist />
  },
  {
    id: 'website-audit',
    title: 'Website Strength Audit',
    description: 'Check your site health, speed, and conversion strategy privately.',
    icon: <Search size={24} className="text-[var(--primary)]" />,
    component: <WebsiteAuditTool />
  },
  {
    id: 'blog-idea',
    title: 'Blog Content Ideas',
    description: 'Get fresh, SEO-friendly content topics related to your main business niche.',
    icon: <PenTool size={24} className="text-[var(--accent)]" />,
    component: <BlogIdeaGenerator />
  },
  {
    id: 'biz-name',
    title: 'Business Name Ideas',
    description: 'Generate professional, premium business names easily.',
    icon: <Type size={24} className="text-[#F59E0B]" />,
    component: <BusinessNameGenerator />
  },
  {
    id: 'insta-bio',
    title: 'Instagram Bio Builder',
    description: 'Create clean, conversion-focused Instagram profiles that look established.',
    icon: <Instagram size={24} className="text-[#EC4899]" />,
    component: <InstagramBioGenerator />
  }
];

export const AIGrowthTools = () => {
  const [activeTool, setActiveTool] = useState<any>(null);

  return (
    <section id="free-tools" className="py-24 lg:py-32 bg-main-dark border-y border-main-light overflow-hidden relative">
      <div className="absolute top-0 right-0 w-full h-full bg-[url('https://transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
      
      <div className="max-w-[90rem] mx-auto px-4 lg:px-8 relative z-10">
        <Reveal direction="up">
          <div className="text-center mb-16">
            <h2 className="clamp-h2 font-black text-white tracking-tight mb-4">Free Business Growth Tools</h2>
            <p className="text-main-muted max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              Use DEZO's free tools to calculate costs, plan your ad budgets, and generate converting copy directly inside our website.
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
          {toolsList.map((tool, i) => (
            <Reveal key={tool.id} delay={i * 50} direction="up">
              <motion.div 
                whileHover={{ y: -5 }}
                onClick={() => setActiveTool(tool)}
                className="bg-panel-white border border-main-light p-6 rounded-2xl cursor-pointer hover:border-[var(--primary)]/50 smooth-transition h-full flex flex-col group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 to-transparent opacity-0 group-hover:opacity-100 smooth-transition"></div>
                <div className="w-12 h-12 bg-black/30 rounded-xl flex items-center justify-center mb-5 relative z-10 border border-white/5">
                  {tool.icon}
                </div>
                <h3 className="text-lg font-black text-white mb-2 relative z-10">{tool.title}</h3>
                <p className="text-xs text-main-muted leading-relaxed relative z-10 mb-4">{tool.description}</p>
                <div className="mt-auto flex items-center text-[10px] font-bold text-[var(--primary)] uppercase tracking-widest relative z-10">
                  Open Tool <span className="ml-2 group-hover:translate-x-1 smooth-transition">→</span>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>

      <ToolModal 
        isOpen={!!activeTool} 
        onClose={() => setActiveTool(null)}
        title={activeTool?.title}
      >
        <Suspense fallback={<div className="p-8 text-center text-sm font-bold opacity-50 text-white">Loading Tool...</div>}>
          {activeTool?.component}
        </Suspense>
      </ToolModal>
    </section>
  );
};

