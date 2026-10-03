import PortfolioGallery from "../../portfolio/PortfolioGallery";
import TechBackground from "../../portfolio/TechBackground";
import HeroIntro from "../../portfolio/HeroIntro";
import SiteNav from "../../SiteNav";
import ContactWidget from "../../ContactWidget";

import { FALLBACK_PROJECTS_EN } from "../../portfolio/fallbackProjects";

const SITE = "https://openappo.com";

const MANIFEST_URL =
  process.env.PORTFOLIO_MANIFEST_URL ||
  "https://admin.openappo.com/api/public/portfolio";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  metadataBase: new URL(SITE),
  title: "Portfolio | ERP & Business Management Systems — Openappo",
  description:
    "Real ERP and business-management systems Openappo has built for clients in trade, distribution, manufacturing, and services: sales, purchasing, inventory, accounting, and financial reporting.",
  keywords: [
    "business management systems",
    "ERP software",
    "enterprise resource planning",
    "accounting software",
    "inventory management system",
    "point of sale software",
    "sales management system",
    "manufacturing management software",
    "distribution management system",
    "cloud systems",
    "business software company",
    "Openappo",
  ],
  alternates: { canonical: "/en/portfolio", languages: { ar: "/portfolio", en: "/en/portfolio" } },
  openGraph: {
    type: "website",
    url: `${SITE}/en/portfolio`,
    siteName: "Openappo",
    locale: "en_US",
    title: "Portfolio | ERP & Business Management Systems — Openappo",
    description: "Real screens from business-management systems Openappo has built for clients in trade, distribution, manufacturing, and services.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Openappo Portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | ERP & Business Management Systems — Openappo",
    description: "Real screens from business-management systems Openappo has built for clients in trade, distribution, manufacturing, and services.",
    images: ["/og-image.png"],
  },
};

async function getProjects() {
  try {
    const res = await fetch(MANIFEST_URL, { cache: "no-store" });
    if (!res.ok) return FALLBACK_PROJECTS_EN;
    const data = await res.json();
    if (Array.isArray(data?.projects) && data.projects.length > 0) {
      return data.projects.map((p) => {
        const fallback = FALLBACK_PROJECTS_EN.find((f) => f.slug === p.slug);
        return {
          ...(fallback || {}),
          ...p,
          logo: p.logo || fallback?.logo || `/logos/${p.slug}.png`,
        };
      });
    }
    return FALLBACK_PROJECTS_EN;
  } catch {
    return FALLBACK_PROJECTS_EN;
  }
}

function jsonLd(projects) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", "@id": `${SITE}/#org`, name: "Openappo", url: SITE },
      {
        "@type": "CollectionPage",
        "@id": `${SITE}/en/portfolio#page`,
        url: `${SITE}/en/portfolio`,
        name: "Portfolio — Openappo",
        inLanguage: "en",
        isPartOf: { "@id": `${SITE}/#org` },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: projects.length,
          itemListElement: projects.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "SoftwareApplication",
              name: p.name,
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              description: p.desc,
              ...(p.logo ? { image: p.logo } : {}),
              author: { "@id": `${SITE}/#org` },
            },
          })),
        },
      },
    ],
  };
}

export default async function PortfolioPageEn() {
  const projects = await getProjects();

  return (
    <main className="pf-page">
      <TechBackground />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(projects)) }} />

      <SiteNav current="/portfolio" lang="en" />
      <ContactWidget standalone lang="en" />

      <HeroIntro lang="en" projects={projects} />

      {projects.length === 0 ? (
        <p className="pf-empty">Updating the gallery — check back soon.</p>
      ) : (
        <PortfolioGallery projects={projects} lang="en" />
      )}
    </main>
  );
}
