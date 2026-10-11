const SITE = "https://openappo.com";

// Crawlers that fetch pages at question time to answer or cite them (AI search
// and assistants). They are listed by name so the intent is on record: this
// site wants to be readable and quotable by them. Training-data crawlers
// (GPTBot, ClaudeBot, CCBot ...) are deliberately NOT named here; whether to
// allow them is a policy choice made at the Cloudflare edge, and robots.txt
// should not promise something the edge then refuses.
const ANSWER_ENGINE_BOTS = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Perplexity-User",
  "Claude-SearchBot",
  "Claude-User",
  "DuckAssistBot",
  "Applebot",
  "bingbot",
  "Googlebot",
];

export default function robots() {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      { userAgent: ANSWER_ENGINE_BOTS, allow: "/" },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
