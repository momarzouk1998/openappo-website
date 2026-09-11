"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Screenshots + metadata come from the manifest the admin panel publishes.
// Project shape: { slug, name, subtitle, desc, youtubeId, logo, shots: [url] }

const AUTO_MS = 1000; // how long each screenshot holds before advancing
const NEIGHBOURS = 3; // how many cards to keep mounted either side of centre

/** Shortest signed distance from `cur` to `i` on a ring of `n` — so the
 *  carousel wraps instead of running off one end. */
function relative(i, cur, n) {
  let d = i - cur;
  if (d > n / 2) d -= n;
  if (d < -n / 2) d += n;
  return d;
}

/** Places a card on the arc: turned away, pushed back, sinking and fading
 *  with distance so only a sliver of the far ones shows. */
function cardStyle(o) {
  const a = Math.abs(o);
  const s = Math.sign(o);
  if (a > NEIGHBOURS) return { opacity: 0, pointerEvents: "none" };
  return {
    transform: [
      `translateX(${s * (52 + (a - 1) * 26)}%)`,
      `translateY(${a * a * 20}px)`,
      `translateZ(${-a * 190}px)`,
      `rotateY(${-s * (40 + (a - 1) * 9)}deg)`,
      `rotateZ(${s * a * 4}deg)`,
      `scale(${1 - a * 0.09})`,
    ].join(" "),
    opacity: a === 0 ? 1 : a === 1 ? 0.4 : a === 2 ? 0.16 : 0.06,
    zIndex: 100 - a,
    pointerEvents: a === 0 ? "auto" : a <= 2 ? "auto" : "none",
  };
}

function Coverflow({ shots, onZoom }) {
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

  // Fetch a few ahead so the 0.5s cadence never lands on a blank card.
  useEffect(() => {
    if (!n) return;
    for (let d = 1; d <= NEIGHBOURS + 1; d++) {
      const i = (cur + d) % n;
      if (loaded.current.has(i)) continue;
      const im = new Image();
      im.onload = () => markLoaded(i);
      im.src = shots[i];
    }
  }, [cur, n, shots, markLoaded]);

  // Auto-advance, but wait rather than flick past an image that hasn't landed.
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

  if (!n) return null;

  const visible = [];
  for (let i = 0; i < n; i++) {
    const o = relative(i, cur, n);
    if (Math.abs(o) <= NEIGHBOURS) visible.push({ i, o });
  }

  return (
    <>
      {/* No hover-pause: the click that opens the modal leaves the cursor
          sitting on the centred stage, so mouseenter fires immediately and the
          gallery never advances on desktop. Only an explicit move holds it. */}
      <div
        className="pf-flow-stage"
        onTouchStart={(e) => {
          touch.current = e.touches[0].clientX;
          setHeld(true);
        }}
        onTouchEnd={(e) => {
          if (touch.current == null) return;
          const dx = e.changedTouches[0].clientX - touch.current;
          touch.current = null;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1); // RTL-agnostic: follow the finger
        }}
      >
        <div className="pf-flow">
          {visible.map(({ i, o }) => (
            <button
              key={i}
              className={"pf-flow-card" + (o === 0 ? " is-current" : "")}
              style={cardStyle(o)}
              onClick={() => (o === 0 ? onZoom(shots[i]) : go(o > 0 ? 1 : -1))}
              aria-label={o === 0 ? "تكبير الشاشة" : "شاشة أخرى"}
              tabIndex={o === 0 ? 0 : -1}
            >
              <img
                src={shots[i]}
                alt=""
                loading={Math.abs(o) <= 1 ? "eager" : "lazy"}
                decoding="async"
                onLoad={() => markLoaded(i)}
              />
            </button>
          ))}
        </div>

        <button
          className="pf-flow-nav pf-flow-nav--prev"
          onClick={() => go(-1)}
          aria-label="السابق"
        >
          ‹
        </button>
        <button
          className="pf-flow-nav pf-flow-nav--next"
          onClick={() => go(1)}
          aria-label="التالي"
        >
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

            {count > 0 ? (
              <Coverflow
                key={project.slug}
                shots={project.shots}
                onZoom={setZoom}
              />
            ) : (
              // Without this the modal just stops after the description and
              // reads as a broken gallery.
              <div className="pf-soon">
                <span className="pf-soon-icon">📸</span>
                <p className="pf-soon-title">الشاشات قيد التجهيز</p>
                <p className="pf-soon-text">
                  نعمل على تجهيز شاشات هذا النظام لعرضها هنا قريبًا.
                </p>
              </div>
            )}
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
