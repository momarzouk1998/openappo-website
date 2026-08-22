"use client";

import React, { useRef, useState } from "react";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}

export default function MagneticButton({
  children,
  className = "",
  onClick,
  href,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - (left + width / 2);
    const y = e.clientY - (top + height / 2);
    setPosition({ x: x * 0.2, y: y * 0.2 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const content = (
    <div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
      className={`relative inline-flex items-center justify-center gap-2 rounded-xl bg-slate-800 p-[1px] transition-all duration-200 cursor-pointer border border-white/10 hover:border-[#00D2F6]/60 ${className}`}
    >
      <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-[#0D121D] px-6 py-3 text-sm font-medium text-slate-200 transition-colors duration-200 hover:text-white">
        {children}
      </div>
    </div>
  );

  if (href) {
    return <a href={href}>{content}</a>;
  }

  return content;
}
