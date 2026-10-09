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
    openLiveSystem: "🌐 فتح النظام المباشر",
    viewSystemDetails: "👁️ تفاصيل المنظومة",
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
    openLiveSystem: "🌐 Open Live System",
    viewSystemDetails: "👁️ System Details",
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
    pills: ["تكلفة كل أوردر بالتفصيل", "يوميات العمال وتسوية أسبوعية", "أوردرات فرعية وإضافات", "محفظة للألواح وأخرى للمصنع"],
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
  kishk: {
    badge: "منظومة تصنيع وتركيب الستائر والمفروشات",
    pills: ["7 مراحل من المعاينة للتركيب", "بيع أونلاين وشحنات", "أسعار الفروع بكلمات سر", "حضور ورواتب الموظفين"],
    kpis: [
      { label: "أوامر التفصيل", val: "٤٢ أمر نشط", trend: "قيد التشغيل" },
      { label: "معاينات وتركيبات", val: "١٨ موعد", trend: "جدول اليوم" },
      { label: "مخزون الأقمشة", val: "٥,٢٠٠ متر", trend: "جرد نشط" },
    ],
    chartTitle: "مؤشر أوامر المشغل وحركات الفروع",
    activities: [
      { text: "معاينة ورفع مقاسات فيلا - التجمع الخامس", status: "معتمد" },
      { text: "أمر قص وتفصيل شيفون وبلاك أوت #308", status: "بالمشغل" },
      { text: "إذن صرف إكسسوارات ومجاري ستائر", status: "مكتمل" },
    ],
  },
  farida: {
    badge: "منظومة تجارة الأقمشة والشحن الأونلاين",
    pills: ["مبيعات أقمشة وفواتير أونلاين", "شحنات بشركات الشحن", "شيكات الموردين", "أسعار الفروع بكلمات سر"],
    kpis: [
      { label: "فواتير أقمشة اليوم", val: "٢٧ فاتورة", trend: "مبيعات اليوم" },
      { label: "شحنات أونلاين", val: "١١ شحنة", trend: "بانتظار التسليم" },
      { label: "شيكات موردين", val: "٥ شيكات", trend: "تستحق هذا الأسبوع" },
    ],
    chartTitle: "مبيعات الأقمشة والشحنات الأونلاين",
    activities: [
      { text: "فاتورة مبيعات أقمشة جديدة", status: "معتمدة" },
      { text: "شحنة أونلاين عبر شركة شحن", status: "في الطريق" },
      { text: "شيك مورد يستحق هذا الأسبوع", status: "مجدول" },
    ],
  },
  keshk: {
    badge: "منظومة تصنيع وتركيب الستائر والمفروشات",
    pills: ["سحابي 100%", "رفع المقاسات والمعاينات", "أوامر المشغل والتفصيل", "إدارة 4 فروع"],
    kpis: [
      { label: "أوامر التفصيل", val: "٤٢ أمر نشط", trend: "قيد التشغيل" },
      { label: "معاينات وتركيبات", val: "١٨ موعد", trend: "جدول اليوم" },
      { label: "مخزون الأقمشة", val: "٥,٢٠٠ متر", trend: "جرد نشط" },
    ],
    chartTitle: "مؤشر أوامر المشغل وحركات الفروع",
    activities: [
      { text: "معاينة ورفع مقاسات فيلا - التجمع الخامس", status: "معتمد" },
      { text: "أمر قص وتفصيل شيفون وبلاك أوت #308", status: "بالمشغل" },
      { text: "إذن صرف إكسسوارات ومجاري ستائر", status: "مكتمل" },
    ],
  },
  elnazlawy: {
    badge: "منظومة الأجهزة الكهربائية والإضاءة",
    pills: ["إدخال حتى 15 شيكًا دفعة واحدة", "حالة وصرف لكل شيك", "خط سير المندوب بأيام الأسبوع", "بضاعة مستقلة لكل سيارة"],
    kpis: [
      { label: "شيكات تحت التحصيل", val: "١٢ شيكًا", trend: "تستحق هذا الأسبوع" },
      { label: "شيكات صادرة للموردين", val: "٩ شيكات", trend: "مجدولة" },
      { label: "رصيد الخزينة", val: "٢٨٠,٠٠٠ ج.م", trend: "بعد آخر صرف" },
    ],
    chartTitle: "استحقاقات الشيكات الواردة والصادرة",
    activities: [
      { text: "إدخال ١٥ شيكًا لمورد في خطوة واحدة", status: "تم الإدخال" },
      { text: "صرف شيك وخصمه من رصيد المورد والخزينة", status: "تم الصرف" },
      { text: "شيك عميل مرتجع — تحويله للمتابعة", status: "مرفوض" },
    ],
  },
  elhoot: {
    badge: "منظومة تجارة الجملة والتوزيع",
    pills: ["خط سير المناديب بأيام الأسبوع", "واتساب ورصيد كل عميل على الخط", "بضاعة كل سيارة وتحويلات المخازن", "سجل أسعار الشراء"],
    kpis: [
      { label: "عملاء خط سير اليوم", val: "٢٢ عميلًا", trend: "حسب يوم الأسبوع" },
      { label: "بضاعة السيارات", val: "٣ سيارات", trend: "جرد حالي" },
      { label: "تحصيلات اليوم", val: "٣٨,٥٠٠ ج.م", trend: "قيد التحصيل" },
    ],
    chartTitle: "تحصيلات المناديب على خطوط السير",
    activities: [
      { text: "تحصيل من عميل على خط سير الأحد", status: "مكتمل" },
      { text: "تحويل أصناف من المخزن الرئيسي لسيارة مندوب", status: "تم التحويل" },
      { text: "فاتورة شراء بتغيّر سعر تكلفة صنف", status: "سُجّل السعر" },
    ],
  },
  elnesr: {
    badge: "منظومة إدارة أسطول التوزيع والمناديب",
    pills: ["خط سير وبضاعة لكل مندوب", "شؤون الموظفين", "حسابات الشركاء", "شيكات وخزائن تحصيل"],
    kpis: [
      { label: "مناديب على الخط اليوم", val: "٨ مناديب", trend: "في الميدان" },
      { label: "حسابات الشركاء", val: "٣ شركاء", trend: "مستحقات الشهر" },
      { label: "شيكات تحت التحصيل", val: "٦ شيكات", trend: "هذا الأسبوع" },
    ],
    chartTitle: "نشاط المناديب وخطوط التوزيع",
    activities: [
      { text: "جرد بضاعة سيارة مندوب", status: "مطابق" },
      { text: "تسجيل سلفة موظف", status: "معتمد" },
      { text: "تحصيل شيك عميل", status: "تحت التحصيل" },
    ],
  },
  rtx: {
    badge: "منظومة إدارة التصنيع ومراحل الإنتاج",
    pills: ["3 مراحل: خامات ← إنتاج ← مبيعات", "تتبّع كل أوردر بين المراحل", "كشوف حساب المصانع", "طباعة الفواتير والكشوف"],
    kpis: [
      { label: "أوامر قيد الإنتاج", val: "١٧ أمرًا", trend: "في مرحلة الإنتاج" },
      { label: "خامات واردة", val: "٤٢٠ وحدة", trend: "مرحلة الخامات" },
      { label: "مبيعات المرحلة الأخيرة", val: "٩٦,٠٠٠ ج.م", trend: "مرحلة المبيعات" },
    ],
    chartTitle: "مسار الأوردرات عبر المراحل الثلاث",
    activities: [
      { text: "استلام خامات لأوردر جديد", status: "مرحلة الخامات" },
      { text: "تحويل أوردر إلى مرحلة الإنتاج", status: "قيد التشغيل" },
      { text: "كشف حساب مصنع للطباعة", status: "جاهز" },
    ],
  },
  maspero: {
    badge: "منظومة نقاط البيع والخدمات الرقمية",
    pills: ["عهدة المحافظ والماكينات والدرج", "البيع مقفول لحين استلام العهدة", "مطابقة الرصيد عند كل تسليم", "فواتير معلّقة وتسعير الطباعة"],
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
    pills: ["سجل تنقّل حالة كل أوردر ورشة", "كشف حركة لكل عميل ومورد", "جرد المخزون", "صرف شهري لأرباح الشركاء"],
    kpis: [
      { label: "أوردرات الورشة", val: "١٤ أوردرًا", trend: "قيد التنفيذ" },
      { label: "جلسات الجرد", val: "٣ جلسات", trend: "هذا الشهر" },
      { label: "مستحقات الشركاء", val: "٤٥,٠٠٠ ج.م", trend: "هذا الشهر" },
    ],
    chartTitle: "حالات أوردرات الورشة",
    activities: [
      { text: "نقل أوردر ستائر من القص إلى التفصيل", status: "محدّث بالمستخدم والوقت" },
      { text: "حركة جديدة في كشف عميل", status: "مسجّل" },
      { text: "صرف حصة شريك عن الشهر", status: "تم الصرف" },
    ],
  },
  binqasim: {
    badge: "منظومة الاستيراد وسلاسل الإمداد",
    pills: ["شحنات بالحاوية والمتر المكعب", "أسعار صرف العملات", "أسطول بتنبيه تغيير الزيت", "أقساط وشيكات العملاء"],
    kpis: [
      { label: "شحنات واردة", val: "٥ حاويات", trend: "في الطريق" },
      { label: "تكلفة الشحن", val: "١٢,٤٠٠ $", trend: "للشحنات الحالية" },
      { label: "أقساط مستحقة", val: "٢٢ قسطًا", trend: "هذا الشهر" },
    ],
    chartTitle: "شحنات الاستيراد وأقساط العملاء",
    activities: [
      { text: "تسجيل حاوية: بلد المنشأ والحجم وتكلفة الشحن", status: "مسجّلة" },
      { text: "مركبة قاربت على موعد تغيير الزيت", status: "تنبيه" },
      { text: "استحقاق قسط عميل", status: "مستحق" },
    ],
  },
  opengym: {
    badge: "منصة إدارة الصالات والأندية الرياضية",
    pills: ["باركود لكل عضو وللصالة", "تسجيل الحضور بالمسح من الهاتف", "حساب شخصي لكل عضو", "يعمل كتطبيق على الهاتف (PWA)"],
    kpis: [
      { label: "حضور اليوم", val: "٨٤ عضوًا", trend: "بالمسح من الهاتف" },
      { label: "اشتراكات تنتهي", val: "٩ أعضاء", trend: "خلال أسبوع" },
      { label: "أعضاء نشطون", val: "٣٢٠ عضوًا", trend: "اشتراك ساري" },
    ],
    chartTitle: "حضور الأعضاء على مدار الأسبوع",
    activities: [
      { text: "عضو سجّل حضوره بمسح باركود الصالة", status: "تم الحضور" },
      { text: "إنشاء حساب شخصي لعضو جديد", status: "مفعّل" },
      { text: "تجديد اشتراك عضو", status: "معتمد" },
    ],
  },
  riyadalquran: {
    badge: "منظومة الجمعيات الخيرية وإدارة الحضانات",
    pills: ["تسجيل حالات طبية وأيتام ومحتاجين", "حجز الحضانة", "بوابة مستقلة للإدارة والمعلمة وولي الأمر", "درجات الطلاب وتقييم المعلمات"],
    kpis: [
      { label: "طلبات التسجيل الجديدة", val: "١٢ طلبًا", trend: "بانتظار المراجعة" },
      { label: "حجوزات الحضانة", val: "٢٦ حجزًا", trend: "هذا الشهر" },
      { label: "طلاب الحلقات", val: "١٤٠ طالبًا", trend: "مسجلون" },
    ],
    chartTitle: "طلبات التسجيل حسب نوع الحالة",
    activities: [
      { text: "طلب تسجيل حالة يتيمة", status: "قيد المراجعة" },
      { text: "إدخال درجات طالب", status: "محفوظ" },
      { text: "حجز مقعد بالحضانة", status: "مؤكد" },
    ],
  },
  sash: {
    badge: "منظومة نقاط البيع لمتجر براندات محلية",
    pills: ["بوابة دخول مستقلة لكل براند", "جرد بمسدس الباركود لكل براند", "مستحقات وسحوبات كل براند", "3 فروع وبضاعة في الطريق"],
    kpis: [
      { label: "براندات نشطة", val: "٦٥ براندًا", trend: "على ٣ فروع" },
      { label: "جرد بالمسدس", val: "١٨٤ قطعة", trend: "فروقات بانتظار الاعتماد" },
      { label: "طلبات انضمام", val: "٤ براندات", trend: "بانتظار الموافقة" },
    ],
    chartTitle: "مبيعات البراندات ومستحقاتها",
    activities: [
      { text: "جرد براند بالمسح: فروقات قبل الاعتماد", status: "بانتظار المراجعة" },
      { text: "براند أرسل بضاعة جديدة للفرع", status: "قيد الاستلام" },
      { text: "طلب سحب مستحقات براند", status: "قيد المراجعة" },
    ],
  },
  almotawakel: {
    badge: "منظومة إدارة التجارة والتوزيع والمخازن",
    pills: ["خط سير وبضاعة السيارات", "حسابات الشركاء", "شؤون الموظفين", "شيكات وخزائن التحصيل"],
    kpis: [
      { label: "عملاء خط سير اليوم", val: "١٩ عميلًا", trend: "حسب يوم الأسبوع" },
      { label: "بضاعة السيارات", val: "٤ سيارات", trend: "جرد حالي" },
      { label: "شيكات تحت التحصيل", val: "٨ شيكات", trend: "هذا الأسبوع" },
    ],
    chartTitle: "تحصيلات الخطوط وحركة بضاعة السيارات",
    activities: [
      { text: "تحويل أصناف من المخزن لسيارة مندوب", status: "تم التحويل" },
      { text: "تسجيل مستحقات شريك عن الشهر", status: "معتمد" },
      { text: "تحصيل شيك عميل", status: "تحت التحصيل" },
    ],
  },
  vos: {
    badge: "نظام إدارة الفرق والمتطوعين (VOS)",
    pills: ["نقاط ومكافآت المتطوعين", "شهادات بـQR وصفحة تحقق", "قوافل بعدد مطلوب ومؤكّد", "متابعة المتطوعين المنقطعين"],
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
    pills: ["Itemised cost per order", "Daily labour logs & weekly settlement", "Sub-orders & add-ons", "Separate boards and factory wallets"],
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
  kishk: {
    badge: "Curtains & Luxury Fabrics Manufacturing System",
    pills: ["7 stages, survey to installation", "Online sales & shipments", "Password-protected branch pricing", "Staff attendance & payroll"],
    kpis: [
      { label: "Tailoring orders", val: "42 active orders", trend: "In production" },
      { label: "Field installations", val: "18 scheduled", trend: "On schedule" },
      { label: "Fabric inventory", val: "5,200 meters", trend: "Active stock" },
    ],
    chartTitle: "Workshop orders & branch performance",
    activities: [
      { text: "Site inspection & measurement slip #412", status: "Approved" },
      { text: "Curtain tailoring order #308 — atelier", status: "In progress" },
      { text: "Curtain accessories & track dispatch note", status: "Completed" },
    ],
  },
  farida: {
    badge: "Fabric Trade & Online Shipping System",
    pills: ["Fabric sales & online invoices", "Shipments via courier companies", "Supplier cheques", "Password-protected branch pricing"],
    kpis: [
      { label: "Today's fabric invoices", val: "27 invoices", trend: "Today's sales" },
      { label: "Online shipments", val: "11 shipments", trend: "Awaiting delivery" },
      { label: "Supplier cheques", val: "5 cheques", trend: "Due this week" },
    ],
    chartTitle: "Fabric sales & online shipments",
    activities: [
      { text: "New fabric sales invoice", status: "Approved" },
      { text: "Online shipment via a courier company", status: "On the way" },
      { text: "Supplier cheque falls due this week", status: "Scheduled" },
    ],
  },
  keshk: {
    badge: "Curtains & Luxury Fabrics Manufacturing System",
    pills: ["100% cloud", "Field measurements", "Atelier workshop orders", "4 branch sync"],
    kpis: [
      { label: "Tailoring orders", val: "42 active orders", trend: "In production" },
      { label: "Field installations", val: "18 scheduled", trend: "On schedule" },
      { label: "Fabric inventory", val: "5,200 meters", trend: "Active stock" },
    ],
    chartTitle: "Workshop orders & branch performance",
    activities: [
      { text: "Site inspection & measurement slip #412", status: "Approved" },
      { text: "Curtain tailoring order #308 — atelier", status: "In progress" },
      { text: "Curtain accessories & track dispatch note", status: "Completed" },
    ],
  },
  elnazlawy: {
    badge: "Electrical Appliances & Lighting System",
    pills: ["Up to 15 cheques in one entry", "Status & clearing per cheque", "Rep route by weekday", "Separate stock per vehicle"],
    kpis: [
      { label: "Cheques under collection", val: "12 cheques", trend: "Due this week" },
      { label: "Cheques issued to suppliers", val: "9 cheques", trend: "Scheduled" },
      { label: "Treasury balance", val: "EGP 280,000", trend: "After last clearing" },
    ],
    chartTitle: "Incoming & outgoing cheque due dates",
    activities: [
      { text: "15 supplier cheques entered in one step", status: "Entered" },
      { text: "Cheque cleared — treasury and supplier balance updated", status: "Cleared" },
      { text: "Customer cheque bounced — sent to follow-up", status: "Rejected" },
    ],
  },
  elhoot: {
    badge: "Wholesale & Distribution System",
    pills: ["Rep routes by weekday", "WhatsApp & balance per route customer", "Stock per vehicle & store transfers", "Purchase price history"],
    kpis: [
      { label: "Today's route customers", val: "22 customers", trend: "By weekday" },
      { label: "Vehicle stock", val: "3 vehicles", trend: "Current count" },
      { label: "Today's collections", val: "EGP 38,500", trend: "In collection" },
    ],
    chartTitle: "Rep collections along their routes",
    activities: [
      { text: "Collection from a Sunday-route customer", status: "Completed" },
      { text: "Items moved from main store to a rep's vehicle", status: "Transferred" },
      { text: "Purchase invoice changes an item's cost price", status: "Price logged" },
    ],
  },
  elnesr: {
    badge: "Distribution Fleet & Rep Management System",
    pills: ["Route & stock per rep", "HR & staff affairs", "Partner accounts", "Cheques & collection drawers"],
    kpis: [
      { label: "Reps on route today", val: "8 reps", trend: "In the field" },
      { label: "Partner accounts", val: "3 partners", trend: "Month's dues" },
      { label: "Cheques under collection", val: "6 cheques", trend: "This week" },
    ],
    chartTitle: "Rep activity & distribution routes",
    activities: [
      { text: "Vehicle stock count for a rep", status: "Matched" },
      { text: "Staff advance recorded", status: "Approved" },
      { text: "Customer cheque collected", status: "Under collection" },
    ],
  },
  rtx: {
    badge: "Manufacturing & Production Stage System",
    pills: ["3 stages: materials → production → sales", "Track every order across stages", "Factory account statements", "Print invoices & statements"],
    kpis: [
      { label: "Orders in production", val: "17 orders", trend: "Production stage" },
      { label: "Materials received", val: "420 units", trend: "Materials stage" },
      { label: "Final-stage sales", val: "EGP 96,000", trend: "Sales stage" },
    ],
    chartTitle: "Order flow across the three stages",
    activities: [
      { text: "Materials received for a new order", status: "Materials stage" },
      { text: "Order moved to production", status: "In progress" },
      { text: "Factory statement ready to print", status: "Ready" },
    ],
  },
  maspero: {
    badge: "Point of Sale & Digital Services System",
    pills: ["Custody of wallets, machines & drawer", "Sales locked until custody is received", "Balance check at every handover", "Held invoices & print pricing"],
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
    badge: "Retail Shops & Upholstery Workshop System",
    pills: ["Status history for every workshop order", "Movement statement per customer & supplier", "Stock counts", "Monthly partner payouts"],
    kpis: [
      { label: "Workshop orders", val: "14 orders", trend: "In progress" },
      { label: "Stock-count sessions", val: "3 sessions", trend: "This month" },
      { label: "Partner dues", val: "EGP 45,000", trend: "This month" },
    ],
    chartTitle: "Workshop order statuses",
    activities: [
      { text: "Curtain order moved from cutting to tailoring", status: "Logged with user & time" },
      { text: "New movement on a customer statement", status: "Recorded" },
      { text: "Partner share paid for the month", status: "Paid" },
    ],
  },
  binqasim: {
    badge: "Import & Supply Chain System",
    pills: ["Shipments by container & cubic metre", "Currency exchange rates", "Fleet with oil-change alerts", "Customer instalments & cheques"],
    kpis: [
      { label: "Inbound shipments", val: "5 containers", trend: "On the way" },
      { label: "Freight cost", val: "USD 12,400", trend: "Current shipments" },
      { label: "Instalments due", val: "22 instalments", trend: "This month" },
    ],
    chartTitle: "Import shipments & customer instalments",
    activities: [
      { text: "Container logged: origin, volume and freight cost", status: "Logged" },
      { text: "Vehicle nearing its oil-change mileage", status: "Alert" },
      { text: "Customer instalment falls due", status: "Due" },
    ],
  },
  opengym: {
    badge: "Gym & Fitness Club Management Platform",
    pills: ["A barcode per member and per gym", "Check in by scanning from the phone", "Personal account for every member", "Installs as a phone app (PWA)"],
    kpis: [
      { label: "Today's check-ins", val: "84 members", trend: "Scanned from phone" },
      { label: "Memberships ending", val: "9 members", trend: "Within a week" },
      { label: "Active members", val: "320 members", trend: "Valid subscription" },
    ],
    chartTitle: "Member attendance across the week",
    activities: [
      { text: "Member checked in by scanning the gym barcode", status: "Checked in" },
      { text: "Personal account created for a new member", status: "Active" },
      { text: "Membership renewed", status: "Approved" },
    ],
  },
  riyadalquran: {
    badge: "Charity Association & Nursery Management System",
    pills: ["Register medical, orphan & low-income cases", "Nursery booking", "Separate portals for admin, teacher & parent", "Student grades & teacher assessment"],
    kpis: [
      { label: "New registration requests", val: "12 requests", trend: "Awaiting review" },
      { label: "Nursery bookings", val: "26 bookings", trend: "This month" },
      { label: "Circle students", val: "140 students", trend: "Enrolled" },
    ],
    chartTitle: "Registration requests by case type",
    activities: [
      { text: "Registration request for an orphan case", status: "Under review" },
      { text: "Student grades entered", status: "Saved" },
      { text: "Nursery seat booked", status: "Confirmed" },
    ],
  },
  sash: {
    badge: "Local Brands Retail & POS System",
    pills: ["Separate login portal for every brand", "Barcode-scanner stocktake per brand", "Dues & withdrawals per brand", "3 branches with stock in transit"],
    kpis: [
      { label: "Active brands", val: "65 brands", trend: "Across 3 branches" },
      { label: "Scanner stocktake", val: "184 items", trend: "Differences awaiting approval" },
      { label: "Join requests", val: "4 brands", trend: "Awaiting approval" },
    ],
    chartTitle: "Brand sales & dues",
    activities: [
      { text: "Brand stocktake scanned: differences before approval", status: "Awaiting review" },
      { text: "A brand sent new stock to the branch", status: "Being received" },
      { text: "Brand requested a withdrawal of dues", status: "Under review" },
    ],
  },
  almotawakel: {
    badge: "Trade, Distribution & Warehouse System",
    pills: ["Route & vehicle stock", "Partner accounts", "HR & staff affairs", "Cheques & collection drawers"],
    kpis: [
      { label: "Today's route customers", val: "19 customers", trend: "By weekday" },
      { label: "Vehicle stock", val: "4 vehicles", trend: "Current count" },
      { label: "Cheques under collection", val: "8 cheques", trend: "This week" },
    ],
    chartTitle: "Route collections & vehicle stock movement",
    activities: [
      { text: "Items moved from store to a rep's vehicle", status: "Transferred" },
      { text: "Partner dues recorded for the month", status: "Approved" },
      { text: "Customer cheque collected", status: "Under collection" },
    ],
  },
  vos: {
    badge: "Volunteer & Team Management System (VOS)",
    pills: ["Volunteer points & rewards", "QR certificates with a verify page", "Convoys: required vs confirmed", "Win-back for lapsed volunteers"],
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
