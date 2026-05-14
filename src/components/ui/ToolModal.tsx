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
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="bg-main-light rounded-3xl w-full max-w-4xl shadow-2xl relative my-auto sm:my-8 border border-white/5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-main-dark">
              <h3 className="text-lg sm:text-xl font-black text-white px-1 leading-tight">{title}</h3>
              <button 
                onClick={onClose}
                className="w-10 h-10 bg-panel-white border border-main-light hover:border-[var(--primary)] rounded-full flex items-center justify-center smooth-transition shrink-0"
              >
                <X size={20} className="text-main-muted hover:text-[var(--primary)]" />
              </button>
            </div>
            <div className="p-4 sm:p-6 max-h-[80vh] sm:max-h-[85vh] overflow-y-auto">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
