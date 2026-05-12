import React, { useEffect } from 'react';
import { Home, Zap, MessageSquare, Phone } from 'lucide-react';

export const NotFoundPage = () => {
  useEffect(() => {
    document.title = "Page Not Found | Dezo";
  }, []);

  return (
    <div className="min-h-screen bg-main-dark text-main-light flex flex-col justify-center items-center relative overflow-hidden px-4">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[var(--primary)]/20 blur-[120px] rounded-full mix-blend-screen"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[var(--accent)]/10 blur-[100px] rounded-full mix-blend-screen"></div>
      </div>
      
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] mb-4">404</h1>
        <h2 className="text-3xl md:text-5xl font-black mb-6">This page is missing, but your digital growth journey is still alive.</h2>
        <p className="text-lg text-main-muted mb-12 font-medium">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
          <a href="/" className="flex items-center justify-center gap-2 px-6 py-4 bg-[var(--primary)] text-white font-bold rounded-xl hover:-translate-y-1 smooth-transition">
            <Home size={20} /> Go Home
          </a>
          <a href="/#services" className="flex items-center justify-center gap-2 px-6 py-4 bg-white/5 border border-white/10 hover:border-[var(--primary)]/50 hover:bg-white/10 text-white font-bold rounded-xl hover:-translate-y-1 smooth-transition">
            <Zap size={20} /> View Services
          </a>
          <a href="/#contact" className="flex items-center justify-center gap-2 px-6 py-4 bg-white/5 border border-white/10 hover:border-[var(--primary)]/50 hover:bg-white/10 text-white font-bold rounded-xl hover:-translate-y-1 smooth-transition">
            <MessageSquare size={20} /> Contact Dezo
          </a>
          <a href="https://wa.me/917787063088" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-6 py-4 bg-[#25D366]/20 border border-[#25D366]/50 hover:bg-[#25D366]/30 text-white font-bold rounded-xl hover:-translate-y-1 smooth-transition">
            <Phone size={20} /> WhatsApp Us
          </a>
        </div>
      </div>
    </div>
  );
};
