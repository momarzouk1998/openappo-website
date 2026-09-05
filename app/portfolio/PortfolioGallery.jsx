"use client";

import { useCallback, useEffect, useState } from "react";
import SHOTS from "./shots.json";

const PROJECTS = [
  { slug: "opengym", name: "OpenGym", subtitle: "منصة إدارة الجيمات", url: "https://opengym.openappo.com" },
  { slug: "binqasim", name: "بي قاسم", subtitle: "استيراد وتصدير وتوزيع", url: "https://binqasim.openappo.com" },
  { slug: "elhoot", name: "الحوت للأدوات الكهربائية", subtitle: "نظام إدارة تجارة الجملة", url: "https://elhoot.openappo.com" },
  { slug: "elnazlawy", name: "النزلاوي", subtitle: "تجارة وتوزيع الأجهزة الكهربائية", url: "https://elnazlawy.openappo.com" },
  { slug: "maspero", name: "ماسبيرو", subtitle: "الخدمات الرقمية والمحافظ", url: "https://maspero.openappo.com" },
  { slug: "mazaya", name: "مزايا للأثاث", subtitle: "نظام إدارة المصنع", url: "https://mazaya.openappo.com" },
  { slug: "kishk", name: "أحمد كشك", subtitle: "الأقمشة والستائر الفاخرة", url: "https://kishk.openappo.com" },
  { slug: "rtx", name: "RTX", subtitle: "نظام إدارة الشركة", url: "https://rtx.openappo.com" },
  { slug: "riyadalquran", name: "رياض القرآن الكريم", subtitle: "موقع جمعية خيرية", url: "https://riyadalquran.openappo.com" },
].filter((p) => (SHOTS[p.slug] || 0) > 0);

const shotSrc = (slug, i) =>
  `/portfolio/systems/${slug}/${slug}-${String(i + 1).padStart(2, "0")}.jpg`;

export default function PortfolioGallery() {
  const [activeSlug, setActiveSlug] = useState(null);
  const [index, setIndex] = useState(0);

  const project = PROJECTS.find((p) => p.slug === activeSlug) || null;
  const count = project ? SHOTS[project.slug] || 0 : 0;

  const open = (slug) => {
    setActiveSlug(slug);
    setIndex(0);
  };
  const close = useCallback(() => setActiveSlug(null), []);
  const next = useCallback(() => setIndex((i) => (count ? (i + 1) % count : 0)), [count]);
  const prev = useCallback(
    () => setIndex((i) => (count ? (i - 1 + count) % count : 0)),
    [count]
  );

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
          <div className="pf-modal-inner" onClick={(e) => e.stopPropagation()}>
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
              <a
                className="pf-modal-visit"
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                زيارة الموقع ↗
              </a>
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
                    onClick={() => setIndex(i)}
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
