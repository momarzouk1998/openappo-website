"use client";

import { useEffect, useRef, useState } from "react";

const FRAME_COUNT = 60;

export default function ScrollSequence() {
  const canvasRef = useRef(null);
  const trackRef = useRef(null);
  const heroRef = useRef(null);
  const bottomBarRef = useRef(null);
  const contactWidgetRef = useRef(null);
  const scrollHintRef = useRef(null);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const track = trackRef.current;
    const hero = heroRef.current;
    const bottomBar = bottomBarRef.current;
    const contactWidget = contactWidgetRef.current;
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
      // - Hero card appears between 50% and 75% scroll
      // - Action buttons bar appears from 80% scroll onwards
      const progress = currentFrame / (FRAME_COUNT - 1);
      const heroProgress = Math.min(Math.max((progress - 0.50) / 0.25, 0), 1);
      const barProgress = Math.min(Math.max((progress - 0.80) / 0.18, 0), 1);
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
        bottomBar.style.opacity = barProgress.toFixed(3);
        bottomBar.style.transform = `translateX(-50%) translateY(${(20 * (1 - barProgress)).toFixed(1)}px)`;
        bottomBar.style.pointerEvents = barProgress > 0.4 ? "auto" : "none";
      }

      if (contactWidget) {
        contactWidget.style.opacity = barProgress.toFixed(3);
        contactWidget.style.transform = `translateY(${(20 * (1 - barProgress)).toFixed(1)}px)`;
        contactWidget.style.pointerEvents = barProgress > 0.4 ? "auto" : "none";
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

      {/* Initial Scroll Hint & Mobile Phone Gesture Animation */}
      <div ref={scrollHintRef} className="scroll-hint-wrapper">
        <div className="scroll-hint">
          <span className="scroll-hint-dot" />
          <span className="scroll-hint-text">اسحب أو مرّر للأسفل لاستكشاف</span>
          <span className="scroll-hint-brand">Openappo</span>
          <span className="scroll-hint-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </span>
        </div>

        {/* Animated Phone Gesture Guide (Mobile Only) */}
        <div className="mobile-swipe-guide">
          <div className="phone-mockup-frame">
            <div className="phone-mockup-speaker" />
            <div className="phone-mockup-screen">
              <div className="swipe-trail-glow" />
              <div className="swipe-hand-wrapper">
                <svg viewBox="0 0 24 24" fill="none" className="swipe-hand-svg">
                  <path
                    d="M9 11.25V4.5A1.5 1.5 0 0 1 10.5 3v0A1.5 1.5 0 0 1 12 4.5v6.75M12 9V6A1.5 1.5 0 0 1 13.5 4.5v0A1.5 1.5 0 0 1 15 6v3.75M15 9.75V7.5A1.5 1.5 0 0 1 16.5 6v0A1.5 1.5 0 0 1 18 7.5v3.75M9 11.25a2.25 2.25 0 0 0-2.25-2.25v0A2.25 2.25 0 0 0 4.5 11.25v3.75a6.75 6.75 0 0 0 6.75 6.75h.75a6.75 6.75 0 0 0 6.75-6.75v-5.25"
                    stroke="#ff7a7a"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div className="phone-mockup-homebar" />
          </div>
        </div>
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
            <h1 className="hero-main-title">
              <img
                src="/brand/openappo-wordmark-dark.png"
                alt="Openappo"
                className="hero-title-logo"
              />
            </h1>
            <div className="hero-date">نظام سحابي متكامل يجمع كل تفاصيل مشروعك في مكان واحد</div>
          </div>

          <div className="hero-desc-container">
            <div className="hero-desc-bar" />
            <p className="hero-desc">
              ودّع فوضى الفواتير والإكسل المشتت. أدر مبيعاتك، مخزونك، وتقاريرك المالية والإدارية{" "}
              <span className="hero-desc-highlight">لحظة بلحظة وبأعلى كفاءة</span>، لاتخاذ قرارات أسرع وتنمية أرباحك بثقة.
            </p>
          </div>

          {/* Option 1: Trust & Stats Bar */}
          <div className="hero-trust-bar">
            <div className="hero-trust-item">
              <span className="hero-trust-val">+500</span>
              <span className="hero-trust-lbl">شركة وثقت بنا</span>
            </div>
            <span className="hero-trust-divider">•</span>
            <div className="hero-trust-item">
              <span className="hero-trust-star">⭐</span>
              <span className="hero-trust-val">4.9/5</span>
              <span className="hero-trust-lbl">تقييم العملاء</span>
            </div>
            <span className="hero-trust-divider">•</span>
            <div className="hero-trust-item">
              <span className="hero-trust-icon">🛡️</span>
              <span className="hero-trust-lbl">دعم فني 24/7</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bottom Center Action Buttons Bar */}
      <div ref={bottomBarRef} className="hero-bottom-bar">
        <a href="/how-it-works" className="btn-how-it-works">
          <span className="btn-how-icon">⚡</span>
          <span>كيف نعمل</span>
        </a>

        <div className="bottom-bar-subrow">
          <a href="/portfolio" className="btn-explore">
            <span>سابقة الأعمال</span>
            <span className="btn-arrow-icon">←</span>
          </a>

          <a href="/testimonials" className="btn-testimonials">
            <span className="btn-star-icon">★</span>
            <span>آراء العملاء</span>
          </a>
        </div>

        {/* Option 2: Smart Feature Badges */}
        <div className="hero-feature-badges">
          <span className="feature-badge">
            <span className="badge-icon">☁️</span>
            <span>سحابي 100%</span>
          </span>
          <span className="feature-badge">
            <span className="badge-icon">📊</span>
            <span>تقارير لحظية</span>
          </span>
          <span className="feature-badge">
            <span className="badge-icon">⚡</span>
            <span>أعلى كفاءة</span>
          </span>
        </div>
      </div>

      {/* Floating Bottom-Left Contact Widget */}
      <div ref={contactWidgetRef} className="contact-float-widget">
        {contactOpen && (
          <div className="contact-float-menu">
            <div className="contact-menu-header">
              <span className="contact-menu-label">تواصل معنا المباشر</span>
              <a href="tel:01558282760" className="contact-menu-phone">
                01558282760
              </a>
            </div>

            <div className="contact-menu-actions">
              <a
                href="https://wa.me/201558282760"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-menu-btn btn-wa"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="contact-btn-icon">
                  <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.763.459 3.483 1.332 5.001l-1.417 5.176 5.297-1.389c1.464.798 3.116 1.218 4.777 1.219h.004c5.505 0 9.989-4.478 9.99-9.985.001-2.668-1.034-5.176-2.92-7.063a9.923 9.923 0 0 0-7.063-2.943zm5.834 14.162c-.247.694-1.436 1.326-1.986 1.391-.506.06-1.164.086-1.874-.14-1.157-.367-2.651-1.002-4.226-2.404-1.371-1.22-2.302-2.735-2.571-3.196-.27-.461-.029-.711.202-.94.208-.207.462-.538.693-.807.23-.27.307-.462.461-.77.154-.308.077-.577-.038-.808-.116-.231-1.038-2.502-1.423-3.426-.375-.901-.758-.778-1.038-.792-.269-.014-.577-.015-.885-.015s-.808.115-1.231.577c-.423.461-1.616 1.578-1.616 3.847 0 2.269 1.654 4.462 1.885 4.77 2.308 3.076 5.115 4.884 8.23 5.922.775.259 1.488.384 2.051.353.692-.038 2.154-.885 2.461-1.731.308-.846.308-1.577.215-1.731-.092-.154-.346-.246-.592-.37z"/>
                </svg>
                <span>محادثة واتساب</span>
              </a>

              <a href="tel:01558282760" className="contact-menu-btn btn-call">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="contact-btn-icon">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span>اتصال هاتفى</span>
              </a>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => setContactOpen(!contactOpen)}
          className={`contact-float-trigger ${contactOpen ? "is-active" : ""}`}
          aria-label="تواصل معنا"
        >
          <span className="contact-trigger-icon">
            {contactOpen ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.763.459 3.483 1.332 5.001l-1.417 5.176 5.297-1.389c1.464.798 3.116 1.218 4.777 1.219h.004c5.505 0 9.989-4.478 9.99-9.985.001-2.668-1.034-5.176-2.92-7.063a9.923 9.923 0 0 0-7.063-2.943zm5.834 14.162c-.247.694-1.436 1.326-1.986 1.391-.506.06-1.164.086-1.874-.14-1.157-.367-2.651-1.002-4.226-2.404-1.371-1.22-2.302-2.735-2.571-3.196-.27-.461-.029-.711.202-.94.208-.207.462-.538.693-.807.23-.27.307-.462.461-.77.154-.308.077-.577-.038-.808-.116-.231-1.038-2.502-1.423-3.426-.375-.901-.758-.778-1.038-.792-.269-.014-.577-.015-.885-.015s-.808.115-1.231.577c-.423.461-1.616 1.578-1.616 3.847 0 2.269 1.654 4.462 1.885 4.77 2.308 3.076 5.115 4.884 8.23 5.922.775.259 1.488.384 2.051.353.692-.038 2.154-.885 2.461-1.731.308-.846.308-1.577.215-1.731-.092-.154-.346-.246-.592-.37z"/>
              </svg>
            )}
          </span>
        </button>
      </div>
    </div>
  );
}


