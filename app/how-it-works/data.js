// Server-side data for /how-it-works and /en/how-it-works.
//
// Both pages read the same two admin-panel feeds the portfolio and testimonials
// pages read, so a project or review published there appears here too.

import { FALLBACK_PROJECTS_AR, FALLBACK_PROJECTS_EN } from "../portfolio/fallbackProjects";
import { EN_TEXT, withEnglishText } from "../portfolio/enText";
import { LOGOS } from "./content";

const MANIFEST_URL =
  process.env.PORTFOLIO_MANIFEST_URL ||
  "https://admin.openappo.com/api/public/portfolio";

const TESTIMONIALS_URL =
  process.env.TESTIMONIALS_URL ||
  "https://admin.openappo.com/api/public/testimonials";

export async function getManifest() {
  try {
    const res = await fetch(MANIFEST_URL, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function getTestimonials() {
  try {
    const res = await fetch(TESTIMONIALS_URL, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data?.testimonials) ? data.testimonials : [];
  } catch {
    return [];
  }
}

/** Projects for the gallery. Arabic keeps the admin text; English uses enText.js. */
export function toProjects(data, lang) {
  const fallbacks = lang === "en" ? FALLBACK_PROJECTS_EN : FALLBACK_PROJECTS_AR;
  const list =
    Array.isArray(data?.projects) && data.projects.length > 0
      ? data.projects.map((p) => {
          const fb = fallbacks.find((f) => f.slug === p.slug);
          return { ...(fb || {}), ...p, logo: p.logo || fb?.logo || `/logos/${p.slug}.png` };
        })
      : fallbacks;
  return lang === "en" ? list.map(withEnglishText) : list;
}

const nameFor = (p, lang) => (lang === "en" && EN_TEXT[p.slug]?.name) || p.name || "";
const subtitleFor = (p, lang) => (lang === "en" && EN_TEXT[p.slug]?.subtitle) || p.subtitle || "";

/** Clients for the review cards. The manifest field is `logo` (not `logoUrl`). */
export function toClients(data, lang) {
  return (data?.projects || []).map((p) => ({
    slug: p.slug,
    name: nameFor(p, lang),
    subtitle: subtitleFor(p, lang),
    logo: p.logo || p.logoUrl || "",
  }));
}

// Static list kept only as a safety net for when the admin is unreachable, so
// the strip never renders empty. It is not the source of truth.
const FALLBACK_LOGOS = LOGOS.map((slug) => ({ slug, name: "", src: `/logos/${slug}.png` }));

/** Logo strip: every published project that has a logo, in the admin's order. */
export function toLogos(data, lang) {
  const seen = new Set();
  const logos = (Array.isArray(data?.projects) ? data.projects : [])
    .filter((p) => p?.logo && !seen.has(p.slug) && seen.add(p.slug))
    .map((p) => ({ slug: p.slug, name: nameFor(p, lang), src: p.logo }));
  return logos.length ? logos : FALLBACK_LOGOS;
}
