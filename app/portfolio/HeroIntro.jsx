"use client";

import { useEffect, useState } from "react";

const SECTORS = {
  ar: [
    "التجارة والتوزيع",
    "المصانع والإنتاج",
    "الاستيراد وسلاسل الإمداد",
    "نقاط البيع والخدمات",
    "الصالات والجمعيات",
  ],
  en: [
    "trade & distribution",
    "manufacturing & production",
    "import & supply chains",
    "point of sale & services",
    "gyms & charities",
  ],
};

const STR = {
  ar: {
    kicker: "سابقة الأعمال والشاشات الفعلية",
    titleMain: "منظومات ERP وإدارة أعمال سحابية",
    titleSubLead: "نُصمّمها بدقة وفق",
    titleSubHighlight: "تفاصيل وهوية نشاطك",
    desc: "شاشات حقيقية وحلول برمجية متكاملة تعمل على أرض الواقع في مختلف القطاعات التجارية والصناعية والخدمية",
    rotLead: "خبرة تنفيذية وتشغيلية في",
  },
  en: {
    kicker: "Our portfolio & real screens",
    titleMain: "Cloud ERP & business management systems",
    titleSubLead: "Designed precisely around",
    titleSubHighlight: "the details and identity of your business",
    desc: "Real screens and fully integrated software solutions running today across trade, industrial, and service sectors",
    rotLead: "Hands-on delivery experience in",
  },
};

export default function HeroIntro({ lang = "ar" }) {
  const [index, setIndex] = useState(0);
  const t = STR[lang] || STR.ar;
  const sectors = SECTORS[lang] || SECTORS.ar;

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % sectors.length);
    }, 2500);
    return () => clearInterval(id);
  }, [sectors.length]);

  return (
    <header className="pf-hero">
      <div className="pf-hero-badge-wrap">
        <span className="pf-hero-badge">
          <span className="pf-badge-sparkle teal" />
          <span className="pf-hero-kicker">{t.kicker}</span>
          <span className="pf-badge-sparkle coral" />
        </span>
      </div>

      <h1 className="pf-hero-title">
        <span className="pf-hero-title-main">{t.titleMain}</span>
        <span className="pf-hero-title-sub">
          {t.titleSubLead} <span className="pf-title-gradient">{t.titleSubHighlight}</span>
        </span>
      </h1>

      <p className="pf-hero-desc">{t.desc}</p>

      <div className="pf-hero-rot-wrap">
        <div className="pf-hero-rot">
          <span className="pf-hero-rot-lead">{t.rotLead}</span>
          <span className="pf-hero-rot-win">
            <span key={index} className="pf-hero-rot-text">
              {sectors[index]}
            </span>
          </span>
        </div>
      </div>
    </header>
  );
}
