"use client";

import { useState } from "react";
import { INDUSTRIES, INDUSTRY_STORIES } from "./testimonialsData";

export default function IndustryStories({ onOpenStory }) {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredStories =
    activeFilter === "all"
      ? INDUSTRY_STORIES
      : INDUSTRY_STORIES.filter((s) => s.industryId === activeFilter);

  return (
    <section className="tm-section tm-industry-section">
      <div className="tm-section-header text-center">
        <span className="tm-section-tag">استكشف حسب مجالك • BY INDUSTRY</span>
        <h2 className="tm-section-title">حلول وأنظمة مصممة لقطاعات مختلفة</h2>
        <p className="tm-section-sub">
          اختر قطاعك لاستعراض النماذج البرمجية وكيفية حل التحديات التشغيلية الخاصة بكل مجال.
        </p>
      </div>

      <div className="tm-filter-container">
        <div className="tm-filter-scroll">
          {INDUSTRIES.map((cat) => {
            const isActive = activeFilter === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                className={`tm-filter-btn ${isActive ? "is-active" : ""}`}
                onClick={() => setActiveFilter(cat.id)}
              >
                <span>{cat.name}</span>
                <span className="tm-filter-count">{cat.count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="tm-stories-grid">
        {filteredStories.map((story) => (
          <div key={story.id} className="tm-story-card">
            <div className="tm-story-img-wrap">
              <img src={story.image} alt={story.title} className="tm-story-img" />
              <div className="tm-story-img-overlay" />
              <span className="tm-story-industry-tag">{story.industryName}</span>
            </div>

            <div className="tm-story-body">
              <h3 className="tm-story-title">{story.title}</h3>
              <p className="tm-story-summary">{story.summary}</p>

              <div className="tm-story-tags">
                {story.tags.map((t, idx) => (
                  <span key={idx} className="tm-story-tag-pill">
                    {t}
                  </span>
                ))}
              </div>

              <div className="tm-story-foot">
                <span className="tm-story-client">{story.clientTag}</span>
                <button
                  type="button"
                  className="tm-story-action-btn"
                  onClick={() => onOpenStory(story)}
                >
                  <span>عرض التفاصيل</span>
                  <span className="tm-btn-arrow">←</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
