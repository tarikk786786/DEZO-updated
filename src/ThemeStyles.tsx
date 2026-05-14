import React from 'react';

export const ThemeStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    :root {
      /* Theme System */
      --bg-main: #06060A; /* Deep navy / black */
      --bg-surface: #0E0E14; /* Slightly lighter surface */
      --bg-card: rgba(20, 20, 30, 0.6); /* Glassmorphism card */
      
      --text-primary: #FFFFFF;
      --text-secondary: #E2E8F0;
      --text-muted: #94A3B8;
      
      --accent-primary: #3B82F6; /* Electric blue */
      --accent-secondary: #06B6D4; /* Cyan glow */
      --accent-glow: #8B5CF6; /* Soft purple gradient */
      --accent-premium: #FBBF24; /* Gold highlight */
      
      --whatsapp-green: #25D366;
      
      --border-soft: rgba(255, 255, 255, 0.08);
      --shadow-soft: 0 10px 40px -10px rgba(0, 0, 0, 0.5);
      
      --radius-sm: 0.5rem;
      --radius-md: 1rem;
      --radius-lg: 1.5rem;
      --radius-xl: 2rem;
      
      --section-padding: 6rem;
      --container-width: 1200px;
      
      /* Mapping old variables for backward compatibility temporarily */
      --bg-nav: rgba(6, 6, 10, 0.85);
      --bg-dark: var(--bg-main);
      --bg-darker: var(--bg-main);
      --bg-light: var(--bg-surface);
      --bg-white: var(--bg-surface);
      --bg-panel-white: var(--bg-surface);
      --text-dark: var(--text-primary);
      --text-light: var(--text-secondary);
      --primary: var(--accent-primary);
      --accent: var(--accent-secondary);
      --gold: var(--accent-premium);
      --border-light: var(--border-soft);
      --border-dark: var(--border-soft);
      --anim-speed: 0.3s;
      
      --line-height-body: 1.6;
      --hero-bg: radial-gradient(circle at top center, rgba(59, 130, 246, 0.15) 0%, var(--bg-main) 100%);
      
      --glass-blur: 16px;
    }

    body {
      line-height: var(--line-height-body);
      background-color: var(--bg-main);
      color: var(--text-primary);
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      overflow-x: hidden;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
      text-rendering: optimizeLegibility;
    }

    /* Rendering Optimizations */
    section {
      content-visibility: auto;
      contain-intrinsic-size: 1px 500px;
    }
    
    #home { content-visibility: visible; }

    /* Ultra-smooth transitions */
    .bg-main-dark, .bg-main-light, .bg-panel-white, 
    .text-main-dark, .text-main-light, .text-main-muted,
    .border-main-light, .border-main-dark {
      transition-property: background-color, color, border-color, box-shadow, transform, filter;
      transition-duration: 0.5s;
      transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
    }

    .smooth-transition {
      transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    }

    @media (max-width: 768px) {
      :root {
        --glass-blur: 0px;
      }
      .heavy-animation,
      .particles,
      .canvas-bg,
      .desktop-only-animation,
      .animate-float,
      .animate-float-delayed,
      .hero-grid {
        display: none !important;
        animation: none !important;
      }
      .glass-card, [class*="backdrop-blur"] {
        backdrop-filter: none !important;
        -webkit-backdrop-filter: none !important;
        background: rgba(15, 23, 30, 0.95) !important;
      }
      .smooth-transition {
        transition-duration: 0.2s !important;
      }
      * {
        text-rendering: auto !important;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      * {
        animation-duration: 0.001ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.001ms !important;
        scroll-behavior: auto !important;
      }
    }

    body.night-mode .animate-float,
    body.night-mode .animate-float-delayed,
    body.night-mode .animate-pulse,
    body.night-mode .animate-pulse-soft,
    body.night-mode .animate-shimmer,
    body.night-mode .animate-bar-grow,
    body.night-mode .animate-typing-code {
      animation: none !important;
      transform: none !important;
    }

    .bg-main-dark { background-color: var(--bg-dark); }
    .bg-main-light { background-color: var(--bg-light); }
    .bg-panel-white { background-color: var(--bg-white); }
    
    /* Override generic Tailwind white where it's used as a solid panel */
    .bg-white { background-color: var(--bg-surface) !important; }
    
    .text-main-dark { color: var(--text-dark); }
    .text-main-light { color: var(--text-light); }
    .text-main-muted { color: var(--text-muted); }
    .border-main-light { border-color: var(--border-light); }
    .border-main-dark { border-color: var(--border-dark); }

    .smooth-transition { transition: all var(--anim-speed) cubic-bezier(0.22, 1, 0.36, 1); }
    
    @keyframes float { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-8px) rotate(0.2deg); } }
    @keyframes float-delayed { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-12px) rotate(-0.2deg); } }
    @keyframes pulse-soft { 0%, 100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.4); } 70% { box-shadow: 0 0 0 10px rgba(37, 211, 102, 0); } }
    @keyframes shimmer { 0% { background-position: 200% center; } 100% { background-position: -200% center; } }
    @keyframes bar-grow { 0% { transform: scaleY(0.1); opacity: 0; } 100% { transform: scaleY(1); opacity: 1; } }
    @keyframes typing { from { width: 0 } to { width: 100% } }
    @keyframes blink-caret { from, to { border-color: transparent } 50% { border-color: white } }
    @keyframes background-pan { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
    @keyframes logo-glow { 0% { filter: drop-shadow(0 0 8px rgba(124, 58, 237, 0.5)); } 50% { filter: drop-shadow(0 0 20px rgba(236, 72, 153, 0.8)); } 100% { filter: drop-shadow(0 0 8px rgba(124, 58, 237, 0.5)); } }
    @keyframes text-pop { 0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } }

    .logo-animated {
      background: linear-gradient(135deg, var(--primary), var(--accent), var(--gold), var(--primary));
      background-size: 300% 300%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: background-pan 4s linear infinite, logo-glow 3s ease-in-out infinite;
      display: inline-block;
    }
    
    .logo-animated:hover {
      animation: background-pan 4s linear infinite, logo-glow 3s ease-in-out infinite, text-pop 1s ease-in-out infinite;
    }

    .animate-float { animation: float 7s ease-in-out infinite; }
    .animate-float-delayed { animation: float-delayed 9s ease-in-out infinite 1s; }
    .animate-pulse-soft { animation: pulse-soft 2.5s infinite; }
    .animate-shimmer { background-size: 200% auto; animation: shimmer 4s linear infinite; }
    .animate-bar-grow { transform-origin: bottom; animation: bar-grow 1.5s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
    .animate-typing-code { overflow: hidden; white-space: nowrap; border-right: 2px solid white; animation: typing 3s steps(30, end) infinite alternate, blink-caret .75s step-end infinite; }
    .animate-gradient-text { background-size: 200% auto; animation: background-pan 6s linear infinite; }

    .hide-scrollbar::-webkit-scrollbar { display: none; }
    .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    html { scroll-behavior: smooth; }

    .clamp-h1 { font-size: clamp(2.2rem, 8vw, 5rem); line-height: 1.1; letter-spacing: -0.03em; font-weight: 900; word-break: break-word; }
    .clamp-h2 { font-size: clamp(1.7rem, 5vw, 3.5rem); line-height: 1.2; letter-spacing: -0.02em; font-weight: 800; word-break: break-word; }
    .clamp-p { font-size: clamp(1rem, 1.8vw, 1.2rem); line-height: 1.6; opacity: 0.9; }

    .glass-card {
      background: var(--bg-card);
      backdrop-filter: blur(16px);
      border: 1px solid var(--border-soft);
      box-shadow: var(--shadow-soft);
      border-radius: var(--radius-xl);
    }
    
    ::selection {
      background: var(--primary);
      color: #FFF;
    }
    
    ::-moz-selection {
      background: var(--primary);
      color: #FFF;
    }

    @keyframes grid-move {
      0% { transform: translateY(0); }
      100% { transform: translateY(50px); }
    }

    @media (max-width: 768px) {
      .logo-animated {
        animation: background-pan 4s linear infinite !important;
        filter: none !important;
      }
    }

    .hero-grid {
      background-size: 50px 50px;
      background-image: 
        linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
      mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
      -webkit-mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
      position: absolute;
      top: -50px;
      left: 0;
      right: 0;
      bottom: 0;
      animation: grid-move 5s linear infinite;
    }
  `}} />
);
