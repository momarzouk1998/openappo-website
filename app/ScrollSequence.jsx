"use client";

import { useEffect, useRef } from "react";

const FRAME_COUNT = 60;

const END_LINKS = [
  { href: "/portfolio", label: "سابقة أعمالنا" },
  { href: "/testimonials", label: "آراء العملاء" },
  { href: "/contact", label: "تواصل بينا" },
];

// Frame ranges are 0-indexed (frame 1 in the storyboard == index 0). Each
// caption is a solid brand-colored box that slides up from below and holds
// still — no continuous scroll-linked fade — until its range ends, then it
// drops back out before the next one slides in.
const CAPTIONS = [
  { from: 0, to: 8, text: "لسه بتدوّر في الفواتير والإكسل؟", accent: "coral" },
  { from: 19, to: 30, text: "Openappo بيحوّل شغلك كله لمكان واحد", accent: "teal" },
  { from: 44, to: 54, text: "كل حاجة قدامك، لحظة بلحظة", accent: "coral" },
  // Ends at 57, not 59: the end-of-scroll CTA fades in at FRAME_COUNT - 1.5
  // (~58.5), so this needs to have fully dropped out before then.
  { from: 55, to: 57, text: "قرارات أسرع، نتائج أوضح", accent: "teal" },
];

function captionIndexForFrame(frame) {
  for (let i = 0; i < CAPTIONS.length; i++) {
    if (frame >= CAPTIONS[i].from && frame <= CAPTIONS[i].to) return i;
  }
  return -1;
}

export default function ScrollSequence() {
  const canvasRef = useRef(null);
  const trackRef = useRef(null);
  const ctaRef = useRef(null);
  const captionRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const track = trackRef.current;
    const cta = ctaRef.current;
    const caption = captionRef.current;
    const ctx = canvas.getContext("2d", { alpha: false });

    // Under reduced-motion, map frames 1:1 to scroll position with no eased
    // "catch-up" motion — the sequence stays fully user-controlled.
    const ease = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? 1
      : 0.12;

    // Viewport width (fall back to a desktop value if it reads as 0, e.g. an
    // off-screen render, so we never lock into the mobile tier by mistake).
    const cssWidth =
      window.innerWidth || document.documentElement.clientWidth || 1280;

    // Single full-quality source (1920x1080, q92 mozjpeg). No downscaled tiers —
    // image fidelity is the priority; the browser caches each frame after the
    // first pass.
    const framePath = (i) =>
      `/frames/frame-${String(i + 1).padStart(3, "0")}.jpg`;

    // Shorter scrub distance on phones so the sequence doesn't feel endless.
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
    let ctaShown = false;
    let activeCaptionIndex = -1;

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
      // Portrait (phones): the frame can't cover the screen without cropping
      // people/content off the sides, so it's shown whole ("contain") with a
      // softly blurred, darkened copy of the same frame filling the bars
      // behind it instead of flat black. Landscape: "cover" fills edge to edge.
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

      const shouldShow = targetFrame >= FRAME_COUNT - 1.5;
      if (shouldShow !== ctaShown) {
        ctaShown = shouldShow;
        cta.style.opacity = shouldShow ? "1" : "0";
        cta.style.pointerEvents = shouldShow ? "auto" : "none";
      }

      const idx = captionIndexForFrame(Math.round(currentFrame));
      if (idx !== activeCaptionIndex) {
        activeCaptionIndex = idx;
        // Drop the box out first...
        caption.classList.remove("scroll-caption-show");
        if (idx !== -1) {
          const c = CAPTIONS[idx];
          // ...then, after the drop-out transition, load the new text/color
          // and slide the box back up into place.
          window.clearTimeout(caption._swapTimer);
          caption._swapTimer = window.setTimeout(() => {
            caption.textContent = c.text;
            caption.dataset.accent = c.accent;
            caption.classList.add("scroll-caption-show");
          }, 220);
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    const onScroll = () => computeTarget();

    let lastW = window.innerWidth;
    const onResize = () => {
      // Ignore height-only changes (mobile browser chrome showing/hiding).
      if (window.innerWidth === lastW) return;
      lastW = window.innerWidth;
      setCanvasSize();
      computeTarget();
      drawFrame(Math.round(currentFrame));
    };

    // Preload the sequence in order (== scroll priority from the top).
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
      window.clearTimeout(caption._swapTimer);
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
      <div ref={captionRef} className="scroll-caption" />
      <div ref={ctaRef} className="scroll-end-cta">
        {END_LINKS.map((l) => (
          <a key={l.href} href={l.href} className="scroll-end-cta-link">
            {l.label}
          </a>
        ))}
      </div>
    </div>
  );
}
