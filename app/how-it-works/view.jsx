// Shared server view for /how-it-works and /en/how-it-works. The two route files
// only export their own metadata and revalidate window and render this.

import SiteNav from "../SiteNav";
import ContactWidget from "../ContactWidget";
import TechBackground from "../portfolio/TechBackground";
import PortfolioGallery from "../portfolio/PortfolioGallery";
import TestimonialsClient from "../testimonials/TestimonialsClient";
import HowItWorks from "./HowItWorks";
import { CONTENT } from "./content";
import { getManifest, getTestimonials, toProjects, toClients, toLogos } from "./data";
import { buildJsonLd } from "./seo";
import "../testimonials/testimonials.css";
import "./how.css";

export default async function HowItWorksView({ lang = "ar" }) {
  const [manifest, testimonials] = await Promise.all([getManifest(), getTestimonials()]);
  const { ui } = CONTENT[lang];

  // The page proves itself below the steps: the same gallery and reviews as
  // /portfolio and /testimonials, fed by the same admin manifests.
  const proof = (
    <>
      <section id="work" className="hw-section hw-proof">
        <h2 className="hw-h2">{ui.proofA} <em>{ui.proofEm}</em> {ui.proofB}</h2>
        <p className="hw-sub">{ui.proofSub}</p>
        <PortfolioGallery projects={toProjects(manifest, lang)} lang={lang} />
      </section>
      <section id="reviews" className="hw-proof hw-reviews">
        <TestimonialsClient clients={toClients(manifest, lang)} testimonials={testimonials} lang={lang} embedded />
      </section>
    </>
  );

  return (
    <main className="pf-page hw-page">
      <TechBackground />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(lang)) }} />
      <SiteNav current="/how-it-works" lang={lang} />
      <ContactWidget standalone lang={lang} />
      <HowItWorks logos={toLogos(manifest, lang)} proof={proof} lang={lang} />
    </main>
  );
}
