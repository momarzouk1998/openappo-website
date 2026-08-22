"use client";

import React, { useState } from "react";
import Image from "next/image";
import MagneticButton from "../ui/MagneticButton";
import { Sparkles, ArrowLeft, Zap, Database, ShieldCheck, Activity, Terminal } from "lucide-react";

export default function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 20;
    const y = (clientY / innerHeight - 0.5) * 20;
    setMousePos({ x, y });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col items-center justify-center pt-28 pb-16 overflow-hidden cyber-glow-bg"
    >
      {/* Hero Atmosphere Grid Overlay */}
      <div className="absolute inset-0 z-0 opacity-40 cyber-grid pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Live Ecosystem Status Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A0F24]/90 border border-[#00D2F6]/30 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(0,210,246,0.2)] animate-float">
          <Sparkles className="w-4 h-4 text-[#FF6B8B]" />
          <span className="text-xs font-mono text-cyan-300 font-bold uppercase tracking-wider">
            OPENAPPO — NEXT-GEN DIGITAL ECOSYSTEM
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-5xl leading-tight sm:leading-tight mb-6">
          تطوير الأنظمة السحابية والمنصات <br />
          <span className="bg-gradient-to-r from-[#00D2F6] via-[#FF6B8B] to-[#7000FF] bg-clip-text text-transparent neon-text-cyan">
            بأعلى معايير 3D والذكاء الاصطناعي
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-lg sm:text-xl text-slate-300 font-light mb-10 leading-relaxed">
          المقَر والمركز الرئيسي لمنظومة <strong className="text-[#00D2F6]">OPENAPPO</strong> — تطوير الأنظمة المعقدة، اللوحات الإدارية، قواعد البيانات، والحلول البرمجية المستقبلية بأعلى أداء في محركات البحث (SEO).
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-14">
          <MagneticButton href="#partners">
            <Database className="w-5 h-5 text-[#00D2F6]" />
            <span>استعراض الأنظمة وشركاء النجاح</span>
            <ArrowLeft className="w-4 h-4 text-[#FF6B8B] mr-1" />
          </MagneticButton>

          <a
            href="tel:01558282760"
            className="px-6 py-3.5 rounded-xl bg-[#0A0F24]/90 border border-slate-700 hover:border-[#FF6B8B] text-slate-200 hover:text-white font-semibold transition-all duration-300 flex items-center gap-2 hover:shadow-[0_0_20px_rgba(255,107,139,0.3)]"
          >
            <Zap className="w-4 h-4 text-yellow-400" />
            <span>تواصل مباشر: 01558282760</span>
          </a>
        </div>

        {/* ULTRA PROFESSIONAL 3D HERO RENDER DISPLAY WITH PARALLAX & GLASS CONTAINER */}
        <div className="relative w-full max-w-5xl my-6 group perspective-1000">
          {/* Conic Glowing Frame */}
          <div
            className="relative rounded-3xl p-[2px] bg-gradient-to-r from-[#00D2F6] via-[#FF6B8B] to-[#7000FF] shadow-[0_0_50px_rgba(0,210,246,0.3)] transition-transform duration-300 ease-out"
            style={{
              transform: `rotateX(${-mousePos.y * 0.5}deg) rotateY(${mousePos.x * 0.5}deg)`,
            }}
          >
            <div className="relative rounded-[22px] overflow-hidden bg-[#060B1E] aspect-[16/9] shadow-2xl">
              <Image
                src="/openappo_hero_3d_render.jpg"
                alt="OPENAPPO Official 3D Render Display"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                priority
              />
              {/* Glass Scanlines Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#060B1E] via-transparent to-transparent opacity-80" />
              
              {/* Floating Real-time Status Badges on Top of Image */}
              <div className="absolute bottom-6 right-6 hidden sm:flex items-center gap-3 px-4 py-2 rounded-xl bg-[#060B1E]/80 backdrop-blur-md border border-[#00D2F6]/30 text-xs font-mono text-cyan-300 shadow-lg">
                <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>3D Render Engine Active • 60 FPS</span>
              </div>

              <div className="absolute bottom-6 left-6 hidden sm:flex items-center gap-3 px-4 py-2 rounded-xl bg-[#060B1E]/80 backdrop-blur-md border border-[#FF6B8B]/30 text-xs font-mono text-pink-300 shadow-lg">
                <ShieldCheck className="w-4 h-4 text-[#FF6B8B]" />
                <span>Enterprise Verified Security</span>
              </div>
            </div>
          </div>
        </div>

        {/* Real Technical Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl mt-8">
          <div className="glass-panel p-4 rounded-xl text-center border-t-2 border-t-[#00D2F6]">
            <div className="text-2xl font-bold font-orbitron text-[#00D2F6]">Next.js 14</div>
            <div className="text-xs text-slate-400 mt-1">بنية SSR فائقة السرعة</div>
          </div>
          <div className="glass-panel p-4 rounded-xl text-center border-t-2 border-t-[#FF6B8B]">
            <div className="text-2xl font-bold font-orbitron text-[#FF6B8B]">DigitalOcean</div>
            <div className="text-xs text-slate-400 mt-1">استضافة سحابية 99.99%</div>
          </div>
          <div className="glass-panel p-4 rounded-xl text-center border-t-2 border-t-[#7000FF]">
            <div className="text-2xl font-bold font-orbitron text-purple-400">AI Pipelines</div>
            <div className="text-xs text-slate-400 mt-1">ذكاء اصطناعي مدمج</div>
          </div>
          <div className="glass-panel p-4 rounded-xl text-center border-t-2 border-t-emerald-400">
            <div className="text-2xl font-bold font-orbitron text-emerald-400">SEO 100/100</div>
            <div className="text-xs text-slate-400 mt-1">أعلى تصنيف في جوجل</div>
          </div>
        </div>

      </div>
    </section>
  );
}
