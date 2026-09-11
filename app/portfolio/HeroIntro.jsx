"use client";

import { useEffect, useRef, useState } from "react";

// Named in the body copy already, so rotating them states nothing new — it just
// stops the sentence sitting still.
const SECTORS = [
  "التجارة والتوزيع",
  "التصنيع والمصانع",
  "الخدمات الرقمية",
  "القطاع الخيري",
];

const TITLE = "أنظمة إدارة أعمال نصمّمها لكل نشاط على حِدة";

/** Counts up once, when the tile first scrolls into view. */
function Stat({ value, label, suffix }) {
  const [shown, setShown] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const run = () => {
      const t0 = performance.now();
      const dur = 1100;
      const step = (t) => {
        const k = Math.min(1, (t - t0) / dur);
        const eased = 1 - Math.pow(1 - k, 3);
        setShown(Math.round(value * eased));
        if (k < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <div className="pf-stat" ref={ref}>
      <span className="pf-stat-num">
        {shown}
        {suffix ? <i>{suffix}</i> : null}
      </span>
      <span className="pf-stat-label">{label}</span>
    </div>
  );
}

export default function HeroIntro({ projects = [] }) {
  const systems = projects.length;
  const screens = projects.reduce((n, p) => n + (p.shots || []).length, 0);
  const words = TITLE.split(" ");

  return (
    <header className="pf-hero">
      <span className="pf-hero-kicker">سابقة الأعمال</span>

      {/* One continuous heading for crawlers; the spans only carry the stagger. */}
      <h1 className="pf-hero-title">
        {words.map((w, i) => (
          <span key={i} style={{ "--i": i }}>
            {w}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </h1>

      <p className="pf-hero-rot">
        <span className="pf-hero-rot-lead">خبرة مثبتة في</span>
        <span className="pf-hero-rot-win">
          <span className="pf-hero-rot-track">
            {[...SECTORS, SECTORS[0]].map((s, i) => (
              <span key={i}>{s}</span>
            ))}
          </span>
        </span>
      </p>

      <p className="pf-hero-desc">
        نماذج من أنظمة تخطيط الموارد (ERP) وبرامج إدارة الأعمال التي طوّرتها
        Openappo لعملائها في التجارة والتوزيع والتصنيع والخدمات: إدارة المبيعات
        والمشتريات والمخزون، والحسابات والخزائن والتحصيلات، والتقارير المالية
        والتشغيلية — بصلاحيات متعدّدة المستخدمين وتشغيل سحابي آمن.
      </p>

      <div className="pf-stats">
        <Stat value={systems} label="نظام مُنفَّذ" />
        <Stat value={screens} label="شاشة حقيقية" />
        <Stat value={24} suffix="/7" label="تشغيل سحابي" />
      </div>

      <span className="pf-hero-cue">
        <span className="pf-hero-cue-dot" />
        مرّر على أي نظام لإيقاف الشريط، واضغط لاستعراض شاشاته
      </span>
    </header>
  );
}
