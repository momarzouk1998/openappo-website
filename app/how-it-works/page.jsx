import SiteNav from "../SiteNav";
import ContactWidget from "../ContactWidget";
import TechBackground from "../portfolio/TechBackground";
import HowItWorks from "./HowItWorks";
import { STEPS, FAQ } from "./content";
import "./how.css";

const SITE = "https://openappo.com";

export const metadata = {
  metadataBase: new URL(SITE),
  title: "إزاي بنشتغل — Openappo",
  description:
    "من أول مكالمة لحد ما شركتك تشتغل على نظامها: نسمعك، نحلل شغلك، تشوف الشكل الأول، نبني على مراحل، ننقل بياناتك، ونشغّل وندرّب. التسليم من أسبوعين لشهر.",
  alternates: { canonical: "/how-it-works" },
  openGraph: {
    title: "إزاي بنشتغل — Openappo",
    description: "رحلة بناء نظامك في 6 خطوات واضحة، والتسليم من أسبوعين لشهر.",
    url: `${SITE}/how-it-works`,
    locale: "ar_EG",
    type: "website",
  },
};

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HowTo",
        "@id": `${SITE}/how-it-works#howto`,
        name: "إزاي OpenAppo بتبني نظام شركتك",
        inLanguage: "ar",
        totalTime: "P14D",
        step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: `${s.lead} ${s.get}` })),
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE}/how-it-works#faq`,
        inLanguage: "ar",
        mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ],
  };
}

export default function HowItWorksPage() {
  return (
    <main className="pf-page hw-page">
      <TechBackground />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }} />
      <SiteNav current="/how-it-works" />
      <ContactWidget standalone />
      <HowItWorks />
    </main>
  );
}
