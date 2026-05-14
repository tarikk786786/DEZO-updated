import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

export const ToolModal = ({ isOpen, onClose, title, children }: any) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
          onClick={onClose}
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            className="bg-main-light rounded-2xl md:rounded-3xl w-full max-w-4xl shadow-2xl relative flex flex-col border border-white/5 h-[92vh] sm:h-auto sm:max-h-[85vh] mx-auto overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 shrink-0">
              <h3 className="text-base sm:text-xl font-black text-white px-1 leading-tight line-clamp-1">{title}</h3>
              <button 
                onClick={onClose}
                className="w-9 h-9 sm:w-10 sm:h-10 bg-panel-white border border-main-light hover:border-[var(--primary)] rounded-full flex items-center justify-center transition-all shrink-0 active:scale-95"
              >
                <X size={20} className="text-main-muted hover:text-[var(--primary)]" />
              </button>
            </div>
            <div className="p-4 sm:p-6 overflow-y-auto custom-scrollbar flex-grow overscroll-contain">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
