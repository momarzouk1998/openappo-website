"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { href: "#top", label: "الرئيسية" },
  { href: "#portfolio", label: "سابقة الأعمال" },
];

export default function Navbar() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar${solid ? " navbar-solid" : ""}`}>
      <a href="#top" className="navbar-brand">
        <span className="navbar-mark">
          <span className="navbar-mark-teal" />
          <span className="navbar-mark-coral" />
        </span>
        Openappo
      </a>
      <div className="navbar-links">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} className="navbar-link">
            {l.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
