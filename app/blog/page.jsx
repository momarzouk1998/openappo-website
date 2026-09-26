import SiteNav from "../SiteNav";
import ContactWidget from "../ContactWidget";
import TechBackground from "../portfolio/TechBackground";
import { POSTS } from "./posts";
import "./blog.css";

const SITE = "https://openappo.com";

export const metadata = {
  metadataBase: new URL(SITE),
  title: "مدونة Openappo | مقالات ودراسات حالة عن أنظمة ERP وإدارة الأعمال",
  description:
    "دليل عملي وأنظمة حقيقية: مقالات عن أنظمة ERP، إدارة المخزون والتوزيع ونقاط البيع، ودراسات حالة لمشاريع نفّذتها Openappo لعملائها.",
  keywords: [
    "مدونة Openappo",
    "مقالات ERP",
    "دراسات حالة أنظمة إدارة أعمال",
    "برنامج محاسبة",
    "نظام مخزون",
    "نظام نقاط بيع",
    "الفوترة الإلكترونية",
  ],
  alternates: { canonical: "/blog", languages: { ar: "/blog", en: "/en/blog" } },
  openGraph: {
    type: "website",
    url: `${SITE}/blog`,
    siteName: "Openappo",
    locale: "ar_EG",
    title: "مدونة Openappo | مقالات ودراسات حالة عن أنظمة ERP",
    description:
      "مقالات عملية ودراسات حالة حقيقية عن أنظمة إدارة الأعمال وتخطيط الموارد (ERP) من فريق Openappo.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "مدونة Openappo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "مدونة Openappo | مقالات ودراسات حالة عن أنظمة ERP",
    description: "مقالات عملية ودراسات حالة حقيقية عن أنظمة إدارة الأعمال من فريق Openappo.",
    images: ["/og-image.png"],
  },
};

function jsonLd() {
  const sorted = [...POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": `${SITE}/blog#blog`,
        name: "مدونة Openappo",
        url: `${SITE}/blog`,
        inLanguage: "ar",
        publisher: { "@id": `${SITE}/#org` },
        blogPost: sorted.map((p) => ({
          "@type": "BlogPosting",
          headline: p.title,
          url: `${SITE}/blog/${p.slug}`,
          datePublished: p.date,
        })),
      },
    ],
  };
}

export default function BlogIndexPage() {
  const sorted = [...POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <main className="pf-page">
      <TechBackground />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />
      <SiteNav current="/blog" />
      <ContactWidget standalone />

      <div className="blog-page">
        <div className="blog-hero">
          <h1>مدونة Openappo</h1>
          <p>
            مقالات عملية عن أنظمة إدارة الأعمال وتخطيط الموارد (ERP)، ودراسات حالة حقيقية
            لأنظمة بنيناها لعملائنا في التصنيع والتوزيع والتجارة والخدمات.
          </p>
        </div>

        <div className="blog-grid">
          {sorted.map((p) => (
            <a key={p.slug} href={`/blog/${p.slug}`} className="blog-card">
              <span className="blog-card-badge">{p.category}</span>
              <h2>{p.title}</h2>
              <p>{p.excerpt}</p>
              <span className="blog-card-meta">
                <span>{p.readTime}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
