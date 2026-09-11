"use client";

const SECTORS = [
  "التجارة والتوزيع",
  "المصانع والإنتاج",
  "الاستيراد وسلاسل الإمداد",
  "نقاط البيع والخدمات",
  "الصالات والجمعيات",
];

export default function HeroIntro() {
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
        <p className="pf-hero-rot">
          <span className="pf-hero-rot-lead">خبرة تنفيذية وتشغيلية في</span>
          <span className="pf-hero-rot-win">
            <span className="pf-hero-rot-track">
              {[...SECTORS, SECTORS[0]].map((s, i) => (
                <span key={i}>{s}</span>
              ))}
            </span>
          </span>
        </p>
      </div>
    </header>
  );
}
