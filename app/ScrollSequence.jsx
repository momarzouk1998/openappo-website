"use client";

import { useEffect, useRef, useState } from "react";

const FRAME_COUNT = 60;

export default function ScrollSequence() {
  const canvasRef = useRef(null);
  const trackRef = useRef(null);
  const [showHero, setShowHero] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const track = trackRef.current;
    const ctx = canvas.getContext("2d", { alpha: false });

    // Under reduced-motion, map frames 1:1 to scroll position with no eased catch-up
    const ease = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? 1
      : 0.12;

    const cssWidth =
      window.innerWidth || document.documentElement.clientWidth || 1280;

    const framePath = (i) =>
      `/frames/frame-${String(i + 1).padStart(3, "0")}.jpg`;

    const isPhone = cssWidth < 768;
    const pxPerFrame = isPhone ? 70 : 105;
    track.style.height = `${FRAME_COUNT * pxPerFrame}px`;

    const images = new Array(FRAME_COUNT);
    let imgW = 1280;
    let imgH = 720;

    let currentFrame = 0;
    let targetFrame = 0;
    let lastDrawn = -1;
    let rafId = 0;
    let vw = 0;
    let vh = 0;

    const setCanvasSize = () => {
      vw = window.innerWidth;
      vh = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(vw * dpr);
      canvas.height = Math.round(vh * dpr);
      canvas.style.width = vw + "px";
      canvas.style.height = vh + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      lastDrawn = -1;
    };

    const drawFrame = (index) => {
      const img = images[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;
      const contain = vh > vw;

      if (contain) {
        const bgScale = Math.max(vw / imgW, vh / imgH) * 1.15;
        const bw = imgW * bgScale;
        const bh = imgH * bgScale;
        ctx.save();
        ctx.filter = "blur(28px) brightness(0.55)";
        ctx.drawImage(img, (vw - bw) / 2, (vh - bh) / 2, bw, bh);
        ctx.restore();

        const scale = Math.min(vw / imgW, vh / imgH);
        const w = imgW * scale;
        const h = imgH * scale;
        ctx.drawImage(img, (vw - w) / 2, (vh - h) / 2, w, h);
      } else {
        const scale = Math.max(vw / imgW, vh / imgH);
        const w = imgW * scale;
        const h = imgH * scale;
        ctx.drawImage(img, (vw - w) / 2, (vh - h) / 2, w, h);
      }
      lastDrawn = index;
    };

    const computeTarget = () => {
      const total = track.offsetHeight - window.innerHeight;
      const progress =
        total > 0 ? Math.min(Math.max(window.scrollY / total, 0), 1) : 0;
      targetFrame = progress * (FRAME_COUNT - 1);
    };

    const tick = () => {
      currentFrame += (targetFrame - currentFrame) * ease;
      if (Math.abs(targetFrame - currentFrame) < 0.001) currentFrame = targetFrame;
      const index = Math.round(currentFrame);
      if (index !== lastDrawn) drawFrame(index);

      rafId = requestAnimationFrame(tick);
    };

    const onScroll = () => computeTarget();

    let lastW = window.innerWidth;
    const onResize = () => {
      if (window.innerWidth === lastW) return;
      lastW = window.innerWidth;
      setCanvasSize();
      computeTarget();
      drawFrame(Math.round(currentFrame));
    };

    // Preload the sequence in order
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.decoding = "async";
      img.src = framePath(i);
      img.onload = () => {
        if (i === 0) {
          imgW = img.naturalWidth || imgW;
          imgH = img.naturalHeight || imgH;
          setCanvasSize();
          computeTarget();
          drawFrame(0);
          canvas.style.opacity = "1";
        } else if (Math.round(currentFrame) === i) {
          drawFrame(i);
        }
      };
      images[i] = img;
    }

    setCanvasSize();
    computeTarget();
    currentFrame = targetFrame;
    rafId = requestAnimationFrame(tick);

    // Hero text starts appearing smoothly after ~1.2s and stays fixed forever
    const heroTimer = setTimeout(() => {
      setShowHero(true);
    }, 1200);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      clearTimeout(heroTimer);
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div ref={trackRef} style={{ position: "relative", touchAction: "pan-y" }}>
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
          opacity: 0,
          transition: "opacity 0.5s ease",
          background: "#000",
        }}
      />

      {/* Persistent Hero Overlay with Openappo Brand Details */}
      <div className={`hero-overlay ${showHero ? "is-visible" : ""}`}>
        <div className="hero-tagline">
          <span className="hero-tagline-dot" />
          <span>منظومة إدارة وتطوير الأعمال الذكية • OPENAPPO</span>
        </div>

        <div className="hero-heading-group">
          <div className="hero-subtitle">حَــوّل شـغـلـك مـع</div>
          <h1 className="hero-main-title">Openappo</h1>
          <div className="hero-date">نظام سحابي متكامل يجمع كل تفاصيل مشروعك في مكان واحد</div>
        </div>

        <div className="hero-desc-container">
          <div className="hero-desc-bar" />
          <p className="hero-desc">
            ودّع فوضى الفواتير والإكسل المشتت. أدر مبيعاتك، مخزونك، وتقاريرك المالية والإدارية{" "}
            <span className="hero-desc-highlight">لحظة بلحظة وبأعلى كفاءة</span>، لاتخاذ قرارات أسرع وتنمية أرباحك بثقة.
          </p>
        </div>

        <div className="hero-actions">
          <a href="/portfolio" className="btn-explore">
            <span>استكشف حلولنا</span>
            <span className="btn-arrow-icon">←</span>
          </a>
          <a href="/contact" className="btn-watch">
            <span className="btn-play-circle">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </span>
            <span>تواصل معنا الآن</span>
          </a>
        </div>
      </div>

      {/* Bottom Floating Info Bar */}
      <div className={`hero-bottom-bar ${showHero ? "is-visible" : ""}`}>
        <div className="bottom-bar-item">
          <svg
            className="bottom-bar-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
          <span>حلول برمجية وسحابية مخصصة لنمو أعمالك</span>
        </div>
        <div className="bottom-bar-divider" />
        <div className="bottom-bar-item">
          <svg
            className="bottom-bar-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          <span>support@openappo.com</span>
        </div>
      </div>
    </div>
  );
}

