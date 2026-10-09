import SiteNav from "../SiteNav";
import ContactWidget from "../ContactWidget";
import TechBackground from "../portfolio/TechBackground";
import HowItWorks from "./HowItWorks";
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
  const logos = await getLogos();

  return (
    <main className="pf-page hw-page">
      <TechBackground />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }} />
      <SiteNav current="/how-it-works" />
      <ContactWidget standalone />
      <HowItWorks logos={logos} />
    </main>
  );
}
