import { POSTS } from "./blog/posts";

const SITE = "https://openappo.com";

// Every page exists in Arabic and English. Each URL is listed with both language
// versions (and x-default = Arabic) so search engines pair them up instead of
// treating the English page as a duplicate of the Arabic one.
const PAGES = [
  { ar: "", en: "/en", priority: 1 },
  { ar: "/portfolio", en: "/en/portfolio", priority: 0.9 },
  { ar: "/how-it-works", en: "/en/how-it-works", priority: 0.9 },
  { ar: "/testimonials", en: "/en/testimonials", priority: 0.7 },
  { ar: "/blog", en: "/en/blog", priority: 0.8 },
  { ar: "/contact", en: "/en/contact", priority: 0.6 },
  { ar: "/privacy", en: "/en/privacy", priority: 0.3 },
  { ar: "/terms", en: "/en/terms", priority: 0.3 },
];

function pair(arPath, enPath, extra = {}) {
  const ar = `${SITE}${arPath}`;
  const en = `${SITE}${enPath}`;
  const alternates = { languages: { ar, en, "x-default": ar } };
  return [
    { url: ar, alternates, ...extra },
    { url: en, alternates, ...extra },
  ];
}

export default function sitemap() {
  // No lastModified on the static pages: stamping every page with "today" on
  // each build tells crawlers everything changed every time, which makes them
  // trust the field less. It is only given where a real date exists (articles).
  const pages = PAGES.flatMap((p) => pair(p.ar, p.en, { priority: p.priority }));

  const posts = POSTS.flatMap((p) =>
    pair(`/blog/${p.slug}`, `/en/blog/${p.slug}`, {
      lastModified: new Date(p.date),
      priority: p.type === "case-study" ? 0.6 : 0.7,
    })
  );

  return [...pages, ...posts];
}
