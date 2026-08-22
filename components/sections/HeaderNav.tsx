"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ShieldCheck, Phone, Menu, X, Sparkles } from "lucide-react";
import MagneticButton from "../ui/MagneticButton";

export default function HeaderNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-[#05070B]/80 backdrop-blur-lg border-b border-[#00F0FF]/15 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden p-1 bg-gradient-to-tr from-[#00F0FF] to-[#7000FF] shadow-[0_0_15px_rgba(0,240,255,0.4)] group-hover:scale-105 transition-transform duration-300">
            <Image
              src="/Openappo_04_Transparent_Logo.png"
              alt="OPENAPPO Brand Logo"
              fill
              className="object-contain p-0.5"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-orbitron font-extrabold text-xl tracking-wider text-white group-hover:text-[#00F0FF] transition-colors">
              OPENAPPO
            </span>
            <span className="text-[10px] text-cyan-400 font-mono tracking-widest uppercase">
              Digital Ecosystem
            </span>
          </div>
        </a>

        {/* Live System Status Pill */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0D121C] border border-[#00F0FF]/20 text-xs font-mono text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>System Engine Active</span>
          <ShieldCheck className="w-3.5 h-3.5 text-[#00F0FF] mr-1" />
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#partners" className="hover:text-[#00F0FF] transition-colors flex items-center gap-1">
            <Sparkles className="w-4 h-4 text-[#00F0FF]" />
            <span>شركاء النجاح</span>
          </a>
          <a href="#capabilities" className="hover:text-[#00F0FF] transition-colors">
            الخدمات والأنظمة
          </a>
          <a href="#contact" className="hover:text-[#00F0FF] transition-colors">
            مركز التواصل
          </a>
        </nav>

        {/* Action Call */}
        <div className="hidden sm:flex items-center gap-3">
          <a href="tel:01558282760" className="text-xs font-mono text-cyan-400 hover:underline dir-ltr">
            01558282760
          </a>
          <MagneticButton href="#contact">
            <Phone className="w-4 h-4 text-[#00F0FF]" />
            <span>اتصل بنا</span>
          </MagneticButton>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-[#0D121C] border border-[#00F0FF]/20 text-slate-300 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0D121C]/95 backdrop-blur-2xl border-b border-[#00F0FF]/20 px-4 py-6 space-y-4 text-right">
          <a
            href="#partners"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-200 hover:text-[#00F0FF] font-medium"
          >
            شركاء النجاح والأنظمة
          </a>
          <a
            href="#capabilities"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-200 hover:text-[#00F0FF] font-medium"
          >
            الخدمات التقنية
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-200 hover:text-[#00F0FF] font-medium"
          >
            مركز التواصل
          </a>
          <div className="pt-2">
            <a
              href="tel:01558282760"
              className="block w-full text-center py-3 rounded-xl bg-gradient-to-r from-[#00F0FF] to-[#7000FF] font-bold text-white shadow-[0_0_15px_rgba(0,240,255,0.4)]"
            >
              اتصل بنا: 01558282760
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
