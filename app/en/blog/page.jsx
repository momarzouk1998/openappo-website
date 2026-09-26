import SiteNav from "../../SiteNav";
import ContactWidget from "../../ContactWidget";
import TechBackground from "../../portfolio/TechBackground";
import { POSTS_EN } from "../../blog/posts.en";
import "../../blog/blog.css";

const SITE = "https://openappo.com";

export const metadata = {
  metadataBase: new URL(SITE),
  title: "Openappo Blog | ERP & Business Management Articles and Case Studies",
  description:
    "Practical guides on ERP, inventory, distribution and POS systems, plus real case studies from projects Openappo has built for its clients.",
  keywords: [
    "Openappo blog",
    "ERP articles",
    "business system case studies",
    "accounting software",
    "inventory system",
    "POS system",
    "e-invoicing Egypt",
  ],
  alternates: { canonical: "/en/blog", languages: { ar: "/blog", en: "/en/blog" } },
  openGraph: {
    type: "website",
    url: `${SITE}/en/blog`,
    siteName: "Openappo",
    locale: "en_US",
    title: "Openappo Blog | ERP & Business Management Articles",
    description: "Practical guides and real case studies about ERP and business-management systems from the Openappo team.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Openappo Blog" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Openappo Blog | ERP & Business Management Articles",
    description: "Practical guides and real case studies about ERP and business-management systems from the Openappo team.",
    images: ["/og-image.png"],
  },
};

function jsonLd() {
  const sorted = [...POSTS_EN].sort((a, b) => (a.date < b.date ? 1 : -1));
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": `${SITE}/en/blog#blog`,
        name: "Openappo Blog",
        url: `${SITE}/en/blog`,
        inLanguage: "en",
        publisher: { "@id": `${SITE}/#org` },
        blogPost: sorted.map((p) => ({
          "@type": "BlogPosting",
          headline: p.title,
          url: `${SITE}/en/blog/${p.slug}`,
          datePublished: p.date,
        })),
      },
    ],
  };
}

export default function BlogIndexPageEn() {
  const sorted = [...POSTS_EN].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <main className="pf-page">
      <TechBackground />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }} />
      <SiteNav current="/blog" lang="en" />
      <ContactWidget standalone lang="en" />

      <div className="blog-page">
        <div className="blog-hero">
          <h1>Openappo Blog</h1>
          <p>
            Practical articles on ERP and business-management systems, plus real case studies from
            systems we&apos;ve built for clients in manufacturing, distribution, retail, and services.
          </p>
        </div>

        <div className="blog-grid">
          {sorted.map((p) => (
            <a key={p.slug} href={`/en/blog/${p.slug}`} className="blog-card">
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
