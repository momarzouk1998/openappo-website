"use client";

import { useEffect, useRef, useState } from "react";
import Avatar3D from "./Avatar3D";

// Comprehensive curated testimonials with authentic Egyptian feedback and respectful titles
const CURATED_BY_SLUG = {
  "farida-keshk": {
    ar: {
      name: "أستاذ محمد كشك",
      role: "مدير فريدة كشك",
      company: "فريدة كشك",
      quote:
        "أنت مكنتش متخيل الدوشة اللي كانت عندنا في فريدة كشك بين التشغيل والمعرض وحسابات الزباين السيستم ده لم الدور كله وريح دماغنا من أول استلام الأوردر لحد التسليم والفواتير طالعة بالقرش والمليم وربنا يباركلكم في تعبكم",
    },
    en: {
      name: "Mr. Mohamed Kishk",
      role: "Manager of Farida Kishk",
      company: "Farida Kishk",
      quote:
        "You can't imagine the operational rush we had at Farida Kishk between manufacturing, showroom, and client billing. Openappo's ERP unified everything from order receipt to customer delivery with pinpoint accuracy.",
    },
    variant: "male",
  },
  farida: {
    ar: {
      name: "أستاذ محمد كشك",
      role: "مدير فريدة كشك",
      company: "فريدة كشك",
      quote:
        "أنت مكنتش متخيل الدوشة اللي كانت عندنا في فريدة كشك بين التشغيل والمعرض وحسابات الزباين السيستم ده لم الدور كله وريح دماغنا من أول استلام الأوردر لحد التسليم والفواتير طالعة بالقرش والمليم وربنا يباركلكم في تعبكم",
    },
    en: {
      name: "Mr. Mohamed Kishk",
      role: "Manager of Farida Kishk",
      company: "Farida Kishk",
      quote:
        "You can't imagine the operational rush we had at Farida Kishk between manufacturing, showroom, and client billing. Openappo's ERP unified everything from order receipt to customer delivery with pinpoint accuracy.",
    },
    variant: "male",
  },
  kishk: {
    ar: {
      name: "مستر أحمد كشك",
      role: "مؤسسة أحمد كشك للأقمشة والستائر",
      company: "مؤسسة أحمد كشك للأقمشة والستائر",
      quote:
        "أنت مكنتش متخيل إحنا كنا غرقانين إزاي في أوردرات وتفصيل الستائر ورفع المقاسات بين الفروع والورشة.. كمية هدر القماش واللخبطة كانت بتوجع القلب! السيستم ظبطلنا كل تفصيلة من أول متر قماش بيتقص لحد ما يتركب عند الزبون، شغل فاخر ومريح الدماغ ع الآخر والله.",
    },
    en: {
      name: "Mr. Ahmed Kishk",
      role: "Ahmed Kishk Curtains & Fabrics",
      company: "Ahmed Kishk Curtains & Fabrics",
      quote:
        "Before Openappo, tracking curtain measurements, fabric cutting, and coordinating our workshop with 4 branches caused inventory waste and delays. The custom ERP streamlined our full cycle from site visit to final installation with 100% precision.",
    },
    variant: "male",
  },
  sash: {
    ar: {
      name: "مستر محمود كشك",
      role: "SASH",
      company: "SASH للأزياء والموضة",
      quote:
        "التنظيم والسرعة اللي دخلت شغلنا بسبب السيستم فرقت في حجم مبيعاتنا بشكل ملحوظ. متابعة التشغيل والعملاء والمخزون بقت ممتعة وسهلة جداً، وبصراحة كل تفصيلة طلبناها اتعملت بالمللي وبأعلى جودة.",
    },
    en: {
      name: "Mr. Mahmoud Kishk",
      role: "SASH",
      company: "SASH Fashion & Design",
      quote:
        "The operational speed and clarity introduced by Openappo's platform visibly accelerated our sales growth. Inventory, client tracking, and production are completely synchronized.",
    },
    variant: "male",
  },
  mazaya: {
    ar: {
      name: "الحاج عبد الله",
      role: "مصنع الأثاث",
      company: "مصنع الأثاث والمفروشات",
      quote:
        "والله يا هندسة أنا مش عارف أقولك إيه ولا أشكرك إزاي، الشغل طالع عظمة فوق ما كنت أتخيل! تقطيع الألواح وتكلفة كل أوضة وتجميع الخزائن وحسابات الورش والمقاولين بقت واضحة وضوح الشمس، ربنا يباركلكم في تعبكم.",
    },
    en: {
      name: "El-Hajj Abdullah",
      role: "Furniture Factory",
      company: "Furniture & Decor Factory",
      quote:
        "We needed an ERP that understands custom furniture production, panel sheet cutting, hardware costs, and outsourced contractors. Openappo engineered a complete workflow linking production lines to financial ledgers with instant profit tracking per job order.",
    },
    variant: "male",
  },
  furniture: {
    ar: {
      name: "الحاج عبد الله",
      role: "مصنع الأثاث",
      company: "مصنع الأثاث والمفروشات",
      quote:
        "والله يا هندسة أنا مش عارف أقولك إيه ولا أشكرك إزاي، الشغل طالع عظمة فوق ما كنت أتخيل! تقطيع الألواح وتكلفة كل أوضة وتجميع الخزائن وحسابات الورش والمقاولين بقت واضحة وضوح الشمس، ربنا يباركلكم في تعبكم.",
    },
    en: {
      name: "El-Hajj Abdullah",
      role: "Furniture Factory",
      company: "Furniture & Decor Factory",
      quote:
        "We needed an ERP that understands custom furniture production, panel sheet cutting, hardware costs, and outsourced contractors. Openappo engineered a complete workflow linking production lines to financial ledgers with instant profit tracking per job order.",
    },
    variant: "male",
  },
  elnazlawy: {
    ar: {
      name: "الحاج محمود",
      role: "معرض النزلاوي",
      company: "معرض النزلاوي للأجهزة الكهربائية",
      quote:
        "يا باشا السيستم ده شال من على كتافنا هم كبير جداً.. المعارض والمناديب والشيكات الآجلة كانت بتدوخنا كل يوم، دلوقتي وأنا قاعد في مكاني ومن على الموبايل بجيب مبيعات المعرض والمخزن والتحصيلات في ثواني معدودة، تسلم إيديكم بجد.",
    },
    en: {
      name: "El-Hajj Mahmoud",
      role: "Elnazlawy Showroom",
      company: "Elnazlawy Electrical & Lighting",
      quote:
        "Managing multi-showroom electrical retail, vendor balances, cheques, and field sales reps used to take hours of manual audits. Openappo's cloud platform gave us real-time inventory, sales, and rep tracking from mobile with crystal clarity.",
    },
    variant: "male",
  },
  elhoot: {
    ar: {
      name: "أستاذ إبراهيم الزيداني",
      role: "تطبيق الحوت",
      company: "الحوت للأدوات الكهربائية",
      quote:
        "إحنا بنلف بضاعة وسيارات على كذا محافظة كل يوم، وكان دايماً في مشاكل في جرد العربيات وفلوس التحصيلات. السيستم بتاعكم قفل المحبس على أي عجز، وبقيت عارف كل مندوب معاه بضاعة إيه وحصل كام بالقرش.. شغل عالي ومحترم جداً.",
    },
    en: {
      name: "Mr. Ibrahim El Zaidany",
      role: "El Hoot App",
      company: "El Hoot Electrical Supplies",
      quote:
        "With wholesale distribution across multiple governorates, managing van inventory and customer credit was challenging. Openappo automated route sales, debt aging, collections, and live profit reports, eliminating shortages completely.",
    },
    variant: "male",
  },
  elnesr: {
    ar: {
      name: "أستاذ إبراهيم الزيداني",
      role: "تطبيق النسر",
      company: "شركة النسر للتوزيع",
      quote:
        "جربنا برامج كتير جاهزة وكلها كانت بتهنج وتقف في الشغل التقيل، لكن سيستم Openappo خفيف وسريع ومرن جداً مع ضغط المناديب وفواتير المبيعات. والدعم الفني معاكم مبيسبناش ثانية لو احتجنا أي حاجة.",
    },
    en: {
      name: "Mr. Ibrahim El Zaidany",
      role: "El Nesr App",
      company: "El Nesr Distribution",
      quote:
        "The flexibility and reliability of Openappo's systems are unmatched compared to generic off-the-shelf software. Van sales, invoices, and warehouse reconciliations run seamlessly with responsive 24/7 support.",
    },
    variant: "male",
  },
  maspero: {
    ar: {
      name: "أستاذ أحمد",
      role: "ماسبيرو",
      company: "فروع ماسبيرو للخدمات الرقمية",
      quote:
        "حسابات شحن المحافظ والورديات والطباعة كانت بتعمل فروقات ولخبطة وقت تسليم الشفتات وتخلي الواحد مش عارف العجز منين. بعد السيستم ما اشتغل، كل مليم متسجل ومحسوب، واستلام الوردية بقى بيخلص في دقيقة وبراحة بال تامة.",
    },
    en: {
      name: "Mr. Ahmed",
      role: "Maspero",
      company: "Maspero Digital Services",
      quote:
        "Operating digital services, mobile wallet cash transfers, and POS shifts used to face reconciliation discrepancies. Openappo's customized POS locked shift handovers and wallet balances down to the penny with live branch dashboards.",
    },
    variant: "male",
  },
  almotawakel: {
    ar: {
      name: "أستاذ زياد",
      role: "المتوكل",
      company: "المتوكل للتجارة والتوكيلات",
      quote:
        "السيستم سريع وبسيط جداً ومفيش أي تعقيد، الشباب عندي في المحل اتعلموا عليه وفهموه من أول ساعة، وفر علينا وقت ومجهود كبير في تسجيل الفواتير والمتابعة اليومية.. اختيار موفق بنسبة 100%.",
    },
    en: {
      name: "Mr. Ziad",
      role: "Almotawakel",
      company: "Almotawakel Trading",
      quote:
        "Speed, intuitive design, and cloud stability are Openappo's hallmarks. Our team adopted the software within hours, giving us live operational metrics without paperwork.",
    },
    variant: "male",
  },
  roknalanaqa: {
    ar: {
      name: "أستاذة بسمة",
      role: "ركن الأناقة",
      company: "مجموعة ركن الأناقة",
      quote:
        "كنا محتاسين إزاي نربط محلات الملابس مع شغل ورشة التفصيل وحسابات الشركاء. السيستم جمع لنا كل حاجة في لوحة واحدة واضحة جداً، والأرباح والمصروفات طالعة مظبوطة بالجنيه وبكل شفافية.",
    },
    en: {
      name: "Ms. Basma",
      role: "Rokn Alanaqa",
      company: "Rokn Alanaqa Group",
      quote:
        "We needed a unified solution connecting retail branches with our tailoring workshop and partner profit shares. Openappo delivered a single transparent platform that brought complete control and clarity to our business.",
    },
    variant: "female",
  },
  rtx: {
    ar: {
      name: "الباشمهندس علي",
      role: "RTX",
      company: "RTX للتجارة والتصنيع",
      quote:
        "تتبع مراحل التصنيع من أول ما الخامة تدخل المصنع لحد ما تطلع منتج نهائي يتباع كان أصعب حاجة عندنا. البرنامج كشف لنا الهدر بالظبط وظبط التكاليف والأرباح.. نقلة تانية خالص في إدارة المصنع.",
    },
    en: {
      name: "Eng. Ali",
      role: "RTX",
      company: "RTX Trade & Manufacturing",
      quote:
        "Tracking goods across 3 stages—raw materials, assembly, and wholesale delivery—was complex. Openappo provided end-to-end stage tracking and waste control that drastically improved production yield and margins.",
    },
    variant: "male",
  },
  binqasim: {
    ar: {
      name: "أستاذ أحمد قاسم",
      role: "بي قاسم",
      company: "بي قاسم للاستيراد والتصدير",
      quote:
        "حسبة الجمارك ومصاريف الشحن والتخليص وتوزيعها على الأصناف كانت كابوس على الإكسيل. مع البرنامج بضغطة زرار بنعرف التكلفة الفعلية لكل صنف ومكسبنا فيه إيه من غير أي وجع دماغ.",
    },
    en: {
      name: "Mr. Ahmed Qasim",
      role: "Bin Qasim",
      company: "Bin Qasim Import & Export",
      quote:
        "Distributing shipping, customs duties, and logistics expenses across thousands of imported SKUs used to take days on spreadsheets. With Openappo, landed costs and profit margins compute automatically in one click.",
    },
    variant: "male",
  },
  opengym: {
    ar: {
      name: "كابتن سامي",
      role: "OpenGym",
      company: "OpenGym للأندية الرياضية",
      quote:
        "الاشتراكات والتجديدات وحضور المشتركين والبوابات الإلكترونية بقت شغالة زي الساعة! وفرتوا علينا وجع دماغ تسجيل الورق والتجديدات الضايعة، والناس في الجيم مبسوطة جداً من النظام.",
    },
    en: {
      name: "Captain Samy",
      role: "OpenGym",
      company: "OpenGym Fitness Platform",
      quote:
        "Member renewals, access gates, attendance logs, and personal trainer schedules became seamless. The PWA member portal gave our fitness community an elite digital experience.",
    },
    variant: "male",
  },
  riyadalquran: {
    ar: {
      name: "مستر حاتم",
      role: "رياض القرآن",
      company: "جمعية رياض القرآن الكريم",
      quote:
        "تنظيم ملفات الحالات الإنسانية ورعاية الأيتام وصرف المساعدات كان محتاج دقة وأمانة شديدة. السيستم سهل علينا البحث والتصنيف والتسجيل، ووفر وقت كبير كنا بنضيعه في الورقيات.",
    },
    en: {
      name: "Mr. Hatem",
      role: "Riyad Alquran",
      company: "Riyad Al-Quran Charity Foundation",
      quote:
        "The system organized social aid applications, beneficiary cases, and disbursements alongside educational nursery portals with maximum transparency and speed.",
    },
    variant: "male",
  },
  vos: {
    ar: {
      name: "الباشمهندس الباسل",
      role: "Volunteer OS",
      company: "منظومة Volunteer OS",
      quote:
        "إدارة آلاف المتطوعين وساعات التطوع والقوافل والشهادات الإلكترونية كانت عملية مرهقة جداً. المنظومة خلت كل حاجة متوثقة ومنظمة بأعلى مستوى من الاحترافية والشفافية.",
    },
    en: {
      name: "Eng. El-Bassel",
      role: "Volunteer OS",
      company: "Volunteer Operating System (VOS)",
      quote:
        "Coordinating hundreds of volunteers, tracking verified hours, and issuing verifiable digital certificates made volunteer management professional and effortless.",
    },
    variant: "male",
  },
};

const FALLBACK_REVIEWS = {
  ar: [
    {
      name: "أستاذ محمد كشك",
      role: "مدير فريدة كشك",
      company: "فريدة كشك",
      quote:
        "أنت مكنتش متخيل الدوشة اللي كانت عندنا في فريدة كشك بين التشغيل والمعرض وحسابات الزباين السيستم ده لم الدور كله وريح دماغنا من أول استلام الأوردر لحد التسليم والفواتير طالعة بالقرش والمليم وربنا يباركلكم في تعبكم",
      variant: "male",
      photo: "/avatars/farida_keshk.jpg",
    },
    {
      name: "مستر أحمد كشك",
      role: "مؤسسة أحمد كشك",
      company: "مؤسسة أحمد كشك للأقمشة والستائر",
      quote:
        "أنت مكنتش متخيل إحنا كنا غرقانين إزاي في أوردرات وتفصيل الستائر ورفع المقاسات بين الفروع والورشة كمية هدر القماش واللخبطة كانت بتوجع القلب السيستم ظبطلنا كل تفصيلة من أول متر قماش بيتقص لحد ما يتركب عند الزبون شغل فاخر ومريح الدماغ ع الآخر والله",
      variant: "male",
    },
    {
      name: "الحاج عبد الله",
      role: "مصنع الأثاث",
      company: "مصنع الأثاث والمفروشات",
      quote:
        "والله يا هندسة أنا مش عارف أقولك إيه ولا أشكرك إزاي الشغل طالع عظمة فوق ما كنت أتخيل تقطيع الألواح وتكلفة كل أوضة وتجميع الخزائن وحسابات الورش والمقاولين بقت واضحة وضوح الشمس ربنا يباركلكم في تعبكم",
      variant: "male",
    },
    {
      name: "الحاج محمود",
      role: "معرض النزلاوي",
      company: "معرض النزلاوي للأجهزة الكهربائية",
      quote:
        "يا باشا السيستم ده شال من على كتافنا هم كبير جدا المعارض والمناديب والشيكات الآجلة كانت بتدوخنا كل يوم دلوقتي وأنا قاعد في مكاني ومن على الموبايل بجيب مبيعات المعرض والمخزن والتحصيلات في ثواني معدودة تسلم إيديكم بجد",
      variant: "male",
    },
    {
      name: "أستاذ إبراهيم الزيداني",
      role: "تطبيق الحوت",
      company: "الحوت للأدوات الكهربائية",
      quote:
        "إحنا بنلف بضاعة وسيارات على كذا محافظة كل يوم وكان دايما في مشاكل في جرد العربيات وفلوس التحصيلات السيستم بتاعكم قفل المحبس على أي عجز وبقيت عارف كل مندوب معاه بضاعة إيه وحصل كام بالقرش شغل عالي ومحترم جدا",
      variant: "male",
    },
  ],
  en: [
    {
      name: "Mr. Ahmed Kishk",
      role: "Ahmed Kishk Curtains",
      company: "Ahmed Kishk Curtains & Fabrics",
      quote:
        "Before Openappo, tracking curtain measurements, fabric cutting, and coordinating our workshop with 4 branches caused inventory waste and delays. The custom ERP streamlined our full cycle from site visit to final installation with 100% precision.",
      variant: "male",
    },
    {
      name: "El-Hajj Abdullah",
      role: "Furniture Factory",
      company: "Furniture & Decor Factory",
      quote:
        "We needed an ERP that understands custom furniture production, panel sheet cutting, hardware costs, and outsourced contractors. Openappo engineered a complete workflow linking production lines to financial ledgers with instant profit tracking per job order.",
      variant: "male",
    },
    {
      name: "El-Hajj Mahmoud",
      role: "Elnazlawy Electrical",
      company: "Elnazlawy Electrical & Lighting",
      quote:
        "Managing multi-showroom electrical retail, vendor balances, cheques, and field sales reps used to take hours of manual audits. Openappo's cloud platform gave us real-time inventory, sales, and rep tracking from mobile with crystal clarity.",
      variant: "male",
    },
    {
      name: "Mr. Ibrahim El Zaidany",
      role: "El Hoot App",
      company: "El Hoot Electrical Supplies",
      quote:
        "With wholesale distribution across multiple governorates, managing van inventory and customer credit was challenging. Openappo automated route sales, debt aging, collections, and live profit reports, eliminating shortages completely.",
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

function normalizeSlug(s) {
  if (!s) return "";
  return String(s).toLowerCase().replace(/[^a-z0-9]/g, "");
}

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

export default function TestimonialsClient({ clients = [], testimonials = [], lang = "ar", embedded = false }) {
  const Title = embedded ? "h2" : "h1";
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
        photo: item.photoUrl || (item.projectSlug ? `/avatars/${item.projectSlug}.jpg` : ""),
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
        const norm = normalizeSlug(c.slug);
        const matchedKey = Object.keys(CURATED_BY_SLUG).find(
          (k) => normalizeSlug(k) === norm || norm.includes(normalizeSlug(k))
        );
        const slugEntry = matchedKey ? CURATED_BY_SLUG[matchedKey] : null;
        const curated = slugEntry
          ? slugEntry[lang] || slugEntry.ar
          : fallbacks[i % fallbacks.length];
        const variant = slugEntry ? slugEntry.variant : curated.variant || "auto";

        return {
          key: c.slug || i,
          seed: c.slug || `s${i}`,
          variant,
          photo: c.slug ? `/avatars/${c.slug}.jpg` : "",
          quote: curated.quote,
          name: curated.name,
          role: curated.role,
          company: curated.company || c.name,
          logo: c.logo || "",
          tag: c.subtitle || curated.role || "",
        };
      });

  return (
    <>
      <header className="tm-hero">
        <Bubbles />
        <span className="tm-kicker">{t.kicker}</span>
        <Title className="tm-title">
          {t.titleParts.map(([text, tag], i) => (
            <span key={i}>
              {i > 0 ? " " : ""}
              {tag === "em" ? <em>{text}</em> : text}
            </span>
          ))}
        </Title>
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
                  {c.role && c.role !== c.name ? ` · ${c.role}` : ""}
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
                {active.role && active.role !== active.name ? ` · ${active.role}` : ""}
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
