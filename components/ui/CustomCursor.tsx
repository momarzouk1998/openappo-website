"use client";

import React, { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailPosition, setTrailPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Mouse over interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.getAttribute("role") === "button" ||
        target.classList.contains("interactive")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  // Smooth trail effect
  useEffect(() => {
    let animationFrameId: number;
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const animateTrail = () => {
      setTrailPosition((prev) => ({
        x: lerp(prev.x, position.x, 0.18),
        y: lerp(prev.y, position.y, 0.18),
      }));
      animationFrameId = requestAnimationFrame(animateTrail);
    };

    animationFrameId = requestAnimationFrame(animateTrail);
    return () => cancelAnimationFrame(animationFrameId);
  }, [position]);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block">
      {/* Main Cursor Dot */}
      <div
        className={`fixed top-0 left-0 w-3 h-3 bg-[#00F0FF] rounded-full transition-transform duration-75 ease-out shadow-[0_0_12px_#00F0FF] ${
          isClicking ? "scale-50" : isHovered ? "scale-150 bg-[#7000FF] shadow-[0_0_20px_#7000FF]" : "scale-100"
        }`}
        style={{
          transform: `translate3d(${position.x - 6}px, ${position.y - 6}px, 0)`,
        }}
      />

      {/* Smooth Outer Neon Ring */}
      <div
        className={`fixed top-0 left-0 w-10 h-10 border border-[#00F0FF]/50 rounded-full transition-all duration-300 ease-out ${
          isHovered ? "scale-150 border-[#7000FF] bg-[#7000FF]/10 shadow-[0_0_25px_rgba(112,0,255,0.3)]" : "scale-100"
        }`}
        style={{
          transform: `translate3d(${trailPosition.x - 20}px, ${trailPosition.y - 20}px, 0)`,
        }}
      />
    </div>
  );
}
