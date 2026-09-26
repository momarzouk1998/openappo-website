"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const AUTO_MS = 1200;
const BEHIND = 3;

const UI = {
  ar: {
    pendingScreens: "الشاشات التفصيلية لهذا النظام قيد الإعداد والإطلاق.",
    requestDemoWa: "طلب عرض توضيحي مباشر عبر واتساب ←",
    zoomScreen: "تكبير الشاشة",
    prev: "السابق",
    next: "التالي",
    swipeHint: "مرّر للتنقل بين الشاشات · اضغط على الشاشة لتكبيرها",
    playVideo: (title) => `تشغيل فيديو ${title}`,
    watchLive: "شاهد النظام أثناء التشغيل",
    dashboardTitle: "لوحة التحكم الإدارية",
    live247: "تشغيل حي 24/7",
    live: "مباشر",
    latestActivity: "أحدث الحركات والعمليات",
    viewSetup: "👁️ اضغط لاستعراض تفاصيل وتجهيزات المنظومة",
    viewShots: (n) => `👁️ اضغط لاستعراض ${n} شاشة حقيقية`,
    operationalScreens: (n) => `${n} شاشة تشغيلية`,
    close: "إغلاق",
    tryLive: (name) => `هل ترغب في تجربة منظومة ${name} مباشرة؟`,
    demoOffer: "يمكننا تجهيز نسخة تجريبية حية (Live Demo) وعرض كافة الشاشات والتقارير عبر اجتماع أونلاين أو زيارة عمل.",
    demoCta: "طلب عرض توضيحي مباشر (Demo) عبر واتساب ←",
    demoMsg: (name) => "مرحباً، أود حجز موعد لعرض توضيحي مباشر (Demo) لمنظومة: " + name,
  },
  en: {
    pendingScreens: "Detailed screens for this system are being prepared and will launch soon.",
    requestDemoWa: "Request a live demo via WhatsApp →",
    zoomScreen: "Zoom screen",
    prev: "Previous",
    next: "Next",
    swipeHint: "Swipe to browse screens · tap a screen to zoom in",
    playVideo: (title) => `Play video: ${title}`,
    watchLive: "Watch the system in action",
    dashboardTitle: "Admin Dashboard",
    live247: "Live 24/7",
    live: "Live",
    latestActivity: "Latest activity",
    viewSetup: "👁️ Tap to view the system's setup and details",
    viewShots: (n) => `👁️ Tap to view ${n} real screens`,
    operationalScreens: (n) => `${n} operational screens`,
    close: "Close",
    tryLive: (name) => `Want to try the ${name} system live?`,
    demoOffer: "We can set up a live demo and walk you through every screen and report over an online meeting or an on-site visit.",
    demoCta: "Request a live demo via WhatsApp →",
    demoMsg: (name) => "Hi, I'd like to book a live demo for the system: " + name,
  },
};

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

function Deck({ shots, onZoom, lang = "ar" }) {
  const t = UI[lang] || UI.ar;
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
        <p>{t.pendingScreens}</p>
        <a href="https://wa.me/201558282760" target="_blank" rel="noopener noreferrer" className="pf-demo-cta">
          {t.requestDemoWa}
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
              aria-label={t.zoomScreen}
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

        <button className="pf-deck-nav pf-deck-nav--prev" onClick={() => go(-1)} aria-label={t.prev}>
          ‹
        </button>
        <button className="pf-deck-nav pf-deck-nav--next" onClick={() => go(1)} aria-label={t.next}>
          ›
        </button>
      </div>

      <div className="pf-flow-meta">
        <span className="pf-flow-count">
          {cur + 1} / {n}
        </span>
        <span className="pf-flow-hint">{t.swipeHint}</span>
      </div>
    </>
  );
}

const SYSTEM_CONFIGS_AR = {
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

const DEFAULT_CONFIG_AR = {
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

const SYSTEM_CONFIGS_EN = {
  mazaya: {
    badge: "Furniture Factory & Showroom System",
    pills: ["100% cloud", "Real-time reports", "Granular permissions", "28 operational screens"],
    kpis: [
      { label: "Showroom sales", val: "EGP 145,000", trend: "+18%" },
      { label: "Production orders", val: "34 active orders", trend: "In progress" },
      { label: "Inventory movements", val: "1,280 units", trend: "In stock" },
    ],
    chartTitle: "Showroom revenue & production orders",
    activities: [
      { text: "Sales invoice #4092 — Dokki showroom", status: "Approved" },
      { text: "Production order #891 — bedroom line", status: "In progress" },
      { text: "Material issue slip #142 — timber store", status: "Completed" },
    ],
  },
  keshk: {
    badge: "Household Goods Trade & Distribution",
    pills: ["100% cloud", "Wholesale & distribution", "Rep management", "9 operational screens"],
    kpis: [
      { label: "Wholesale invoices", val: "EGP 82,500", trend: "+14%" },
      { label: "Rep collections", val: "EGP 64,000", trend: "Live" },
      { label: "Warehouse SKUs", val: "4,150 items", trend: "Active count" },
    ],
    chartTitle: "Daily sales & collections",
    activities: [
      { text: "Wholesale invoice #218 — Zagazig customer", status: "Settled" },
      { text: "Rep route #4 — Mansoura area", status: "Out for delivery" },
      { text: "Branch cash-drawer reconciliation #12", status: "Approved" },
    ],
  },
  elnazlawy: {
    badge: "Electrical Appliances & Lighting System",
    pills: ["100% cloud", "Rep routes", "Cheque tracking", "Precise barcode inventory"],
    kpis: [
      { label: "Showroom sales", val: "EGP 96,400", trend: "+12%" },
      { label: "Cheques due", val: "18 cheques", trend: "Under collection" },
      { label: "Warehouse balance", val: "890 units", trend: "In stock" },
    ],
    chartTitle: "Appliance & lighting movement index",
    activities: [
      { text: "Retail appliance invoice #512", status: "Completed" },
      { text: "Collected cheque batch #88", status: "Collected" },
      { text: "Supplier goods-receipt note #31", status: "Approved" },
    ],
  },
  elhoot: {
    badge: "Wholesale Trade & Distribution System",
    pills: ["100% cloud", "Wholesale trade", "Debt aging & credit", "Cash-drawer collections"],
    kpis: [
      { label: "Wholesale sales", val: "EGP 215,000", trend: "+22%" },
      { label: "Today's collections", val: "EGP 140,000", trend: "Complete" },
      { label: "Debt aging", val: "98.2% on schedule", trend: "Excellent" },
    ],
    chartTitle: "Distribution sales & cash collections",
    activities: [
      { text: "Wholesale issue slip #1084 — channel sector", status: "Approved" },
      { text: "Customer #67 debt settlement", status: "Paid" },
      { text: "Cable & switch stock received", status: "In warehouse" },
    ],
  },
  elnesr: {
    badge: "Distribution Fleet & Rep Management",
    pills: ["100% cloud", "HR management", "Distribution routes", "Mobile stock per rep"],
    kpis: [
      { label: "Fleet sales", val: "EGP 132,000", trend: "+16%" },
      { label: "Active reps", val: "16 routes", trend: "In service" },
      { label: "Float reconciliation", val: "100%", trend: "Matched" },
    ],
    chartTitle: "Route coverage & rep sales",
    activities: [
      { text: "Rep #7 float reconciliation — Tanta route", status: "Approved" },
      { text: "Tax invoice #3319 issued", status: "Completed" },
      { text: "Warehouse transfer to delivery van #3", status: "Moved" },
    ],
  },
  rtx: {
    badge: "Manufacturing & Production-Stage Management",
    pills: ["100% cloud", "3 production stages", "Production-order tracking", "Raw-material costing"],
    kpis: [
      { label: "Raw materials received", val: "48 tons", trend: "In stock" },
      { label: "Active work orders", val: "12 production lines", trend: "Running" },
      { label: "Finished goods ready", val: "2,400 units", trend: "Ready" },
    ],
    chartTitle: "Production lifecycle & running cost",
    activities: [
      { text: "Incoming raw material — receipt #94", status: "Inspected" },
      { text: "Production stage #B12 completed", status: "Ready for sale" },
      { text: "Finished-goods shipment to distributor", status: "Delivered" },
    ],
  },
  maspero: {
    badge: "Point of Sale & Digital Services System",
    pills: ["100% cloud", "POS", "Wallet & shift management", "Multi-branch oversight"],
    kpis: [
      { label: "Top-up & wallet transactions", val: "3,450 transactions", trend: "+29%" },
      { label: "Shift handovers", val: "6 branches", trend: "Balanced precisely" },
      { label: "Staff commissions", val: "Real-time", trend: "Automatic" },
    ],
    chartTitle: "E-wallet & POS transaction volume",
    activities: [
      { text: "Shift handover — Maadi branch #2", status: "Balanced" },
      { text: "E-wallet top-up #8902", status: "Successful" },
      { text: "Internal support ticket — printer", status: "Resolved" },
    ],
  },
  roknalanaqa: {
    badge: "Retail Shops & Furnishing Workshop System",
    pills: ["100% cloud", "Shop & workshop management", "Partner profit accounting", "Fabric & tailoring tracking"],
    kpis: [
      { label: "Shop sales", val: "EGP 68,000", trend: "+11%" },
      { label: "Workshop orders", val: "22 tailoring & installs", trend: "In progress" },
      { label: "Partner profits", val: "Auto-calculated", trend: "Periodic" },
    ],
    chartTitle: "Branch revenue & workshop operations",
    activities: [
      { text: "Curtain & furnishing order #114", status: "Being installed" },
      { text: "Clothing sale invoice — Nozha branch", status: "Completed" },
      { text: "Quarterly partner profit distribution", status: "Approved" },
    ],
  },
  binqasim: {
    badge: "Import & Supply Chain System",
    pills: ["100% cloud", "Shipment cost allocation", "Transport fleet", "Item-level profitability"],
    kpis: [
      { label: "Import shipments", val: "6 containers", trend: "At port/warehouse" },
      { label: "Item costing", val: "Precisely allocated", trend: "Automatic" },
      { label: "Transport fleet", val: "8 trucks", trend: "Active" },
    ],
    chartTitle: "Shipment cost & inventory turnover",
    activities: [
      { text: "Import shipment #C-802 unloaded", status: "In warehouse" },
      { text: "Customs & freight expenses allocated", status: "Calculated" },
      { text: "Outbound goods-transport order", status: "En route" },
    ],
  },
  opengym: {
    badge: "Gym & Sports Club Management Platform",
    pills: ["100% cloud", "Member subscription portal", "Offline-capable PWA", "Trainer & payment management"],
    kpis: [
      { label: "Active members", val: "1,240 subscribers", trend: "+15%" },
      { label: "Renewal rate", val: "88%", trend: "High" },
      { label: "Today's fingerprint check-ins", val: "310 members", trend: "Instant" },
    ],
    chartTitle: "Subscription growth & monthly revenue",
    activities: [
      { text: "VIP package renewal — member", status: "Paid" },
      { text: "Member check-in via barcode/fingerprint", status: "Accepted" },
      { text: "Personal-training commission payout (PT)", status: "Approved" },
    ],
  },
  riyadalquran: {
    badge: "Charity & Nursery Management System",
    pills: ["100% cloud", "Case triage & classification", "Guardian portal", "Spending & donation reports"],
    kpis: [
      { label: "Families supported", val: "850 families", trend: "Ongoing care" },
      { label: "Orphan sponsorships", val: "100% covered", trend: "Consistent" },
      { label: "Nursery children", val: "145 children", trend: "Daily follow-up" },
    ],
    chartTitle: "Aid disbursement & charitable donations",
    activities: [
      { text: "Emergency medical aid disbursed #H-301", status: "Paid out" },
      { text: "Nursery follow-up report — guardian", status: "Sent" },
      { text: "Monthly sponsorship statement approved", status: "Approved" },
    ],
  },
  vos: {
    badge: "Volunteer & Team Management System (VOS)",
    pills: ["100% cloud", "Digital certificate issuance", "Full audit trail per action", "Leaderboards & teams"],
    kpis: [
      { label: "Total volunteers", val: "4,800 volunteers", trend: "+24%" },
      { label: "Documented volunteer hours", val: "32,000 hours", trend: "Logged" },
      { label: "Digital certificates", val: "1,650 certificates", trend: "QR-verified" },
    ],
    chartTitle: "Volunteer hours & field convoy activity",
    activities: [
      { text: "QR-verified volunteer certificate issued", status: "Issued" },
      { text: "Medical convoy #42 participation approved", status: "Approved" },
      { text: "Leaderboard of top volunteers updated", status: "Updated" },
    ],
  },
};

const DEFAULT_CONFIG_EN = {
  badge: "Integrated cloud system",
  pills: ["100% cloud", "Real-time reports", "Granular permissions", "Tailored solutions"],
  kpis: [
    { label: "Operational activity", val: "99.8%", trend: "+15%" },
    { label: "System efficiency", val: "Real-time", trend: "Top performance" },
    { label: "Active users", val: "Multi-role", trend: "Cloud-based" },
  ],
  chartTitle: "Performance & growth indicators",
  activities: [
    { text: "Approved e-invoice issued", status: "Completed" },
    { text: "Warehouse & cash-drawer activity updated", status: "Live" },
    { text: "Financial & management report generated", status: "Ready" },
  ],
};

/**
 * YouTube without the YouTube cost. Until the viewer actually clicks, this is
 * one thumbnail image — no player iframe, no third-party scripts, nothing
 * loaded from Google. The click swaps in the real embed in the same spot, so
 * the video plays in place instead of opening the modal.
 */
function InlineVideo({ id, title, lang = "ar" }) {
  const t = UI[lang] || UI.ar;
  const [playing, setPlaying] = useState(false);

  if (playing) {
    // youtube.com rather than youtube-nocookie.com, and with an explicit
    // `origin`: the privacy domain without a declared origin is what trips
    // YouTube's "confirm you're not a bot" interstitial on embeds.
    const origin =
      typeof window !== "undefined" ? encodeURIComponent(window.location.origin) : "";
    return (
      <div className="pf-inline-video is-playing">
        <iframe
          src={`https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&playsinline=1&autoplay=1&origin=${origin}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      className="pf-inline-video"
      onClick={() => setPlaying(true)}
      aria-label={t.playVideo(title)}
    >
      <img
        src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
        alt=""
        loading="lazy"
        className="pf-inline-video-thumb"
      />
      <span className="pf-inline-video-play" aria-hidden="true">
        <svg viewBox="0 0 68 48" width="62" height="44">
          <path
            d="M66.5 7.7a8.6 8.6 0 0 0-6-6C55.2 0 34 0 34 0S12.8 0 7.5 1.7a8.6 8.6 0 0 0-6 6A89 89 0 0 0 0 24a89 89 0 0 0 1.5 16.3 8.6 8.6 0 0 0 6 6C12.8 48 34 48 34 48s21.2 0 26.5-1.7a8.6 8.6 0 0 0 6-6A89 89 0 0 0 68 24a89 89 0 0 0-1.5-16.3z"
            fill="#f00"
          />
          <path d="M27 34V14l18 10z" fill="#fff" />
        </svg>
      </span>
      <span className="pf-inline-video-hint">{t.watchLive}</span>
    </button>
  );
}

function SimulatedErpDashboard({ project, lang = "ar" }) {
  const t = UI[lang] || UI.ar;
  const configs = lang === "en" ? SYSTEM_CONFIGS_EN : SYSTEM_CONFIGS_AR;
  const fallback = lang === "en" ? DEFAULT_CONFIG_EN : DEFAULT_CONFIG_AR;
  const config = configs[project.slug] || fallback;

  return (
    <div className="pf-sim-dashboard">
      <div className="pf-sim-topbar">
        <div className="pf-sim-brand">
          <span className="pf-sim-pulse-dot" />
          <span className="pf-sim-title">{project.name} · {t.dashboardTitle}</span>
        </div>
        <div className="pf-sim-status">{t.live247}</div>
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
            <span className="pf-sim-chart-tag">{t.live}</span>
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
            <span>{t.latestActivity}</span>
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
        <span>{t.viewSetup}</span>
      </div>
    </div>
  );
}

export default function PortfolioGallery({ projects = [], lang = "ar" }) {
  const t = UI[lang] || UI.ar;
  const [activeSlug, setActiveSlug] = useState(null);
  const [zoom, setZoom] = useState(null);

  const activeProject = projects.find((p) => p.slug === activeSlug) || null;
  const count = activeProject ? (activeProject.shots || []).length : 0;
  const configs = lang === "en" ? SYSTEM_CONFIGS_EN : SYSTEM_CONFIGS_AR;
  const fallbackConfig = lang === "en" ? DEFAULT_CONFIG_EN : DEFAULT_CONFIG_AR;
  const activeConfig = activeProject ? (configs[activeProject.slug] || fallbackConfig) : fallbackConfig;

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
            const config = configs[p.slug] || fallbackConfig;

            return (
              <div
                key={p.slug}
                className={`pf-spotlight-card ${idx % 2 === 1 ? "is-reversed" : ""}`}
              >
                {/* Left/Interactive Visual Preview Mockup */}
                {p.youtubeId ? (
                  <div className="pf-spotlight-preview pf-spotlight-preview--video">
                    <InlineVideo id={p.youtubeId} title={p.name} lang={lang} />
                  </div>
                ) : (
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
                            <span>{t.viewShots(p.shots.length)}</span>
                          </div>
                        </>
                      ) : (
                        <SimulatedErpDashboard project={p} lang={lang} />
                      )}
                    </div>
                  </div>
                </div>
                )}

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
            {/* Identity only. The description already appears on the grid card
                behind this modal, so repeating it here just pushed the video
                below the fold. */}
            <div className="pf-modal-card">
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
                  {count ? ` · ${t.operationalScreens(count)}` : ""}
                </div>
              </div>
              <button className="pf-modal-close" onClick={close} aria-label={t.close}>
                ✕
              </button>
            </div>
            </div>

            {activeProject.youtubeId && (
              <div className="pf-modal-video">
                <iframe
                  src={`https://www.youtube.com/embed/${activeProject.youtubeId}?rel=0&modestbranding=1&playsinline=1&autoplay=1&mute=1&origin=${
                    typeof window !== "undefined"
                      ? encodeURIComponent(window.location.origin)
                      : ""
                  }`}
                  title={activeProject.name}
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            )}

            {activeProject.youtubeId ? null : count > 0 ? (
              <Deck
                key={activeProject.slug}
                shots={activeProject.shots || []}
                onZoom={setZoom}
                lang={lang}
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
                  <h4>{t.tryLive(activeProject.name)}</h4>
                  <p>{t.demoOffer}</p>
                  <a
                    href={`https://wa.me/201558282760?text=${encodeURIComponent(t.demoMsg(activeProject.name))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pf-demo-cta"
                  >
                    {t.demoCta}
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
              <button className="pf-zoom-close" aria-label={t.close}>
                ✕
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
