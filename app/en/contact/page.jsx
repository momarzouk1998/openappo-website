import ContactWidget from "../../ContactWidget";
import SiteNav from "../../SiteNav";

const SITE = "https://openappo.com";

export const metadata = {
  metadataBase: new URL(SITE),
  title: "Contact Us — Openappo",
  alternates: { canonical: "/en/contact", languages: { ar: "/contact", en: "/en/contact" } },
};

export default function ContactPageEn() {
  return (
    <main className="placeholder-page">
      <SiteNav current="/contact" lang="en" />
      <h1>Contact Us</h1>
      <p>This page will soon show all the ways to reach us. In the meantime, use the WhatsApp or call button below.</p>
      <ContactWidget standalone lang="en" />
    </main>
  );
}
