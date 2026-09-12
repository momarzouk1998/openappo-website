import PortfolioGallery from "./PortfolioGallery";
import TechBackground from "./TechBackground";
import HeroIntro from "./HeroIntro";
import ThemeToggle from "../ThemeToggle";

const SITE = "https://openappo.com";

// Content is managed from the admin panel and published as a manifest.
const MANIFEST_URL =
  process.env.PORTFOLIO_MANIFEST_URL ||
  "https://admin.openappo.com/api/public/portfolio";

export const revalidate = 60;

export const metadata = {
  metadataBase: new URL(SITE),
  title: "سابقة الأعمال | أنظمة ERP وبرامج إدارة الأعمال — Openappo",
  description:
    "أنظمة تخطيط موارد (ERP) وبرامج إدارة أعمال نفّذتها Openappo لعملائها في التجارة والتوزيع والتصنيع والخدمات: إدارة المبيعات والمشتريات والمخزون والحسابات والتقارير المالية.",
  keywords: [
    "أنظمة إدارة الأعمال",
    "برنامج ERP",
    "تخطيط موارد المؤسسات",
    "برنامج محاسبة",
    "نظام إدارة المخزون",
    "برنامج نقاط بيع",
    "نظام إدارة المبيعات",
    "برنامج إدارة المصانع",
    "نظام إدارة التوزيع",
    "أنظمة سحابية",
    "شركة برمجة أنظمة إدارية",
    "Openappo",
  ],
  alternates: { canonical: "/portfolio" },
  openGraph: {
    type: "website",
    url: `${SITE}/portfolio`,
    siteName: "Openappo",
    locale: "ar_EG",
    title: "سابقة الأعمال | أنظمة ERP وبرامج إدارة الأعمال — Openappo",
    description:
      "شاشات فعلية من أنظمة إدارة أعمال نفّذتها Openappo في التجارة والتوزيع والتصنيع والخدمات.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Openappo Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "سابقة الأعمال | أنظمة ERP وبرامج إدارة الأعمال — Openappo",
    description:
      "شاشات فعلية من أنظمة إدارة أعمال نفّذتها Openappo في التجارة والتوزيع والتصنيع والخدمات.",
    images: ["/og-image.png"],
  },
};

async function getProjects() {
  try {
    const res = await fetch(MANIFEST_URL, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data?.projects) ? data.projects : [];
  } catch {
    return [];
  }
}

function jsonLd(projects) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE}/#org`,
        name: "Openappo",
        url: SITE,
        description:
          "تصميم وتطوير أنظمة إدارة الأعمال وتخطيط الموارد (ERP) السحابية للشركات.",
      },
      {
        "@type": "CollectionPage",
        "@id": `${SITE}/portfolio#page`,
        url: `${SITE}/portfolio`,
        name: "سابقة الأعمال — Openappo",
        inLanguage: "ar",
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

export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <main className="pf-page">
      <TechBackground />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(projects)) }}
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

      <HeroIntro projects={projects} />

      {projects.length === 0 ? (
        <p className="pf-empty">جارٍ تحديث المعرض — عُد إلينا قريبًا.</p>
      ) : (
        <PortfolioGallery projects={projects} />
      )}
    </main>
  );
}
