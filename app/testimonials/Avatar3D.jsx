"use client";

/**
 * Cartoon avatar drawn as SVG, shaded to read as 3D — layered radial
 * gradients for the volume, a specular highlight, and a contact shadow.
 *
 * These are illustrations, not portraits: nothing here depicts a real person,
 * which is the point. Every feature is picked deterministically from the seed,
 * so a given client always gets the same face.
 */

const SKIN = [
  ["#f3c9a4", "#dfa374", "#b97f52"],
  ["#e8b088", "#cd8b5e", "#a56a3f"],
  ["#c98d62", "#a86b42", "#82502f"],
  ["#8d5a3b", "#6f4229", "#52301c"],
];
const HAIR = ["#2b2118", "#4a3325", "#1c1c22", "#6b4a2f", "#3a2a20"];
const SHIRT = [
  ["#3ddad2", "#1f9c96"],
  ["#5b8def", "#3560c4"],
  ["#ff7a7a", "#d65252"],
  ["#f2b03d", "#c88a1e"],
  ["#9b7bf0", "#6d51c4"],
  ["#43c47c", "#2b8f57"],
];
const BACKDROP = [
  ["#0f3b46", "#07202a"],
  ["#123049", "#08192b"],
  ["#3a1f2e", "#1d0f1a"],
  ["#1b3320", "#0c1a10"],
];

/** Small deterministic hash so the same name always yields the same avatar. */
function hash(seed) {
  let h = 2166136261;
  const s = String(seed || "openappo");
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

export default function Avatar3D({ seed = "", size = 96, className = "" }) {
  const h = hash(seed);
  const skin = SKIN[h % SKIN.length];
  const hair = HAIR[(h >> 3) % HAIR.length];
  const shirt = SHIRT[(h >> 6) % SHIRT.length];
  const back = BACKDROP[(h >> 9) % BACKDROP.length];
  const glasses = ((h >> 12) % 3) === 0;
  const beard = ((h >> 14) % 4) === 0;
  const longHair = ((h >> 16) % 3) === 0;
  const uid = `av${h % 100000}`;

  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={`tm-avatar ${className}`}
      role="img"
      aria-label="صورة رمزية توضيحية"
    >
      <defs>
        <radialGradient id={`${uid}-bg`} cx="35%" cy="25%" r="85%">
          <stop offset="0%" stopColor={back[0]} />
          <stop offset="100%" stopColor={back[1]} />
        </radialGradient>
        <radialGradient id={`${uid}-skin`} cx="36%" cy="28%" r="78%">
          <stop offset="0%" stopColor={skin[0]} />
          <stop offset="62%" stopColor={skin[1]} />
          <stop offset="100%" stopColor={skin[2]} />
        </radialGradient>
        <linearGradient id={`${uid}-shirt`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={shirt[0]} />
          <stop offset="100%" stopColor={shirt[1]} />
        </linearGradient>
        <radialGradient id={`${uid}-hair`} cx="34%" cy="20%" r="80%">
          <stop offset="0%" stopColor={hair} stopOpacity="0.82" />
          <stop offset="100%" stopColor={hair} />
        </radialGradient>
        <radialGradient id={`${uid}-spec`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="60" cy="60" r="60" fill={`url(#${uid}-bg)`} />

      {/* shoulders */}
      <path
        d="M18 120c0-22 19-34 42-34s42 12 42 34z"
        fill={`url(#${uid}-shirt)`}
      />
      <path d="M52 90h16l-8 12z" fill="#fff" opacity="0.16" />

      {/* neck, with the shadow the jaw casts on it */}
      <path d="M50 74h20v16a10 10 0 0 1-20 0z" fill={skin[1]} />
      <ellipse cx="60" cy="76" rx="11" ry="5" fill={skin[2]} opacity="0.55" />

      {longHair && (
        <path d="M28 52c0 26 6 34 6 34h-9c-5-10-6-24-4-34zM92 52c0 26-6 34-6 34h9c5-10 6-24 4-34z" fill={`url(#${uid}-hair)`} />
      )}

      {/* head */}
      <ellipse cx="60" cy="52" rx="27" ry="30" fill={`url(#${uid}-skin)`} />
      {/* ears */}
      <ellipse cx="33" cy="54" rx="5" ry="7" fill={skin[1]} />
      <ellipse cx="87" cy="54" rx="5" ry="7" fill={skin[1]} />

      {/* hair cap */}
      <path
        d="M33 46c0-17 12-26 27-26s27 9 27 26c0 0-6-11-27-11S33 46 33 46z"
        fill={`url(#${uid}-hair)`}
      />

      {/* eyes */}
      <ellipse cx="50" cy="52" rx="3.4" ry="4" fill="#1a1a22" />
      <ellipse cx="70" cy="52" rx="3.4" ry="4" fill="#1a1a22" />
      <circle cx="51.2" cy="50.6" r="1.1" fill="#fff" opacity="0.9" />
      <circle cx="71.2" cy="50.6" r="1.1" fill="#fff" opacity="0.9" />

      {/* brows */}
      <path d="M45 44q5-3 10 0" stroke={hair} strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M65 44q5-3 10 0" stroke={hair} strokeWidth="2" fill="none" strokeLinecap="round" />

      {glasses && (
        <g stroke="#e8f6f5" strokeWidth="1.8" fill="none" opacity="0.9">
          <circle cx="50" cy="52" r="8" />
          <circle cx="70" cy="52" r="8" />
          <path d="M58 52h4M42 51l-7-2M78 51l7-2" />
        </g>
      )}

      {/* nose + smile */}
      <path d="M60 55v6l-3 2" stroke={skin[2]} strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M52 66q8 6 16 0" stroke="#8c4a44" strokeWidth="2.2" fill="none" strokeLinecap="round" />

      {beard && (
        <path d="M36 56c0 18 11 27 24 27s24-9 24-27c0 0-4 20-24 20s-24-20-24-20z" fill={hair} opacity="0.85" />
      )}

      {/* specular sheen that sells the volume */}
      <ellipse cx="47" cy="40" rx="13" ry="10" fill={`url(#${uid}-spec)`} />
    </svg>
  );
}
