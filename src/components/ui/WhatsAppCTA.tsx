import React from 'react';
import { MessageSquare } from 'lucide-react';

export const WhatsAppCTA = ({ message, label = "Send to WhatsApp", className = "" }: any) => {
  const encodedMsg = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/919114411026?text=${encodedMsg}`;

  return (
    <a 
      href={whatsappUrl} 
      target="_blank" 
      rel="noopener noreferrer" 
      className={`inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-5 py-3 rounded-xl font-bold text-sm w-full hover:opacity-90 smooth-transition shadow-md active:scale-95 ${className}`}
    >
      <MessageSquare size={18} />
      {label}
    </a>
  );
};
