"use client";

import React from "react";
import Image from "next/image";
import { ChevronUp, ShieldCheck, Heart } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-slate-800/80 bg-[#05070B] pt-16 pb-12 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden p-1 bg-gradient-to-tr from-[#00F0FF] to-[#7000FF]">
                <Image
                  src="/Openappo_04_Transparent_Logo.png"
                  alt="OPENAPPO Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-orbitron font-bold text-2xl text-white">OPENAPPO</span>
            </div>

            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              منظومة برمجية سحابية متطورة توفر حلول الذكاء الاصطناعي والمواقع ثلاثية الأبعاد المتقدمة مع أعلى درجات التوافق مع محركات البحث العالمية.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <ShieldCheck className="w-4 h-4" />
              <span>DigitalOcean Verified Ecosystem Infrastructure</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">روابط سريعة</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-[#00F0FF] transition-colors">الرئيسية</a></li>
              <li><a href="#partners" className="hover:text-[#00F0FF] transition-colors">شركاء النجاح والأنظمة</a></li>
              <li><a href="#capabilities" className="hover:text-[#00F0FF] transition-colors">الخدمات والتقنيات</a></li>
              <li><a href="#contact" className="hover:text-[#00F0FF] transition-colors">تواصل معنا</a></li>
            </ul>
          </div>

          {/* Direct Contact */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">التواصل المباشر</h4>
            <ul className="space-y-2 text-sm text-slate-400 font-mono">
              <li className="dir-ltr text-right">Phone: +20 155 828 2760</li>
              <li className="dir-ltr text-right">Domain: openappo.com</li>
              <li className="text-emerald-400">Status: All Systems Operational</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} OPENAPPO Ecosystem. جميع الحقوق محفوظة.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-[#0D121C] border border-[#00F0FF]/30 text-cyan-300 hover:text-white hover:border-[#00F0FF] transition-colors flex items-center gap-1"
            >
              <span>إلى الأعلى</span>
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
