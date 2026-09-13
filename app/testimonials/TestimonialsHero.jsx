"use client";

import { useState } from "react";

export default function TestimonialsHero({ onOpenStory, featuredStory }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <section className="tm-hero">
      <div className="tm-hero-content">
        <div className="tm-hero-badge-wrap">
          <span className="tm-hero-badge">
            <span className="tm-badge-sparkle teal" />
            <span className="tm-hero-kicker">قصص وتجارب العملاء • CUSTOMER STORIES</span>
            <span className="tm-badge-sparkle coral" />
          </span>
        </div>

        <h1 className="tm-hero-title">
          <span className="tm-hero-title-main">من التحديات اليومية..</span>
          <span className="tm-hero-title-sub">
            إلى <span className="tm-title-gradient">إنجازات تشغيلية حقيقية</span>
          </span>
        </h1>

        <p className="tm-hero-desc">
          تعرّف كيف تبني الشركات والمؤسسات أنظمتها السحابية وتطبيقات إدارة الأعمال المخصصة بالتعاون مع Openappo، لتلائم دورات عملها بدقة 100% وتدعم نموها المستدام بدون قيود القوالب الجاهزة.
        </p>

        <div className="tm-hero-actions">
          <a href="#wall-of-trust" className="tm-btn-primary">
            <span>استكشف تجارب العملاء</span>
            <span className="tm-btn-arrow">↓</span>
          </a>
          <a
            href="https://wa.me/201558282760?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%20Openappo%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A7%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1%D8%A9%20%D8%AD%D9%88%D9%84%20%D8%AA%D8%B7%D9%88%D9%8A%D8%B1%20%D9%86%D8%B8%D8%A7%D9%85%20%D8%A5%D8%AF%D8%A7%D8%B1%D8%A9%20%D8%A3%D8%B9%D9%85%D8%A7%D9%84%20%D9%85%D8%AE%D8%B5%D8%B5"
            target="_blank"
            rel="noopener noreferrer"
            className="tm-btn-secondary"
          >
            <span>تحدث مع مستشار أنظمة</span>
            <span className="tm-btn-icon">💬</span>
          </a>
        </div>

        <div className="tm-hero-trust-metrics">
          <div className="tm-metric-pill">
            <span className="tm-metric-icon">⚡</span>
            <div className="tm-metric-data">
              <span className="tm-metric-val">100% مخصص</span>
              <span className="tm-metric-lbl">حسب طريقة شغلك</span>
            </div>
          </div>
          <div className="tm-metric-sep" />
          <div className="tm-metric-pill">
            <span className="tm-metric-icon">☁️</span>
            <div className="tm-metric-data">
              <span className="tm-metric-val">سحابي وفوري</span>
              <span className="tm-metric-lbl">مزامنة لجميع الفروع</span>
            </div>
          </div>
          <div className="tm-metric-sep" />
          <div className="tm-metric-pill">
            <span className="tm-metric-icon">🛡️</span>
            <div className="tm-metric-data">
              <span className="tm-metric-val">استقرار وأمان</span>
              <span className="tm-metric-lbl">نسخ احتياطي مستمر</span>
            </div>
          </div>
        </div>
      </div>

      <div className="tm-hero-visual-wrap">
        <div className="tm-hero-visual-card">
          <div className="tm-visual-glow tm-visual-glow--teal" />
          <div className="tm-visual-glow tm-visual-glow--coral" />
          <img
            src="/testimonials/hero-abstract.png"
            alt="Openappo Connected Software Architecture"
            className={imgLoaded ? "tm-hero-img is-loaded" : "tm-hero-img"}
            onLoad={() => setImgLoaded(true)}
          />
          <div className="tm-hero-floating-tag tag-top">
            <span className="tm-floating-dot" />
            <span>ربط سحابي مركزي</span>
          </div>
          <div className="tm-hero-floating-tag tag-bottom">
            <span className="tm-floating-icon">📊</span>
            <span>تقارير لحظية وإشراف فوري</span>
          </div>
        </div>
      </div>
    </section>
  );
}
