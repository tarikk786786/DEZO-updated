import React, { useState } from 'react';
import { FormField } from '../ui/FormField';
import { WhatsAppCTA } from '../ui/WhatsAppCTA';
import { Bot, Copy, Check } from 'lucide-react';
import { getExpertAdvice } from '../../lib/expertClient';

export const BusinessNameGenerator = () => {
  const [formData, setFormData] = useState({
    keyword: '',
    industry: '',
    style: 'Modern & Professional',
    location: '',
    audience: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const handleChange = (e: any) => setFormData({ ...formData, [e.target.id]: e.target.value });

  const generate = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const data = await getExpertAdvice('BusinessNameGenerator', formData);
    setResult(data);
    setLoading(false);
  };

  const copyToClipboard = () => {
    if (!result) return;
    const text = `Names:\n${result.names?.join('\n')}\n\nTaglines:\n${result.taglines?.join('\n')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-1/2 md:overflow-y-auto md:max-h-[80vh] px-1 pb-4">
        <form onSubmit={generate} className="space-y-4">
          <FormField label="Industry" id="industry" value={formData.industry} onChange={handleChange} required placeholder="e.g., Tech, Health, Fashion" />
          <FormField label="Style / Tone" type="select" id="style" value={formData.style} onChange={handleChange} options={["Modern & Professional", "Playful & Creative", "Short & Catchy", "Luxury & Premium"]} />
          <FormField label="Must Include Keyword" id="keyword" value={formData.keyword} onChange={handleChange} placeholder="e.g., Nexus, Blue, Tech" />
          <FormField label="Location (Optional)" id="location" value={formData.location} onChange={handleChange} placeholder="e.g., Mumbai" />
          <FormField label="Target Audience" id="audience" value={formData.audience} onChange={handleChange} placeholder="e.g., Startups, Mothers" />
          <button type="submit" disabled={loading} className="w-full bg-[var(--primary)] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[var(--accent)] smooth-transition mt-4">
            {loading ? <span className="animate-pulse">Generating Expert Brand...</span> : <><Bot size={18} /> Generate Brand Name</>}
          </button>
        </form>
      </div>
      <div className="w-full md:w-1/2 bg-main-dark rounded-2xl p-6 border border-main-light flex flex-col h-full min-h-[400px]">
        {result ? (
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-black text-white">Your Brand Identity</h4>
              <button onClick={copyToClipboard} className="flex items-center gap-1 text-xs font-bold text-[var(--primary)] hover:text-[var(--accent)] smooth-transition">
                {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied' : 'Copy All'}
              </button>
            </div>
            <div className="space-y-4 flex-grow overflow-y-auto mb-4 text-sm pr-2">
              <div className="bg-panel-white p-4 rounded-xl border border-main-light">
                 <strong className="text-main-muted block text-[10px] uppercase tracking-widest mb-3">Top Brand Names</strong>
                 <div className="grid grid-cols-2 gap-2">
                   {result.names?.map((idea: string, i: number) => (
                     <div key={i} className="bg-main-light text-main-dark font-bold p-2 text-center rounded-lg border border-white/5">{idea}</div>
                   ))}
                 </div>
              </div>
              
              <div className="bg-panel-white p-4 rounded-xl border border-main-light">
                 <strong className="text-main-muted block text-[10px] uppercase tracking-widest mb-2">Taglines</strong>
                 <ul className="list-disc pl-4 space-y-1 text-main-dark font-medium">
                   {result.taglines?.map((t: string, i: number) => <li key={i}>{t}</li>)}
                 </ul>
              </div>

              <div className="grid grid-cols-2 gap-3">
                 <div className="bg-panel-white p-4 rounded-xl border border-main-light">
                    <strong className="text-main-muted block text-[10px] uppercase tracking-widest mb-2">Domain Ideas</strong>
                    <ul className="text-main-dark font-bold text-xs space-y-1">
                      {result.domainSuggestions?.map((d: string, i: number) => <li key={i}>{d}</li>)}
                    </ul>
                 </div>
                 <div className="bg-panel-white p-4 rounded-xl border border-main-light">
                    <strong className="text-main-muted block text-[10px] uppercase tracking-widest mb-2">Positioning</strong>
                    <p className="text-main-dark text-[10px] font-medium leading-relaxed">{result.brandPositioning}</p>
                 </div>
              </div>

              <div className="bg-[#10B981]/10 text-[#10B981] p-4 rounded-xl text-xs font-medium border border-[#10B981]/20">
                 <p className="font-bold uppercase tracking-widest text-[9px] mb-1">Suggested Insta Bio</p>
                 <p className="whitespace-pre-wrap">{result.instagramBio}</p>
              </div>
            </div>
            <div className="mt-auto">
              <WhatsAppCTA message={`Hi DEZO, Expert generated a brand for my new ${formData.industry} business. I need a starter website at ₹4,999 to launch it.`} label="Launch Website ₹4,999" />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center h-full text-main-muted opacity-50 py-10 my-auto">
            <Bot size={48} className="mb-4 text-[var(--primary)]" />
            <p className="font-bold">Generate professional brand names instantly.</p>
          </div>
        )}
      </div>
    </div>
  );
};
