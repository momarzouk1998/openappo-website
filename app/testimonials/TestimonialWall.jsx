"use client";

import { TESTIMONIALS_WALL } from "./testimonialsData";

export default function TestimonialWall({ onOpenQuote }) {
  return (
    <section id="wall-of-trust" className="tm-section tm-wall-section">
      <div className="tm-section-header text-center">
        <span className="tm-section-tag">حائط الثقة • WALL OF TRUST</span>
        <h2 className="tm-section-title">أصوات وتجارب من واقع الشراكة</h2>
        <p className="tm-section-sub">
          مقتطفات من مسيرة تعاوننا مع رواد الأعمال وأصحاب الشركات لتطوير أنظمتهم التشغيلية وإدارة فروعهم.
        </p>
      </div>

      <div className="tm-bento-grid">
        {TESTIMONIALS_WALL.map((item) => {
          const isLarge = item.type === "quote-large";
          const isWide = item.type === "wide-card";

          return (
            <div
              key={item.id}
              className={`tm-bento-card tm-bento--${item.type} tm-accent--${item.accent} ${
                isLarge ? "is-span-2" : isWide ? "is-wide" : ""
              }`}
            >
              <div className="tm-card-header">
                <div className="tm-card-author-group">
                  <div className="tm-avatar-badge">
                    <span>{item.authorName.charAt(1) || "💼"}</span>
                  </div>
                  <div className="tm-author-info">
                    <div className="tm-author-name-row">
                      <span className="tm-author-name">{item.authorName}</span>
                      {item.isVerified && (
                        <span className="tm-verified-check" title="تعاون موثق">
                          <svg viewBox="0 0 20 20" fill="currentColor" className="tm-check-icon">
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      )}
                    </div>
                    <span className="tm-author-role">{item.role}</span>
                    <span className="tm-author-company">{item.company}</span>
                  </div>
                </div>

                <span className="tm-industry-badge">{item.industryBadge}</span>
              </div>

              <div className="tm-card-body">
                <p className="tm-card-quote">{item.quote}</p>
              </div>

              <div className="tm-card-footer">
                <div className="tm-stars-row">
                  {Array.from({ length: item.rating }).map((_, idx) => (
                    <span key={idx} className="tm-star">
                      ★
                    </span>
                  ))}
                  <span className="tm-rating-label">تقييم ممتاز</span>
                </div>

                <span className="tm-collab-tag">شراكة برمجية مخصصة</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
