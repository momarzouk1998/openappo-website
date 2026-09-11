"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const AUTO_MS = 1200;
const BEHIND = 3;

function rel(i, cur, n) {
  return (i - cur + n) % n;
}

function deckStyle(o, n) {
  if (o === n - 1) {
    return { transform: "translateZ(80px) scale(0.92)", opacity: 0, zIndex: 40, pointerEvents: "none" };
  }
  if (o > BEHIND) return { opacity: 0, pointerEvents: "none" };
  return {
    transform: `translateY(${-o * 20}px) translateZ(${-o * 150}px) scale(${1 - o * 0.08})`,
    opacity: o === 0 ? 1 : o === 1 ? 0.45 : o === 2 ? 0.2 : 0.08,
    zIndex: 100 - o,
    pointerEvents: o === 0 ? "auto" : "none",
  };
}

function Deck({ shots, onZoom }) {
  const n = shots.length;
  const [cur, setCur] = useState(0);
  const [held, setHeld] = useState(false);
  const loaded = useRef(new Set());
  const [, bump] = useState(0);
  const touch = useRef(null);

  const markLoaded = useCallback((i) => {
    loaded.current.add(i);
    bump((v) => v + 1);
  }, []);

  useEffect(() => {
    if (!n) return;
    for (let d = 1; d <= BEHIND + 1; d++) {
      const i = (cur + d) % n;
      if (loaded.current.has(i)) continue;
      const im = new Image();
      im.onload = () => markLoaded(i);
      im.src = shots[i];
    }
  }, [cur, n, shots, markLoaded]);

  useEffect(() => {
    if (n < 2 || held) return;
    const id = setInterval(() => {
      setCur((c) => {
        const next = (c + 1) % n;
        return loaded.current.has(next) ? next : c;
      });
    }, AUTO_MS);
    return () => clearInterval(id);
  }, [n, held]);

  const go = useCallback(
    (dir) => {
      setCur((c) => (c + dir + n) % n);
      setHeld(true);
    },
    [n]
  );

  useEffect(() => {
    if (!held) return;
    const id = setTimeout(() => setHeld(false), 4500);
    return () => clearTimeout(id);
  }, [held, cur]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  if (!n)
    return (
      <div className="pf-flow-pending">
        <p>الشاشات التفصيلية لهذا النظام قيد الإعداد والإطلاق.</p>
        <a href="https://wa.me/201558282760" target="_blank" rel="noopener noreferrer" className="pf-demo-cta">
          طلب عرض توضيحي مباشر عبر واتساب ←
        </a>
      </div>
    );

  const visible = [];
  for (let i = 0; i < n; i++) {
    const o = rel(i, cur, n);
    if (o <= BEHIND || o === n - 1) visible.push({ i, o });
  }

  return (
    <>
      <div
        className="pf-deck-stage"
        onTouchStart={(e) => {
          touch.current = e.touches[0].clientX;
          setHeld(true);
        }}
        onTouchEnd={(e) => {
          if (touch.current == null) return;
          const dx = e.changedTouches[0].clientX - touch.current;
          touch.current = null;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        }}
      >
        <div className="pf-deck">
          {visible.map(({ i, o }) => (
            <button
              key={i}
              className={"pf-deck-card" + (o === 0 ? " is-front" : "")}
              style={deckStyle(o, n)}
              onClick={() => o === 0 && onZoom(shots[i])}
              aria-label="تكبير الشاشة"
              tabIndex={o === 0 ? 0 : -1}
              aria-hidden={o !== 0}
            >
              <img
                src={shots[i]}
                alt=""
                loading={o <= 1 ? "eager" : "lazy"}
                decoding="async"
                onLoad={() => markLoaded(i)}
              />
            </button>
          ))}
        </div>

        <button className="pf-deck-nav pf-deck-nav--prev" onClick={() => go(-1)} aria-label="السابق">
          ‹
        </button>
        <button className="pf-deck-nav pf-deck-nav--next" onClick={() => go(1)} aria-label="التالي">
          ›
        </button>
      </div>

      <div className="pf-flow-meta">
        <span className="pf-flow-count">
          {cur + 1} / {n}
        </span>
        <span className="pf-flow-hint">
          مرّر للتنقل بين الشاشات · اضغط على الشاشة لتكبيرها
        </span>
      </div>
    </>
  );
}

const SYSTEM_CONFIGS = {
  mazaya: {
    badge: "منظومة مصانع ومعارض الأثاث",
    pills: ["سحابي 100%", "تقارير لحظية", "صلاحيات دقيقة", "28 شاشة تشغيلية"],
    kpis: [
      { label: "مبيعات المعارض", val: "١٤٥,٠٠٠ ج.م", trend: "+١٨%" },
      { label: "أوامر التصنيع", val: "٣٤ أمر نشط", trend: "قيد التنفيذ" },
      { label: "حركات المخزون", val: "١,٢٨٠ قطعة", trend: "متوفر" },
    ],
    chartTitle: "إيرادات المعارض وأوامر الإنتاج",
    activities: [
      { text: "فاتورة مبيعات #4092 - معرض الدقي", status: "معتمد" },
      { text: "أمر تصنيع #891 - خط غرف النوم", status: "قيد التشغيل" },
      { text: "إذن صرف خامات #142 - مخزن الأخشاب", status: "مكتمل" },
    ],
  },
  keshk: {
    badge: "منظومة تجارة الأدوات المنزلية والتوزيع",
    pills: ["سحابي 100%", "توزيع وجملة", "إدارة المناديب", "9 شاشات تشغيلية"],
    kpis: [
      { label: "فواتير الجملة", val: "٨٢,٥٠٠ ج.م", trend: "+١٤%" },
      { label: "تحصيلات المناديب", val: "٦٤,٠٠٠ ج.م", trend: "لحظي" },
      { label: "أصناف المخزن", val: "٤,١٥٠ صنف", trend: "جرد نشط" },
    ],
    chartTitle: "حركة المبيعات والتحصيلات اليومية",
    activities: [
      { text: "فاتورة جملة #218 - عميل الزقازيق", status: "مسددة" },
      { text: "خط سير مندوب #4 - منطقة المنصورة", status: "قيد التوزيع" },
      { text: "تسوية خزينة فرعية #12", status: "معتمد" },
    ],
  },
  elnazlawy: {
    badge: "منظومة الأجهزة الكهربائية والإضاءة",
    pills: ["سحابي 100%", "خطوط سير المناديب", "متابعة الشيكات", "جرد باركود دقيق"],
    kpis: [
      { label: "مبيعات المعرض", val: "٩٦,٤٠٠ ج.م", trend: "+١٢%" },
      { label: "شيكات مستحقة", val: "١٨ شيك", trend: "تحت التحصيل" },
      { label: "أرصدة المخازن", val: "٨٩٠ جهاز", trend: "متوفر" },
    ],
    chartTitle: "مؤشر حركة الأجهزة والإضاءة",
    activities: [
      { text: "فاتورة أجهزة #512 - قطاعي", status: "مكتمل" },
      { text: "حافظة شيكات محصلة #88", status: "تم التحصيل" },
      { text: "إذن استلام بضاعة مورد #31", status: "معتمد" },
    ],
  },
  elhoot: {
    badge: "منظومة تجارة الجملة والتوزيع",
    pills: ["سحابي 100%", "تجارة الجملة", "أعمار الديون والائتمان", "تحصيلات الخزائن"],
    kpis: [
      { label: "مبيعات الجملة", val: "٢١٥,٠٠٠ ج.م", trend: "+٢٢%" },
      { label: "تحصيلات اليوم", val: "١٤٠,٠٠٠ ج.م", trend: "مكتمل" },
      { label: "أعمار الديون", val: "٩٨.٢% ملتزم", trend: "ممتاز" },
    ],
    chartTitle: "مبيعات التوزيع والتحصيلات النقدية",
    activities: [
      { text: "إذن صرف جملة #1084 - قطاع القناة", status: "معتمد" },
      { text: "سداد مديونية عميل #67", status: "تم السداد" },
      { text: "توريد بضاعة كابلات ومفاتيح", status: "بالمخزن" },
    ],
  },
  elnesr: {
    badge: "منظومة إدارة أسطول التوزيع والمناديب",
    pills: ["سحابي 100%", "شؤون الموظفين", "خطوط التوزيع", "مخزون متنقل لكل مندوب"],
    kpis: [
      { label: "مبيعات الأسطول", val: "١٣٢,٠٠٠ ج.م", trend: "+١٦%" },
      { label: "مناديب نشطون", val: "١٦ خط سير", trend: "بالخدمة" },
      { label: "تسوية العُهد", val: "١٠٠%", trend: "مطابق" },
    ],
    chartTitle: "تغطية خطوط السير ومبيعات المناديب",
    activities: [
      { text: "تسوية عهدة مندوب #7 - خط طنطا", status: "معتمد" },
      { text: "إصدار فاتورة ضريبية #3319", status: "مكتمل" },
      { text: "تحويل مخزني إلى سيارة توزيع #3", status: "تم النقل" },
    ],
  },
  rtx: {
    badge: "منظومة إدارة التصنيع ومراحل الإنتاج",
    pills: ["سحابي 100%", "3 مراحل إنتاج", "تتبع أوامر التصنيع", "حساب تكلفة الخامات"],
    kpis: [
      { label: "خامات مستلمة", val: "٤٨ طن", trend: "بالمخزن" },
      { label: "أوامر التشغيل", val: "١٢ خط إنتاج", trend: "يعمل" },
      { label: "منتجات جاهزة للبيع", val: "٢,٤٠٠ قطعة", trend: "جاهز" },
    ],
    chartTitle: "دورة حياة الإنتاج وتكلفة التشغيل",
    activities: [
      { text: "استلام خامات واردة - إذن #94", status: "مفحوص" },
      { text: "اكتمال مرحلة التصنيع #B12", status: "جاهز للبيع" },
      { text: "أمر شحن منتج تام للموزع", status: "تم التسليم" },
    ],
  },
  maspero: {
    badge: "منظومة نقاط البيع والخدمات الرقمية",
    pills: ["سحابي 100%", "نقاط بيع POS", "إدارة المحافظ والورديات", "إشراف متعدد الفروع"],
    kpis: [
      { label: "عمليات الشحن والمحافظ", val: "٣,٤٥٠ عملية", trend: "+٢٩%" },
      { label: "تسليم الورديات", val: "٦ فروع", trend: "مغلقة بدقة" },
      { label: "عمولات الموظفين", val: "لحظية", trend: "آلي" },
    ],
    chartTitle: "حجم معاملات المحافظ الإلكترونية والـ POS",
    activities: [
      { text: "تسليم وردية فرع المعادي #2", status: "مطابق" },
      { text: "عملية شحن محفظة إلكترونية #8902", status: "ناجحة" },
      { text: "تذكرة دعم داخلي - جهاز طباعة", status: "تم الحل" },
    ],
  },
  roknalanaqa: {
    badge: "منظومة المحلات التجارية وورش المفروشات",
    pills: ["سحابي 100%", "إدارة الورش والمحلات", "حسابات الشركاء والأرباح", "حركة الأقمشة والتفصيل"],
    kpis: [
      { label: "مبيعات المحلات", val: "٦٨,٠٠٠ ج.م", trend: "+١١%" },
      { label: "أوامر الورشة", val: "٢٢ تفصيل وتركيب", trend: "جارٍ التنفيذ" },
      { label: "أرباح الشركاء", val: "محسوبة آلياً", trend: "دورية" },
    ],
    chartTitle: "إيرادات الفروع وتشغيل الورشة",
    activities: [
      { text: "أمر تفصيل ستائر ومفروشات #114", status: "قيد التركيب" },
      { text: "فاتورة بيع ملابس - فرع النزهة", status: "مكتمل" },
      { text: "توزيع أرباح ربع سنوية - الشركاء", status: "معتمد" },
    ],
  },
  binqasim: {
    badge: "منظومة الاستيراد وسلاسل الإمداد",
    pills: ["سحابي 100%", "توزيع تكاليف الشحنات", "أسطول النقل والشحن", "تحليل ربحية الأصناف"],
    kpis: [
      { label: "شحنات الاستيراد", val: "٦ حاويات", trend: "بالميناء/المستودع" },
      { label: "تكلفة الأصناف", val: "موزعة بدقة", trend: "آلي" },
      { label: "أسطول النقل", val: "٨ شاحنات", trend: "نشط" },
    ],
    chartTitle: "تكلفة الشحنات ومعدلات دوران المخزون",
    activities: [
      { text: "تفريغ شحنة استيراد #C-802", status: "بالمستودع" },
      { text: "توزيع مصروفات الجمارك والشحن", status: "محسوب" },
      { text: "أمر خروج أسطول نقل بضائع", status: "بالطريق" },
    ],
  },
  opengym: {
    badge: "منصة إدارة الصالات والأندية الرياضية",
    pills: ["سحابي 100%", "بوابة اشتراكات الأعضاء", "تطبيق PWA بدون إنترنت", "إدارة المدربين والمدفوعات"],
    kpis: [
      { label: "الأعضاء النشطون", val: "١,٢٤٠ مشترك", trend: "+١٥%" },
      { label: "تجديد الاشتراكات", val: "٨٨%", trend: "معدل عالي" },
      { label: "حضور اليوم بالبصمة", val: "٣١٠ عضو", trend: "تسجيل فوري" },
    ],
    chartTitle: "نمو الاشتراكات والإيرادات الشهرية",
    activities: [
      { text: "تجديد اشتراك باقة VIP - كابتن أحمد", status: "مسدد" },
      { text: "تسجيل دخول عضو عبر الباركود/البصمة", status: "مقبول" },
      { text: "صرف عمولات تدريب خاص (PT)", status: "معتمد" },
    ],
  },
  riyadalquran: {
    badge: "منظومة الجمعيات الخيرية وإدارة الحضانات",
    pills: ["سحابي 100%", "فرز وتصنيف الحالات", "بوابة أولياء الأمور", "تقارير الصرف والتبرعات"],
    kpis: [
      { label: "حالات مستفيدة", val: "٨٥٠ أسرة", trend: "رعاية مستمرة" },
      { label: "كفالة الأيتام", val: "١٠٠% مغطاة", trend: "منتظم" },
      { label: "أطفال الحضانة", val: "١٤٥ طفل", trend: "متابعة يومية" },
    ],
    chartTitle: "صرف المساعدات والتبرعات الخيرية",
    activities: [
      { text: "صرف مساعدة علاجية عاجلة #H-301", status: "تم الصرف" },
      { text: "تسجيل تقرير متابعة الحضانة - ولي أمر", status: "مرسل" },
      { text: "اعتماد كشف الكفالات الشهرية", status: "معتمد" },
    ],
  },
  vos: {
    badge: "نظام إدارة الفرق والمتطوعين (VOS)",
    pills: ["سحابي 100%", "توثيق الشهادات إلكترونياً", "سجل تدقيق كامل لكل إجراء", "لوحات المتصدرين والفرق"],
    kpis: [
      { label: "إجمالي المتطوعين", val: "٤,٨٠٠ متطوع", trend: "+٢٤%" },
      { label: "ساعات التطوع الموثقة", val: "٣٢,٠٠٠ ساعة", trend: "موثق" },
      { label: "شهادات إلكترونية", val: "١,٦٥٠ شهادة", trend: "رمز QR" },
    ],
    chartTitle: "ساعات التطوع ونشاط القوافل الميدانية",
    activities: [
      { text: "إصدار شهادة تطوع موثقة بـ QR كود", status: "تم الإصدار" },
      { text: "اعتماد مشاركة قافلة طبية #42", status: "معتمد" },
      { text: "تحديث لوحة الشرف وأبطال التطوع", status: "محدث" },
    ],
  },
};

const DEFAULT_CONFIG = {
  badge: "منظومة سحابية متكاملة",
  pills: ["سحابي 100%", "تقارير لحظية", "صلاحيات دقيقة", "حلول مخصصة"],
  kpis: [
    { label: "العمليات التشغيلية", val: "٩٩.٨%", trend: "+١٥%" },
    { label: "كفاءة المنظومة", val: "لحظية", trend: "أعلى أداء" },
    { label: "مستخدمين نشطين", val: "متعدد الصلاحيات", trend: "سحابي" },
  ],
  chartTitle: "مؤشرات الأداء والنمو التشغيلي",
  activities: [
    { text: "إصدار فاتورة إلكترونية معتمدة", status: "مكتمل" },
    { text: "تحديث حركة المخازن والخزائن", status: "لحظي" },
    { text: "توليد التقرير المالي والإداري", status: "جاهز" },
  ],
};

function SimulatedErpDashboard({ project }) {
  const config = SYSTEM_CONFIGS[project.slug] || DEFAULT_CONFIG;

  return (
    <div className="pf-sim-dashboard">
      <div className="pf-sim-topbar">
        <div className="pf-sim-brand">
          <span className="pf-sim-pulse-dot" />
          <span className="pf-sim-title">{project.name} · لوحة التحكم الإدارية</span>
        </div>
        <div className="pf-sim-status">تشغيل حي 24/7</div>
      </div>

      <div className="pf-sim-kpis">
        {config.kpis.map((kpi, i) => (
          <div key={i} className="pf-sim-kpi-card">
            <span className="pf-sim-kpi-label">{kpi.label}</span>
            <div className="pf-sim-kpi-val-row">
              <span className="pf-sim-kpi-val">{kpi.val}</span>
              <span className="pf-sim-kpi-trend">{kpi.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="pf-sim-charts-row">
        <div className="pf-sim-chart-card">
          <div className="pf-sim-chart-header">
            <span>{config.chartTitle}</span>
            <span className="pf-sim-chart-tag">مباشر</span>
          </div>
          <div className="pf-sim-chart-bars">
            {[65, 82, 45, 95, 75, 90, 100, 85].map((h, i) => (
              <div key={i} className="pf-sim-bar-col">
                <div className="pf-sim-bar" style={{ height: `${h}%` }} />
              </div>
            ))}
          </div>
        </div>

        <div className="pf-sim-feed-card">
          <div className="pf-sim-feed-header">
            <span>أحدث الحركات والعمليات</span>
          </div>
          <div className="pf-sim-feed-list">
            {config.activities.map((act, i) => (
              <div key={i} className="pf-sim-feed-item">
                <span className="pf-sim-feed-text">{act.text}</span>
                <span className="pf-sim-feed-badge">{act.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pf-mockup-badge">
        <span>👁️ اضغط لاستعراض تفاصيل وتجهيزات المنظومة</span>
      </div>
    </div>
  );
}

export default function PortfolioGallery({ projects = [] }) {
  const [activeSlug, setActiveSlug] = useState(null);
  const [zoom, setZoom] = useState(null);

  const activeProject = projects.find((p) => p.slug === activeSlug) || null;
  const count = activeProject ? (activeProject.shots || []).length : 0;
  const activeConfig = activeProject ? (SYSTEM_CONFIGS[activeProject.slug] || DEFAULT_CONFIG) : DEFAULT_CONFIG;

  const close = useCallback(() => {
    setActiveSlug(null);
    setZoom(null);
  }, []);

  useEffect(() => {
    if (!activeProject) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      if (zoom) setZoom(null);
      else close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [activeProject, zoom, close]);

  return (
    <div className="pf-gallery-container">
      {/* ALL SYSTEMS AS SPOTLIGHT SHOWCASES */}
      <section className="pf-featured-section">
        <div className="pf-featured-grid">
          {projects.map((p, idx) => {
            const hasShots = (p.shots || []).length > 0;
            const config = SYSTEM_CONFIGS[p.slug] || DEFAULT_CONFIG;

            return (
              <div
                key={p.slug}
                className={`pf-spotlight-card ${idx % 2 === 1 ? "is-reversed" : ""}`}
              >
                {/* Left/Interactive Visual Preview Mockup */}
                <div className="pf-spotlight-preview" onClick={() => setActiveSlug(p.slug)}>
                  <div className="pf-spotlight-mockup-frame">
                    <div className="pf-mockup-screen-wrap">
                      {hasShots ? (
                        <>
                          <img
                            src={p.shots[0]}
                            alt={p.name}
                            className="pf-mockup-img"
                            loading={idx < 2 ? "eager" : "lazy"}
                          />
                          {p.shots[1] && (
                            <img
                              src={p.shots[1]}
                              alt=""
                              className="pf-mockup-img-layer"
                              loading="lazy"
                            />
                          )}
                          <div className="pf-mockup-badge">
                            <span>👁️ اضغط لاستعراض {p.shots.length} شاشة حقيقية</span>
                          </div>
                        </>
                      ) : (
                        <SimulatedErpDashboard project={p} />
                      )}
                    </div>
                  </div>
                </div>

                {/* Right/Info Column */}
                <div className="pf-spotlight-info">
                  <div className="pf-spotlight-head">
                    <span className="pf-spotlight-logo">
                      {p.logo ? (
                        <img src={p.logo} alt={p.name} loading="lazy" />
                      ) : (
                        <span className="pf-card-logo-txt">{(p.name || "?").trim()[0]}</span>
                      )}
                    </span>
                    <div className="pf-spotlight-meta">
                      <span className="pf-spotlight-badge">{config.badge}</span>
                      <h3 className="pf-spotlight-name">{p.name}</h3>
                    </div>
                  </div>

                  <p className="pf-spotlight-sub">{p.subtitle}</p>

                  {p.desc && <p className="pf-spotlight-desc">{p.desc}</p>}

                  <div className="pf-spotlight-pills">
                    {config.pills.map((pill, pIdx) => (
                      <span
                        key={pIdx}
                        className={`pf-pill ${pIdx === config.pills.length - 1 ? "highlight" : ""}`}
                      >
                        {pill}
                      </span>
                    ))}
                  </div>

                  <button
                    className="pf-spotlight-btn"
                    onClick={() => setActiveSlug(p.slug)}
                  >
                    <span>
                      {hasShots ? "استعراض شاشات النظام بالكامل" : "عرض تفاصيل وتجهيزات المنظومة"}
                    </span>
                    <span className="pf-btn-arrow">←</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* MODAL FOR SYSTEM DETAILS & SCREENSHOT DECK */}
      {activeProject && (
        <div className="pf-modal" onClick={close}>
          <div className="pf-modal-inner" onClick={(e) => e.stopPropagation()}>
            <div className="pf-modal-head">
              {activeProject.logo ? (
                <img
                  className="pf-modal-logo"
                  src={activeProject.logo}
                  alt={activeProject.name}
                />
              ) : (
                <span className="pf-modal-logo pf-modal-logo--txt">
                  {(activeProject.name || "?").trim()[0]}
                </span>
              )}
              <div className="pf-modal-titles">
                <div className="pf-modal-name">{activeProject.name}</div>
                <div className="pf-modal-sub">
                  {activeProject.subtitle}
                  {count ? ` · ${count} شاشة تشغيلية` : ""}
                </div>
              </div>
              <button className="pf-modal-close" onClick={close} aria-label="إغلاق">
                ✕
              </button>
            </div>

            {activeProject.desc && <p className="pf-modal-desc">{activeProject.desc}</p>}

            {activeProject.youtubeId && (
              <div className="pf-modal-video">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeProject.youtubeId}?rel=0&modestbranding=1`}
                  title={activeProject.name}
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            )}

            {count > 0 ? (
              <Deck
                key={activeProject.slug}
                shots={activeProject.shots || []}
                onZoom={setZoom}
              />
            ) : (
              <div className="pf-modal-no-shots">
                <div className="pf-modal-features-grid">
                  {activeConfig.kpis.map((kpi, kIdx) => (
                    <div key={kIdx} className="pf-modal-feat-card">
                      <span className="pf-modal-feat-label">{kpi.label}</span>
                      <span className="pf-modal-feat-val">{kpi.val}</span>
                      <span className="pf-modal-feat-trend">{kpi.trend}</span>
                    </div>
                  ))}
                </div>

                <div className="pf-modal-cta-box">
                  <h4>هل ترغب في تجربة منظومة {activeProject.name} مباشرة؟</h4>
                  <p>يمكننا تجهيز نسخة تجريبية حية (Live Demo) وعرض كافة الشاشات والتقارير عبر اجتماع أونلاين أو زيارة عمل.</p>
                  <a
                    href={`https://wa.me/201558282760?text=${encodeURIComponent("مرحباً، أود حجز موعد لعرض توضيحي مباشر (Demo) لمنظومة: " + activeProject.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pf-demo-cta"
                  >
                    طلب عرض توضيحي مباشر (Demo) عبر واتساب ←
                  </a>
                </div>
              </div>
            )}
          </div>

          {zoom && (
            <div
              className="pf-zoom"
              onClick={(e) => {
                e.stopPropagation();
                setZoom(null);
              }}
            >
              <img src={zoom} alt="" />
              <button className="pf-zoom-close" aria-label="إغلاق">
                ✕
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
