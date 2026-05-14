import React, { useState } from 'react';
import { FormField } from '../ui/FormField';
import { WhatsAppCTA } from '../ui/WhatsAppCTA';
import { CheckCircle2, Circle, Bot } from 'lucide-react';
import { getExpertAdvice } from '../../lib/expertClient';

export const GoogleRankingChecklist = () => {
  const [formData, setFormData] = useState({
    url: '',
    industry: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  // State to track completed tasks { "categoryName": { [taskIndex]: boolean } }
  const [completedTasks, setCompletedTasks] = useState<Record<string, Record<number, boolean>>>({});

  const handleChange = (e: any) => setFormData({ ...formData, [e.target.id]: e.target.value });

  const generate = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const data = await getExpertAdvice('GoogleRankingChecklist', formData);
    setResult(data);
    setCompletedTasks({}); // Reset
    setLoading(false);
  };

  const toggleTask = (category: string, taskIndex: number) => {
    setCompletedTasks(prev => {
      const catTasks = prev[category] || {};
      return {
        ...prev,
        [category]: {
          ...catTasks,
          [taskIndex]: !catTasks[taskIndex]
        }
      };
    });
  };

  const getTotalTasks = () => {
    if (!result || !result.categories) return 0;
    return result.categories.reduce((acc: number, cat: any) => acc + (cat.tasks?.length || 0), 0);
  };

  const getCompletedCount = () => {
    let count = 0;
    Object.values(completedTasks).forEach(cat => {
      Object.values(cat).forEach(isDone => {
        if (isDone) count++;
      });
    });
    return count;
  };

  const progress = getTotalTasks() > 0 ? Math.round((getCompletedCount() / getTotalTasks()) * 100) : 0;

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-1/2 overflow-y-auto max-h-[80vh] px-1 pb-4">
        <form onSubmit={generate} className="space-y-4">
          <FormField label="Website URL (Optional)" id="url" value={formData.url} onChange={handleChange} placeholder="e.g. www.mybusiness.com" />
          <FormField label="Industry / Niche" id="industry" value={formData.industry} onChange={handleChange} required placeholder="e.g. Real Estate, Restaurant" />
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[var(--primary)] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[var(--accent)] smooth-transition mt-4"
          >
            {loading ? <span className="animate-pulse">Building Expert Checklist...</span> : <><Bot size={18} /> Generate SEO Plan</>}
          </button>
        </form>
      </div>

      <div className="w-full md:w-1/2 bg-main-dark rounded-2xl p-6 border border-main-light flex flex-col h-full min-h-[500px]">
        {result ? (
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-black text-white">Expert SEO Action Plan</h4>
              <div className="text-[var(--primary)] font-bold text-sm bg-[var(--primary)]/10 px-3 py-1 rounded-full">{progress}% Complete</div>
            </div>
            
            <div className="w-full bg-white/5 rounded-full h-2.5 mb-6 overflow-hidden">
              <div className="bg-[var(--primary)] h-2.5 rounded-full smooth-transition" style={{ width: `${progress}%` }}></div>
            </div>

            <div className="space-y-6 overflow-y-auto mb-4 pr-2 flex-grow">
              {result.categories?.map((category: any, catIndex: number) => (
                <div key={catIndex} className="bg-panel-white p-4 rounded-xl border border-main-light">
                  <h5 className="font-bold text-main-dark mb-3 text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[var(--primary)]"></span>
                    {category.name}
                  </h5>
                  <div className="space-y-2">
                    {category.tasks?.map((task: string, taskIndex: number) => {
                      const isDone = completedTasks[category.name]?.[taskIndex] || false;
                      return (
                        <div 
                          key={taskIndex} 
                          onClick={() => toggleTask(category.name, taskIndex)}
                          className={`flex items-start gap-3 p-2 rounded-lg cursor-pointer smooth-transition hover:bg-black/5 ${isDone ? 'opacity-60' : ''}`}
                        >
                          <div className={`mt-0.5 flex-shrink-0 ${isDone ? "text-[var(--primary)]" : "text-main-muted"}`}>
                            {isDone ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                          </div>
                          <span className={`text-xs font-medium leading-relaxed ${isDone ? 'text-main-muted line-through' : 'text-main-dark'}`}>
                            {task}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-auto">
              <WhatsAppCTA message={`Hi DEZO, my SEO score is currently low for my ${formData.industry} website. Could you upgrade my website with your SEO-ready package starting at ₹5,999?`} label="Get SEO-Ready Website ₹5,999" />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center h-full text-main-muted opacity-50 py-10 my-auto">
            <CheckCircle2 size={48} className="mb-4 text-[var(--primary)]" />
            <p className="font-bold">Generate a personalized step-by-step SEO checklist to rank your business higher.</p>
          </div>
        )}
      </div>
    </div>
  );
};
