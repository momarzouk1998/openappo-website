"use client";

/**
 * AvatarChar — Premium Memoji-style SVG character avatars
 *
 * Design language: Apple Memoji / Notion faces — big expressive head,
 * compact shoulders, bold clean features, flat-with-depth shading.
 * Deterministic per seed so each client always gets the same face.
 */

// ─── Palettes ────────────────────────────────────────────────────────────────
const BACKDROPS = [
  { from: "#1e3a5f", to: "#0f2035", rim: "#3b82f6" },  // Deep Blue
  { from: "#1a3a2a", to: "#0d2016", rim: "#22c55e" },  // Forest Green
  { from: "#3b1f4e", to: "#1e0e2c", rim: "#a855f7" },  // Deep Violet
  { from: "#3a1a1a", to: "#1e0d0d", rim: "#ef4444" },  // Burgundy
  { from: "#1f3040", to: "#0d1b28", rim: "#06b6d4" },  // Teal Steel
  { from: "#2d2014", to: "#180e08", rim: "#f59e0b" },  // Warm Amber
];

const SKINS = [
  { base: "#f8d5a8", shade: "#e0a96a", deep: "#b5753a", lip: "#c0604a" },
  { base: "#f5c990", shade: "#d8955a", deep: "#a8642e", lip: "#b85040" },
  { base: "#e8b078", shade: "#c47c40", deep: "#8f5022", lip: "#a84032" },
  { base: "#d09060", shade: "#a65c30", deep: "#783010", lip: "#9a3828" },
  { base: "#b87848", shade: "#8c4e20", deep: "#5e2c08", lip: "#8c3020" },
];

const HAIR_COLORS = [
  { hi: "#5a4030", mid: "#2c1a0c", dark: "#160c04" },  // Dark brown
  { hi: "#2a2a38", mid: "#16161e", dark: "#0a0a10" },  // Black
  { hi: "#c8a060", mid: "#8c6428", dark: "#4c3010" },  // Chestnut
  { hi: "#d0c8b8", mid: "#a09080", dark: "#685848" },  // Salt & Pepper
  { hi: "#a08878", mid: "#685848", dark: "#3c2c20" },  // Dark grey
];

const SUIT_COLORS = [
  { coat: "#1e3a5f", lapel: "#162a47", shirt: "#f0f4f8", tieA: "#c53030", tieB: "#7f1d1d" },
  { coat: "#1a2e1a", lapel: "#122012", shirt: "#f0f4f0", tieA: "#b45309", tieB: "#78350f" },
  { coat: "#2d1f40", lapel: "#1e1230", shirt: "#f4f0f8", tieA: "#2563eb", tieB: "#1e3a8a" },
  { coat: "#1a1a2a", lapel: "#12121e", shirt: "#f0f0f8", tieA: "#059669", tieB: "#064e3b" },
  { coat: "#2a1a10", lapel: "#1c1008", shirt: "#fdf8f0", tieA: "#9333ea", tieB: "#581c87" },
];

const HIJAB_COLORS = [
  { main: "#fde68a", shade: "#d97706", deep: "#92400e" }, // Gold
  { main: "#dbeafe", shade: "#3b82f6", deep: "#1e3a8a" }, // Blue
  { main: "#fce7f3", shade: "#ec4899", deep: "#9d174d" }, // Rose
  { main: "#d1fae5", shade: "#10b981", deep: "#064e3b" }, // Mint
  { main: "#f5f5f4", shade: "#a8a29e", deep: "#57534e" }, // Pearl
];

// ─── Deterministic hash — always returns a safe positive integer ──────────────
function hash(str) {
  let h = 2166136261 >>> 0;
  const s = String(str || "openappo");
  for (let i = 0; i < s.length; i++) {
    h = (h ^ s.charCodeAt(i)) >>> 0;
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h >>> 0;
}

function pick(arr, n) {
  const idx = Math.abs(Number(n) || 0) % arr.length;
  return arr[idx] || arr[0];
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Avatar3D({ seed = "", size = 96, className = "", variant = "auto" }) {
  const h = hash(seed);
  const uid = `mc${(h % 99999999).toString(36)}`;

  const isFemale  = variant === "female" || variant === "hijab";
  const isHijab   = variant === "hijab";
  const isElder   = seed.includes("mazaya") || seed.includes("elnazlawy") || seed.includes("riyad") || seed.includes("furniture");
  const hasGlasses = !isFemale && (seed.includes("rtx") || ((h >> 14) % 5 === 0));
  const hasBeard  = !isFemale && (isElder || ((h >> 9) % 3 !== 2));
  const isAthletic = seed.includes("opengym");

  const bd   = pick(BACKDROPS,   h);
  const skin = pick(SKINS,       h >> 5);
  const hair = pick(HAIR_COLORS, h >> 10);
  const suit = pick(SUIT_COLORS, h >> 18);
  const hj   = pick(HIJAB_COLORS, h >> 22);

  const hairStyle = !isFemale ? Math.abs((h >> 15) % 3) : -1; // 0=short 1=side-part 2=quiff

  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={`tm-avatar ${className}`}
      role="img"
      aria-label="Avatar"
      style={{ display: "block", borderRadius: "50%", overflow: "hidden" }}
    >
      <defs>
        {/* Background */}
        <radialGradient id={`${uid}bg`} cx="45%" cy="35%" r="75%">
          <stop offset="0%" stopColor={bd.from} />
          <stop offset="100%" stopColor={bd.to} />
        </radialGradient>
        <radialGradient id={`${uid}rim`} cx="80%" cy="15%" r="55%">
          <stop offset="0%" stopColor={bd.rim} stopOpacity="0.5" />
          <stop offset="100%" stopColor={bd.rim} stopOpacity="0" />
        </radialGradient>

        {/* Face */}
        <radialGradient id={`${uid}face`} cx="38%" cy="32%" r="65%">
          <stop offset="0%" stopColor={skin.base} />
          <stop offset="60%" stopColor={skin.shade} />
          <stop offset="100%" stopColor={skin.deep} />
        </radialGradient>

        {/* Hair */}
        <linearGradient id={`${uid}hair`} x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor={hair.hi} />
          <stop offset="50%" stopColor={hair.mid} />
          <stop offset="100%" stopColor={hair.dark} />
        </linearGradient>

        {/* Hijab */}
        <linearGradient id={`${uid}hj`} x1="0.15" y1="0" x2="0.85" y2="1">
          <stop offset="0%" stopColor={hj.main} />
          <stop offset="55%" stopColor={hj.shade} />
          <stop offset="100%" stopColor={hj.deep} />
        </linearGradient>

        {/* Suit */}
        <linearGradient id={`${uid}coat`} x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor={suit.coat} />
          <stop offset="100%" stopColor={suit.lapel} />
        </linearGradient>
        <linearGradient id={`${uid}tie`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={suit.tieA} />
          <stop offset="100%" stopColor={suit.tieB} />
        </linearGradient>

        {/* Iris */}
        <radialGradient id={`${uid}iris`} cx="40%" cy="38%" r="60%">
          <stop offset="0%" stopColor="#7c4f22" />
          <stop offset="55%" stopColor="#3b1e08" />
          <stop offset="100%" stopColor="#0f0704" />
        </radialGradient>

        {/* Soft blur filters */}
        <filter id={`${uid}blur3`}><feGaussianBlur stdDeviation="3"/></filter>
        <filter id={`${uid}blur2`}><feGaussianBlur stdDeviation="2"/></filter>
        <filter id={`${uid}blur1`}><feGaussianBlur stdDeviation="1"/></filter>
        <filter id={`${uid}dropshadow`}>
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.35"/>
        </filter>

        <clipPath id={`${uid}circle`}><circle cx="100" cy="100" r="99"/></clipPath>
      </defs>

      <g clipPath={`url(#${uid}circle)`}>
        {/* ── Background ─────────────────────────────────────────────── */}
        <circle cx="100" cy="100" r="100" fill={`url(#${uid}bg)`}/>
        <circle cx="100" cy="100" r="100" fill={`url(#${uid}rim)`}/>
        {/* Floor glow */}
        <ellipse cx="100" cy="195" rx="75" ry="18" fill={bd.rim} opacity="0.12"/>

        {/* ── Body / Suit ─────────────────────────────────────────────── */}
        <g filter={`url(#${uid}dropshadow)`}>
          {/* Shoulders */}
          <path
            d={isAthletic
              ? "M30 210 C32 158 60 142 100 142 C140 142 168 158 170 210 Z"
              : "M28 210 C30 155 58 138 100 138 C142 138 170 155 172 210 Z"
            }
            fill={`url(#${uid}coat)`}
          />
          {/* Left Lapel */}
          <path d="M82 142 L62 165 L82 195 L90 142 Z" fill={suit.lapel}/>
          {/* Right Lapel */}
          <path d="M118 142 L138 165 L118 195 L110 142 Z" fill={suit.lapel} opacity="0.85"/>
          {/* Shirt & Collar */}
          {!isAthletic && (
            <>
              <polygon points="90,142 110,142 100,185" fill={suit.shirt}/>
              <polygon points="90,142 82,155 100,150 Z" fill={`color-mix(in srgb, ${suit.shirt} 80%, ${suit.coat})`} opacity="0.7"/>
              <polygon points="110,142 118,155 100,150 Z" fill={suit.coat} opacity="0.4"/>
              {/* Tie */}
              <polygon points="96,150 104,150 107,200 100,208 93,200" fill={`url(#${uid}tie)`}/>
              <polygon points="94,145 106,145 104,154 96,154" fill={`url(#${uid}tie)`}/>
              {/* Tie dimple */}
              <ellipse cx="100" cy="153" rx="3" ry="1.5" fill={suit.tieB} opacity="0.7"/>
              {/* Tie bar */}
              <line x1="95" y1="175" x2="105" y2="175" stroke="#d4a017" strokeWidth="2" strokeLinecap="round"/>
            </>
          )}
          {isAthletic && (
            /* Polo collar for athletic variant */
            <>
              <rect x="88" y="142" width="24" height="16" rx="4" fill={suit.coat} opacity="0.9"/>
              <line x1="100" y1="142" x2="100" y2="158" stroke={suit.shirt} strokeWidth="2" opacity="0.6"/>
            </>
          )}
        </g>

        {/* ── Neck ────────────────────────────────────────────────────── */}
        <rect x="87" y="118" width="26" height="30" rx="5" fill={skin.shade}/>
        <ellipse cx="100" cy="122" rx="16" ry="7" fill={skin.deep} opacity="0.6" filter={`url(#${uid}blur2)`}/>
        <rect x="89" y="118" width="10" height="26" rx="4" fill={skin.base} opacity="0.4"/>

        {/* ── Head ─────────────────────────────────────────────────────── */}
        {/* Drop shadow */}
        <ellipse cx="102" cy="125" rx="52" ry="10" fill="#000" opacity="0.25" filter={`url(#${uid}blur3)`}/>

        {/* Hijab back (behind head) */}
        {isHijab && (
          <path
            d="M42 80 C42 28 68 18 100 18 C132 18 158 28 158 80 C158 128 144 152 100 156 C56 152 42 128 42 80 Z"
            fill={`url(#${uid}hj)`}
          />
        )}

        {/* Hair behind head (for non-hijab) */}
        {!isFemale && (
          <path
            d={hairStyle === 2
              ? "M48 72 C48 35 68 22 100 22 C132 22 152 35 152 72 C148 48 130 36 100 36 C70 36 52 48 48 72 Z"
              : "M50 70 C50 36 68 22 100 22 C132 22 150 36 150 70 C146 48 128 36 100 36 C72 36 54 48 50 70 Z"
            }
            fill={`url(#${uid}hair)`}
          />
        )}

        {/* ── Face Oval ─────────────────────────────────────────────── */}
        <ellipse
          cx="100" cy="85"
          rx="52" ry="60"
          fill={`url(#${uid}face)`}
        />

        {/* Ears */}
        {!isHijab && (
          <>
            <path d="M48 80 C42 80 40 96 46 100 C50 102 52 98 50 88 Z" fill={skin.shade}/>
            <path d="M45 85 C43 85 43 92 46 94" stroke={skin.deep} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            <path d="M152 80 C158 80 160 96 154 100 C150 102 148 98 150 88 Z" fill={skin.deep}/>
          </>
        )}

        {/* Chin shadow */}
        <ellipse cx="100" cy="135" rx="28" ry="6" fill={skin.deep} opacity="0.4" filter={`url(#${uid}blur2)`}/>

        {/* Cheek blush */}
        <ellipse cx="66" cy="95" rx="12" ry="8" fill="#f43f5e" opacity="0.13" filter={`url(#${uid}blur3)`}/>
        <ellipse cx="134" cy="95" rx="12" ry="8" fill="#f43f5e" opacity="0.11" filter={`url(#${uid}blur3)`}/>

        {/* ── Eyebrows ────────────────────────────────────────────────── */}
        <path
          d="M68 64 Q80 59 90 63"
          stroke={hair.dark} strokeWidth={isFemale ? "2.5" : "4"}
          strokeLinecap="round" fill="none"
          opacity={isFemale ? "1" : "0.9"}
        />
        <path
          d="M110 63 Q120 59 132 64"
          stroke={hair.dark} strokeWidth={isFemale ? "2.5" : "4"}
          strokeLinecap="round" fill="none"
          opacity={isFemale ? "1" : "0.9"}
        />

        {/* ── Eyes ────────────────────────────────────────────────────── */}
        <g>
          {/* Left eye */}
          <ellipse cx="80" cy="78" rx="12" ry="9" fill="#fff" opacity="0.97"/>
          <ellipse cx="80" cy="76" rx="12" ry="3.5" fill={skin.deep} opacity="0.18" filter={`url(#${uid}blur1)`}/>
          <circle cx="80" cy="78" r="6" fill={`url(#${uid}iris)`}/>
          <circle cx="80" cy="78" r="3.5" fill="#0c0705"/>
          {/* Catchlight */}
          <circle cx="77" cy="75" r="2" fill="#fff"/>
          <circle cx="82" cy="80" r="1.1" fill="#fff" opacity="0.7"/>
          {/* Upper lash */}
          <path d="M68 74 C72 70 87 70 92 74" stroke="#1a0d06" strokeWidth="2.2" fill="none" strokeLinecap="round"/>

          {/* Right eye */}
          <ellipse cx="120" cy="78" rx="12" ry="9" fill="#fff" opacity="0.97"/>
          <ellipse cx="120" cy="76" rx="12" ry="3.5" fill={skin.deep} opacity="0.18" filter={`url(#${uid}blur1)`}/>
          <circle cx="120" cy="78" r="6" fill={`url(#${uid}iris)`}/>
          <circle cx="120" cy="78" r="3.5" fill="#0c0705"/>
          {/* Catchlight */}
          <circle cx="117" cy="75" r="2" fill="#fff"/>
          <circle cx="122" cy="80" r="1.1" fill="#fff" opacity="0.7"/>
          {/* Upper lash */}
          <path d="M108 74 C112 70 127 70 132 74" stroke="#1a0d06" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
        </g>

        {/* ── Glasses ─────────────────────────────────────────────────── */}
        {hasGlasses && (
          <g>
            <rect x="66" y="68" width="28" height="20" rx="6" fill="none" stroke="#0f172a" strokeWidth="2.8"/>
            <rect x="106" y="68" width="28" height="20" rx="6" fill="none" stroke="#0f172a" strokeWidth="2.8"/>
            <line x1="94" y1="76" x2="106" y2="76" stroke="#0f172a" strokeWidth="2.8"/>
            <line x1="52" y1="72" x2="66" y2="74" stroke="#0f172a" strokeWidth="2.4" strokeLinecap="round"/>
            <line x1="148" y1="72" x2="134" y2="74" stroke="#0f172a" strokeWidth="2.4" strokeLinecap="round"/>
            {/* Lens glare */}
            <path d="M69 70 L77 77" stroke="#7dd3fc" strokeWidth="1.5" opacity="0.55" strokeLinecap="round"/>
            <path d="M109 70 L117 77" stroke="#7dd3fc" strokeWidth="1.5" opacity="0.55" strokeLinecap="round"/>
          </g>
        )}

        {/* ── Nose ─────────────────────────────────────────────────────── */}
        <path
          d="M100 82 C98 90 96 95 98 98 C100 100 102 99 104 98 C106 95 104 90 100 82"
          fill={skin.shade} opacity="0.55"
        />
        <ellipse cx="100" cy="98" rx="7" ry="3" fill={skin.deep} opacity="0.35" filter={`url(#${uid}blur1)`}/>
        {/* Nostril highlights */}
        <circle cx="96" cy="97" r="2.5" fill={skin.deep} opacity="0.5"/>
        <circle cx="104" cy="97" r="2.5" fill={skin.deep} opacity="0.5"/>
        <circle cx="96.5" cy="96.5" r="1" fill={skin.shade} opacity="0.4"/>

        {/* ── Mouth ─────────────────────────────────────────────────────── */}
        {/* Smile */}
        <path
          d="M84 111 Q100 123 116 111"
          fill={skin.lip} opacity="0.9"
        />
        {/* Teeth */}
        <path
          d="M87 111 Q100 118 113 111 Q100 108 87 111"
          fill="#fff" opacity="0.95"
        />
        {/* Upper lip definition */}
        <path d="M84 111 Q92 108 100 110 Q108 108 116 111" fill={skin.lip} opacity="0.7"/>
        {/* Smile creases */}
        <path d="M82 108 Q80 115 84 119" stroke={skin.deep} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.4"/>
        <path d="M118 108 Q120 115 116 119" stroke={skin.deep} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.4"/>

        {/* ── Beard ─────────────────────────────────────────────────────── */}
        {hasBeard && (
          <g opacity="0.88">
            <path
              d={isElder
                ? "M52 92 C50 110 58 128 100 134 C142 128 150 110 148 92 C148 106 136 128 100 128 C64 128 52 106 52 92 Z"
                : "M58 98 C56 112 64 126 100 130 C136 126 144 112 142 98 C140 112 128 124 100 124 C72 124 60 112 58 98 Z"
              }
              fill={`url(#${uid}hair)`}
              opacity={isElder ? "0.92" : "0.65"}
            />
            {/* Moustache */}
            <path
              d="M88 110 Q94 107 100 109 Q106 107 112 110 Q106 113 100 112 Q94 113 88 110"
              fill={hair.mid} opacity={isElder ? "0.9" : "0.7"}
            />
          </g>
        )}

        {/* ── Hair (Men's Styles) ────────────────────────────────────── */}
        {!isFemale && (
          <>
            {hairStyle === 0 && (
              /* Short corporate cut */
              <path
                d="M50 70 C50 36 68 22 100 22 C132 22 150 36 150 70 C145 46 128 34 100 34 C72 34 55 46 50 70 Z"
                fill={`url(#${uid}hair)`}
              />
            )}
            {hairStyle === 1 && (
              /* Side-part executive */
              <g fill={`url(#${uid}hair)`}>
                <path d="M50 70 C50 36 68 22 100 22 C132 22 150 36 150 70 C145 46 128 34 100 34 C72 34 55 46 50 70 Z"/>
                {/* Side part highlight */}
                <path d="M72 26 C80 24 88 24 90 32 C84 28 76 28 72 26 Z" fill={hair.hi} opacity="0.7"/>
              </g>
            )}
            {hairStyle === 2 && (
              /* Modern quiff */
              <g fill={`url(#${uid}hair)`}>
                <path d="M50 70 C50 36 68 22 100 22 C132 22 150 36 150 70 C145 46 128 34 100 34 C72 34 55 46 50 70 Z"/>
                {/* Quiff front volume */}
                <path d="M80 24 C84 14 100 10 110 18 C102 14 90 16 80 24 Z" fill={hair.hi}/>
                <path d="M84 22 C88 12 100 10 106 16 C100 12 90 14 84 22 Z"/>
              </g>
            )}
            {/* Sideburns */}
            <rect x="50" y="64" width="8" height="22" rx="3" fill={hair.mid} opacity="0.8"/>
            <rect x="142" y="64" width="8" height="22" rx="3" fill={hair.dark} opacity="0.7"/>
          </>
        )}

        {/* ── Hijab (Women's) ────────────────────────────────────────── */}
        {isHijab && (
          <g>
            {/* Top cap */}
            <path
              d="M48 82 C46 38 66 20 100 20 C134 20 154 38 152 82 C148 52 130 38 100 38 C70 38 52 52 48 82 Z"
              fill={`url(#${uid}hj)`}
            />
            {/* Frame around face */}
            <path
              d="M49 82 C49 40 68 26 100 26 C132 26 151 40 151 82"
              fill="none"
              stroke={`url(#${uid}hj)`}
              strokeWidth="16"
              strokeLinecap="round"
            />
            {/* Drape wrapping under chin */}
            <path
              d="M50 95 C46 120 55 148 100 154 C145 148 154 120 150 95 C148 118 134 144 100 148 C66 144 52 118 50 95 Z"
              fill={`url(#${uid}hj)`}
              opacity="0.9"
            />
            {/* Fabric fold highlights */}
            <path d="M52 70 C60 55 80 46 100 44" stroke={hj.main} strokeWidth="3" fill="none" opacity="0.45" strokeLinecap="round"/>
            <path d="M148 70 C140 55 120 46 100 44" stroke={hj.main} strokeWidth="2" fill="none" opacity="0.3" strokeLinecap="round"/>
            {/* Pin / brooch */}
            <circle cx="100" cy="145" r="3" fill="#f59e0b" opacity="0.8"/>
            <circle cx="100" cy="145" r="1.5" fill="#fef3c7"/>
          </g>
        )}

        {/* ── Forehead specular highlight ─────────────────────────────── */}
        <ellipse cx="94" cy="52" rx="16" ry="9" fill="#fff" opacity="0.18" filter={`url(#${uid}blur2)`}/>

        {/* ── Rim light on cheek ──────────────────────────────────────── */}
        <path d="M148 62 C152 80 148 100 140 116" stroke={bd.rim} strokeWidth="8" fill="none" opacity="0.18" strokeLinecap="round"/>
      </g>
    </svg>
  );
}
