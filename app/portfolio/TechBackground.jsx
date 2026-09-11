"use client";

import { useEffect, useRef } from "react";

/**
 * Drifting node constellation behind the portfolio page.
 *
 * Deliberately NOT gated behind prefers-reduced-motion: the owner browses with
 * reduce enabled, and a background that silently freezes for them reads as a
 * broken page — the same trap that killed two earlier galleries here.
 * Cost is kept down instead: node count scales with viewport area and is
 * capped, dpr is capped at 2, and the loop stops while the tab is hidden.
 */
export default function TechBackground() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0, link = 150, nodes = [], rafId = 0, running = false;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    const build = () => {
      const perNode = w < 640 ? 15000 : 9500; // px² of canvas per node
      const n = Math.min(110, Math.max(24, Math.round((w * h) / perNode)));
      link = w < 640 ? 108 : 152;
      nodes = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        r: Math.random() * 1.5 + 0.7,
        accent: Math.random() < 0.13,
      }));
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    };

    const draw = () => {
      pointer.x += (pointer.tx - pointer.x) * 0.045;
      pointer.y += (pointer.ty - pointer.y) * 0.045;
      const px = pointer.x * 16;
      const py = pointer.y * 16;

      ctx.clearRect(0, 0, w, h);

      // Links first so nodes sit on top of them.
      const max2 = link * link;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        const ax = a.x + px * a.r * 0.3;
        const ay = a.y + py * a.r * 0.3;
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > max2) continue;
          const t = 1 - Math.sqrt(d2) / link;
          ctx.strokeStyle = `rgba(61,218,210,${(t * 0.2).toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.lineTo(b.x + px * b.r * 0.3, b.y + py * b.r * 0.3);
          ctx.stroke();
        }
      }

      for (const p of nodes) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -24) p.x = w + 24;
        else if (p.x > w + 24) p.x = -24;
        if (p.y < -24) p.y = h + 24;
        else if (p.y > h + 24) p.y = -24;

        ctx.beginPath();
        ctx.arc(p.x + px * p.r * 0.3, p.y + py * p.r * 0.3, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.accent
          ? "rgba(255,122,122,0.7)"
          : "rgba(61,218,210,0.55)";
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    };

    const start = () => {
      if (running) return;
      running = true;
      rafId = requestAnimationFrame(draw);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(rafId);
    };

    const onPointer = (e) => {
      pointer.tx = (e.clientX / w - 0.5) * 2;
      pointer.ty = (e.clientY / h - 0.5) * 2;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    let resizeTimer = 0;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    };

    resize();
    start();
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div className="pf-bg" aria-hidden="true">
      <span className="pf-bg-glow pf-bg-glow--a" />
      <span className="pf-bg-glow pf-bg-glow--b" />
      <span className="pf-bg-grid" />
      <canvas ref={ref} className="pf-bg-canvas" />
    </div>
  );
}
