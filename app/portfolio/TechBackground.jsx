"use client";

import { useEffect, useRef } from "react";

/**
 * Animated node-network backdrop. Deliberately NOT gated behind
 * prefers-reduced-motion: the owner browses with that setting on, and gating
 * motion behind it has already made two galleries look broken to them. Kept
 * cheap instead — particle count scales with viewport area, DPR is capped,
 * the loop is throttled to ~30fps and stops entirely while the tab is hidden.
 */
export default function TechBackground() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = 0, h = 0, dpr = 1, raf = 0, last = 0, stopped = false;
    let nodes = [];

    const LINK = 150;        // px: draw a line between nodes closer than this
    const FRAME = 1000 / 30; // throttle: 30fps is plenty for slow drift

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      // Decorative layer: render at 1x whatever the screen density.
      // At 1.5x on a 1440px desktop this cost 21fps on its own.
      dpr = 1;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = Math.round(
        Math.min(52, Math.max(20, (w * h) / 27000))
      );
      nodes = Array.from({ length: target }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.6 + 0.9,
        warm: Math.random() < 0.18, // a few coral accents among the teal
      }));
    };

    const draw = (t) => {
      if (stopped) return;
      raf = requestAnimationFrame(draw);
      if (t - last < FRAME) return;
      last = t;

      ctx.clearRect(0, 0, w, h);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -20) n.x = w + 20;
        else if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20;
        else if (n.y > h + 20) n.y = -20;
      }

      // links first, so nodes sit on top
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > LINK * LINK) continue;
          const alpha = (1 - Math.sqrt(d2) / LINK) * 0.42;
          ctx.strokeStyle = `rgba(61, 218, 210, ${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      for (const n of nodes) {
        ctx.fillStyle = n.warm
          ? "rgba(255, 122, 122, 0.9)"
          : "rgba(61, 218, 210, 0.9)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else if (!stopped) {
        last = 0;
        raf = requestAnimationFrame(draw);
      }
    };

    resize();
    raf = requestAnimationFrame(draw);

    let rt = 0;
    const onResize = () => {
      clearTimeout(rt);
      rt = setTimeout(resize, 180);
    };
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      clearTimeout(rt);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div className="pf-bg" aria-hidden="true">
      <div className="pf-bg-grid">
        <div className="pf-bg-grid-inner" />
      </div>
      <div className="pf-bg-glow pf-bg-glow--teal" />
      <div className="pf-bg-glow pf-bg-glow--coral" />
      <canvas ref={ref} className="pf-bg-canvas" />
      <div className="pf-bg-scrim" />
    </div>
  );
}
