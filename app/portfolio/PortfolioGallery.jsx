"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const AUTO_MS = 1200;
const BEHIND = 3;

function rel(i, cur, n) {
  return (i - cur + n) % n;
}

function deckStyle(o, n) {
  if (o === n - 1) {
    return { transform: "translateZ(80px) scale(0.92)", opacity: 0, zIndex: 40, pointerEvents: "none" };
  }
  if (o > BEHIND) return { opacity: 0, pointerEvents: "none" };
  return {
    transform: `translateY(${-o * 20}px) translateZ(${-o * 150}px) scale(${1 - o * 0.08})`,
    opacity: o === 0 ? 1 : o === 1 ? 0.45 : o === 2 ? 0.2 : 0.08,
    zIndex: 100 - o,
    pointerEvents: o === 0 ? "auto" : "none",
  };
}

function Deck({ shots, onZoom }) {
  const n = shots.length;
  const [cur, setCur] = useState(0);
  const [held, setHeld] = useState(false);
  const loaded = useRef(new Set());
  const [, bump] = useState(0);
  const touch = useRef(null);

  const markLoaded = useCallback((i) => {
    loaded.current.add(i);
    bump((v) => v + 1);
  }, []);

  useEffect(() => {
    if (!n) return;
    for (let d = 1; d <= BEHIND + 1; d++) {
      const i = (cur + d) % n;
      if (loaded.current.has(i)) continue;
      const im = new Image();
      im.onload = () => markLoaded(i);
      im.src = shots[i];
    }
  }, [cur, n, shots, markLoaded]);

  useEffect(() => {
    if (n < 2 || held) return;
    const id = setInterval(() => {
      setCur((c) => {
        const next = (c + 1) % n;
        return loaded.current.has(next) ? next : c;
      });
    }, AUTO_MS);
    return () => clearInterval(id);
  }, [n, held]);

  const go = useCallback(
    (dir) => {
      setCur((c) => (c + dir + n) % n);
      setHeld(true);
    },
    [n]
  );

  useEffect(() => {
    if (!held) return;
    const id = setTimeout(() => setHeld(false), 4500);
    return () => clearTimeout(id);
  }, [held, cur]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  if (!n)
    return (
      <div className="pf-flow-pending">
        <p>الشاشات التفصيلية لهذا النظام قيد الإعداد والإطلاق.</p>
        <a href="https://wa.me/201558282760" target="_blank" rel="noopener noreferrer" className="pf-demo-cta">
          طلب عرض توضيحي مباشر عبر واتساب ←
        </a>
      </div>
    );

  const visible = [];
  for (let i = 0; i < n; i++) {
    const o = rel(i, cur, n);
    if (o <= BEHIND || o === n - 1) visible.push({ i, o });
  }

  return (
    <>
      <div
        className="pf-deck-stage"
        onTouchStart={(e) => {
          touch.current = e.touches[0].clientX;
          setHeld(true);
        }}
        onTouchEnd={(e) => {
          if (touch.current == null) return;
          const dx = e.changedTouches[0].clientX - touch.current;
          touch.current = null;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        }}
      >
        <div className="pf-deck">
          {visible.map(({ i, o }) => (
            <button
              key={i}
              className={"pf-deck-card" + (o === 0 ? " is-front" : "")}
              style={deckStyle(o, n)}
              onClick={() => o === 0 && onZoom(shots[i])}
              aria-label="تكبير الشاشة"
              tabIndex={o === 0 ? 0 : -1}
              aria-hidden={o !== 0}
            >
              <img
                src={shots[i]}
                alt=""
                loading={o <= 1 ? "eager" : "lazy"}
                decoding="async"
                onLoad={() => markLoaded(i)}
              />
            </button>
          ))}
        </div>

        <button className="pf-deck-nav pf-deck-nav--prev" onClick={() => go(-1)} aria-label="السابق">
          ‹
        </button>
        <button className="pf-deck-nav pf-deck-nav--next" onClick={() => go(1)} aria-label="التالي">
          ›
        </button>
      </div>

      <div className="pf-flow-meta">
        <span className="pf-flow-count">
          {cur + 1} / {n}
        </span>
        <span className="pf-flow-hint">
          مرّر للتنقل بين الشاشات · اضغط على الشاشة لتكبيرها
        </span>
      </div>
    </>
  );
}

export default function PortfolioGallery({ projects = [] }) {
  const [activeSlug, setActiveSlug] = useState(null);
  const [zoom, setZoom] = useState(null);

  // Split into Featured systems (those with rich screenshots) and the rest of the matrix
  const featuredProjects = projects.filter((p) => (p.shots || []).length > 0);
  const matrixProjects = projects.filter((p) => (p.shots || []).length === 0);

  const activeProject = projects.find((p) => p.slug === activeSlug) || null;
  const count = activeProject ? (activeProject.shots || []).length : 0;

  const close = useCallback(() => {
    setActiveSlug(null);
    setZoom(null);
  }, []);

  useEffect(() => {
    if (!activeProject) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      if (zoom) setZoom(null);
      else close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [activeProject, zoom, close]);

  return (
    <div className="pf-gallery-container">
      {/* 1. FEATURED SPOTLIGHT SHOWCASES */}
      <section className="pf-featured-section">
        <div className="pf-section-header">
          <span className="pf-section-tag">🌟 أنظمة مميزة واستعراض حي</span>
          <h2 className="pf-section-title">منظومات ERP كبرى تعمل على أرض الواقع</h2>
        </div>

        <div className="pf-featured-grid">
          {featuredProjects.map((p, idx) => (
            <div key={p.slug} className={`pf-spotlight-card ${idx % 2 === 1 ? "is-reversed" : ""}`}>
              {/* Left/Interactive Visual Preview */}
              <div className="pf-spotlight-preview" onClick={() => setActiveSlug(p.slug)}>
                <div className="pf-spotlight-mockup-frame">
                  <div className="pf-mockup-header">
                    <span className="mockup-dot red" />
                    <span className="mockup-dot yellow" />
                    <span className="mockup-dot green" />
                    <span className="mockup-url">app.openappo.com/{p.slug}</span>
                  </div>
                  <div className="pf-mockup-screen-wrap">
                    <img
                      src={p.shots[0]}
                      alt={p.name}
                      className="pf-mockup-img"
                      loading="eager"
                    />
                    {p.shots[1] && (
                      <img
                        src={p.shots[1]}
                        alt=""
                        className="pf-mockup-img-layer"
                        loading="lazy"
                      />
                    )}
                    <div className="pf-mockup-badge">
                      <span>👁️ اضغط لاستعراض {p.shots.length} شاشة حقيقية</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right/Info Column */}
              <div className="pf-spotlight-info">
                <div className="pf-spotlight-head">
                  <span className="pf-spotlight-logo">
                    {p.logo ? (
                      <img src={p.logo} alt={p.name} />
                    ) : (
                      <span className="pf-card-logo-txt">{(p.name || "?").trim()[0]}</span>
                    )}
                  </span>
                  <div className="pf-spotlight-meta">
                    <span className="pf-spotlight-badge">منظومة سحابية متكاملة</span>
                    <h3 className="pf-spotlight-name">{p.name}</h3>
                  </div>
                </div>

                <p className="pf-spotlight-sub">{p.subtitle}</p>

                {p.desc && <p className="pf-spotlight-desc">{p.desc}</p>}

                <div className="pf-spotlight-pills">
                  <span className="pf-pill">سحابي 100%</span>
                  <span className="pf-pill">تقارير لحظية</span>
                  <span className="pf-pill">صلاحيات دقيقة</span>
                  <span className="pf-pill highlight">{p.shots.length} شاشة تشغيلية</span>
                </div>

                <button
                  className="pf-spotlight-btn"
                  onClick={() => setActiveSlug(p.slug)}
                >
                  <span>استعراض شاشات النظام بالكامل</span>
                  <span className="pf-btn-arrow">←</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. THE FULL SYSTEMS ECOSYSTEM MATRIX */}
      <section className="pf-matrix-section">
        <div className="pf-section-header">
          <span className="pf-section-tag">💼 قطاعات وحلول أعمال متخصصة</span>
          <h2 className="pf-section-title">منظومات رقمية صُممت خصيصاً لكل قطاع</h2>
          <p className="pf-section-sub">
            حلول برمجية مخصصة لإدارة العمليات، المخازن، الفواتير، والحسابات مصممة وفق طبيعة كل نشاط تجاري وصناعي وخدمي.
          </p>
        </div>

        <div className="pf-matrix-grid">
          {matrixProjects.map((p, i) => (
            <article
              key={p.slug}
              className="pf-matrix-card"
              onClick={() => setActiveSlug(p.slug)}
            >
              <div className="pf-matrix-top">
                <span className="pf-matrix-logo">
                  {p.logo ? (
                    <img src={p.logo} alt={p.name} loading="lazy" />
                  ) : (
                    <span className="pf-card-logo-txt">{(p.name || "?").trim()[0]}</span>
                  )}
                </span>
                <span className="pf-matrix-status">ERP مخصص</span>
              </div>

              <h3 className="pf-matrix-name">{p.name}</h3>
              <p className="pf-matrix-sub">{p.subtitle}</p>
              {p.desc && <p className="pf-matrix-desc">{p.desc}</p>}

              <div className="pf-matrix-footer">
                <span className="pf-matrix-explore">
                  <span>عرض تفاصيل المنظومة</span>
                  <span className="pf-matrix-arrow">←</span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 3. MODAL FOR SYSTEM DETAILS & SCREENSHOT DECK */}
      {activeProject && (
        <div className="pf-modal" onClick={close}>
          <div className="pf-modal-inner" onClick={(e) => e.stopPropagation()}>
            <div className="pf-modal-head">
              {activeProject.logo ? (
                <img
                  className="pf-modal-logo"
                  src={activeProject.logo}
                  alt={activeProject.name}
                />
              ) : (
                <span className="pf-modal-logo pf-modal-logo--txt">
                  {(activeProject.name || "?").trim()[0]}
                </span>
              )}
              <div className="pf-modal-titles">
                <div className="pf-modal-name">{activeProject.name}</div>
                <div className="pf-modal-sub">
                  {activeProject.subtitle}
                  {count ? ` · ${count} شاشة تشغيلية` : ""}
                </div>
              </div>
              <button className="pf-modal-close" onClick={close} aria-label="إغلاق">
                ✕
              </button>
            </div>

            {activeProject.desc && <p className="pf-modal-desc">{activeProject.desc}</p>}

            {activeProject.youtubeId && (
              <div className="pf-modal-video">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeProject.youtubeId}?rel=0&modestbranding=1`}
                  title={activeProject.name}
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            )}

            <Deck
              key={activeProject.slug}
              shots={activeProject.shots || []}
              onZoom={setZoom}
            />
          </div>

          {zoom && (
            <div
              className="pf-zoom"
              onClick={(e) => {
                e.stopPropagation();
                setZoom(null);
              }}
            >
              <img src={zoom} alt="" />
              <button className="pf-zoom-close" aria-label="إغلاق">
                ✕
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
