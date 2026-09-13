"use client";

import { useState } from "react";
import { FEATURED_STORY } from "./testimonialsData";

export default function FeaturedStory({ onOpenStory }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <section className="tm-section tm-featured-section">
      <div className="tm-section-header text-center">
        <span className="tm-section-tag">قصة متميزة • FEATURED CASE STUDY</span>
        <h2 className="tm-section-title">شراكة أحدثت تحولاً تشغيلياً حقيقياً</h2>
        <p className="tm-section-sub">
          نموذج عملي لكيفية مساعدة الشركات على تجاوز الفوضى الإدارية وبناء بيئة عمل رقمية موحدة.
        </p>
      </div>

      <div className="tm-featured-card">
        <div className="tm-featured-visual-col">
          <div className="tm-featured-img-wrap">
            <img
              src={FEATURED_STORY.visualUrl}
              alt={FEATURED_STORY.headline}
              className={`tm-featured-img ${imgLoaded ? "is-loaded" : ""}`}
              onLoad={() => setImgLoaded(true)}
            />
            <div className="tm-featured-img-overlay" />
            <div className="tm-featured-badge-live">
              <span className="tm-live-dot" />
              <span>منظومة ERP سحابية قيد التشغيل</span>
            </div>
          </div>
        </div>

        <div className="tm-featured-info-col">
          <div className="tm-featured-kicker-row">
            <span className="tm-featured-kicker">{FEATURED_STORY.category}</span>
            <span className="tm-featured-industry">{FEATURED_STORY.industry}</span>
          </div>

          <h3 className="tm-featured-heading">{FEATURED_STORY.headline}</h3>

          <div className="tm-featured-quote-box">
            <span className="tm-quote-mark">“</span>
            <p className="tm-featured-quote">{FEATURED_STORY.quote}</p>
          </div>

          <div className="tm-featured-breakdown">
            <div className="tm-breakdown-item">
              <div className="tm-breakdown-label">
                <span className="tm-icon-challenge">⚠️</span>
                <span>التحدي قبل النظام:</span>
              </div>
              <p className="tm-breakdown-desc">{FEATURED_STORY.challenge}</p>
            </div>

            <div className="tm-breakdown-item">
              <div className="tm-breakdown-label">
                <span className="tm-icon-solution">✨</span>
                <span>حل Openappo المخصص:</span>
              </div>
              <p className="tm-breakdown-desc">{FEATURED_STORY.solution}</p>
            </div>
          </div>

          <div className="tm-featured-modules">
            <span className="tm-modules-title">الوحدات المنفذة:</span>
            <div className="tm-modules-list">
              {FEATURED_STORY.implementedModules.map((m, i) => (
                <span key={i} className="tm-module-tag">
                  {m}
                </span>
              ))}
            </div>
          </div>

          <div className="tm-featured-footer">
            <div className="tm-featured-author">
              <div className="tm-author-avatar">
                <span>🏢</span>
              </div>
              <div className="tm-author-meta">
                <span className="tm-author-name">{FEATURED_STORY.companyName}</span>
                <span className="tm-author-role">{FEATURED_STORY.representative}</span>
              </div>
            </div>

            <button
              type="button"
              className="tm-btn-read-story"
              onClick={() => onOpenStory(FEATURED_STORY)}
            >
              <span>تفاصيل المشروع كاملة</span>
              <span className="tm-btn-arrow">←</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
