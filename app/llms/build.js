// Builds /llms.txt and /llms-full.txt (the llmstxt.org convention): a plain-text,
// Markdown-shaped brief of the site for AI assistants.
//
// Why: an assistant answering "who builds custom ERP systems in Egypt?" or
// "what is Openappo?" reads text, not a canvas animation. This gives it one
// short, factual, quotable page per language that states what the company does,
// how it works, what it has built, and how to reach it, and that links to the
// full pages for anything it wants to cite.
//
// The list of systems is generated from the same admin feed the website reads,
// so it is always the current portfolio, never a stale copy. English text comes
// from portfolio/enText.js, Arabic from the admin panel.

import { CONTENT, PHONE_DISPLAY } from "../how-it-works/content";
import { getManifest } from "../how-it-works/data";
import { EN_TEXT } from "../portfolio/enText";

const SITE = "https://openappo.com";

const SUMMARY = {
  en: "Openappo designs and builds custom cloud business-management (ERP) systems for companies: sales, inventory, accounting and staff in one system built around how each company actually works, running in the cloud on computer and phone. Delivery takes two weeks to a month. Openappo serves companies in Egypt and works in Arabic and English.",
  ar: "تصمّم Openappo وتبني أنظمة سحابية مخصّصة لإدارة الأعمال (ERP) للشركات: مبيعات ومخازن وحسابات وموظفون في نظام واحد مبنيّ على طبيعة عمل كل شركة، يعمل على الحاسوب والهاتف. التسليم من أسبوعين إلى شهر. تخدم Openappo شركات في مصر وتعمل بالعربية والإنجليزية.",
};

const FACTS = {
  en: [
    "What we build: custom cloud ERP systems, designed around each client's own workflow rather than an off-the-shelf package.",
    "How we work: six steps, listen, analyse, design, build in stages, migrate data, then launch and train. The first session is free.",
    "Delivery: two weeks to a month, depending on the size of the business and the number of departments. Working parts are visible from the first weeks.",
    "After delivery: ongoing support and development as the business grows.",
    `Contact: WhatsApp or phone ${PHONE_DISPLAY.en}.`,
  ],
  ar: [
    "ما نبنيه: أنظمة ERP سحابية مخصّصة، تُصمَّم على سير عمل كل عميل لا على برنامج جاهز.",
    "كيف نعمل: ست خطوات: نستمع، نحلّل، نصمّم، نبني على مراحل، ننقل البيانات، ثم نشغّل وندرّب. والجلسة الأولى مجانية.",
    "التسليم: من أسبوعين إلى شهر بحسب حجم العمل وعدد الأقسام، وتشاهد أجزاءً تعمل منذ الأسابيع الأولى.",
    "بعد التسليم: دعم مستمر وتطوير مع نموّ العمل.",
    `التواصل: واتساب أو هاتف ${PHONE_DISPLAY.ar}.`,
  ],
};

const PAGES = {
  en: [
    ["How we work", `${SITE}/en/how-it-works`, "The six-step process from first call to a live system, with answers to common questions."],
    ["Portfolio", `${SITE}/en/portfolio`, "Systems we have built, with real screens and videos."],
    ["Customer stories", `${SITE}/en/testimonials`, "What clients say about working with Openappo."],
    ["Blog", `${SITE}/en/blog`, "Guides and case studies on business-management systems."],
    ["Contact", `${SITE}/en/contact`, "How to reach us."],
  ],
  ar: [
    ["كيف نعمل", `${SITE}/how-it-works`, "رحلة بناء النظام في ست خطوات من أول مكالمة حتى التشغيل، مع إجابات عن الأسئلة الشائعة."],
    ["سابقة الأعمال", `${SITE}/portfolio`, "أنظمة نفّذناها بشاشات وفيديوهات حقيقية."],
    ["آراء العملاء", `${SITE}/testimonials`, "ما يقوله عملاؤنا عن العمل مع Openappo."],
    ["المدونة", `${SITE}/blog`, "أدلة ودراسات حالة عن أنظمة إدارة الأعمال."],
    ["تواصل معنا", `${SITE}/contact`, "طرق التواصل معنا."],
  ],
};

const oneLine = (s) => (s || "").replace(/\s+/g, " ").trim();

function systemsBlock(projects, lang, full) {
  return projects
    .map((p) => {
      const en = EN_TEXT[p.slug];
      const name = lang === "en" ? en?.name || p.name : p.name;
      const sub = lang === "en" ? en?.subtitle || p.subtitle : p.subtitle;
      const desc = lang === "en" ? en?.desc : p.desc;
      const url = `${SITE}${lang === "en" ? "/en" : ""}/portfolio`;
      if (!full) return `- [${name}](${url}): ${oneLine(sub)}`;
      return `### ${name}\n${oneLine(sub)}\n\n${oneLine(desc)}\n`;
    })
    .join("\n");
}

function faqBlock(lang) {
  return CONTENT[lang].faq.map((f) => `**${f.q}**\n${f.a}\n`).join("\n");
}

function stepsBlock(lang) {
  return CONTENT[lang].steps
    .map((s, i) => `${i + 1}. **${s.title}.** ${s.lead} ${s.you} ${s.get}`)
    .join("\n");
}

export async function buildLlms({ full = false } = {}) {
  const manifest = await getManifest();
  const projects = Array.isArray(manifest?.projects) ? manifest.projects : [];

  const out = [];
  out.push("# Openappo");
  out.push("");
  out.push(`> ${SUMMARY.en}`);
  out.push("");
  out.push(`> ${SUMMARY.ar}`);
  out.push("");

  for (const lang of ["en", "ar"]) {
    const heading = lang === "en" ? "Key facts" : "حقائق أساسية";
    out.push(`## ${heading}`);
    out.push("");
    out.push(FACTS[lang].map((f) => `- ${f}`).join("\n"));
    out.push("");
  }

  for (const lang of ["en", "ar"]) {
    out.push(`## ${lang === "en" ? "Pages (English)" : "الصفحات (العربية)"}`);
    out.push("");
    out.push(PAGES[lang].map(([t, u, d]) => `- [${t}](${u}): ${d}`).join("\n"));
    out.push("");
  }

  if (projects.length) {
    out.push("## Systems we have built");
    out.push("");
    out.push(systemsBlock(projects, "en", full));
    out.push("");
    out.push("## أنظمة نفّذناها");
    out.push("");
    out.push(systemsBlock(projects, "ar", full));
    out.push("");
  }

  if (full) {
    out.push("## How we work, in detail");
    out.push("");
    out.push(stepsBlock("en"));
    out.push("");
    out.push("## كيف نعمل بالتفصيل");
    out.push("");
    out.push(stepsBlock("ar"));
    out.push("");
    out.push("## Frequently asked questions");
    out.push("");
    out.push(faqBlock("en"));
    out.push("## الأسئلة الشائعة");
    out.push("");
    out.push(faqBlock("ar"));
  } else {
    out.push("## Optional");
    out.push("");
    out.push(`- [Full version of this brief, with every answer and system description](${SITE}/llms-full.txt)`);
    out.push(`- [Sitemap](${SITE}/sitemap.xml)`);
    out.push("");
  }

  return out.join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";
}

export function textResponse(body) {
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
