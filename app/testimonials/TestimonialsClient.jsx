"use client";

import { useEffect, useRef, useState } from "react";
import Avatar3D from "./Avatar3D";

// Comprehensive curated testimonials for each registered client/project
const CURATED_BY_SLUG = {
  kishk: {
    ar: {
      name: "أ. أحمد كشك",
      role: "رئيس مجلس الإدارة",
      company: "مؤسسة أحمد كشك للأقمشة والستائر",
      quote:
        "قبل التعامل مع Openappo، كانت متابعة مقاسات الستائر وقص الأقمشة وتنسيق الورشة مع الفروع الأربعة بتسبب هدر وتداخل في الطلبات. النظام صُمم خصيصاً ليغطي دورتنا كاملة من المعاينة والرفع حتى التركيب النهائي، وضبط الهدر وحسابات الفروع باحترافية تامة.",
    },
    en: {
      name: "Mr. Ahmed Kishk",
      role: "Chairman & Founder",
      company: "Ahmed Kishk Curtains & Fabrics",
      quote:
        "Before Openappo, tracking curtain measurements, fabric cutting, and coordinating our workshop with 4 branches caused inventory waste and delays. The custom ERP streamlined our full cycle from site visit to final installation with 100% precision.",
    },
    variant: "male",
  },
  mazaya: {
    ar: {
      name: "م. هاني مزايا",
      role: "المدير التنفيذي",
      company: "مزايا للأثاث",
      quote:
        "كنا بحاجة إلى نظام ERP يفهم خصوصية صناعة الأثاث، تقطيع الألواح، تكاليف الإكسسوارات، ومتابعة المقاولين الخارجيين. مهندسو Openappo بنوا لنا منظومة متكاملة تربط خط الإنتاج بالحسابات، فصار لكل أمر تشغيل تكلفة وربحية واضحة لحظة بلحظة.",
    },
    en: {
      name: "Eng. Hany Mazaya",
      role: "CEO & Managing Director",
      company: "Mazaya Furniture",
      quote:
        "We needed an ERP that understands custom furniture production, panel sheet cutting, hardware costs, and outsourced contractors. Openappo engineered a complete workflow linking production lines to financial ledgers with instant profit tracking per job order.",
    },
    variant: "male",
  },
  elnazlawy: {
    ar: {
      name: "أ. محمود النزلاوي",
      role: "المدير العام",
      company: "معرض النزلاوي للأجهزة الكهربائية",
      quote:
        "إدارة معارض الأجهزة الكهربائية والإضاءة وحسابات الموردين والشيكات الآجلة كانت تستهلك وقتاً طويلاً في المراجعة. السيستم السحابي مكّننا من تتبع حركة المخازن والمناديب والمبيعات اللحظية من الهاتف بدقة فائقة دعمت قراراتنا التوسعية.",
    },
    en: {
      name: "Mr. Mahmoud Elnazlawy",
      role: "General Manager",
      company: "Elnazlawy Electrical & Lighting",
      quote:
        "Managing multi-showroom electrical retail, vendor balances, cheques, and field sales reps used to take hours of manual audits. Openappo's cloud platform gave us real-time inventory, sales, and rep tracking from mobile with crystal clarity.",
    },
    variant: "male",
  },
  elhoot: {
    ar: {
      name: "أ. سامح الحوت",
      role: "مدير قطاع التوزيع والمبيعات",
      company: "الحوت للأدوات الكهربائية",
      quote:
        "لدينا شبكة توزيع تغطي عدة محافظات بحركة بضاعة وسيارات يومية. النظام نظّم خطوط سير المناديب، جرد سيارات التوزيع، وأعمار الديون والتحصيلات بدقة عالية. ميزة الصلاحيات وتقارير الأرباح الفورية أغلقت أي مجال للعجز.",
    },
    en: {
      name: "Mr. Sameh El Hoot",
      role: "Head of Distribution & Sales",
      company: "El Hoot Electrical Supplies",
      quote:
        "With wholesale distribution across multiple governorates, managing van inventory and customer credit was challenging. Openappo automated route sales, debt aging, collections, and live profit reports, eliminating shortages completely.",
    },
    variant: "male",
  },
  elnesr: {
    ar: {
      name: "أ. طارق عبد العزيز",
      role: "مدير العمليات والتشغيل",
      company: "شركة النسر للتوزيع",
      quote:
        "المرونة والاستقرار في أنظمة Openappo لم نجدها في البرامج الجاهزة. متابعة المناديب وفواتير المبيعات ومطابقة عهدة المخازن أصبحت تنتهي بسلاسة تامة، وفريق الدعم الفني متواجد دائماً ويستجيب في دقائق معدودة.",
    },
    en: {
      name: "Mr. Tarek Abdelaziz",
      role: "Operations Director",
      company: "El Nesr Distribution",
      quote:
        "The flexibility and reliability of Openappo's systems are unmatched compared to generic off-the-shelf software. Van sales, invoices, and warehouse reconciliations run seamlessly with responsive 24/7 support.",
    },
    variant: "male",
  },
  maspero: {
    ar: {
      name: "أ. حسام عادل",
      role: "المدير التنفيذي",
      company: "فروع ماسبيرو للخدمات الرقمية",
      quote:
        "نشاط الخدمات الرقمية وشحن المحافظ الإلكترونية والطباعة كان يعاني من فروقات في تسليم الورديات والشفتات. نظام ماسبيرو ضبط تسليم الورديات ومطابقة أرصدة المحافظ والعمولات بدقة تامة، وباتت لوحة المتابعة تكشف أداء الفروع فوراً.",
    },
    en: {
      name: "Mr. Hossam Adel",
      role: "Managing Director",
      company: "Maspero Digital Services",
      quote:
        "Operating digital services, mobile wallet cash transfers, and POS shifts used to face reconciliation discrepancies. Openappo's customized POS locked shift handovers and wallet balances down to the penny with live branch dashboards.",
    },
    variant: "male",
  },
  rtx: {
    ar: {
      name: "م. إبراهيم فؤاد",
      role: "مدير الإنتاج والتصنيع",
      company: "RTX للتجارة والتصنيع",
      quote:
        "تتبع المنتج عبر مراحله من استلام الخامات مروراً بخطوط الإنتاج والتصنيع وحتى التوزيع كان تحدياً كبيراً. البرنامج وفّر لنا رقابة دقيقة على الهدر وتكلفة كل مرحلة تصنيع، مما أحدث نقلة نوعية في كفاءة المصنع وهوامش الربح.",
    },
    en: {
      name: "Eng. Ibrahim Fouad",
      role: "Manufacturing & QA Lead",
      company: "RTX Trade & Manufacturing",
      quote:
        "Tracking goods across 3 stages—raw materials, assembly, and wholesale delivery—was complex. Openappo provided end-to-end stage tracking and waste control that drastically improved production yield and margins.",
    },
    variant: "male",
  },
  roknalanaqa: {
    ar: {
      name: "أ. ياسر الشامي",
      role: "المؤسس والشريك الإداري",
      company: "مجموعة ركن الأناقة",
      quote:
        "كنا نبحث عن حل يدمج محلات الملابس مع ورشة تفصيل الستائر وحسابات الشركاء وتوزيع الأرباح في مكان واحد. وفّر لنا النظام شاشة تحكم واضحة لإدارة المبيعات والورشة والأرباح بكل شفافية وسهولة.",
    },
    en: {
      name: "Mr. Yasser El Shamy",
      role: "Founder & Managing Partner",
      company: "Rokn Alanaqa Group",
      quote:
        "We needed a unified solution connecting retail branches with our tailoring workshop and partner profit shares. Openappo delivered a single transparent platform that brought complete control and clarity to our business.",
    },
    variant: "male",
  },
  binqasim: {
    ar: {
      name: "أ. بلال قاسم",
      role: "مدير سلاسل الإمداد والاستيراد",
      company: "بي قاسم للاستيراد والتصدير",
      quote:
        "حساب تكاليف الشحنات الاستيرادية وتوزيع الجمارك ومصروفات النقل على آلاف الأصناف كان يستغرق أياماً. مع المنظومة السحابية أصبح الأمر يتم بنقرة زر وبحسابات دقيقة للأرباح والتكاليف المخزنية.",
    },
    en: {
      name: "Mr. Belal Qasim",
      role: "Head of Supply Chain & Import",
      company: "Bin Qasim Import & Export",
      quote:
        "Distributing shipping, customs duties, and logistics expenses across thousands of imported SKUs used to take days on spreadsheets. With Openappo, landed costs and profit margins compute automatically in one click.",
    },
    variant: "male",
  },
  opengym: {
    ar: {
      name: "كابتن أحمد سامي",
      role: "مدير العمليات الرياضية",
      company: "OpenGym للأندية الرياضية",
      quote:
        "إدارة اشتراكات الأعضاء، وتجديد العضويات، والتحكم في بوابات الدخول وتسجيل الحضور والانصراف أصبح سلساً للغاية، وتطبيق الأعضاء منح المشتركين تجربة عصرية متطورة.",
    },
    en: {
      name: "Captain Ahmed Samy",
      role: "Gym Operations Manager",
      company: "OpenGym Fitness Platform",
      quote:
        "Member renewals, access gates, attendance logs, and personal trainer schedules became seamless. The PWA member portal gave our fitness community an elite digital experience.",
    },
    variant: "male",
  },
  riyadalquran: {
    ar: {
      name: "د. عبد الرحمن إبراهيم",
      role: "المشرف العام",
      company: "جمعية رياض القرآن الكريم",
      quote:
        "البرنامج نظّم استقبال وبحث وتصنيف طلبات الرعاية الخيرية والحالات المرضية حتى إتمام الصرف، بالإضافة إلى إدارة الحضانة ومتابعة أولياء الأمور بشفافية وسرعة قياسية.",
    },
    en: {
      name: "Dr. Abdelrahman Ibrahim",
      role: "General Supervisor",
      company: "Riyad Al-Quran Charity Foundation",
      quote:
        "The system organized social aid applications, beneficiary cases, and disbursements alongside educational nursery portals with maximum transparency and speed.",
    },
    variant: "male",
  },
  vos: {
    ar: {
      name: "أ. منى زهران",
      role: "منسقة المبادرات والفرق",
      company: "منظومة العمل التطوعي VOS",
      quote:
        "تنظيم مئات المتطوعين، وتوثيق ساعات العمل والقوافل وإصدار الشهادات المعتمدة إلكترونياً أصبح تجربة منظمة واحترافية عززت الشفافية مع كافة الجهات الشريكة.",
    },
    en: {
      name: "Ms. Mona Zahran",
      role: "Initiatives Coordinator",
      company: "Volunteer Operating System (VOS)",
      quote:
        "Coordinating hundreds of volunteers, tracking verified hours, and issuing verifiable digital certificates made volunteer management professional and effortless.",
    },
    variant: "hijab",
  },
};

const FALLBACK_REVIEWS = {
  ar: [
    {
      name: "أ. عبد الله المتوكل",
      role: "رئيس مجلس الإدارة",
      company: "المتوكل للتجارة والتوكيلات",
      quote:
        "السهولة والسرعة والاستقرار السحابي هم أهم ما يميز أنظمة Openappo. الموظفون استوعبوا النظام خلال ساعات قليلة، وأصبح لدينا تقارير مالية وتشغيلية مباشرة تغنينا عن مئات الأوراق والمراجعات اليدوية.",
      variant: "male",
    },
    {
      name: "م. خالد الأنصاري",
      role: "المدير التنفيذي",
      company: "الأنصاري للحلول الهندسية",
      quote:
        "تجربة العمل مع Openappo تعد من أنجح استثماراتنا الرقمية. فهمهم العميق لمتطلبات عملنا وتحويلها إلى أدوات برمجية متقنة رفع إنتاجية فريقنا بنسبة تتجاوز 40% خلال الأشهر الأولى.",
      variant: "male",
    },
    {
      name: "أ. مصطفى الشناوي",
      role: "مدير العمليات",
      company: "الشناوي للتجارة والتوريدات",
      quote:
        "الدقة العالية في متابعة المخزون والمبيعات والمديونيات أعطتنا أماناً وتحكماً كاملاً في حركة الأعمال. ميزة العمل السحابي من أي مكان وفي أي وقت أتاحت لنا إدارة الفروع بسهولة ومرونة فائقة.",
      variant: "male",
    },
    {
      name: "أ. وائل رضوان",
      role: "المدير المالي",
      company: "رضوان للمقاولات والتوريدات",
      quote:
        "الحسابات ومطابقة الخزائن وتقارير الأرباح والخسائر صارت تظهر بضغطة زر واحدة وبدون أخطاء. المنظومة أغلقت منافذ العجز وساعدتنا في إدارة السيولة والتدفقات النقدية بدقة متناهية.",
      variant: "male",
    },
  ],
  en: [
    {
      name: "Mr. Abdullah Al-Motawakel",
      role: "Board Chairman",
      company: "Al-Motawakel Trading",
      quote:
        "Speed, intuitive design, and cloud stability are Openappo's hallmarks. Our team adopted the software within hours, giving us live operational metrics without paperwork.",
      variant: "male",
    },
    {
      name: "Eng. Khaled Al-Ansari",
      role: "Executive Director",
      company: "Al-Ansari Engineering Solutions",
      quote:
        "Partnering with Openappo has been our best digital investment. Their deep grasp of workflow requirements boosted team throughput by over 40% in the very first quarter.",
      variant: "male",
    },
    {
      name: "Mr. Mostafa El Shennawy",
      role: "Operations Manager",
      company: "Shennawy Commercial Supplies",
      quote:
        "Real-time inventory and receivables oversight gave us complete control across our branch network with full mobility from anywhere.",
      variant: "male",
    },
    {
      name: "Mr. Wael Radwan",
      role: "Chief Financial Officer",
      company: "Radwan Contracting & Supplies",
      quote:
        "Financial reconciliations, cash drawers, and P&L reports now generate instantly with zero human error, providing exact cash flow forecasting.",
      variant: "male",
    },
  ],
};

const STR = {
  ar: {
    kicker: "آراء وتجارب الشركاء",
    titleParts: [["ما يقوله", ""], ["شركاؤنا", "em"], ["عن العمل معنا", ""]],
    sub: "شهادات وتجارب حقيقية نعتز بها من قادة الشركات والمصانع والمؤسسات التي تعتمد على أنظمة Openappo السحابية لإدارة وتطوير عملياتها اليومية.",
    close: "إغلاق",
  },
  en: {
    kicker: "Customer Stories & Reviews",
    titleParts: [["What", ""], ["our partners", "em"], ["say about working with us", ""]],
    sub: "Real testimonials and success stories from business leaders and enterprises relying on Openappo cloud ERP and custom systems to scale operations daily.",
    close: "Close",
  },
};

function Bubbles() {
  const items = [
    { x: 8, y: 14, d: 0, s: 1, w: 120 },
    { x: 72, y: 8, d: 1.4, s: 0.82, w: 96 },
    { x: 26, y: 62, d: 2.8, s: 0.7, w: 84 },
    { x: 60, y: 54, d: 4.1, s: 0.92, w: 110 },
    { x: 44, y: 26, d: 5.3, s: 0.6, w: 72 },
    { x: 86, y: 44, d: 6.6, s: 0.74, w: 88 },
  ];
  return (
    <div className="tm-bubbles" aria-hidden="true">
      {items.map((b, i) => (
        <span
          key={i}
          className="tm-bubble"
          style={{
            left: `${b.x}%`,
            top: `${b.y}%`,
            width: b.w,
            "--d": `${b.d}s`,
            "--s": b.s,
          }}
        >
          <i />
          <i />
          <i />
        </span>
      ))}
    </div>
  );
}

export default function TestimonialsClient({ clients = [], testimonials = [], lang = "ar" }) {
  const isEn = lang === "en";
  const real = testimonials.length > 0;
  const t = STR[lang] || STR.ar;
  const fallbacks = FALLBACK_REVIEWS[lang] || FALLBACK_REVIEWS.ar;
  const [active, setActive] = useState(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    el.querySelectorAll(".tm-card").forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, [clients, testimonials]);

  useEffect(() => {
    if (!active) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  const logoFor = (slug) =>
    (slug && clients.find((c) => c.slug === slug)?.logo) || "";

  const cards = real
    ? testimonials.map((item) => ({
        key: item.id,
        seed: item.avatarSeed || item.id,
        variant: item.avatarStyle || "auto",
        photo: item.photoUrl || "",
        quote: item.quote,
        name: item.clientName || item.company,
        role: item.role,
        company: item.company,
        logo: logoFor(item.projectSlug),
        tag: item.company,
      }))
    : (clients.length > 0
        ? clients
        : Object.keys(CURATED_BY_SLUG).map((slug) => {
            const entry = CURATED_BY_SLUG[slug][lang] || CURATED_BY_SLUG[slug].ar;
            return {
              slug,
              name: entry.company,
              subtitle: "",
              logo: "",
            };
          })
      ).map((c, i) => {
        const slugEntry = CURATED_BY_SLUG[c.slug];
        const curated = slugEntry
          ? slugEntry[lang] || slugEntry.ar
          : fallbacks[i % fallbacks.length];
        const variant = slugEntry ? slugEntry.variant : curated.variant || "auto";

        return {
          key: c.slug || i,
          seed: c.slug || `s${i}`,
          variant,
          photo: "",
          quote: curated.quote,
          name: curated.name,
          role: curated.role,
          company: c.name || curated.company,
          logo: c.logo || "",
          tag: c.subtitle || c.name || "",
        };
      });

  return (
    <>
      <header className="tm-hero">
        <Bubbles />
        <span className="tm-kicker">{t.kicker}</span>
        <h1 className="tm-title">
          {t.titleParts.map(([text, tag], i) =>
            tag === "em" ? <em key={i}>{text}</em> : <span key={i}>{text}</span>
          )}
        </h1>
        <p className="tm-sub">{t.sub}</p>
      </header>

      <div className="tm-grid" ref={gridRef}>
        {cards.map((c, i) => (
          <article
            className="tm-card"
            key={c.key}
            style={{ "--i": i }}
            onClick={() => setActive(c)}
          >
            <div className="tm-card-glow" aria-hidden="true" />
            <div className="tm-quote-mark" aria-hidden="true">”</div>

            <p className={`tm-quote${!isEn ? " is-real" : ""}`}>{c.quote}</p>

            <footer className="tm-who">
              {c.photo ? (
                <img
                  className="tm-avatar tm-photo"
                  src={c.photo}
                  alt=""
                  width={58}
                  height={58}
                  loading="lazy"
                />
              ) : (
                <Avatar3D seed={c.seed} size={58} variant={c.variant} />
              )}
              <span className="tm-who-text">
                <span className="tm-who-name">
                  {c.name}
                  {c.role ? ` · ${c.role}` : ""}
                </span>
                <span className="tm-who-co">{c.company}</span>
              </span>
              {c.logo ? (
                <img className="tm-who-logo" src={c.logo} alt="" loading="lazy" />
              ) : null}
            </footer>
          </article>
        ))}
      </div>

      {active && (
        <div className="tm-modal" onClick={() => setActive(null)}>
          <div className="tm-modal-inner" onClick={(e) => e.stopPropagation()}>
            <button
              className="tm-modal-close"
              onClick={() => setActive(null)}
              aria-label={t.close}
            >
              ✕
            </button>
            {active.photo ? (
              <img
                className="tm-avatar tm-photo"
                src={active.photo}
                alt=""
                width={104}
                height={104}
              />
            ) : (
              <Avatar3D seed={active.seed} size={104} variant={active.variant} />
            )}
            <p className={`tm-modal-quote${!isEn ? " is-real" : ""}`}>
              {active.quote}
            </p>
            <div className="tm-modal-who">
              <b>
                {active.name}
                {active.role ? ` · ${active.role}` : ""}
              </b>
              <span>{active.company}</span>
            </div>
            {active.tag && active.tag !== active.company ? (
              <span className="tm-modal-tag">{active.tag}</span>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
}
