import ContactWidget from "../ContactWidget";
import SiteNav from "../SiteNav";
import TechBackground from "../portfolio/TechBackground";
import "./contact.css";

const SITE = "https://openappo.com";
const PHONE_DISPLAY = "+20 155 828 2760";
const PHONE_TEL = "tel:+201558282760";
const WA_LINK = "https://wa.me/201558282760";

export const metadata = {
  metadataBase: new URL(SITE),
  title: "تواصل بينا — Openappo",
  description: "تواصل مع فريق Openappo مباشرة عبر واتساب أو مكالمة هاتفية لحجز عرض توضيحي أو أي استفسار.",
  alternates: { canonical: "/contact", languages: { ar: "/contact", en: "/en/contact" } },
};

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", "@id": `${SITE}/#org`, name: "Openappo", url: SITE },
      {
        "@type": "ContactPage",
        "@id": `${SITE}/contact#page`,
        url: `${SITE}/contact`,
        name: "تواصل بينا — Openappo",
        inLanguage: "ar",
        isPartOf: { "@id": `${SITE}/#org` },
      },
    ],
  };
}

export default function ContactPage() {
  return (
    <main className="pf-page">
      <TechBackground />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }} />

      <SiteNav current="/contact" />
      <ContactWidget standalone />

      <div className="contact-page">
        <div className="contact-hero">
          <h1>تواصل بينا</h1>
          <p>عايز تعرف أكتر عن منظومة Openappo أو تحجز عرض توضيحي مباشر؟ كلمنا دلوقتي.</p>
        </div>

        <div className="contact-cards">
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="contact-card contact-card--wa">
            <span className="contact-card-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.763.459 3.483 1.332 5.001l-1.417 5.176 5.297-1.389c1.464.798 3.116 1.218 4.777 1.219h.004c5.505 0 9.989-4.478 9.99-9.985.001-2.668-1.034-5.176-2.92-7.063a9.923 9.923 0 0 0-7.063-2.943zm5.834 14.162c-.247.694-1.436 1.326-1.986 1.391-.506.06-1.164.086-1.874-.14-1.157-.367-2.651-1.002-4.226-2.404-1.371-1.22-2.302-2.735-2.571-3.196-.27-.461-.029-.711.202-.94.208-.207.462-.538.693-.807.23-.27.307-.462.461-.77.154-.308.077-.577-.038-.808-.116-.231-1.038-2.502-1.423-3.426-.375-.901-.758-.778-1.038-.792-.269-.014-.577-.015-.885-.015s-.808.115-1.231.577c-.423.461-1.616 1.578-1.616 3.847 0 2.269 1.654 4.462 1.885 4.77 2.308 3.076 5.115 4.884 8.23 5.922.775.259 1.488.384 2.051.353.692-.038 2.154-.885 2.461-1.731.308-.846.308-1.577.215-1.731-.092-.154-.346-.246-.592-.37z"/>
              </svg>
            </span>
            <h2>محادثة واتساب</h2>
            <p>أسرع طريقة للرد على استفسارك</p>
            <span className="contact-card-number">{PHONE_DISPLAY}</span>
          </a>

          <a href={PHONE_TEL} className="contact-card contact-card--call">
            <span className="contact-card-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </span>
            <h2>اتصال هاتفي</h2>
            <p>تكلم فريقنا مباشرة</p>
            <span className="contact-card-number">{PHONE_DISPLAY}</span>
          </a>
        </div>

        <p className="contact-note">
          متاحين للرد على واتساب والتليفون. لو بتزورنا من بره مصر، استخدم واتساب لأسهل وأسرع تواصل.
        </p>
      </div>
    </main>
  );
}
