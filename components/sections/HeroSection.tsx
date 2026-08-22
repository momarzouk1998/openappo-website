"use client";

import React from "react";
import Scene3D from "../canvas/Scene3D";
import MagneticButton from "../ui/MagneticButton";
import { Server, ArrowLeft, Rocket, Zap, Database, Code, ShieldCheck } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* 3D System Canvas Background */}
      <div className="absolute inset-0 z-0 opacity-85">
        <Scene3D />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Software House & System Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0D121C]/90 border border-[#00F0FF]/30 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(0,240,255,0.15)] animate-float">
          <Server className="w-4 h-4 text-[#00F0FF]" />
          <span className="text-xs font-mono text-cyan-300 font-semibold uppercase tracking-wider">
            OPENAPPO — ENTERPRISE SOFTWARE & SYSTEM ARCHITECTURE
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-5xl leading-tight sm:leading-tight mb-6">
          تطوير الأنظمة السحابية والمنصات الرقمية <br />
          <span className="bg-gradient-to-r from-[#00F0FF] via-[#0070F3] to-[#7000FF] bg-clip-text text-transparent neon-text-cyan">
            بأعلى معايير الأداء والذكاء الاصطناعي
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-lg sm:text-xl text-slate-300 font-light mb-10 leading-relaxed">
          المقَر والمركز الرئيسي لمنظومة <strong className="text-cyan-400">OPENAPPO</strong> — متخصصون في بناء البرمجيات المعقدة، اللوحات الإدارية، قواعد البيانات، والأنظمة المربوطة بالسحابة مع أعلى أداء في محركات البحث (SEO).
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
          <MagneticButton href="#partners">
            <Database className="w-5 h-5 text-[#00F0FF]" />
            <span>استعراض الأنظمة والشركاء</span>
            <ArrowLeft className="w-4 h-4 text-cyan-400 mr-1" />
          </MagneticButton>

          <a
            href="tel:01558282760"
            className="px-6 py-3.5 rounded-xl bg-[#0D121C]/90 border border-slate-700 hover:border-[#00F0FF] text-slate-200 hover:text-white font-semibold transition-all duration-300 flex items-center gap-2 hover:shadow-[0_0_20px_rgba(0,240,255,0.2)]"
          >
            <Zap className="w-4 h-4 text-yellow-400" />
            <span>تواصل مباشر: 01558282760</span>
          </a>
        </div>

        {/* Real Software Highlights & Technical Specs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
          <div className="glass-panel p-4 rounded-xl text-center">
            <div className="text-2xl font-bold font-orbitron text-[#00F0FF]">Next.js 14</div>
            <div className="text-xs text-slate-400 mt-1">بنية SSR فائقة السرعة</div>
          </div>
          <div className="glass-panel p-4 rounded-xl text-center">
            <div className="text-2xl font-bold font-orbitron text-[#7000FF]">DigitalOcean</div>
            <div className="text-xs text-slate-400 mt-1">استضافة سحابية 99.99%</div>
          </div>
          <div className="glass-panel p-4 rounded-xl text-center">
            <div className="text-2xl font-bold font-orbitron text-cyan-400">AI Pipelines</div>
            <div className="text-xs text-slate-400 mt-1">ذكاء اصطناعي مدمج</div>
          </div>
          <div className="glass-panel p-4 rounded-xl text-center">
            <div className="text-2xl font-bold font-orbitron text-emerald-400">SEO 100/100</div>
            <div className="text-xs text-slate-400 mt-1">أعلى تصنيف في جوجل</div>
          </div>
        </div>
      </div>
    </section>
  );
}
