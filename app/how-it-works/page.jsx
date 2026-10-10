import SiteNav from "../SiteNav";
import ContactWidget from "../ContactWidget";
import TechBackground from "../portfolio/TechBackground";
import HowItWorks from "./HowItWorks";
import PortfolioGallery from "../portfolio/PortfolioGallery";
import TestimonialsClient from "../testimonials/TestimonialsClient";
import { FALLBACK_PROJECTS_AR } from "../portfolio/fallbackProjects";
import "../testimonials/testimonials.css";
import { STEPS, FAQ, LOGOS } from "./content";
import "./how.css";

const SITE = "https://openappo.com";

// Same source as /portfolio: whatever is published in the admin panel, in the
// order set there. Adding or reordering a project updates this strip too.
const MANIFEST_URL =
  process.env.PORTFOLIO_MANIFEST_URL ||
  "https://admin.openappo.com/api/public/portfolio";

// Re-check the admin at most once a minute ("changes go live within a minute").
export const revalidate = 60;

export const metadata = {
  metadataBase: new URL(SITE),
  title: "إزاي بنشتغل — Openappo",
  description:
    "من أول مكالمة لحد ما شركتك تشتغل على نظامها: نسمعك، نحلل شغلك، تشوف الشكل الأول، نبني على مراحل، ننقل بياناتك، ونشغّل وندرّب. التسليم من أسبوعين لشهر.",
  alternates: { canonical: "/how-it-works" },
  openGraph: {
    title: "إزاي بنشتغل — Openappo",
    description: "رحلة بناء نظامك في 6 خطوات واضحة، والتسليم من أسبوعين لشهر.",
    url: `${SITE}/how-it-works`,
    locale: "ar_EG",
    type: "website",
  },
};

const TESTIMONIALS_URL =
  process.env.TESTIMONIALS_URL ||
  "https://admin.openappo.com/api/public/testimonials";

// The landing page proves itself below the steps: the same portfolio gallery
// and client reviews as /portfolio and /testimonials, fed by the same admin
// manifests, so a project or review published there shows up here too.
async function getManifest() {
  try {
    const res = await fetch(MANIFEST_URL, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

function toProjects(data) {
  if (!Array.isArray(data?.projects) || data.projects.length === 0) return FALLBACK_PROJECTS_AR;
  return data.projects.map((p) => {
    const fallback = FALLBACK_PROJECTS_AR.find((f) => f.slug === p.slug);
    return { ...(fallback || {}), ...p, logo: p.logo || fallback?.logo || `/logos/${p.slug}.png` };
  });
}

function toClients(data) {
  return (data?.projects || []).map((p) => ({ slug: p.slug, name: p.name, subtitle: p.subtitle, logo: p.logoUrl || "" }));
}

async function getTestimonials() {
  try {
    const res = await fetch(TESTIMONIALS_URL, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data?.testimonials) ? data.testimonials : [];
  } catch {
    return [];
  }
}

// Static list kept only as a safety net for when the admin is unreachable, so
// the section never renders empty. It is not the source of truth.
const FALLBACK_LOGOS = LOGOS.map((slug) => ({
  slug,
  name: "",
  src: `/logos/${slug}.png`,
}));

async function getLogos() {
  try {
    const res = await fetch(MANIFEST_URL, { next: { revalidate: 60 } });
    if (!res.ok) return FALLBACK_LOGOS;
    const data = await res.json();
    const seen = new Set();
    const logos = (Array.isArray(data?.projects) ? data.projects : [])
      .filter((p) => p?.logo && !seen.has(p.slug) && seen.add(p.slug))
      .map((p) => ({ slug: p.slug, name: p.name || "", src: p.logo }));
    return logos.length ? logos : FALLBACK_LOGOS;
  } catch {
    return FALLBACK_LOGOS;
  }
}

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HowTo",
        "@id": `${SITE}/how-it-works#howto`,
        name: "إزاي OpenAppo بتبني نظام شركتك",
        inLanguage: "ar",
        totalTime: "P14D",
        step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: `${s.lead} ${s.get}` })),
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE}/how-it-works#faq`,
        inLanguage: "ar",
        mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ],
  };
}

export default async function HowItWorksPage() {
  const [logos, manifest, testimonials] = await Promise.all([getLogos(), getManifest(), getTestimonials()]);
  const projects = toProjects(manifest);

  const proof = (
    <>
      <section id="work" className="hw-section hw-proof">
        <h2 className="hw-h2">أنظمة <em>شغالة فعلاً</em> عند عملائنا</h2>
        <p className="hw-sub">شاشات حقيقية من أنظمة بنيناها — دوس على أي نظام وشوفه من جوه 👇</p>
        <PortfolioGallery projects={projects} />
      </section>
      <section id="reviews" className="hw-proof hw-reviews">
        <TestimonialsClient clients={toClients(manifest)} testimonials={testimonials} embedded />
      </section>
    </>
  );

  return (
    <main className="pf-page hw-page">
      <TechBackground />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }} />
      <SiteNav current="/how-it-works" />
      <ContactWidget standalone />
      <HowItWorks logos={logos} proof={proof} />
    </main>
  );
}
