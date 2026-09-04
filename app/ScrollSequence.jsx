"use client";

import { useEffect, useRef } from "react";

const FRAME_COUNT = 60;

export default function ScrollSequence() {
  const canvasRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const track = trackRef.current;
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
      // Portrait (phones): "contain" so the whole frame is always visible —
      // no side-cropping. Landscape: "cover" to fill the screen edge to edge.
      const contain = vh > vw;
      const scale = contain
        ? Math.min(vw / imgW, vh / imgH)
        : Math.max(vw / imgW, vh / imgH);
      const w = imgW * scale;
      const h = imgH * scale;
      if (contain) {
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, vw, vh);
      }
      ctx.drawImage(img, (vw - w) / 2, (vh - h) / 2, w, h);
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
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div ref={trackRef} style={{ position: "relative", touchAction: "pan-y" }}>
      <canvas
        ref={canvasRef}
        style={{
          position: "sticky",
          top: 0,
          width: "100vw",
          height: "100vh",
          display: "block",
          opacity: 0,
          transition: "opacity 0.5s ease",
          background: "#000",
        }}
      />
    </div>
  );
}
