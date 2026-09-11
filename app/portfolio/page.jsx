import PortfolioGallery from "./PortfolioGallery";

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(projects)) }}
      />

      <a href="/" className="pf-back">
        ← الرئيسية
      </a>

      <header className="pf-hero">
        <span className="pf-hero-kicker">سابقة الأعمال</span>
        <h1 className="pf-hero-title">
          أنظمة إدارة أعمال نصمّمها لكل نشاط على حِدة
        </h1>
        <p className="pf-hero-desc">
          نماذج من أنظمة تخطيط الموارد (ERP) وبرامج إدارة الأعمال التي طوّرتها
          Openappo لعملائها في التجارة والتوزيع والتصنيع والخدمات: إدارة المبيعات
          والمشتريات والمخزون، والحسابات والخزائن والتحصيلات، والتقارير المالية
          والتشغيلية — بصلاحيات متعدّدة المستخدمين وتشغيل سحابي آمن. اختر أي نظام
          لاستعراض شاشاته الفعلية.
        </p>
      </header>

      {projects.length === 0 ? (
        <p className="pf-empty">جارٍ تحديث المعرض — عُد إلينا قريبًا.</p>
      ) : (
        <PortfolioGallery projects={projects} />
      )}
    </main>
  );
}
