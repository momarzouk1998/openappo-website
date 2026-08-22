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
    badgeImage: "/maspero_3d_badge.jpg",
    badge: "شريك رئيسي",
    tags: ["Next.js", "Streaming API", "DigitalOcean"],
  },
  {
    id: "ai-engine",
    title: "منظومة الذكاء الاصطناعي",
    subtitle: "Openappo AI Suite & Neural Agents",
    description: "أنظمة مساعدين أذكياء ومعالجة لغة طبيعية متطورة مدمجة بالسحابة لخدمة قطاع الأعمال.",
    badgeImage: "/ai_suite_3d_badge.jpg",
    badge: "AI Powered",
    tags: ["Gemini AI", "Python SDK", "LLM Pipelines"],
  },
  {
    id: "cloud-infra",
    title: "البنية السحابية الرقمية",
    subtitle: "DigitalOcean Enterprise Cloud",
    description: "استضافة وإدارة خوادم متقدمة تضمن توازن الأحمال وقواعد بيانات فائقة الأداء 99.99%.",
    icon: Server,
    badge: "Cloud Infrastructure",
    tags: ["DigitalOcean", "Docker", "PostgreSQL"],
  },
  {
    id: "subdomains-hub",
    title: "شبكة التطبيقات الفرعية",
    subtitle: "Subdomain Microservices Hub",
    description: "مجموعة الحلول والأنظمة المستقلة المربوطة بالسوب دوت كوم التابع لـ Openappo.",
    icon: Globe,
    badge: "Active Ecosystem",
    tags: ["Microservices", "Subdomain Mesh", "REST APIs"],
  },
  {
    id: "ecommerce-erp",
    title: "منظومة إدارة الأعمال",
    subtitle: "Enterprise ERP & Commerce Engine",
    description: "لوحات تحكم ذكية لإدارة المبيعات والمخازن والتقارير التحليلية المباشرة.",
    icon: Layers,
    badge: "Business Platform",
    tags: ["React", "Analytics", "Realtime Sync"],
  },
  {
    id: "custom-forms",
    title: "منظومة النماذج الرقمية",
    subtitle: "100+ UI Form & Motion Components",
    description: "حزمة المكونات التفاعلية والتطبيقات السريعة المخصصة لتسريع بناء الواجهات.",
    icon: Sparkles,
    badge: "Custom UI Suite",
    tags: ["Tailwind CSS", "3D Motion", "Framer"],
  },
];

export default function PartnersSection() {
  return (
    <section id="partners" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D121D] border border-white/10 text-slate-300 text-xs font-mono mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#00D2F6]" />
          <span>OUR SUCCESS PARTNERS & ECOSYSTEM</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4 text-gradient-matte">
          شركاء النجاح والأنظمة المنجزة
        </h2>
        <p className="text-slate-400 text-base sm:text-lg font-normal">
          استعراض الشركاء والأنظمة المنجزة والمشغلة بنجاح تحت مظلة <span className="text-[#00D2F6] font-medium">OPENAPPO</span>.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {partners.map((partner) => {
          const IconComp = partner.icon;
          return (
            <GlassCard key={partner.id} className="flex flex-col justify-between h-full group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  {partner.badgeImage ? (
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-white/15 shadow-md">
                      <Image
                        src={partner.badgeImage}
                        alt={partner.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-[#080B11] border border-white/15 flex items-center justify-center">
                      {IconComp && <IconComp className="w-6 h-6 text-[#00D2F6]" />}
                    </div>
                  )}

                  <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2.5 py-1 rounded-full bg-[#080B11] border border-white/10 text-slate-300">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>{partner.badge}</span>
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#00D2F6] transition-colors">
                  {partner.title}
                </h3>
                <h4 className="text-xs font-mono text-slate-400 mb-3 dir-ltr text-right">
                  {partner.subtitle}
                </h4>

                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {partner.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {partner.tags.map((tag, idx) => (
                    <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-white/5">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="text-[#00D2F6] opacity-0 group-hover:opacity-100 transition-opacity">
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
