"use client";

import React from "react";
import Image from "next/image";
import GlassCard from "../ui/GlassCard";
import { Sparkles, ExternalLink, ShieldCheck, Server, Radio, Bot, Globe, Layers } from "lucide-react";

const partners = [
  {
    id: "maspero",
    title: "منظومة ماسبيرو الرقمية",
    subtitle: "Maspero Media & Broadcast Platform",
    description: "بنية برمجية متكاملة مخصصة للمحتوى الإعلامي والبث الرقمي بأعلى معايير السرعة والأمان.",
    icon: Radio,
    badge: "شريك رئيسي",
    color: "from-cyan-500 to-blue-600",
    tags: ["Next.js", "Streaming API", "DigitalOcean"],
  },
  {
    id: "ai-engine",
    title: "منظومة الذكاء الاصطناعي",
    subtitle: "Openappo AI Suite & Neural Agents",
    description: "أنظمة مساعدين أذكياء ومعالجة لغة طبيعية متطورة مدمجة بالسحابة لخدمة قطاع الأعمال.",
    icon: Bot,
    badge: "AI Powered",
    color: "from-purple-500 to-indigo-600",
    tags: ["Gemini AI", "Python SDK", "LLM Pipelines"],
  },
  {
    id: "cloud-infra",
    title: "البنية السحابية الرقمية",
    subtitle: "DigitalOcean Enterprise Cloud",
    description: "استضافة وإدارة خوادم متقدمة تضمن توازن الأحمال وقواعد بيانات فائقة الأداء 99.99%.",
    icon: Server,
    badge: "Cloud Infrastructure",
    color: "from-blue-500 to-cyan-400",
    tags: ["DigitalOcean", "Docker", "PostgreSQL"],
  },
  {
    id: "subdomains-hub",
    title: "شبكة التطبيقات الفرعية",
    subtitle: "Subdomain Microservices Hub",
    description: "مجموعة الحلول والأنظمة المستقلة المربوطة بالسوب دوت كوم التابع لـ Openappo.",
    icon: Globe,
    badge: "Active Ecosystem",
    color: "from-emerald-400 to-teal-600",
    tags: ["Microservices", "Subdomain Mesh", "REST APIs"],
  },
  {
    id: "ecommerce-erp",
    title: "منظومة إدارة الأعمال",
    subtitle: "Enterprise ERP & Commerce Engine",
    description: "لوحات تحكم ذكية لإدارة المبيعات والمخازن والتقارير التحليلية المباشرة.",
    icon: Layers,
    badge: "Business Platform",
    color: "from-pink-500 to-purple-600",
    tags: ["React", "Analytics", "Realtime Sync"],
  },
  {
    id: "custom-forms",
    title: "منظومة النماذج الرقمية",
    subtitle: "100+ UI Form & Motion Components",
    description: "حزمة المكونات التفاعلية والتطبيقات السريعة المخصصة لتسريع بناء الواجهات.",
    icon: Sparkles,
    badge: "Custom UI Suite",
    color: "from-yellow-400 to-amber-600",
    tags: ["Tailwind CSS", "3D Motion", "Framer"],
  },
];

export default function PartnersSection() {
  return (
    <section id="partners" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      {/* Section Title Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7000FF]/15 border border-[#7000FF]/30 text-purple-300 text-xs font-mono mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#00F0FF]" />
          <span>OUR SUCCESS PARTNERS & ECOSYSTEM</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          شركاء النجاح والأنظمة المنجزة
        </h2>
        <p className="text-slate-400 text-base sm:text-lg">
          استعراض الشركاء والأنظمة التي تم تطويرها وتشغيلها بنجاح تحت مظلة <span className="text-[#00F0FF] font-semibold">OPENAPPO</span>.
        </p>
      </div>

      {/* Partners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {partners.map((partner) => {
          const IconComp = partner.icon;
          return (
            <GlassCard key={partner.id} className="flex flex-col justify-between h-full group">
              <div>
                {/* Top Badge & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${partner.color} p-0.5 shadow-[0_0_20px_rgba(0,240,255,0.3)] flex items-center justify-center`}>
                    <div className="w-full h-full bg-[#0B0F17] rounded-[10px] flex items-center justify-center">
                      <IconComp className="w-6 h-6 text-[#00F0FF]" />
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2.5 py-1 rounded-full bg-[#0D121C] border border-[#00F0FF]/30 text-cyan-300">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>{partner.badge}</span>
                  </span>
                </div>

                {/* Titles */}
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#00F0FF] transition-colors">
                  {partner.title}
                </h3>
                <h4 className="text-xs font-mono text-cyan-400/80 mb-3 dir-ltr text-right">
                  {partner.subtitle}
                </h4>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {partner.description}
                </p>
              </div>

              {/* Tags & Status */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {partner.tags.map((tag, idx) => (
                    <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="text-[#00F0FF] opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </section>
  );
}
