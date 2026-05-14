import React, { useState } from 'react';
import { FormField } from '../ui/FormField';
import { WhatsAppCTA } from '../ui/WhatsAppCTA';
import { Bot, Copy, Check } from 'lucide-react';
import { getExpertAdvice } from '../../lib/expertClient';

export const LandingPageHeadlineGenerator = () => {
  const [formData, setFormData] = useState({
    product: '',
    audience: '',
    benefit: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const handleChange = (e: any) => setFormData({ ...formData, [e.target.id]: e.target.value });

  const generate = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const data = await getExpertAdvice('HeadlineGenerator', formData);
    setResult(data);
    setLoading(false);
  };

  const copyToClipboard = () => {
    if (!result) return;
    const text = `Headline: ${result.recommendedHeadline}\n\nAll Headlines:\n${result.headlines?.join('\n')}\n\nSubheadings:\n${result.subheadings?.join('\n')}\n\nCTAs:\n${result.ctaIdeas?.join('\n')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-1/2">
        <form onSubmit={generate} className="space-y-4">
          <FormField label="Product / Service" id="product" value={formData.product} onChange={handleChange} required placeholder="e.g., Lead Generation Software" />
          <FormField label="Target Audience" id="audience" value={formData.audience} onChange={handleChange} required placeholder="e.g., Marketing Agencies" />
          <FormField label="Main Benefit" id="benefit" value={formData.benefit} onChange={handleChange} required placeholder="e.g., Get 10x more leads automatically" />
          <button type="submit" disabled={loading} className="w-full bg-[var(--primary)] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[var(--accent)] smooth-transition">
            {loading ? <span className="animate-pulse">Generating...</span> : <><Bot size={18} /> Generate Headlines</>}
          </button>
        </form>
      </div>
      <div className="w-full md:w-1/2 bg-main-dark rounded-2xl p-6 border border-main-light flex flex-col h-full">
        {result ? (
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-black text-white">Your Copy</h4>
              <button onClick={copyToClipboard} className="flex items-center gap-1 text-xs font-bold text-[var(--primary)] hover:text-[var(--accent)] smooth-transition">
                {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied' : 'Copy All'}
              </button>
            </div>
            <div className="space-y-4 flex-grow overflow-y-auto mb-4 text-sm px-2">
              <div className="bg-panel-white p-4 rounded-xl border border-main-light text-main-dark">
                <strong className="text-[var(--primary)] block text-xs uppercase tracking-widest mb-1">Recommended Headline:</strong>
                <p className="font-black text-xl leading-tight">{result.recommendedHeadline}</p>
              </div>
              <div className="bg-panel-white p-4 rounded-xl border border-main-light text-main-dark">
                <strong className="text-main-muted block text-xs uppercase tracking-widest mb-2">Options</strong>
                <p className="font-bold mb-1">• {result.headlines?.[0]}</p>
                <p className="font-bold">• {result.headlines?.[1]}</p>
              </div>
              <div className="bg-panel-white p-4 rounded-xl border border-main-light text-main-dark">
                <strong className="text-main-muted block text-xs uppercase tracking-widest mb-2">Subheading Ideas:</strong>
                <p className="font-medium mb-1">• {result.subheadings?.[0]}</p>
                <p className="font-medium">• {result.subheadings?.[1]}</p>
              </div>
              <div className="bg-panel-white p-4 rounded-xl border border-main-light text-main-dark">
                <strong className="text-main-muted block text-xs uppercase tracking-widest mb-2">CTA Buttons:</strong>
                <p className="font-bold text-[var(--primary)]">{result.ctaIdeas?.join('   |   ')}</p>
              </div>
            </div>
            <div className="mt-auto">
              <WhatsAppCTA message={`Hi DEZO, I used your Landing Page Headline Tool for ${formData.product}. Please help me build a high-converting landing page starting at ₹3,999.`} label="Build Landing Page ₹3,999" />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center h-full text-main-muted opacity-50 py-10">
            <Bot size={48} className="mb-4 text-[var(--primary)]" />
            <p className="font-bold">Enter details to generate high-converting landing page copy.</p>
          </div>
        )}
      </div>
    </div>
  );
};
