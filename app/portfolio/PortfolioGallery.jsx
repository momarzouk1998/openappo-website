"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import SHOTS from "./shots.json";

// No live URLs on purpose — these are internal client systems.
const PROJECTS = [
  {
    slug: "opengym",
    name: "OpenGym",
    subtitle: "منصة إدارة الجيمات",
    desc: "منصة متكاملة لإدارة الجيمات: الاشتراكات والمدفوعات والأعضاء والموظفين والتقارير من لوحة تحكم واحدة.",
  },
  {
    slug: "binqasim",
    name: "بي قاسم",
    subtitle: "استيراد وتصدير وتوزيع",
    desc: "نظام إدارة شركة استيراد وتصدير: شحنات الاستيراد وتوزيع التكاليف، المخزون وتقييم العملات، العملاء والموردين، المبيعات والأقساط، الموارد البشرية والتقارير المالية.",
  },
  {
    slug: "elhoot",
    name: "الحوت للأدوات الكهربائية",
    subtitle: "نظام إدارة تجارة الجملة",
    desc: "نظام إدارة تجارة الجملة للأدوات الكهربائية — مبيعات، مخزون، عملاء وموردين، وحسابات في مكان واحد.",
  },
  {
    slug: "elnazlawy",
    name: "النزلاوي",
    subtitle: "تجارة وتوزيع الأجهزة الكهربائية",
    desc: "نظام إدارة تجارة وتوزيع الأجهزة الكهربائية والإضاءة — مبيعات ومخزون وعملاء وحسابات.",
  },
  {
    slug: "maspero",
    name: "ماسبيرو",
    subtitle: "الخدمات الرقمية والمحافظ",
    desc: "نظام إدارة خدمات الطباعة والإنترنت والمحافظ الإلكترونية — نقطة بيع، إدارة الشفتات، التعاملات المالية وحوافز الموظفين.",
  },
  {
    slug: "mazaya",
    name: "مزايا للأثاث",
    subtitle: "نظام إدارة المصنع",
    desc: "نظام إدارة مصنع أثاث — متابعة الإنتاج والمخزون والطلبات والحسابات.",
  },
  {
    slug: "kishk",
    name: "أحمد كشك",
    subtitle: "الأقمشة والستائر الفاخرة",
    desc: "نظام متكامل لإدارة مؤسسة أحمد كشك للأقمشة والستائر بفروعها الأربعة. بيتابع رحلة الطلب من رفع المقاسات والتسعير والعقد، لقص القماش والورشة والتركيب — مع المخزون والأصناف، الحسابات والتحصيلات، صلاحيات الموظفين لكل فرع، وتقارير تنفيذية لحظية.",
  },
  {
    slug: "rtx",
    name: "RTX",
    subtitle: "نظام إدارة الشركة",
    desc: "نظام إدارة شركة RTX للتجارة والتصنيع — الاشتراكات والعمليات والمتابعة اليومية.",
  },
  {
    slug: "riyadalquran",
    name: "رياض القرآن الكريم",
    subtitle: "موقع جمعية خيرية",
    desc: "الموقع الإلكتروني لجمعية رياض القرآن الكريم الخيرية — عرض المشاريع والحالات وبوابة التبرعات.",
  },
].filter((p) => (SHOTS[p.slug] || 0) > 0);

const shotSrc = (slug, i) =>
  `/portfolio/systems/${slug}/${slug}-${String(i + 1).padStart(2, "0")}.jpg`;

// Split the screenshots into `n` columns (round-robin), then double each column
// so the infinite -50% vertical drift wraps seamlessly.
function buildColumns(slug, count, n) {
  const base = Array.from({ length: n }, () => []);
  for (let i = 0; i < count; i++) base[i % n].push(shotSrc(slug, i));
  return base.map((col) => {
    let list = col.length ? col.slice() : [shotSrc(slug, 0)];
    const min = n === 1 ? 2 : 4;
    while (list.length < min) list = list.concat(col.length ? col : list);
    return list.concat(list);
  });
}

export default function PortfolioGallery() {
  const [activeSlug, setActiveSlug] = useState(null);
  const [zoom, setZoom] = useState(null);
  const [oneCol, setOneCol] = useState(false);

  const project = PROJECTS.find((p) => p.slug === activeSlug) || null;
  const count = project ? SHOTS[project.slug] || 0 : 0;
  const columns = useMemo(
    () => (project ? buildColumns(project.slug, count, oneCol ? 1 : 3) : []),
    [project, count, oneCol]
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
        {PROJECTS.map((p, i) => (
          <button
            key={p.slug}
            className="pf-card"
            style={{ animationDelay: `${i * 55}ms` }}
            onClick={() => setActiveSlug(p.slug)}
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
                <div className="pf-modal-sub">
                  {project.subtitle} · {count} شاشة
                </div>
              </div>
              <button className="pf-modal-close" onClick={close} aria-label="إغلاق">
                ✕
              </button>
            </div>

            {project.desc && <p className="pf-modal-desc">{project.desc}</p>}

            <div className="pf-wall-stage">
              <div className="pf-wall" key={project.slug}>
                {columns.map((col, ci) => (
                  <div
                    key={ci}
                    className={"pf-wall-col" + (ci === 1 ? " pf-wall-col--down" : "")}
                  >
                    {col.map((src, i) => (
                      <button
                        key={i}
                        className="pf-wall-shot"
                        onClick={() => setZoom(src)}
                        aria-label="تكبير الشاشة"
                      >
                        <img src={src} alt="" loading={ci === 0 && i < 2 ? "eager" : "lazy"} />
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <p className="pf-wall-hint">اضغط على أي شاشة لتكبيرها</p>
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
