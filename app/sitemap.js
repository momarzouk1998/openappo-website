import { getAllSlugs } from "./blog/posts";

const SITE = "https://openappo.com";

export default function sitemap() {
  const staticPages = [
    { url: `${SITE}/`, priority: 1 },
    { url: `${SITE}/portfolio`, priority: 0.9 },
    { url: `${SITE}/testimonials`, priority: 0.7 },
    { url: `${SITE}/contact`, priority: 0.6 },
    { url: `${SITE}/blog`, priority: 0.8 },
    { url: `${SITE}/en`, priority: 0.9 },
    { url: `${SITE}/en/portfolio`, priority: 0.8 },
    { url: `${SITE}/en/testimonials`, priority: 0.6 },
    { url: `${SITE}/en/contact`, priority: 0.5 },
    { url: `${SITE}/en/blog`, priority: 0.7 },
  ].map((p) => ({ ...p, lastModified: new Date(), changeFrequency: "weekly" }));

  const blogPages = getAllSlugs().flatMap((slug) => [
    {
      url: `${SITE}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE}/en/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ]);

  return [...staticPages, ...blogPages];
}
