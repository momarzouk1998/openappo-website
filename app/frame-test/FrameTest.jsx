"use client";

import { useEffect, useState } from "react";

const VERSIONS = [
  { key: "orig", label: "الأصلي JPEG q92", ext: "jpg" },
  { key: "avif78", label: "AVIF q78", ext: "avif" },
  { key: "avif60", label: "AVIF q60", ext: "avif" },
  { key: "webp88", label: "WebP q88", ext: "webp" },
];
const FRAMES = ["030", "050"];
const KB = {
  "030": { orig: 266, avif78: 132, avif60: 81, webp88: 148 },
  "050": { orig: 268, avif78: 137, avif60: 85, webp88: 147 },
};

export default function FrameTest() {
  const [frame, setFrame] = useState("030");
  const [vi, setVi] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [avifOk, setAvifOk] = useState(null);

  // Does this browser actually decode AVIF?
  useEffect(() => {
    const img = new Image();
    img.onload = () => setAvifOk(true);
    img.onerror = () => setAvifOk(false);
    img.src =
      "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAABEaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=";
  }, []);

  const v = VERSIONS[vi];
  const src = `/ftest/f${frame}-${v.key}.${v.ext}`;
  const kb = KB[frame][v.key];
  const total = ((kb * 60) / 1024).toFixed(1);

  return (
    <main
      style={{
        minHeight: "100dvh",
        background: "#000",
        color: "#fff",
        fontFamily: "system-ui, sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ padding: "12px 14px", borderBottom: "1px solid #222" }}>
        <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 2 }}>
          {v.label} — {kb}KB للإطار · {total}MB للـ60 إطار
        </div>
        <div style={{ fontSize: 12, color: "#8b95a5" }}>
          دوس على الصورة تبدّل بين النسخ · نفس الأبعاد 1920×1080 في كل نسخة
          {avifOk === false && " · ⚠️ متصفحك مش بيدعم AVIF"}
        </div>
      </div>

      <div
        onClick={() => setVi((i) => (i + 1) % VERSIONS.length)}
        style={{
          flex: 1,
          overflow: zoom ? "auto" : "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=""
          style={
            zoom
              ? { width: 1920, maxWidth: "none" }
              : { maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }
          }
        />
      </div>

      <div
        style={{
          display: "flex",
          gap: 6,
          padding: 10,
          borderTop: "1px solid #222",
          flexWrap: "wrap",
        }}
      >
        {VERSIONS.map((x, i) => (
          <button
            key={x.key}
            onClick={() => setVi(i)}
            style={{
              flex: "1 1 auto",
              padding: "10px 8px",
              borderRadius: 10,
              border: "1px solid " + (i === vi ? "#3ddad2" : "#2a2f3a"),
              background: i === vi ? "rgba(61,218,210,.15)" : "#12161d",
              color: i === vi ? "#3ddad2" : "#98a2b3",
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            {x.label}
          </button>
        ))}
        <button
          onClick={() => setZoom((z) => !z)}
          style={{
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid #2a2f3a",
            background: zoom ? "rgba(255,122,122,.15)" : "#12161d",
            color: zoom ? "#ff7a7a" : "#98a2b3",
            fontSize: 12,
            fontWeight: 700,
          }}
        >
          {zoom ? "خروج من التكبير" : "تكبير 1:1"}
        </button>
        <button
          onClick={() => setFrame((f) => (f === FRAMES[0] ? FRAMES[1] : FRAMES[0]))}
          style={{
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid #2a2f3a",
            background: "#12161d",
            color: "#98a2b3",
            fontSize: 12,
            fontWeight: 700,
          }}
        >
          إطار آخر
        </button>
      </div>
    </main>
  );
}
