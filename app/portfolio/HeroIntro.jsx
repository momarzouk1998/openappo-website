"use client";

const SECTORS = [
  "التجارة والتوزيع",
  "التصنيع والمصانع",
  "الخدمات الرقمية",
  "القطاع الخيري",
];

const TITLE = "أنظمة إدارة أعمال نصمّمها لكل نشاط على حِدة";

export default function HeroIntro() {
  const words = TITLE.split(" ");

  return (
    <header className="pf-hero">
      <span className="pf-hero-kicker">سابقة الأعمال • PORTFOLIO</span>

      <h1 className="pf-hero-title">
        {words.map((w, i) => (
          <span key={i} style={{ "--i": i }}>
            {w}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </h1>

      <p className="pf-hero-rot">
        <span className="pf-hero-rot-lead">خبرة مثبتة في</span>
        <span className="pf-hero-rot-win">
          <span className="pf-hero-rot-track">
            {[...SECTORS, SECTORS[0]].map((s, i) => (
              <span key={i}>{s}</span>
            ))}
          </span>
        </span>
      </p>
    </header>
  );
}
