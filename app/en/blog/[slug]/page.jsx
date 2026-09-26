import { notFound } from "next/navigation";
import SiteNav from "../../../SiteNav";
import ContactWidget from "../../../ContactWidget";
import TechBackground from "../../../portfolio/TechBackground";
import BlogPostBody from "../../../blog/BlogPostBody";
import { POSTS_EN, getPostBySlugEn, getAllSlugsEn } from "../../../blog/posts.en";
import "../../../blog/blog.css";

const SITE = "https://openappo.com";

export function generateStaticParams() {
  return getAllSlugsEn().map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const post = getPostBySlugEn(params.slug);
  if (!post) return {};
  const url = `${SITE}/en/blog/${post.slug}`;
  return {
    metadataBase: new URL(SITE),
    title: `${post.title} | Openappo Blog`,
    description: post.description,
    keywords: post.tags,
    alternates: { canonical: url, languages: { ar: `/blog/${post.slug}`, en: url } },
    openGraph: {
      type: "article",
      url,
      siteName: "Openappo",
      locale: "en_US",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: ["/og-image.png"],
    },
  };
}

function jsonLd(post) {
  const url = `${SITE}/en/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", "@id": `${SITE}/#org`, name: "Openappo", url: SITE },
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: post.title,
        description: post.description,
        url,
        datePublished: post.date,
        dateModified: post.date,
        inLanguage: "en",
        author: { "@id": `${SITE}/#org` },
        publisher: { "@id": `${SITE}/#org` },
        mainEntityOfPage: url,
        keywords: post.tags.join(", "),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/en` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/en/blog` },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ],
  };
}

export default function BlogPostPageEn({ params }) {
  const post = getPostBySlugEn(params.slug);
  if (!post) notFound();

  const related = POSTS_EN.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3);

  return (
    <main className="pf-page">
      <TechBackground />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(post)) }} />
      <SiteNav current="/blog" lang="en" />
      <ContactWidget standalone lang="en" />

      <article className="blog-article">
        <div className="blog-article-inner">
          <nav className="blog-breadcrumb" aria-label="Breadcrumb">
            <a href="/en">Home</a>
            <span>/</span>
            <a href="/en/blog">Blog</a>
            <span>/</span>
            <span>{post.title}</span>
          </nav>

          <span className="blog-article-badge">{post.category}</span>
          <h1>{post.title}</h1>
          <div className="blog-article-meta">
            <span>{post.readTime}</span>
            <span>{post.tags.join(" · ")}</span>
          </div>

          <BlogPostBody content={post.content} />

          <div className="blog-cta">
            <p>Want a system built exactly like this one, for your business?</p>
            <a href="/en/contact">Get in touch</a>
          </div>

          {related.length > 0 && (
            <div className="blog-grid" style={{ marginTop: 48 }}>
              {related.map((p) => (
                <a key={p.slug} href={`/en/blog/${p.slug}`} className="blog-card">
                  <span className="blog-card-badge">{p.category}</span>
                  <h2>{p.title}</h2>
                  <p>{p.excerpt}</p>
                </a>
              ))}
            </div>
          )}
        </div>
      </article>
    </main>
  );
}
