"use client";

import { useEffect, useState } from "react";

const KEY = "pf-theme";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("dark");

  // The inline script in page.jsx has already applied the stored choice before
  // first paint; this only syncs React to whatever it decided.
  useEffect(() => {
    setTheme(document.documentElement.dataset.pfTheme || "dark");
  }, []);

  const flip = () => {
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
    <button
      className="pf-theme"
      onClick={flip}
      aria-label={theme === "light" ? "الوضع الداكن" : "الوضع الفاتح"}
      title={theme === "light" ? "الوضع الداكن" : "الوضع الفاتح"}
    >
      <span className="pf-theme-track">
        <span className="pf-theme-knob">{theme === "light" ? "☀️" : "🌙"}</span>
      </span>
    </button>
  );
}
