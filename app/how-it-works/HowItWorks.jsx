"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useInView, useReducedMotion, animate } from "framer-motion";
import {
  PhoneCall, ScanSearch, PenTool, Cog, DatabaseZap, Rocket, MessageCircle, FileSpreadsheet, NotebookPen,
  ShieldCheck, CloudCheck, LayoutDashboard, CalendarCheck, ChevronDown, ArrowLeft, ArrowRight, Clock, Headset, GripVertical,
} from "lucide-react";
import { CONTENT, PHONE_DISPLAY, waLink } from "./content";

const ICONS = { PhoneCall, ScanSearch, PenTool, Cog, DatabaseZap, Rocket, ShieldCheck, CloudCheck, LayoutDashboard, CalendarCheck };

// The page renders the same components in Arabic (RTL) and English (LTR); every
// string comes from CONTENT[lang] through this context rather than being passed
// down through each component.
const LangCtx = createContext("ar");
const useLang = () => useContext(LangCtx);
const useT = () => CONTENT[useLang()];

// One small, characteristic loop per step icon (phone rings, cog turns, rocket lifts...).
const ICON_LOOP = {
  PhoneCall: { rotate: [0, -16, 14, -10, 8, 0], transition: { duration: 0.8, repeat: Infinity, repeatDelay: 2.4 } },
  ScanSearch: { x: [0, 3, 0, -3, 0], y: [0, -3, 0, 3, 0], transition: { duration: 2.2, repeat: Infinity, ease: "linear" } },
  PenTool: { rotate: [0, -12, 6, 0], y: [0, -2, 1, 0], transition: { duration: 1.4, repeat: Infinity, repeatDelay: 1.6 } },
  Cog: { rotate: 360, transition: { duration: 6, repeat: Infinity, ease: "linear" } },
  DatabaseZap: { scale: [1, 1.14, 1], transition: { duration: 1.2, repeat: Infinity, repeatDelay: 1.8 } },
  Rocket: { y: [0, -6, 0], x: [0, 3, 0], transition: { duration: 1.6, repeat: Infinity, ease: "easeInOut" } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] } }),
};

/* ------------------------------------------------------------------ hero */
function Hero() {
  const reduce = useReducedMotion();
  const lang = useLang();
  const { ui } = useT();
  const nodes = [[60, 70], [190, 30], [320, 80], [450, 40], [560, 95]];
  const facts = [Clock, CloudCheck, Headset];
  return (
    <section className="hw-hero">
      <svg className="hw-hero-net" viewBox="0 0 620 130" aria-hidden="true">
        {nodes.slice(1).map(([x, y], i) => (
          <motion.line key={i} x1={nodes[i][0]} y1={nodes[i][1]} x2={x} y2={y}
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: reduce ? 0 : 0.7, delay: 0.3 + i * 0.25 }} />
        ))}
        {nodes.map(([x, y], i) => (
          <motion.circle key={i} cx={x} cy={y} r={i === 2 ? 9 : 6} className={i === 2 ? "hw-node-coral" : ""}
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 + i * 0.25, type: "spring", stiffness: 260 }} />
        ))}
      </svg>
      <motion.span className="hw-chip" variants={fadeUp} initial="hidden" animate="show">{ui.chip}</motion.span>
      <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1}>
        {ui.h1a}
        <span>{ui.h1b}</span>
      </motion.h1>
      <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2}>
        {ui.heroP}
      </motion.p>
      <motion.ul className="hw-hero-facts" variants={fadeUp} initial="hidden" animate="show" custom={3}>
        {ui.facts.map((f, i) => {
          const Icon = facts[i];
          return <li key={f}><Icon size={18} /> {f}</li>;
        })}
      </motion.ul>
      <motion.div className="hw-hero-cta" variants={fadeUp} initial="hidden" animate="show" custom={4}>
        <a className="hw-btn hw-btn--main" href={waLink(lang)} target="_blank" rel="noopener noreferrer">
          <MessageCircle size={20} /> {ui.ctaMain}
        </a>
        <a className="hw-btn hw-btn--ghost" href="#steps">{ui.ctaGhost} <ChevronDown size={18} /></a>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------- timeline */
function StepIcon({ name }) {
  const reduce = useReducedMotion();
  const Icon = ICONS[name];
  return (
    <motion.span className="hw-step-icon" animate={reduce ? undefined : ICON_LOOP[name]}>
      <Icon size={28} strokeWidth={1.8} />
    </motion.span>
  );
}

function Shots() {
  const { ui } = useT();
  return (
    <div className="hw-shots" aria-label={ui.shotsAria}>
      <div className="hw-shot-laptop"><img src="/how/dashboard-desktop.webp" alt={ui.shotDesktopAlt} loading="lazy" /></div>
      <div className="hw-shot-phone"><img src="/how/dashboard-mobile.webp" alt={ui.shotMobileAlt} loading="lazy" /></div>
    </div>
  );
}

function Step({ s, i }) {
  const { ui } = useT();
  const ref = useRef(null);
  const on = useInView(ref, { margin: "-35% 0px -45% 0px" });
  return (
    <li ref={ref} className={`hw-step ${i % 2 ? "hw-step--alt" : ""} ${on ? "is-on" : ""}`}>
      <span className="hw-dot" aria-hidden="true"><span /></span>
      <motion.article className="hw-card" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
        <div className="hw-card-head">
          <StepIcon name={s.icon} />
          <div>
            <span className="hw-num">{ui.step} {i + 1} <span aria-hidden="true">{s.emoji}</span></span>
            <h3>{s.title}</h3>
          </div>
        </div>
        <p className="hw-lead">{s.lead}</p>
        <dl>
          <div><dt>{ui.you}</dt><dd>{s.you}</dd></div>
          <div className="hw-get"><dt>{ui.get}</dt><dd>{s.get}</dd></div>
        </dl>
        {s.shot && <Shots />}
      </motion.article>
    </li>
  );
}

function Timeline() {
  const { ui, steps } = useT();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const grow = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  return (
    <section id="steps" className="hw-section">
      <motion.h2 className="hw-h2" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
        {ui.timelineA} <em>{ui.timelineEm}</em>
      </motion.h2>
      <div ref={ref} className="hw-timeline">
        <div className="hw-rail" aria-hidden="true"><motion.span style={{ scaleY: grow }} /></div>
        <ol>{steps.map((s, i) => <Step key={s.title} s={s} i={i} />)}</ol>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- before/after */
function BeforePanel() {
  const { ui } = useT();
  return (
    <div className="hw-before" aria-hidden="true">
      <div className="hw-sheet">
        <div className="hw-sheet-bar"><FileSpreadsheet size={16} /> {ui.sheetName}</div>
        <div className="hw-grid">
          {Array.from({ length: 28 }).map((_, i) => (
            <span key={i} className={[3, 9, 16, 22].includes(i) ? "bad" : i % 5 === 0 ? "dim" : ""}>
              {[3, 9, 16, 22].includes(i) ? "#REF!" : ""}
            </span>
          ))}
        </div>
      </div>
      <div className="hw-note"><NotebookPen size={18} /> {ui.note}</div>
      <div className="hw-wa">
        <p>{ui.wa1}</p>
        <p className="me">{ui.wa2}</p>
        <p>{ui.wa3}</p>
      </div>
      <span className="hw-tag hw-tag--before">{ui.before}</span>
    </div>
  );
}

function BeforeAfter() {
  const { ui } = useT();
  const box = useRef(null);
  const inView = useInView(box, { once: true, margin: "-25%" });
  const reduce = useReducedMotion();
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  useEffect(() => {   // one gentle demo sweep so people see it can be dragged
    if (!inView || reduce) return;
    const c = animate(50, [50, 22, 78, 50], {
      duration: 2.6, ease: "easeInOut",
      onUpdate: (v) => !dragging.current && setPos(v),
    });
    return () => c.stop();
  }, [inView, reduce]);

  const move = (clientX) => {
    const r = box.current.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <section className="hw-section">
      <motion.h2 className="hw-h2" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
        {ui.baA} <em className="coral">{ui.baChaos}</em> {ui.baB} <em>{ui.baOne}</em>
      </motion.h2>
      <p className="hw-sub">{ui.baSub}</p>
      <div
        ref={box}
        className="hw-ba"
        onPointerDown={(e) => { dragging.current = true; e.currentTarget.setPointerCapture(e.pointerId); move(e.clientX); }}
        onPointerMove={(e) => dragging.current && move(e.clientX)}
        onPointerUp={() => { dragging.current = false; }}
        onPointerCancel={() => { dragging.current = false; }}
      >
        <div className="hw-after">
          <div className="hw-browser"><i /><i /><i /></div>
          <img src="/how/dashboard-desktop.webp" alt={ui.baAfterAlt} draggable="false" />
          <span className="hw-tag hw-tag--after">{ui.after}</span>
        </div>
        <div className="hw-before-clip" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}><BeforePanel /></div>
        <div className="hw-handle" style={{ left: `${pos}%` }} aria-hidden="true"><span><GripVertical size={18} /></span></div>
        <input
          className="hw-range" type="range" min="0" max="100" value={Math.round(pos)}
          onChange={(e) => setPos(+e.target.value)} aria-label={ui.baAria}
        />
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- stats */
function Counter({ st }) {
  const ref = useRef(null);
  const on = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!on) return;
    const c = animate(0, st.to, { duration: 1.4, ease: "easeOut", onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [on, st.to]);
  const Icon = ICONS[st.icon];
  return (
    <div ref={ref} className="hw-stat">
      <Icon size={24} />
      <strong>{st.from ? `${Math.min(v, st.from)}–${v}` : v}{st.suffix || ""}</strong>
      <span>{st.label}</span>
      <small>{st.sub}</small>
    </div>
  );
}

function Stats({ logos = [] }) {
  const { ui, stats } = useT();
  return (
    <section className="hw-section">
      <div className="hw-stats">{stats.map((s) => <Counter key={s.label} st={s} />)}</div>
      <motion.h2 className="hw-h2 hw-h2--sm" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
        {ui.logosA} <em>{ui.logosEm}</em>
      </motion.h2>
      <div className="hw-logos">
        {logos.map((l, i) => (
          <motion.span key={l.slug} className="hw-logo" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i * 0.5}>
            <img src={l.src} alt={l.name} title={l.name || undefined} loading="lazy" />
          </motion.span>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ faq */
// Every answer is rendered into the HTML — collapsed with height 0 rather than
// not mounted. Search engines and AI assistants read the markup, not the open
// accordion item, so an answer that only exists once clicked is invisible to
// them (and would not match the FAQPage data published with the page).
function Faq() {
  const { ui, faq } = useT();
  const [open, setOpen] = useState(0);
  return (
    <section className="hw-section" id="faq">
      <motion.h2 className="hw-h2" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
        {ui.faqA} <em>{ui.faqEm}</em> 💬
      </motion.h2>
      <div className="hw-faq">
        {faq.map((f, i) => (
          <div key={f.q} className={`hw-q ${open === i ? "is-open" : ""}`}>
            <button type="button" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i} aria-controls={`hw-a-${i}`}>
              <span>{f.q}</span>
              <ChevronDown size={20} />
            </button>
            <motion.div
              id={`hw-a-${i}`}
              className="hw-a"
              role="region"
              initial={false}
              animate={open === i ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: "hidden" }}
            >
              <p>{f.a}</p>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ final cta */
function FinalCta() {
  const lang = useLang();
  const { ui } = useT();
  const Arrow = lang === "en" ? ArrowRight : ArrowLeft;
  return (
    <motion.section className="hw-final" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
      <h2>{ui.finalA} <em>{ui.finalEm}</em> 👋</h2>
      <p>{ui.finalP}</p>
      <a className="hw-btn hw-btn--main" href={waLink(lang)} target="_blank" rel="noopener noreferrer">
        <MessageCircle size={20} /> {ui.finalBtn} <Arrow size={18} />
      </a>
      <span className="hw-final-phone">{PHONE_DISPLAY[lang]}</span>
    </motion.section>
  );
}

export default function HowItWorks({ logos = [], proof = null, lang = "ar" }) {
  return (
    <LangCtx.Provider value={lang}>
      <div className="hw">
        <Hero />
        <Timeline />
        <BeforeAfter />
        <Stats logos={logos} />
        {proof}
        <Faq />
        <FinalCta />
      </div>
    </LangCtx.Provider>
  );
}
