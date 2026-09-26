import SiteNav from "../../SiteNav";
import ContactWidget from "../../ContactWidget";
import TechBackground from "../../portfolio/TechBackground";
import "../../blog/blog.css";

const SITE = "https://openappo.com";
const UPDATED = "September 26, 2026";

export const metadata = {
  metadataBase: new URL(SITE),
  title: "Terms of Service — Openappo",
  description: "The terms and conditions governing the use of the Openappo website and our systems.",
  alternates: { canonical: "/en/terms", languages: { ar: "/terms", en: "/en/terms" } },
  robots: { index: true, follow: true },
};

export default function TermsPageEn() {
  return (
    <main className="pf-page">
      <TechBackground />
      <SiteNav current="/terms" lang="en" />
      <ContactWidget standalone lang="en" />

      <div className="legal-page">
        <div className="legal-page-inner">
          <h1>Terms of Service</h1>
          <p className="legal-updated">Last updated: {UPDATED}</p>

          <div className="legal-notice">
            These terms govern your use of the openappo.com marketing website. Any cloud system
            we build for a client is governed by a separate signed service agreement between the
            parties, not these terms.
          </div>

          <div className="blog-body">
            <h2>Acceptance of terms</h2>
            <p>
              By using the Openappo website, you agree to these terms and conditions. If you do
              not agree, please do not use the website.
            </p>

            <h2>Nature of the service</h2>
            <p>
              The Openappo website is a marketing interface showcasing our portfolio and services
              in designing and building custom cloud ERP systems. The website itself does not
              provide a direct software service — any system we actually deliver to a client is
              governed by a separate service agreement.
            </p>

            <h2>Intellectual property</h2>
            <p>
              All content on the site (text, logo, design, project screenshots) belongs to
              Openappo or to clients who agreed to showcase their system's screens, and may not
              be copied or reused commercially without written permission.
            </p>

            <h2>Content accuracy</h2>
            <p>
              We try to keep all information on the site (such as the performance indicators
              shown in the portfolio) accurate and up to date, but some of the screenshots and
              figures displayed are illustrative samples from real dashboards meant to show what
              the system looks like — not audited or certified financial data.
            </p>

            <h2>External links</h2>
            <p>
              The site contains links to external services (WhatsApp, YouTube) to make it easier
              to reach us and watch system videos. We are not responsible for the content or
              privacy policies of those third-party sites.
            </p>

            <h2>Limitation of liability</h2>
            <p>
              The website is provided "as is" without any warranties. We will not be liable for
              any indirect damages arising from use of the site, except as explicitly required by
              Egyptian law.
            </p>

            <h2>Governing law</h2>
            <p>
              These terms are governed by the laws of the Arab Republic of Egypt, and any dispute
              relating to them is resolved under Egyptian jurisdiction.
            </p>

            <h2>Changes to these terms</h2>
            <p>
              We may update these terms from time to time, and any change will be reflected in
              the "last updated" date at the top of this page.
            </p>

            <h2>Contact us</h2>
            <p>
              For any question about these terms, contact us at{" "}
              <a href="tel:+201558282760" dir="ltr">+20 155 828 2760</a> or via{" "}
              <a href="https://wa.me/201558282760" target="_blank" rel="noopener noreferrer">WhatsApp</a>.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
