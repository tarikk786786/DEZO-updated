import { useEffect } from 'react';

export const AnimatedFavicon = () => {
  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Remove existing favicons to ensure ours takes precedence
    const existingIcons = document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]');
    existingIcons.forEach(icon => {
      if (icon.parentNode) icon.parentNode.removeChild(icon);
    });

    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/png';
    document.head.appendChild(link);
    
    let hue = 0;
    let frame = 0;
    let animId: number;
    let timeoutId: ReturnType<typeof setTimeout>;

    const emojis = ['⚡', '🚀', '🔥', '✨', '💎'];

    const drawPattern = () => {
      ctx.clearRect(0, 0, 64, 64);
      
      // Color change
      hue = (hue + 45) % 360;
      frame++;

      // Background with animated gradient
      const gradient = ctx.createLinearGradient(0, 0, 64, 64);
      gradient.addColorStop(0, `hsl(${hue}, 100%, 60%)`);
      gradient.addColorStop(1, `hsl(${(hue + 60) % 360}, 100%, 50%)`);
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      // Bouncing block effect
      const rectScale = 1 + (frame % 2 === 0 ? 0.05 : 0);
      ctx.save();
      ctx.translate(32, 32);
      ctx.scale(rectScale, rectScale);
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(-28, -28, 56, 56, 16);
      } else {
        ctx.rect(-28, -28, 56, 56);
      }
      ctx.fill();
      
      // Flashing Border
      ctx.lineWidth = 4;
      ctx.strokeStyle = `hsl(${(hue + 180) % 360}, 100%, 70%)`;
      ctx.stroke();
      ctx.restore();

      // Content inside (Text "D" or Emoji)
      ctx.save();
      ctx.translate(32, 32);
      
      if (frame % 4 < 2) {
        // Draw the letter D
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = 'rgba(0,0,0,0.8)';
        ctx.shadowBlur = 6;
        ctx.shadowOffsetY = 2;
        ctx.font = '900 38px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('D', 0, 4);
      } else {
        // Draw an emoji
        const emojiIndex = Math.floor(frame / 4) % emojis.length;
        ctx.font = '32px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(emojis[emojiIndex], 0, 4);
      }

      ctx.restore();

      link.href = canvas.toDataURL('image/png');
      
      // Update timeout to control speed (approx 2 frames per second to avoid freezing browser)
      timeoutId = setTimeout(() => {
        animId = requestAnimationFrame(drawPattern);
      }, 500);
    };

    drawPattern();

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(animId);
      if (link.parentNode) link.parentNode.removeChild(link);
    };
  }, []);

  return null;
};
