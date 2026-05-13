import React from 'react';
import { motion } from 'motion/react';
import { Zap, Search, Calculator, Type, Hash, CheckCircle, Smartphone } from 'lucide-react';
import { Reveal } from '../components1';

const tools = [
  {
    name: 'Free Website Speed Checker',
    icon: <Zap size={24} />,
    benefit: 'Find out why your website is slow and how to fix it.',
    whatsappMsg: 'Hi DEZO, I want to check my website speed.'
  },
  {
    name: 'Free SEO Audit Checker',
    icon: <Search size={24} />,
    benefit: 'Get a list of exactly what is stopping your Google ranking.',
    whatsappMsg: 'Hi DEZO, I want a free SEO audit for my website.'
  },
  {
    name: 'Website Cost Calculator',
    icon: <Calculator size={24} />,
    benefit: 'Calculate the exact budget needed for your new premium website.',
    whatsappMsg: 'Hi DEZO, I want to calculate my website cost.'
  },
  {
    name: 'Meta Ads Budget Calculator',
    icon: <Calculator size={24} />,
    benefit: 'Plan your Facebook & Instagram ads budget for maximum ROI.',
    whatsappMsg: 'Hi DEZO, I need help with my Meta Ads budget.'
  },
  {
    name: 'Landing Page Headline Generator',
    icon: <Type size={24} />,
    benefit: 'Get high-converting headline ideas for your ad campaigns.',
    whatsappMsg: 'Hi DEZO, I need ideas for my landing page.'
  },
  {
    name: 'Instagram Bio Generator for Business',
    icon: <Hash size={24} />,
    benefit: 'Create a professional, trust-building Instagram bio instantly.',
    whatsappMsg: 'Hi DEZO, I need help optimizing my Instagram profile.'
  },
  {
    name: 'Business Name Generator',
    icon: <Type size={24} />,
    benefit: 'Find the perfect, memorable name for your new brand.',
    whatsappMsg: 'Hi DEZO, I need ideas for my new business name.'
  },
  {
    name: 'Google Ranking Checklist',
    icon: <CheckCircle size={24} />,
    benefit: 'Download our 25-point checklist to rank higher locally.',
    whatsappMsg: 'Hi DEZO, please send me the Google Ranking Checklist.'
  }
];

export const FreeToolsSection = () => {
  return (
    <section className="py-24 bg-main-dark relative overflow-hidden" id="free-tools">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--primary)]/10 blur-[150px] rounded-full mix-blend-screen"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--accent)]/10 blur-[150px] rounded-full mix-blend-screen"></div>
      </div>
      
      <div className="max-w-[90rem] mx-auto px-4 lg:px-8 relative z-10">
        <Reveal direction="up">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="clamp-h2 font-black text-white mb-6 tracking-tight">
              Free Growth Tools <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]">For Your Business</span>
            </h2>
            <p className="text-lg text-white/60 font-medium">Use our free agency-grade tools to find your next growth opportunity. Click any tool to get your free report via WhatsApp instantly.</p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, i) => (
            <Reveal key={tool.name} direction="up" delay={i * 100}>
              <motion.a
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={`https://wa.me/919114411026?text=${encodeURIComponent(tool.whatsappMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-[var(--primary)]/50 hover:bg-white/[0.08] smooth-transition group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 to-transparent opacity-0 group-hover:opacity-100 smooth-transition pointer-events-none"></div>
                
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:text-[var(--primary)] group-hover:bg-white/10 smooth-transition shadow-lg">
                  {tool.icon}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 tracking-snug">{tool.name}</h3>
                <p className="text-sm text-white/50 leading-relaxed mb-6 flex-grow">{tool.benefit}</p>
                
                <div className="mt-auto flex items-center justify-between pointer-events-none">
                  <span className="text-xs font-bold uppercase tracking-widest text-white/40 group-hover:text-white/80 smooth-transition">Use Free Tool</span>
                  <div className="w-8 h-8 rounded-full bg-[#25D366]/20 text-[#25D366] flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 smooth-transition">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 1.833 6.368L.141 24l5.803-1.492A12 12 0 1 0 11.944 0zm0 22C6.918 22 2.802 18.237 2.451 13.315l1.637 1.636a8.878 8.878 0 0 1 10.9-10.9l1.636-1.636C12.186 2.012 11.968 2 11.944 2c-5.522 0-10 4.477-10 10 0 1.76.452 3.411 1.233 4.887L1.93 21.365l4.63-1.196A9.957 9.957 0 0 0 11.944 22c5.522 0 10-4.478 10-10s-4.478-10-10-10zm5.176-6.425c-.282-.141-1.669-.824-1.927-.919-.258-.094-.447-.141-.635.141-.188.282-.729.919-.894 1.107-.165.188-.33.211-.612.07-.282-.141-1.19-.439-2.268-1.4-8.37-1.135 7.42-1.925 7.185-1.442-.236.483-3.692.671-5.127.812-.141.141-.33.353-.33.353s-.188.165-.188.447c0 .282.188.635.423.824.236.188.236.47.236.753.047.893-1.011 2.585-2.067 2.679-1.011.094-1.364.094-1.904-.094s-.541-.47-.541-.894.236-1.011.682-1.364c.541-.423.705-.682.894-1.152.188-.47.094-.894-.047-1.176-.141-.282-.635-1.528-.87-2.092-.235-.564-.47-.487-.635-.494-.165-.008-.353-.008-.541-.008s-.494.07-.753.353c-.258.282-1.011.988-1.011 2.4 0 1.411 1.035 2.775 1.176 2.963.141.188 2.022 3.081 4.891 4.316.682.294 1.223.47 1.646.6.682.216 1.305.185 1.796.113.551-.082 1.669-.682 1.904-1.34s.235-1.223.165-1.341c-.07-.118-.258-.188-.541-.33z"/></svg>
                  </div>
                </div>
              </motion.a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
