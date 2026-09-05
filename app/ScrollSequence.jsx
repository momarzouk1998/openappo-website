"use client";

import { useEffect, useRef } from "react";

const FRAME_COUNT = 60;

export default function ScrollSequence() {
  const canvasRef = useRef(null);
  const trackRef = useRef(null);
  const heroRef = useRef(null);
  const bottomBarRef = useRef(null);
  const scrollHintRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const track = trackRef.current;
    const hero = heroRef.current;
    const bottomBar = bottomBarRef.current;
    const scrollHint = scrollHintRef.current;
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
        // Soft ambient background
        const bgScale = Math.max(vw / imgW, vh / imgH) * 1.15;
        const bw = imgW * bgScale;
        const bh = imgH * bgScale;
        ctx.save();
        ctx.filter = "blur(28px) brightness(0.4)";
        ctx.drawImage(img, (vw - bw) / 2, (vh - bh) / 2, bw, bh);
        ctx.restore();

        // Pin video frame cleanly at the upper section of phone screen
        const topOffset = Math.max(56, Math.min(68, Math.round(vh * 0.08)));
        const scale = vw / imgW;
        const w = vw;
        const h = Math.round(imgH * scale);
        ctx.drawImage(img, 0, topOffset, w, h);

        // Soft gradient fade at bottom of video frame for smooth transition
        ctx.save();
        const grad = ctx.createLinearGradient(0, topOffset + h - 24, 0, topOffset + h);
        grad.addColorStop(0, "rgba(0,0,0,0)");
        grad.addColorStop(1, "rgba(0,0,0,0.85)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, topOffset + h - 24, w, 24);
        ctx.restore();
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

      // Progressive entrance tied to scroll position:
      // - Before 45% scroll (progress < 0.45): Hero is hidden, scroll hint is visible
      // - Between 45% and 65% scroll: Hero smoothly fades in and slides up into bottom-right corner
      // - Past 65% scroll: Hero reaches 100% full opacity and remains firmly locked in place
      const progress = currentFrame / (FRAME_COUNT - 1);
      const heroProgress = Math.min(Math.max((progress - 0.45) / 0.20, 0), 1);
      const hintProgress = Math.max(1 - progress / 0.35, 0);

      if (hero) {
        hero.style.opacity = heroProgress.toFixed(3);
        if (vw < 768) {
          hero.style.transform = `translateY(${(20 * (1 - heroProgress)).toFixed(1)}px)`;
        } else {
          hero.style.transform = `translateY(${(32 * (1 - heroProgress)).toFixed(1)}px)`;
        }
        hero.style.pointerEvents = heroProgress > 0.4 ? "auto" : "none";
      }

      if (bottomBar) {
        bottomBar.style.opacity = heroProgress.toFixed(3);
        bottomBar.style.transform = `translateX(-50%) translateY(${(20 * (1 - heroProgress)).toFixed(1)}px)`;
        bottomBar.style.pointerEvents = heroProgress > 0.4 ? "auto" : "none";
      }

      if (scrollHint) {
        scrollHint.style.opacity = hintProgress.toFixed(3);
        scrollHint.style.pointerEvents = hintProgress > 0.2 ? "auto" : "none";
      }

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

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
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

      {/* Initial Scroll Hint to invite user to scroll */}
      <div ref={scrollHintRef} className="scroll-hint">
        <span>مرّر للأسفل لاستكشاف Openappo</span>
        <span className="scroll-hint-arrow">↓</span>
      </div>

      {/* Progressive Hero Overlay inside frosted dark glass card */}
      <div ref={heroRef} className="hero-overlay">
        <div className="hero-glass-card">
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
              <span>سابقة الأعمال</span>
              <span className="btn-arrow-icon">←</span>
            </a>
            <a
              href="https://wa.me/201558282760"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              <span className="btn-whatsapp-circle">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.763.459 3.483 1.332 5.001l-1.417 5.176 5.297-1.389c1.464.798 3.116 1.218 4.777 1.219h.004c5.505 0 9.989-4.478 9.99-9.985.001-2.668-1.034-5.176-2.92-7.063a9.923 9.923 0 0 0-7.063-2.943zm5.834 14.162c-.247.694-1.436 1.326-1.986 1.391-.506.06-1.164.086-1.874-.14-1.157-.367-2.651-1.002-4.226-2.404-1.371-1.22-2.302-2.735-2.571-3.196-.27-.461-.029-.711.202-.94.208-.207.462-.538.693-.807.23-.27.307-.462.461-.77.154-.308.077-.577-.038-.808-.116-.231-1.038-2.502-1.423-3.426-.375-.901-.758-.778-1.038-.792-.269-.014-.577-.015-.885-.015s-.808.115-1.231.577c-.423.461-1.616 1.578-1.616 3.847 0 2.269 1.654 4.462 1.885 4.77 2.308 3.076 5.115 4.884 8.23 5.922.775.259 1.488.384 2.051.353.692-.038 2.154-.885 2.461-1.731.308-.846.308-1.577.215-1.731-.092-.154-.346-.246-.592-.37z"/>
                </svg>
              </span>
              <span>01558282760 واتساب</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}


