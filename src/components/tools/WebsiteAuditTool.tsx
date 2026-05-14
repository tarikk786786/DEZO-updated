import React, { useState, useRef } from 'react';
import { FormField } from '../ui/FormField';
import { WhatsAppCTA } from '../ui/WhatsAppCTA';
import { Search, Activity, Gauge, Smartphone, CheckCircle, Bot } from 'lucide-react';
import { motion } from 'motion/react';
import { getExpertAdvice } from '../../lib/expertClient';

export const WebsiteAuditTool = () => {
  const resultRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    url: '',
    goal: 'More leads',
    businessName: '',
    industry: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const runAudit = async (e: any) => {
    e.preventDefault();
    if (!formData.url.startsWith('http')) {
      alert("Please include https:// or http:// in your URL");
      return;
    }
    setLoading(true);
    const data = await getExpertAdvice('WebsiteAuditTool', formData);
    setResult(data);
    setLoading(false);
    
    if (window.innerWidth <= 768) {
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-[#10B981]';
    if (score >= 50) return 'text-[#F59E0B]';
    return 'text-[#EF4444]';
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-1/2 md:max-h-[70vh] md:overflow-y-auto px-1 pb-4 custom-scrollbar">
        <form onSubmit={runAudit} className="space-y-4">
          <FormField label="Website URL" id="url" value={formData.url} onChange={handleChange} required placeholder="https://example.com" />
          <FormField label="Business Name" id="businessName" value={formData.businessName || ''} onChange={handleChange} required placeholder="Your Business" />
          <FormField label="Industry" id="industry" value={formData.industry || ''} onChange={handleChange} required placeholder="e.g. Healthcare, Tech" />
          <FormField label="Main Goal" type="select" id="goal" value={formData.goal} onChange={handleChange} options={["More leads", "Better SEO", "Faster speed", "Better design", "More sales"]} />
          <FormField label="Phone Number (Optional)" id="phone" value={formData.phone || ''} onChange={handleChange} placeholder="+91..." />
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[var(--primary)] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[var(--accent)] smooth-transition mt-4"
          >
            {loading ? <span className="animate-pulse flex items-center gap-2"><Activity size={18} className="animate-spin" /> Scanning site...</span> : <><Search size={18} /> Run Expert Audit</>}
          </button>
          
          <p className="text-xs text-main-muted mt-2 leading-relaxed text-center">
             Analyzing speed, SEO, mobile compatibility, and conversion strategy...
          </p>
        </form>
      </div>

      <div ref={resultRef} className="w-full md:w-1/2 bg-main-dark rounded-2xl p-6 border border-main-light flex flex-col relative overflow-hidden min-h-[400px] md:h-[600px]">
        {result ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-full overflow-hidden">
            <h4 className="font-black text-white mb-2 drop-shadow-sm flex items-center gap-2">
              <CheckCircle className="text-[#10B981]" size={20} /> Audit Complete
            </h4>
            
            <div className="overflow-y-auto pr-2 mt-2 space-y-4 mb-4 flex-grow">
               <div className="bg-panel-white p-4 rounded-xl border border-main-light flex justify-between items-center">
                  <span className="font-bold text-main-dark">Overall Audit Score</span>
                  <span className={`text-xl font-black ${result.auditScore?.includes('100') ? 'text-[#10B981]' : 'text-[#F59E0B]'}`}>{result.auditScore}</span>
               </div>
               
               <div className="bg-panel-white p-4 rounded-xl border border-main-light">
                  <strong className="text-main-muted block text-[10px] uppercase tracking-widest mb-2">Design & Conversion Issues</strong>
                  <ul className="text-sm font-medium text-main-dark list-disc pl-4 space-y-1">
                    {result.designIssues?.map((iss: string, i: number) => <li key={i}>{iss}</li>)}
                    {result.ctaImprovementSuggestions?.map((iss: string, i: number) => <li key={i+10}>{iss}</li>)}
                  </ul>
               </div>

               <div className="bg-panel-white p-4 rounded-xl border border-main-light">
                  <strong className="text-main-muted block text-[10px] uppercase tracking-widest mb-2">SEO & Speed Issues</strong>
                  <ul className="text-sm font-medium text-main-dark list-disc pl-4 space-y-1">
                    {result.seoIssues?.map((iss: string, i: number) => <li key={i}>{iss}</li>)}
                    {result.speedSuggestions?.map((iss: string, i: number) => <li key={i+10}>{iss}</li>)}
                  </ul>
               </div>

               <div className="bg-panel-white p-4 rounded-xl border border-main-light">
                  <strong className="text-main-muted block text-[10px] uppercase tracking-widest mb-2">Mobile & Trust Issues</strong>
                  <ul className="text-sm font-medium text-main-dark list-disc pl-4 space-y-1">
                    {result.mobileSuggestions?.map((iss: string, i: number) => <li key={i}>{iss}</li>)}
                    {result.trustImprovementSuggestions?.map((iss: string, i: number) => <li key={i+10}>{iss}</li>)}
                  </ul>
               </div>

               <div className="p-3 bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-bold rounded-lg border border-[var(--primary)]/20 leading-relaxed">
                  DEZO Target: {result.dezoRecommendation}
               </div>
            </div>
            
            <div className="mt-auto pt-2 bg-main-dark">
              <WhatsAppCTA 
                message={`Hi DEZO, I used the Expert Audit Tool. My website (${formData.url}) scored ${result.auditScore}. Please help me improve design, speed, and conversion rate. Package starting ₹4,999.`} 
                label="Rebuild Website Start ₹4,999" 
              />
            </div>
          </motion.div>
        ) : (
           <div className="flex flex-col items-center justify-center text-center h-full text-main-muted opacity-50 py-10 my-auto">
            <Activity size={48} className="mb-4 text-[var(--primary)]" />
            <p className="font-bold">Enter your website URL to scan for Speed, SEO, and Mobile issues.</p>
          </div>
        )}
      </div>
    </div>
  );
};
