import TestimonialsClient from "./TestimonialsClient";
import TechBackground from "../portfolio/TechBackground";
import ThemeToggle from "../ThemeToggle";
import "./testimonials.css";

const SITE = "https://openappo.com";
const MANIFEST_URL =
  process.env.PORTFOLIO_MANIFEST_URL ||
  "https://admin.openappo.com/api/public/portfolio";

export const revalidate = 60;

export const metadata = {
  metadataBase: new URL(SITE),
  title: "قصص وتجارب العملاء | شركاء التحول الرقمي — Openappo",
  description:
    "اكتشف كيف تبني الشركات والمؤسسات أنظمتها السحابية وتطبيقات إدارة الأعمال وتخطيط الموارد (ERP) المخصصة مع Openappo لتطوير العمليات وتحقيق النمو.",
  keywords: [
    "تجارب عملاء Openappo",
    "قصص نجاح ERP",
    "آراء عملاء برامج إدارة الأعمال",
    "أنظمة شركات مخصصة",
    "شركة برمجة وتطوير أنظمة",
    "Openappo Customer Stories",
    "شهادات عملاء البرمجيات",
  ],
  alternates: { canonical: "/testimonials" },
  openGraph: {
    type: "website",
    url: `${SITE}/testimonials`,
    siteName: "Openappo",
    locale: "ar_EG",
    title: "قصص وتجارب العملاء | شركاء التحول الرقمي — Openappo",
    description:
      "اكتشف كيف تبني الشركات والمؤسسات أنظمتها السحابية وتطبيقات إدارة الأعمال المخصصة مع Openappo.",
    images: [
      {
        url: "/testimonials/hero-abstract.png",
        width: 1200,
        height: 630,
        alt: "Openappo Customer Stories",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "قصص وتجارب العملاء | شركاء التحول الرقمي — Openappo",
    description:
      "اكتشف كيف تبني الشركات والمؤسسات أنظمتها السحابية وتطبيقات إدارة الأعمال المخصصة مع Openappo.",
    images: ["/testimonials/hero-abstract.png"],
  },
};

// The client list comes from the same manifest the portfolio page uses, so a
// project added in the admin panel shows up here too without a code change.
async function getClients() {
  try {
    const res = await fetch(MANIFEST_URL, { next: { revalidate: 60 } });
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

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE}/#org`,
        name: "Openappo",
        url: SITE,
        description: "تصميم وتطوير أنظمة إدارة الأعمال وتخطيط الموارد (ERP) السحابية المخصصة.",
      },
      {
        "@type": "CollectionPage",
        "@id": `${SITE}/testimonials#page`,
        url: `${SITE}/testimonials`,
        name: "قصص وتجارب العملاء — Openappo",
        inLanguage: "ar",
        isPartOf: { "@id": `${SITE}/#org` },
        description:
          "تجارب وشراكات حقيقية لشركات بنت أنظمتها الإدارية والتشغيلية المخصصة مع Openappo.",
      },
    ],
  };
}

export default async function TestimonialsPage() {
  const clients = await getClients();

  return (
    <main className="pf-page tm-page-wrapper">
      <TechBackground />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />

      <header className="openappo-nav">
        <a href="/" className="openappo-logo-wrap" aria-label="Openappo">
          <img
            src="/brand/openappo-wordmark-dark.png"
            alt="Openappo"
            className="openappo-logo-img"
          />
        </a>
      </header>

      <ThemeToggle />

      <a href="/" className="pf-back">
        ← الرئيسية
      </a>

      <TestimonialsClient clients={clients} />
    </main>
  );
}
