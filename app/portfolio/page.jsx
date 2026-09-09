import PortfolioGallery from "./PortfolioGallery";

export const metadata = {
  title: "سابقة الأعمال — Openappo",
  description: "أنظمة إدارة أعمال حقيقية صمّمها ونفّذها فريق Openappo لعملائه.",
};

// Content is managed from the admin panel and published as a manifest.
const MANIFEST_URL =
  process.env.PORTFOLIO_MANIFEST_URL ||
  "https://admin.openappo.com/api/public/portfolio";

export const revalidate = 60;

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

export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <main className="pf-page">
      <a href="/" className="pf-back">
        ← الرئيسية
      </a>

      <header className="pf-hero">
        <span className="pf-hero-kicker">سابقة الأعمال</span>
        <h1 className="pf-hero-title">أنظمة شغّالة، مش مجرد كلام</h1>
        <p className="pf-hero-desc">
          دي شاشات حقيقية من أنظمة صمّمناها ونفّذناها لعملائنا — إدارة مبيعات ومخزون
          وتقارير مالية، كل واحد حسب طريقة شغله. اضغط على أي مشروع تشوف شاشاته.
        </p>
      </header>

      {projects.length === 0 ? (
        <p className="pf-empty">لسه بنجهّز المعرض — ارجع لنا قريب.</p>
      ) : (
        <PortfolioGallery projects={projects} />
      )}
    </main>
  );
}
