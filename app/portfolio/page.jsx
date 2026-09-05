import PortfolioGallery from "./PortfolioGallery";

export const metadata = {
  title: "سابقة الأعمال — Openappo",
  description: "أنظمة إدارة أعمال حقيقية صمّمها ونفّذها فريق Openappo لعملائه.",
};

export default function PortfolioPage() {
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

      <PortfolioGallery />
    </main>
  );
}
