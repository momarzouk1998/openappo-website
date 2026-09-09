"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

// Screenshots + metadata come from the manifest the admin panel publishes.
// Project shape: { slug, name, subtitle, desc, youtubeId, logo, shots: [url] }

// Split the screenshots into `n` columns (round-robin), then double each column
// so the infinite -50% vertical drift wraps seamlessly.
function buildColumns(shots, n) {
  const src = shots && shots.length ? shots : [];
  const base = Array.from({ length: n }, () => []);
  for (let i = 0; i < src.length; i++) base[i % n].push(src[i]);
  return base.map((col) => {
    let list = col.length ? col.slice() : src.slice(0, 1);
    const min = n === 1 ? 2 : 4;
    while (list.length && list.length < min) {
      list = list.concat(col.length ? col : list);
    }
    return list.concat(list);
  });
}

export default function PortfolioGallery({ projects = [] }) {
  const [activeSlug, setActiveSlug] = useState(null);
  const [zoom, setZoom] = useState(null);
  const [oneCol, setOneCol] = useState(false);

  const project = projects.find((p) => p.slug === activeSlug) || null;
  const count = project ? (project.shots || []).length : 0;
  const columns = useMemo(
    () => (project ? buildColumns(project.shots || [], oneCol ? 1 : 3) : []),
    [project, oneCol]
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const sync = () => setOneCol(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

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
          <button
            key={p.slug}
            className="pf-card"
            style={{ animationDelay: `${i * 55}ms` }}
            onClick={() => setActiveSlug(p.slug)}
          >
            <span className="pf-card-logo">
              {p.logo ? (
                <img src={p.logo} alt={p.name} loading="lazy" />
              ) : (
                <span className="pf-card-logo-txt">{(p.name || "?").trim()[0]}</span>
              )}
            </span>
            <span className="pf-card-name">{p.name}</span>
            <span className="pf-card-sub">{p.subtitle}</span>
            <span className="pf-card-count">{(p.shots || []).length} شاشة</span>
          </button>
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

            {count > 0 && (
              <>
                <div className="pf-wall-stage">
                  <div className="pf-wall" key={project.slug}>
                    {columns.map((col, ci) => (
                      <div
                        key={ci}
                        className={
                          "pf-wall-col" + (ci === 1 ? " pf-wall-col--down" : "")
                        }
                      >
                        {col.map((src, i) => (
                          <button
                            key={i}
                            className="pf-wall-shot"
                            onClick={() => setZoom(src)}
                            aria-label="تكبير الشاشة"
                          >
                            <img
                              src={src}
                              alt=""
                              loading={ci === 0 && i < 2 ? "eager" : "lazy"}
                            />
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
                <p className="pf-wall-hint">اضغط على أي شاشة لتكبيرها</p>
              </>
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
