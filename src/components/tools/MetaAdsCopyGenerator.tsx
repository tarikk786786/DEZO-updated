import React, { useState } from 'react';
import { FormField } from '../ui/FormField';
import { WhatsAppCTA } from '../ui/WhatsAppCTA';
import { Megaphone, Copy, Check, Bot } from 'lucide-react';
import { generateWithAI } from '../../lib/aiClient';

export const MetaAdsCopyGenerator = () => {
  const [formData, setFormData] = useState({
    businessType: '',
    product: '',
    offer: '',
    target: '',
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
    const data = await generateWithAI('MetaAdsCopyGenerator', formData);
    setResult(data);
    setLoading(false);
  };

  const copyToClipboard = () => {
    if (!result) return;
    const text = result.ads.map((ad: any, i: number) => `Ad ${i + 1}\nHeadline: ${ad.headline}\nText: ${ad.primaryText}\nCTA: ${ad.cta}\n`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-1/2 overflow-y-auto max-h-[80vh] px-1 pb-4">
        <form onSubmit={generate} className="space-y-4">
          <FormField label="Business Type / Industry" id="businessType" value={formData.businessType} onChange={handleChange} required placeholder="e.g., Real Estate Agency" />
          <FormField label="Main Product / Service" id="product" value={formData.product} onChange={handleChange} required placeholder="e.g., Luxury Villas" />
          <FormField label="Special Offer / Hook" id="offer" value={formData.offer} onChange={handleChange} required placeholder="e.g., Free site visit & 5% discount" />
          <FormField label="Target Location" id="location" value={formData.location || ''} onChange={handleChange} placeholder="e.g., Mumbai, India" />
          <FormField label="Target Audience" id="target" value={formData.target} onChange={handleChange} required placeholder="e.g., High income families" />
          <div className="grid grid-cols-2 gap-4">
             <FormField label="Budget" id="budget" value={formData.budget || ''} onChange={handleChange} placeholder="e.g. ₹500/day" />
             <FormField label="Goal" type="select" id="goal" value={formData.goal || 'Leads'} onChange={handleChange} options={['Leads', 'Sales', 'Traffic', 'Messages']} />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[var(--primary)] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[var(--accent)] smooth-transition mt-4"
          >
            {loading ? <span className="animate-pulse">Writing AI Ads...</span> : <><Bot size={18} /> Generate Ad Copy</>}
          </button>
          <p className="text-[10px] uppercase font-bold tracking-widest text-main-muted mt-2 text-center">Good ads require a high-converting landing page.</p>
        </form>
      </div>

      <div className="w-full md:w-1/2 bg-main-dark rounded-2xl p-6 border border-main-light flex flex-col h-full min-h-[500px]">
        {result ? (
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-black text-white">Your AI Ad Strategy</h4>
              <button onClick={copyToClipboard} className="flex items-center gap-1 text-xs font-bold text-[var(--primary)] hover:text-[var(--accent)] smooth-transition">
                {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied' : 'Copy All'}
              </button>
            </div>
            
            <div className="space-y-4 flex-grow overflow-y-auto mb-4 pr-2 text-sm text-main-dark">
               <div className="bg-panel-white p-4 rounded-xl border border-main-light">
                 <strong className="text-main-muted block text-xs uppercase tracking-widest mb-2 text-center text-[var(--primary)]">Ad Variation 1</strong>
                 <div><strong className="text-[10px] text-main-muted uppercase mb-1 block">Headline:</strong><p className="font-bold">{result.headlines?.[0]}</p></div>
                 <div className="mt-2"><strong className="text-[10px] text-main-muted uppercase mb-1 block">Primary Text:</strong><p className="font-medium whitespace-pre-wrap">{result.primaryTexts?.[0]}</p></div>
                 <div className="mt-2 text-right"><span className="inline-block bg-[var(--primary)] text-white px-3 py-1 rounded text-xs font-bold">{result.ctaLines?.[0]}</span></div>
               </div>

               <div className="bg-panel-white p-4 rounded-xl border border-main-light">
                 <strong className="text-main-muted block text-xs uppercase tracking-widest mb-2 text-center text-[var(--primary)]">Ad Variation 2</strong>
                 <div><strong className="text-[10px] text-main-muted uppercase mb-1 block">Headline:</strong><p className="font-bold">{result.headlines?.[1]}</p></div>
                 <div className="mt-2"><strong className="text-[10px] text-main-muted uppercase mb-1 block">Primary Text:</strong><p className="font-medium whitespace-pre-wrap">{result.primaryTexts?.[1]}</p></div>
                 <div className="mt-2 text-right"><span className="inline-block bg-[var(--primary)] text-white px-3 py-1 rounded text-xs font-bold">{result.ctaLines?.[1] || result.ctaLines?.[0]}</span></div>
               </div>
               
               <div className="bg-panel-white p-4 rounded-xl border border-main-light">
                  <strong className="text-main-muted block text-[10px] uppercase tracking-widest mb-2 block">Angles & Targeting Ideas</strong>
                  <ul className="list-disc pl-4 space-y-1 font-medium mb-3">
                     {result.creativeAngles?.map((c: string, idx: number) => <li key={idx}>{c}</li>)}
                  </ul>
                  <ul className="list-disc pl-4 space-y-1 font-medium text-main-muted">
                     {result.targetingIdeas?.map((t: string, idx: number) => <li key={idx}>{t}</li>)}
                  </ul>
               </div>

               <p className="text-xs text-main-muted italic">{result.disclaimer}</p>
            </div>
            
            <div className="mt-auto">
              <WhatsAppCTA message={`Hi DEZO, I used your Ad Generator. Need a high-converting Landing Page (Start ₹3,999) + Meta Ads setup for ${formData.product}.`} label="Get Landing Page & Setup Ads" />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center h-full text-main-muted opacity-50 py-10">
            <Megaphone size={48} className="mb-4 text-[var(--primary)]" />
            <p className="font-bold">Generate persuasive Facebook and Instagram ads instantly.</p>
          </div>
        )}
      </div>
    </div>
  );
};
