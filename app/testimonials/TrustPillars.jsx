"use client";

import { TRUST_PILLARS } from "./testimonialsData";

export default function TrustPillars() {
  return (
    <section className="tm-section tm-pillars-section">
      <div className="tm-section-header text-center">
        <span className="tm-section-tag">فلسفة الثقة • OUR PHILOSOPHY</span>
        <h2 className="tm-section-title">مبنيّة حول احتياجات العمل الحقيقية</h2>
        <p className="tm-section-sub">
          لكل نشاط تجاري أو صناعي تحدياته ومساراته الفريدة. منهجيتنا تبدأ بفهم تلك الاحتياجات بعمق وتطوير حلول برمجية مخصصة بالكامل دون فرض قوالب جاهزة.
        </p>
      </div>

      <div className="tm-pillars-grid">
        {TRUST_PILLARS.map((pillar) => (
          <div key={pillar.id} className={`tm-pillar-card tm-pillar--${pillar.accent}`}>
            <div className="tm-pillar-top">
              <span className="tm-pillar-num">{pillar.number}</span>
              <span className="tm-pillar-icon">{pillar.icon}</span>
            </div>
            <h3 className="tm-pillar-title">{pillar.title}</h3>
            <span className="tm-pillar-sub">{pillar.subtitle}</span>
            <p className="tm-pillar-desc">{pillar.description}</p>
            <div className="tm-pillar-bar" />
          </div>
        ))}
      </div>
    </section>
  );
}
