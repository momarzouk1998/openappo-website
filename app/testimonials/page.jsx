import TestimonialsClient from "./TestimonialsClient";
import TechBackground from "../portfolio/TechBackground";
import ThemeToggle from "../ThemeToggle";
import "./testimonials.css";

const SITE = "https://openappo.com";

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

export default function TestimonialsPage() {
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

      <TestimonialsClient />
    </main>
  );
}
