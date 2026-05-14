import React, { useState } from 'react';
import { FormField } from '../ui/FormField';
import { WhatsAppCTA } from '../ui/WhatsAppCTA';
import { Bot, Copy, Check } from 'lucide-react';
import { getExpertAdvice } from '../../lib/expertClient';

export const SEOMetaGenerator = () => {
  const [formData, setFormData] = useState({
    topic: '',
    businessType: '',
    location: '',
    keyword: '',
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const generate = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const data = await getExpertAdvice('SEOMetaGenerator', formData);
    setResult(data);
    setLoading(false);
  };

  const copyToClipboard = () => {
    if (!result) return;
    const text = `SEO Title: ${result.title}\nMeta Description: ${result.description}\nKeywords: ${result.keywords}\nH1: ${result.h1}\nSlug: /${result.slug}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-1/2">
        <form onSubmit={generate} className="space-y-4">
          <FormField label="Page Topic / Service" id="topic" value={formData.topic} onChange={handleChange} required placeholder="e.g., Dental Implants" />
          <FormField label="Business Type" id="businessType" value={formData.businessType} onChange={handleChange} required placeholder="e.g., Dental Clinic" />
          <FormField label="City / Location" id="location" value={formData.location} onChange={handleChange} placeholder="e.g., Mumbai" />
          <FormField label="Target Keyword" id="keyword" value={formData.keyword} onChange={handleChange} required placeholder="e.g., best dentist in mumbai" />
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[var(--primary)] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[var(--accent)] smooth-transition"
          >
            {loading ? <span className="animate-pulse">Generating...</span> : <><Bot size={18} /> Generate SEO Pack</>}
          </button>
        </form>
      </div>

      <div className="w-full md:w-1/2 bg-main-dark rounded-2xl p-6 border border-main-light flex flex-col h-full">
        {result ? (
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-black text-main-dark">Your SEO Pack</h4>
              <button onClick={copyToClipboard} className="flex items-center gap-1 text-xs font-bold text-[var(--primary)] hover:text-[var(--accent)] smooth-transition">
                {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied' : 'Copy All'}
              </button>
            </div>
            
            <div className="space-y-4 flex-grow overflow-y-auto mb-4 text-sm px-2">
              <div className="bg-panel-white p-4 rounded-xl border border-main-light">
                <strong className="text-main-muted block text-xs uppercase tracking-widest mb-1">SEO Title:</strong>
                <p className="font-bold text-main-dark">{result.title}</p>
                <div className="text-[10px] text-main-muted mt-1 text-right">{result.title?.length}/60 chars</div>
              </div>
              <div className="bg-panel-white p-4 rounded-xl border border-main-light">
                <strong className="text-main-muted block text-xs uppercase tracking-widest mb-1">Meta Description:</strong>
                <p className="font-medium text-main-dark leading-relaxed">{result.description}</p>
                <div className="text-[10px] text-main-muted mt-1 text-right">{result.description?.length}/160 chars</div>
              </div>
              <div className="bg-panel-white p-4 rounded-xl border border-main-light">
                <strong className="text-main-muted block text-xs uppercase tracking-widest mb-1">Target Keywords:</strong>
                <div className="flex flex-wrap gap-2 mt-2">
                  {result.keywords?.map((kw: string, i: number) => <span key={i} className="bg-main-light text-main-muted px-2 py-1 rounded-md text-xs font-bold">{kw}</span>) || (typeof result.keywords === 'string' && result.keywords.split(',').map((kw: string, i: number) => <span key={i} className="bg-main-light text-main-muted px-2 py-1 rounded-md text-xs font-bold">{kw.trim()}</span>))}
                </div>
              </div>
              <div className="bg-panel-white p-4 rounded-xl border border-main-light">
                <strong className="text-main-muted block text-xs uppercase tracking-widest mb-1">Suggested H1:</strong>
                <p className="font-black text-main-dark text-lg">{result.h1}</p>
              </div>
              <div className="bg-panel-white p-4 rounded-xl border border-main-light">
                <strong className="text-main-muted block text-xs uppercase tracking-widest mb-1">URL Slug:</strong>
                <p className="font-medium text-[var(--primary)] text-sm">/{result.urlSlug || result.slug}</p>
              </div>
            </div>
            
            <div className="mt-auto">
              <WhatsAppCTA message={`Hi DEZO, I just generated an SEO strategy for ${formData.topic}. Could you build an SEO-ready website for this starting at ₹4,999?`} label="Get SEO Website ₹4,999" />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center h-full text-main-muted opacity-50 py-10">
            <Bot size={48} className="mb-4 text-[var(--primary)]" />
            <p className="font-bold">Enter details to generate your optimized SEO tags instantly.</p>
          </div>
        )}
      </div>
    </div>
  );
};
