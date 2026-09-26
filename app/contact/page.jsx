import ContactWidget from "../ContactWidget";
import SiteNav from "../SiteNav";

export const metadata = { title: "تواصل بينا — Openappo" };

export default function ContactPage() {
  return (
    <main className="placeholder-page">
      <SiteNav current="/contact" />
      <h1>تواصل بينا</h1>
      <p>الصفحة دي قريبًا هتعرض طرق التواصل معانا.</p>
      <ContactWidget standalone />
    </main>
  );
}
