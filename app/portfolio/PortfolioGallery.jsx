"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import SHOTS from "./shots.json";

// No live URLs on purpose — these are internal client systems.
const PROJECTS = [
  { slug: "opengym", name: "OpenGym", subtitle: "منصة إدارة الجيمات" },
  { slug: "binqasim", name: "بي قاسم", subtitle: "استيراد وتصدير وتوزيع" },
  { slug: "elhoot", name: "الحوت للأدوات الكهربائية", subtitle: "نظام إدارة تجارة الجملة" },
  { slug: "elnazlawy", name: "النزلاوي", subtitle: "تجارة وتوزيع الأجهزة الكهربائية" },
  { slug: "maspero", name: "ماسبيرو", subtitle: "الخدمات الرقمية والمحافظ" },
  { slug: "mazaya", name: "مزايا للأثاث", subtitle: "نظام إدارة المصنع" },
  { slug: "kishk", name: "أحمد كشك", subtitle: "الأقمشة والستائر الفاخرة" },
  { slug: "rtx", name: "RTX", subtitle: "نظام إدارة الشركة" },
  { slug: "riyadalquran", name: "رياض القرآن الكريم", subtitle: "موقع جمعية خيرية" },
].filter((p) => (SHOTS[p.slug] || 0) > 0);

const AUTOPLAY_MS = 3200;

const shotSrc = (slug, i) =>
  `/portfolio/systems/${slug}/${slug}-${String(i + 1).padStart(2, "0")}.jpg`;

export default function PortfolioGallery() {
  const [activeSlug, setActiveSlug] = useState(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const project = PROJECTS.find((p) => p.slug === activeSlug) || null;
  const count = project ? SHOTS[project.slug] || 0 : 0;

  const open = (slug) => {
    setActiveSlug(slug);
    setIndex(0);
    setPaused(false);
  };
  const close = useCallback(() => setActiveSlug(null), []);
  const goTo = useCallback((i) => setIndex(i), []);
  const next = useCallback(
    () => setIndex((i) => (count ? (i + 1) % count : 0)),
    [count]
  );
  const prev = useCallback(
    () => setIndex((i) => (count ? (i - 1 + count) % count : 0)),
    [count]
  );

  // Keyboard + scroll lock while the modal is open
  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") next();
      if (e.key === "ArrowRight") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [project, close, next, prev]);

  // Auto-advance the screenshots; pauses on hover / when tab hidden
  const nextRef = useRef(next);
  nextRef.current = next;
  useEffect(() => {
    if (!project || count < 2 || paused) return;
    const id = setInterval(() => {
      if (!document.hidden) nextRef.current();
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [project, count, paused, index]);

  return (
    <>
      <div className="pf-grid">
        {PROJECTS.map((p, i) => (
          <button
            key={p.slug}
            className="pf-card"
            style={{ animationDelay: `${i * 55}ms` }}
            onClick={() => open(p.slug)}
          >
            <span className="pf-card-logo">
              <img src={`/portfolio/logos/${p.slug}.png`} alt={p.name} loading="lazy" />
            </span>
            <span className="pf-card-name">{p.name}</span>
            <span className="pf-card-sub">{p.subtitle}</span>
            <span className="pf-card-count">{SHOTS[p.slug]} شاشة</span>
          </button>
        ))}
      </div>

      {project && (
        <div className="pf-modal" onClick={close}>
          <div
            className="pf-modal-inner"
            onClick={(e) => e.stopPropagation()}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="pf-modal-head">
              <img
                className="pf-modal-logo"
                src={`/portfolio/logos/${project.slug}.png`}
                alt={project.name}
              />
              <div className="pf-modal-titles">
                <div className="pf-modal-name">{project.name}</div>
                <div className="pf-modal-sub">{project.subtitle}</div>
              </div>
              <button className="pf-modal-close" onClick={close} aria-label="إغلاق">
                ✕
              </button>
            </div>

            <div className="pf-laptop">
              <div className="pf-laptop-bar">
                <span />
                <span />
                <span />
              </div>
              <div className="pf-laptop-screen">
                {Array.from({ length: count }).map((_, i) => (
                  <img
                    key={i}
                    src={shotSrc(project.slug, i)}
                    alt=""
                    className={"pf-shot" + (i === index ? " is-active" : "")}
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                ))}
                {count > 1 && (
                  <>
                    <button className="pf-nav pf-prev" onClick={prev} aria-label="السابق">
                      ‹
                    </button>
                    <button className="pf-nav pf-next" onClick={next} aria-label="التالي">
                      ›
                    </button>
                    <span
                      key={index}
                      className={"pf-progress" + (paused ? " is-paused" : "")}
                    />
                  </>
                )}
              </div>
              <div className="pf-laptop-base" />
            </div>

            {count > 1 && (
              <div className="pf-dots">
                {Array.from({ length: count }).map((_, i) => (
                  <button
                    key={i}
                    className={"pf-dot" + (i === index ? " is-active" : "")}
                    onClick={() => goTo(i)}
                    aria-label={`شاشة ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
