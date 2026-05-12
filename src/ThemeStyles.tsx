import React from 'react';

export const ThemeStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    :root {
      /* Premium Dark Mode Colors (Vibrant) */
      --bg-nav: rgba(10, 10, 22, 0.85);
      --bg-dark: #0A0A16;
      --bg-darker: #030308;
      --bg-light: #12101F;
      --bg-white: #1B182E;
      --text-dark: #F8FAFC;
      --text-light: #FFFFFF;
      --text-muted: #A1A1AA;
      --text-light-muted: #D4D4D8;
      --primary: #8B5CF6;
      --accent: #F472B6;
      --gold: #FBBF24;
      --border-light: #27273F;
      --border-dark: #373752;
      --glow-opacity: 1;
      --anim-speed: 0.8s;
      --anim-dist: 40px;
      --shadow-soft: 0 20px 40px -15px rgba(139, 92, 246, 0.4);
      --glass-blur: blur(20px);
      
      /* Typography defaults */
      --line-height-body: 1.6;
      --tracking-body: 0.01em;
      --hero-bg: radial-gradient(circle at top center, #1E1242 0%, #0A0A16 100%);
    }

    body {
      line-height: var(--line-height-body);
      letter-spacing: var(--tracking-body);
      background-color: var(--bg-light);
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      overflow-x: hidden;
    }

    /* Ultra-smooth transitions */
    .bg-main-dark, .bg-main-light, .bg-panel-white, 
    .text-main-dark, .text-main-light, .text-main-muted,
    .border-main-light, .border-main-dark {
      transition-property: background-color, color, border-color, box-shadow;
      transition-duration: 0.6s;
      transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
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
    .text-main-dark { color: var(--text-dark); }
    .text-main-light { color: var(--text-light); }
    .text-main-muted { color: var(--text-muted); }
    .border-main-light { border-color: var(--border-light); }
    .border-main-dark { border-color: var(--border-dark); }

    .smooth-transition { transition: all var(--anim-speed) cubic-bezier(0.22, 1, 0.36, 1); }
    
    @keyframes float { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-12px) rotate(0.5deg); } }
    @keyframes float-delayed { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-18px) rotate(-0.5deg); } }
    @keyframes pulse-soft { 0%, 100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.4); } 70% { box-shadow: 0 0 0 15px rgba(37, 211, 102, 0); } }
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

    .clamp-h1 { font-size: clamp(2.5rem, 6vw, 4.5rem); line-height: 1.05; letter-spacing: -0.02em; }
    .clamp-h2 { font-size: clamp(2rem, 4vw, 3.5rem); line-height: 1.15; letter-spacing: -0.02em; }
    .clamp-p { font-size: clamp(1.05rem, 2vw, 1.15rem); }

    .glass-card {
      background: rgba(255, 255, 255, 0.02);
      backdrop-filter: blur(20px);
      border-top: 1px solid rgba(255, 255, 255, 0.15);
      border-left: 1px solid rgba(255, 255, 255, 0.08);
      border-right: 1px solid rgba(255, 255, 255, 0.03);
      border-bottom: 1px solid rgba(255, 255, 255, 0.03);
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(255,255,255,0.02);
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
