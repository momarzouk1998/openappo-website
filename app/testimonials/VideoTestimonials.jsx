"use client";

import { VIDEO_TESTIMONIALS } from "./testimonialsData";

export default function VideoTestimonials({ onOpenVideo }) {
  return (
    <section className="tm-section tm-video-section">
      <div className="tm-section-header text-center">
        <span className="tm-section-tag">شهادات مصورة • VIDEO PERSPECTIVES</span>
        <h2 className="tm-section-title">استمع إلى تجارب عملائنا مباشرة</h2>
        <p className="tm-section-sub">
          نظرة مباشرة على أثر الأنظمة البرمجية المخصصة على سير العمل وانضباط التقارير اليومية.
        </p>
      </div>

      <div className="tm-video-grid">
        {VIDEO_TESTIMONIALS.map((v) => (
          <div key={v.id} className="tm-video-card">
            <div className="tm-video-thumb-wrap">
              <img src={v.thumbnail} alt={v.title} className="tm-video-thumb" />
              <div className="tm-video-thumb-overlay" />
              <span className="tm-video-duration">{v.duration}</span>

              {v.isComingSoon ? (
                <div className="tm-video-coming-badge">
                  <span>قريباً • COMING SOON</span>
                </div>
              ) : (
                <button
                  type="button"
                  className="tm-video-play-btn"
                  aria-label="تشغيل الفيديو"
                  onClick={() => onOpenVideo(v)}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="tm-play-icon">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              )}
            </div>

            <div className="tm-video-body">
              <h3 className="tm-video-title">{v.title}</h3>
              <p className="tm-video-quote">“{v.quote}”</p>

              <div className="tm-video-meta">
                <span className="tm-video-speaker">{v.speaker}</span>
                <span className="tm-video-role">
                  {v.role} • {v.company}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
