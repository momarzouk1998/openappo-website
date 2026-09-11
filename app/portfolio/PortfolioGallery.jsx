"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Screenshots + metadata come from the manifest the admin panel publishes.
// Project shape: { slug, name, subtitle, desc, youtubeId, logo, shots: [url] }

const AUTO_MS = 1000; // how long the front screenshot holds before receding
const BEHIND = 3; // how many upcoming screenshots peek out behind the front one

/** 0 = front, 1..n-1 = queued behind it. Wraps, so the deck never runs out. */
function rel(i, cur, n) {
  return (i - cur + n) % n;
}

/**
 * Depth stack: the front screenshot is shown whole and as large as the stage
 * allows, with the next few receding behind it. On each tick the front one
 * shrinks and fades back while the one behind grows into its place.
 */
function deckStyle(o, n) {
  if (o === n - 1) {
    // Just left the front — shrink and fade rather than vanish.
    return { transform: "translateZ(80px) scale(0.92)", opacity: 0, zIndex: 40, pointerEvents: "none" };
  }
  if (o > BEHIND) return { opacity: 0, pointerEvents: "none" };
  return {
    transform: `translateY(${-o * 24}px) translateZ(${-o * 170}px) scale(${1 - o * 0.09})`,
    opacity: o === 0 ? 1 : o === 1 ? 0.4 : o === 2 ? 0.18 : 0.07,
    zIndex: 100 - o,
    pointerEvents: o === 0 ? "auto" : "none",
  };
}

function Deck({ shots, onZoom }) {
  const n = shots.length;
  const [cur, setCur] = useState(0);
  const [held, setHeld] = useState(false); // paused right after a manual move
  const loaded = useRef(new Set());
  const [, bump] = useState(0);
  const touch = useRef(null);

  const markLoaded = useCallback((i) => {
    loaded.current.add(i);
    bump((v) => v + 1);
  }, []);

  // Fetch ahead so the cadence never lands on a screenshot that hasn't arrived.
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

  // Give the viewer 4s of manual control before autoplay resumes.
  useEffect(() => {
    if (!held) return;
    const id = setTimeout(() => setHeld(false), 4000);
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

  // 10 of the 12 systems have copy and a logo but no screenshots yet; an empty
  // modal reads as a broken carousel, so say what is actually going on.
  if (!n)
    return (
      <p className="pf-flow-pending">
        الشاشات التفصيلية لهذا النظام قيد الإعداد — تواصل معنا لعرضٍ مباشر.
      </p>
    );

  const visible = [];
  for (let i = 0; i < n; i++) {
    const o = rel(i, cur, n);
    if (o <= BEHIND || o === n - 1) visible.push({ i, o });
  }

  return (
    <>
      {/* No hover-pause: the click that opens the modal leaves the cursor on
          the centred stage, so mouseenter fires at once and nothing advances
          on desktop. Only an explicit move holds it. */}
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
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1); // follow the finger
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
          اسحب يمين أو شمال · اضغط على الشاشة لتكبيرها
        </span>
      </div>
    </>
  );
}

export default function PortfolioGallery({ projects = [] }) {
  const [activeSlug, setActiveSlug] = useState(null);
  const [zoom, setZoom] = useState(null);

  const project = projects.find((p) => p.slug === activeSlug) || null;
  const count = project ? (project.shots || []).length : 0;

  const close = useCallback(() => {
    setActiveSlug(null);
    setZoom(null);
  }, []);

  useEffect(() => {
    if (!project) return;
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
  }, [project, zoom, close]);

  return (
    <>
      <div className="pf-grid">
        {projects.map((p, i) => (
          // An <article> rather than a <button>: the heading and description
          // are real, crawlable page content — they used to exist only inside
          // the click-rendered modal, invisible to search engines.
          <article
            key={p.slug}
            className="pf-card"
            style={{ animationDelay: `${i * 55}ms` }}
          >
            <span className="pf-card-logo">
              {p.logo ? (
                <img src={p.logo} alt={`شعار ${p.name}`} loading="lazy" />
              ) : (
                <span className="pf-card-logo-txt">{(p.name || "?").trim()[0]}</span>
              )}
            </span>
            <h2 className="pf-card-name">{p.name}</h2>
            <p className="pf-card-sub">{p.subtitle}</p>
            {p.desc && <p className="pf-card-desc">{p.desc}</p>}
            {(p.shots || []).length > 0 && (
              <span className="pf-card-count">{p.shots.length} شاشة</span>
            )}
            <button
              className="pf-card-open"
              onClick={() => setActiveSlug(p.slug)}
              aria-label={`استعراض ${p.name}`}
            >
              <span>عرض التفاصيل</span>
            </button>
          </article>
        ))}
      </div>

      {project && (
        <div className="pf-modal" onClick={close}>
          <div className="pf-modal-inner" onClick={(e) => e.stopPropagation()}>
            <div className="pf-modal-head">
              {project.logo ? (
                <img
                  className="pf-modal-logo"
                  src={project.logo}
                  alt={project.name}
                />
              ) : (
                <span className="pf-modal-logo pf-modal-logo--txt">
                  {(project.name || "?").trim()[0]}
                </span>
              )}
              <div className="pf-modal-titles">
                <div className="pf-modal-name">{project.name}</div>
                <div className="pf-modal-sub">
                  {project.subtitle}
                  {count ? ` · ${count} شاشة` : ""}
                </div>
              </div>
              <button className="pf-modal-close" onClick={close} aria-label="إغلاق">
                ✕
              </button>
            </div>

            {project.desc && <p className="pf-modal-desc">{project.desc}</p>}

            {project.youtubeId && (
              <div className="pf-modal-video">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${project.youtubeId}?rel=0&modestbranding=1`}
                  title={project.name}
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            )}

            <Deck
              key={project.slug}
              shots={project.shots || []}
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
    </>
  );
}
