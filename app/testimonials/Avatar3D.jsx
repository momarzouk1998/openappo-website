"use client";

/**
 * Cartoon avatar drawn as SVG and shaded to read as 3D.
 *
 * What makes it read as volume rather than a flat sticker: a key light from the
 * upper left, blurred occlusion shadows where forms meet (hair on forehead, jaw
 * on neck, head on shoulders), a rim light on the shadow side, and a specular
 * highlight on the forehead. Every shape is a smooth path — no hard strokes
 * outlining the silhouette, which is what made the first version look flat.
 *
 * These are illustrations, not portraits: nothing here depicts a real person,
 * which is the point. Every feature is picked deterministically from the seed,
 * so a given client always gets the same face.
 */

const SKIN = [
  { lit: "#ffd9b8", mid: "#f0b98c", dark: "#cf9063", line: "#a86f45" },
  { lit: "#f6c49a", mid: "#e0a273", dark: "#b87c4f", line: "#8f5c33" },
  { lit: "#e0a878", mid: "#c78652", dark: "#a1653a", line: "#7c4a27" },
  { lit: "#b9825a", mid: "#9a6440", dark: "#77492c", line: "#56331d" },
  { lit: "#8d5f40", mid: "#70452b", dark: "#54321e", line: "#3a2214" },
];
const HAIR = [
  { lit: "#4a3a2c", mid: "#2f241a", dark: "#1b140e" },
  { lit: "#2d2d38", mid: "#1b1b24", dark: "#101017" },
  { lit: "#7a5433", mid: "#573a22", dark: "#3a2614" },
  { lit: "#6b6b76", mid: "#4c4c56", dark: "#32323a" },
  { lit: "#3c2a3a", mid: "#281c28", dark: "#181018" },
];
const SHIRT = [
  { lit: "#5ee6de", mid: "#2bb3ac", dark: "#17807b" },
  { lit: "#7ba6ff", mid: "#4a72d6", dark: "#2f4d9b" },
  { lit: "#ff9a9a", mid: "#e06b6b", dark: "#a94747" },
  { lit: "#ffc95e", mid: "#e0a22b", dark: "#a8741a" },
  { lit: "#b79cff", mid: "#8768e8", dark: "#5c44a8" },
  { lit: "#6fdb9a", mid: "#3fae6c", dark: "#277a49" },
  { lit: "#dfe6ef", mid: "#b8c3d1", dark: "#8794a5" },
];
const BACKDROP = [
  ["#134d55", "#06232c"],
  ["#15395c", "#071a2e"],
  ["#4a2338", "#1e0d19"],
  ["#1d3e26", "#0b1a10"],
  ["#3d3320", "#1a1409"],
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
  const shirt = SHIRT[(h >> 7) % SHIRT.length];
  const back = BACKDROP[(h >> 11) % BACKDROP.length];

  // 0 short · 1 quiff · 2 curls · 3 bob · 4 headscarf
  const style = (h >> 15) % 5;
  const glasses = ((h >> 19) % 4) === 0;
  const beard = style !== 3 && style !== 4 && ((h >> 22) % 3) === 0;
  const uid = `a${(h % 1000000).toString(36)}`;

  const scarf = SHIRT[(h >> 25) % SHIRT.length];

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
        <linearGradient id={`${uid}bg`} x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor={back[0]} />
          <stop offset="100%" stopColor={back[1]} />
        </linearGradient>
        <radialGradient id={`${uid}glow`} cx="30%" cy="22%" r="62%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>

        {/* Key light from upper-left: lit -> mid -> dark across the form. */}
        <linearGradient id={`${uid}skin`} x1="0.15" y1="0.1" x2="0.85" y2="0.95">
          <stop offset="0%" stopColor={skin.lit} />
          <stop offset="48%" stopColor={skin.mid} />
          <stop offset="100%" stopColor={skin.dark} />
        </linearGradient>
        <linearGradient id={`${uid}hair`} x1="0.15" y1="0" x2="0.85" y2="1">
          <stop offset="0%" stopColor={hair.lit} />
          <stop offset="45%" stopColor={hair.mid} />
          <stop offset="100%" stopColor={hair.dark} />
        </linearGradient>
        <linearGradient id={`${uid}shirt`} x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor={shirt.lit} />
          <stop offset="50%" stopColor={shirt.mid} />
          <stop offset="100%" stopColor={shirt.dark} />
        </linearGradient>
        <linearGradient id={`${uid}scarf`} x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor={scarf.lit} />
          <stop offset="50%" stopColor={scarf.mid} />
          <stop offset="100%" stopColor={scarf.dark} />
        </linearGradient>
        <radialGradient id={`${uid}spec`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>

        {/* Soft contact shadows — this is most of the 3D read. */}
        <filter id={`${uid}soft`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
        <filter id={`${uid}soft2`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="1.6" />
        </filter>

        <clipPath id={`${uid}clip`}>
          <circle cx="60" cy="60" r="60" />
        </clipPath>
      </defs>

      <g clipPath={`url(#${uid}clip)`}>
        <circle cx="60" cy="60" r="60" fill={`url(#${uid}bg)`} />
        <circle cx="60" cy="60" r="60" fill={`url(#${uid}glow)`} />

        {/* Shadow the figure casts on the backdrop. */}
        <ellipse
          cx="64"
          cy="96"
          rx="46"
          ry="26"
          fill="#000"
          opacity="0.28"
          filter={`url(#${uid}soft)`}
        />

        {/* ---- Torso ---- */}
        <path
          d="M60 84c-24 0-42 13-46 36h92c-4-23-22-36-46-36z"
          fill={`url(#${uid}shirt)`}
        />
        {/* collar opening + the shadow the neck drops into it */}
        <path
          d="M49 87c4 7 7 11 11 11s7-4 11-11c-4-2-7-3-11-3s-7 1-11 3z"
          fill="#000"
          opacity="0.22"
          filter={`url(#${uid}soft2)`}
        />
        <path d="M50 86l10 10 10-10-4-2-6 6-6-6z" fill="#fff" opacity="0.2" />
        {/* rim light along the shaded shoulder */}
        <path
          d="M94 104c6 5 10 10 12 16h-5c-2-6-5-11-9-16z"
          fill="#fff"
          opacity="0.16"
        />

        {/* ---- Neck ---- */}
        <path d="M51 68h18v18c0 6-18 6-18 0z" fill={skin.mid} />
        <ellipse
          cx="60"
          cy="70"
          rx="13"
          ry="7"
          fill={skin.dark}
          opacity="0.75"
          filter={`url(#${uid}soft2)`}
        />

        {/* hair that falls behind the head */}
        {style === 3 && (
          <path
            d="M27 50c0 24 3 34 5 40h12c-6-12-8-26-6-40zM93 50c0 24-3 34-5 40H76c6-12 8-26 6-40z"
            fill={`url(#${uid}hair)`}
          />
        )}
        {style === 4 && (
          <path
            d="M26 52c0 26 4 36 7 44h54c3-8 7-18 7-44 0-20-15-34-34-34S26 32 26 52z"
            fill={`url(#${uid}scarf)`}
          />
        )}

        {/* ---- Head ---- */}
        <path
          d="M60 20c17 0 28 12 28 29 0 13-5 24-13 31-5 4-10 6-15 6s-10-2-15-6c-8-7-13-18-13-31 0-17 11-29 28-29z"
          fill={`url(#${uid}skin)`}
        />

        {/* ears (hidden under the scarf) */}
        {style !== 4 && (
          <>
            <path d="M33 50c-4 0-6 3-5 7s4 7 7 6z" fill={skin.mid} />
            <path d="M87 50c4 0 6 3 5 7s-4 7-7 6z" fill={skin.dark} />
            <path d="M34 53c-2 1-2 4-1 6" stroke={skin.line} strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.7" />
          </>
        )}

        {/* ---- Hair ---- */}
        {style === 0 && (
          <path
            d="M32 50c-1-19 11-30 28-30s29 11 28 30c-2-3-3-8-4-11-6 5-18 7-28 5-7-1-13-4-16-8-3 3-6 8-8 14z"
            fill={`url(#${uid}hair)`}
          />
        )}
        {style === 1 && (
          <path
            d="M32 50c-2-16 6-27 19-30 4-1 5 1 4 4 8-2 17 1 22 7 6 7 8 13 7 19-2-4-4-8-6-10-6 5-19 7-29 5-6-1-11-4-14-7-2 3-3 7-3 12z"
            fill={`url(#${uid}hair)`}
          />
        )}
        {style === 2 && (
          <g fill={`url(#${uid}hair)`}>
            <path d="M32 50c-1-19 11-30 28-30s29 11 28 30c-2-3-3-8-4-11-6 5-18 7-28 5-7-1-13-4-16-8-3 3-6 8-8 14z" />
            <circle cx="40" cy="30" r="9" />
            <circle cx="55" cy="23" r="10" />
            <circle cx="71" cy="25" r="9" />
            <circle cx="83" cy="35" r="8" />
          </g>
        )}
        {style === 3 && (
          <path
            d="M30 52c-2-21 12-32 30-32s32 11 30 32c-2-5-4-9-6-12-7 6-20 8-31 6-7-2-13-5-16-9-3 4-5 9-7 15z"
            fill={`url(#${uid}hair)`}
          />
        )}
        {style === 4 && (
          <path
            d="M31 52c-1-20 12-32 29-32s30 12 29 32c-3-6-6-10-9-13-7 4-14 6-21 6s-14-2-20-6c-4 3-6 7-8 13z"
            fill={`url(#${uid}scarf)`}
          />
        )}

        {/* occlusion the hairline casts on the forehead */}
        <path
          d="M34 48c4-6 12-9 26-9s22 3 26 9c-4 3-13 5-26 5s-22-2-26-5z"
          fill="#000"
          opacity="0.24"
          filter={`url(#${uid}soft2)`}
        />

        {/* ---- Brows ---- */}
        <path d="M43 50c4-3 9-3 12-1" stroke={hair.dark} strokeWidth="2.6" fill="none" strokeLinecap="round" />
        <path d="M65 49c3-2 8-2 12 1" stroke={hair.dark} strokeWidth="2.6" fill="none" strokeLinecap="round" />

        {/* ---- Eyes ---- */}
        <g>
          <ellipse cx="49" cy="58" rx="6.2" ry="5" fill="#fff" />
          <ellipse cx="71" cy="58" rx="6.2" ry="5" fill="#fff" />
          <ellipse cx="49" cy="56.4" rx="6.2" ry="2.6" fill="#000" opacity="0.14" />
          <ellipse cx="71" cy="56.4" rx="6.2" ry="2.6" fill="#000" opacity="0.14" />
          <circle cx="50" cy="58.5" r="3.3" fill="#4a3b2f" />
          <circle cx="72" cy="58.5" r="3.3" fill="#4a3b2f" />
          <circle cx="50" cy="58.5" r="1.7" fill="#14101a" />
          <circle cx="72" cy="58.5" r="1.7" fill="#14101a" />
          <circle cx="48.5" cy="57" r="1.3" fill="#fff" />
          <circle cx="70.5" cy="57" r="1.3" fill="#fff" />
          {/* upper lash line gives the eye a lid, not a pasted circle */}
          <path d="M43 56c3-3 9-3 12 0" stroke="#2a2028" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          <path d="M65 56c3-3 9-3 12 0" stroke="#2a2028" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </g>

        {glasses && (
          <g opacity="0.95">
            <circle cx="49" cy="58" r="10" fill="#cfefee" opacity="0.14" />
            <circle cx="71" cy="58" r="10" fill="#cfefee" opacity="0.14" />
            <g stroke="#2a3238" strokeWidth="2" fill="none" strokeLinecap="round">
              <circle cx="49" cy="58" r="10" />
              <circle cx="71" cy="58" r="10" />
              <path d="M59 57c1-1 1-1 2 0M39 55l-6-2M81 55l6-2" />
            </g>
            <path d="M43 52l5 4" stroke="#fff" strokeWidth="1.6" opacity="0.6" strokeLinecap="round" />
            <path d="M65 52l5 4" stroke="#fff" strokeWidth="1.6" opacity="0.6" strokeLinecap="round" />
          </g>
        )}

        {/* ---- Nose: a lit plane with a shadow under it ---- */}
        <path d="M60 60c-2 4-3 7-2 8 1 1 3 1 4 0" fill="none" stroke={skin.line} strokeWidth="1.8" strokeLinecap="round" opacity="0.8" />
        <ellipse cx="60" cy="69" rx="5" ry="2" fill={skin.dark} opacity="0.5" filter={`url(#${uid}soft2)`} />

        {/* ---- Mouth ---- */}
        <path d="M52 75c4 5 12 5 16 0-4 2-12 2-16 0z" fill="#6d3230" />
        <path d="M52 75c4 5 12 5 16 0" stroke="#7d3b38" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M54 76c3 1 9 1 12 0" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.75" />

        {/* cheeks */}
        <ellipse cx="41" cy="67" rx="5" ry="3" fill="#e8756f" opacity="0.22" filter={`url(#${uid}soft2)`} />
        <ellipse cx="79" cy="67" rx="5" ry="3" fill="#e8756f" opacity="0.18" filter={`url(#${uid}soft2)`} />

        {beard && (
          <g>
            <path
              d="M35 56c0 9 2 17 7 23 5 6 11 9 18 9s13-3 18-9c5-6 7-14 7-23-2 12-6 18-11 21-4 2-9 3-14 3s-10-1-14-3c-5-3-9-9-11-21z"
              fill={`url(#${uid}hair)`}
              opacity="0.92"
            />
            <path d="M52 71h16c0 2-1 3-2 3H54c-1 0-2-1-2-3z" fill={`url(#${uid}hair)`} opacity="0.9" />
          </g>
        )}

        {/* forehead specular + rim light down the shaded cheek */}
        <ellipse cx="48" cy="46" rx="12" ry="8" fill={`url(#${uid}spec)`} />
        <path
          d="M86 48c2 12-1 24-8 32 4-9 6-20 5-32z"
          fill="#fff"
          opacity="0.2"
        />
      </g>
    </svg>
  );
}
