"use client";

import React from "react";
import GlassCard from "../ui/GlassCard";
import { Cpu, Cloud, Code2, ShieldAlert, Zap, Search, Globe, Terminal } from "lucide-react";

const capabilities = [
  {
    icon: Cpu,
    title: "تطوير أنظمة الذكاء الاصطناعي (AI Engines)",
    description: "بناء وتكامل نماذج LLM والمساعدين التفاعليين مع معالجة سحابية فائقة السرعة.",
  },
  {
    icon: Code2,
    title: "مواقع 3D Motion وواجهات مستقبليّة",
    description: "تطوير تجارب تفاعلية ثلاثية الأبعاد باستخدام Three.js وWebGL وGSAP بدون التأثير على السرعة.",
  },
  {
    icon: Cloud,
    title: "البنية السحابية والخوادم (DigitalOcean Cloud)",
    description: "إدارة الخوادم وحمايتها وإعداد موازنة الأحمال والـ Microservices بكفاءة عالية.",
  },
  {
    icon: Search,
    title: "أعلى أداء SEO ومحركات البحث",
    description: "تهيأة صحية شاملة (Structured Data, OpenGraph, Metadata) لضمان الصدارة في جوجل.",
  },
  {
    icon: ShieldAlert,
    title: "الأمان السيبراني وحماية البيانات",
    description: "تشفير كامل وحماية من الهجمات وتطوير آمن وفق معايير OWASP القياسية.",
  },
  {
    icon: Terminal,
    title: "بناء الأنظمة المخصصة (Custom SaaS)",
    description: "تطوير منصات وإدارات كاملة تتناسب مع احتياجات العمل المعقدة والدقيقة.",
  },
];

export default function CapabilitiesSection() {
  return (
    <section id="capabilities" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-cyan-300 text-xs font-mono mb-4">
          <Zap className="w-3.5 h-3.5 text-[#00F0FF]" />
          <span>TECHNICAL SUPERPOWERS & CAPABILITIES</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          القدرات والخدمات البرمجية
        </h2>
        <p className="text-slate-400 text-base sm:text-lg">
          نظرة على الإمكانيات التقنية والحلول المتكاملة التي تقدمها منظومة <span className="text-[#00F0FF]">OPENAPPO</span>.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {capabilities.map((cap, idx) => {
          const IconComp = cap.icon;
          return (
            <GlassCard key={idx} className="relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="w-10 h-10 rounded-lg bg-[#00F0FF]/10 border border-[#00F0FF]/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <IconComp className="w-5 h-5 text-[#00F0FF]" />
              </div>

              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                {cap.title}
              </h3>
              
              <p className="text-sm text-slate-400 leading-relaxed">
                {cap.description}
              </p>
            </GlassCard>
          );
        })}
      </div>
    </section>
  );
}
