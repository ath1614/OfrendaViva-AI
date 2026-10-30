import React, { useEffect, useRef } from 'react';

interface ParticlesProps {
  mode: 'ofrenda' | 'ghost';
  density?: number;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  wobble: number;
  wobbleSpeed: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  opacity: number;
  aspectRatio: number;
}

export const Particles: React.FC<ParticlesProps> = ({ mode, density = 45, className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const marigoldColors = [
      '#FF9F1C', // Vivid amber orange
      '#FFAA00', // Deep gold
      '#FF5400', // Terracotta orange
      '#FFE169', // Bright marigold yellow
      '#E36414', // Rich cempasúchil rust
    ];

    const ghostColors = [
      '#00FF88', // Green phosphor
      '#39FF14', // Neon terminal green
      '#00F5D4', // Ethereal teal
      '#70E000', // Ghost flame lime
      '#00BB77', // Dim CRT green
    ];

    const colors = mode === 'ofrenda' ? marigoldColors : ghostColors;

    const particles: Particle[] = Array.from({ length: density }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: mode === 'ofrenda' ? Math.random() * 8 + 5 : Math.random() * 4 + 2,
      speedY: mode === 'ofrenda' ? Math.random() * 1.2 + 0.6 : -(Math.random() * 0.9 + 0.3),
      speedX: (Math.random() - 0.5) * 0.6,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.04 + 0.02,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.03,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.6 + 0.3,
      aspectRatio: mode === 'ofrenda' ? Math.random() * 0.5 + 0.6 : 1,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.wobble += p.wobbleSpeed;
        p.rotation += p.rotationSpeed;
        p.y += p.speedY;
        p.x += Math.sin(p.wobble) * 0.8 + p.speedX;

        // Wrap around boundaries
        if (mode === 'ofrenda' && p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        } else if (mode === 'ghost' && p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }

        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;

        if (mode === 'ofrenda') {
          // Draw organic petal oval
          ctx.beginPath();
          ctx.fillStyle = p.color;
          ctx.ellipse(0, 0, p.size, p.size * p.aspectRatio, 0, 0, Math.PI * 2);
          ctx.fill();

          // Subtle petal central vein
          ctx.strokeStyle = 'rgba(255, 230, 150, 0.4)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(-p.size * 0.6, 0);
          ctx.lineTo(p.size * 0.6, 0);
          ctx.stroke();
        } else {
          // Ghost phosphor spark
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 8;
          ctx.shadowColor = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mode, density]);

  return <canvas ref={canvasRef} className={`pointer-events-none fixed inset-0 z-0 ${className}`} />;
};
