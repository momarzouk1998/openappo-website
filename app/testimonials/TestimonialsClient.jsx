"use client";

import { useEffect, useRef, useState } from "react";
import Avatar3D from "./Avatar3D";

/**
 * Quote text is lorem ipsum on purpose. Real client words go in from the admin
 * panel; filler that is obviously filler is the honest placeholder, and it
 * shows the layout at full length without putting words in a client's mouth.
 */
const LOREM = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam.",
  "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor.",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat.",
  "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum sed ut perspiciatis.",
  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam eaque ipsa.",
  "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione.",
];
const ROLES = [
  "صاحب المنشأة",
  "المدير التنفيذي",
  "مدير العمليات",
  "المدير المالي",
  "مدير الفروع",
  "مسؤول المخازن",
];

function Bubbles() {
  // Decorative depth field behind the hero: message cards drifting on an arc.
  const items = [
    { x: 8, y: 14, d: 0, s: 1, w: 120 },
    { x: 72, y: 8, d: 1.4, s: 0.82, w: 96 },
    { x: 26, y: 62, d: 2.8, s: 0.7, w: 84 },
    { x: 60, y: 54, d: 4.1, s: 0.92, w: 110 },
    { x: 44, y: 26, d: 5.3, s: 0.6, w: 72 },
    { x: 86, y: 44, d: 6.6, s: 0.74, w: 88 },
  ];
  return (
    <div className="tm-bubbles" aria-hidden="true">
      {items.map((b, i) => (
        <span
          key={i}
          className="tm-bubble"
          style={{
            left: `${b.x}%`,
            top: `${b.y}%`,
            width: b.w,
            "--d": `${b.d}s`,
            "--s": b.s,
          }}
        >
          <i />
          <i />
          <i />
        </span>
      ))}
    </div>
  );
}

export default function TestimonialsClient({ clients = [], testimonials = [] }) {
  // Real reviews, once any exist, replace the placeholders entirely.
  const real = testimonials.length > 0;
  const [active, setActive] = useState(null);
  const gridRef = useRef(null);

  // Cards lift in as they enter the viewport.
  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    el.querySelectorAll(".tm-card").forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, [clients]);

  useEffect(() => {
    if (!active) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  const logoFor = (slug) =>
    (slug && clients.find((c) => c.slug === slug)?.logo) || "";

  const cards = real
    ? testimonials.map((t) => ({
        key: t.id,
        seed: t.avatarSeed || t.id,
        variant: t.avatarStyle || "auto",
        photo: t.photoUrl || "",
        quote: t.quote,
        name: t.clientName || t.company,
        role: t.role,
        company: t.company,
        logo: logoFor(t.projectSlug),
        tag: t.company,
      }))
    : (clients.length
        ? clients
        : Array.from({ length: 6 }, (_, i) => ({ slug: `demo-${i}`, name: "—" }))
      ).map((c, i) => ({
        key: c.slug || i,
        seed: c.slug || `s${i}`,
        variant: "auto",
        photo: "",
        quote: LOREM[i % LOREM.length],
        name: ROLES[i % ROLES.length],
        role: "",
        company: c.name,
        logo: c.logo || "",
        tag: c.subtitle || "",
      }));

  return (
    <>
      <header className="tm-hero">
        <Bubbles />
        <span className="tm-kicker">آراء العملاء</span>
        <h1 className="tm-title">
          <span>ما يقوله</span> <em>شركاؤنا</em> <span>عن العمل معنا</span>
        </h1>
        {real ? (
          <p className="tm-sub">
            كلمات نقلناها كما وردت من الجهات التي تعمل على أنظمة Openappo كل يوم.
          </p>
        ) : (
          <>
            <p className="tm-sub">
              هذه الصفحة جاهزة لاستقبال آراء عملائنا الحقيقية. النصوص الظاهرة
              الآن نصوص تجريبية (Lorem ipsum) لعرض الشكل النهائي فقط، وتُستبدل
              من لوحة التحكم فور وصول كل رأي.
            </p>
            <span className="tm-placeholder-flag">
              <b>نماذج عرض</b> — النصوص تجريبية ولم تصدر عن العملاء
            </span>
          </>
        )}
      </header>

      <div className="tm-grid" ref={gridRef}>
        {cards.map((c, i) => (
          <article
            className="tm-card"
            key={c.key}
            style={{ "--i": i }}
            onClick={() => setActive(c)}
          >
            <div className="tm-card-glow" aria-hidden="true" />
            <div className="tm-quote-mark" aria-hidden="true">”</div>

            <p className={`tm-quote${real ? " is-real" : ""}`}>{c.quote}</p>

            <footer className="tm-who">
              {c.photo ? (
                <img
                  className="tm-avatar tm-photo"
                  src={c.photo}
                  alt=""
                  width={58}
                  height={58}
                  loading="lazy"
                />
              ) : (
                <Avatar3D seed={c.seed} size={58} variant={c.variant} />
              )}
              <span className="tm-who-text">
                <span className="tm-who-name">
                  {c.name}
                  {c.role ? ` · ${c.role}` : ""}
                </span>
                <span className="tm-who-co">{c.company}</span>
              </span>
              {c.logo ? (
                <img className="tm-who-logo" src={c.logo} alt="" loading="lazy" />
              ) : null}
            </footer>
          </article>
        ))}
      </div>

      {active && (
        <div className="tm-modal" onClick={() => setActive(null)}>
          <div className="tm-modal-inner" onClick={(e) => e.stopPropagation()}>
            <button
              className="tm-modal-close"
              onClick={() => setActive(null)}
              aria-label="إغلاق"
            >
              ✕
            </button>
            {active.photo ? (
              <img
                className="tm-avatar tm-photo"
                src={active.photo}
                alt=""
                width={104}
                height={104}
              />
            ) : (
              <Avatar3D seed={active.seed} size={104} variant={active.variant} />
            )}
            <p className={`tm-modal-quote${real ? " is-real" : ""}`}>
              {active.quote}
            </p>
            <div className="tm-modal-who">
              <b>
                {active.name}
                {active.role ? ` · ${active.role}` : ""}
              </b>
              <span>{active.company}</span>
            </div>
            {active.tag && active.tag !== active.company ? (
              <span className="tm-modal-tag">{active.tag}</span>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
}
