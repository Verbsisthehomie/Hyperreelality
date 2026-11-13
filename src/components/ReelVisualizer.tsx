import React, { useEffect, useRef } from 'react';

interface ReelVisualizerProps {
  shader: 'cyber_mesh' | 'vapor_glitch' | 'neural_scan' | 'quantum_matrix' | 'chroma_vhs' | 'biotech_pulse';
  authorGradient: string;
  soundPlaying: boolean;
}

export const ReelVisualizer: React.FC<ReelVisualizerProps> = ({ shader, authorGradient, soundPlaying }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      t += 0.03;
      const width = canvas.width;
      const height = canvas.height;

      // Base background clear
      ctx.fillStyle = '#080C14';
      ctx.fillRect(0, 0, width, height);

      if (shader === 'cyber_mesh') {
        ctx.strokeStyle = 'rgba(56, 242, 194, 0.35)';
        ctx.lineWidth = 1.2;
        const horizon = height * 0.55;
        const vanishingX = width * 0.5;
        for (let x = -width; x < width * 2; x += 30) {
          ctx.beginPath();
          ctx.moveTo(vanishingX, horizon);
          ctx.lineTo(x + ((t * 20) % 30), height);
          ctx.stroke();
        }
        for (let y = horizon; y < height; y += (y - horizon) * 0.25 + 4) {
          const shiftY = y + ((t * 15) % 15);
          if (shiftY < height) {
            ctx.beginPath();
            ctx.moveTo(0, shiftY);
            ctx.lineTo(width, shiftY);
            ctx.stroke();
          }
        }
        const cx = width / 2;
        const cy = horizon - 35;
        const size = 32 + Math.sin(t * 2) * 4;
        ctx.strokeStyle = '#FFB000';
        ctx.beginPath();
        ctx.arc(cx, cy, size, 0, Math.PI * 2);
        ctx.stroke();
        ctx.strokeStyle = 'rgba(56, 242, 194, 0.7)';
        ctx.strokeRect(cx - size * 0.7, cy - size * 0.7, size * 1.4, size * 1.4);
      } else if (shader === 'vapor_glitch') {
        const bars = 18;
        for (let i = 0; i < bars; i++) {
          const y = (i / bars) * height;
          const offset = Math.sin(t * 3 + i) * 12 * (Math.random() > 0.8 ? 2 : 1);
          ctx.fillStyle = 'rgba(255, 94, 91, 0.2)';
          ctx.fillRect(offset, y, width, height / bars - 2);
          ctx.fillStyle = 'rgba(56, 242, 194, 0.15)';
          ctx.fillRect(-offset, y + 1, width, height / bars - 2);
        }
        if (Math.sin(t * 8) > 0.7) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
          ctx.fillRect(0, Math.random() * height, width, 14);
        }
      } else if (shader === 'neural_scan') {
        const nodes = 12;
        ctx.fillStyle = '#38F2C2';
        ctx.strokeStyle = 'rgba(56, 242, 194, 0.2)';
        ctx.lineWidth = 1;
        const pts: Array<{ x: number; y: number }> = [];
        for (let i = 0; i < nodes; i++) {
          const px = (width * 0.2) + Math.cos(t + i * 1.2) * (width * 0.35);
          const py = (height * 0.4) + Math.sin(t * 1.3 + i * 0.8) * (height * 0.25);
          pts.push({ x: px, y: py });
          ctx.beginPath();
          ctx.arc(px, py, 3.5, 0, Math.PI * 2);
          ctx.fill();
        }
        for (let i = 0; i < pts.length; i++) {
          for (let j = i + 1; j < pts.length; j++) {
            const dist = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
            if (dist < 100) {
              ctx.beginPath();
              ctx.moveTo(pts[i].x, pts[i].y);
              ctx.lineTo(pts[j].x, pts[j].y);
              ctx.stroke();
            }
          }
        }
      } else if (shader === 'quantum_matrix') {
        ctx.fillStyle = 'rgba(56, 242, 194, 0.6)';
        ctx.font = '10px monospace';
        const cols = 14;
        for (let i = 0; i < cols; i++) {
          const x = i * (width / cols) + 8;
          const y = ((t * 40 + i * 28) % height);
          const glyph = Math.random() > 0.5 ? '0x' + Math.floor(Math.random() * 255).toString(16) : '[4.2%]';
          ctx.fillText(glyph, x, y);
        }
      } else if (shader === 'chroma_vhs') {
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, 'rgba(88, 28, 135, 0.35)');
        gradient.addColorStop(0.5, 'rgba(236, 72, 153, 0.25)');
        gradient.addColorStop(1, 'rgba(15, 23, 42, 0.8)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        const trackY = ((t * 30) % (height + 40)) - 20;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.fillRect(0, trackY, width, 24);

        ctx.fillStyle = '#FFB000';
        ctx.font = '11px monospace';
        ctx.fillText('REC 10.24.1999 [SP]', 18, height - 24);
      } else {
        ctx.strokeStyle = '#38F2C2';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let x = 0; x < width; x += 4) {
          const y = (height * 0.45) + Math.sin((x * 0.05) + t * 4) * 25 * Math.sin(t);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      if (soundPlaying) {
        ctx.fillStyle = 'rgba(56, 242, 194, 0.4)';
        const barCount = 18;
        const bw = width / (barCount * 1.5);
        for (let b = 0; b < barCount; b++) {
          const bh = (Math.sin(t * 10 + b) * 0.5 + 0.5) * 26 + 4;
          ctx.fillRect(16 + b * (bw + 3), height - 12 - bh, bw, bh);
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [shader, soundPlaying]);

  return (
    <div className="relative w-full h-full overflow-hidden select-none bg-[#090D16]">
      <canvas 
        ref={canvasRef} 
        width={360} 
        height={480} 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 scanlines opacity-40 pointer-events-none" />
      <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-[#38F2C2]/50 pointer-events-none" />
      <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-[#38F2C2]/50 pointer-events-none" />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-[#38F2C2]/50 pointer-events-none" />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-[#38F2C2]/50 pointer-events-none" />
    </div>
  );
};
