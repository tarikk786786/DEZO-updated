import { useEffect } from 'react';

export const AnimatedFavicon = () => {
  useEffect(() => {
    let frame = 0;
    const favicon = document.getElementById('favicon') as HTMLLinkElement || document.createElement('link');
    favicon.id = 'favicon';
    favicon.rel = 'icon';
    document.head.appendChild(favicon);

    const icons = ['🚀', '⚡️', '💻', '🌐', '🔥', '✨'];
    const colors = ['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#EC4899'];
    
    const interval = setInterval(() => {
      frame = (frame + 1) % icons.length;
      const icon = icons[frame];
      const color = colors[frame];
      const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
          <rect width="100" height="100" rx="20" fill="${color}" />
          <text x="50%" y="54%" font-family="sans-serif" font-size="60" text-anchor="middle" dominant-baseline="middle">${icon}</text>
        </svg>
      `.trim();
      favicon.href = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return null;
};

