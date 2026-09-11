"use client";

import { useEffect, useState } from "react";

const SECTORS = [
  "التجارة والتوزيع",
  "المصانع والإنتاج",
  "الاستيراد وسلاسل الإمداد",
  "نقاط البيع والخدمات",
  "الصالات والجمعيات",
];

export default function HeroIntro() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % SECTORS.length);
    }, 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="pf-hero">
      <div className="pf-hero-badge-wrap">
        <span className="pf-hero-badge">
          <span className="pf-badge-sparkle teal" />
          <span className="pf-hero-kicker">سابقة الأعمال والشاشات الفعلية</span>
          <span className="pf-badge-sparkle coral" />
        </span>
      </div>

      <h1 className="pf-hero-title">
        <span className="pf-hero-title-main">منظومات ERP وإدارة أعمال سحابية</span>
        <span className="pf-hero-title-sub">
          نُصمّمها بدقة وفق <span className="pf-title-gradient">تفاصيل وهوية نشاطك</span>
        </span>
      </h1>

      <p className="pf-hero-desc">
        شاشات حقيقية وحلول برمجية متكاملة تعمل على أرض الواقع في مختلف القطاعات التجارية والصناعية والخدمية
      </p>

      <div className="pf-hero-rot-wrap">
        <div className="pf-hero-rot">
          <span className="pf-hero-rot-lead">خبرة تنفيذية وتشغيلية في</span>
          <span className="pf-hero-rot-win">
            <span key={index} className="pf-hero-rot-text">
              {SECTORS[index]}
            </span>
          </span>
        </div>
      </div>
    </header>
  );
}
