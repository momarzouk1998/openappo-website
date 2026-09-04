"use client";

import { useEffect, useState } from "react";

const PROJECTS = [
  { slug: "opengym", name: "OpenGym", subtitle: "إدارة الجيمات", url: "https://opengym.openappo.com" },
  { slug: "riyadalquran", name: "رياض القرآن الكريم", subtitle: "جمعية خيرية", url: "https://riyadalquran.openappo.com" },
  { slug: "binqasim", name: "بي قاسم", subtitle: "استيراد وتصدير", url: "https://binqasim.openappo.com" },
  { slug: "elhoot", name: "الحوت للأدوات الكهربائية", subtitle: "نظام إدارة", url: "https://elhoot.openappo.com" },
  { slug: "elnazlawy", name: "النزلاوي", subtitle: "تجارة وتوزيع", url: "https://elnazlawy.openappo.com" },
  { slug: "maspero", name: "ماسبيرو", subtitle: "خدمات رقمية", url: "https://maspero.openappo.com" },
  { slug: "mazaya", name: "مزايا للأثاث", subtitle: "نظام إدارة مصنع", url: "https://mazaya.openappo.com" },
  { slug: "kishk", name: "أحمد كشك", subtitle: "أقمشة وستائر", url: "https://kishk.openappo.com" },
  { slug: "rtx", name: "RTX", subtitle: "نظام إدارة", url: "https://rtx.openappo.com" },
];

export default function Portfolio() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  const project = active !== null ? PROJECTS[active] : null;

  return (
    <section id="portfolio" className="portfolio">
      <h2 className="portfolio-title">سابقة الأعمال</h2>

      <div className="portfolio-grid">
        {PROJECTS.map((p, i) => (
          <button
            key={p.slug}
            className="portfolio-card"
            onClick={() => setActive(i)}
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <span className="portfolio-card-logo">
              <img src={`/portfolio/logos/${p.slug}.png`} alt={p.name} loading="lazy" />
            </span>
            <span className="portfolio-card-name">{p.name}</span>
            <span className="portfolio-card-sub">{p.subtitle}</span>
          </button>
        ))}
      </div>

      {project && (
        <div className="portfolio-modal" onClick={() => setActive(null)}>
          <button className="portfolio-modal-close" aria-label="إغلاق" onClick={() => setActive(null)}>
            ✕
          </button>

          <div className="portfolio-modal-head">
            <img
              className="portfolio-modal-logo"
              src={`/portfolio/logos/${project.slug}.png`}
              alt={project.name}
            />
            <div>
              <div className="portfolio-modal-name">{project.name}</div>
              <div className="portfolio-modal-sub">{project.subtitle}</div>
            </div>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio-modal-visit"
              onClick={(e) => e.stopPropagation()}
            >
              زيارة الموقع ↗
            </a>
          </div>

          <div className="portfolio-mockups" onClick={(e) => e.stopPropagation()}>
            <div className="mockup-laptop">
              <div className="mockup-laptop-screen">
                <img src={`/portfolio/shots/${project.slug}-desktop.jpg`} alt="" />
              </div>
              <div className="mockup-laptop-base" />
            </div>

            <div className="mockup-phone">
              <div className="mockup-phone-notch" />
              <img src={`/portfolio/shots/${project.slug}-mobile.jpg`} alt="" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
