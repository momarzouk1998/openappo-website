import TestimonialsClient from "../../testimonials/TestimonialsClient";
import TechBackground from "../../portfolio/TechBackground";
import SiteNav from "../../SiteNav";
import ContactWidget from "../../ContactWidget";
import "../../testimonials/testimonials.css";

const SITE = "https://openappo.com";
const MANIFEST_URL =
  process.env.PORTFOLIO_MANIFEST_URL ||
  "https://admin.openappo.com/api/public/portfolio";
const TESTIMONIALS_URL =
  process.env.TESTIMONIALS_URL ||
  "https://admin.openappo.com/api/public/testimonials";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  metadataBase: new URL(SITE),
  title: "Customer Stories | Digital Transformation Partners — Openappo",
  description:
    "See how companies and organizations build their cloud systems and custom ERP applications with Openappo to streamline operations and grow.",
  keywords: [
    "Openappo customer stories",
    "ERP success stories",
    "business software reviews",
    "custom business systems",
    "software development company",
    "Openappo Customer Stories",
  ],
  alternates: { canonical: "/en/testimonials", languages: { ar: "/testimonials", en: "/en/testimonials" } },
  openGraph: {
    type: "website",
    url: `${SITE}/en/testimonials`,
    siteName: "Openappo",
    locale: "en_US",
    title: "Customer Stories | Digital Transformation Partners — Openappo",
    description: "See how companies build their cloud systems and custom ERP applications with Openappo.",
    images: [{ url: "/testimonials/hero-abstract.png", width: 1200, height: 630, alt: "Openappo Customer Stories" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Customer Stories | Digital Transformation Partners — Openappo",
    description: "See how companies build their cloud systems and custom ERP applications with Openappo.",
    images: ["/testimonials/hero-abstract.png"],
  },
};

async function getClients() {
  try {
    const res = await fetch(MANIFEST_URL, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return (data?.projects || []).map((p) => ({
      slug: p.slug,
      name: p.name,
      subtitle: p.subtitle,
      logo: p.logoUrl || "",
    }));
  } catch {
    return [];
  }
}

async function getTestimonials() {
  try {
    const res = await fetch(TESTIMONIALS_URL, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data?.testimonials) ? data.testimonials : [];
  } catch {
    return [];
  }
}

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", "@id": `${SITE}/#org`, name: "Openappo", url: SITE },
      {
        "@type": "CollectionPage",
        "@id": `${SITE}/en/testimonials#page`,
        url: `${SITE}/en/testimonials`,
        name: "Customer Stories — Openappo",
        inLanguage: "en",
        isPartOf: { "@id": `${SITE}/#org` },
        description: "Real partnerships with companies that built their custom management and operational systems with Openappo.",
      },
    ],
  };
}

export default async function TestimonialsPageEn() {
  const [clients, testimonials] = await Promise.all([getClients(), getTestimonials()]);

  return (
    <main className="pf-page tm-page-wrapper">
      <TechBackground />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }} />

      <SiteNav current="/testimonials" lang="en" />
      <ContactWidget standalone lang="en" />

      <TestimonialsClient clients={clients} testimonials={testimonials} lang="en" />
    </main>
  );
}
