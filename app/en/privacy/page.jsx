import SiteNav from "../../SiteNav";
import ContactWidget from "../../ContactWidget";
import TechBackground from "../../portfolio/TechBackground";
import "../../blog/blog.css";

const SITE = "https://openappo.com";
const UPDATED = "September 26, 2026";

export const metadata = {
  metadataBase: new URL(SITE),
  title: "Privacy Policy — Openappo",
  description: "How Openappo collects, uses, and protects your data when you use our website and systems.",
  alternates: { canonical: "/en/privacy", languages: { ar: "/privacy", en: "/en/privacy" } },
  robots: { index: true, follow: true },
};

export default function PrivacyPageEn() {
  return (
    <main className="pf-page">
      <TechBackground />
      <SiteNav current="/privacy" lang="en" />
      <ContactWidget standalone lang="en" />

      <div className="legal-page">
        <div className="legal-page-inner">
          <h1>Privacy Policy</h1>
          <p className="legal-updated">Last updated: {UPDATED}</p>

          <div className="legal-notice">
            This page explains transparently how we handle your data. Some registered-entity
            details (commercial registration number, official registered address) are still
            being added and will be updated here once available.
          </div>

          <div className="blog-body">
            <h2>Who is responsible for your data</h2>
            <p>
              Openappo ("we", "us") is responsible for processing the data we collect through
              openappo.com and our cloud systems. If you have any question about your privacy,
              you can reach us at <span dir="ltr">+20 155 828 2760</span> (call or WhatsApp).
            </p>

            <h2>What we collect</h2>
            <ul>
              <li>Contact details you give us directly: name, phone number, company name, when you reach out via WhatsApp, a call, or a contact form.</li>
              <li>Technical usage data: browser type, device, and pages visited, through analytics tools (where enabled).</li>
              <li>Data belonging to customers of our cloud systems (if you already use an Openappo platform): that is governed by your company's own service agreement, not this website policy.</li>
            </ul>

            <h2>Why we collect it</h2>
            <ul>
              <li>To respond to your inquiry or prepare a live demo of the system.</li>
              <li>To improve the website's performance and understand which pages are most useful to visitors.</li>
              <li>To comply with applicable legal or tax requirements in Egypt.</li>
            </ul>

            <h2>Who sees your data</h2>
            <p>
              We do not sell or rent your data to any third party for marketing purposes. Data
              may be shared with trusted service providers who help us run the website (such as
              hosting or WhatsApp Business), only to the extent necessary to deliver the service.
            </p>

            <h2>Cookies</h2>
            <p>
              We use local storage in your browser (localStorage) only to remember your dark/light
              mode choice — it stays on your device and is never sent to us. If we enable analytics
              tools like Google Analytics in the future, we will update this page with the details
              and provide a clear consent option.
            </p>

            <h2>Your rights</h2>
            <ul>
              <li>Request a copy of the data we hold about you.</li>
              <li>Request correction or deletion of your data.</li>
              <li>Withdraw consent to marketing communication at any time.</li>
            </ul>
            <p>To exercise any of these rights, contact us directly via WhatsApp or phone.</p>

            <h2>Visitors outside Egypt (including the EU)</h2>
            <p>
              If you visit our site from a country with data-protection laws like the GDPR, we
              follow the same transparency and data-minimization principles outlined on this page,
              and your rights to access, deletion, and objection apply in the same way.
            </p>

            <h2>Changes to this policy</h2>
            <p>
              We may update this privacy policy from time to time. Any material change will be
              reflected in the "last updated" date at the top of this page.
            </p>

            <h2>Contact us</h2>
            <p>
              For any privacy question, contact us at{" "}
              <a href="tel:+201558282760" dir="ltr">+20 155 828 2760</a> or via{" "}
              <a href="https://wa.me/201558282760" target="_blank" rel="noopener noreferrer">WhatsApp</a>.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
