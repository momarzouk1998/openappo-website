"use client";

import { useEffect } from "react";

export default function StoryModal({ story, video, onClose }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!story && !video) return null;

  return (
    <div className="tm-modal-backdrop" onClick={onClose}>
      <div className="tm-modal-container" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="tm-modal-close-btn"
          onClick={onClose}
          aria-label="إغلاق النافذة"
        >
          ✕
        </button>

        {video ? (
          <div className="tm-modal-video-view">
            <span className="tm-modal-tag">فيديو توثيقي • VIDEO STORY</span>
            <h3 className="tm-modal-title">{video.title}</h3>
            <div className="tm-modal-video-placeholder">
              <img src={video.thumbnail} alt={video.title} className="tm-modal-thumb" />
              <div className="tm-modal-thumb-glow" />
              <div className="tm-modal-play-cue">
                <span className="tm-cue-icon">▶</span>
                <p>مقطع الفيديو قيد النشر والمونتاج النهائي مع العميل.</p>
                <span className="tm-cue-sub">سيتاح المشهد قريباً على القناة الرسمية</span>
              </div>
            </div>
            <p className="tm-modal-quote-text">“{video.quote}”</p>
            <div className="tm-modal-meta-row">
              <span className="tm-meta-name">{video.speaker}</span>
              <span className="tm-meta-sub">
                {video.role} — {video.company}
              </span>
            </div>
          </div>
        ) : (
          <div className="tm-modal-story-view">
            <div className="tm-modal-head">
              <span className="tm-modal-tag">
                {story.category || story.industryName || "تفاصيل قصة النجاح"}
              </span>
              <h3 className="tm-modal-title">{story.headline || story.title}</h3>
              <p className="tm-modal-author-tag">
                {story.companyName || story.clientTag} • {story.representative || "إشراف الإدارة"}
              </p>
            </div>

            {story.quote && (
              <div className="tm-modal-quote-block">
                <span className="tm-quote-mark">“</span>
                <p>{story.quote}</p>
              </div>
            )}

            <div className="tm-modal-grid-details">
              <div className="tm-detail-box box-challenge">
                <h4 className="tm-box-title">
                  <span>⚠️</span> التحدي التشغيلي السابق
                </h4>
                <p>{story.challenge || story.summary}</p>
              </div>

              <div className="tm-detail-box box-solution">
                <h4 className="tm-box-title">
                  <span>✨</span> الحل البرمجي والهندسي المخصص
                </h4>
                <p>{story.solution || "بناء منظومة سحابية متوافقة مع متطلبات العميل 100%."}</p>
              </div>
            </div>

            {story.implementedModules && story.implementedModules.length > 0 && (
              <div className="tm-modal-modules-section">
                <h4 className="tm-subheading">الوحدات البرمجية المدمجة في النظام:</h4>
                <div className="tm-modal-module-pills">
                  {story.implementedModules.map((m, i) => (
                    <span key={i} className="tm-module-pill-item">
                      <span className="tm-pill-check">✓</span>
                      <span>{m}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {story.keyOutcomes && story.keyOutcomes.length > 0 && (
              <div className="tm-modal-outcomes-section">
                <h4 className="tm-subheading">الأثر والنتائج التشغيلية:</h4>
                <ul className="tm-outcomes-list">
                  {story.keyOutcomes.map((o, i) => (
                    <li key={i} className="tm-outcome-item">
                      <span className="tm-outcome-bullet">◆</span>
                      <span>{o}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="tm-modal-action-bar">
              <a
                href="https://wa.me/201558282760?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%20Openappo%D8%8C%20%D9%82%D8%B1%D8%A3%D8%AA%20%D9%82%D8%B5%D8%A9%20%D8%A7%D9%84%D9%86%D8%AC%D8%A7%D8%AD%20%D9%88%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A8%D9%86%D8%A7%D8%A1%20%D9%86%D8%B8%D8%A7%D9%85%20%D9%85%D9%85%D8%A7%D8%AB%D9%84"
                target="_blank"
                rel="noopener noreferrer"
                className="tm-btn-primary tm-modal-cta"
              >
                <span>بناء نظام مماثل لعملي</span>
                <span className="tm-btn-arrow">←</span>
              </a>
              <button type="button" className="tm-btn-secondary" onClick={onClose}>
                إغلاق
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
