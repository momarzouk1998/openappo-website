"use client";

import React, { useState } from "react";
import { Terminal, Phone, Send, CheckCircle2, MessageSquare, Shield, Globe } from "lucide-react";
import MagneticButton from "../ui/MagneticButton";

export default function TerminalContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", contact: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.contact) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto z-10">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-cyan-300 text-xs font-mono mb-4">
          <Terminal className="w-3.5 h-3.5 text-[#00F0FF]" />
          <span>HOLOGRAPHIC COMMAND TERMINAL</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          مركز التواصل المستقبلي
        </h2>
        <p className="text-slate-400 text-base">
          تواصل معنا مباشرة لبناء أو تطوير مشروعك القادم بأسلوب 3D مبتكر وبنية سحابية آمنة.
        </p>
      </div>

      {/* Terminal UI Container */}
      <div className="conic-border shadow-[0_0_50px_rgba(0,240,255,0.15)]">
        <div className="conic-border-inner p-6 sm:p-10">
          {/* Terminal Top Window Bar */}
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-slate-800 dir-ltr">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-2 font-mono text-xs text-slate-400">
                root@openappo:~# contact-terminal
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <Shield className="w-3.5 h-3.5" />
              <span>SSL SECURE CONNECTION</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Direct Phone & Details */}
            <div className="lg:col-span-5 space-y-6">
              <div className="glass-panel p-6 rounded-xl border border-[#00F0FF]/20">
                <div className="text-xs font-mono text-cyan-400 mb-1">DIRECT PHONE LINE</div>
                <div className="text-2xl font-bold font-orbitron text-white dir-ltr text-right mb-2">
                  01558282760
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  متاح للتواصل المباشر والاستشارات البرمجية والهندسية للأنظمة الرقمية.
                </p>
                <div className="mt-4 pt-4 border-t border-slate-800 flex gap-2">
                  <a
                    href="tel:01558282760"
                    className="flex-1 py-2 rounded-lg bg-[#00F0FF]/10 hover:bg-[#00F0FF]/20 text-[#00F0FF] text-xs font-bold text-center border border-[#00F0FF]/30 transition-colors"
                  >
                    مكالمة تليفونية
                  </a>
                  <a
                    href="https://wa.me/201558282760"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-bold text-center border border-emerald-500/30 transition-colors"
                  >
                    واتساب مباشرة
                  </a>
                </div>
              </div>

              <div className="glass-panel p-6 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <Globe className="w-4 h-4 text-[#00F0FF]" />
                  <span>الموقع الرسمي: openappo.com</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <MessageSquare className="w-4 h-4 text-[#7000FF]" />
                  <span>الخدمة: 24/7 Monitoring & Support</span>
                </div>
              </div>
            </div>

            {/* Interactive Form */}
            <div className="lg:col-span-7">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 glass-panel rounded-xl border border-emerald-500/40">
                  <CheckCircle2 className="w-16 h-16 text-emerald-400 mb-4 animate-bounce" />
                  <h3 className="text-2xl font-bold text-white mb-2">تم استلام رسالتك بنجاح!</h3>
                  <p className="text-sm text-slate-300">
                    شكراً لتواصلك مع OPENAPPO. سيتم التواصل معك على الرقم أو البريد الموضح في أقرب وقت.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">الاسم الكامل</label>
                    <input
                      type="text"
                      required
                      placeholder="أدخل اسمك الكريم"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#080B10] border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">رقم الهاتف / الواتساب</label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: 01558282760"
                      value={form.contact}
                      onChange={(e) => setForm({ ...form, contact: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#080B10] border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF] transition-colors dir-ltr text-right"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">تفاصيل الرسالة أو النظام المطلوب</label>
                    <textarea
                      rows={4}
                      placeholder="اكتب تفاصيل استفسارك أو مشروعك المطلوب..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#080B10] border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF] transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00F0FF] to-[#7000FF] font-bold text-white shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:shadow-[0_0_35px_rgba(112,0,255,0.6)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>إرسال الرسالة إلى مركز القيادة</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
