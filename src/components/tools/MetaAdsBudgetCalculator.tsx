import React, { useState } from 'react';
import { FormField } from '../ui/FormField';
import { WhatsAppCTA } from '../ui/WhatsAppCTA';
import { Calculator, UserCheck } from 'lucide-react';
import { getExpertAdvice } from '../../lib/expertClient';

export const MetaAdsBudgetCalculator = () => {
  const [formData, setFormData] = useState({
    industry: '',
    monthlyBudget: '15000',
    averageValue: '',
    goal: 'Lead Generation',
    cpl: '',
    conversionRate: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleChange = (e: any) => setFormData({ ...formData, [e.target.id]: e.target.value });

  const calculateWithExpert = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const data = await getExpertAdvice('MetaAdsBudgetCalculator', formData);
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-1/2 overflow-y-auto max-h-[80vh] px-1 pb-4">
        <form onSubmit={calculateWithExpert} className="space-y-4">
          <FormField label="Industry / Business" id="industry" value={formData.industry} onChange={handleChange} required placeholder="e.g. Real Estate, Dentistry" />
          <FormField label="Monthly Ad Budget (₹)" id="monthlyBudget" type="number" value={formData.monthlyBudget} onChange={handleChange} required />
          <FormField label="Avg Product/Service Value (₹)" id="averageValue" type="number" value={formData.averageValue} onChange={handleChange} required placeholder="e.g. 5000" />
          <FormField label="Main Goal" type="select" id="goal" value={formData.goal} onChange={handleChange} options={["Lead Generation", "Sales/Ecommerce", "Store Visits", "Brand Awareness"]} />
          
          <div className="grid grid-cols-2 gap-4">
             <FormField label="Expected CPL (Optional)" id="cpl" type="number" value={formData.cpl} onChange={handleChange} placeholder="₹" />
             <FormField label="Conversion Rate % (Optional)" id="conversionRate" type="number" value={formData.conversionRate} onChange={handleChange} placeholder="%" />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[var(--primary)] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[var(--accent)] smooth-transition mt-4"
          >
            {loading ? <span className="animate-pulse">Calculating Expert Strategy...</span> : <><UserCheck size={18} /> Get Expert Target Strategy</>}
          </button>
        </form>
        <div className="mt-4 p-4 bg-[var(--primary)]/10 border border-[var(--primary)]/20 rounded-xl text-xs font-medium text-[var(--primary)]">
          <strong>Pro Tip:</strong> Improving your landing page design is the fastest way to increase conversion rate and lower your cost per lead.
        </div>
      </div>
      
      <div className="w-full md:w-1/2 bg-main-dark rounded-2xl p-6 border border-main-light flex flex-col h-full min-h-[500px]">
        {result ? (
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Calculator className="text-[var(--primary)]" size={24} />
              <h4 className="font-black text-white text-xl">Expert Projections</h4>
            </div>
            
            <div className="space-y-4 flex-grow overflow-y-auto mb-4 pr-2">
              <div className="grid grid-cols-2 gap-3 mb-2">
                <div className="bg-panel-white p-4 rounded-xl border border-main-light text-center flex flex-col justify-center min-h-[100px]">
                  <div className="text-[10px] text-main-muted font-bold tracking-widest uppercase mb-1">Suggested Daily Budget</div>
                  <div className="text-xl lg:text-2xl font-black text-main-dark">{result.suggestedDailyBudget}</div>
                </div>
                <div className="bg-panel-white p-4 rounded-xl border border-main-light text-center flex flex-col justify-center min-h-[100px]">
                  <div className="text-[10px] text-main-muted font-bold tracking-widest uppercase mb-1">Est. Monthly Leads</div>
                  <div className="text-xl lg:text-2xl font-black text-[#10B981]">{result.estimatedLeadRange}</div>
                </div>
              </div>

              <div className="bg-panel-white p-4 rounded-xl border border-main-light text-sm text-main-dark">
                 <strong className="text-main-muted block text-[10px] uppercase tracking-widest mb-2">Creative & Funnel Strategy</strong>
                 <ul className="list-disc pl-4 space-y-1 mb-3">
                    {result.creativeRecommendations?.map((r: string, i: number) => <li key={i}>{r}</li>)}
                 </ul>
                 <ul className="list-disc pl-4 space-y-1 text-main-muted">
                    {result.funnelSuggestions?.map((r: string, i: number) => <li key={i}>{r}</li>)}
                 </ul>
              </div>

              <div className="bg-panel-white p-4 rounded-xl border border-main-light text-sm text-main-dark">
                 <strong className="text-main-muted block text-[10px] uppercase tracking-widest mb-2">Landing Page Requirements</strong>
                 <ul className="list-decimal pl-4 space-y-1">
                    {result.landingPageRequirements?.map((r: string, i: number) => <li key={i}>{r}</li>)}
                 </ul>
              </div>

              <div className="p-3 bg-[#EF4444]/10 text-[#EF4444] rounded-lg text-xs font-bold leading-relaxed">
                 ⚠️ Warning: {result.budgetWarning}
              </div>
              <p className="text-[10px] text-main-muted text-center italic">{result.disclaimer}</p>
            </div>
            
            <div className="mt-auto">
              <WhatsAppCTA message={`Hi DEZO, I want to run Meta Ads. Expert suggests ${result.estimatedLeadRange} leads for my ${formData.industry} business. Please help me build a Landing Page (₹3,999) + Ad Setup to achieve this.`} label="Build Funnel & Run Ads" />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center h-full text-main-muted opacity-50 py-10 my-auto">
            <Calculator size={48} className="mb-4 text-[var(--primary)]" />
            <p className="font-bold">Enter your budget details to get Expert-powered projections and a funnel strategy.</p>
          </div>
        )}
      </div>
    </div>
  );
};
