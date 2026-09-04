"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

const SPRING = { mass: 0.1, stiffness: 150, damping: 12 };
const MAGNIFY = 1.55; // peak scale of the hovered item
const DISTANCE = 130; // px falloff radius around the cursor

const ICONS = {
  home: (
    <path d="M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5M9.5 21v-6h5v6" />
  ),
  features: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </>
  ),
  solutions: (
    <path d="m12 3 9 5-9 5-9-5 9-5Zm9 9-9 5-9-5m18 4-9 5-9-5" />
  ),
  pricing: (
    <>
      <path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0l-7.2-7.2a2 2 0 0 1-.6-1.4V4a1 1 0 0 1 1-1h7.9a2 2 0 0 1 1.4.6l7.5 7.4a2 2 0 0 1-.1 2.8Z" />
      <circle cx="7.5" cy="7.5" r="1.5" />
    </>
  ),
  contact: (
    <>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="m3 6 9 7 9-7" />
    </>
  ),
};

const ITEMS = [
  { label: "الرئيسية", icon: "home", href: "#top" },
  { label: "المميزات", icon: "features", href: "#" },
  { label: "الحلول", icon: "solutions", href: "#" },
  { label: "الأسعار", icon: "pricing", href: "#" },
  { label: "تواصل معنا", icon: "contact", href: "#" },
];

function DockItem({ mouseX, children, href }) {
  const ref = useRef(null);

  const distance = useTransform(mouseX, (x) => {
    const rect = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return x - rect.x - rect.width / 2;
  });

  const scaleTarget = useTransform(
    distance,
    [-DISTANCE, 0, DISTANCE],
    [1, MAGNIFY, 1]
  );
  const scale = useSpring(scaleTarget, SPRING);

  return (
    <motion.a
      ref={ref}
      href={href}
      className="dock-item"
      style={{ scale }}
    >
      {children}
    </motion.a>
  );
}

export default function Dock() {
  const mouseX = useMotionValue(Infinity);

  return (
    <nav
      className="dock"
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      aria-label="التنقل الرئيسي"
    >
      {ITEMS.map((item) => (
        <DockItem key={item.label} mouseX={mouseX} href={item.href}>
          <span className="dock-icon" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {ICONS[item.icon]}
            </svg>
          </span>
          <span className="dock-label">{item.label}</span>
        </DockItem>
      ))}
    </nav>
  );
}
