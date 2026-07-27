import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number };

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let raf = 0;
    const pointer = { x: -9999, y: -9999 };
    let nodes: Node[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(90, Math.max(34, Math.round((width * height) / 18000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
      }));
    };

    const readColor = (name: string) =>
      getComputedStyle(document.documentElement).getPropertyValue(name).trim();

    const draw = () => {
      const primary = readColor("--primary") || "oklch(0.84 0.155 166)";
      const accent = readColor("--accent") || "oklch(0.68 0.15 264)";
      ctx.clearRect(0, 0, width, height);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
        const dx = n.x - pointer.x;
        const dy = n.y - pointer.y;
        const d = Math.hypot(dx, dy);
        if (d < 130 && d > 0.1) {
          n.x += (dx / d) * 0.7;
          n.y += (dy / d) * 0.7;
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 132) {
            const alpha = (1 - dist / 132) * 0.4;
            ctx.strokeStyle = `color-mix(in oklab, ${dist % 2 < 1 ? accent : primary} ${Math.round(alpha * 100)}%, transparent)`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        ctx.fillStyle = `color-mix(in oklab, ${primary} 70%, transparent)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = window.requestAnimationFrame(draw);
    };

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    resize();
    if (reduce) {
      draw();
      window.cancelAnimationFrame(raf);
    } else {
      draw();
    }
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointer);
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />;
}
