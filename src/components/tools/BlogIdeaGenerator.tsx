import React, { useState } from 'react';
import { FormField } from '../ui/FormField';
import { WhatsAppCTA } from '../ui/WhatsAppCTA';
import { UserCheck, Copy, Check } from 'lucide-react';
import { getExpertAdvice } from '../../lib/expertClient';

export const BlogIdeaGenerator = () => {
  const [formData, setFormData] = useState({
    niche: '',
    audience: '',
    tone: 'Informative & Educational',
    focusKeyphrase: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const handleChange = (e: any) => setFormData({ ...formData, [e.target.id]: e.target.value });

  const generate = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const data = await getExpertAdvice('BlogIdeaGenerator', formData);
    setResult(data);
    setLoading(false);
  };

  const copyToClipboard = () => {
    if (!result) return;
    const text = result.ideas?.map((i: any) => `${i.title}\nKeywords: ${i.keywords.join(', ')}\nAngle: ${i.angle}`).join('\n\n');
    if(text) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-1/2 md:overflow-y-auto md:max-h-[80vh] px-1 pb-4">
        <form onSubmit={generate} className="space-y-4">
          <FormField label="Industry / Niche" id="niche" value={formData.niche} onChange={handleChange} required placeholder="e.g., Fitness Coaching" />
          <FormField label="Target Audience" id="audience" value={formData.audience} onChange={handleChange} required placeholder="e.g., Busy Professionals" />
          <FormField label="Tone / Style" type="select" id="tone" value={formData.tone} onChange={handleChange} options={["Informative & Educational", "Opinionated & Bold", "Listicles & Guides", "Case Studies & Storytelling"]} />
          <FormField label="Focus Keyphrase (Optional)" id="focusKeyphrase" value={formData.focusKeyphrase} onChange={handleChange} placeholder="e.g., home workouts for men" />
          <button type="submit" disabled={loading} className="w-full bg-[var(--primary)] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[var(--accent)] smooth-transition mt-4">
            {loading ? <span className="animate-pulse">Generating Expert Topics...</span> : <><UserCheck size={18} /> Generate Blog Strategy</>}
          </button>
        </form>
      </div>
      <div className="w-full md:w-1/2 bg-main-dark rounded-2xl p-6 border border-main-light flex flex-col h-full min-h-[400px]">
        {result ? (
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-black text-white">Expert Content Strategy</h4>
              <button onClick={copyToClipboard} className="flex items-center gap-1 text-xs font-bold text-[var(--primary)] hover:text-[var(--accent)] smooth-transition">
                {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied' : 'Copy All'}
              </button>
            </div>
            <div className="space-y-4 flex-grow overflow-y-auto mb-4 text-sm pr-2">
              {result.ideas?.map((idea: any, i: number) => (
                <div key={i} className="bg-panel-white p-4 rounded-xl border border-main-light text-main-dark font-medium leading-relaxed">
                  <h5 className="font-bold text-sm mb-2">{i + 1}. {idea.title}</h5>
                  <div className="text-xs text-main-muted mb-2">
                     <span className="font-bold uppercase tracking-widest text-[9px] mr-1">Angle:</span> {idea.angle}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {idea.keywords?.map((kw: string, kidx: number) => (
                      <span key={kidx} className="bg-main-light px-2 py-0.5 rounded text-[10px] whitespace-nowrap">{kw}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-auto">
              <WhatsAppCTA message={`Hi DEZO, Expert generated a blog strategy for my ${formData.niche} business. Can you help me build a website with an SEO-optimized blog section?`} label="Get SEO Blog Website ₹5,999" />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center h-full text-main-muted opacity-50 py-10 my-auto">
            <UserCheck size={48} className="mb-4 text-[var(--primary)]" />
            <p className="font-bold">Enter details to get fresh, SEO-friendly blog content ideas.</p>
          </div>
        )}
      </div>
    </div>
  );
};
