// Metadata and structured data for /how-it-works (ar) and /en/how-it-works (en).
//
// Three audiences read this page, and each wants something different:
//   SEO  - title, description, canonical, hreflang, Open Graph
//   AEO  - FAQPage + HowTo: direct question/answer and step data that search
//          engines lift into featured answers
//   GEO  - one consistent entity (the Organization and WebSite @ids declared in
//          the root layout) that the page is explicitly about, so AI assistants
//          can attribute what they quote to the right company
//
// The FAQPage data below is generated from the same array the visible FAQ is
// rendered from, and every answer is present in the HTML, so the structured
// data can never claim something the page does not show.

import { CONTENT } from "./content";

export const SITE = "https://openappo.com";

const PATH = { ar: "/how-it-works", en: "/en/how-it-works" };
const HOME = { ar: SITE, en: `${SITE}/en` };

export function buildMetadata(lang) {
  const m = CONTENT[lang].meta;
  const other = lang === "en" ? "ar" : "en";
  return {
    metadataBase: new URL(SITE),
    title: m.title,
    description: m.description,
    alternates: {
      canonical: PATH[lang],
      // x-default tells search engines which version to show people whose
      // language matches neither: the Arabic original.
      languages: { ar: PATH.ar, en: PATH.en, "x-default": PATH.ar },
    },
    openGraph: {
      title: m.ogTitle,
      description: m.ogDescription,
      url: `${SITE}${PATH[lang]}`,
      siteName: "Openappo",
      locale: lang === "en" ? "en_US" : "ar_EG",
      alternateLocale: [other === "en" ? "en_US" : "ar_EG"],
      type: "website",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: m.ogTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: m.ogTitle,
      description: m.ogDescription,
      images: ["/og-image.png"],
    },
  };
}

export function buildJsonLd(lang) {
  const c = CONTENT[lang];
  const url = `${SITE}${PATH[lang]}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: c.meta.title,
        description: c.meta.description,
        inLanguage: lang,
        isPartOf: { "@id": `${SITE}/#website` },
        about: { "@id": `${SITE}/#org` },
        publisher: { "@id": `${SITE}/#org` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        mainEntity: { "@id": `${url}#howto` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: lang === "en" ? "Home" : "الرئيسية", item: HOME[lang] },
          { "@type": "ListItem", position: 2, name: c.ui.chip, item: url },
        ],
      },
      {
        "@type": "HowTo",
        "@id": `${url}#howto`,
        name: c.schemaName,
        description: c.meta.description,
        inLanguage: lang,
        totalTime: "P14D",
        step: c.steps.map((s, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: s.title,
          text: `${s.lead} ${s.you} ${s.get}`,
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        inLanguage: lang,
        isPartOf: { "@id": `${url}#webpage` },
        mainEntity: c.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}
