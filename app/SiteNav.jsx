"use client";

import { useEffect, useRef, useState } from "react";

const LINKS = [
  { href: "/", label: "الرئيسية", icon: "⌂" },
  { href: "/portfolio", label: "سابقة الأعمال", icon: "🏆" },
  { href: "/testimonials", label: "آراء العملاء", icon: "★" },
  { href: "/contact", label: "تواصل بينا", icon: "✆" },
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
export default function SiteNav({ current = "" }) {
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

  return (
    <header className={`site-nav${hidden ? " is-hidden" : ""}`}>
      <a href="/" className="site-nav-logo" aria-label="Openappo">
        <img src="/brand/openappo-wordmark-dark.png" alt="Openappo" />
      </a>

      <div className="site-nav-menu" ref={panelRef}>
        <button
          type="button"
          className={`site-nav-burger${open ? " is-open" : ""}`}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`site-nav-panel${open ? " is-open" : ""}`}>
          <ul>
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={l.href === current ? "is-current" : ""}
                  aria-current={l.href === current ? "page" : undefined}
                >
                  <span className="site-nav-ico" aria-hidden="true">
                    {l.icon}
                  </span>
                  <span>{l.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <button type="button" className="site-nav-theme" onClick={flipTheme}>
            <span className="site-nav-ico" aria-hidden="true">
              {theme === "light" ? "🌙" : "☀️"}
            </span>
            <span>{theme === "light" ? "الوضع الداكن" : "الوضع الفاتح"}</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
