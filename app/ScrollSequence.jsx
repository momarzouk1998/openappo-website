"use client";

import { useEffect, useRef } from "react";

const FRAME_COUNT = 60;
const FRAME_PATH = (i) =>
  `/frames/frame-${String(i + 1).padStart(3, "0")}.jpg`;

// Vertical scroll distance (in px) allotted to each frame. Higher = slower,
// smoother scrub.
const PX_PER_FRAME = 110;

export default function ScrollSequence() {
  const canvasRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const track = trackRef.current;
    const ctx = canvas.getContext("2d");

    const images = new Array(FRAME_COUNT);
    let imgW = 1280;
    let imgH = 720;

    let currentFrame = 0; // eased value
    let targetFrame = 0;
    let lastDrawn = -1;
    let rafId = 0;

    const setCanvasSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      lastDrawn = -1;
    };

    const drawFrame = (index) => {
      const img = images[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const scale = Math.max(vw / imgW, vh / imgH);
      const w = imgW * scale;
      const h = imgH * scale;
      const x = (vw - w) / 2;
      const y = (vh - h) / 2;

      ctx.clearRect(0, 0, vw, vh);
      ctx.drawImage(img, x, y, w, h);
      lastDrawn = index;
    };

    const computeTarget = () => {
      const total = track.offsetHeight - window.innerHeight;
      const progress = total > 0 ? Math.min(Math.max(window.scrollY / total, 0), 1) : 0;
      targetFrame = progress * (FRAME_COUNT - 1);
    };

    const tick = () => {
      currentFrame += (targetFrame - currentFrame) * 0.12;
      if (Math.abs(targetFrame - currentFrame) < 0.001) currentFrame = targetFrame;

      const index = Math.round(currentFrame);
      if (index !== lastDrawn) drawFrame(index);

      rafId = requestAnimationFrame(tick);
    };

    const onScroll = () => computeTarget();
    const onResize = () => {
      setCanvasSize();
      computeTarget();
      drawFrame(Math.round(currentFrame));
    };

    // Preload every frame.
    let loaded = 0;
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.onload = () => {
        loaded++;
        if (i === 0) {
          imgW = img.naturalWidth || imgW;
          imgH = img.naturalHeight || imgH;
          setCanvasSize();
          computeTarget();
          drawFrame(0);
          canvas.style.opacity = "1";
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
    <div
      ref={trackRef}
      style={{ height: `${FRAME_COUNT * PX_PER_FRAME}px`, position: "relative" }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
          opacity: 0,
          transition: "opacity 0.6s ease",
          background: "#000",
        }}
      />
    </div>
  );
}
