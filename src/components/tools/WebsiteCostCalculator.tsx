import React, { useState, useRef } from 'react';
import { FormField } from '../ui/FormField';
import { WhatsAppCTA } from '../ui/WhatsAppCTA';
import { UserCheck, Calculator } from 'lucide-react';
import { getExpertAdvice } from '../../lib/expertClient';

export const WebsiteCostCalculator = () => {
  const resultRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    businessType: '',
    websiteType: 'Starter Website',
    pages: '1',
    ecommerce: 'No',
    admin: 'No',
    database: 'No',
    login: 'No',
    payment: 'No',
    seo: 'No',
    content: 'No',
    metaAds: 'No',
    timeline: 'Flexible',
    budgetRange: 'Flexible'
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const generate = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const data = await getExpertAdvice('WebsiteCostCalculator', formData);
    setResult(data);
    setLoading(false);
    
    if (window.innerWidth <= 768) {
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const msg = result 
    ? `Hi DEZO, I used your Pro Website Cost Calculator. Business: ${formData.businessType}. Website Type: ${formData.websiteType}. Estimated Package: ${result.recommendedPackage}. Estimated Price: ${result.estimatedPriceRange}. Please guide me.`
    : `Hi DEZO, I need a website. Please guide me.`;

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-1/2 md:max-h-[70vh] md:overflow-y-auto px-1 pb-4 custom-scrollbar">
        <form onSubmit={generate} className="space-y-4">
          <FormField label="Business Type / Industry" id="businessType" value={formData.businessType} onChange={handleChange} required placeholder="e.g., Real Estate, Healthcare" />
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Base Platform" type="select" id="websiteType" value={formData.websiteType} onChange={handleChange} options={[
              "Starter Website", "Business Website", "Ecommerce Website", "Landing Page", "Platform / Database Website"
            ]} />
            <FormField label="Total Pages (approx)" type="number" id="pages" value={formData.pages} onChange={handleChange} min={1} />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Need Ecommerce?" type="select" id="ecommerce" value={formData.ecommerce} onChange={handleChange} options={["No", "Yes"]} />
            <FormField label="Custom Admin Panel?" type="select" id="admin" value={formData.admin} onChange={handleChange} options={["No", "Yes"]} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Custom Database?" type="select" id="database" value={formData.database} onChange={handleChange} options={["No", "Yes"]} />
            <FormField label="User Login System?" type="select" id="login" value={formData.login} onChange={handleChange} options={["No", "Yes"]} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Payment Gateway?" type="select" id="payment" value={formData.payment} onChange={handleChange} options={["No", "Yes"]} />
            <FormField label="Advanced SEO?" type="select" id="seo" value={formData.seo} onChange={handleChange} options={["No", "Yes"]} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Content Writing?" type="select" id="content" value={formData.content} onChange={handleChange} options={["No", "Yes"]} />
            <FormField label="Meta Ads Landing Page?" type="select" id="metaAds" value={formData.metaAds} onChange={handleChange} options={["No", "Yes"]} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Timeline" type="select" id="timeline" value={formData.timeline} onChange={handleChange} options={["Flexible", "2 Weeks", "1 Month", "Urgent"]} />
            <FormField label="Budget Range" type="select" id="budgetRange" value={formData.budgetRange} onChange={handleChange} options={["Flexible", "₹5,000 - ₹10,000", "₹10,000 - ₹25,000", "₹25,000+"]} />
          </div>

          <button type="submit" disabled={loading} className="w-full bg-[var(--primary)] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[var(--accent)] smooth-transition mt-4">
            {loading ? <span className="animate-pulse">Analyzing Requirements...</span> : <><UserCheck size={18} /> Calculate Pro Estimate</>}
          </button>
        </form>
      </div>

      <div ref={resultRef} className="w-full md:w-1/2 bg-main-dark rounded-2xl p-6 text-white flex flex-col relative overflow-hidden border border-main-light min-h-[400px] md:h-auto">
        <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10 w-full flex flex-col h-full">
          {result ? (
            <div className="flex flex-col h-full">
              <div className="text-center mb-6">
                <Calculator size={32} className="text-[var(--primary)] mx-auto mb-2" />
                <p className="text-xs font-bold text-main-muted uppercase tracking-widest mb-1">Pro Recommendation & Estimate</p>
                <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]">{result.estimatedPriceRange}</h2>
              </div>
              
              <div className="flex-grow space-y-4 overflow-y-auto mb-6 pr-2">
                <div className="bg-panel-white p-4 rounded-xl border border-main-light text-main-dark text-sm">
                  <div className="font-bold text-lg mb-1">{result.recommendedPackage}</div>
                  <p className="text-main-muted mb-3">{result.bestPackageExplanation}</p>
                  
                  <strong className="block text-xs uppercase tracking-widest text-main-muted mb-2 mt-4">Timeline</strong>
                  <p className="font-bold">{result.timelineSuggestion}</p>
                  
                  <strong className="block text-xs uppercase tracking-widest text-main-muted mb-2 mt-4">Key Features</strong>
                  <ul className="list-disc pl-5 space-y-1 mb-2">
                    {result.featureSuggestions?.map((f: string, i: number) => <li key={i}>{f}</li>)}
                  </ul>
                  
                  {result.upsellSuggestion && (
                    <div className="mt-4 p-3 bg-[var(--primary)]/10 text-[var(--primary)] rounded-lg text-xs font-bold">
                      💡 {result.upsellSuggestion}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-auto">
                <WhatsAppCTA message={msg} label="Send Result to DEZO on WhatsApp" />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center h-full text-main-muted opacity-50 py-10 my-auto">
              <UserCheck size={48} className="mb-4 text-[var(--primary)]" />
              <p className="font-bold">Enter your requirements to get an Pro-crafted cost estimate and package recommendation.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
