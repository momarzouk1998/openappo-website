"use client";

import { useEffect, useRef, useState } from "react";

const LINKS = [
  { href: "/", labelAr: "الرئيسية", labelEn: "Home", icon: "⌂" },
  { href: "/how-it-works", labelAr: "إزاي بنشتغل", labelEn: "How it works", icon: "⚙", arOnly: true },   // no /en version yet
  { href: "/portfolio", labelAr: "سابقة الأعمال", labelEn: "Portfolio", icon: "🏆" },
  { href: "/blog", labelAr: "المدونة", labelEn: "Blog", icon: "📝" },
  { href: "/testimonials", labelAr: "آراء العملاء", labelEn: "Testimonials", icon: "★" },
  { href: "/contact", labelAr: "تواصل بينا", labelEn: "Contact", icon: "✆" },
];

const KEY = "pf-theme";

/**
 * Top bar for the inner pages: the wordmark on one side, a menu button on the
 * other. It replaces the three separate floating controls (logo, back link,
 * theme switch) that used to compete for the same corners.
 *
 * The wordmark hides on the way down and comes back on the way up, so it never
 * sits over the content while reading.
 */
export default function SiteNav({ current = "", lang = "ar" }) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [theme, setTheme] = useState("dark");
  const lastY = useRef(0);
  const panelRef = useRef(null);

  useEffect(() => {
    setTheme(document.documentElement.dataset.pfTheme || "dark");
  }, []);

  useEffect(() => {
    lastY.current = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        // A small threshold stops the bar flickering on momentum bounce.
        if (Math.abs(y - lastY.current) > 8) {
          setHidden(y > 120 && y > lastY.current);
          lastY.current = y;
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on Escape or on a click outside the panel.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const onDown = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  const flipTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.dataset.pfTheme = next;
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* private mode — the choice just won't persist */
    }
  };

  const isEn = lang === "en";
  const localize = (href) => (isEn ? (href === "/" ? "/en" : `/en${href}`) : href);
  const otherLangHref = isEn ? current || "/" : current === "/" || !current ? "/en" : `/en${current}`;

  return (
    <header className={`site-nav${hidden ? " is-hidden" : ""}`}>
      <a href={localize("/")} className="site-nav-logo" aria-label="Openappo">
        <img src="/brand/openappo-wordmark-dark.png" alt="Openappo" />
      </a>

      <div className="site-nav-menu" ref={panelRef}>
        <button
          type="button"
          className={`site-nav-burger${open ? " is-open" : ""}`}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? (isEn ? "Close menu" : "إغلاق القائمة") : isEn ? "Open menu" : "فتح القائمة"}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`site-nav-panel${open ? " is-open" : ""}`}>
          <ul>
            {LINKS.filter((l) => !(isEn && l.arOnly)).map((l) => (
              <li key={l.href}>
                <a
                  href={localize(l.href)}
                  className={l.href === current ? "is-current" : ""}
                  aria-current={l.href === current ? "page" : undefined}
                >
                  <span className="site-nav-ico" aria-hidden="true">
                    {l.icon}
                  </span>
                  <span>{isEn ? l.labelEn : l.labelAr}</span>
                </a>
              </li>
            ))}
          </ul>

          <a href={otherLangHref} className="site-nav-lang" lang={isEn ? "ar" : "en"}>
            <span className="site-nav-ico" aria-hidden="true">🌐</span>
            <span>{isEn ? "العربية" : "English"}</span>
          </a>

          <button type="button" className="site-nav-theme" onClick={flipTheme}>
            <span className="site-nav-ico" aria-hidden="true">
              {theme === "light" ? "🌙" : "☀️"}
            </span>
            <span>
              {isEn
                ? theme === "light" ? "Dark mode" : "Light mode"
                : theme === "light" ? "الوضع الداكن" : "الوضع الفاتح"}
            </span>
          </button>

          <div className="site-nav-legal">
            <a href={localize("/privacy")}>{isEn ? "Privacy" : "الخصوصية"}</a>
            <a href={localize("/terms")}>{isEn ? "Terms" : "الشروط"}</a>
          </div>
        </nav>
      </div>
    </header>
  );
}
