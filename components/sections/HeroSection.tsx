"use client";

import React from "react";
import Scene3D from "../canvas/Scene3D";
import MagneticButton from "../ui/MagneticButton";
import { Sparkles, ArrowLeft, Zap, Database, Server, Terminal, Shield } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-28 pb-16 overflow-hidden matte-bg">
      {/* 3D Precision Canvas Mesh Layer */}
      <div className="absolute inset-0 z-0 opacity-70">
        <Scene3D />
      </div>

      {/* Subtle Technical Grid Lines */}
      <div className="absolute inset-0 z-0 opacity-30 cyber-grid pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D121D] border border-white/10 text-xs font-mono text-slate-300 mb-8 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#00D2F6] animate-pulse" />
          <span className="tracking-wide text-slate-200 uppercase">
            OPENAPPO — ENTERPRISE SOFTWARE ARCHITECTURE
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-5xl leading-tight sm:leading-tight mb-6 text-gradient-matte">
          بناء الأنظمة السحابية والمنصات <br />
          <span className="text-gradient-brand">
            بأعلى معايير الدقة والذكاء الاصطناعي
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-base sm:text-lg text-slate-400 font-normal mb-10 leading-relaxed">
          المقَر الرئيسي لمنظومة <strong className="text-slate-200">OPENAPPO</strong> — متخصصون في بناء البرمجيات المعقدة، اللوحات الإدارية، قواعد البيانات، والأنظمة المربوطة بالسحابة مع أعلى أداء في محركات البحث (SEO).
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
          <MagneticButton href="#partners">
            <Database className="w-4 h-4 text-[#00D2F6]" />
            <span>استعراض الأنظمة وشركاء النجاح</span>
            <ArrowLeft className="w-4 h-4 text-slate-400 mr-1" />
          </MagneticButton>

          <a
            href="tel:01558282760"
            className="px-6 py-3 rounded-xl bg-[#0D121D] border border-white/10 hover:border-[#00D2F6]/50 text-slate-300 hover:text-white font-medium text-sm transition-all duration-200 flex items-center gap-2"
          >
            <Zap className="w-4 h-4 text-[#FF6B8B]" />
            <span>تواصل مباشر: 01558282760</span>
          </a>
        </div>

        {/* Clean Technical Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
          <div className="glass-panel p-5 text-center">
            <div className="text-xl sm:text-2xl font-bold font-orbitron text-[#00D2F6]">Next.js 14</div>
            <div className="text-xs text-slate-400 mt-1 font-mono">SSR Engine</div>
          </div>
          <div className="glass-panel p-5 text-center">
            <div className="text-xl sm:text-2xl font-bold font-orbitron text-[#FF6B8B]">DigitalOcean</div>
            <div className="text-xs text-slate-400 mt-1 font-mono">99.99% Uptime</div>
          </div>
          <div className="glass-panel p-5 text-center">
            <div className="text-xl sm:text-2xl font-bold font-orbitron text-slate-200">AI Neural</div>
            <div className="text-xs text-slate-400 mt-1 font-mono">LLM Pipelines</div>
          </div>
          <div className="glass-panel p-5 text-center">
            <div className="text-xl sm:text-2xl font-bold font-orbitron text-emerald-400">SEO 100/100</div>
            <div className="text-xs text-slate-400 mt-1 font-mono">Top Ranking</div>
          </div>
        </div>

      </div>
    </section>
  );
}
