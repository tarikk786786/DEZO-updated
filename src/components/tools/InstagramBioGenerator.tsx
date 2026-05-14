import React, { useState } from 'react';
import { FormField } from '../ui/FormField';
import { WhatsAppCTA } from '../ui/WhatsAppCTA';
import { Bot, Copy, Check } from 'lucide-react';
import { getExpertAdvice } from '../../lib/expertClient';

export const InstagramBioGenerator = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    industry: '',
    location: '',
    mainService: '',
    offer: '',
    contactMethod: '',
    tone: 'Professional & Direct'
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const handleChange = (e: any) => setFormData({ ...formData, [e.target.id]: e.target.value });

  const generate = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const data = await getExpertAdvice('InstagramBioGenerator', formData);
    setResult(data);
    setLoading(false);
  };

  const copyToClipboard = () => {
    if (!result) return;
    const text = `Bios:\n${result.bios?.join('\n\n')}\n\nHighlights:\n${result.highlightNames?.join(', ')}\n\nHashtags:\n${result.hashtags?.join(' ')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-1/2 overflow-y-auto max-h-[80vh] px-1 pb-4">
        <form onSubmit={generate} className="space-y-4">
          <FormField label="Business Name" id="businessName" value={formData.businessName} onChange={handleChange} required placeholder="e.g., DEZO" />
          <FormField label="Industry" id="industry" value={formData.industry} onChange={handleChange} required placeholder="e.g., Marketing Agency" />
          <FormField label="Location" id="location" value={formData.location} onChange={handleChange} required placeholder="e.g., Mumbai, India" />
          <FormField label="Main Product/Service" id="mainService" value={formData.mainService} onChange={handleChange} required placeholder="e.g., Target Ads & Sites" />
          <FormField label="Offer/Trust Marker" id="offer" value={formData.offer} onChange={handleChange} placeholder="e.g., 500+ Clients / Free Audit" />
          <FormField label="Contact Method / CTA" id="contactMethod" value={formData.contactMethod} onChange={handleChange} required placeholder="e.g., DM for details / Link below" />
          <FormField label="Tone" type="select" id="tone" value={formData.tone} onChange={handleChange} options={["Professional & Direct", "Playful & Casual", "Luxury & Minimal"]} />
          <button type="submit" disabled={loading} className="w-full bg-[var(--primary)] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[var(--accent)] smooth-transition mt-4">
            {loading ? <span className="animate-pulse">Generating Expert Bios...</span> : <><Bot size={18} /> Generate Perfect Bio</>}
          </button>
        </form>
      </div>
      <div className="w-full md:w-1/2 bg-main-dark rounded-2xl p-6 border border-main-light flex flex-col h-full min-h-[500px]">
        {result ? (
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-black text-white">Your Insta Identity</h4>
              <button onClick={copyToClipboard} className="flex items-center gap-1 text-xs font-bold text-[var(--primary)] hover:text-[var(--accent)] smooth-transition">
                {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied' : 'Copy All'}
              </button>
            </div>
            <div className="flex-grow space-y-4 overflow-y-auto mb-4 pr-2">
               <div className="bg-panel-white p-4 rounded-xl border border-main-light text-main-dark">
                  <strong className="text-main-muted block text-[10px] uppercase tracking-widest mb-2 text-center text-[var(--primary)]">Target Bio</strong>
                  <p className="whitespace-pre-wrap font-medium text-sm leading-relaxed">{result.bios?.[0]}</p>
               </div>
               {result.bios?.[1] && (
                 <div className="bg-panel-white p-4 rounded-xl border border-main-light text-main-dark">
                    <strong className="text-main-muted block text-[10px] uppercase tracking-widest mb-2 text-center text-[var(--primary)]">Alt Variation</strong>
                    <p className="whitespace-pre-wrap font-medium text-sm leading-relaxed">{result.bios?.[1]}</p>
                 </div>
               )}

               <div className="grid grid-cols-2 gap-3">
                 <div className="bg-panel-white p-4 rounded-xl border border-main-light">
                   <strong className="text-main-muted block text-[10px] uppercase tracking-widest mb-2">Highlights</strong>
                   <ul className="text-main-dark text-xs font-bold space-y-1">
                     {result.highlightNames?.slice(0, 5).map((h: string, i: number) => <li key={i}>{h}</li>)}
                   </ul>
                 </div>
                 <div className="bg-panel-white p-4 rounded-xl border border-main-light">
                   <strong className="text-main-muted block text-[10px] uppercase tracking-widest mb-2">Optimization Tips</strong>
                   <ul className="text-main-dark text-xs font-medium space-y-1 list-disc pl-3">
                     {result.profileTips?.map((t: string, i: number) => <li key={i}>{t}</li>)}
                   </ul>
                 </div>
               </div>
               
               <div className="bg-[#10B981]/10 text-[#10B981] p-3 rounded-lg text-[10px] font-bold border border-[#10B981]/20">
                  🏷️ {result.hashtags?.join(' ')}
               </div>
            </div>
            <div className="mt-auto">
              <WhatsAppCTA message={`Hi DEZO, my Instagram is growing, but I need a proper website/landing page to redirect my followers and track leads. Link my bio to a DEZO website.`} label="Get Landing Page ₹3,999" />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center h-full text-main-muted opacity-50 py-10 my-auto">
            <Bot size={48} className="mb-4 text-[var(--primary)]" />
            <p className="font-bold">Create an engaging, Conversion-focused Instagram bio.</p>
          </div>
        )}
      </div>
    </div>
  );
};
